"use client";

import React, { useState } from "react";
import { Button } from "@heroui/button";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Card, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Spinner } from "@heroui/spinner";
import { Pagination } from "@heroui/pagination";
import { FaEye, FaUndo } from "react-icons/fa";
import Link from "next/link";
import {
  FiShoppingCart,
  FiCalendar,
  FiCheckCircle,
  FiCreditCard,
  FiDollarSign,
  FiBox,
  FiSettings,
} from "react-icons/fi";

import { useGetMyAllOrders } from "@/src/hooks/order.hook";
import { useUser } from "@/src/context/User.context";
import { SkeletonTable } from "@/src/components/skeloton/SkelotonTable";

// --- Order typings (adjust to match your API) ---
type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  product: { id: string; name: string; images?: string[] };
  variant?: { color?: string };
  sizeStock?: { size?: string };
};

type Order = {
  id: string;
  total: number;
  status: "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  isPaid: boolean;
  createdAt: string;
  items: OrderItem[];
  payment?: { transactionId?: string; method?: string; amount?: number };
  shippingAddress?: { name?: string; phone?: string; address?: string };
};

// --- Tabs config ---
const TABS: { key: string; label: string }[] = [
  { key: "ALL", label: "All" },
  { key: "PENDING", label: "Pending" },
  { key: "PAID", label: "Paid" },
  { key: "SHIPPED", label: "Shipped" },
  { key: "DELIVERED", label: "Delivered" },
  { key: "CANCELLED", label: "Cancelled" },
];

