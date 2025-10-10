import { Card, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/react";

// Skeleton loader for product cards
const ProductSkeletonGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(8)].map((_, i) => (
      <Card
        key={i}
        className="shadow-md border border-gray-200 dark:border-gray-700 rounded-xl"
      >
        <CardBody className="p-4 space-y-3">
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-5 w-3/4 rounded" />
          <Skeleton className="h-4 w-1/2 rounded" />
          <Skeleton className="h-6 w-1/3 rounded" />
        </CardBody>
      </Card>
    ))}
  </div>
);

export default ProductSkeletonGrid;
