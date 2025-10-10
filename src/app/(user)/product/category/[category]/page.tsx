"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Button, Image } from "@heroui/react";
import { FaTags } from "react-icons/fa";
import { motion } from "framer-motion";

import { useGetAllCategory } from "@/src/hooks/category.hook";
import noDataImg from "@/src/assets/3024051.jpg";
import SmallCard from "@/src/components/card/SmallCaer";
import ProductCard from "@/src/components/card/Product";
import CategoryPageSkleton from "@/src/components/skeloton/CategoryPageSkleton";

const CategoryPage = () => {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category as string);

  const { data: categoryData, isLoading } = useGetAllCategory(decodedCategory);
  const categories = categoryData?.data || [];
  const currentCategory = categories[0] || {};
  const products = currentCategory?.products || [];
  const subCategories = currentCategory?.subCategories || [];

  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null,
  );

  const filteredProducts = selectedSubCategory
    ? products.filter((p: any) => p.subCategory?.name === selectedSubCategory)
    : products;

  // Motion variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      {isLoading ? (
        <CategoryPageSkleton />
      ) : (
        <>
          {/* Category Header */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 mb-6 border border-gray-100"
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-full text-amber-600">
                <FaTags size={24} />
              </div>
              <h1 className="text-2xl font-bold text-amber-600">
                {decodedCategory}
              </h1>
            </div>
            <div className="text-gray-600 text-lg font-medium">
              Total:{" "}
              <span className="text-amber-600 font-semibold">
                {products.length}
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-12 gap-6">
            {/* Left Section */}
            {products.length > 0 ? (
              <div className="col-span-12 lg:col-span-8 space-y-6">
                {/* Hero Image */}
                <motion.div
                  className="relative w-full rounded-xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  whileInView={{ opacity: 1 }}
                >
                  <Image
                    alt={products[0]?.name || "Product"}
                    className="object-content w-full h-64 md:h-96"
                    src={products[0]?.images[0]?.url || noDataImg.src}
                    width={1000}
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-amber-300 via-amber-300 to-transparent text-white p-6 z-10">
                    <h1 className="text-2xl md:text-4xl font-bold">
                      {products[0]?.name}
                    </h1>
                  </div>
                </motion.div>

                {/* Featured / Highlights Products */}
                {products.length > 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.slice(1, 4).map((product: any) => (
                      <motion.div
                        key={product.id}
                        initial="hidden"
                        variants={itemVariants}
                        viewport={{ once: true, amount: 0.3 }}
                        whileHover={{ scale: 1.03 }}
                        whileInView="visible"
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Main Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product: any) => (
                    <motion.div
                      key={product.id}
                      initial="hidden"
                      variants={itemVariants}
                      viewport={{ once: true, amount: 0.3 }}
                      whileHover={{ scale: 1.03 }}
                      whileInView="visible"
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div
                className="col-span-12 lg:col-span-8 flex flex-col items-center justify-center py-20"
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1 }}
              >
                <h1 className="text-2xl font-semibold mb-4">
                  এই ক্যাটেগরিতে কোনো ডেটা নেই
                </h1>
                <Image
                  className="rounded-lg shadow-md"
                  height={400}
                  src={noDataImg.src}
                  width={600}
                />
              </motion.div>
            )}

            {/* Right Sidebar */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {subCategories.length > 0 && (
                <motion.div
                  className="bg-white shadow rounded-xl p-4"
                  initial={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-lg font-semibold mb-3 text-amber-500">
                    SUB-CATEGORY
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      className={`rounded-full transition-all duration-300 ${
                        selectedSubCategory === null
                          ? "bg-amber-500 text-white"
                          : "bg-gray-100 text-black hover:bg-amber-400 hover:text-white"
                      }`}
                      onClick={() => setSelectedSubCategory(null)}
                    >
                      সব
                    </Button>
                    {subCategories.map((sub: any) => (
                      <Button
                        key={sub.id}
                        className={`rounded-full transition-all duration-300 ${
                          selectedSubCategory === sub.name
                            ? "bg-amber-500 text-white"
                            : "bg-gray-100 text-black hover:bg-amber-400 hover:text-white"
                        }`}
                        onClick={() => setSelectedSubCategory(sub.name)}
                      >
                        {sub.name}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* SmallCard List */}
              <div className="flex flex-col gap-4">
                {filteredProducts.slice(0, 6).map((product: any) => (
                  <motion.div
                    key={product.id}
                    initial="hidden"
                    variants={itemVariants}
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover={{ scale: 1.03 }}
                    whileInView="visible"
                  >
                    <SmallCard product={product} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CategoryPage;
