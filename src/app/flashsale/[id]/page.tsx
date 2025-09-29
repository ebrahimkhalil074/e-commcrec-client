"use client";

import { useParams } from "next/navigation";

import { useGetFlashSaleById } from "@/src/hooks/flashSale.hook"; // নিজের API হুক
import ProductCard from "@/src/components/card/Product";

export default function FlashSaleDetails() {
  const { id } = useParams();
  const { data, isLoading } = useGetFlashSaleById(id as string);

  if (isLoading) return <p>Loading...</p>;

  const flash = data?.data;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-amber-600 mb-6">{flash.name}</h1>
      <p className="text-gray-700 mb-8">{flash.description}</p>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {flash.products?.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
