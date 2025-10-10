"use client";

import React, { useMemo, useEffect } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Button } from "@heroui/react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

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

        if (!data) return alert("Something went wrong. Please try again.");
        const { paymentUrl, dueId } = data;

        if (user?.role === "SELLER" && !formData.paidAmount) {
          alert(`Order placed successfully! Pending due: ${totalPrice}`);

          return;
        }
        if (paymentUrl) window.location.href = paymentUrl;
        else
          alert(
            `Order placed successfully! Pending due: ${dueId ?? dueAmount}`,
          );
      },
      onError: () => {
        alert("Order creation failed. Please try again.");
      },
    });
  };

  const handleSaveAddress = (formData: AddressFormValues) => {
    if (!user) return alert("Login required");
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

  const formVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const summaryVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.4 },
    }),
  };

  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-4xl font-extrabold text-amber-600 mb-10 text-center sm:text-left">
            Checkout
          </h1>

          <form
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Billing / Shipping Form */}
            <motion.div
              animate="visible"
              className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6"
              initial="hidden"
              variants={formVariants}
            >
              <h2 className="col-span-2 text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
                Billing / Shipping Details
              </h2>

              {/** Map through all fields with motion for hover/tap effects **/}
              <Controller
                control={control}
                name="fullName"
                render={({ field }) => (
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <IconInput
                      required
                      error={errors.fullName?.message}
                      field={field}
                      icon={FaUser}
                      label="Full Name"
                    />
                  </motion.div>
                )}
                rules={{ required: "Full Name is required" }}
              />

              {/* Repeat for other inputs similarly */}
              {/* Email */}
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

              {/* Continue with all other fields as before... */}

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  className="rounded-2xl bg-amber-400 text-white shadow-md hover:bg-amber-500"
                  type="button"
                  onClick={handleSubmit(handleSaveAddress)}
                >
                  Save Address
                </Button>
              </motion.div>
            </motion.div>

            {/* Order Summary */}
            <motion.aside
              animate="visible"
              className="bg-amber-50 dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col"
              initial="hidden"
              variants={summaryVariants}
            >
              <h2 className="text-2xl font-semibold text-amber-700 dark:text-amber-500 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-2">
                {cartItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    animate="visible"
                    className="flex justify-between text-gray-700 dark:text-gray-200"
                    custom={i}
                    initial="hidden"
                    variants={itemVariants}
                  >
                    <span>
                      {item?.product?.name} x {item.quantity}
                    </span>
                    <span>৳ {(item.price * item.quantity).toFixed(2)}</span>
                  </motion.div>
                ))}
              </div>

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

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  className="mt-auto rounded-2xl shadow-lg bg-amber-500"
                  type="submit"
                >
                  Place Order
                </Button>
              </motion.div>
            </motion.aside>
          </form>
        </div>
      )}
    </>
  );
}
