"use client";

import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Divider, DatePicker, Select, SelectItem } from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { parseDate } from "@internationalized/date"; // helper for date
import { ChangeEvent, useState } from "react";

import { useGetAllProducts } from "@/src/hooks/product.hook";
import { useCreateFlashSale } from "@/src/hooks/flashSale.hook";

const CreateFlashSalePage = () => {
  const { mutate } = useCreateFlashSale();
  const { register, handleSubmit, control } = useForm();
  const { data: productsData } = useGetAllProducts();
  const products = productsData?.data || [];
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handelImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    console.log(file);
    setImageFiles((prev) => [...prev, file]);
  };

  const onSubmit = (data: any) => {
    const formData = new FormData();
    const flashSaleData = {
      name: data.name,
      description: data.description,
      discount: parseFloat(data.discount),
      startAt: new Date(data.startAt).toISOString(), // ✅ ISO format
      endAt: new Date(data.endAt).toISOString(),
      productsIds: data.productsIds,
    };

    formData.append("data", JSON.stringify(flashSaleData));
    for (const img of imageFiles) {
      formData.append("file", img);
    }
    console.log("Flash Sale Data:", flashSaleData);
    mutate(formData);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="rounded-2xl border-amber-500 border" shadow="lg">
        <CardHeader className="bg-amber-500 text-white font-bold text-xl">
          Create Flash Sale
        </CardHeader>
        <CardBody>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                label="Discount (%)"
                type="number"
                {...register("discount", { required: true })}
              />

              {/* ✅ DatePicker with Controller */}
              <Controller
                control={control}
                name="startAt"
                render={({ field }) => (
                  <DatePicker
                    label="Start Date"
                    value={field.value ? parseDate(field.value) : null}
                    onChange={(date) => field.onChange(date?.toString())}
                  />
                )}
              />

              <Controller
                control={control}
                name="endAt"
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
                control={control}
                name="productsIds"
                render={({ field }) => (
                  <Select
                    label="Select Products"
                    selectedKeys={field.value || []}
                    selectionMode="multiple"
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

            <Button className="w-full font-bold" type="submit">
              Create Flash Sale
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default CreateFlashSalePage;
