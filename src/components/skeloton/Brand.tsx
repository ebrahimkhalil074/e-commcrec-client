"use client";

import { Skeleton } from "@heroui/skeleton";

export default function BrandSkeleton() {
  return (
    <section className="py-12 px-6">
      {/* Brand Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="relative rounded-xl overflow-hidden h-[240px] shadow-md bg-white dark:bg-gray-900"
          >
            {/* Image skeleton */}
            <Skeleton className="absolute inset-0 w-full h-full rounded-xl" />

            {/* Overlay shimmer (simulating gradient effect) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl" />

            {/* Brand name skeleton */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <Skeleton className="h-5 w-24 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
