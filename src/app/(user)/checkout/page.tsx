// "use client";

// import React, { useMemo, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "@/src/redux/store";
// import { useCreateOrder } from "@/src/hooks/order.hook";
// import { useUser } from "@/src/context/User.context";
// import { useGetUserByEmail } from "@/src/hooks/user.hook";
// import { useForm, Controller } from "react-hook-form";
// import { Input, Textarea, Button } from "@heroui/react";
// import {
//   FaUser,
//   FaEnvelope,
//   FaPhoneAlt,
//   FaMapMarkedAlt,
//   FaCity,
//   FaRegAddressCard,
//   FaGlobeAsia,
//   FaLandmark,
// } from "react-icons/fa";

// type AddressFormValues = {
//   fullName: string;
//   email?: string;
//   phone: string;
//   street: string;
//   city: string;
//   district?: string;
//   state?: string;
//   postalCode: string;
//   country: string;
//   type: "SHIPPING" | "BILLING" | "BOTH";
//   landmark?: string;
//   paidAmount?: number;
// };

// export default function CheckoutPage() {
//   const cartItems = useSelector((state: RootState) => state.card.items);
//   const { user } = useUser();
//   const { data: userData } = useGetUserByEmail(user?.email as string);
//   const currentUser = userData?.data;
//   const billingAddress = currentUser?.addresses?.find(
//     (addr: any) => addr.type === "BILLING"
//   );

//   const totalPrice = useMemo(
//     () =>
//       cartItems.reduce(
//         (total, item) => total + item.price * item.quantity,
//         0
//       ),
//     [cartItems]
//   );

//   const { control, handleSubmit, reset } = useForm<AddressFormValues>({
//     defaultValues: {
//       fullName: "",
//       email: "",
//       phone: "",
//       street: "",
//       city: "",
//       district: "",
//       state: "",
//       postalCode: "",
//       country: "Bangladesh",
//       type: "SHIPPING",
//       landmark: "",
//       paidAmount: 0,
//     },
//   });

//   // Async defaultValues set করা
//   useEffect(() => {
//     if (billingAddress) {
//       reset({
//         fullName: billingAddress.fullName || "",
//         email: billingAddress.email || user?.email || "",
//         phone: billingAddress.phone || "",
//         street: billingAddress.street || "",
//         city: billingAddress.city || "",
//         district: billingAddress.district || "",
//         state: billingAddress.state || "",
//         postalCode: billingAddress.postalCode || "",
//         country: billingAddress.country || "Bangladesh",
//         type: billingAddress.type as "SHIPPING" | "BILLING" | "BOTH",
//         landmark: billingAddress.landmark || "",
//         paidAmount: 0,
//       });
//     }
//   }, [billingAddress, reset, user?.email]);

//   const { mutate } = useCreateOrder();

//   const onSubmit = (formData: AddressFormValues) => {
//     const orderData = {
//       customerAddress: formData,
//       items: cartItems,
//       total: totalPrice,
//     };

//     mutate(orderData, {
//       onSuccess: (res) => {
//         const data = res?.data;
//         if (!data) return alert("Something went wrong. Please try again.");
//         const { paymentUrl, orderId, dueId } = data;

//         if (user?.role === "SELLER" && !formData.paidAmount) {
//           alert(`Order placed successfully! Pending due: ${totalPrice}`);
//           return;
//         }

//         if (paymentUrl) window.location.href = paymentUrl;
//         else alert(`Order placed successfully! Pending due: ${dueId ?? 0}`);
//       },
//       onError: (err: any) => {
//         console.error("Order creation failed:", err);
//         alert("Order creation failed. Please try again.");
//       },
//     });
//   };

//   const IconInput = ({
//     icon: Icon,
//     label,
//     field,
//     type = "text",
//   }: any) => (
//     <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 p-3 rounded-xl shadow-sm hover:shadow-md transition">
//       <Icon className="text-amber-500 text-xl" />
//       <Input {...field} label={label} type={type} className="flex-1" />
//     </div>
//   );

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//       <h1 className="text-4xl font-extrabold text-amber-600 mb-10 text-center sm:text-left">
//         Checkout
//       </h1>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="grid grid-cols-1 lg:grid-cols-3 gap-8"
//       >
//         {/* Billing / Shipping Form */}
//         <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
//           <h2 className="col-span-2 text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
//             Billing / Shipping Details
//           </h2>

//           <Controller
//             name="fullName"
//             control={control}
//             render={({ field }) => <IconInput icon={FaUser} label="Full Name" field={field} />}
//           />

