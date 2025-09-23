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

"use client";

import { useState, useEffect, useMemo } from "react";
import ProductCard from "@/src/components/card/Product";
import { useGetAllBrands } from "@/src/hooks/brand.hook";
import { useGetAllCategory } from "@/src/hooks/category.hook";
import {
  Radio,
  RadioGroup,
  Input,
  Select,
  SelectItem,
  Button,
} from "@heroui/react";
import { FaSort } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import Heading from "@/src/components/home/Heading";

interface FilterParams {
  searchTerm: string;
  brandName: string;
  categoryName: string;
  subCategoryName: string;
  sortBy: string;
}

interface Category {
  id: string;
  name: string;
  subCategories?: { id: string; name: string }[];
}

interface Brand {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

const ProductPage = () => {
  const searchParams = useSearchParams();
  const searchTermFromUrl = searchParams.get("searchTerm") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const { register, control, setValue, reset } = useForm<FilterParams>({
    defaultValues: {
      searchTerm: searchTermFromUrl,
      brandName: "",
      categoryName: "",
      subCategoryName: "",
      sortBy: "",
    },
  });

  // watch specific fields (not whole object)
  const searchTerm = useWatch({ control, name: "searchTerm" });
  const brandName = useWatch({ control, name: "brandName" });
  const categoryName = useWatch({ control, name: "categoryName" });
  const subCategoryName = useWatch({ control, name: "subCategoryName" });
  const sortBy = useWatch({ control, name: "sortBy" });

  const { data: categoriesData, isLoading: catLoading } =
    useGetAllCategory(undefined);
  const { data: brandsData, isLoading: brandLoading } = useGetAllBrands(undefined);

  const categories: Category[] = categoriesData?.data || [];
  const brands: Brand[] = brandsData?.data || [];

  const subCategories = useMemo(() => {
    return (
      categories.find((cat) => cat.name === categoryName)?.subCategories || []
    );
  }, [categories, categoryName]);

  // ---update search term from URL ---
 useEffect(() => {
  setValue("searchTerm", searchTermFromUrl);
}, [searchTermFromUrl, setValue]);


  // --- Clear all filters ---
  const clearFilters = () => {
    reset({
      searchTerm: "",
      brandName: "",
      categoryName: "",
      subCategoryName: "",
      sortBy: "",
    });
  };

 const fetchProducts = async () => {
  setLoading(true);
  const queryParams = new URLSearchParams();

  if (searchTerm && searchTerm.trim() !== "") {
    queryParams.append("searchTerm", searchTerm);
  }
  if (brandName) queryParams.append("brandName", brandName);
  if (categoryName) queryParams.append("categoryName", categoryName);
  if (subCategoryName) queryParams.append("subCategoryName", subCategoryName);
  if (sortBy) queryParams.append("sortBy", sortBy);

  try {
    const url = `http://localhost:5000/api/v1/product?${queryParams.toString()}`
    const res = await fetch(url);
    const data = await res.json();
    setProducts(data.data || []);
  } catch (error) {
    console.error("Failed to load products", error);
    setProducts([]);
  } finally {
    setLoading(false);
  }
};


  // ✅ now only depends on stable primitive values
  useEffect(() => {
    fetchProducts();
  }, [searchTerm, brandName, categoryName, subCategoryName, sortBy]);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* --- Sidebar Filters --- */}
      <aside className="lg:col-span-3 rounded-lg p-4 space-y-6">
        {/* Search */}
        <Input placeholder="Search..." {...register("searchTerm")} />

        {/* Brand */}
        <div>
          <h3 className="font-medium mb-2">Brand</h3>
          {brandLoading ? (
            <p>Loading...</p>
          ) : (
            <RadioGroup
              value={brandName}
              onValueChange={(val) => setValue("brandName", val)}
            >
              <Radio value="">All Brands</Radio>
              {brands.map((brand) => (
                <Radio key={brand.id} value={brand.name}>
                  {brand.name}
                </Radio>
              ))}
            </RadioGroup>
          )}
        </div>

        {/* Category */}
        <div>
          <h3 className="font-medium mb-2">Category</h3>
          {catLoading ? (
            <p>Loading...</p>
          ) : (
            <RadioGroup
              value={categoryName}
              onValueChange={(val) => {
                setValue("categoryName", val);
                setValue("subCategoryName", ""); // reset subcategory
              }}
            >
              <Radio value="">All Categories</Radio>
              {categories.map((cat) => (
                <Radio key={cat.id} value={cat.name}>
                  {cat.name}
                </Radio>
              ))}
            </RadioGroup>
          )}
        </div>

        {/* SubCategory */}
        {categoryName && subCategories.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Sub Category</h3>
            <RadioGroup
              value={subCategoryName}
              onValueChange={(val) => setValue("subCategoryName", val)}
            >
              <Radio value="">All SubCategories</Radio>
              {subCategories.map((sub) => (
                <Radio key={sub.id} value={sub.name}>
                  {sub.name}
                </Radio>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Sort By */}
        <div>
          <h3 className="font-medium mb-2 flex items-center gap-2">
            <FaSort className="text-gray-500 dark:text-gray-300" />
            Sort By
          </h3>
          <Select
            variant="bordered"
            radius="md"
            className="w-full"
            aria-label="Sort products"
            placeholder="Select sort option"
            selectedKeys={sortBy ? [sortBy] : []}
            onChange={(e) => setValue("sortBy", e.target.value)}
            classNames={{
              trigger:
                "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200",
              popoverContent:
                "bg-white dark:bg-gray-800 shadow-lg rounded-lg p-1",
            }}
          >
            <SelectItem key="price_asc">Price: Low to High</SelectItem>
            <SelectItem key="price_desc">Price: High to Low</SelectItem>
            <SelectItem key="newest">Newest</SelectItem>
          </Select>
        </div>
        {/* Clear Filters */}
        <Button onPress={clearFilters} className="w-full mt-2">
          Clear Filters
        </Button>
      </aside>

      {/* --- Products Grid --- */}
      <main className="lg:col-span-9">
       <Heading 
  title="Products"
  subtitle="Explore our wide range of products"
  bgImage="https://i.ibb.co.com/gMG7x5Hx/glen-carrie-yy-V6-JA-C16w-unsplash.jpg"
/>
        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductPage;
