'use client'

import { useParams } from "next/navigation";
import { useState } from "react";
import { Button,} from "@heroui/react";
import noDataImg from "@/src/assets/3024051.jpg";
import SmallCard from "@/src/components/card/SmallCaer";
import ProductCard from "@/src/components/card/Product";
import { FaTags } from "react-icons/fa";
import { useGetAllBrands } from "@/src/hooks/brand.hook";
import Image from "next/image";

const BrandPage = () => {
  const { brand } = useParams();
  const decodedBrand = decodeURIComponent(brand as string);

  const { data: brandData, isLoading } = useGetAllBrands(decodedBrand);

  // সঠিকভাবে ডেটা বের করা
  const currentBrand = brandData?.data?.[0] || {};
  const products = currentBrand?.products || [];
  console.log(products)
  const subCategories = currentBrand?.category?.subCategories || []; // category চাইলে populate করতে হবে backend এ

  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

  const filteredProducts = selectedSubCategory
    ? products.filter((p: any) => p.subCategory === selectedSubCategory)
    : products;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-amber-500"></span>
      </div>
    );
  }

  return (
    <>
      {/* Brand Header */}
      <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 mb-6 border border-gray-100">
        {/* Left: Brand Info */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-full text-amber-600">
            <FaTags size={24} />
          </div>
          <h1 className="text-2xl font-bold text-amber-600">
            {currentBrand?.name || decodedBrand}
          </h1>
        </div>

        {/* Right: Product Count */}
        <div className="text-gray-600 text-lg font-medium">
          Total:{" "}
          <span className="text-amber-600 font-semibold">
            {products?.length}
          </span>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Section */}
        {products.length > 0 ? (
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Hero Image */}
           <div className="relative w-full rounded-xl overflow-hidden shadow-lg">
  <div className="h-full w-full">
    {products[0]?.images?.[0]?.url ? (
      <Image
        width={1000}
        height={400}  // height 100 এর জায়গায় বড় দেওয়া ভালো
        src={products[0].images[0].url}
        alt={products[0]?.name || "পণ্য"}
        className="object-cover w-full h-64 md:h-96"
      />
    ) : (
      // fallback placeholder যদি ছবি না থাকে
      <div className="w-full h-64 md:h-96 bg-gray-200 flex items-center justify-center text-gray-500">
        কোনো ছবি নেই
      </div>
    )}
  </div>

  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-amber-300 via-amber-200 to-transparent text-amber-700 p-6 z-10">
    <h1 className="text-2xl md:text-4xl font-bold">
      {products[0]?.name || "নামহীন পণ্য"}
    </h1>
  </div>
</div>


            {/* Featured / Highlights Products */}
            {products.length > 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.slice(1, 4).map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Main Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="col-span-12 lg:col-span-8 flex flex-col items-center justify-center py-20">
            <h1 className="text-2xl font-semibold mb-4">
              এই ব্র্যান্ডে কোনো প্রোডাক্ট নেই
            </h1>
            <Image
              height={400}
              width={600}
              src={noDataImg.src}
              className="rounded-lg shadow-md"
              alt= 'image'
            />
          </div>
        )}

        {/* Right Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Subcategories Filter */}
          {subCategories?.length > 0 && (
            <div className="bg-white shadow rounded-xl p-4">
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
            </div>
          )}

          {/* SmallCard List */}
          <div className="flex flex-col gap-4">
            {filteredProducts.slice(0, 6).map((product: any) => (
              <SmallCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandPage;
