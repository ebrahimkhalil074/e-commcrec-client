"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import { useGetAllBrands } from "@/src/hooks/brand.hook";

const Brand = () => {
  const { data: brandsData, isLoading: catLoading } =
    useGetAllBrands(undefined);

  const brands = brandsData?.data || [];

  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold mb-8 text-amber-600 flex items-center gap-2">
        Top Brands
        <FaArrowRight className="text-amber-500 text-lg" />
      </h2>

      {catLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand: any) => (
            <Link key={brand.id} href={`/product/brand/${brand.name}`}>
              <div className="bg-white dark:bg-gray-900 group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-[240px]">
                {/* Image */}
                <Image
                  fill
                  alt={brand.name}
                  className=" object-content group-hover:scale-110 transition-transform duration-300"
                  src={brand.image}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Brand Name */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-lg font-semibold">
                  {brand.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Brand;
