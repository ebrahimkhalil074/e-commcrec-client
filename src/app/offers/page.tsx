"use client";

import { useGetAllFlashSale } from "@/src/hooks/flashSale.hook";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { FaTag, FaClock } from "react-icons/fa";

// Example offers data – replace with API or database content
const demoOffers = [
  {
    id: 1,
    title: "Smartphone Mega Sale",
    description: "Up to 30% off on latest smartphones from Apple, Samsung, Xiaomi.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    expires: "Sept 30, 2025",
    discount: "30% OFF",
  },
  {
    id: 2,
    title: "Weekend Fashion Deals",
    description: "Flat 40% off on all men’s and women’s clothing collections.",
    image:
      "https://images.unsplash.com/photo-1521335629791-ce4aec67dd53?auto=format&fit=crop&w=800&q=80",
    expires: "Oct 15, 2025",
    discount: "40% OFF",
  },
  {
    id: 3,
    title: "Home Appliance Bonanza",
    description: "Save big on refrigerators, washing machines & more.",
    image:
      "https://images.unsplash.com/photo-1586201375754-228c43f1add1?auto=format&fit=crop&w=800&q=80",
    expires: "Oct 31, 2025",
    discount: "Up to 35% OFF",
  },
];

export default function OffersPage() {
  const { data: flashSaleData, isLoading: flashSaleLoading } = useGetAllFlashSale();
    const flashSales = flashSaleData?.data || [];
  
  return (
    <section className="bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100">
      {/* Hero header */}
      <div className="relative py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          Today’s <span className="text-amber-600">Exclusive Offers</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Grab these limited-time deals before they’re gone. Fresh discounts updated daily!
        </p>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-500 via-pink-400 to-amber-500 rounded-full" />
      </div>

      {/* Offers Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {flashSales.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}

function OfferCard({ offer }: { offer: any}) {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <div className="relative h-56">
        <img
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition"
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
          <button
            className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded-full transition"
           
          >
            Shop Now
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
