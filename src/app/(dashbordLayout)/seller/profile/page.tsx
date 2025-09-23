// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { Avatar, Button, Input, Textarea, Select } from "@heroui/react";
// import { useForm, Controller } from "react-hook-form";
// import { useGetUserByEmail } from "@/src/hooks/user.hook";
// import { useUser } from "@/src/context/User.context";
// import {
//   FaPhoneAlt,
//   FaMapMarkerAlt,
//   FaCity,
//   FaRegAddressCard,
//   FaGlobeAsia,
//   FaMailBulk,
//   FaLandmark,
// } from "react-icons/fa";


// type FormValues = {
//   name: string;
//   email: string;
//   phone: string;
//   street: string;
//   city: string;
//   district: string;
//   state: string;
//   postalCode: string;
//   country: string;
//   type: "SHIPPING" | "BILLING" | "BOTH";
//   landmark: string;
// };

// export default function UserProfilePage() {
//   const [imageFile, setImageFile] = useState<File[]>([]);
//   const [imagePreview, setImagePreview] = useState<string[]>([]);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const { user } = useUser();
//   const { data: userData } = useGetUserByEmail(user?.email as string);
// console.log(userData?.data);
//   const { handleSubmit, control, reset, watch } = useForm<FormValues>({
//     defaultValues: {
//       name: "",
//       email: "",
//       phone: "",
//       street: "",
//       city: "",
//       district: "",
//       state: "",
//       postalCode: "",
//       country: "",
//       type: "SHIPPING",
//       landmark: "",
//     },
//   });

//   useEffect(() => {
//     if (userData?.data) {
//       const u = userData.data;
//       const addr = u.addresses && u.addresses.length > 0 ? u.addresses[0] : null;

//       reset({
//         name:addr?.fullName ||u?.name,
//         email: u.email || "",
//         phone: addr?.phone || "",
//         street: addr?.street || "",
//         city: addr?.city || "",
//         district: addr?.district || "",
//         state: addr?.state || "",
//         postalCode: addr?.postalCode || "",
//         country: addr?.country || "Bangladesh",
//         type: (addr?.type as "SHIPPING" | "BILLING" | "BOTH") || "SHIPPING",
//         landmark: addr?.landmark || "",
//       });
//     }
//   }, [userData, reset]);

//   const onSubmit = (data: FormValues) => {
//     console.log("Updated User:", data);
//     // call your update API here
//   };

//   const isEditing = watch("isEditing");

//   const handleAvatarClick = () => fileInputRef.current?.click();

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     setImageFile((prev) => [...prev, file]);
//     const reader = new FileReader();
//     reader.onloadend = () =>
//       setImagePreview((prev) => [...prev, reader.result as string]);
//     reader.readAsDataURL(file);
//   };

//   // Extract address for display
//   const address =
//     userData?.data?.addresses && userData.data.addresses.length > 0
//       ? userData.data.addresses[0]
//       : null;

//   return (
//     <div className=" min-h-screen  bg-gray-100 dark:bg-gray-900 border-2 border-dashed border-amber-300 dark:border-gray-700 rounded-lg">
//       <div className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
//         <Controller
//           name="image"
//           control={control}
//           render={({ field }) => (
//             <>
//               <Avatar
//                 src={imagePreview[0] || field.value || "https://i.pravatar.cc/150?img=12"}
//                 size="lg"
//                 className="mb-4 cursor-pointer hover:ring-2 hover:ring-amber-500 transition"
//                 onClick={handleAvatarClick}
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 ref={fileInputRef}
//                 className="hidden"
//                 onChange={handleFileChange}
//               />
//             </>
//           )}
//         />

//         <Controller
//           name="name"
//           control={control}
//           render={({ field }) => (
//             <h2 className="text-2xl font-bold mb-2 text-amber-500 dark:text-gray-200">
//               {field.value}
//             </h2>
//           )}
//         />
//         <Controller
//           name="email"
//           control={control}
//           render={({ field }) => (
//             <p className="mb-4 text-gray-600 dark:text-gray-400">{field.value}</p>
//           )}
//         />

