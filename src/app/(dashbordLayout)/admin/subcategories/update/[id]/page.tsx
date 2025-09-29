"use client";

import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import {
  useGetSubCayegoryById,
  useUpdateSubCategory,
} from "@/src/hooks/sub-cat.hook";
import { useGetAllCategory } from "@/src/hooks/category.hook";

const UpdateSubCategoryPage = () => {
  const { id } = useParams();

  // SubCategory by ID
  const { data: subCategoryData } = useGetSubCayegoryById(id as string);

  // All Categories for showing parent
  const { data: categoryData } = useGetAllCategory(undefined);
  const categories = categoryData?.data || [];

  const { mutate } = useUpdateSubCategory();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: subCategoryData?.data?.name || "",
    },
  });

  useEffect(() => {
    if (subCategoryData?.data) {
      reset({
        name: subCategoryData.data.name,
      });
    }
  }, [subCategoryData, reset]);

  const categoryOptions = categories.map((cat: any) => ({
    key: cat?.id,
    label: cat?.name,
  }));

  const parentCategory = categoryOptions.find(
    (c: any) => c.key === subCategoryData?.data?.categoryId,
  );

  const onSubmit = (data: any) => {
    const updatedData = {
      id: subCategoryData.data.id,
      data: data,
    };

    mutate(updatedData);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="rounded-2xl border-amber-500 border" shadow="lg">
        <CardHeader className="bg-amber-500 text-white font-bold text-xl">
          Update SubCategory
        </CardHeader>
        <CardBody>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Show Parent Category (Read only) */}
            <Input
              isReadOnly
              label="Parent Category"
              value={parentCategory?.label || "N/A"}
            />

            {/* SubCategory Name (Editable) */}
            <Input
              label="SubCategory Name"
              {...register("name", { required: true })}
              defaultValue={subCategoryData?.data?.name}
            />

            <Divider className="my-4" />

            <Button className="w-full bg-amber-500 font-bold" type="submit">
              Update SubCategory
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpdateSubCategoryPage;
