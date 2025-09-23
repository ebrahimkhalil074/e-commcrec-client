'use client';

import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Input } from "@heroui/input";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import Link from "next/link";
import { useGetAllSubCategory } from "@/src/hooks/sub-cat.hook";

const SubCategoriesPage = () => {
  const [search, setSearch] = useState("");
const {data:subCategoryData} =useGetAllSubCategory(undefined)
  const categories =subCategoryData?.data;
  console.log({categories})
  const filtered = categories?.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <Card shadow="lg" className="border border-amber-500 rounded-2xl">
        <CardHeader className="flex justify-between items-center bg-amber-500 text-white rounded-t-2xl px-6 py-4">
          <h1 className="text-xl font-bold">Sub Categories</h1>
        
          <Button
    as={Link}
    href="/admin/subcategories/create"
    className="bg-white text-amber-600 font-semibold rounded-xl shadow"
  >
    + Add New
  </Button>
      
        </CardHeader>
        <CardBody>
          {/* Search */}
          <div className="flex items-center gap-3 mb-4">
            <Input
              type="text"
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              startContent={<FiSearch className="text-amber-500" />}
              className="w-72"
            />
          </div>

          {/* Categories Table */}
          <Table
            aria-label="All categories table"
            className="rounded-xl shadow"
            removeWrapper
          >
            <TableHeader>
              <TableColumn className="text-amber-600">SubCategory</TableColumn>
              <TableColumn className="text-amber-600">Category</TableColumn>
              <TableColumn className="text-amber-600">Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {filtered?.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell className="font-semibold">{cat.name}</TableCell>
                  <TableCell className="font-semibold">{cat?.category?.name}</TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                     <Button
                     as={Link}
                    href={`/admin/subcategories/update/${cat.id}`}
                    size="sm"
                    className="bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                    startContent={<FiEdit />}>
                       Edit
                   </Button>

                      <Button
                        size="sm"
                        className="bg-red-500 text-white rounded-lg hover:bg-red-600"
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

export default SubCategoriesPage;
