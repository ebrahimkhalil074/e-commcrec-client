"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader } from "@heroui/card";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Chip } from "@heroui/chip";
import { Spinner } from "@heroui/spinner";

type Order = {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  user: { name: string; email: string };
  payment?: { method: string; transactionId: string };
  deliveryBoy?: { name: string };
};

export default function DeliveredOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/order?status=DELIVERED", { cache: "no-store" });
        const data = await res.json();
        setOrders(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="flex justify-center py-10"><Spinner size="lg" /></div>;

  return (
    <Card className="p-6">
      <CardHeader className="flex justify-between items-center bg-amber-500 text-white rounded-t-2xl px-6 py-4">
        <h1 className="text-xl font-bold">Delivered Orders</h1>
      </CardHeader>

      <Table
        aria-label="Delivered Orders Table"
        removeWrapper
        className="border border-amber-200 rounded-xl shadow-md overflow-x-auto mt-4"
      >
        <TableHeader>
          <TableColumn className="text-amber-600">Order ID</TableColumn>
          <TableColumn className="text-amber-600">Customer</TableColumn>
          <TableColumn className="text-amber-600">Email</TableColumn>
          <TableColumn className="text-amber-600">Total</TableColumn>
          <TableColumn className="text-amber-600">Payment</TableColumn>
          <TableColumn className="text-amber-600">Status</TableColumn>
          <TableColumn className="text-amber-600">Delivery Boy</TableColumn>
          <TableColumn className="text-amber-600">Created</TableColumn>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono">{order.id.slice(0, 8)}...</TableCell>
              <TableCell>{order.user.name}</TableCell>
              <TableCell>{order.user.email}</TableCell>
              <TableCell className="font-semibold">${order.total.toFixed(2)}</TableCell>
              <TableCell>
                {order.payment ? (
                  <Chip size="sm" color="success" variant="flat">
                    {order.payment.method} ({order.payment.transactionId.slice(0, 8)}...)
                  </Chip>
                ) : (
                  <Chip size="sm" color="danger" variant="flat">
                    No Payment
                  </Chip>
                )}
              </TableCell>
              <TableCell>
                <Chip size="sm" color="success" variant="flat">{order.status}</Chip>
              </TableCell>
              <TableCell>{order.deliveryBoy?.name || "-"}</TableCell>
              <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
