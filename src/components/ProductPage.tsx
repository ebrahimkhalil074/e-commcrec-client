"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Radio,
  RadioGroup,
  Input,
  Select,
  SelectItem,
  Button,
} from "@heroui/react";
import { motion } from "framer-motion";
import { FaSort } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";

import SidebarSkeleton from "./skeloton/SidebarSkeleton";
import ProductSkeletonGrid from "./skeloton/ProductSkeletonGrid";

import { useGetAllCategory } from "@/src/hooks/category.hook";
import { useGetAllBrands } from "@/src/hooks/brand.hook";
import ProductCard from "@/src/components/card/Product";

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

  const searchTerm = useWatch({ control, name: "searchTerm" });
  const brandName = useWatch({ control, name: "brandName" });
  const categoryName = useWatch({ control, name: "categoryName" });
  const subCategoryName = useWatch({ control, name: "subCategoryName" });
  const sortBy = useWatch({ control, name: "sortBy" });

  const { data: categoriesData, isLoading: catLoading } =
    useGetAllCategory(undefined);
  const { data: brandsData, isLoading: brandLoading } =
    useGetAllBrands(undefined);

  const categories: Category[] = categoriesData?.data || [];
  const brands: Brand[] = brandsData?.data || [];

  const subCategories = useMemo(() => {
    return (
      categories.find((cat) => cat.name === categoryName)?.subCategories || []
    );
  }, [categories, categoryName]);

  useEffect(() => {
    setValue("searchTerm", searchTermFromUrl);
  }, [searchTermFromUrl, setValue]);

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
      const queryString = queryParams.toString();
      const url = `${process.env.NEXT_PUBLIC_BASE_API}/product${queryString ? `?${queryString}` : ""}`;
      const res = await fetch(url);
      const data = await res.json();

      setProducts(data?.data || []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, brandName, categoryName, subCategoryName, sortBy]);

  // ---- Animation variants ----
  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Sidebar */}
      <aside className="lg:col-span-3 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-900">
        {brandLoading || catLoading ? (
          <SidebarSkeleton />
        ) : (
          <>
            <Input placeholder="Search..." {...register("searchTerm")} />

            <div>
              <h3 className="font-medium mb-2">Brand</h3>
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
            </div>

            <div>
              <h3 className="font-medium mb-2">Category</h3>
              <RadioGroup
                value={categoryName}
                onValueChange={(val) => {
                  setValue("categoryName", val);
                  setValue("subCategoryName", "");
                }}
              >
                <Radio value="">All Categories</Radio>
                {categories.map((cat) => (
                  <Radio key={cat.id} value={cat.name}>
                    {cat.name}
                  </Radio>
                ))}
              </RadioGroup>
            </div>

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

            <div>
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <FaSort className="text-gray-500 dark:text-gray-300" />
                Sort By
              </h3>
              <Select
                aria-label="Sort products"
                className="w-full"
                placeholder="Select sort option"
                radius="md"
                selectedKeys={sortBy ? [sortBy] : []}
                variant="bordered"
                onChange={(e) => setValue("sortBy", e.target.value)}
              >
                <SelectItem key="price_asc">Price: Low to High</SelectItem>
                <SelectItem key="price_desc">Price: High to Low</SelectItem>
                <SelectItem key="newest">Newest</SelectItem>
              </Select>
            </div>

            <Button className="w-full mt-2" onPress={clearFilters}>
              Clear Filters
            </Button>
          </>
        )}
      </aside>

      {/* Product Grid */}
      <main className="lg:col-span-9">
        <motion.div
          className="relative py-2 text-center"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            All <span className="text-amber-600">Products</span>
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse our wide range of high-quality products. From the latest
            electronics to everyday essentials, find everything you need in one
            place.
          </p>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-500 via-pink-400 to-amber-500 rounded-full" />
        </motion.div>

        {loading ? (
          <ProductSkeletonGrid />
        ) : products.length === 0 ? (
          <p className="text-center mt-10 text-gray-500">No products found</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
            initial="hidden"
            variants={containerVariants}
            viewport={{ once: false, amount: 0.2 }}
            whileInView="show"
          >
            {products.map((product) => (
              <motion.div
                key={product.id}
                transition={{ duration: 0.3 }}
                variants={cardVariants}
                viewport={{ once: false, amount: 0.2 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default ProductPage;