export default function CustomerOrdersPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [page, setPage] = useState<number>(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [limit, setLimit] = useState<number>(8); // dynamic limit
  // Query: pass undefined for ALL to fetch everything
  const statusParam = activeTab === "ALL" ? undefined : activeTab;
  const { data, isLoading, isError, refetch } = useGetMyAllOrders({
    status: statusParam,
    page,
    limit,
  });
  // adapt to your hook's response shape
  const orders: Order[] = data?.data?.data ?? [];
  const meta = data?.data?.meta;

  // When tab changes reset page
  const onChangeTab = (key: string) => {
    setActiveTab(key);
    setPage(1);
    // if hook uses params as keys, it should auto refetch; but call refetch to be safe
    setTimeout(() => refetch(), 0);
  };

  if (!user) {
    return (
      <Card className="p-6">
        <CardHeader className="bg-amber-500 text-white rounded-t-2xl px-6 py-4">
          <h2 className="text-lg font-bold">My Orders</h2>
        </CardHeader>
        <div className="p-6">Please login to view your orders.</div>
      </Card>
    );
  }

  return (
    <>
      {isLoading ? (
        <SkeletonTable cols={7} rows={6} />
      ) : (
        <div className="p-6 space-y-6">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-amber-500 text-white rounded-t-2xl px-6 py-4">
              <div>
                <h1 className="text-2xl font-bold">My Orders</h1>
                <p className="text-sm opacity-90">
                  Track, cancel or request returns here.
                </p>
              </div>

              <div className="flex gap-2 flex-wrap">
                {TABS.map((t) => (
                  <button
                    key={t.key}
                    className={`px-3 py-1 rounded-md font-medium ${
                      activeTab === t.key
                        ? "bg-white text-amber-600"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                    onClick={() => onChangeTab(t.key)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </CardHeader>

            <div className="p-4">
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <Spinner size="lg" />
                </div>
              ) : isError ? (
                <div className="text-red-600 p-4">
                  Failed to load orders. Please try again.
                </div>
              ) : orders.length === 0 ? (
                <div className="p-6 text-center text-gray-600">
                  No orders found.
                </div>
              ) : (
                <>
                  <Table
                    removeWrapper
                    aria-label="My Orders"
                    className="border border-amber-200 rounded-xl shadow-md overflow-x-auto"
                  >
                    <TableHeader>
                      <TableColumn>
                        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                          <FiShoppingCart className="text-amber-500 dark:text-amber-400" />
                          Order
                        </div>
                      </TableColumn>

                      <TableColumn>
                        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                          <FiCalendar className="text-amber-500 dark:text-amber-400" />
                          Placed
                        </div>
                      </TableColumn>

                      <TableColumn>
                        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                          <FiCheckCircle className="text-amber-500 dark:text-amber-400" />
                          Status
                        </div>
                      </TableColumn>

                      <TableColumn>
                        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                          <FiCreditCard className="text-amber-500 dark:text-amber-400" />
                          Payment
                        </div>
                      </TableColumn>

                      <TableColumn>
                        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                          <FiDollarSign className="text-amber-500 dark:text-amber-400" />
                          Total
                        </div>
                      </TableColumn>

                      <TableColumn>
                        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                          <FiBox className="text-amber-500 dark:text-amber-400" />
                          Items
                        </div>
                      </TableColumn>

                      <TableColumn>
                        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                          <FiSettings className="text-amber-500 dark:text-amber-400" />
                          Actions
                        </div>
                      </TableColumn>
                    </TableHeader>

                    <TableBody>
                      {orders?.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono">
                            {order.id.slice(0, 8)}...
                          </TableCell>
                          <TableCell>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </TableCell>

                          <TableCell>
                            <Chip
                              color={
                                order.status === "DELIVERED"
                                  ? "success"
                                  : order.status === "CANCELLED"
                                    ? "danger"
                                    : order.status === "SHIPPED"
                                      ? "primary"
                                      : "warning"
                              }
                              size="sm"
                            >
                              {order.status}
                            </Chip>
                          </TableCell>

                          <TableCell>
                            {order.isPaid ? (
                              <Chip color="success" size="sm" variant="flat">
                                Paid
                              </Chip>
                            ) : (
                              <Chip color="warning" size="sm" variant="flat">
                                Pending
                              </Chip>
                            )}
                          </TableCell>

                          <TableCell className="font-semibold">
                            ${order.total.toFixed(2)}
                          </TableCell>

                          <TableCell>
                            <div className="flex flex-col items-start">
                              {order.items.slice(0, 2).map((it) => (
                                <div key={it.id} className="text-sm">
                                  {it.product.name}
                                  {it.variant?.color
                                    ? ` - ${it.variant.color}`
                                    : ""}
                                  {it.sizeStock?.size
                                    ? ` (${it.sizeStock.size})`
                                    : ""}
                                  x{it.quantity}
                                </div>
                              ))}
                              {order.items.length > 2 && (
                                <div className="text-xs text-gray-500">
                                  +{order.items.length - 2} more
                                </div>
                              )}
                            </div>
                          </TableCell>

                          <TableCell className="flex gap-2">
                            <Button
                              isIconOnly
                              aria-label="View"
                              className="bg-amber-500 text-white hover:bg-amber-600"
                              size="sm"
                              onPress={() => setSelectedOrder(order)}
                            >
                              <FaEye />
                            </Button>

                            {/* return icon example for delivered */}
                            {order.status === "DELIVERED" && (
                              <Button
                                isIconOnly
                                aria-label="Return"
                                className="border-amber-500 text-amber-600 hover:bg-amber-50"
                                size="sm"
                                variant="bordered"
                                onPress={() => alert("Open return flow")}
                              >
                                <FaUndo />
                              </Button>
                            )}

                            <Link href={`/orders/${order.id}`}>
                              <Button
                                className="border-amber-500 text-amber-600"
                                size="sm"
                                variant="bordered"
                              >
                                Open
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Pagination */}
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
                    {/* Items per page selector */}
                    <div className="flex items-center gap-2 text-gray-700">
                      <span className="font-medium">Items per page:</span>
                      <select
                        className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        value={limit}
                        onChange={(e) => {
                          setLimit(parseInt(e.target.value));
                          setPage(1); // reset page
                          setTimeout(() => refetch(), 0);
                        }}
                      >
                        <option value={5}>5</option>
                        <option value={8}>8</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                      </select>
                    </div>

                    {/* Pagination */}
                    <Pagination
                      showControls
                      className="bg-white rounded-lg shadow-md px-4 py-2"
                      page={meta.page}
                      total={Math.max(1, Math.ceil(meta.total / limit))}
                      onChange={(p) => {
                        setPage(p);
                        setTimeout(() => refetch(), 0);
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </Card>

          {/* Order details modal */}
          {selectedOrder && (
            <OrderDetailsModal
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
            />
          )}
        </div>
      )}
    </>
  );
}

/* -------------------------
   OrderDetailsModal component
   ------------------------- */
function OrderDetailsModal({
  order,
  onClose,
}: {
  order: Order;
  onClose: () => void;
}) {
  console.log(order);
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-md max-w-2xl w-full p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold">Order {order.id.slice(0, 8)}</h2>
          <div className="flex gap-2 items-center">
            <Chip size="sm">{order.status}</Chip>
            <button className="text-sm text-gray-600" onClick={onClose}>
              Close
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Items</h3>
            <ul className="mt-2 space-y-2">
              {order.items.map((it) => (
                <li key={it.id} className="flex gap-3 items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    {it.product.images?.[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        alt={it.product.name}
                        className="w-full h-full object-cover"
                        src={it.product.images[0]}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="font-medium">{it.product.name}</div>
                    <div className="text-sm text-gray-600">
                      {it.variant?.color ?? ""}{" "}
                      {it.sizeStock?.size ? `• ${it.sizeStock.size}` : ""}
                    </div>
                    <div className="text-sm">
                      Qty: {it.quantity} • ${it.price.toFixed(2)}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Summary</h3>
            <div className="mt-2 text-sm space-y-2">
              <div>
                <strong>Total:</strong> ${order.total.toFixed(2)}
              </div>
              <div>
                <strong>Payment:</strong> {order.isPaid ? "Paid" : "Pending"}
              </div>
              <div>
                <strong>Placed:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </div>
              {order.payment?.transactionId && (
                <div>
                  <strong>Txn:</strong> {order.payment.transactionId}
                </div>
              )}
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">Shipping</h4>
              <div className="text-sm mt-2">
                <div>{order.shippingAddress?.name}</div>
                <div>{order.shippingAddress?.phone}</div>
                <div>{order.shippingAddress?.address}</div>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <Button className="bg-amber-500 text-white" onPress={onClose}>
                Close
              </Button>
              <Link href={`/orders/${order.id}`}>
                <Button
                  className="border-amber-500 text-amber-600"
                  variant="bordered"
                >
                  Open Order Page
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
