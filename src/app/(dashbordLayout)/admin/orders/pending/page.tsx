"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader } from "@heroui/card";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Chip } from "@heroui/chip";
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";
import { useAssignDeliveryBoyForOrder, useMarkAsShippedOrder } from "@/src/hooks/order.hook";
import { toast } from "sonner";

type Order = {
  id: string;
  total: number;
  status: string;
  createdAt: string;
  user: { name: string; email: string };
  payment?: { method: string; transactionId: string };
  deliveryBoy?: { id: string; name: string };
};

type DeliveryBoy = { id: string; name: string };

export default function PendingOrdersPage() {
  const { mutate } = useMarkAsShippedOrder();
  const { mutate: handelAssinDelivaryBoy } = useAssignDeliveryBoyForOrder();

  const [orders, setOrders] = useState<Order[]>([]);
  const [deliveryBoys, setDeliveryBoys] = useState<DeliveryBoy[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState<string | null>(null);

  // ✅ fetchOrders আলাদা করলাম
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/order?status=PENDING", {
        cache: "no-store",
      });
      const data = await res.json();
      setOrders(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    const fetchDeliveryBoys = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/user?role=DELIVERYBOY");
        const data = await res.json();
        setDeliveryBoys(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDeliveryBoys();
  }, []);

  const markAsShipped = async (orderId: string) => {
    try {
      mutate(orderId, {
        onSuccess: () => {
          toast.success("Order marked as shipped!");
          fetchOrders(); // ✅ এখন কাজ করবে
        },
        onError: () => {
          toast.error("Failed to mark as shipped!");
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const assignDeliveryBoy = async (orderId: string, deliveryBoyId: string) => {
    setAssigning(orderId);
    try {
      handelAssinDelivaryBoy({ orderId, data: { deliveryBoyId } });
      toast.success("Delivery boy assigned!");
      fetchOrders(); // ✅ assign করার পরও refresh
    } catch (err) {
      console.error(err);
    } finally {
      setAssigning(null);
    }
  };

  if (loading) return <div className="flex justify-center py-10"><Spinner size="lg" /></div>;

  return (
    <Card className="p-6">
      <CardHeader className="flex justify-between items-center bg-amber-500 text-white rounded-t-2xl px-6 py-4">
        <h1 className="text-xl font-bold">Pending Orders</h1>
      </CardHeader>

      <Table
        aria-label="Pending Orders Table"
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
          <TableColumn className="text-amber-600">Action</TableColumn>
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
                <Chip size="sm" color="warning" variant="flat">
                  {order.status}
                </Chip>
              </TableCell>
              <TableCell>{order.deliveryBoy?.name || "-"}</TableCell>
              <TableCell className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-amber-500 text-white hover:bg-amber-600"
                  onPress={() => {
                    if (!order.deliveryBoy) {
                      toast("Please assign a delivery boy first!");
                      return;
                    }
                    markAsShipped(order.id);
                  }}
                  disabled={order.status !== "PENDING"}
                >
                  Mark as Shipped
                </Button>

                <select
                  className="border rounded px-2 py-1 text-sm"
                  onChange={(e) => assignDeliveryBoy(order.id, e.target.value)}
                  value={order.deliveryBoy?.id || ""}
                  disabled={assigning === order.id}
                >
                  <option value="">Assign DeliveryBoy</option>
                  {deliveryBoys.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
