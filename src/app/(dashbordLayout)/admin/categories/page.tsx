"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { FaImage, FaTag, FaTools } from "react-icons/fa";
import { Input } from "@heroui/input";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

import { useGetAllCategory } from "@/src/hooks/category.hook";
import { SkeletonTable } from "@/src/components/skeloton/SkelotonTable";

const AllCategoriesPage = () => {
  const [search, setSearch] = useState("");
  const { data: categoryData, isLoading } = useGetAllCategory(undefined);
  const categories = categoryData?.data;
  const filtered = categories?.filter((cat: any) =>
    cat.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {isLoading ? (
        <SkeletonTable cols={3} rows={5} />
      ) : (
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header Section */}
          <Card className="border border-amber-500 rounded-2xl" shadow="lg">
            <CardHeader className="flex justify-between items-center bg-amber-500 text-white rounded-t-2xl px-6 py-4">
              <h1 className="text-xl font-bold">All Categories</h1>
              {/* Search */}
              <div className="flex items-center gap-3 ">
                <Input
                  placeholder="Search category..."
                  startContent={<FiSearch className="text-amber-500" />}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button
                as={Link}
                className="bg-white text-amber-600 font-semibold rounded-xl shadow"
                href="/admin/categories/create"
              >
                + Add New
              </Button>
            </CardHeader>
            <CardBody>
              {/* Categories Table */}
              <Table
                removeWrapper
                aria-label="All categories table"
                className="rounded-xl shadow"
              >
                <TableHeader>
                  <TableColumn>
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <FaImage className="w-4 h-4" />
                      <span>Image</span>
                    </div>
                  </TableColumn>

                  <TableColumn>
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <FaTag className="w-4 h-4" />
                      <span>Name</span>
                    </div>
                  </TableColumn>

                  <TableColumn>
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <FaTools className="w-4 h-4" />
                      <span>Actions</span>
                    </div>
                  </TableColumn>
                </TableHeader>

                <TableBody>
                  {filtered && filtered.length > 0 ? (
                    filtered.map((cat: any) => (
                      <TableRow key={cat.id}>
                        <TableCell>
                          <Image
                            alt={cat.name}
                            className="w-14 h-14 rounded-xl object-cover border border-amber-200 shadow-sm"
                            height={56}
                            src={cat.image}
                            width={56}
                          />
                        </TableCell>
                        <TableCell className="font-semibold">
                          {cat.name}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-3">
                            <Button
                              as={Link}
                              className="bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                              href={`/admin/categories/update/${cat.id}`}
                              size="sm"
                              startContent={<FiEdit />}
                            >
                              Edit
                            </Button>

                            <Button
                              className="bg-red-500 text-white rounded-lg hover:bg-red-600"
                              size="sm"
                              startContent={<FiTrash2 />}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        className="text-center py-6 text-gray-500 dark:text-gray-400"
                        colSpan={3}
                      >
                        No categories found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
};

export default AllCategoriesPage;
