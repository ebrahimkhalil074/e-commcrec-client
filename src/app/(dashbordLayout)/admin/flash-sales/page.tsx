// "use client";

// import Link from "next/link";
// import { Button } from "@heroui/button";
// import { Image } from "@heroui/image";
// import { Chip } from "@heroui/chip";
// import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { useSoftDeleteProduct, useGetAllProducts } from "@/src/hooks/product.hook";
// import AllProductsSkeleton from "@/src/components/skeloton/AllProductsSkeleton";

// export default function ProductsTable() {
//   const { data, isLoading } = useGetAllProducts();  // ⬅️ React Query দিয়ে ফেচ
//   const { mutate: handleDelete } = useSoftDeleteProduct();

//   const products = data?.data || []; // API যদি {data: [...]} রিটার্ন করে

//   return (
//    <>
//    {
//     isLoading?
//     <AllProductsSkeleton />
//     :
//      <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4 text-amber-600">All Products</h1>

//       <Table
//         aria-label="Products Table"
//         removeWrapper
//         className="border border-amber-200 rounded-xl shadow-md overflow-x-auto"
//       >
//         <TableHeader>
//           <TableColumn>Image</TableColumn>
//           <TableColumn>Name</TableColumn>
//           <TableColumn>Category</TableColumn>
//           <TableColumn>Brand</TableColumn>
//           <TableColumn>Price</TableColumn>
//           <TableColumn>Stock</TableColumn>
//           <TableColumn>Rating</TableColumn>
//           <TableColumn>Created</TableColumn>
//           <TableColumn>Actions</TableColumn>
//         </TableHeader>
//         <TableBody>
//           {products.map((product: any) => (
//             <TableRow key={product.id}>
//               <TableCell>
//                 <Image
//                   src={product.images[0]?.url || "/placeholder.png"}
//                   alt={product.name}
//                   width={60}
//                   height={60}
//                   className="rounded-lg object-cover"
//                 />
//               </TableCell>
//               <TableCell className="font-semibold">{product.name}</TableCell>
//               <TableCell>
//                 {product.category?.name} /{" "}
//                 <span className="text-gray-500">{product.subCategory?.name}</span>
//               </TableCell>
//               <TableCell>{product.brand?.name}</TableCell>
//               <TableCell>
//                 <div>
//                   <span className="font-semibold">${product.price}</span>
//                   {product.discount > 0 && (
//                     <Chip
//                       size="sm"
//                       color="warning"
//                       variant="flat"
//                       className="ml-2 bg-amber-100 text-amber-700"
//                     >
//                       -{product.discount}%
//                     </Chip>
//                   )}
//                 </div>
//               </TableCell>
//               <TableCell>{product.stock}</TableCell>
//               <TableCell>
//                 ⭐ {product.rating} ({product.reviewCount})
//               </TableCell>
//               <TableCell>{new Date(product.createdAt).toLocaleDateString()}</TableCell>
//               <TableCell className="flex gap-2">
//                 <Link href={`/admin/products/update/${product.id}`}>
//                   <Button
//                     isIconOnly
//                     size="sm"
//                     className="bg-amber-500 text-white hover:bg-amber-600"
//                     aria-label="Edit"
//                   >
//                     <FaEdit />
//                   </Button>
//                 </Link>
//                 <Button
//                   isIconOnly
//                   size="sm"
//                   variant="bordered"
//                   className="border-amber-500 text-amber-600 hover:bg-amber-50"
//                   aria-label="Delete"

//                   onPress={() => handleDelete(product.id)}
//                 >
//                   <FaTrash />
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//    }
//    </>
//   );
// }

"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@heroui/button";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Card, CardHeader } from "@heroui/card";

import { useSoftDeleteProduct } from "@/src/hooks/product.hook";
import AllProductsSkeleton from "@/src/components/skeloton/AllProductsSkeleton";
import DeleteModal from "@/src/components/modal/DeleteModal";
import { useGetAllFlashSale } from "@/src/hooks/flashSale.hook";

export default function FlashSalePage() {
  const { data: fsData, isLoading } = useGetAllFlashSale();
  const { mutate: handleDelete } = useSoftDeleteProduct();
  const flashSales = fsData?.data || [];

  console.log({ flashSales });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFlashSaliId, setSelectedFlashSaliId] = useState<string | null>(
    null,
  );

  const openDeleteModal = (id: string) => {
    setSelectedFlashSaliId(id);
    setModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedFlashSaliId) handleDelete(selectedFlashSaliId);
    setModalOpen(false);
  };

  const cancelDelete = () => {
    setSelectedFlashSaliId(null);
    setModalOpen(false);
  };

  if (isLoading) return <AllProductsSkeleton />;

  return (
    <Card className="p-6">
      <CardHeader className="flex justify-between items-center bg-amber-500 text-white rounded-t-2xl px-6 py-4">
        <h1 className="text-xl font-bold">All Flash Sales</h1>

        <Button
          as={Link}
          className="bg-white text-amber-600 font-semibold rounded-xl shadow"
          href="/admin/flash-sales/create"
        >
          + Add New
        </Button>
      </CardHeader>
      <Table
        removeWrapper
        aria-label="FlashSale Table"
        className="border border-amber-200 rounded-xl shadow-md overflow-x-auto"
      >
        <TableHeader>
          <TableColumn className="text-amber-600">Name</TableColumn>
          <TableColumn className="text-amber-600">Discount</TableColumn>
          <TableColumn className="text-amber-600">Start</TableColumn>
          <TableColumn className="text-amber-600">End</TableColumn>
          <TableColumn className="text-amber-600">Status</TableColumn>
          <TableColumn className="text-amber-600">Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {flashSales.map((sale: any) => (
            <TableRow key={sale.id}>
              <TableCell>{sale.name}</TableCell>
              <TableCell>{sale.discount}%</TableCell>
              <TableCell>
                {new Date(sale.startAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{new Date(sale.endAt).toLocaleDateString()}</TableCell>
              <TableCell>
                {new Date(sale.startAt) > new Date()
                  ? "Upcoming"
                  : new Date(sale.endAt) < new Date()
                    ? "Expired"
                    : "Active"}
              </TableCell>
              <TableCell className="flex gap-2">
                <Link href={`/admin/flash-sales/update/${sale.id}`}>
                  <Button
                    isIconOnly
                    aria-label="Edit"
                    className="bg-amber-500 text-white hover:bg-amber-600"
                    size="sm"
                  >
                    <FaEdit />
                  </Button>
                </Link>
                <Button
                  isIconOnly
                  aria-label="Delete"
                  className="border-amber-500 text-amber-600 hover:bg-amber-50"
                  size="sm"
                  variant="bordered"
                  onPress={() => openDeleteModal(sale.id)}
                >
                  <FaTrash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={modalOpen}
        message="Are you sure you want to delete this flashSales? This cannot be undone."
        title="Delete FlashSale"
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </Card>
  );
}
