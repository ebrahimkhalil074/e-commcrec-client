"use client";

import { Skeleton } from "@heroui/skeleton";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";

export default function AllProductsSkeleton() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-amber-600">All Products</h1>

      <Table
        aria-label="Products Loading Skeleton"
        removeWrapper
        className="border border-amber-200 rounded-xl shadow-md overflow-x-auto"
      >
        <TableHeader>
          <TableColumn>Image</TableColumn>
          <TableColumn>Name</TableColumn>
          <TableColumn>Category</TableColumn>
          <TableColumn>Brand</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Stock</TableColumn>
          <TableColumn>Rating</TableColumn>
          <TableColumn>Created</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-[60px] w-[60px] rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-16 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-12 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24 rounded" />
              </TableCell>
              <TableCell className="flex gap-2">
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-8 w-8 rounded" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
