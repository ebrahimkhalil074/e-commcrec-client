// "use client";
// import React from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
//   ColumnDef,
// } from "@tanstack/react-table";

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   phone: string;
//   city: string;
//   country: string;
//   status: string;
//   role: string;
//   createdAt: string;
//   updatedAt: string;
// };

// const data: User[] = Array.from({ length: 5 }).map((_, i) => ({
//   id: i + 1,
//   name: "John Doe",
//   email: "john@example.com",
//   phone: "0123456789",
//   city: "Dhaka",
//   country: "Bangladesh",
//   status: "Active",
//   role: "Admin",
//   createdAt: "2025-10-07",
//   updatedAt: "2025-10-07",
// }));

// const columns: ColumnDef<User>[] = [
//   { accessorKey: "id", header: "ID" },
//   { accessorKey: "name", header: "Name" },
//   {
//     accessorKey: "email",
//     header: "Email",
//     cell: (info) => (
//       <span className="hidden sm:inline">{info.getValue() as string}</span>
//     ),
//   },
//   {
//     accessorKey: "phone",
//     header: "Phone",
//     cell: (info) => (
//       <span className="">{info.getValue() as string}</span>
//     ),
//   },
//   {
//     accessorKey: "city",
//     header: "City",
//     cell: (info) => (
//       <span className="">{info.getValue() as string}</span>
//     ),
//   },
//   {
//     accessorKey: "country",
//     header: "Country",
//     cell: (info) => (
//       <span className="">{info.getValue() as string}</span>
//     ),
//   },
//   { accessorKey: "status", header: "Status" },
//   {
//     accessorKey: "role",
//     header: "Role",
//     cell: (info) => (
//       <span className="hidden sm:inline">{info.getValue() as string}</span>
//     ),
//   },
//   {
//     accessorKey: "createdAt",
//     header: "Created",
//     cell: (info) => (
//       <span className="">{info.getValue() as string}</span>
//     ),
//   },
//   {
//     header: "Action",
//     cell: () => (
//       <button className="bg-amber-500 text-white text-xs px-3 py-1 rounded hover:bg-amber-600">
//         Edit
//       </button>
//     ),
//   },
// ];

// export default function ResponsiveReactTable() {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   return (
//     <div className="w-full overflow-x-auto border border-amber-200 rounded-xl shadow-md">
//       <table className="w-full min-w-[900px] md:min-w-[1100px] text-xs sm:text-sm">
//         <thead className="bg-amber-100">
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th
//                   key={header.id}
//                   className="px-3 py-2 text-left text-amber-700 font-semibold"
//                 >
//                   {flexRender(
//                     header.column.columnDef.header,
//                     header.getContext(),
//                   )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>
//         <tbody>
//           {table.getRowModel().rows.map((row) => (
//             <tr
//               key={row.id}
//               className="hover:bg-amber-50 dark:hover:bg-gray-800 transition-colors"
//             >
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id} className="px-3 py-2 border-t">
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Mobile Swipe Hint */}
//       <p className="text-center text-xs sm:hidden text-gray-500 py-2">
//         👉 Swipe left/right to view all columns
//       </p>
//     </div>
//   );
// }

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
import { Chip } from "@heroui/chip";
import { Spinner } from "@heroui/spinner";
import { Button } from "@heroui/button";
import { toast } from "sonner";

import {
  useAssignDeliveryBoyForOrder,
  useMarkAsShippedOrder,
} from "@/src/hooks/order.hook";

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

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/order?status=PENDING`,
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

  useEffect(() => {
    fetchOrders();

    const fetchDeliveryBoys = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/user?role=DELIVERYBOY`,
        );
        const data = await res.json();

        setDeliveryBoys(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDeliveryBoys();
  }, []);

  const markAsShipped = async (orderId: string) => {
    mutate(orderId, {
      onSuccess: () => {
        toast.success("Order marked as shipped!");
        fetchOrders();
      },
      onError: () => {
        toast.error("Failed to mark as shipped!");
      },
    });
  };

  const assignDeliveryBoy = async (orderId: string, deliveryBoyId: string) => {
    setAssigning(orderId);
    try {
      handelAssinDelivaryBoy({ orderId, data: { deliveryBoyId } });
      toast.success("Delivery boy assigned!");
      fetchOrders();
    } catch (err) {
      console.error(err);
    } finally {
      setAssigning(null);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <Spinner size="lg" />
      </div>
    );

  return (
    <div className="flex flex-col ">
      {" "}
      {/* ✅ পুরো পেজ fix height */}
      <Card className="flex flex-col flex-1 overflow-hidden m-2 sm:m-4 shadow-lg">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-amber-500 text-white rounded-t-2xl px-4 sm:px-6 py-3 sm:py-4">
          <h1 className="text-lg sm:text-xl font-bold">Pending Orders</h1>
        </CardHeader>

        {/* ✅ শুধুমাত্র এখানে scroll থাকবে */}
        <div className="flex-1 overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-transparent">
          <Table
            removeWrapper
            aria-label="Pending Orders Table"
            classNames={{
              base: "w-full border border-amber-200 shadow-md text-sm sm:text-base",
              table: "min-w-[900px]",
            }}
          >
            <TableHeader>
              <TableColumn className="text-amber-600 min-w-[120px]">
                Order ID
              </TableColumn>
              <TableColumn className="text-amber-600 min-w-[150px]">
                Customer
              </TableColumn>
              <TableColumn className="text-amber-600 min-w-[200px]">
                Email
              </TableColumn>
              <TableColumn className="text-amber-600 min-w-[100px]">
                Total
              </TableColumn>
              <TableColumn className="text-amber-600 min-w-[180px]">
                Payment
              </TableColumn>
              <TableColumn className="text-amber-600 min-w-[120px]">
                Status
              </TableColumn>
              <TableColumn className="text-amber-600 min-w-[160px]">
                Delivery Boy
              </TableColumn>
              <TableColumn className="text-amber-600 min-w-[220px]">
                Action
              </TableColumn>
            </TableHeader>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono">
                    {order.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell className="truncate max-w-[180px]">
                    {order.user.email}
                  </TableCell>
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
                    <Chip color="warning" size="sm" variant="flat">
                      {order.status}
                    </Chip>
                  </TableCell>
                  <TableCell>{order.deliveryBoy?.name || "-"}</TableCell>

                  <TableCell>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        className="bg-amber-500 text-white hover:bg-amber-600 w-full sm:w-auto"
                        disabled={order.status !== "PENDING"}
                        size="sm"
                        onPress={() => {
                          if (!order.deliveryBoy) {
                            toast("Please assign a delivery boy first!");

                            return;
                          }
                          markAsShipped(order.id);
                        }}
                      >
                        Mark as Shipped
                      </Button>

                      <select
                        className="border rounded px-2 py-1 text-sm w-full sm:w-auto"
                        disabled={assigning === order.id}
                        value={order.deliveryBoy?.id || ""}
                        onChange={(e) =>
                          assignDeliveryBoy(order.id, e.target.value)
                        }
                      >
                        <option value="">Assign Delivery Boy</option>
                        {deliveryBoys.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
