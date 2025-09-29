// "use client";

// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// // import { CheckCircle } from "lucide-react";

// export default function SuccessPage() {
//   const searchParams = useSearchParams();
//   const transactionId = searchParams.get("transactionId");

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 px-6">
//       <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
//       <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>

//       <p className="text-gray-700 mt-2">
//         Thank you! Your payment has been processed successfully.
//       </p>

//       {transactionId && (
//         <p className="mt-3 text-gray-800 font-medium">
//           Transaction ID: <span className="text-green-600">{transactionId}</span>
//         </p>
//       )}

//       <Link
//         href="/customer/orders"
//         className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
//       >
//         Go to My Orders
//       </Link>
//     </div>
//   );
// }

// //f
// "use client";

// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { XCircle } from "lucide-react";

// export  function FailedPage() {
//   const searchParams = useSearchParams();
//   const transactionId = searchParams.get("transactionId");

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 px-6">
//       <XCircle className="text-red-500 w-20 h-20 mb-4" />
//       <h1 className="text-3xl font-bold text-red-600">Payment Failed ❌</h1>

//       <p className="text-gray-700 mt-2">
//         Sorry, your payment could not be completed. Please try again.
//       </p>

//       {transactionId && (
//         <p className="mt-3 text-gray-800 font-medium">
//           Transaction ID: <span className="text-red-600">{transactionId}</span>
//         </p>
//       )}

//       <Link
//         href="/customer/orders"
//         className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
//       >
//         Back to My Orders
//       </Link>
//     </div>
//   );
// }

// 'use client';
// import ProductCard from "@/src/components/card/Product";
// import { useGetAllProducts } from "@/src/hooks/product.hook";

// const Product = () => {
//   const { data: productsData, isLoading:productIsLoaging } = useGetAllProducts();
//   const products = productsData?.data || [];
//   console.log(products)
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//       {
//         productIsLoaging ? (
//           <p>Loading...</p>
//         ) : (
//           products.map(product => (
//     <ProductCard key={product.id} product={product} />
//   ))
//         )
//       }
//     </div>
//   );
// };

// export default Product;

// 'use client';

// import { useState, useEffect } from "react";
// import ProductCard from "@/src/components/card/Product";

// import { useGetAllBrands } from "@/src/hooks/brand.hook";
// import { useGetAllCategory } from "@/src/hooks/category.hook";
// import { useGetAllVariants } from "@/src/hooks/variant.hook";

// const Product = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Dynamic params for filtering
//   const [params, setParams] = useState({
//     searchTerm: "",
//     brandName: "",
//     categoryName: "",
//     sortBy: "",
//   });

//   // Fetch categories & brands from hooks
//   const { data: categoriesData, isLoading: catLoading } = useGetAllCategory();
//   const { data: brandsData, isLoading: brandLoading } = useGetAllBrands();
//   const { data: variantsData, isLoading: variantLoading } = useGetAllVariants();

//   const categories = categoriesData?.data || [];
//   const brands = brandsData?.data || [];
// const variants = variantsData?.data || [];
// console.log({variants})
//   const updateParam = (key: string, value: string) => {
//     setParams(prev => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const fetchProducts = async () => {
//     setLoading(true);
//     const queryParams = new URLSearchParams();
//     Object.entries(params).forEach(([key, value]) => {
//       if (value && value.trim() !== "") {
//         queryParams.append(key, value);
//       }
//     });

//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/v1/product?${queryParams.toString()}`
//       );
//       const data = await res.json();
//       setProducts(data.data || []);
//     } catch (error) {
//       console.error("Failed to fetch products", error);
//       setProducts([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [params]);
//   if(variantLoading) {
//     return <p>Loading variants...</p>;
//   }
//   return (
//     <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
//       {/* Sidebar Filter */}
//       <div className="lg:col-span-3 border rounded-lg p-4 space-y-4">
//         {/* Search */}
//         <input
//           type="text"
//           placeholder="Search..."
//           value={params.searchTerm}
//           onChange={e => updateParam("searchTerm", e.target.value)}
//           className="border p-2 rounded w-full"
//         />

//         {/* Brand Filter */}
//         <select
//           value={params.brandName}
//           onChange={e => updateParam("brandName", e.target.value)}
//           className="border p-2 rounded w-full"
//         >
//           <option value="">All Brands</option>
//           {brandLoading ? (
//             <option disabled>Loading brands...</option>
//           ) : (
//             brands.map((brand: any) => (
//               <option key={brand.id} value={brand.name}>
//                 {brand.name}
//               </option>
//             ))
//           )}
//         </select>

//         {/* Category Filter */}
//         <select
//           value={params.categoryName}
//           onChange={e => updateParam("categoryName", e.target.value)}
//           className="border p-2 rounded w-full"
//         >
//           <option value="">All Categories</option>
//           {catLoading ? (
//             <option disabled>Loading categories...</option>
//           ) : (
//             categories.map((cat: any) => (
//               <option key={cat.id} value={cat.name}>
//                 {cat.name}
//               </option>
//             ))
//           )}
//         </select>

