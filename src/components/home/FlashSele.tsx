// "use client";

// import { useState, useEffect } from "react";
// import { differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation, Autoplay } from "swiper/modules";
// import { useGetAllProducts } from "@/src/hooks/product.hook";
// import { addToCart } from "@/src/redux/features/cartSlice";
// import { useDispatch } from "react-redux";
// import Link from "next/link";
// import { useGetAllFlashSale } from "@/src/hooks/flashSale.hook";

// export default function FlashSale() {
//     const dispatch = useDispatch();
//   const offerEndTime = new Date("2025-08-15T23:59:59");
//   const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date();
//       const hours = differenceInHours(offerEndTime, now);
//       const minutes = differenceInMinutes(offerEndTime, now) % 60;
//       const seconds = differenceInSeconds(offerEndTime, now) % 60;

//       if (hours <= 0 && minutes <= 0 && seconds <= 0) {
//         clearInterval(timer);
//         setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
//       } else {
//         setTimeLeft({ hours, minutes, seconds });
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   // ডামি প্রোডাক্ট ডেটা (discount এবং stock
//   //  যোগ করা)
//   const {data:flashSaleData, isLoading: flashSaleLoading} = useGetAllFlashSale();
//   const flashSale = flashSaleData?.data || [];

// console.log("Flash Sale Data:", flashSale);
//   return (
//     <section className="py-10 px-4 bg-amber-50 border-b border-amber-200">
//       {/* কাউন্টডাউন */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6 max-w-7xl mx-auto">
//         <div>
//           <h2 className="text-2xl md:text-3xl font-bold mb-2 text-amber-600">ফ্ল্যাশ সেল 🔥</h2>
//           <p className="text-gray-700 font-medium">তাড়াতাড়ি করুন! অফার শেষ হবে:</p>
//         </div>

//         <div className="flex gap-2 mt-4 md:mt-0">
//           <TimeBox value={timeLeft.hours} label="ঘণ্টা" />
//           <span className="text-amber-600 font-bold text-lg">:</span>
//           <TimeBox value={timeLeft.minutes} label="মিনিট" />
//           <span className="text-amber-600 font-bold text-lg">:</span>
//           <TimeBox value={timeLeft.seconds} label="সেকেন্ড" />
//         </div>
//       </div>

//       {/* Full-width Swiper Carousel */}
//       <div className="max-w-7xl mx-auto">
//         <Swiper
//           slidesPerView={2}
//           spaceBetween={16}
//           navigation
//           modules={[Navigation, Autoplay]}
//           autoplay={{ delay: 2500, disableOnInteraction: false }}
//           breakpoints={{
//             640: { slidesPerView: 3 },
//             768: { slidesPerView: 4 },
//             1024: { slidesPerView: 5 },
//           }}
//         >
//           {flashSale.map((item) => {
//             const discountedPrice = item.price - (item.discount / 100) * item.price;

//             return (
//               <SwiperSlide key={item.id}>
//                 <div className="relative bg-white rounded-lg shadow hover:shadow-lg transition h-full flex flex-col">
//                   {/* Discount Badge */}
//                   {item.discount > 0 && (
//                     <span className="absolute top-2 left-2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
//                       -{item.discount}%
//                     </span>
//                   )}

//                   {/* Sold Out Overlay */}
//                   {item.stock === 0 && (
//                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg z-20 rounded-lg">
//                       Sold Out
//                     </div>
//                   )}

//                   <div className="h-56 bg-gray-100 rounded-t-lg overflow-hidden flex items-center justify-center">
//                     <img
//                       src={item.images[0]?.url}
//                       alt={item.name}
//                       className="object-contain h-full"
//                     />
//                   </div>
//                   <div className="p-3 flex-1 flex flex-col justify-between">
//                     <p className="font-medium text-sm">{item.name}</p>
//                     <div className="flex items-center gap-2 mt-1">
//                       <p className="text-amber-600 font-bold">${discountedPrice.toFixed(2)}</p>
//                       {item.discount > 0 && (
//                         <p className="text-gray-400 line-through text-xs">${item.price}</p>
//                       )}
//                     </div>
//                     <Link href={`/product/${item.id}`}>
//                     <button
//                       disabled={item.stock === 0}
//                       className={`mt-2 w-full py-2 rounded text-sm font-medium transition ${
//                         item.stock === 0
//                           ? "bg-gray-400 text-white cursor-not-allowed"
//                           : "bg-amber-600 text-white hover:bg-amber-700"
//                       }`}
//                     >
//                       Add to Cart
//                     </button>
//                     </Link>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             );
//           })}
//         </Swiper>
//       </div>
//     </section>
//   );
// }

