"use client";

import { Card, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

export function OffersPageSkeleton() {
  return (
    <section className="bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Hero header skeleton */}
      <div className="relative py-15 text-center">
        <Skeleton className="h-10 w-80 mx-auto rounded-md" />
        <Skeleton className="h-5 w-2/3 mx-auto mt-4 rounded-md" />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-500 via-pink-400 to-amber-500 rounded-full opacity-40" />
      </div>

      {/* Skeleton Grid */}
      <div className="mt-8 max-w-7xl mx-auto px-6 pb-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card
            key={item}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
          >
            <CardBody className="p-0">
              {/* Image skeleton */}
              <Skeleton className="h-56 w-full rounded-t-2xl" />

              {/* Content skeleton */}
              <div className="p-6 space-y-4">
                <Skeleton className="h-6 w-40 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />

                <div className="flex items-center justify-between mt-6">
                  <Skeleton className="h-5 w-32 rounded-md" />
                  <Skeleton className="h-9 w-24 rounded-full" />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
