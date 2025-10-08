"use client";

import { Skeleton } from "@heroui/react";
import { Card, CardBody } from "@heroui/react";

export default function UsersTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <Card className="w-full border border-amber-200 dark:border-gray-800 shadow-sm">
      <CardBody className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-amber-50 dark:bg-gray-800/50">
              {["NAME", "ROLE", "STATUS", "ACTIONS"].map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(rows)].map((_, i) => (
              <tr
                key={i}
                className="border-b last:border-0 dark:border-gray-700"
              >
                {/* NAME */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-4 w-32 rounded-md" />
                      <Skeleton className="h-3 w-24 rounded-md" />
                    </div>
                  </div>
                </td>

                {/* ROLE */}
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-20 rounded-md" />
                    <Skeleton className="h-3 w-16 rounded-md" />
                  </div>
                </td>

                {/* STATUS */}
                <td className="px-4 py-3">
                  <Skeleton className="h-6 w-16 rounded-full" />
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3 justify-center">
                    <Skeleton className="h-6 w-6 rounded-md" />
                    <Skeleton className="h-6 w-6 rounded-md" />
                    <Skeleton className="h-6 w-6 rounded-md" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