// // টাইমবক্স কম্পোনেন্ট
// function TimeBox({ value, label }: { value: number; label: string }) {
//   return (
//     <div className="bg-amber-600 text-white px-4 py-2 rounded-md text-center shadow-md min-w-[60px]">
//       <div className="text-xl font-bold">{String(value).padStart(2, "0")}</div>
//       <div className="text-xs">{label}</div>
//     </div>
//   );
// }

// "use client";

// import { useState, useEffect } from "react";
// import { differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation, Autoplay } from "swiper/modules";
// import { useDispatch } from "react-redux";
// import Link from "next/link";
// import { useGetAllFlashSale } from "@/src/hooks/flashSale.hook";
// import { FaArrowRight } from "react-icons/fa";

// export default function FlashSale() {
//   const dispatch = useDispatch();
//   const { data: flashSaleData, isLoading: flashSaleLoading } = useGetAllFlashSale();
//   const flashSales = flashSaleData?.data || [];

//   // Countdown state for each flash sale
//   const [timeLefts, setTimeLefts] = useState<Record<string, { hours: number; minutes: number; seconds: number }>>({});

//   useEffect(() => {
//     if (!flashSales.length) return;

//     const timer = setInterval(() => {
//       const now = new Date();
//       const updatedTimeLefts: Record<string, { hours: number; minutes: number; seconds: number }> = {};

//       flashSales.forEach((flash) => {
//         const offerEndTime = new Date(flash.endAt);
//         const hours = Math.max(differenceInHours(offerEndTime, now), 0);
//         const minutes = Math.max(differenceInMinutes(offerEndTime, now) % 60, 0);
//         const seconds = Math.max(differenceInSeconds(offerEndTime, now) % 60, 0);

//         updatedTimeLefts[flash.id] = { hours, minutes, seconds };
//       });

//       setTimeLefts(updatedTimeLefts);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [flashSales]);

//   if (flashSaleLoading) return <p>Loading Flash Sale...</p>;

//   return (
//     <section className="py-10 px-4 bg-amber-50 border-b border-amber-200">
//      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
//   <span className="bg-amber-100 text-amber-600 p-2 rounded-full">
//     🔥
//   </span>
//   <span className="text-amber-500">Flash Sale</span>
//   <FaArrowRight className="text-amber-500 text-lg" />
// </h2>

//      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
//        {flashSales.map((flash) => (
//         <div key={flash.id} className="mb-10">
//           {/* Header with Countdown */}
//           <div className="flex flex-col md:flex-row justify-between items-center mb-6 max-w-7xl mx-auto">
//             <div>
//               <h2 className="text-2xl md:text-3xl font-bold mb-2 text-amber-600">{flash.name} 🔥</h2>
//               <p className="text-gray-700 font-medium">{flash.description}</p>
//             </div>
//             <div className="flex gap-2 mt-4 md:mt-0">
//               <TimeBox value={timeLefts[flash.id]?.hours ?? 0} label="ঘণ্টা" />
//               <span className="text-amber-600 font-bold text-lg">:</span>
//               <TimeBox value={timeLefts[flash.id]?.minutes ?? 0} label="মিনিট" />
//               <span className="text-amber-600 font-bold text-lg">:</span>
//               <TimeBox value={timeLefts[flash.id]?.seconds ?? 0} label="সেকেন্ড" />
//             </div>
//           </div>

