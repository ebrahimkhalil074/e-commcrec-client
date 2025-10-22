"use client";
import { Card, CardBody } from "@heroui/react";

export default function CustomerOverviewSkeleton() {
  const shimmer =
    "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700";

  return (
    <div className="p-6 space-y-6">
      {/* === Profile Skeleton === */}
      <Card className="border-l-8 border-amber-500 bg-amber-50 dark:bg-gray-800 shadow-lg rounded-xl">
        <CardBody>
          <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className={`w-20 h-20 rounded-full ${shimmer}`} />
              <div className="space-y-2">
                <div className={`h-5 w-40 rounded ${shimmer}`} />
                <div className={`h-4 w-60 rounded ${shimmer}`} />
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-2">
              <div className={`h-5 w-48 mx-auto md:mx-0 rounded ${shimmer}`} />
              <div className={`h-4 w-72 mx-auto md:mx-0 rounded ${shimmer}`} />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* === KPI Skeletons === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card
            key={i}
            className="border-t-4 border-amber-500 shadow-md dark:bg-gray-800"
          >
            <CardBody>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full ${shimmer}`} />
                <div className="flex flex-col gap-2">
                  <div className={`h-4 w-24 rounded ${shimmer}`} />
                  <div className={`h-5 w-20 rounded ${shimmer}`} />
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* === Chart Skeletons === */}
      <Card className="border-t-4 border-b-4 border-amber-500 dark:bg-gray-800">
        <CardBody>
          <div className={`h-64 w-full rounded-lg ${shimmer}`} />
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:bg-gray-800">
        <Card className="border-t-4 border-b-4 border-amber-500 dark:bg-gray-800">
          <CardBody>
            <div className={`h-64 w-full rounded-lg ${shimmer}`} />
          </CardBody>
        </Card>
        <Card className="border-t-4 border-b-4 border-amber-500 dark:bg-gray-800">
          <CardBody>
            <div className={`h-64 w-full rounded-lg ${shimmer}`} />
          </CardBody>
        </Card>
      </div>

      <Card className="border-t-4 border-b-4 border-amber-500 dark:bg-gray-800">
        <CardBody>
          <div className={`h-64 w-full rounded-lg ${shimmer}`} />
        </CardBody>
      </Card>

      {/* === Latest Delivery Logs Skeleton === */}
      <Card className="border-t-4 border-b-4 border-amber-500 dark:bg-gray-800">
        <CardBody className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className={`h-4 w-32 rounded ${shimmer}`} />
              <div className={`h-4 w-40 rounded ${shimmer}`} />
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
