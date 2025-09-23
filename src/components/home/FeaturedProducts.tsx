'use client';
import { useGetAllFeaturedProducts } from "@/src/hooks/product.hook";
import ProductCard from "../card/Product";

export default function FeaturedProducts() {
    const {data: productsData, isLoading: productsLoading} = useGetAllFeaturedProducts();
  const products = productsData?.data || [];

  return (
    <section className="py-12 px-6 ">
      <h2 className="text-3xl text-amber-600 font-bold mb-6">Featured Products</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        { productsLoading ?"loading...": products.map((product:any) => <ProductCard product={product} key={product.id}></ProductCard>
        )}
      </div>
    </section>
  );
}