//           {/* Product Carousel */}
//           <div className="max-w-7xl mx-auto">
//             <Swiper
//               slidesPerView={2}
//               spaceBetween={16}
//               navigation
//               modules={[Navigation, Autoplay]}
//               autoplay={{ delay: 2500, disableOnInteraction: false }}
//               breakpoints={{
//                 640: { slidesPerView: 3 },
//                 768: { slidesPerView: 3 },
//                 1024: { slidesPerView: 3 },
//               }}
//             >
//               {flash.products?.map((product) => {
//                 const discountedPrice = product.price - (product.discount / 100) * product.price;

//                 return (
//                   <SwiperSlide key={product.id}>
//                     <div className="relative bg-white rounded-lg shadow hover:shadow-lg transition h-full flex flex-col">
//                       {/* Discount Badge */}
//                       {product.discount > 0 && (
//                         <span className="absolute top-2 left-2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
//                           -{product.discount}%
//                         </span>
//                       )}

//                       {/* Sold Out Overlay */}
//                       {product.stock === 0 && (
//                         <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg z-20 rounded-lg">
//                           Sold Out
//                         </div>
//                       )}

//                       <div className="h-56 bg-gray-100 rounded-t-lg overflow-hidden flex items-center justify-center">
//                         <img
//                           src={product?.images?.[0]?.url || "/placeholder-image.png"}
//                           alt={product?.name}
//                           className="object-contain h-full"
//                         />
//                       </div>

//                       <div className="p-3 flex-1 flex flex-col justify-between">
//                         <p className="font-medium text-sm">{product.name}</p>
//                         <div className="flex items-center gap-2 mt-1">
//                           <p className="text-amber-600 font-bold">${discountedPrice.toFixed(2)}</p>
//                           {product.discount > 0 && (
//                             <p className="text-gray-400 line-through text-xs">${product.price}</p>
//                           )}
//                         </div>

//                         <Link href={`/product/${product.id}`}>
//                           <button
//                             disabled={product.stock === 0}
//                             className={`mt-2 w-full py-2 rounded text-sm font-medium transition ${
//                               product.stock === 0
//                                 ? "bg-gray-400 text-white cursor-not-allowed"
//                                 : "bg-amber-600 text-white hover:bg-amber-700"
//                             }`}
//                           >
//                             Details
//                           </button>
//                         </Link>
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 );
//               })}
//             </Swiper>
//           </div>
//         </div>
//       ))}
//      </div>
//     </section>
//   );
// }

// function TimeBox({ value, label }: { value: number; label: string }) {
//   return (
//     <div className="bg-amber-600 text-white px-4 py-2 rounded-md text-center shadow-md min-w-[60px]">
//       <div className="text-xl font-bold">{String(value).padStart(2, "0")}</div>
//       <div className="text-xs">{label}</div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import {
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  isBefore,
} from "date-fns";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";

import { useGetAllFlashSale } from "@/src/hooks/flashSale.hook";

