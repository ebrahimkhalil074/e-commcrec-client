"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/react";

import {
  useGetCayegoryById,
  useUpdateCategory,
} from "@/src/hooks/category.hook";

type FormValues = {
  name: string;
  image?: FileList;
};

export default function UpdateCategoryForm() {
  const { id } = useParams();
  const router = useRouter();
  const { data: categoryData } = useGetCayegoryById(id as string);
  const category = categoryData?.data;
  const { mutate } = useUpdateCategory();

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { name: "" },
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // When category data loads, reset form
  useEffect(() => {
    if (category) {
      reset({ name: category.name || "" });
      setImagePreview(category.image || null); // show existing image if available
      setImageFile(null); // no new file yet
    }
  }, [category, reset]);

  // handle new image selection
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();

    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();

    formData.append("data", JSON.stringify({ name: data.name }));

    if (imageFile) {
      formData.append("file", imageFile);
    }
    console.log(Object.fromEntries(formData.entries()));
    mutate({ id: category.id, categoryData: formData });

    reset();
    setImageFile(null);
    setImagePreview(null);
    router.push("/admin/categories");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="rounded-2xl border-amber-500 border" shadow="lg">
        <CardHeader className="bg-amber-500 text-white font-bold text-xl">
          Update Category
        </CardHeader>
        <CardBody>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input {...field} isRequired label="Category Name" />
              )}
              rules={{ required: true }}
            />

            {/* File Upload */}
            <input
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                file:rounded-full file:border-0 file:text-sm file:font-semibold 
                file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
              type="file"
              onChange={handleImageChange}
            />

            {/* Image Preview */}
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
                  onChange={handleRemoveImage}
                >
                  Remove Image
                </Button>
              </div>
            )}

            <Divider className="my-4" />

            <Button className="w-full bg-amber-500 font-bold " type="submit">
              Update Category
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
