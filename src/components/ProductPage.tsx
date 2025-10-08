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
import { FaSort } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";

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

  // watch specific fields (not whole object)
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
      const queryString = queryParams.toString();
      const url = `${process.env.NEXT_PUBLIC_BASE_API}/product${queryString ? `?${queryString}` : ""}`;
      const res = await fetch(url);
      const data = await res.json();

      setProducts(data?.data || []);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
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
            aria-label="Sort products"
            className="w-full"
            classNames={{
              trigger:
                "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200",
              popoverContent:
                "bg-white dark:bg-gray-800 shadow-lg rounded-lg p-1",
            }}
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
        {/* Clear Filters */}
        <Button className="w-full mt-2" onPress={clearFilters}>
          Clear Filters
        </Button>
      </aside>

      {/* --- Products Grid --- */}
      <main className="lg:col-span-9">
        <div className="relative py-2 text-center">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            All <span className="text-amber-600">Products</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Browse our wide range of high-quality products. From the latest
            electronics to everyday essentials, find everything you need in one
            place.
          </p>

          {/* Gradient underline */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-500 via-pink-400 to-amber-500 rounded-full" />
        </div>

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
