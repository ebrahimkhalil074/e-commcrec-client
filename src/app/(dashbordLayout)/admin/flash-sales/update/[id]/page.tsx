"use client";

import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Divider, DatePicker, Select, SelectItem } from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { useGetAllProducts } from "@/src/hooks/product.hook";
import { parseDate } from "@internationalized/date"; 
import { useParams, useRouter } from "next/navigation";
import { useGetFlashSaleById, useUpdateFlashSale } from "@/src/hooks/flashSale.hook";
import { useEffect } from "react";

const UpdateFlashSalePage = () => {
  const router = useRouter()
  const { id } = useParams();
  const { data: flashSaleData } = useGetFlashSaleById(id as string);
  const flashSale = flashSaleData?.data;


  const { mutate } = useUpdateFlashSale();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
      discount: "",
      startAt: "",
      endAt: "",
      productsIds: [],
    },
  });

  const { data: productsData } = useGetAllProducts();
  const products = productsData?.data || [];

  // ✅ যখন flashSale আসবে তখন form এ বসাও
  useEffect(() => {
    if (flashSale) {
      reset({
        name: flashSale.name || "hyu",
        description: flashSale.description || "",
        discount: flashSale.discount?.toString() || "",
        startAt: flashSale.startAt ? flashSale.startAt.split("T")[0] : "",
        endAt: flashSale.endAt ? flashSale.endAt.split("T")[0] : "",
        productsIds: flashSale.products?.map((p: any) => p.id) || [],
      });
    }
  }, [flashSale, reset]);

  const onSubmit = (data: any) => {
    const flashSaleData = {
      name: data.name,
      description: data.description,
      discount: parseFloat(data.discount),
      startAt: new Date(data.startAt).toISOString(),
      endAt: new Date(data.endAt).toISOString(),
      productsIds: data.productsIds,
    };

    console.log("Flash Sale Data:", flashSaleData);
    mutate({id:flashSale.id,data:flashSaleData});
    router.push('/admin/flash-sales')
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card shadow="lg" className="rounded-2xl border-amber-500 border">
        <CardHeader className="bg-amber-500 text-white font-bold text-xl">
          Update Flash Sale
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
          <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
          <Input
          {...field}
          label="Name"
          />
          )}
          />
        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
          <Textarea
          {...field}
          label="Description"
          />
          )}
          />
             


        <Controller
          name="discount"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
          <Input
          {...field}
          type="number"
          label="Discount (%)"
          />
          )}
          />


              {/* ✅ Start Date */}
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

              {/* ✅ End Date */}
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

              {/* ✅ Multi-select products */}
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
              Update Flash Sale
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpdateFlashSalePage;