export default function FlashSale() {
  const { data: flashSaleData, isLoading: flashSaleLoading } =
    useGetAllFlashSale();
  const flashSales = flashSaleData?.data || [];

  // Countdown state for each flash sale
  const [timeLefts, setTimeLefts] = useState<
    Record<
      string,
      { hours: number; minutes: number; seconds: number; ended: boolean }
    >
  >({});

  useEffect(() => {
    if (!flashSales.length) return;

    const timer = setInterval(() => {
      const now = new Date();
      const updatedTimeLefts: Record<
        string,
        { hours: number; minutes: number; seconds: number; ended: boolean }
      > = {};

      flashSales.forEach((flash: any) => {
        const offerEndTime = new Date(flash.endAt);
        const ended = isBefore(offerEndTime, now); // true if time already passed

        const hours = Math.max(differenceInHours(offerEndTime, now), 0);
        const minutes = Math.max(
          differenceInMinutes(offerEndTime, now) % 60,
          0,
        );
        const seconds = Math.max(
          differenceInSeconds(offerEndTime, now) % 60,
          0,
        );

        updatedTimeLefts[flash.id] = { hours, minutes, seconds, ended };
      });

      setTimeLefts(updatedTimeLefts);
    }, 1000);

    return () => clearInterval(timer);
  }, [flashSales]);

  if (flashSaleLoading) return <p>Loading Flash Sale...</p>;

  return (
    <section className="py-10 px-4 border-b border-amber-200">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <span className="bg-amber-100 text-amber-600 p-2 rounded-full">🔥</span>
        <span className="text-amber-500">Flash Sale</span>
        <FaArrowRight className="text-amber-500 text-lg" />
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {flashSales.map((flash: any) => {
          const isEnded = timeLefts[flash.id]?.ended ?? false;

          return (
            <div key={flash.id} className="mb-10">
              {/* Header with Countdown / Ended Status */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-6 max-w-7xl mx-auto">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 text-amber-600">
                    {flash.name} 🔥
                  </h2>
                  <p className="text-gray-700 font-medium">
                    {flash.description}
                  </p>
                </div>

                {isEnded ? (
                  <div className="text-red-600 font-bold text-xl">
                    Sale Ended
                  </div>
                ) : (
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <TimeBox
                      label="ঘণ্টা"
                      value={timeLefts[flash.id]?.hours ?? 0}
                    />
                    <span className="text-amber-600 font-bold text-lg">:</span>
                    <TimeBox
                      label="মিনিট"
                      value={timeLefts[flash.id]?.minutes ?? 0}
                    />
                    <span className="text-amber-600 font-bold text-lg">:</span>
                    <TimeBox
                      label="সেকেন্ড"
                      value={timeLefts[flash.id]?.seconds ?? 0}
                    />
                  </div>
                )}
              </div>

              {/* Product Carousel */}
              <div className="max-w-7xl mx-auto">
                <Swiper
                  navigation
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 3 },
                  }}
                  modules={[Navigation, Autoplay]}
                  slidesPerView={2}
                  spaceBetween={16}
                >
                  {flash.products?.map((product: any) => {
                    const discountedPrice =
                      product.price - (product.discount / 100) * product.price;

                    return (
                      <SwiperSlide key={product.id}>
                        <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition h-full flex flex-col">
                          {/* Discount Badge */}
                          {product.discount > 0 && (
                            <span className="absolute top-2 left-2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                              -{product.discount}%
                            </span>
                          )}

                          {/* Sold Out Overlay */}
                          {product.stock === 0 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg z-20 rounded-lg">
                              Sold Out
                            </div>
                          )}

                          <div className="h-[330px] bg-gray-100 dark:bg-gray-800 flex flex-col">
                            {/* Image Section */}
                            <div className="h-[200px] rounded-t-lg overflow-hidden flex items-center justify-center">
                              <Image
                                alt={product?.name}
                                className="object-contain h-full"
                                height={150}
                                src={
                                  product?.images?.[0]?.url ||
                                  "/placeholder-image.png"
                                }
                                width={1000}
                              />
                            </div>

                            {/* Content Section */}
                            <div className="p-3 flex-1 flex flex-col justify-between">
                              {/* Fixed height name with line clamp */}
                              <p className="font-medium text-sm line-clamp-2 min-h-[32px]">
                                {product.name}
                              </p>

                              {/* Price */}
                              <div className="flex items-center gap-2 mt-1">
                                <p className="text-amber-600 font-bold">
                                  ${discountedPrice.toFixed(2)}
                                </p>
                                {product.discount > 0 && (
                                  <p className="text-gray-400 line-through text-xs">
                                    ${product.price}
                                  </p>
                                )}
                              </div>

                              {/* Button */}
                              <Link href={`/product/${product.id}`}>
                                <button
                                  className={`mt-2 w-full py-2 rounded text-sm font-medium transition ${
                                    product.stock === 0 || isEnded
                                      ? "bg-gray-400 text-white cursor-not-allowed"
                                      : "bg-amber-600 text-white hover:bg-amber-700"
                                  }`}
                                  disabled={product.stock === 0 || isEnded}
                                >
                                  {isEnded ? "Sale Ended" : "Details"}
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="bg-amber-600 text-white px-4 py-2 rounded-md text-center shadow-md min-w-[60px]">
      <div className="text-xl font-bold">{String(value).padStart(2, "0")}</div>
      <div className="text-xs">{label}</div>
    </div>
  );
}
