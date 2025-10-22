"use client";

import React, { useMemo, useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Textarea, Button } from "@heroui/react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkedAlt,
  FaCity,
  FaRegAddressCard,
  FaGlobeAsia,
  FaLandmark,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { useCreateOrder } from "@/src/hooks/order.hook";
import { useUser } from "@/src/context/User.context";
import { useGetUserByEmail } from "@/src/hooks/user.hook";
import { useGetCart } from "@/src/hooks/cart.hook";
import { useCreateAddress } from "@/src/hooks/address.hook";
import { IconInput } from "@/src/components/form/IconInput";

type AddressFormValues = {
  fullName: string;
  email?: string;
  phone: string;
  street: string;
  city: string;
  district?: string;
  state?: string;
  postalCode: string;
  country: string;
  type: "SHIPPING" | "BILLING" | "BOTH";
  landmark?: string;
  paidAmount?: number;
};

export default function CheckoutPage() {
  const { data, isLoading } = useGetCart();
  const cartItems = (data as { items: any[] })?.items ?? [];

  const { user } = useUser();
  const { data: userData } = useGetUserByEmail(user?.email as string);
  const currentUser = userData?.data;
  const billingAddress = currentUser?.addresses?.find(
    (addr: any) => addr.type === "BILLING",
  );

  const totalPrice = useMemo(
    () =>
      cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormValues>({
    defaultValues: {
      fullName: "",
      email: user?.email || "",
      phone: "",
      street: "",
      city: "",
      district: "",
      state: "",
      postalCode: "",
      country: "Bangladesh",
      type: "SHIPPING",
      landmark: "",
      paidAmount: 0,
    },
  });

  const paidAmount = useWatch({ control, name: "paidAmount", defaultValue: 0 });
  const dueAmount =
    user?.role === "SELLER"
      ? Math.max(totalPrice - (paidAmount || 0), 0)
      : totalPrice;

  useEffect(() => {
    if (billingAddress) {
      reset({
        fullName: billingAddress.fullName || "",
        email: billingAddress.email || user?.email || "",
        phone: billingAddress.phone || "",
        street: billingAddress.street || "",
        city: billingAddress.city || "",
        district: billingAddress.district || "",
        state: billingAddress.state || "",
        postalCode: billingAddress.postalCode || "",
        country: billingAddress.country || "Bangladesh",
        type: billingAddress.type as "SHIPPING" | "BILLING" | "BOTH",
        landmark: billingAddress.landmark || "",
        paidAmount: 0,
      });
    }
  }, [billingAddress, reset, user?.email]);

  const { mutate } = useCreateOrder();
  const { mutate: saveAddressMutate } = useCreateAddress();

  const onSubmit = (formData: AddressFormValues) => {
    const orderData = {
      customerAddress: formData,
      items: cartItems,
      total: totalPrice,
      userAddressId: billingAddress?.id || null,
    };

    mutate(orderData, {
      onSuccess: (res) => {
        const data = res?.data;

        if (!data) {
          return toast.error("Something went wrong. Please try again.");
        }
        const { paymentUrl, dueId } = data;

        if (user?.role === "SELLER" && !formData.paidAmount) {
          toast.success(
            `Order placed successfully! Pending due: ${totalPrice}`,
          );

          return;
        }
        if (paymentUrl) window.location.href = paymentUrl;
        else
          toast.success(
            `Order placed successfully! Pending due: ${dueId ?? dueAmount}`,
          );
      },
      onError: () => {
        toast.error("Order creation failed. Please try again.");
      },
    });
  };

  const handleSaveAddress = (formData: AddressFormValues) => {
    if (!user) return toast.error("Login required");
    saveAddressMutate({
      fullName: formData.fullName,
      email: formData.email || user?.email || "",
      phone: formData.phone,
      street: formData.street,
      city: formData.city,
      district: formData.district,
      state: formData.state,
      postalCode: formData.postalCode,
      country: formData.country,
      type: formData.type,
      landmark: formData.landmark,
    });
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-4xl font-extrabold text-amber-600 mb-10 text-center sm:text-left"
        {...fadeInUp}
      >
        Checkout
      </motion.h1>

      <motion.form
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        onSubmit={handleSubmit(onSubmit)}
        {...fadeInUp}
      >
        {/* Billing / Shipping Form */}
        <motion.div
          className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6"
          {...fadeInUp}
        >
          <h2 className="col-span-2 text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Billing / Shipping Details
          </h2>

          {/* Full Name */}
          <Controller
            control={control}
            name="fullName"
            render={({ field }) => (
              <IconInput
                required
                error={errors.fullName?.message}
                field={field}
                icon={FaUser}
                label="Full Name"
              />
            )}
            rules={{ required: "Full name is required" }}
          />

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <IconInput
                error={errors.email?.message}
                field={field}
                icon={FaEnvelope}
                label="Email (Optional)"
              />
            )}
            rules={{
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            }}
          />

          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <IconInput
                required
                error={errors.phone?.message}
                field={field}
                icon={FaPhoneAlt}
                label="Phone"
              />
            )}
            rules={{ required: "Phone number is required" }}
          />

          <Controller
            control={control}
            name="street"
            render={({ field }) => (
              <motion.div
                className="flex flex-col gap-1 sm:col-span-2"
                {...fadeInUp}
              >
                <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-900 p-3 rounded-xl shadow-sm hover:shadow-md transition">
                  <FaMapMarkedAlt className="text-amber-500 text-xl mt-2" />
                  <Textarea
                    {...field}
                    className="flex-1"
                    errorMessage={errors.street?.message}
                    isInvalid={!!errors.street}
                    label="Street Address"
                    rows={3}
                  />
                </div>
              </motion.div>
            )}
            rules={{ required: "Street address is required" }}
          />

          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <IconInput
                required
                error={errors.city?.message}
                field={field}
                icon={FaCity}
                label="City"
              />
            )}
            rules={{ required: "City is required" }}
          />

          <Controller
            control={control}
            name="district"
            render={({ field }) => (
              <IconInput
                field={field}
                icon={FaRegAddressCard}
                label="District (Optional)"
              />
            )}
          />

          <Controller
            control={control}
            name="state"
            render={({ field }) => (
              <IconInput
                field={field}
                icon={FaRegAddressCard}
                label="State (Optional)"
              />
            )}
          />

          <Controller
            control={control}
            name="postalCode"
            render={({ field }) => (
              <IconInput
                required
                error={errors.postalCode?.message}
                field={field}
                icon={FaEnvelope}
                label="Postal Code"
              />
            )}
            rules={{ required: "Postal Code is required" }}
          />

          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <IconInput
                required
                error={errors.country?.message}
                field={field}
                icon={FaGlobeAsia}
                label="Country"
              />
            )}
            rules={{ required: "Country is required" }}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <motion.div
                className="flex flex-col gap-1 sm:col-span-2"
                {...fadeInUp}
              >
                <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 p-3 rounded-xl shadow-sm hover:shadow-md transition">
                  <FaRegAddressCard className="text-amber-500 text-xl" />
                  <select
                    {...field}
                    className="flex-1 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                  >
                    <option value="SHIPPING">Shipping</option>
                    <option value="BILLING">Billing</option>
                    <option value="BOTH">Both</option>
                  </select>
                </div>
              </motion.div>
            )}
            rules={{ required: "Type is required" }}
          />

          <Controller
            control={control}
            name="landmark"
            render={({ field }) => (
              <IconInput
                field={field}
                icon={FaLandmark}
                label="Landmark (Optional)"
              />
            )}
          />

          {user?.role === "SELLER" && (
            <Controller
              control={control}
              name="paidAmount"
              render={({ field }) => (
                <IconInput
                  field={field}
                  icon={FaRegAddressCard}
                  label="Paid Amount"
                  type="number"
                />
              )}
            />
          )}

          <Button
            className="rounded-2xl bg-amber-400 text-white shadow-md hover:bg-amber-500"
            type="button"
            onClick={handleSubmit(handleSaveAddress)}
          >
            Save Address
          </Button>
        </motion.div>

        {/* Order Summary */}
        <motion.aside
          className="bg-amber-50 dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col"
          {...fadeInUp}
        >
          <h2 className="text-2xl font-semibold text-amber-700 dark:text-amber-500 mb-6">
            Order Summary
          </h2>

          <motion.div
            animate={{ opacity: 1 }}
            className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-2"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                className="flex justify-between text-gray-700 dark:text-gray-200"
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.03 }}
              >
                <span>
                  {item?.product?.name} x {item.quantity}
                </span>
                <span>৳ {(item.price * item.quantity).toFixed(2)}</span>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex flex-col gap-2 mb-6 border-t border-amber-300 dark:border-amber-600 pt-4">
            <div className="flex justify-between font-bold text-amber-700 dark:text-amber-500 text-lg">
              <span>Total</span>
              <span>৳ {totalPrice.toFixed(2)}</span>
            </div>

            {user?.role === "SELLER" && (
              <>
                <div className="flex justify-between text-gray-700 dark:text-gray-300 text-lg">
                  <span>Paid Amount</span>
                  <span>৳ {paidAmount || 0}</span>
                </div>
                <div className="flex justify-between font-bold text-red-600 text-lg">
                  <span>Due Amount</span>
                  <span>৳ {dueAmount.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>

          <motion.div whileTap={{ scale: 0.97 }}>
            <Button
              className="mt-auto rounded-2xl shadow-lg bg-amber-500 text-white hover:bg-amber-600"
              type="submit"
            >
              Place Order
            </Button>
          </motion.div>
        </motion.aside>
      </motion.form>
    </motion.div>
  );
}
