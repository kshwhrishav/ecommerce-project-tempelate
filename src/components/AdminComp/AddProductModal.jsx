import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createProduct, updateProduct, uploadImage } from "../../firebase/firestoreservice";

function AddProductModal({ type, product, onClose, rerender }) {
  const [formData, setFormData] = useState({
    productName: "",
    productQuantity: 0,
    productDescription: "",
    unitCost: 0,
    costPrice:0,
    unitDiscount: 0,
    productImage: null, // Will hold the image file
    productImageUrl: "", // Will hold the image URL for preview
  });

  const [imagePreview, setImagePreview] = useState(null);

  // If editing, prefill the form with product data
  useEffect(() => {
    if (type === "Edit" && product) {
      setFormData({
        productName: product.productName || "",
        productQuantity: product.productQuantity || 0,
        productDescription: product.productDescription || "",
        unitCost: product.unitCost || 0,
        unitDiscount: product.unitDiscount || 0,
        productImage: null, // Reset the image input
        productImageUrl: product.productImageUrl || "", // Set the existing image URL
      });

      // Set the image preview to the existing product image URL
      if (product.productImageUrl) {
        setImagePreview(product.productImageUrl);
      }
    }
  }, [type, product]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "productImage") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagePreview(event.target.result); // Set the image preview for the new image
        };
        reader.readAsDataURL(file);
        setFormData({ ...formData, [name]: file }); // Update the image file in formData
      } else {
        setImagePreview(null); // Clear preview if no file
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.productImageUrl; // Keep the current image URL by default
  
      // If a new image is selected, upload it and get the new URL
      if (formData.productImage) {
        imageUrl = await uploadImage(formData.productImage, formData.productName); // Upload new image and get URL
      }
  
      const productData = {
        productName: formData.productName,
        productQuantity: formData.productQuantity,
        productDescription: formData.productDescription,
        unitCost: formData.unitCost,
        unitDiscount: formData.unitDiscount,
        productImageUrl: imageUrl, // Set the URL (either new or existing)
      };
  
      if (type === "Add") {
        // Call the createProduct function for adding
        const addedProduct = await createProduct(productData);
        console.log("Product Added Successfully:", addedProduct);
      } else if (type === "Edit") {
        // Call the updateProduct function for updating
        const updatedProduct = await updateProduct(product.id, productData); 
        console.log("Product Updated Successfully:", updatedProduct);
      }
  
      rerender();
      onClose(); // Close the modal after successful action
  
    } catch (error) {
      console.error("Error handling product:", error);
    }
  };
  

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="ecom-form-data"
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h3">{type} Product</Typography>

      <Box>
        <label>Product Name</label>
        <TextField
          size="small"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          fullWidth
        />
      </Box>

      <Box>
        <label>Product Quantity</label>
        <TextField
          size="small"
          name="productQuantity"
          type="number"
          value={formData.productQuantity}
          onChange={(e) => {
            const value = e.target.value;
            if (value >= 0) {
              handleChange(e); // Allow change only if value is non-negative
            }
          }}
          fullWidth
        />
      </Box>

      <Box>
        <label>Product Description</label>
        <TextField
          size="small"
          name="productDescription"
          value={formData.productDescription}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
        />
      </Box>

      <Box>
        <label>Per Unit Cost Price</label>
        <TextField
          size="small"
          name="costPrice"
          type="number"
          value={formData.costPrice}
          onChange={(e) => {
            const value = e.target.value;
            if (value >= 0) {
              handleChange(e); // Allow change only if value is non-negative
            }
          }}
          fullWidth
        />
      </Box>

      <Box>
        <label>Per Unit Selling Price</label>
        <TextField
          size="small"
          name="unitCost"
          type="number"
          value={formData.unitCost}
          onChange={(e) => {
            const value = e.target.value;
            if (value >= 0) {
              handleChange(e); // Allow change only if value is non-negative
            }
          }}
          fullWidth
        />
      </Box>

      <Box>
        <label>Per Unit Discount</label>
        <TextField
          size="small"
          name="unitDiscount"
          type="number"
          value={formData.unitDiscount}
          onChange={(e) => {
            const value = e.target.value;
            if (value >= 0) {
              handleChange(e); // Allow change only if value is non-negative
            }
          }}
          fullWidth
        />
      </Box>

      <Box>
        <label>Upload Image</label>
        <input
          type="file"
          name="productImage"
          onChange={handleChange}
          accept="image/*"
        />
      </Box>

      {/* Optional Image Preview */}
      {imagePreview && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">Image Preview:</Typography>
          <img
            src={imagePreview}
            alt="Product Preview"
            style={{ width: "100%", maxHeight: "200px", objectFit: "contain" }}
          />
        </Box>
      )}

      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {type === "Add" ? "Add Product" : "Update Product"}
        </Button>
      </Box>
    </Box>
  );
}

export default AddProductModal;
