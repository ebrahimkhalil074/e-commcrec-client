"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";
import { Chip } from "@heroui/chip";
import { Image } from "@heroui/image";
import { Button } from "@heroui/button";
import Link from "next/link";

interface Order {
  id: string;
  total: number;
  isPaid: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
    email: string;
  };
  userAddress?: {
    fullName: string;
    phone: string;
    email: string;
    country: string;
    state: string;
    district: string;
    city: string;
    street: string;
    postalCode: string;
    landmark?: string;
  };
  payment?: {
    id: string;
    method: string;
    status: string;
    transactionId?: string;
    amount?: number;
    isDue?: boolean;
    createdAt?: string;
  };
  items: {
    id: string;
    product: {
      name: string;
      images?: { url: string }[];
    };
    quantity: number;
    price: number;
    variant?: {
      name: string;
    };
    sizeStock?: {
      size: string;
    };
  }[];
}

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/order/${id}`);
        const data = await res.json();
        setOrder(data?.data);
      } catch (error) {
        console.error("Failed to fetch order details", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-center text-amber-500 font-semibold">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-10 text-center text-red-500 font-semibold">
        Order not found.
      </div>
    );
  }
console.log(order);
  return (
    <Card className="p-6">
      {/* Header */}
      <CardHeader className="flex justify-between items-center bg-amber-500 text-white rounded-t-2xl px-6 py-4">
        <h1 className="text-xl font-bold">Order Details</h1>
        <Button
          as={Link}
          href="/admin/orders"
          className="bg-white text-amber-600 font-semibold rounded-xl shadow"
        >
          Back to Orders
        </Button>
      </CardHeader>

      <CardBody className="space-y-8">
        {/* Order Summary */}
        <section>
          <h2 className="text-lg font-bold text-amber-600 mb-3">Order Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>User:</strong> {order.user?.name} ({order.user?.email})</p>
            <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
            <p>
              <strong>Status:</strong>{" "}
              {order.isPaid ? (
                <Chip color="success" variant="flat">Paid</Chip>
              ) : (
                <Chip color="danger" variant="flat">Unpaid</Chip>
              )}
            </p>
            <p><strong>Created:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Updated:</strong> {new Date(order.updatedAt).toLocaleString()}</p>
          </div>
        </section>
 {order.userAddress && (
          <section>
            <h2 className="text-lg font-bold text-amber-600 mb-3">Delivery Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><strong>Name:</strong> {order.userAddress.fullName}</p>
              <p><strong>Phone:</strong> {order.userAddress.phone}</p>
              <p><strong>Email:</strong> {order.userAddress.email}</p>
              <p><strong>Country:</strong> {order.userAddress.country}</p>
              <p><strong>State:</strong> {order.userAddress.state}</p>
              <p><strong>District:</strong> {order.userAddress.district}</p>
              <p><strong>City:</strong> {order.userAddress.city}</p>
              <p><strong>Street:</strong> {order.userAddress.street}</p>
              <p><strong>Postal Code:</strong> {order.userAddress.postalCode}</p>
              {order.userAddress.landmark && (
                <p><strong>Landmark:</strong> {order.userAddress.landmark}</p>
              )}
            </div>
          </section>
        )}

        {/* Payment Info */}
        {order.payment && (
          <section>
            <h2 className="text-lg font-bold text-amber-600 mb-3">Payment Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><strong>Payment ID:</strong> {order.payment.id}</p>
              {order.payment.transactionId && (
                <p><strong>Transaction ID:</strong> {order.payment.transactionId}</p>
              )}
              <p><strong>Method:</strong> {order.payment.method || "N/A"}</p>
              {order.payment.amount && (
                <p><strong>Amount:</strong> ${order.payment.amount}</p>
              )}
              <p>
                <strong>Status:</strong>{" "}
                {order.payment.isDue ? (
                  <Chip color="warning" variant="flat">Due</Chip>
                ) : (
                  <Chip color="success" variant="flat">{order.payment.status}</Chip>
                )}
              </p>
              {order.payment.createdAt && (
                <p><strong>Payment Created:</strong> {new Date(order.payment.createdAt).toLocaleString()}</p>
              )}
            </div>
          </section>
        )}

        {/* Ordered Items */}
        <section>
          <h2 className="text-lg font-bold text-amber-600 mb-3">Order Items</h2>
          <Table
            aria-label="Order Items Table"
            removeWrapper
            className="border border-amber-200 rounded-xl shadow-md overflow-x-auto"
          >
            <TableHeader>
              <TableColumn className="text-amber-600">Image</TableColumn>
              <TableColumn className="text-amber-600">Product</TableColumn>
              <TableColumn className="text-amber-600">Variant</TableColumn>
              <TableColumn className="text-amber-600">Quantity</TableColumn>
              <TableColumn className="text-amber-600">Price</TableColumn>
              <TableColumn className="text-amber-600">Subtotal</TableColumn>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Image
                      src={item.product?.images?.[0]?.url || "/placeholder.png"}
                      alt={item.product?.name}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                    />
                  </TableCell>
                  <TableCell>{item.product?.name}</TableCell>
                  <TableCell>{item.variant?.name || item.sizeStock?.size || "-"}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </CardBody>
    </Card>
  );
}
