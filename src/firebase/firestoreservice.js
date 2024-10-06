import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
  orderBy,
  limit as firestoreLimit,
  startAfter,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

// Reference to the 'products' collection
const productsCollectionRef = collection(db, "products");

// Helper function for uploading an image and getting its download URL
export const uploadImage = async (imageFile, productName) => {
  const storage = getStorage();
  const storageRef = ref(storage, `productImages/${productName}`);

  // Wrap the upload logic in a Promise to handle async behavior
  const downloadURL = await new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed:", error);
        reject(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });

  return downloadURL;
};

// Create a new product
export const createProduct = async (newProduct) => {
  try {
    // Upload image and get download URL
    const downloadURL = await uploadImage(newProduct.productImage, newProduct.productName);
    console.log("File available at", downloadURL);

    // Prepare product data
    const productData = {
      productName: newProduct.productName,
      productQuantity: newProduct.productQuantity,
      productDescription: newProduct.productDescription,
      unitCost: newProduct.unitCost,
      unitDiscount: newProduct.unitDiscount,
      productImageUrl: downloadURL, // Store the image URL
    };

    // Add the product data to Firestore
    const response = await addDoc(productsCollectionRef, productData);
    console.log("Product added:", response.id);

    // Return the newly created product data
    return { id: response.id, ...productData };
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Get all products with pagination support
export const getProducts = async (lastVisible = null, pageSize = 10) => {
  try {
    // Create a query to get products ordered by product name
    let q = query(productsCollectionRef, orderBy("productName"), firestoreLimit(pageSize));

    // If there is a last visible document (for pagination), continue the query after that document
    if (lastVisible) {
      q = query(productsCollectionRef, orderBy("productName"), startAfter(lastVisible), firestoreLimit(pageSize));
    }

    // Get documents based on the query
    const snapshot = await getDocs(q);

    // Extract the product data and the last visible document for pagination
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const newLastVisible = snapshot.docs[snapshot.docs.length - 1];

    // Return the products and the last visible document
    return { products, lastVisible: newLastVisible };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Update an existing product
export const updateProduct = async (id, updatedProduct) => {
  try {
    const productDoc = doc(db, "products", id);
    await updateDoc(productDoc, updatedProduct);
    console.log("Product updated:", id);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Delete a product (and its image)
export const deleteProduct = async (id) => {
  try {
    // Get the product document from Firestore
    const productDoc = doc(db, "products", id);
    const productSnapshot = await getDoc(productDoc);

    if (productSnapshot.exists()) {
      const productData = productSnapshot.data();
      
      // Extract the product image URL
      const productImageUrl = productData.productImageUrl;

      if (productImageUrl) {
        // Create a reference to the image in Firebase Storage
        const storage = getStorage();
        const imageRef = ref(storage, productImageUrl);

        // Delete the image from Firebase Storage
        await deleteObject(imageRef);
        console.log("Product image deleted from storage.");
      }

      // Delete the product document from Firestore
      await deleteDoc(productDoc);
      console.log("Product deleted from Firestore.");
    } else {
      console.log("No such product found!");
    }
  } catch (error) {
    console.error("Error deleting product and image:", error);
    throw error;
  }
};

// Search Products by ID or Name
export const searchProductsByQuery = async (searchValue) => {
  try {
    const productQuery = query(
      productsCollectionRef,
      orderBy("productName"),
      startAt(searchValue),
      endAt(searchValue + '\uf8ff')
    );
    const querySnapshot = await getDocs(productQuery);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error searching products:", error);
    throw error;
  }
};
