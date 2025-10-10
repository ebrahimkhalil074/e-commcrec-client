"use client";

import { Skeleton } from "@heroui/skeleton";
import { FaShoppingCart, FaShoppingBag } from "react-icons/fa";

export default function CartSkeleton() {
  return (
    <div className="min-h-[70vh] mx-auto p-6 dark:bg-gray-900">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <FaShoppingCart className="text-amber-500 text-2xl" />
          <Skeleton className="h-7 w-32 rounded-lg" />
        </div>

        <div className="flex items-center gap-2">
          <FaShoppingBag className="text-amber-500 text-xl" />
          <Skeleton className="h-6 w-40 rounded-lg" />
        </div>
      </div>

      {/* Cart Items Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row items-center justify-between border border-amber-200 rounded-xl p-4 shadow-sm bg-white dark:bg-gray-800"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4 w-full md:w-1/3">
              <Skeleton className="w-20 h-20 rounded-md" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-32 rounded-md" />
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-6 h-6 rounded-md" />
              <Skeleton className="w-8 h-8 rounded-full" />
            </div>

            {/* Subtotal + Remove */}
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Skeleton className="h-5 w-16 rounded-md" />
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center border-t pt-4">
        <Skeleton className="h-6 w-40 rounded-md" />
        <div className="flex gap-4 flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0">
          <Skeleton className="h-10 w-32 rounded-full" />
          <Skeleton className="h-10 w-36 rounded-full" />
        </div>
      </div>
    </div>
  );
}
