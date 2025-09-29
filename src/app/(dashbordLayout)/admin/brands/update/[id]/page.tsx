"use client";

import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Divider, Select, SelectItem } from "@heroui/react";
import { useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { useGetAllCategory } from "@/src/hooks/category.hook";
import { useGetBrandById, useUpdateBrand } from "@/src/hooks/brand.hook";

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
      <Card className="rounded-2xl border-amber-500 border" shadow="lg">
        <CardHeader className="bg-amber-500 text-white font-bold text-xl">
          Update Brand
        </CardHeader>
        <CardBody>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-6">
              {/* Brand Name */}
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input {...field} isRequired label="Brand Name" />
                )}
                rules={{ required: true }}
              />

              {/* Category Select */}
              <Select
                isRequired
                label="Category"
                selectedKeys={selectedCategory ? [selectedCategory] : []}
                onSelectionChange={(keys) => {
                  const val = Array.from(keys)[0] as string;

                  setSelectedCategory(val);
                  setValue("categoryId", val);
                }}
              >
                {categories?.map((cat: any) => (
                  <SelectItem key={cat.id}>{cat.name}</SelectItem>
                ))}
              </Select>

              {/* File Upload */}
              <input
                accept="image/*"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                  file:rounded-full file:border-0 file:text-sm file:font-semibold 
                  file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                type="file"
                onChange={handleImageChange}
              />

              {/* Show image preview */}
              {imagePreview && (
                <div className="space-y-2">
                  <img
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                    src={imagePreview}
                  />
                  <Button
                    color="danger"
                    size="sm"
                    type="button"
                    variant="flat"
                    onClick={handleRemoveImage}
                  >
                    Remove Image
                  </Button>
                </div>
              )}
            </div>

            <Divider className="my-4" />

            <Button className="w-full font-bold" type="submit">
              Update Brand
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpdateBrandPage;
