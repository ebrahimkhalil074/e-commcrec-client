"use client";

import { useFieldArray, useForm, useWatch, Controller } from "react-hook-form";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Select, SelectItem } from "@heroui/select";
import { useGetAllCategory } from "@/src/hooks/category.hook";
import { useGetAllBrands } from "@/src/hooks/brand.hook";
import { useGetProductById, useUpdateProduct } from "@/src/hooks/product.hook";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

type ProductForm = {
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  warranty: string;
  categoryId: string;
  subCategoryId?: string | null;
  brandId: string;
  images: { file: File | null }[];
  variants: {
    color: string;
    price?: number;
    sizes: { size: string | number | null; stock: number }[];
  }[];
};

export default function UpdateProductPage() {
  const { id } = useParams();
  const { data: productData } = useGetProductById(id as string);
  const product = productData?.data;
  const { mutate } = useUpdateProduct();

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const { control, handleSubmit, reset } = useForm<ProductForm>({
    defaultValues: {
      images: [{ file: null }],
      variants: [{ color: "", price: 0, sizes: [{ size: "", stock: 0 }] }],
      subCategoryId: null,
    },
  });

  // Load product into form
  useEffect(() => {
    if (product) {
      reset({
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        discount: product.discount || 0,
        stock: product.stock || 0,
        warranty: product.warranty || "",
        categoryId: product.categoryId || "",
        subCategoryId: product.subCategoryId || null,
        brandId: product.brandId || "",
        variants:
          product.variants?.map((v) => ({
            color: v.color || "",
            price: v.price || 0,
            sizes:
              v.sizes?.map((s) => ({
                size: s.size || "",
                stock: s.stock || 0,
              })) || [{ size: "", stock: 0 }],
          })) || [{ color: "", price: 0, sizes: [{ size: "", stock: 0 }] }],
        images: [{ file: null }],
      });

      setExistingImages(product.images?.map((img: any) => img.url) || []);
    }
  }, [product, reset]);

  // Category watch
  const selectedCategoryId = useWatch({ control, name: "categoryId" });

  // Categories & Brands
  const { data: categoryData } = useGetAllCategory(undefined);
  const categories = categoryData?.data || [];
  const { data: brandData } = useGetAllBrands(undefined);
  const brands = brandData?.data || [];

  // Image handlers
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = Array.from(files);
    setImageFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () =>
        setImagePreviews((prev) => [...prev, reader.result as string]);
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNewImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit
  const onSubmit = (data: ProductForm) => {
  const productDataToSend = {
    ...data,
    images: existingImages,
    price: Number(data.price),
    stock: Number(data.stock),
    discount: Number(data.discount),
    variants: data.variants.map((variant) => ({
      ...variant,
      price: variant.price ? Number(variant.price) : 0,
      sizes: variant.sizes.map((s) => ({
        ...s,
        size: isNaN(Number(s.size)) ? s.size : Number(s.size),
        stock: Number(s.stock),
      })),
    })),
  };

  const formData = new FormData();
  formData.append("data", JSON.stringify(productDataToSend));
  imageFiles.forEach((file) => formData.append("file", file));

  // ✅ এখন সঠিকভাবে object আকারে পাঠানো হবে
  mutate({ id: product.id, productData: formData });
  setImagePreviews([]);
};


  // Variants array
  const { fields: variantFields, append: addVariant, remove: removeVariant } =
    useFieldArray({ control, name: "variants" });

  // Subcategories filter
  const subCategories =
    categories.find((cat: any) => cat.id === selectedCategoryId)?.subCategories || [];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card shadow="lg" className="rounded-2xl border-amber-500 border">
        <CardHeader className="bg-amber-500 text-white font-bold text-xl">
          Update Product
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input label="Product Name" isRequired {...field} />}
              />
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input type="number" label="Price" isRequired {...field} />
                )}
              />
              <Controller
                name="discount"
                control={control}
                render={({ field }) => <Input type="number" label="Discount" {...field} />}
              />
              <Controller
                name="stock"
                control={control}
                render={({ field }) => <Input type="number" label="Stock" {...field} />}
              />
              <Controller
                name="warranty"
                control={control}
                render={({ field }) => <Input label="Warranty" {...field} />}
              />

              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select label="Category" {...field} selectedKeys={[field.value]}>
                    {categories.map((cat: any) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />

              <Controller
                name="subCategoryId"
                control={control}
                render={({ field }) => (
                  <Select label="SubCategory" {...field} selectedKeys={[field.value || ""]}>
                    {subCategories.map((sub: any) => (
                      <SelectItem key={sub.id} value={sub.id}>
                        {sub.name}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />

              <Controller
                name="brandId"
                control={control}
                render={({ field }) => (
                  <Select label="Brand" {...field} selectedKeys={[field.value]}>
                    {brands.map((brand: any) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
            </div>

            <Controller
              name="description"
              control={control}
              render={({ field }) => <Textarea label="Description" {...field} />}
            />

            <Divider className="my-4" />

            {/* Images Section */}
            <div>
              <h3 className="font-semibold text-lg text-amber-600">Images</h3>
              <div className="flex gap-3 flex-wrap mb-3">
                {existingImages.map((url, i) => (
                  <div key={i} className="relative w-24 h-24 border p-1">
                    <img src={url} className="w-full h-full object-cover" />
                    <Button
                      variant="flat"
                      className="absolute top-0 right-0 bg-red-500 text-white"
                      onPress={() => handleDeleteExistingImage(i)}
                    >
                      X
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 flex-wrap mb-3">
                {imagePreviews.map((url, i) => (
                  <div key={i} className="relative w-[200px] border p-1">
                    <img src={url} className="w-full h-full object-cover" />
                    <Button
                      variant="shadow"
                      size="sm"
                      className="absolute top-0 right-0 text-red-500"
                      onPress={() => handleRemoveNewImage(i)}
                    >
                      X
                    </Button>
                  </div>
                ))}
              </div>

              <Input
                type="file"
                className="rounded-md p-2 flex-1"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <Divider className="my-4" />

            {/* Variants Section */}
            <div>
              <h3 className="font-semibold text-lg text-amber-600">Variants</h3>
              {variantFields.map((variant, vIndex) => (
                <Card key={variant.id} className="p-4 border border-amber-200 rounded-lg mt-3">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Controller
                      name={`variants.${vIndex}.color`}
                      control={control}
                      render={({ field }) => <Input label="Color" {...field} />}
                    />
                    <Controller
                      name={`variants.${vIndex}.price`}
                      control={control}
                      render={({ field }) => (
                        <Input type="number" label="Variant Price" {...field} />
                      )}
                    />
                  </div>
                  <div className="mt-3">
                    <h4 className="text-amber-500 font-medium">Sizes</h4>
                    <VariantSizes control={control} vIndex={vIndex} />
                  </div>
                </Card>
              ))}
              <div className="flex justify-between gap-3 mt-3">
                <Button
                  variant="flat"
                  onPress={() =>
                    addVariant({ color: "", price: 0, sizes: [{ size: "", stock: 0 }] })
                  }
                  className="bg-amber-500 text-white"
                >
                  + Add Variant
                </Button>
                <Button
                  variant="flat"
                  onPress={() => removeVariant(variantFields.length - 1)}
                  className="bg-red-500 text-white"
                  isDisabled={variantFields.length === 0}
                >
                  - Remove Variant
                </Button>
              </div>
            </div>

            <Divider className="my-4" />

            <Button type="submit" className="w-full font-bold bg-amber-500 text-white">
              Update Product
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

// Sizes subcomponent
function VariantSizes({ control, vIndex }: any) {
  const { fields, append } = useFieldArray({
    control,
    name: `variants.${vIndex}.sizes`,
  });

  return (
    <div className="space-y-3 mt-2">
      {fields.map((field, sIndex) => (
        <div key={field.id} className="flex gap-3 items-center">
          <Controller
            name={`variants.${vIndex}.sizes.${sIndex}.size`}
            control={control}
            render={({ field }) => <Input label="Size" {...field} />}
          />
          <Controller
            name={`variants.${vIndex}.sizes.${sIndex}.stock`}
            control={control}
            render={({ field }) => <Input type="number" label="Stock" {...field} />}
          />
        </div>
      ))}
      <Button variant="flat" onPress={() => append({ size: "", stock: 0 })}>
        + Add Size
      </Button>
    </div>
  );
}
