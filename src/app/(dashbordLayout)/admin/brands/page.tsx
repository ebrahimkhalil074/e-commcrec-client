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

import { useGetAllBrands } from "@/src/hooks/brand.hook";

const BrandsPage = () => {
  const [search, setSearch] = useState("");
  const { data: brandData } = useGetAllBrands(undefined);
  const brands = brandData?.data;

  console.log({ brands });
  const filtered = brands?.filter((brand: any) =>
    brand.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <Card className="border border-amber-500 rounded-2xl" shadow="lg">
        <CardHeader className="flex justify-between items-center bg-amber-500 text-white rounded-t-2xl px-6 py-4">
          <h1 className="text-xl font-bold">All brands</h1>

          <Button
            as={Link}
            className="bg-white text-amber-600 font-semibold rounded-xl shadow"
            href="/admin/brands/create"
          >
            + Add New
          </Button>
        </CardHeader>
        <CardBody>
          {/* Search */}
          <div className="flex items-center gap-3 mb-4">
            <Input
              className="w-72"
              placeholder="Search brand..."
              startContent={<FiSearch className="text-amber-500" />}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* brands Table */}
          <Table
            removeWrapper
            aria-label="All brands table"
            className="rounded-xl shadow"
          >
            <TableHeader>
              <TableColumn className="text-amber-600">Image</TableColumn>
              <TableColumn className="text-amber-600">Name</TableColumn>
              <TableColumn className="text-amber-600">Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {filtered?.map((brand: any) => (
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
                  <TableCell className="font-semibold">{brand.name}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default BrandsPage;
