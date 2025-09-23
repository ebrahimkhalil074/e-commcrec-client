'use client'

import { useGetAllCategory } from "@/src/hooks/category.hook";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Divider, Select } from "@heroui/react";
import { useForm } from "react-hook-form";
import { SelectItem } from '@heroui/select';
import { useCreateSubCategory } from "@/src/hooks/sub-cat.hook";

const CreateSubCategoryPage = () => {
  const {data:categoryData} = useGetAllCategory(undefined);
  const categories =categoryData?.data ||[] ;
  const { mutate } = useCreateSubCategory();
  const { register, handleSubmit } = useForm();

  const categoryOptions =categories?.map( (cat:any) =>( 
     {key: cat?.id, label: cat?.name}
    ))

  const onSubmit = (data: any) => {
    console.log('sub',data)
    mutate(data);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card shadow="lg" className="rounded-2xl border-amber-500 border">
        <CardHeader className="bg-amber-500 text-white font-bold text-xl">
          Create SubCategory
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 gap-6">
            <Select
      items={categoryOptions}
      label="All Categories"
      placeholder="Select an Category"
      {...register("categoryId", { required: true })}
    >
      {(cat:any) => <SelectItem>{cat.label}</SelectItem>}
    </Select>

              <Input
                label="SubCategory Name"
                {...register("name", { required: true })}
              />

              
            </div>

            <Divider className="my-4" />

            <Button type="submit" className="w-full bg-amber-500 font-bold">
              Create SubCategory
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateSubCategoryPage;
