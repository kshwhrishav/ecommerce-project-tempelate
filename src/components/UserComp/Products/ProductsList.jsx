import React, { useState, useEffect, useRef, useCallback } from "react";
import { getProducts } from "../../../firebase/firestoreservice";
import ProductCard from "./ProductCard";
import { Box } from "@mui/material";

function ProductsList() {
  const [isFetching, setIsFetching] = useState(false);
  const [lastVisible, setLastVisible] = useState();
  const [products, setProducts] = useState([]);
  const tableRef = useRef(null);

  // Fetch initial products
  const fetchProducts = useCallback(async () => {
    setIsFetching(true);
    try {
      const { products: newProducts, lastVisible: newLastVisible } = await getProducts(null, 10);
      setProducts(newProducts);
      setLastVisible(newLastVisible);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }, []); // Empty dependency array to ensure it's created only once

  // Fetch more products when reaching the bottom
  const fetchMoreProducts = useCallback(async () => {
    if (!lastVisible || isFetching) return; // Exit if already fetching or no more products
    setIsFetching(true);
    try {
      const { products: moreProducts, lastVisible: newLastVisible } = await getProducts(lastVisible, 10);
      setProducts((prev) => [...prev, ...moreProducts]);
      setLastVisible(newLastVisible);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  }, [lastVisible, isFetching]); // Depend on lastVisible and isFetching

  // Handle scroll to load more products
  const handleScroll = useCallback(() => {
    if (tableRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tableRef.current;
      if (scrollTop + clientHeight >= scrollHeight && !isFetching) {
        fetchMoreProducts(); // Only fetch more if not currently fetching
      }
    }
  }, [fetchMoreProducts, isFetching]);

  // Fetch initial products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Attach scroll event to tableRef
  useEffect(() => {
    const ref = tableRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
      return () => ref.removeEventListener('scroll', handleScroll); // Cleanup event listener
    }
  }, [handleScroll]);

  return (
    <Box ref={tableRef} 
    sx={{ height: '95%',
          overflowY: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem' }}>
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          productImageUrl={product.productImageUrl}
          productName={product.productName}
          unitCost={product.unitCost}
          unitDiscount={product.unitDiscount}
          description={product.productDescription}
        />
      ))}
      {isFetching && <div>Loading more products...</div>}
    </Box>
  );
}

export default ProductsList;
