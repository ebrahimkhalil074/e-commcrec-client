"use client";

import { Card, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

export function FlashSaleSkeleton() {
  return (
    <section className="py-10 px-4 border-b border-amber-200">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-8 w-32 rounded-md" />
        <Skeleton className="h-6 w-6 rounded-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {[1, 2].map((item) => (
          <Card
            key={item}
            className="border border-amber-200 rounded-xl shadow bg-white dark:bg-gray-900"
          >
            <CardBody className="p-5 space-y-6">
              {/* Title & Countdown */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="space-y-2 w-full">
                  <Skeleton className="h-6 w-48 rounded-md" />
                  <Skeleton className="h-4 w-64 rounded-md" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-14 w-14 rounded-md" />
                  <Skeleton className="h-14 w-14 rounded-md" />
                  <Skeleton className="h-14 w-14 rounded-md" />
                </div>
              </div>

              {/* Product Slides (3 cards) */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((p) => (
                  <div
                    key={p}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 space-y-3"
                  >
                    <Skeleton className="h-40 w-full rounded-md" />
                    <Skeleton className="h-4 w-32 rounded-md" />
                    <Skeleton className="h-4 w-20 rounded-md" />
                    <Skeleton className="h-9 w-full rounded-md" />
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
