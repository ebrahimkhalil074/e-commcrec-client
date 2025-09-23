'use client'

import { useGetBrandById, useUpdateBrand } from "@/src/hooks/brand.hook";
import { useGetAllCategory } from "@/src/hooks/category.hook";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Divider, Select, SelectItem } from "@heroui/react";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

const UpdateBrandPage = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { id } = useParams();
  const { mutate } = useUpdateBrand();
  const { data: brandData } = useGetBrandById(id as string);
  const brands = brandData?.data;
  const { data: categoryData } = useGetAllCategory(undefined);
  const categories = categoryData?.data;

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      name: "",
      image: null,
      categoryId: "",
    },
  });

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    if (brands) {
      reset({
        name: brands?.name || "",
        categoryId: brands?.categoryId || "",
      });
      setImagePreview(brands.image || null); // show existing image if available
      setImageFile(null);
      setSelectedCategory(brands.categoryId);
    }
  }, [brands, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    // instant preview using URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmit = (data: any) => {
    const formData = new FormData();
    const brandData = {
      ...data,
      categoryId: selectedCategory,
    };

    formData.append("data", JSON.stringify(brandData));

    // if user selected a new file, send it
    if (imageFile) {
      formData.append("file", imageFile);
    } else if (brands?.image) {
      // preserve old image if no new one is uploaded
      formData.append("existingImage", brands.image);
    }

    mutate(formData);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card shadow="lg" className="rounded-2xl border-amber-500 border">
        <CardHeader className="bg-amber-500 text-white font-bold text-xl">
          Update Brand
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Brand Name */}
              <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
              <Input
              {...field}
              label="Brand Name"
              isRequired
              />
              )}
              />

              {/* Category Select */}
              <Select
                label="Category"
                selectedKeys={selectedCategory ? [selectedCategory] : []}
                onSelectionChange={(keys) => {
                  const val = Array.from(keys)[0] as string;
                  setSelectedCategory(val);
                  setValue("categoryId", val);
                }}
                isRequired
              >
                {categories?.map((cat: any) => (
                  <SelectItem key={cat.id}>{cat.name}</SelectItem>
                ))}
              </Select>

              {/* File Upload */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                  file:rounded-full file:border-0 file:text-sm file:font-semibold 
                  file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
              />

              {/* Show image preview */}
              {imagePreview && (
                <div className="space-y-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                  <Button
                    color="danger"
                    size="sm"
                    variant="flat"
                    onClick={handleRemoveImage}
                    type="button"
                  >
                    Remove Image
                  </Button>
                </div>
              )}
            </div>

            <Divider className="my-4" />

            <Button type="submit" className="w-full font-bold">
              Update Brand
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpdateBrandPage;
