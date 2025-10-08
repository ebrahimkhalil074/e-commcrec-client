"use client";

import { useForm, Controller } from "react-hook-form";
import { Input, Textarea, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

import { useCreateSellerRequest } from "../../hooks/user.hook";

import { useUser } from "@/src/context/User.context";

type FormValues = {
  name: string;
  phone: string;
  address: string;
  description: string;
  logo: FileList;
};

export default function BecomeSeller() {
  const { user } = useUser();
  const { mutate, isPending } = useCreateSellerRequest();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    const formData = new FormData();
    const sellerData = {
      ...data,
    };

    formData.append("data", JSON.stringify(sellerData));

    if (data.logo && data?.logo[0]) {
      formData.append("file", data.logo[0]);
    }

    mutate(formData);
  };

  return (
    <div className="bg-gradient-to-b from-amber-50 to-white dark:from-gray-700 dark:to-gray-800 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <div className="relative py-15 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 dark:text-gray-100 leading-tight">
          Start Your <span className="text-amber-500">Business</span> Today
        </h1>
        <p className="text-gray-600 dark:text-gray-200 mb-8 text-lg">
          Join our seller community and reach thousands of customers. Easy
          setup, secure payments, and complete control over your shop.
        </p>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-500 via-pink-400 to-amber-500 rounded-full" />
      </div>

      {/* Main Content */}
      <div className="w-full min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-700">
        {/* LEFT SIDE: Hero Image */}
        <div className="flex-1 relative flex items-center justify-center md:justify-start p-6 md:p-12 bg-gray-100 dark:bg-gray-600">
          <div className="relative w-full max-w-md md:max-w-lg h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
            <Image
              fill
              alt="Become a Seller"
              className="object-cover"
              src="https://i.ibb.co/d00Cj6Ry/3869484.jpg"
            />
          </div>

          {/* Subtle decorative shapes */}
          <div className="absolute top-5 right-5 w-32 h-32 bg-amber-200 rounded-full opacity-20 filter blur-2xl" />
          <div className="absolute bottom-5 left-5 w-24 h-24 bg-amber-300 rounded-full opacity-15 filter blur-2xl" />
        </div>

        {/* RIGHT SIDE: Form */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-12">
          <form
            className="space-y-5 bg-white dark:bg-gray-700 p-10 rounded-2xl shadow-xl max-w-md"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <Input
                  {...field}
                  className="dark:bg-gray-600 dark:text-gray-100"
                  label="Shop Name"
                  placeholder="Enter your shop name"
                />
              )}
              rules={{ required: "Shop Name is required" }}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <Input
                  {...field}
                  className="dark:bg-gray-600 dark:text-gray-100"
                  label="Phone"
                  placeholder="Enter your phone number"
                />
              )}
              rules={{ required: "Phone is required" }}
            />
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <Input
                  {...field}
                  className="dark:bg-gray-600 dark:text-gray-100"
                  label="Address"
                  placeholder="Enter shop address"
                />
              )}
              rules={{ required: "Address is required" }}
            />
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <Textarea
                  {...field}
                  className="dark:bg-gray-600 dark:text-gray-100"
                  label="Description"
                  placeholder="Tell us about your shop"
                />
              )}
            />
            <Input
              {...register("logo")}
              className="dark:bg-gray-700 dark:text-gray-100"
              label="Logo"
              type="file"
            />
            {user ? (
              <Button
                className="w-full font-semibold mt-4 py-3 bg-amber-500"
                radius="lg"
                type="submit"
              >
                Submit Request
              </Button>
            ) : (
              <Link href="/login">
                <Button
                  className="w-full font-semibold mt-4 py-3 bg-amber-500"
                  radius="lg"
                >
                  login
                </Button>
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
