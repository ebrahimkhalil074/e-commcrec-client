"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

import BrandSkeleton from "../skeloton/Brand";

import { useGetAllBrands } from "@/src/hooks/brand.hook";

const Brand = () => {
  const { data: brandsData, isLoading: catLoading } =
    useGetAllBrands(undefined);
  const brands = brandsData?.data || [];

  return (
    <section className="py-12 px-6">
      <motion.h2
        className="text-3xl font-bold mb-8 text-amber-600 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, amount: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        Top Brands
        <FaArrowRight className="text-amber-500 text-lg" />
      </motion.h2>

      {catLoading ? (
        <BrandSkeleton />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand: any, index: number) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: "easeOut",
              }}
              viewport={{ once: false, amount: 0.3 }}
              whileHover={{ scale: 1.03 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
            >
              <Link href={`/product/brand/${brand.name}`}>
                <div className="bg-white dark:bg-gray-900 group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-[240px]">
                  {/* Image */}
                  <Image
                    fill
                    alt={brand.name}
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
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
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Brand;
