import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getProducts } from "../../../firebase/firestoreservice";
import ProductCard from "./ProductCard";

function ProductsList() {
  const [isFetching, setIsFetching] = useState(false);
  const [lastVisible, setLastVisible] = useState();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state for search
  const tableRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch initial products
  const fetchProducts = async () => {
    setIsFetching(true);
    try {
      const { products: newProducts, lastVisible: newLastVisible } =
        await getProducts(null, 10);
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
      const { products: moreProducts, lastVisible: newLastVisible } =
        await getProducts(lastVisible, 10);
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
  return (
    <Box sx={{display:'flex', gap: '2rem'}}>
      {products?.map((product) => (
        <ProductCard
          id={product.id}
          productImageUrl={product.productImageUrl}
          productName={product.productName}
          unitCost={product.unitCost}
          unitDiscount={product.unitCost}
          description={product.productDescription}
        />
      ))}
    </Box>
  );
}

export default ProductsList;
