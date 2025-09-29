// const OrdersPage = async() => {
//   const res = await fetch('http://localhost:5000/api/v1/order');
//   const data = await res.json();
//   console.log(data);
//   return (
//     <div>
//       <h1>Hello, i am OrdersPage component !</h1>
//       {/* aikhane orderTable component hobe */}
//     </div>
//   );
// };

// export default OrdersPage;

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Chip } from "@heroui/chip";
import { Card, CardHeader } from "@heroui/card";
import { FaEye, FaTrash } from "react-icons/fa";
import { Spinner } from "@heroui/spinner";

import DeleteModal from "@/src/components/modal/DeleteModal";

// Order Type
type Order = {
  id: string;
  user: { name: string };
  total: number;
  isPaid: boolean;
  createdAt: string;
};

export default function OrdersTable() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // delete modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const openDeleteModal = (id: string) => {
    setSelectedOrderId(id);
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedOrderId) {
      try {
        await fetch(`http://localhost:5000/api/v1/order/${selectedOrderId}`, {
          method: "DELETE",
        });
        setOrders((prev) => prev.filter((o) => o.id !== selectedOrderId));
      } catch (error) {
        console.error("Failed to delete order", error);
      }
    }
    setModalOpen(false);
  };

  const cancelDelete = () => {
    setSelectedOrderId(null);
    setModalOpen(false);
  };

  // fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/order", {
          cache: "no-store",
        });
        const data = await res.json();

        setOrders(data?.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <Spinner size="lg" />
      </div>
    );

  return (
    <Card className="p-6">
      {/* Header */}
      <CardHeader className="flex justify-between items-center bg-amber-500 text-white rounded-t-2xl px-6 py-4">
        <h1 className="text-xl font-bold">All Orders</h1>
        <Button
          as={Link}
          className="bg-white text-amber-600 font-semibold rounded-xl shadow"
          href="/admin/orders/create"
        >
          + Create Order
        </Button>
      </CardHeader>

      {/* Orders Table */}
      <Table
        removeWrapper
        aria-label="Orders Table"
        className="border border-amber-200 rounded-xl shadow-md overflow-x-auto"
      >
        <TableHeader>
          <TableColumn className="text-amber-600">Order ID</TableColumn>
          <TableColumn className="text-amber-600">User</TableColumn>
          <TableColumn className="text-amber-600">Total</TableColumn>
          <TableColumn className="text-amber-600">Status</TableColumn>
          <TableColumn className="text-amber-600">Created</TableColumn>
          <TableColumn className="text-amber-600">Actions</TableColumn>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono">
                {order.id.slice(0, 8)}...
              </TableCell>
              <TableCell>{order.user?.name || "Unknown"}</TableCell>
              <TableCell className="font-semibold">
                ${order.total.toFixed(2)}
              </TableCell>
              <TableCell>
                {order.isPaid ? (
                  <Chip color="success" size="sm" variant="flat">
                    Paid
                  </Chip>
                ) : (
                  <Chip color="danger" size="sm" variant="flat">
                    Unpaid
                  </Chip>
                )}
              </TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="flex gap-2">
                <Link href={`/admin/orders/${order.id}`}>
                  <Button
                    isIconOnly
                    aria-label="View"
                    className="bg-amber-500 text-white hover:bg-amber-600"
                    size="sm"
                  >
                    <FaEye />
                  </Button>
                </Link>
                <Button
                  isIconOnly
                  aria-label="Delete"
                  className="border-amber-500 text-amber-600 hover:bg-amber-50"
                  size="sm"
                  variant="bordered"
                  onPress={() => openDeleteModal(order.id)}
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
        message="Are you sure you want to delete this order? This action cannot be undone."
        title="Delete Order"
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </Card>
  );
}
