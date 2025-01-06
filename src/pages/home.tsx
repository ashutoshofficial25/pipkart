import { useEffect, useMemo, useState, useCallback } from "react";
import axiosInstance from "../utils/axios";
import { IProduct } from "../@types";
import ProductCard from "../components/ProductCard";

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
    <div className="container mx-auto px-4 py-6">
      <div className="grid gap-x-2 gap-y-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-items-center">
        {productsWithCount.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={() => addToCart(product.id)}
            onRemove={() => removeFromCart(product.id)}
          />
        ))}
      </div>
    </div>
  );
}
