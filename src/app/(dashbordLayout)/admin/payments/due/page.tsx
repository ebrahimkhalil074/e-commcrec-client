// import PaymentTable from "@/src/components/table/PaymentTable";

// const DuePaymentPage = async() => {
//   const res = await fetch("http://localhost:5000/api/v1/payment?isDue=true")
//   const duePaymentData =await res.json()
//   const payments = duePaymentData?.data ;
//   console.log(payments)
//   return (
//     <div>
//         <PaymentTable payments={payments} />
//     </div>
//   );
// };

// export default DuePaymentPage;

"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@heroui/card";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";

interface UserDue {
  id: string;
  name: string;
  email: string;
  role: string;
  totalDue: number;
  dueCount: number;
  lastDueDate: string | null;
  oldestDueDate: string | null;
  maxSingleDue: number;
}

interface Meta {
  totalUsersWithDue: number;
  grandTotalDue: number;
  averageDuePerUser: number;
  maxDueUser: {
    id: string;
    name: string;
    totalDue: number;
  };
}

export default function DuePaymentPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserDue[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/payment/due-summary`,
          {
            cache: "no-store",
          },
        );
        const json = await res.json();

        setUsers(json.data?.data);
        setMeta(json.data.meta);
      } catch (err) {
        console.error("Failed to load due summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }
  console.log(users);

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md rounded-xl">
          <CardBody>
            <p className="text-sm text-gray-500">Total Users with Due</p>
            <p className="text-2xl font-bold">{meta?.totalUsersWithDue || 0}</p>
          </CardBody>
        </Card>
        <Card className="shadow-md rounded-xl">
          <CardBody>
            <p className="text-sm text-gray-500">Grand Total Due</p>
            <p className="text-2xl font-bold text-red-500">
              ৳{meta?.grandTotalDue.toFixed(2) || "0.00"}
            </p>
          </CardBody>
        </Card>
        <Card className="shadow-md rounded-xl">
          <CardBody>
            <p className="text-sm text-gray-500">Average Due Per User</p>
            <p className="text-2xl font-bold">
              ৳{meta?.averageDuePerUser.toFixed(2) || "0.00"}
            </p>
          </CardBody>
        </Card>
        <Card className="shadow-md rounded-xl">
          <CardBody>
            <p className="text-sm text-gray-500">Max Due User</p>
            <p className="text-lg font-semibold">
              {meta?.maxDueUser?.name || "N/A"}
            </p>
            <p className="text-xl font-bold text-red-500">
              ৳{meta?.maxDueUser?.totalDue.toFixed(2) || "0.00"}
            </p>
          </CardBody>
        </Card>
      </div>

      {/* User Due Table */}
      <Card className="shadow-lg rounded-xl">
        <CardBody>
          <h2 className="text-xl font-semibold mb-4">User-wise Due Payments</h2>
          <Table aria-label="Due Payments Table">
            <TableHeader>
              <TableColumn>User</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Role</TableColumn>
              <TableColumn>Total Due</TableColumn>
              <TableColumn>Due Count</TableColumn>
              <TableColumn>Last Due Date</TableColumn>
              <TableColumn>Oldest Due Date</TableColumn>
              <TableColumn>Max Single Due</TableColumn>
            </TableHeader>
            <TableBody>
              {users?.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell className="text-red-500 font-semibold">
                    ৳{u.totalDue}
                  </TableCell>
                  <TableCell>{u.dueCount}</TableCell>
                  <TableCell>
                    {u.lastDueDate
                      ? new Date(u.lastDueDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {u.oldestDueDate
                      ? new Date(u.oldestDueDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>৳{u.maxSingleDue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
