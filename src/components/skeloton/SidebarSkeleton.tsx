import { Skeleton } from "@heroui/react";

// Skeleton loader for sidebar filters
const SidebarSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-10 w-full rounded-lg" />
    <div>
      <Skeleton className="h-6 w-32 mb-2" />
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-5 w-40 mb-2 rounded" />
      ))}
    </div>
    <div>
      <Skeleton className="h-6 w-32 mb-2" />
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-5 w-40 mb-2 rounded" />
      ))}
    </div>
    <div>
      <Skeleton className="h-6 w-32 mb-2" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
    <Skeleton className="h-10 w-full rounded-lg" />
  </div>
);

export default SidebarSkeleton;
