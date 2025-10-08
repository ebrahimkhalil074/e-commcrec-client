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
import { Input } from "@heroui/input";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { FaImage, FaTag, FaTools } from "react-icons/fa";

import { useGetAllBrands } from "@/src/hooks/brand.hook";
import { SkeletonTable } from "@/src/components/skeloton/SkelotonTable";

const BrandsPage = () => {
  const [search, setSearch] = useState("");
  const { data: brandData, isLoading } = useGetAllBrands(undefined);
  const brands = brandData?.data;

  const filtered = brands?.filter((brand: any) =>
    brand.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {isLoading ? (
        <SkeletonTable cols={3} rows={5} />
      ) : (
        <div className="p-6  mx-auto">
          {/* Header Section */}
          <Card className="border border-amber-500 rounded-2xl" shadow="lg">
            <CardHeader className="flex justify-between items-center bg-amber-500 text-white rounded-t-2xl px-6 py-4">
              <h1 className="text-xl font-bold">All brands</h1>
              {/* Search */}
              <div className="flex items-center gap-3 ">
                <Input
                  className=""
                  placeholder="Search brand..."
                  startContent={<FiSearch className="text-amber-500" />}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button
                as={Link}
                className="bg-white text-amber-600 font-semibold rounded-xl shadow"
                href="/admin/brands/create"
              >
                + Add New
              </Button>
            </CardHeader>
            <CardBody>
              {/* brands Table */}
              <Table
                removeWrapper
                aria-label="All brands table"
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
                <TableBody emptyContent={"No brands found"} items={filtered}>
                  {filtered?.length > 0 ? (
                    filtered.map((brand: any) => (
                      <TableRow key={brand.id}>
                        <TableCell>
                          <Image
                            alt={brand.name}
                            className="w-14 h-14 rounded-xl object-cover border border-amber-200 shadow-sm"
                            height={300}
                            src={brand.image}
                            width={1000}
                          />
                        </TableCell>
                        <TableCell className="font-semibold">
                          {brand.name}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-3">
                            <Button
                              as={Link}
                              className="bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                              href={`/admin/brands/update/${brand.id}`}
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
                        No brands found
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

export default BrandsPage;