//           <Controller
//             name="email"
//             control={control}
//             render={({ field }) => <IconInput icon={FaEnvelope} label="Email (Optional)" field={field} />}
//           />

//           <Controller
//             name="phone"
//             control={control}
//             render={({ field }) => <IconInput icon={FaPhoneAlt} label="Phone" field={field} />}
//           />

//           <Controller
//             name="street"
//             control={control}
//             render={({ field }) => (
//               <div className="flex items-start gap-3 sm:col-span-2 bg-gray-50 dark:bg-gray-900 p-3 rounded-xl shadow-sm hover:shadow-md transition">
//                 <FaMapMarkedAlt className="text-amber-500 text-xl mt-2" />
//                 <Textarea {...field} label="Street Address" className="flex-1" rows={3} />
//               </div>
//             )}
//           />

//           <Controller
//             name="city"
//             control={control}
//             render={({ field }) => <IconInput icon={FaCity} label="City" field={field} />}
//           />

//           <Controller
//             name="district"
//             control={control}
//             render={({ field }) => <IconInput icon={FaRegAddressCard} label="District (Optional)" field={field} />}
//           />

//           <Controller
//             name="state"
//             control={control}
//             render={({ field }) => <IconInput icon={FaRegAddressCard} label="State (Optional)" field={field} />}
//           />

//           <Controller
//             name="postalCode"
//             control={control}
//             render={({ field }) => <IconInput icon={FaEnvelope} label="Postal Code" field={field} />}
//           />

//           <Controller
//             name="country"
//             control={control}
//             render={({ field }) => <IconInput icon={FaGlobeAsia} label="Country" field={field} />}
//           />

//           <Controller
//             name="type"
//             control={control}
//             render={({ field }) => (
//               <div className="flex items-center gap-3 sm:col-span-2 bg-gray-50 dark:bg-gray-900 p-3 rounded-xl shadow-sm hover:shadow-md transition">
//                 <FaRegAddressCard className="text-amber-500 text-xl" />
//                 <select
//                   {...field}
//                   className="flex-1 border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
//                 >
//                   <option value="SHIPPING">Shipping</option>
//                   <option value="BILLING">Billing</option>
//                   <option value="BOTH">Both</option>
//                 </select>
//               </div>
//             )}
//           />

//           <Controller
//             name="landmark"
//             control={control}
//             render={({ field }) => <IconInput icon={FaLandmark} label="Landmark (Optional)" field={field} />}
//           />

//           {user?.role === "SELLER" && (
//             <Controller
//               name="paidAmount"
//               control={control}
//               render={({ field }) => <IconInput icon={FaRegAddressCard} label="Paid Amount" field={field} type="number" />}
//             />
//           )}
//         </div>

//         {/* Order Summary */}
//         <aside className="bg-amber-50 dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col">
//           <h2 className="text-2xl font-semibold text-amber-700 dark:text-amber-500 mb-6">Order Summary</h2>

//           <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-2">
//             {cartItems.map((item) => (
//               <div key={item.id} className="flex justify-between text-gray-700 dark:text-gray-200">
//                 <span>{item.name} x {item.quantity}</span>
//                 <span>৳ {(item.price * item.quantity).toFixed(2)}</span>
//               </div>
//             ))}
//           </div>

//           <div className="flex justify-between mb-6 font-bold text-amber-700 dark:text-amber-500 text-lg border-t border-amber-300 dark:border-amber-600 pt-4">
//             <span>Total</span>
//             <span>৳ {totalPrice.toFixed(2)}</span>
//           </div>

//           <Button type="submit"  className="mt-auto rounded-2xl shadow-lg bg-amber-500">
//             Place Order
//           </Button>
//         </aside>
//       </form>
//     </div>
//   );
// }
  

"use client";

