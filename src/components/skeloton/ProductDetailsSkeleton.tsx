"use client";

import { Skeleton } from "@heroui/skeleton";

export default function ProductDetailsSkeleton() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 dark:bg-gray-900">
      {/* Left: Image Skeleton */}
      <div>
        <Skeleton className="w-full h-[400px] rounded-xl" />

        <div className="mt-4 grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="w-full h-24 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Right: Details Skeleton */}
      <div className="space-y-5">
        {/* Title */}
        <Skeleton className="h-8 w-3/4 rounded-lg" />

        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-5/6 rounded-lg" />
          <Skeleton className="h-4 w-2/3 rounded-lg" />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/4 rounded-lg" />
          <Skeleton className="h-4 w-1/3 rounded-lg" />
        </div>

        {/* Stock */}
        <Skeleton className="h-5 w-1/2 rounded-lg" />

        {/* Colors */}
        <div className="space-y-3 mt-6">
          <Skeleton className="h-5 w-1/4 rounded-lg" />
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="w-8 h-8 rounded-full" />
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-3 mt-6">
          <Skeleton className="h-5 w-1/4 rounded-lg" />
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="w-16 h-8 rounded-lg" />
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-4 mt-4">
          <Skeleton className="w-8 h-8 rounded" />
          <Skeleton className="w-6 h-6 rounded" />
          <Skeleton className="w-8 h-8 rounded" />
        </div>

        {/* Add to Cart Button */}
        <Skeleton className="h-12 w-full rounded-lg mt-6" />
      </div>
    </div>
  );
}