//         {/* Sort By */}
//         <select
//           value={params.sortBy}
//           onChange={e => updateParam("sortBy", e.target.value)}
//           className="border p-2 rounded w-full"
//         >
//           <option value="">Sort By</option>
//           <option value="price_asc">Price: Low to High</option>
//           <option value="price_desc">Price: High to Low</option>
//           <option value="newest">Newest</option>
//         </select>
//       </div>

//       {/* Product Grid */}
//       <div className="lg:col-span-9">
//         <h1 className="text-2xl font-bold mb-4">Products</h1>
//         {loading ? (
//           <p>Loading...</p>
//         ) : products.length === 0 ? (
//           <p>No products found</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//             {products.map((product: any) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Product;

// 'use client';

// import { useState, useEffect } from "react";
// import ProductCard from "@/src/components/card/Product";
// import { useGetAllBrands } from "@/src/hooks/brand.hook";
// import { useGetAllCategory } from "@/src/hooks/category.hook";
// import { useGetAllVariants } from "@/src/hooks/variant.hook";
// import { Radio, RadioGroup, Input, Select, SelectItem } from "@heroui/react";

// const Product = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // একটাই brand/category/variant সিলেক্ট হবে
//   const [params, setParams] = useState({
//     searchTerm: "",
//     brandName: "",
//     categoryName: "",
//     variantName: "",
//     sortBy: "",
//   });

//   // ডাটা ফেচ
//   const { data: categoriesData, isLoading: catLoading } = useGetAllCategory();
//   const { data: brandsData, isLoading: brandLoading } = useGetAllBrands();

//   const categories = categoriesData?.data || [];
//   const brands = brandsData?.data || [];
//  const subCategories = categoriesData?.data?.subCategories || [];
// console.log({subCategories})
//   const updateParam = (key: keyof typeof params, value: string) => {
//     setParams((prev) => ({ ...prev, [key]: value }));
//   };

//   const fetchProducts = async () => {
//     setLoading(true);
//     const queryParams = new URLSearchParams();

//     Object.entries(params).forEach(([key, value]) => {
//       if (value && value.trim() !== "") {
//         queryParams.append(key, value);
//       }
//     });

//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/v1/product?${queryParams.toString()}`
//       );
//       const data = await res.json();
//       setProducts(data.data || []);
//     } catch (error) {
//       console.error("প্রোডাক্ট লোড করতে সমস্যা হয়েছে", error);
//       setProducts([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [params]);

//   return (
//     <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
//       {/* সাইডবার ফিল্টার */}
//       <div className="lg:col-span-3 border rounded-lg p-4 space-y-6">
//         {/* সার্চ */}
//         <Input
//           placeholder="সার্চ করুন..."
//           value={params.searchTerm}
//           onChange={(e) => updateParam("searchTerm", e.target.value)}
//         />

//         {/* ব্র্যান্ড সিলেক্ট */}
//         <div>
//           <h3 className="font-medium mb-2">ব্র্যান্ড</h3>
//           {brandLoading ? (
//             <p className="text-sm text-gray-500">লোড হচ্ছে...</p>
//           ) : (
//             <RadioGroup
//               value={params.brandName}
//               onValueChange={(val) => updateParam("brandName", val)}
//             >
//               {brands.map((brand: any) => (
//                 <Radio key={brand.id} value={brand.name}>
//                   {brand.name}
//                 </Radio>
//               ))}
//             </RadioGroup>
//           )}
//         </div>

//         {/* ক্যাটেগরি সিলেক্ট */}
//         <div>
//           <h3 className="font-medium mb-2">ক্যাটেগরি</h3>
//           {catLoading ? (
//             <p className="text-sm text-gray-500">লোড হচ্ছে...</p>
//           ) : (
//             <RadioGroup
//               value={params.categoryName}
//               onValueChange={(val) => updateParam("categoryName", val)}
//             >
//               {categories.map((cat: any) => (
//                 <Radio key={cat.id} value={cat.name}>
//                   {cat.name}
//                 </Radio>
//               ))}
//             </RadioGroup>
//           )}
//         </div>

//         {/* ভ্যারিয়েন্ট সিলেক্ট */}
//         <div>
//           <h3 className="font-medium mb-2">ভ্যারিয়েন্ট</h3>
//           <RadioGroup
//             value={params.variantName}
//             onValueChange={(val) => updateParam("variantName", val)}
//           >
//             {subCategories.map((variant: any) => (
//               <Radio key={variant.id} value={variant.name}>
//                 {variant.name}
//               </Radio>
//             ))}
//           </RadioGroup>
//         </div>

//         {/* Sort By */}
//         <Select
//           placeholder="সাজানোর ধরন"
//           selectedKeys={params.sortBy ? [params.sortBy] : []}
//           onChange={(e) => updateParam("sortBy", e.target.value)}
//         >
//           <SelectItem key="price_asc" value="price_asc">
//             দামে কম থেকে বেশি
//           </SelectItem>
//           <SelectItem key="price_desc" value="price_desc">
//             দামে বেশি থেকে কম
//           </SelectItem>
//           <SelectItem key="newest" value="newest">
//             নতুন
//           </SelectItem>
//         </Select>
//       </div>