//         <Button
//           size="sm"
//           className="mb-4 bg-amber-500 hover:bg-amber-600"
//           onClick={() => reset({ ...watch(), isEditing: !watch("isEditing") })}
//         >
//           {watch("isEditing") ? "Cancel" : "Edit Profile"}
//         </Button>

//         {/* শুধুমাত্র প্রোফাইল ইনফো দেখানোর সেকশন */}
// {!watch("isEditing") && (
//   <div className="mt-8 space-y-6">
   

//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
//       {/* Phone */}
//       <div className="flex items-start border-b border-gray-200 dark:border-gray-700 pb-3">
//         <FaPhoneAlt className="text-amber-500 text-lg mt-1 mr-3" />
//         <p className="text-gray-700 dark:text-gray-200">
//           <span className="font-medium">Phone:</span> {watch("phone")}
//         </p>
//       </div>

//       {/* Street */}
//       <div className="flex items-start border-b border-gray-200 dark:border-gray-700 pb-3">
//         <FaMapMarkerAlt className="text-amber-500 text-lg mt-1 mr-3" />
//         <p className="text-gray-700 dark:text-gray-200">
//           <span className="font-medium">Street:</span> {watch("street")}
//         </p>
//       </div>

//       {/* City */}
//       <div className="flex items-start border-b border-gray-200 dark:border-gray-700 pb-3">
//         <FaCity className="text-amber-500 text-lg mt-1 mr-3" />
//         <p className="text-gray-700 dark:text-gray-200">
//           <span className="font-medium">City:</span> {watch("city")}
//         </p>
//       </div>

//       {/* District */}
//       <div className="flex items-start border-b border-gray-200 dark:border-gray-700 pb-3">
//         <FaRegAddressCard className="text-amber-500 text-lg mt-1 mr-3" />
//         <p className="text-gray-700 dark:text-gray-200">
//           <span className="font-medium">District:</span> {watch("district")}
//         </p>
//       </div>

//       {/* State */}
//       <div className="flex items-start border-b border-gray-200 dark:border-gray-700 pb-3">
//         <FaRegAddressCard className="text-amber-500 text-lg mt-1 mr-3" />
//         <p className="text-gray-700 dark:text-gray-200">
//           <span className="font-medium">State:</span> {watch("state")}
//         </p>
//       </div>

//       {/* Postal Code */}
//       <div className="flex items-start border-b border-gray-200 dark:border-gray-700 pb-3">
//         <FaMailBulk className="text-amber-500 text-lg mt-1 mr-3" />
//         <p className="text-gray-700 dark:text-gray-200">
//           <span className="font-medium">Postal Code:</span> {watch("postalCode")}
//         </p>
//       </div>

//       {/* Country */}
//       <div className="flex items-start border-b border-gray-200 dark:border-gray-700 pb-3">
//         <FaGlobeAsia className="text-amber-500 text-lg mt-1 mr-3" />
//         <p className="text-gray-700 dark:text-gray-200">
//           <span className="font-medium">Country:</span> {watch("country")}
//         </p>
//       </div>

//       {/* Type */}
//       <div className="flex items-start border-b border-gray-200 dark:border-gray-700 pb-3">
//         <FaRegAddressCard className="text-amber-500 text-lg mt-1 mr-3" />
//         <p className="text-gray-700 dark:text-gray-200">
//           <span className="font-medium">Address Type:</span> {watch("type")}
//         </p>
//       </div>

//       {/* Landmark */}
//       <div className="flex items-start border-b border-gray-200 dark:border-gray-700 pb-3 sm:col-span-2">
//         <FaLandmark className="text-amber-500 text-lg mt-1 mr-3" />
//         <p className="text-gray-700 dark:text-gray-200">
//           <span className="font-medium">Landmark:</span> {watch("landmark")}
//         </p>
//       </div>
//     </div>
//   </div>
// )}