import React, { useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/src/redux/store";
import { useCreateOrder } from "@/src/hooks/order.hook";
import { useUser } from "@/src/context/User.context";
import { useGetUserByEmail } from "@/src/hooks/user.hook";
import { useForm, Controller, useWatch } from "react-hook-form";
import { Textarea, Button, Input } from "@heroui/react";
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
  const cartItems = data?.items ?? [];

  const { user } = useUser();
  const { data: userData } = useGetUserByEmail(user?.email as string);
  const currentUser = userData?.data;
  const billingAddress = currentUser?.addresses?.find(
    (addr: any) => addr.type === "BILLING"
  );

  const totalPrice = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
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

  // dynamic due calculation
  const paidAmount = useWatch({ control, name: "paidAmount", defaultValue: 0 });
  const dueAmount =
    user?.role === "SELLER" ? Math.max(totalPrice - (paidAmount || 0), 0) : totalPrice;

  // set default values from saved billing address
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
        else alert(`Order placed successfully! Pending due: ${dueId ?? dueAmount}`);
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-extrabold text-amber-600 mb-10 text-center sm:text-left">
        Checkout
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Billing / Shipping Form */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <h2 className="col-span-2 text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Billing / Shipping Details
          </h2>

       {/* Full Name */}
      <Controller
            name="fullName"
            control={control}
            rules={{ required: "fullName number is required" }}
            render={({ field }) => (
              <IconInput
                icon={FaUser}
                label="fullName"
                required
                error={errors.fullName?.message}
                field={field}
              />
            )}
          />


          <Controller
            name="email"
            control={control}
            rules={{
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => (
              <IconInput
                icon={FaEnvelope}
                label="Email (Optional)"
                error={errors.email?.message}
                field={field}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <IconInput
                icon={FaPhoneAlt}
                label="Phone"
                required
                error={errors.phone?.message}
                field={field}
              />
            )}
          />

          <Controller
            name="street"
            control={control}
            rules={{ required: "Street address is required" }}
            render={({ field }) => (
              <div className="flex flex-col gap-1 sm:col-span-2">
                <div className="flex items-start gap-3 bg-gray-50 dark:bg-gray-900 p-3 rounded-xl shadow-sm hover:shadow-md transition">
                  <FaMapMarkedAlt className="text-amber-500 text-xl mt-2" />
                  <Textarea
                    {...field}
                    label="Street Address"
                    rows={3}
                    isInvalid={!!errors.street}
                    errorMessage={errors.street?.message}
                    className="flex-1"
                  />
                </div>
              </div>
            )}
          />

          <Controller
            name="city"
            control={control}
            rules={{ required: "City is required" }}
            render={({ field }) => (
              <IconInput
                icon={FaCity}
                label="City"
                required
                error={errors.city?.message}
                field={field}
              />
            )}
          />

          <Controller
            name="district"
            control={control}
            render={({ field }) => (
              <IconInput icon={FaRegAddressCard} label="District (Optional)" field={field} />
            )}
          />

          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <IconInput icon={FaRegAddressCard} label="State (Optional)" field={field} />
            )}
          />

          <Controller
            name="postalCode"
            control={control}
            rules={{ required: "Postal Code is required" }}
            render={({ field }) => (
              <IconInput
                icon={FaEnvelope}
                label="Postal Code"
                required
                error={errors.postalCode?.message}
                field={field}
              />
            )}
          />

          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field }) => (
              <IconInput
                icon={FaGlobeAsia}
                label="Country"
                required
                error={errors.country?.message}
                field={field}
              />
            )}
          />

          <Controller
            name="type"
            control={control}
            rules={{ required: "Type is required" }}
            render={({ field }) => (
              <div className="flex flex-col gap-1 sm:col-span-2">
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
                {errors.type && (
                  <p className="text-sm text-red-500 mt-1">{errors.type.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="landmark"
            control={control}
            render={({ field }) => (
              <IconInput icon={FaLandmark} label="Landmark (Optional)" field={field} />
            )}
          />

          {user?.role === "SELLER" && (
            <Controller
              name="paidAmount"
              control={control}
              render={({ field }) => (
                <IconInput
                  icon={FaRegAddressCard}
                  label="Paid Amount"
                  field={field}
                  type="number"
                />
              )}
            />
          )}

          <Button
            type="button"
            onClick={handleSubmit(handleSaveAddress)}
            className="rounded-2xl bg-amber-400 text-white shadow-md hover:bg-amber-500"
          >
            Save Address
          </Button>
        </div>

        {/* Order Summary */}
        <aside className="bg-amber-50 dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col">
          <h2 className="text-2xl font-semibold text-amber-700 dark:text-amber-500 mb-6">
            Order Summary
          </h2>

          <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-gray-700 dark:text-gray-200"
              >
                <span>
                  {item?.product?.name} x {item.quantity}
                </span>
                <span>৳ {(item.price * item.quantity).toFixed(2)}</span>
              </div>
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

          <Button type="submit" className="mt-auto rounded-2xl shadow-lg bg-amber-500">
            Place Order
          </Button>
        </aside>
      </form>
    </div>
  );
}
