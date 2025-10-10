"use client";

import { Skeleton } from "@heroui/skeleton";
import { FaArrowRight } from "react-icons/fa";

export default function HomeFlashSaleSkeleton() {
  return (
    <section className="py-10 px-4 border-b border-amber-200">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="bg-amber-100 text-amber-600 p-2 rounded-full text-xl">
          🔥
        </span>
        <h2 className="text-3xl font-bold text-amber-500 flex items-center gap-2">
          Flash Sale
          <FaArrowRight className="text-amber-500 text-lg" />
        </h2>
      </div>

      {/* Multiple Flash Sale Blocks */}
      {[1, 2].map((index) => (
        <div key={index} className="mb-10 max-w-7xl mx-auto">
          {/* Header + Countdown Skeleton */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="w-full md:w-1/2 space-y-2">
              <Skeleton className="h-6 w-40 rounded-md" />
              <Skeleton className="h-4 w-64 rounded-md" />
            </div>

            {/* Timer Boxes */}
            <div className="flex gap-2">
              {[1, 2, 3].map((t) => (
                <div
                  key={t}
                  className="bg-amber-100 dark:bg-gray-800 px-4 py-2 rounded-md text-center min-w-[60px]"
                >
                  <Skeleton className="h-6 w-8 mx-auto rounded-md mb-1" />
                  <Skeleton className="h-3 w-10 mx-auto rounded-md" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Cards Grid (simulating carousel slides) */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((p) => (
              <div
                key={p}
                className="relative bg-white dark:bg-gray-900 rounded-lg shadow h-[330px] overflow-hidden"
              >
                {/* Image skeleton */}
                <Skeleton className="h-[200px] w-full rounded-t-lg" />

                <div className="p-3 space-y-2">
                  <Skeleton className="h-4 w-3/4 rounded-md" />
                  <Skeleton className="h-4 w-1/2 rounded-md" />
                  <div className="flex gap-2 mt-3">
                    <Skeleton className="h-8 w-24 rounded-full" />
                    <Skeleton className="h-8 w-16 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
