"use client";

import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Select, SelectItem } from "@heroui/select";
import { ChangeEvent, useState } from "react";
import Image from "next/image";

import { useGetAllCategory } from "@/src/hooks/category.hook";
import { useGetAllBrands } from "@/src/hooks/brand.hook";
import { useCreateProduct } from "@/src/hooks/product.hook";

type ProductForm = {
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  rating: number;
  reviewCount: number;
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

export default function CreateProductPage() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { mutate, isPending } = useCreateProduct();

  const { register, control, handleSubmit, reset } = useForm<ProductForm>({
    defaultValues: {
      images: [{ file: null }],
      variants: [
        {
          color: "",
          price: 0,
          sizes: [{ size: null, stock: 0 }],
        },
      ],
      subCategoryId: null,
    },
  });

  // Selected category watch
  const selectedCategoryId = useWatch({ control, name: "categoryId" });

  // Category Data
  const { data: categoryData } = useGetAllCategory(undefined);
  const categories = categoryData?.data || [];

  // Brand Data
  const { data: brandData } = useGetAllBrands(undefined);
  const brands = brandData?.data || [];

  // Image Change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFiles((prev) => [...prev, file]);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreviews((prev) => [...prev, reader.result as string]);
    };
    reader.readAsDataURL(file);
  };

  // Handle submit
  // Handle submit
  const onSubmit = (data: ProductForm) => {
    // Convert string -> number where needed
    const productData = {
      ...data,
      price: Number(data.price),
      stock: Number(data.stock),
      discount: Number(data.discount),
      variants: data.variants.map((variant) => ({
        ...variant,
        price: variant.price ? Number(variant.price) : 0,
        sizes: variant.sizes.map((s) => ({
          ...s,
          size: isNaN(Number(s.size)) ? s.size : Number(s.size), // size = number or string
          stock: Number(s.stock), // 🔹 ensure stock is number
        })),
      })),
    };

    console.log({ productData });
    const formData = new FormData();

    formData.append("data", JSON.stringify(productData));
    for (let image of imageFiles) {
      formData.append("file", image);
    }

    mutate(formData);
    setImagePreviews([]);
    reset();
  };

  // Images array
  const {
    fields: imageFields,
    append: addImage,
    remove: removeImage,
  } = useFieldArray({
    control,
    name: "images",
  });

  // Variants array
  const {
    fields: variantFields,
    append: addVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  // Filtered SubCategories
  const subCategories =
    categories.find((cat: any) => cat.id === selectedCategoryId)
      ?.subCategories || [];

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="rounded-2xl border-amber-500 border" shadow="lg">
        <CardHeader className="bg-amber-500 text-white font-bold text-xl">
          Create Product
        </CardHeader>
        <CardBody>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Product Name" {...register("name")} isRequired />
              <Input
                label="Price"
                type="number"
                {...register("price", { setValueAs: (v) => Number(v) })}
                isRequired
              />
              <Input
                label="Discount"
                type="number"
                {...register("discount", { setValueAs: (v) => Number(v) })}
              />
              <Input
                label="Stock"
                type="number"
                {...register("stock", { setValueAs: (v) => Number(v) })}
              />
              <Input label="Warranty" {...register("warranty")} />

              {/* Category Select */}
              <Select label="Category" {...register("categoryId")} isRequired>
                {categories.map((cat: any) => (
                  <SelectItem key={cat.id}>{cat.name}</SelectItem>
                ))}
              </Select>

              {/* SubCategory Select */}
              <Select
                label="SubCategory"
                {...register("subCategoryId", {
                  setValueAs: (value) => (value === "" ? null : value),
                })}
              >
                {subCategories.map((sub: any) => (
                  <SelectItem key={sub.id}>{sub.name}</SelectItem>
                ))}
              </Select>

              {/* Brand Select */}
              <Select label="Brand" {...register("brandId")} isRequired>
                {brands.map((brand: any) => (
                  <SelectItem key={brand.id}>{brand.name}</SelectItem>
                ))}
              </Select>
            </div>

            <Textarea
              label="Description"
              {...register("description")}
              className="w-full"
            />

            <Divider className="my-4" />

            {/* Images Section */}
            <div>
              <h3 className="font-semibold text-lg text-amber-600">Images</h3>
              <div className="space-y-3">
                {imageFields.map((field, index) => (
                  <div key={field.id} className="flex gap-3 items-center">
                    <input
                      multiple
                      accept="image/*"
                      className="border rounded-md p-2 flex-1"
                      type="file"
                      onChange={handleImageChange}
                    />
                    <Button
                      className="bg-amber-500 hover:bg-red-500 text-white"
                      onPress={() => removeImage(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                {imagePreviews.length > 0 && (
                  <div className="flex gap-5 my-5 flex-wrap">
                    {imagePreviews.map((imageDataUrl, i) => (
                      <div
                        key={i}
                        className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                      >
                        <Image
                          fill
                          alt="item"
                          className="h-full w-full object-cover object-center rounded-md"
                          src={imageDataUrl}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <Button variant="flat" onPress={() => addImage({ file: null })}>
                  + Add Image
                </Button>
              </div>
            </div>

            <Divider className="my-4" />

            {/* Variants Section */}
            <div>
              <h3 className="font-semibold text-lg text-amber-600">Variants</h3>
              {variantFields.map((variant, vIndex) => (
                <Card
                  key={variant.id}
                  className="p-4 border border-amber-200 rounded-lg mt-3"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <Input
                      label="Color"
                      {...register(`variants.${vIndex}.color`)}
                    />
                    <Input
                      label="Variant Price"
                      type="number"
                      {...register(`variants.${vIndex}.price`, {
                        setValueAs: (v) => (v === "" ? 0 : Number(v)),
                      })}
                    />
                  </div>

                  <div className="mt-3">
                    <h4 className="text-amber-500 font-medium">Sizes</h4>
                    <VariantSizes
                      control={control}
                      register={register}
                      vIndex={vIndex}
                    />
                  </div>
                </Card>
              ))}
              <div className="flex justify-between items-center mt-3">
                <Button
                  className="bg-amber-500 hover:bg-green-500 text-white"
                  variant="flat"
                  onPress={() =>
                    addVariant({
                      color: "",
                      price: 0,
                      sizes: [{ size: "", stock: 0 }],
                    })
                  }
                >
                  + Add Variant
                </Button>
                <Button
                  className="bg-amber-500 hover:bg-red-500 text-white"
                  isDisabled={variantFields.length === 0}
                  variant="flat"
                  onPress={() => removeVariant(variantFields.length - 1)}
                >
                  - Remove Variant
                </Button>
              </div>
            </div>

            <Divider className="my-4" />

            <Button className="w-full font-bold" type="submit">
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

// Sub-component for Sizes
function VariantSizes({ control, vIndex, register }: any) {
  const { fields, append } = useFieldArray({
    control,
    name: `variants.${vIndex}.sizes`,
  });

  return (
    <div className="space-y-3 mt-2">
      {fields.map((field, sIndex) => (
        <div key={field.id} className="flex gap-3 items-center">
          <Input
            label="Size"
            {...register(`variants.${vIndex}.sizes.${sIndex}.size`, {
              setValueAs: (v: any) => {
                // convert to number if possible
                return v !== "" && !isNaN(Number(v)) ? Number(v) : v;
              },
            })}
          />
          <Input
            label="Stock"
            type="number"
            {...register(`variants.${vIndex}.sizes.${sIndex}.stock`, {
              setValueAs: (v: any) => Number(v),
            })}
          />
        </div>
      ))}
      <Button variant="flat" onPress={() => append({ size: "", stock: 0 })}>
        + Add Size
      </Button>
    </div>
  );
}
