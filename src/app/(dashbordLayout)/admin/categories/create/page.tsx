"use client";

import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Divider } from "@heroui/react";
import { useForm } from "react-hook-form";

import { useCreateCategory } from "@/src/hooks/category.hook";

const CreateCategoryPage = () => {
  const { mutate } = useCreateCategory();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    const formData = new FormData();
    const catData = {
      ...data,
    };

    // ✅ শুধু টেক্সট ডাটা JSON আকারে পাঠান
    formData.append("data", JSON.stringify(catData));

    // ✅ FileList থেকে ফাইল নিন
    if (data.image && data.image[0]) {
      formData.append("file", data.image[0]);
    }

    mutate(formData);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="rounded-2xl border-amber-500 border" shadow="lg">
        <CardHeader className="bg-amber-500 text-white font-bold text-xl">
          Create Category
        </CardHeader>
        <CardBody>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Basic Info */}
            <div className="grid grid-cols-1 gap-6">
              <Input
                label="Category Name"
                {...register("name", { required: true })}
              />

              <Input
                label="Image"
                type="file"
                {...register("image", { required: true })}
              />
            </div>

            <Divider className="my-4" />

            <Button className="w-full font-bold" type="submit">
              Create Category
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateCategoryPage;