//         {/* === Edit Form === */}
//         {isEditing && (
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
//           >
//             <Controller name="name" control={control} render={({ field }) => <Input label="Full Name" {...field} />} />
//             <Controller name="email" control={control} render={({ field }) => <Input label="Email" {...field} />} />
//             <Controller name="phone" control={control} render={({ field }) => <Input label="Phone" {...field} />} />
//             <Controller name="street" control={control} render={({ field }) => <Textarea label="Street / Address" {...field} />} />
//             <Controller name="city" control={control} render={({ field }) => <Input label="City" {...field} />} />
//             <Controller name="district" control={control} render={({ field }) => <Input label="District" {...field} />} />
//             <Controller name="state" control={control} render={({ field }) => <Input label="State" {...field} />} />
//             <Controller name="postalCode" control={control} render={({ field }) => <Input label="Postal Code" {...field} />} />
//             <Controller name="country" control={control} render={({ field }) => <Input label="Country" {...field} />} />
//             <Controller
//               name="type"
//               control={control}
//               render={({ field }) => (
//                 <Select
//                   label="Address Type"
//                   value={field.value}
//                   onChange={(val) => field.onChange(val)}
//                   options={[
//                     { label: "Shipping", value: "SHIPPING" },
//                     { label: "Billing", value: "BILLING" },
//                     { label: "Both", value: "BOTH" },
//                   ]}
//                 />
//               )}
//             />
//             <Controller name="landmark" control={control} render={({ field }) => <Input label="Landmark / Reference" {...field} />} />
//             <div className="sm:col-span-2 flex justify-end mt-2">
//               <Button type="submit">Save Changes</Button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button, Input, Textarea, Select, SelectItem } from "@heroui/react";
import { useForm, Controller } from "react-hook-form";
import { useGetUserByEmail, useUpdateUser, } from "@/src/hooks/user.hook";
import { useUser } from "@/src/context/User.context";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCity,
  FaRegAddressCard,
  FaGlobeAsia,
  FaMailBulk,
  FaLandmark,
} from "react-icons/fa";
import { useUpdateAddress } from "@/src/hooks/address.hook";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  district: string;
  state: string;
  postalCode: string;
  country: string;
  type: "SHIPPING" | "BILLING" | "BOTH";
  landmark: string;
  isEditing?: boolean;
};

