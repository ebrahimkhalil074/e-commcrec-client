"use client";
import React from "react";

export default function FeturedProductSkeletonGrid({ count = 8 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden"
        >
          {/* Image placeholder */}
          <div className="w-full h-52 bg-gray-200 dark:bg-gray-700" />

          {/* Content */}
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />

            <div className="flex flex-col gap-2 mt-3">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
