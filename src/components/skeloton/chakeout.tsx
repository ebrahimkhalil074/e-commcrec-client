"use client";

import React from "react";
import { Skeleton } from "@heroui/react";

export default function CheckoutSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-4xl font-extrabold text-amber-600 mb-10 text-center sm:text-left">
        <Skeleton className="h-10 w-48" />
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Skeleton */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Skeleton className="col-span-2 h-8 w-64 mb-4" />
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg" />
          ))}
          <Skeleton className="h-12 w-40 mt-4 rounded-2xl" />
        </div>

        {/* Order Summary Skeleton */}
        <div className="bg-amber-50 dark:bg-gray-900 rounded-2xl shadow-xl p-6 flex flex-col">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="space-y-3 mb-6 max-h-64 overflow-y-auto pr-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-6 w-full rounded-lg" />
            ))}
          </div>
          <div className="flex flex-col gap-2 mb-6 border-t border-amber-300 dark:border-amber-600 pt-4">
            <Skeleton className="h-6 w-full rounded-lg" />
            <Skeleton className="h-6 w-full rounded-lg" />
          </div>
          <Skeleton className="h-12 w-full rounded-2xl mt-auto" />
        </div>
      </div>
    </div>
  );
}
