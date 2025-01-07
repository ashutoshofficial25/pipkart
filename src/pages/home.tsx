import { useEffect, useMemo, useState, useCallback } from "react";
import axiosInstance from "../utils/axios";
import { IProduct } from "../@types";
import ProductCard from "../components/ProductCard";
import styled from "styled-components";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    { id: number; count: number }[]
  >([]);

  const addToCart = useCallback((id: number) => {
    setSelectedProducts((prev) => {
      const productIndex = prev.findIndex((product) => product.id === id);
      if (productIndex !== -1) {
        return prev.map((product) =>
          product.id === id ? { ...product, count: product.count + 1 } : product
        );
      } else {
        return [...prev, { id, count: 1 }];
      }
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setSelectedProducts((prev) =>
      prev
        .map((product) =>
          product.id === id ? { ...product, count: product.count - 1 } : product
        )
        .filter((product) => product.count > 0)
    );
  }, []);

  const productsWithCount = useMemo(() => {
    return products.map((product) => {
      const item = selectedProducts.find((el) => el.id === product.id);
      return { ...product, count: item?.count ?? 0 };
    });
  }, [products, selectedProducts]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axiosInstance.get("/products");
        if (data?.products) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <ProductsGrid>
        {productsWithCount.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={addToCart}
            onRemove={removeFromCart}
          />
        ))}
      </ProductsGrid>
    </Container>
  );
}

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
`;

const ProductsGrid = styled.div`
  display: grid;
  gap: 16px;
  justify-items: center;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;
