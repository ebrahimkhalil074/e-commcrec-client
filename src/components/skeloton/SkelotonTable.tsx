"use client";

import { Skeleton } from "@heroui/skeleton";
import { Card, CardBody } from "@heroui/card";

type SkeletonTableProps = {
  rows?: number;
  cols?: number;
};

const gridColsMap: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  7: "grid-cols-7",
  8: "grid-cols-8",
  9: "grid-cols-9",
  10: "grid-cols-10",
  12: "grid-cols-12",
};

export function SkeletonTable({ rows = 5, cols = 6 }: SkeletonTableProps) {
  const gridCols = gridColsMap[cols] ?? "grid-cols-6";

  return (
    <Card className="border border-amber-200 rounded-xl shadow-lg bg-amber-50/30 dark:bg-gray-900">
      <CardBody className="p-4 space-y-4">
        {/* Table Header Skeleton */}
        <div className={`grid ${gridCols} gap-4 mb-4`}>
          {Array.from({ length: cols }).map((_, idx) => (
            <Skeleton
              key={idx}
              className="h-5 w-24 rounded-md"
              classNames={{
                base: "bg-amber-100 dark:bg-amber-900",
                content: "from-amber-200 to-amber-400",
              }}
            />
          ))}
        </div>

        {/* Table Rows Skeleton */}
        <div className="space-y-4">
          {Array.from({ length: rows }).map((_, rIdx) => (
            <div
              key={rIdx}
              className={`grid ${gridCols} gap-4 items-center border-b border-amber-100 dark:border-gray-700 pb-3`}
            >
              {Array.from({ length: cols }).map((_, cIdx) => (
                <Skeleton
                  key={cIdx}
                  className="h-5 w-full rounded-md"
                  classNames={{
                    base: "bg-amber-100 dark:bg-amber-900",
                    content: "from-amber-200 to-amber-400",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
