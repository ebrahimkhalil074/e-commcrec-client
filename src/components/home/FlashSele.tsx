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
import { motion } from "framer-motion";

import HomeFlashSaleSkeleton from "../skeloton/HomeFlshsaleSkl";

import { useGetAllFlashSale } from "@/src/hooks/flashSale.hook";

export default function FlashSale() {
  const { data: flashSaleData, isLoading: flashSaleLoading } =
    useGetAllFlashSale();
  const flashSales = flashSaleData?.data || [];

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
        const ended = isBefore(offerEndTime, now);

        updatedTimeLefts[flash.id] = {
          hours: Math.max(differenceInHours(offerEndTime, now), 0),
          minutes: Math.max(differenceInMinutes(offerEndTime, now) % 60, 0),
          seconds: Math.max(differenceInSeconds(offerEndTime, now) % 60, 0),
          ended,
        };
      });

      setTimeLefts(updatedTimeLefts);
    }, 1000);

    return () => clearInterval(timer);
  }, [flashSales]);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      {flashSaleLoading ? (
        <HomeFlashSaleSkeleton />
      ) : (
        <section className="py-10 px-4 border-b border-amber-200 overflow-hidden">
          {/* Header */}
          <motion.h2
            className="text-3xl font-bold mb-8 flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="bg-amber-100 text-amber-600 p-2 rounded-full">
              🔥
            </span>
            <span className="text-amber-500">Flash Sale</span>
            <FaArrowRight className="text-amber-500 text-lg" />
          </motion.h2>

          <div className="grid grid-cols-1 mx-auto">
            {flashSales.map((flash: any, i: number) => {
              const isEnded = timeLefts[flash.id]?.ended ?? false;

              return (
                <motion.div
                  key={flash.id}
                  className="mb-10"
                  initial="hidden"
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: i * 0.15 },
                    },
                  }}
                  viewport={{ once: false, amount: 0.3 }}
                  whileInView="visible"
                >
                  {/* Header + Countdown */}
                  <div className="flex flex-col md:flex-row justify-between items-center mb-6 max-w-7xl mx-auto">
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: false, amount: 0.3 }}
                      whileInView={{ opacity: 1, x: 0 }}
                    >
                      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-amber-600">
                        {flash.name} 🔥
                      </h2>
                      <p className="text-gray-700 font-medium">
                        {flash.description}
                      </p>
                    </motion.div>

                    {isEnded ? (
                      <motion.div
                        className="text-red-600 font-bold text-xl"
                        initial={{ opacity: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        whileInView={{ opacity: 1 }}
                      >
                        Sale Ended
                      </motion.div>
                    ) : (
                      <motion.div
                        className="flex gap-2 mt-4 md:mt-0"
                        initial={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: false, amount: 0.3 }}
                        whileInView={{ opacity: 1, x: 0 }}
                      >
                        <TimeBox
                          label="ঘণ্টা"
                          value={timeLefts[flash.id]?.hours ?? 0}
                        />
                        <span className="text-amber-600 font-bold text-lg">
                          :
                        </span>
                        <TimeBox
                          label="মিনিট"
                          value={timeLefts[flash.id]?.minutes ?? 0}
                        />
                        <span className="text-amber-600 font-bold text-lg">
                          :
                        </span>
                        <TimeBox
                          label="সেকেন্ড"
                          value={timeLefts[flash.id]?.seconds ?? 0}
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Product Carousel */}
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
                    {flash.products?.map((product: any, idx: number) => {
                      const discountedPrice =
                        product.price -
                        (product.discount / 100) * product.price;

                      return (
                        <SwiperSlide key={product.id}>
                          <motion.div
                            className="relative bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-lg transition h-full flex flex-col"
                            initial="hidden"
                            variants={fadeUp}
                            viewport={{ once: false, amount: 0.3 }}
                            whileHover={{
                              scale: 1.03,
                              boxShadow: "0 8px 20px rgba(255,193,7,0.25)",
                            }}
                            whileInView="visible"
                          >
                            {product.discount > 0 && (
                              <span className="absolute top-2 left-2 bg-amber-600 text-white text-xs font-bold px-2 py-1 rounded z-10">
                                -{product.discount}%
                              </span>
                            )}
                            {product.stock === 0 && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-lg z-20 rounded-lg">
                                Sold Out
                              </div>
                            )}

                            <div className="h-[330px] bg-gray-100 dark:bg-gray-800 flex flex-col">
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

                              <div className="p-3 flex-1 flex flex-col justify-between">
                                <p className="font-medium text-sm line-clamp-2 min-h-[32px]">
                                  {product.name}
                                </p>

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
                          </motion.div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}

function TimeBox({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      className="bg-amber-600 text-white px-4 py-2 rounded-md text-center shadow-md min-w-[60px]"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-xl font-bold">{String(value).padStart(2, "0")}</div>
      <div className="text-xs">{label}</div>
    </motion.div>
  );
}
