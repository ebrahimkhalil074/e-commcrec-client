"use client";

import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Divider, Select, SelectItem } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useGetAllCategory } from "@/src/hooks/category.hook";
import { useCreateBrand } from "@/src/hooks/brand.hook";

const CreateBrandPage = () => {
  const router = useRouter();
  const { mutate } = useCreateBrand();
  const { data: categoryData } = useGetAllCategory(undefined);
  const categories = categoryData?.data;
  const { register, handleSubmit } = useForm();
  const categoryOptions = categories?.map((cat: any) => ({
    key: cat?.id,
    label: cat?.name,
  }));
  const onSubmit = (data: any) => {
    const formData = new FormData();
    const brandData = {
      ...data,
    };

    // ✅ শুধু টেক্সট ডাটা JSON আকারে পাঠান
    formData.append("data", JSON.stringify(brandData));

    // ✅ FileList থেকে ফাইল নিন
    if (data.image && data.image[0]) {
      formData.append("file", data.image[0]);
    }
    mutate(formData);
    router.push("/admin/brands");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="rounded-2xl border-amber-500 border" shadow="lg">
        <CardHeader className="bg-amber-500 text-white font-bold text-xl">
          Create Brand
        </CardHeader>
        <CardBody>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Basic Info */}
            <div className="grid grid-cols-1 gap-6">
              <Input
                label="Brand Name"
                {...register("name", { required: true })}
                isRequired
              />

              {/* Category Select */}
              <Select label="Category" {...register("categoryId")} isRequired>
                {categories?.map((cat: any) => (
                  <SelectItem key={cat.id}>{cat.name}</SelectItem>
                ))}
              </Select>

              <Input
                label="Image"
                type="file"
                {...register("image")}
                isRequired
              />
            </div>

            <Divider className="my-4" />

            <Button className="w-full font-bold" type="submit">
              Create Brand
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateBrandPage;