export default function SellerProfilePage() {
  const { user } = useUser();
  const { data: userData } = useGetUserByEmail(user?.email as string);

  const [previewImage, setPreviewImage] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
 const {mutate,isPending} = useUpdateUser()
 const {mutate:handleUpdateAddress} = useUpdateAddress()
  const { handleSubmit, control, reset, watch } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      street: "",
      city: "",
      district: "",
      state: "",
      postalCode: "",
      country: "",
      type: "SHIPPING",
      landmark: "",
      isEditing: false,
    },
  });

  // Populate form when data arrives
  useEffect(() => {
    if (userData?.data) {
      const u = userData.data;
      const addr = u.addresses?.[0] || null;
      reset({
        name: addr?.fullName || u?.name || "",
        email: u.email || "",
        phone: addr?.phone || "",
        street: addr?.street || "",
        city: addr?.city || "",
        district: addr?.district || "",
        state: addr?.state || "",
        postalCode: addr?.postalCode || "",
        country: addr?.country || "Bangladesh",
        type: (addr?.type as "SHIPPING" | "BILLING" | "BOTH") || "SHIPPING",
        landmark: addr?.landmark || "",
        isEditing: false,
      });
      // initial avatar preview from DB if available
      setPreviewImage(u.image || "");
    }
  }, [userData, reset]);

  /** Submit only text profile info */
 const onSubmit = (data: FormValues) => {
  // data এর মধ্যে সব ফর্মের মান থাকবে
  console.log("Profile Info Updated:", data);

  const addressData = {
    id: userData?.data?.addresses?.[0]?.id || null, // existing address থাকলে update
    fullName: data.name,
    phone: data.phone,
    street: data.street,
    city: data.city,
    district: data.district,
    state: data.state,
    postalCode: data.postalCode,
    country: data.country,
    landmark: data.landmark,
    type: data.type,
  };

  handleUpdateAddress(addressData);
};

  /** Separate image upload handler */
  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setUploading(true);

    // optional preview immediately
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // call backend endpoint for image update
     mutate(formData)
      
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  };

  const toggleEdit = () =>
    reset({ ...watch(), isEditing: !watch("isEditing") });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900  dark:border-gray-700 rounded-lg">
      <div className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
        {/* ==== Profile Image ==== */}
        <Avatar
          src={
            previewImage ||
            userData?.data?.image ||
            "https://i.pravatar.cc/150?img=12"
          }
          
          className="mb-4 w-[150px] h-[150px] cursor-pointer hover:ring-2 hover:ring-amber-500 transition"
          onClick={() => fileInputRef.current?.click()}
        />
        <input  
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        {uploading && (
          <p className="text-sm text-gray-500 mb-2">Uploading image...</p>
        )}


        {/* ==== Basic Info Display ==== */}
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <h2 className="text-2xl font-bold mb-2 text-amber-500 dark:text-gray-200">
              {field.value}
            </h2>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              {field.value}
            </p>
          )}
        />

        <Button
          size="sm"
          className="mb-4 bg-amber-500 hover:bg-amber-600"
          onClick={toggleEdit}
        >
          {watch("isEditing") ? "Cancel" : "Edit Profile"}
        </Button>

        {/* ==== View Mode ==== */}
        {!watch("isEditing") && (
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
              {[
                {
                  icon: <FaPhoneAlt />,
                  label: "Phone",
                  value: watch("phone"),
                },
                {
                  icon: <FaMapMarkerAlt />,
                  label: "Street",
                  value: watch("street"),
                },
                { icon: <FaCity />, label: "City", value: watch("city") },
                {
                  icon: <FaRegAddressCard />,
                  label: "District",
                  value: watch("district"),
                },
                {
                  icon: <FaRegAddressCard />,
                  label: "State",
                  value: watch("state"),
                },
                {
                  icon: <FaMailBulk />,
                  label: "Postal Code",
                  value: watch("postalCode"),
                },
                {
                  icon: <FaGlobeAsia />,
                  label: "Country",
                  value: watch("country"),
                },
                {
                  icon: <FaRegAddressCard />,
                  label: "Address Type",
                  value: watch("type"),
                },
                
                {
                  icon: <FaLandmark />,
                  label: "Landmark",
                  value: watch("landmark"),
                  colSpan: 2,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-start border-b border-gray-200 dark:border-gray-700 pb-3 ${
                    item.colSpan === 2 ? "sm:col-span-2" : ""
                  }`}
                >
                  <span className="text-amber-500 text-lg mt-1 mr-3">
                    {item.icon}
                  </span>
                  <p className="text-gray-700 dark:text-gray-200">
                    <span className="font-medium">{item.label}:</span>{" "}
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==== Edit Mode ==== */}
        {watch("isEditing") && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
          >
            <Controller name="name" control={control} render={({ field }) => <Input label="Full Name" {...field} />} />
            <Controller name="email" control={control} render={({ field }) => <Input label="Email" readOnly {...field} />} />
            <Controller name="phone" control={control} render={({ field }) => <Input label="Phone" {...field} />} />
            <Controller name="street" control={control} render={({ field }) => <Textarea label="Street / Address" {...field} />} />
            <Controller name="city" control={control} render={({ field }) => <Input label="City" {...field} />} />
            <Controller name="district" control={control} render={({ field }) => <Input label="District" {...field} />} />
            <Controller name="state" control={control} render={({ field }) => <Input label="State" {...field} />} />
            <Controller name="postalCode" control={control} render={({ field }) => <Input label="Postal Code" {...field} />} />
            <Controller name="country" control={control} render={({ field }) => <Input label="Country" {...field} />} />
            <Controller
  name="type"
  control={control}
  render={({ field }) => (
    <Select
      label="Address Type"
      value={field.value}
      onChange={(val) => field.onChange(val)}
    >
      <SelectItem key="SHIPPING">Shipping</SelectItem>
      <SelectItem key="BILLING">Billing</SelectItem>
      <SelectItem key="BOTH">Both</SelectItem>
    </Select>
  )}
/>


            <Controller name="landmark" control={control} render={({ field }) => <Input label="Landmark / Reference" {...field} />} />

            <div className="sm:col-span-2 flex justify-end mt-2">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
