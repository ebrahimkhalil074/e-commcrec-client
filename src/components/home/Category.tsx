"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import { useGetAllCategory } from "@/src/hooks/category.hook";

const Category = () => {
  const { data: categoriesData, isLoading: catLoading } =
    useGetAllCategory(undefined);

  const categories = categoriesData?.data || [];

  console.log("Categories Data:", categories);

  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold mb-8 text-amber-600 flex items-center gap-2">
        Top Categories
        <FaArrowRight className="text-amber-500 text-lg" />
      </h2>

      {catLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat: any) => (
            <Link key={cat.id} href={`/product/category/${cat.name}`}>
              <div className="bg-white dark:bg-gray-900 group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-[250px]">
                {/* Image */}
                <Image
                  fill
                  alt={cat.name}
                  className=" object-cover group-hover:scale-110 transition-transform duration-300"
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
          ))}
        </div>
      )}
    </section>
  );
};

export default Category;
