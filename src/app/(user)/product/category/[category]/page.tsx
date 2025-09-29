// 'use client'

// import { useGetAllCategory } from "@/src/hooks/category.hook";
// import { useParams } from "next/navigation";
// import { useState } from "react";
// import { Image, Button } from "@heroui/react";
// import noDataImg from "@/src/assets/3024051.jpg";
// import add2 from "@/src/assets/tune-510bt-01-500x500.webp";

// const CategoryPage = () => {
//   const { category } = useParams();
//   const decodedCategory = decodeURIComponent(category as string);

//   const { data: categoryData, isLoading } = useGetAllCategory(decodedCategory);
//   const categories = categoryData?.data || [];

//   const currentCategory = categories[0] || {};
//   console.log(currentCategory)
//   const products = currentCategory?.products || [];
//   console.log("Products:", products);

//   const [active, setActive] = useState<'latest' | 'popular'>('latest');

//   const filteredProducts =
//     active === 'latest'
//       ? [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
//       : [...products].sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0));

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <span className="loading loading-spinner text-primary"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-12 gap-4">
//       {/* Left Section */}
//       {products.length > 0 ? (
//         <div className="col-span-12 lg:col-span-8">
//           {/* Hero Image */}
//           <div className="relative w-full rounded overflow-hidden">
//             <Image
//               src={ products[0]?.images[0]?.url|| noDataImg.src}
//               alt={products[0]?.name || 'Product'}
//               className="object-cover"
//             />
//             <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4 z-10">
//               <h1 className="text-lg font-semibold text-center">
//                 {products[0]?.name}
//               </h1>
//             </div>
//           </div>

//           {/* Product Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
//             {products.map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
//               >
//                 <div className="h-48 bg-gray-100 flex items-center justify-center">
//                   {product.images?.[0] ? (
//                     <img
//                       src={product.images[0]}
//                       alt={product.name}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-gray-400">No Image</span>
//                   )}
//                 </div>
//                 <div className="p-4">
//                   <h3 className="font-semibold text-gray-800 truncate">
//                     {product.name}
//                   </h3>
//                   <p className="text-gray-500 text-sm mt-1 line-clamp-2">
//                     {product.description}
//                   </p>
//                   <div className="flex justify-between items-center mt-4">
//                     <span className="text-lg font-bold text-primary">
//                       ${product.price}
//                     </span>
//                     {product.discount > 0 && (
//                       <span className="text-sm text-red-500">
//                         -{product.discount}%
//                       </span>
//                     )}
//                   </div>
//                   <div className="mt-2 text-sm text-gray-500">
//                     Stock: {product.stock}
//                   </div>
//                   <button className="w-full mt-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
//                     Details
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Ad Banner */}
//           {/* <div>
//             <Image width={1000} src={add2.src} alt="Ad" />
//           </div> */}
//         </div>
//       ) : (
//         <div className="col-span-12 lg:col-span-8">
//           <h1>No Data in this Category: {decodedCategory}</h1>
//           <Image height={500} width={1000} src={noDataImg.src} />
//         </div>
//       )}

//       {/* Right Sidebar */}
//       <div className="col-span-12 lg:col-span-4 space-y-4">
//         {/* Filter Buttons */}
//         <div className="flex justify-between">
//           <Button
//             onClick={() => setActive('latest')}
//             className={`w-1/2 rounded-none ${
//               active === 'latest' ? 'bg-red-500 text-white' : 'bg-white text-black'
//             }`}
//           >
//             সর্বশেষ
//           </Button>
//           <Button
//             onClick={() => setActive('popular')}
//             className={`w-1/2 rounded-none ${
//               active === 'popular' ? 'bg-red-500 text-white' : 'bg-white text-black'
//             }`}
//           >
//             জনপ্রিয়
//           </Button>
//         </div>

//         {/* Filtered Products */}
//         {filteredProducts.length > 0 && (
//           <div className="grid grid-cols-1 gap-4">
//             {filteredProducts.slice(0, 6).map((product) => (
//               <div
//                 key={product.id}
//                 className="bg-white shadow p-3 rounded-lg flex gap-3"
//               >
//                 <div className="w-20 h-20 bg-gray-100 flex items-center justify-center overflow-hidden">
//                   {product.images?.[0] ? (
//                     <img
//                       src={product.images[0]}
//                       alt={product.name}
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-gray-400">No Image</span>
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
//                     {product.name}
//                   </h3>
//                   <span className="text-primary font-bold">${product.price}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <div >
//         {/* subCategories */}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;

"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Button, Image } from "@heroui/react";
import { FaTags } from "react-icons/fa";

import { useGetAllCategory } from "@/src/hooks/category.hook";
import noDataImg from "@/src/assets/3024051.jpg";
import SmallCard from "@/src/components/card/SmallCaer";
import ProductCard from "@/src/components/card/Product";

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
    ? products.filter((p: any) => {
        return p.subCategory?.name === selectedSubCategory;
      })
    : products;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-amber-500" />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 mb-6 border border-gray-100">
        {/* Left: Category Info */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-100 rounded-full text-amber-600">
            <FaTags size={24} />
          </div>
          <h1 className="text-2xl font-bold text-amber-600">
            {decodedCategory}
          </h1>
        </div>

        {/* Right: Product Count */}
        <div className="text-gray-600 text-lg font-medium">
          Total:{" "}
          <span className="text-amber-600 font-semibold">
            {products.length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Section */}
        {products.length > 0 ? (
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Hero Image */}
            <div className="relative w-full rounded-xl overflow-hidden shadow-lg ">
              <div className="h-full -w-full">
                <Image
                  alt={products[0]?.name || "Product"}
                  className="object-cover w-full h-64 md:h-96"
                  src={products[7]?.images[0]?.url || noDataImg.src}
                  width={1000}
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-amber-300 via--amber-300 to-transparent text-white p-6 z-10">
                <h1 className="text-2xl md:text-4xl font-bold">
                  {products[0]?.name}
                </h1>
              </div>
            </div>

            {/* Ad Banner
          <div className="my-6">
            <Image src={add2.src} alt="Ad Banner" className="rounded-xl shadow-md transition-transform hover:scale-105" width={1000} />
          </div> */}

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
              এই ক্যাটেগরিতে কোনো ডেটা নেই
            </h1>
            <Image
              className="rounded-lg shadow-md"
              height={400}
              src={noDataImg.src}
              width={600}
            />
          </div>
        )}

        {/* Right Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Subcategories Filter */}
          {subCategories.length > 0 && (
            <div className="bg-white shadow rounded-xl p-4">
              <h2 className="text-lg font-semibold mb-3 text-amber-500">
                SUB-CATEGORY
              </h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  className={`rounded-full transition-all duration-300 ${selectedSubCategory === null ? "bg-amber-500 text-white" : "bg-gray-100 text-black hover:bg-amber-400 hover:text-white"}`}
                  onClick={() => setSelectedSubCategory(null)}
                >
                  সব
                </Button>
                {subCategories.map((sub: any) => (
                  <Button
                    key={sub.id}
                    className={`rounded-full transition-all duration-300 ${selectedSubCategory === sub.name ? "bg-amber-500 text-white" : "bg-gray-100 text-black hover:bg-amber-400 hover:text-white"}`}
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

export default CategoryPage;
