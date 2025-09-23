"use client";

import { useCreateFlashSale } from "@/src/hooks/flashSale.hook";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Divider, DatePicker, Select, SelectItem } from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { useGetAllProducts } from "@/src/hooks/product.hook";
import { parseDate } from "@internationalized/date"; // helper for date
import { ChangeEvent, useState } from "react";

const CreateFlashSalePage = () => {
  const { mutate } = useCreateFlashSale();
  const { register, handleSubmit, control } = useForm();
  const { data: productsData } = useGetAllProducts();
  const products = productsData?.data|| []
  const [imageFiles, setImageFiles] = useState<File[]>([]);
 

const handelImage =(e:ChangeEvent<HTMLInputElement>)=>{
const file =e.target.files?.[0]
if (!file)  return ;
console.log(file)
setImageFiles(prev =>[...prev,file])
  }

  const onSubmit = (data: any) => {
    const  formData = new FormData()
    const flashSaleData = {
      name: data.name,
      description: data.description,
      discount: parseFloat(data.discount),
      startAt: new Date(data.startAt).toISOString(), // ✅ ISO format
    endAt: new Date(data.endAt).toISOString(),
      productsIds: data.productsIds,
    };
formData.append('data',JSON.stringify(flashSaleData));
  for (const img of imageFiles) {
    formData.append('file',img)
  }
    console.log("Flash Sale Data:", flashSaleData);
   mutate(formData);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card shadow="lg" className="rounded-2xl border-amber-500 border">
        <CardHeader className="bg-amber-500 text-white font-bold text-xl">
          Create Flash Sale
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Input
                label="Flash Sale Name"
                {...register("name", { required: true })}
              />
              <Input
                label="Flash Sale Image"
                type="file"
          
                {...register("image")}
                onChange={handelImage}
              />

              <Textarea label="Description" {...register("description")} />

              <Input
                type="number"
                label="Discount (%)"
                {...register("discount", { required: true })}
              />

              {/* ✅ DatePicker with Controller */}
              <Controller
                name="startAt"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Start Date"
                    value={field.value ? parseDate(field.value) : null}
                    onChange={(date) => field.onChange(date?.toString())}
                  />
                )}
              />

              <Controller
                name="endAt"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="End Date"
                    value={field.value ? parseDate(field.value) : null}
                    onChange={(date) => field.onChange(date?.toString())}
                  />
                )}
              />

              {/* Multi-select products */}
              <Controller
                name="productsIds"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Select Products"
                    selectionMode="multiple"
                    selectedKeys={field.value || []}
                    onSelectionChange={(keys) =>
                      field.onChange(Array.from(keys))
                    }
                  >
                    {products.map((product: any) => (
                      <SelectItem key={product.id}>{product.name}</SelectItem>
                    ))}
                  </Select>
                )}
              />
            </div>

            <Divider className="my-4" />

            <Button type="submit" className="w-full font-bold">
              Create Flash Sale
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateFlashSalePage;