//       {/* প্রোডাক্ট গ্রিড */}
//       <div className="lg:col-span-9">
//         <h1 className="text-2xl font-bold mb-4">প্রোডাক্ট তালিকা</h1>
//         {loading ? (
//           <p>লোড হচ্ছে...</p>
//         ) : products.length === 0 ? (
//           <p>কোনো প্রোডাক্ট পাওয়া যায়নি</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//             {products.map((product: any) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Product;

// 'use client';
// import { useState, useEffect } from "react";
// import ProductCard from "@/src/components/card/Product";
// import { useGetAllBrands } from "@/src/hooks/brand.hook";
// import { useGetAllCategory } from "@/src/hooks/category.hook";
// import { Radio, RadioGroup, Input, Select, SelectItem } from "@heroui/react";

// const Product = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [params, setParams] = useState({
//     searchTerm: "",
//     brandName: "",
//     categoryName: "",
//     subCategoryName: "",
//     sortBy: "",
//   });

//   const { data: categoriesData, isLoading: catLoading } = useGetAllCategory();
//   const { data: brandsData, isLoading: brandLoading } = useGetAllBrands();

//   const categories = categoriesData?.data || [];
//   const brands = brandsData?.data || [];

//   // ✅ Dynamically get subcategories for the selected category
//   const selectedCategory = categories.find(
//     (cat: any) => cat.name === params.categoryName
//   );
//   const subCategories = selectedCategory?.subCategories || [];

//   const updateParam = (key: keyof typeof params, value: string) => {
//     setParams((prev) => ({
//       ...prev,
//       [key]: value,
//       ...(key === "categoryName" ? { subCategoryName: "" } : {})
//     }));
//   };

//   const fetchProducts = async () => {
//     setLoading(true);
//     const queryParams = new URLSearchParams();

//     Object.entries(params).forEach(([key, value]) => {
//       if (value && value.trim() !== "") {
//         queryParams.append(key, value);
//       }
//     });

//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/v1/product?${queryParams.toString()}`
//       );
//       const data = await res.json();
//       setProducts(data.data || []);
//     } catch (error) {
//       console.error("Failed to load products", error);
//       setProducts([]);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [params]);

//   return (
//     <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
//       {/* Sidebar */}
//       <div className="lg:col-span-3 border rounded-lg p-4 space-y-6">
//         {/* Search */}
//         <Input
//           placeholder="Search..."
//           value={params.searchTerm}
//           onChange={(e) => updateParam("searchTerm", e.target.value)}
//         />

//         {/* Brand */}
//         <div>
//           <h3 className="font-medium mb-2">Brand</h3>
//           {brandLoading ? (
//             <p>Loading...</p>
//           ) : (
//             <RadioGroup
//               value={params.brandName}
//               onValueChange={(val) => updateParam("brandName", val)}
//             >
//               {brands.map((brand: any) => (
//                 <Radio key={brand.id} value={brand.name}>
//                   {brand.name}
//                 </Radio>
//               ))}
//             </RadioGroup>
//           )}
//         </div>

//         {/* Category */}
//         <div>
//           <h3 className="font-medium mb-2">Category</h3>
//           {catLoading ? (
//             <p>Loading...</p>
//           ) : (
//             <RadioGroup
//               value={params.categoryName}
//               onValueChange={(val) => updateParam("categoryName", val)}
//             >
//               {categories.map((cat: any) => (
//                 <Radio key={cat.id} value={cat.name}>
//                   {cat.name}
//                 </Radio>
//               ))}
//             </RadioGroup>
//           )}
//         </div>

//         {/* SubCategory (Variants) */}
//         {params.categoryName && subCategories.length > 0 && (
//           <div>
//             <h3 className="font-medium mb-2">Sub Category</h3>
//             <RadioGroup
//               value={params.subCategoryName}
//               onValueChange={(val) => updateParam("subCategoryName", val)}
//             >
//               {subCategories.map((variant: any) => (
//                 <Radio key={variant.id} value={variant.name}>
//                   {variant.name}
//                 </Radio>
//               ))}
//             </RadioGroup>
//           </div>
//         )}

//         {/* Sort By */}
//         <Select
//           placeholder="Sort By"
//           selectedKeys={params.sortBy ? [params.sortBy] : []}
//           onChange={(e) => updateParam("sortBy", e.target.value)}
//         >
//           <SelectItem key="price_asc" value="price_asc">
//             Price: Low to High
//           </SelectItem>
//           <SelectItem key="price_desc" value="price_desc">
//             Price: High to Low
//           </SelectItem>
//           <SelectItem key="newest" value="newest">
//             Newest
//           </SelectItem>
//         </Select>
//       </div>

//       {/* Products */}
//       <div className="lg:col-span-9">
//         <h1 className="text-2xl font-bold mb-4">Products</h1>
//         {loading ? (
//           <p>Loading...</p>
//         ) : products.length === 0 ? (
//           <p>No products found</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//             {products.map((product: any) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Product;
