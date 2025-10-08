"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader } from "@heroui/card";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import {
  FaHashtag,
  FaUser,
  FaEnvelope,
  FaDollarSign,
  FaCreditCard,
  FaChartLine,
  FaMotorcycle,
  FaTools,
} from "react-icons/fa";
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

export default function ShippedOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/order?status=SHIPPED`,
          { cache: "no-store" },
        );
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

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <Spinner size="lg" />
      </div>
    );

  return (
    <Card className="p-6">
      <CardHeader className="flex justify-between items-center bg-amber-500 text-white rounded-t-2xl px-6 py-4">
        <h1 className="text-xl font-bold">Shipped Orders</h1>
      </CardHeader>

      <Table
        removeWrapper
        aria-label="Shipped Orders Table"
        className="border border-amber-200 rounded-xl shadow-md overflow-x-auto mt-4"
      >
        <TableHeader>
          <TableColumn className="min-w-[120px]">
            <div className="flex items-center gap-2 justify-center text-amber-600 dark:text-amber-400">
              <FaHashtag className="text-sm" />
              <span>Order ID</span>
            </div>
          </TableColumn>

          <TableColumn className="min-w-[150px]">
            <div className="flex items-center gap-2 justify-center text-amber-600 dark:text-amber-400">
              <FaUser className="text-sm" />
              <span>Customer</span>
            </div>
          </TableColumn>

          <TableColumn className="min-w-[200px]">
            <div className="flex items-center gap-2 justify-center text-amber-600 dark:text-amber-400">
              <FaEnvelope className="text-sm" />
              <span>Email</span>
            </div>
          </TableColumn>

          <TableColumn className="min-w-[100px]">
            <div className="flex items-center gap-2 justify-center text-amber-600 dark:text-amber-400">
              <FaDollarSign className="text-sm" />
              <span>Total</span>
            </div>
          </TableColumn>

          <TableColumn className="min-w-[180px]">
            <div className="flex items-center gap-2 justify-center text-amber-600 dark:text-amber-400">
              <FaCreditCard className="text-sm" />
              <span>Payment</span>
            </div>
          </TableColumn>

          <TableColumn className="min-w-[120px]">
            <div className="flex items-center gap-2 justify-center text-amber-600 dark:text-amber-400">
              <FaChartLine className="text-sm" />
              <span>Status</span>
            </div>
          </TableColumn>

          <TableColumn className="min-w-[160px]">
            <div className="flex items-center gap-2 justify-center text-amber-600 dark:text-amber-400">
              <FaMotorcycle className="text-sm" />
              <span>Delivery Boy</span>
            </div>
          </TableColumn>

          <TableColumn className="min-w-[220px]">
            <div className="flex items-center gap-2 justify-center text-amber-600 dark:text-amber-400">
              <FaTools className="text-sm" />
              <span>Action</span>
            </div>
          </TableColumn>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-mono">
                {order.id.slice(0, 8)}...
              </TableCell>
              <TableCell>{order.user.name}</TableCell>
              <TableCell>{order.user.email}</TableCell>
              <TableCell className="font-semibold">
                ${order.total.toFixed(2)}
              </TableCell>
              <TableCell>
                {order.payment ? (
                  <Chip color="success" size="sm" variant="flat">
                    {order.payment.method} (
                    {order.payment.transactionId.slice(0, 8)}...)
                  </Chip>
                ) : (
                  <Chip color="danger" size="sm" variant="flat">
                    No Payment
                  </Chip>
                )}
              </TableCell>
              <TableCell>
                <Chip size="sm" variant="flat">
                  {order.status}
                </Chip>
              </TableCell>
              <TableCell>{order.deliveryBoy?.name || "-"}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
