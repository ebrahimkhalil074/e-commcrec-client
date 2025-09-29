"use client";

import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Divider, Select } from "@heroui/react";
import { useForm } from "react-hook-form";
import { SelectItem } from "@heroui/select";

import { useGetAllCategory } from "@/src/hooks/category.hook";
import { useCreateSubCategory } from "@/src/hooks/sub-cat.hook";

const CreateSubCategoryPage = () => {
  const { data: categoryData } = useGetAllCategory(undefined);
  const categories = categoryData?.data || [];
  const { mutate } = useCreateSubCategory();
  const { register, handleSubmit } = useForm();

  const categoryOptions = categories?.map((cat: any) => ({
    key: cat?.id,
    label: cat?.name,
  }));

  const onSubmit = (data: any) => {
    console.log("sub", data);
    mutate(data);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="rounded-2xl border-amber-500 border" shadow="lg">
        <CardHeader className="bg-amber-500 text-white font-bold text-xl">
          Create SubCategory
        </CardHeader>
        <CardBody>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Basic Info */}
            <div className="grid grid-cols-1 gap-6">
              <Select
                items={categoryOptions}
                label="All Categories"
                placeholder="Select an Category"
                {...register("categoryId", { required: true })}
              >
                {(cat: any) => <SelectItem>{cat.label}</SelectItem>}
              </Select>

              <Input
                label="SubCategory Name"
                {...register("name", { required: true })}
              />
            </div>

            <Divider className="my-4" />

            <Button className="w-full bg-amber-500 font-bold" type="submit">
              Create SubCategory
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateSubCategoryPage;
