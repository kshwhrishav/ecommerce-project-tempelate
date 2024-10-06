import {
  Box, Button, Modal, TableCell, TableContainer, TableHead, TableRow, TableBody, Table, Paper, Input,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useEffect, useState, useRef } from "react";
import { deleteProduct, getProducts, searchProductsByQuery } from "../../firebase/firestoreservice";
import AddProductModal from "./AddProductModal";
import debounce from "lodash/debounce";  // Use lodash debounce

function ProductBoard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [modalType, setModalType] = useState("Add");
  const [lastVisible, setLastVisible] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for search
  const tableRef = useRef(null);

  // Fetch initial products
  const fetchProducts = async () => {
    setIsFetching(true);
    try {
      const { products: newProducts, lastVisible: newLastVisible } = await getProducts(null, 10);
      setProducts(newProducts);
      setLastVisible(newLastVisible);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  // Fetch more products when reaching the bottom
  const fetchMoreProducts = async () => {
    if (!lastVisible || isFetching) return;
    setIsFetching(true);
    try {
      const { products: moreProducts, lastVisible: newLastVisible } = await getProducts(lastVisible, 10);
      setProducts((prev) => [...prev, ...moreProducts]);
      setLastVisible(newLastVisible);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleScroll = () => {
    if (tableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        fetchMoreProducts();
      }
    }
  };

  const columns = [
    { id: "name", label: "Name", minWidth: '190' },
    { id: "quantity", label: "Quantity", minWidth: '170' },
    { id: "unitCost", label: "Price", minWidth: '170' },
    { id: "unitDiscount", label: "Discount %", minWidth: '170' },
    { id: "Edit", label: "Edit Product", minWidth: '170' },
    { id: "Delete", label: "Delete Product", minWidth: '170' },
  ];

  const handleAddProductModal = () => {
    setModalType("Add");
    setEditProduct(null);
    setIsModalOpen(true);
  };

  const handleEditBtn = (product) => {
    setModalType("Edit");
    setEditProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteBtn = async (id) => {
    await deleteProduct(id);
    fetchProducts();
  };

  const searchProductsLocal = async (query) => {
    setLoading(true);
    try {
      const res = await searchProductsByQuery(query);
      return res;
    } catch (error) {
      console.error("Error searching products:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Debounced search to avoid too many requests
  const debouncedSearch = debounce(async (input) => {
    if (input === "") {
      await fetchProducts();
    } else {
      const res = await searchProductsLocal(input);
      setProducts(res);
    }
  }, 300); // Debounce to limit calls (300ms delay)

  useEffect(() => {
    debouncedSearch(searchInput);
    return () => {
      debouncedSearch.cancel(); // Ensure debounce is cancelled on cleanup
    };
  }, [searchInput]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="ecom-product-main">
      <Box className="ecom-add-product-btn">
        <Box>
          <Input type="text" value={searchInput} onChange={handleSearchInputChange} placeholder="Search Products..." />
        </Box>
        <Button onClick={handleAddProductModal} className="ecom-btn-primary">
          Add Products
        </Button>
      </Box>

      <Box>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 600, overflowY: "auto" }}
          ref={tableRef}
          onScroll={handleScroll}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns?.map((col) => (
                  <TableCell
                    key={col.id}
                    align={col?.align}
                    style={{ minWidth: col.minWidth, backgroundColor: '#8ec9ff' }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.map((product, index) => (
                <TableRow sx={{ backgroundColor: index % 2 === 0 ? 'inherit' : '#f0f0f0'}} key={product.id}>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.productQuantity}</TableCell>
                  <TableCell>{product.unitCost}</TableCell>
                  <TableCell>{product.unitDiscount}</TableCell>
                  <TableCell><EditIcon sx={{cursor:"pointer"}} onClick={() => handleEditBtn(product)} /></TableCell>
                  <TableCell><DeleteIcon sx={{cursor:"pointer"}} onClick={() => handleDeleteBtn(product.id)} /></TableCell>
                </TableRow>
              ))}
              {isFetching && <TableRow><TableCell colSpan={6}>Loading more...</TableCell></TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            maxHeight: "80vh",
            bgcolor: "background.paper",
            border: "3px solid #0276aa",
            borderRadius: "12px",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          <AddProductModal
            type={modalType}
            product={editProduct}
            onClose={() => setIsModalOpen(false)}
            rerender={fetchProducts}
          />
        </Box>
      </Modal>
    </div>
  );
}

export default ProductBoard;
