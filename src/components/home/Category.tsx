"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

import BrandSkeleton from "../skeloton/Brand";

import { useGetAllCategory } from "@/src/hooks/category.hook";

const Category = () => {
  const { data: categoriesData, isLoading: catLoading } =
    useGetAllCategory(undefined);
  const categories = categoriesData?.data || [];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="py-12 px-6">
      <motion.h2
        className="text-3xl font-bold mb-8 text-amber-600 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false, amount: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        Top Categories
        <FaArrowRight className="text-amber-500 text-lg" />
      </motion.h2>

      {catLoading ? (
        <BrandSkeleton />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat: any, index: number) => (
            <motion.div
              key={cat.id}
              initial="hidden"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1 },
                },
              }}
              viewport={{ once: false, amount: 0.3 }}
              whileInView="visible"
            >
              <Link href={`/product/category/${cat.name}`}>
                <div className="bg-white dark:bg-gray-900 group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-[250px]">
                  {/* Image */}
                  <Image
                    fill
                    alt={cat.name}
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    src={cat.image}
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {/* Category Name */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-white text-lg font-semibold">
                    {cat.name}
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

export default Category;
