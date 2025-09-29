"use client";

import ProductCard from "../card/Product";

import { useGetJustForYouProducts } from "@/src/hooks/product.hook";

export default function JustForYouProducts() {
  const { data: productsData, isLoading: productsLoading } =
    useGetJustForYouProducts();

  const products = productsData?.data || [];

  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl text-amber-600 font-bold mb-6">Just For You</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {productsLoading
          ? "loading..."
          : products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </section>
  );
}
