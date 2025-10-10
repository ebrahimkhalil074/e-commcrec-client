"use client";

import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { FaTag, FaClock } from "react-icons/fa";
import Image from "next/image";

import { useGetAllFlashSale } from "@/src/hooks/flashSale.hook";
import { OffersPageSkeleton } from "@/src/components/skeloton/OfferpageSkeleton";

export default function OffersPage() {
  const { data: flashSaleData, isLoading } = useGetAllFlashSale();
  const flashSales = flashSaleData?.data || [];

  return (
    <>
      {isLoading ? (
        <OffersPageSkeleton />
      ) : (
        <section className="bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100">
          {/* Hero header */}
          <motion.div
            className="relative py-15 text-center"
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold">
              Today’s <span className="text-amber-600">Exclusive Offers</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Grab these limited-time deals before they’re gone. Fresh discounts
              updated daily!
            </p>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-500 via-pink-400 to-amber-500 rounded-full" />
          </motion.div>

          {/* Offers Grid */}
          <div className="mt-4 max-w-7xl mx-auto px-6 pb-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {flashSales.map((offer: any, idx: number) => (
              <OfferCard key={offer.id} index={idx} offer={offer} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function OfferCard({ offer, index }: { offer: any; index: number }) {
  return (
    <motion.div
      className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
      initial={{ opacity: 0, y: 50 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      viewport={{ once: false, amount: 0.3 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <div className="relative h-56">
        <Image
          fill
          alt={offer.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition"
          src={offer.image}
        />
        <span className="absolute top-4 left-4 bg-amber-600 text-white text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1">
          <FaTag /> {offer.discount}
        </span>
      </div>
      <div className="p-6 flex flex-col justify-between h-56">
        <div>
          <h3 className="text-lg font-semibold mb-2">{offer.name}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {offer.description}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="flex items-center gap-2 text-amber-600 text-sm font-medium">
            <FaClock /> Ends {format(new Date(offer.endAt), "dd MMM yyyy")}
          </span>
          <Link href={`/flashsale/${offer.id}`}>
            <motion.button
              className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded-full transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Shop Now
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
