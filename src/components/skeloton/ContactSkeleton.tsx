"use client";

import { Skeleton, Card, CardBody } from "@heroui/react";

export default function ContactPageSkeleton() {
  return (
    <section className="bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100">
      <div className="p-6 md:p-10">
        {/* Header Skeleton */}
        <div className="relative text-center space-y-3">
          <Skeleton className="h-10 w-56 mx-auto rounded-lg" />
          <Skeleton className="h-5 w-3/4 mx-auto rounded" />
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-500 via-pink-400 to-amber-500 rounded-full opacity-40" />
        </div>

        {/* Info + Form Skeleton */}
        <div className="mt-10 grid md:grid-cols-2 gap-12">
          {/* Info Section Skeleton */}
          <div className="space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-1/2 rounded" />
                  <Skeleton className="h-4 w-3/4 rounded" />
                  <Skeleton className="h-4 w-2/3 rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form Skeleton */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700">
            <CardBody className="p-8 space-y-6">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-10 w-1/3 rounded-full mx-auto" />
            </CardBody>
          </Card>
        </div>

        {/* Map Skeleton */}
        <div className="mt-16">
          <Skeleton className="h-72 w-full rounded-xl" />
        </div>
      </div>
    </section>
  );
}
