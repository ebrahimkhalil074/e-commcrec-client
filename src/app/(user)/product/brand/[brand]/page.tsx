"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@heroui/react";
import { FaTags } from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";

import noDataImg from "@/src/assets/3024051.jpg";
import SmallCard from "@/src/components/card/SmallCaer";
import ProductCard from "@/src/components/card/Product";
import { useGetAllBrands } from "@/src/hooks/brand.hook";
import BrandPageSkleton from "@/src/components/skeloton/BrandPageSkleton";

const BrandPage = () => {
  const { brand } = useParams();
  const decodedBrand = decodeURIComponent(brand as string);

  const { data: brandData, isLoading } = useGetAllBrands(decodedBrand);

  const currentBrand = brandData?.data?.[0] || {};
  const products = currentBrand?.products || [];
  const subCategories = currentBrand?.category?.subCategories || [];

  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null,
  );

  const filteredProducts = selectedSubCategory
    ? products.filter((p: any) => p.subCategory === selectedSubCategory)
    : products;

  // Variants for scroll animation
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      {isLoading ? (
        <BrandPageSkleton />
      ) : (
        <div>
          {/* Brand Header */}
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
                {currentBrand?.name || decodedBrand}
              </h1>
            </div>
            <div className="text-gray-600 text-lg font-medium">
              Total:{" "}
              <span className="text-amber-600 font-semibold">
                {products?.length}
              </span>
            </div>
          </motion.div>

          {/* Layout */}
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
                  {products[0]?.images?.[0]?.url ? (
                    <Image
                      alt={products[0]?.name || "পণ্য"}
                      className="object-content w-full h-64 md:h-96"
                      height={400}
                      src={products[0].images[0].url}
                      width={1000}
                    />
                  ) : (
                    <div className="w-full h-64 md:h-96 bg-gray-200 flex items-center justify-center text-gray-500">
                      Image not available
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-amber-300 via-amber-200 to-transparent text-amber-700 p-6 z-10">
                    <h1 className="text-2xl md:text-4xl font-bold">
                      {products[0]?.name || "নামহীন পণ্য"}
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
                animate={{ opacity: 1 }}
                className="col-span-12 lg:col-span-8 flex flex-col items-center justify-center py-20"
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-2xl font-semibold mb-4">
                  This brand has no products yet.
                </h1>
                <Image
                  alt="image"
                  className="rounded-lg shadow-md"
                  height={400}
                  src={noDataImg.src}
                  width={600}
                />
              </motion.div>
            )}

            {/* Right Sidebar */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {subCategories?.length > 0 && (
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
                      All
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
        </div>
      )}
    </>
  );
};

export default BrandPage;
