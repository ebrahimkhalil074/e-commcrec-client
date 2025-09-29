// import PaymentTable from "@/src/components/table/PaymentTable";

// const CompletedPaymentPage = async() => {
//   const res = await fetch("http://localhost:5000/api/v1/payment?isDue=false")
//   const CompletedPaymentData =await res.json()
//   const payments = CompletedPaymentData?.data ;
//   console.log(payments)
//   return (
//     <div>
//         <PaymentTable payments={payments} />
//     </div>
//   );
// };

// export default CompletedPaymentPage;

"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Spinner } from "@heroui/spinner";

export default function PaidPaymentsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/v1/payment/paid-summary",
        );
        const result = await res.json();

        setData(result);
      } catch (err) {
        console.error("Error fetching paid summary:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner label="Loading Paid Payments..." />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-100 shadow-md">
          <CardHeader>Total Users Paid</CardHeader>
          <CardBody className="text-2xl font-bold text-green-700">
            {data?.data.meta?.totalUsersPaid || 0}
          </CardBody>
        </Card>
        <Card className="bg-blue-100 shadow-md">
          <CardHeader>Grand Total Paid</CardHeader>
          <CardBody className="text-2xl font-bold text-blue-700">
            ৳{data?.data.meta?.grandTotalPaid?.toLocaleString() || 0}
          </CardBody>
        </Card>
        <Card className="bg-purple-100 shadow-md">
          <CardHeader>Most Recent Payment</CardHeader>
          <CardBody className="text-lg font-medium text-purple-700">
            {data?.data.meta?.mostRecentPaymentDate
              ? new Date(data.data.meta.mostRecentPaymentDate).toLocaleString()
              : "N/A"}
          </CardBody>
        </Card>
      </div>

      {/* Paid Payments Table */}
      <Card>
        <CardHeader className="text-lg font-semibold">
          Paid Payments (User-wise)
        </CardHeader>
        <CardBody>
          <Table aria-label="Paid Payments Table">
            <TableHeader>
              <TableColumn>User</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Total Paid</TableColumn>
              <TableColumn>Number of Payments</TableColumn>
              <TableColumn>Last Paid Date</TableColumn>
            </TableHeader>
            <TableBody>
              {data?.data.data.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>৳{user.totalPaid.toLocaleString()}</TableCell>
                  <TableCell>{user.numberOfPayments}</TableCell>
                  <TableCell>
                    {user.lastPaidDate
                      ? new Date(user.lastPaidDate).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
