// "use client";

// import React, { useState } from "react";
// import { Button } from "@heroui/button";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@heroui/table";
// import { Card, CardHeader } from "@heroui/card";
// import { Chip } from "@heroui/chip";
// import { Spinner } from "@heroui/spinner";
// import { Pagination } from "@heroui/pagination";
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
// import { useUser } from "@/src/context/User.context";
// import { useGetMyAllPayments } from "@/src/hooks/payment.hook";

// type Payment = {
//   id: string;
//   transactionId: string;
//   amount: number;
//   method: string;
//   isDue: boolean;
//   due?: {
//     amount: number;
//     paid: boolean;
//   };
//   status: "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
//   createdAt: string;
//   updatedAt: string;
//   description?: string;
// };

// export default function CustomerPaymentsPage() {
//   const { user } = useUser();
//   const [page, setPage] = useState<number>(1);
//   const [limit, setLimit] = useState<number>(10);
//   const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

//   const { data, isLoading, isError, refetch } = useGetMyAllPayments({
//     page,
//     limit,
//   });

//   const payments: Payment[] = data?.data ?? [];
//   const meta = data?.meta ?? { total: 0, page, limit };

//   // ✅ মোট Due হিসাব
//   const totalDue = payments
//     .filter((p) => p.isDue && p.due)
//     .reduce((sum, p) => sum + (p.due?.amount || 0), 0);

//   if (!user) {
//     return (
//       <Card className="p-6">
//         <CardHeader className="bg-amber-500 text-white rounded-t-2xl px-6 py-4">
//           <h2 className="text-lg font-bold">My Payments</h2>
//         </CardHeader>
//         <div className="p-6">Please login to view your payments.</div>
//       </Card>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <Card>
//         {/* Header */}
//         <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-amber-500 text-white rounded-t-2xl px-6 py-4">
//           <div>
//             <h1 className="text-2xl font-bold">My Payments</h1>
//             <p className="text-sm opacity-90">Track your payment history here.</p>
//           </div>
//         </CardHeader>

//         {/* ✅ Total Due Summary */}
//         {totalDue > 0 && (
//           <div className="px-6 py-3 bg-red-50 border-b border-red-200 text-red-700 font-semibold">
//             💰 Total Due Amount: ${totalDue.toFixed(2)}
//           </div>
//         )}

//         {/* Table */}
//         <div className="p-4">
//           {isLoading ? (
//             <div className="flex justify-center py-10">
//               <Spinner size="lg" />
//             </div>
//           ) : isError ? (
//             <div className="text-red-600 p-4">Failed to load payments. Please try again.</div>
//           ) : payments.length === 0 ? (
//             <div className="p-6 text-center text-gray-600">No payments found.</div>
//           ) : (
//             <>
//               <Table
//                 aria-label="My Payments"
//                 removeWrapper
//                 className="border border-amber-200 rounded-xl shadow-md overflow-x-auto"
//               >
//                 <TableHeader>
//                   <TableColumn>Transaction ID</TableColumn>
//                   <TableColumn>Amount</TableColumn>
//                   <TableColumn>Method</TableColumn>
//                   <TableColumn>Status</TableColumn>
//                   <TableColumn>Due Amount</TableColumn>
//                   <TableColumn>Date</TableColumn>
//                   <TableColumn>Action</TableColumn>
//                 </TableHeader>

//                 <TableBody>
//                   {payments.map((p) => (
//                     <TableRow key={p.id}>
//                       <TableCell className="font-mono">{p.transactionId}</TableCell>
//                       <TableCell className="font-semibold">${p.amount.toFixed(2)}</TableCell>
//                       <TableCell>{p.method}</TableCell>
//                       <TableCell>
//                         <Chip
//                           size="sm"
//                           color={
//                             p.status === "SUCCESS"
//                               ? "success"
//                               : p.status === "FAILED"
//                               ? "danger"
//                               : p.status === "REFUNDED"
//                               ? "primary"
//                               : "warning"
//                           }
//                         >
//                           {p.status}
//                         </Chip>
//                       </TableCell>
//                       {/* ✅ Row-wise Due Amount */}
//                       <TableCell>
//                         {p.isDue && p.due ? (
//                           <Chip color="danger" size="sm">
//                             ${p.due.amount.toFixed(2)}
//                           </Chip>
//                         ) : (
//                           "-"
//                         )}
//                       </TableCell>
//                       <TableCell>{new Date(p.createdAt).toLocaleDateString()}</TableCell>
//                       <TableCell>
//                         {p.isDue && p.due ? (
//                           <Button
//                             size="sm"
//                             color="danger"
//                             onPress={() => alert(`Paying due: $${p.due?.amount}`)}
//                           >
//                             Pay Now
//                           </Button>
//                         ) : (
//                           <Button
//                             size="sm"
//                             color="primary"
//                             onPress={() => setSelectedPayment(p)}
//                           >
//                             View Details
//                           </Button>
//                         )}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>

//               {/* Pagination + Limit Selector */}
//               <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4">
//                 <div className="flex items-center gap-2 text-gray-700">
//                   <span className="font-medium">Items per page:</span>
//                   <select
//                     value={limit}
//                     onChange={(e) => {
//                       setLimit(parseInt(e.target.value));
//                       setPage(1);
//                       setTimeout(() => refetch(), 0);
//                     }}
//                     className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
//                   >
//                     <option value={5}>5</option>
//                     <option value={10}>10</option>
//                     <option value={20}>20</option>
//                   </select>
//                 </div>

//                 <Pagination
//                   page={meta.page}
//                   total={Math.max(1, Math.ceil(meta.total / limit))}
//                   onChange={(p) => {
//                     setPage(p);
//                     setTimeout(() => refetch(), 0);
//                   }}
//                   className="bg-white rounded-lg shadow px-4 py-2"
//                   prevLabel="«"
//                   nextLabel="»"
//                 />
//               </div>
//             </>
//           )}
//         </div>
//       </Card>

//       {/* Modal for Payment Details */}
//       <Modal
//         isOpen={!!selectedPayment}
//         onOpenChange={() => setSelectedPayment(null)}
//         size="lg"
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="font-bold text-lg">
//                 Payment Details
//               </ModalHeader>
//               <ModalBody className="space-y-4">
//                 {selectedPayment && (
//                   <div className="space-y-2">
//                     <p>
//                       <strong>Transaction ID:</strong>{" "}
//                       <span className="font-mono">{selectedPayment.transactionId}</span>
//                     </p>
//                     <p>
//                       <strong>Amount:</strong> ${selectedPayment.amount.toFixed(2)}
//                     </p>
//                     <p>
//                       <strong>Method:</strong> {selectedPayment.method}
//                     </p>
//                     <p>
//                       <strong>Status:</strong>{" "}
//                       <Chip
//                         size="sm"
//                         color={
//                           selectedPayment.status === "SUCCESS"
//                             ? "success"
//                             : selectedPayment.status === "FAILED"
//                             ? "danger"
//                             : selectedPayment.status === "REFUNDED"
//                             ? "primary"
//                             : "warning"
//                         }
//                       >
//                         {selectedPayment.status}
//                       </Chip>
//                     </p>
//                     {selectedPayment.isDue && selectedPayment.due && (
//                       <p>
//                         <strong>Due Amount:</strong> ${selectedPayment.due.amount.toFixed(2)}
//                       </p>
//                     )}
//                     <p>
//                       <strong>Created At:</strong>{" "}
//                       {new Date(selectedPayment.createdAt).toLocaleString()}
//                     </p>
//                     <p>
//                       <strong>Last Updated:</strong>{" "}
//                       {new Date(selectedPayment.updatedAt).toLocaleString()}
//                     </p>
//                     {selectedPayment.description && (
//                       <p>
//                         <strong>Description:</strong>{" "}
//                         {selectedPayment.description}
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </ModalBody>
//               <ModalFooter>
//                 <Button color="danger" variant="light" onPress={onClose}>
//                   Close
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useMemo } from "react";
// import { Button } from "@heroui/button";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@heroui/table";
// import { Card, CardHeader } from "@heroui/card";
// import { Chip } from "@heroui/chip";
// import { Spinner } from "@heroui/spinner";
// import { Pagination } from "@heroui/pagination";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from "@heroui/modal";
// import { useUser } from "@/src/context/User.context";
// import { useGetMyAllPayments } from "@/src/hooks/payment.hook";

// // --- Payment Typings ---
// type Payment = {
//   id: string;
//   transactionId: string;
//   amount: number;
//   method: string;
//   isDue: boolean;
//   due:{

//     amount: number;
//   };
//   createdAt: string;
//   updatedAt: string;
//   order?: {
//     id: string;
//     total: number;
//     status: string;
//     items: {
//       id: string;
//       quantity: number;
//       price: number;
//       product: {
//         id: string;
//         name: string;
//         price: number;
//       };
//     }[];
//   };
// };

// // --- Tabs Config ---
// const TABS = [
//   { key: "ALL", label: "All" },
//   { key: "PAID", label: "Paid" },
//   { key: "DUE", label: "Due" },
// ];

// export default function CustomerPaymentsPage() {
//   const { user } = useUser();
//   const [page, setPage] = useState<number>(1);
//   const [limit, setLimit] = useState<number>(10);
//   const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
//   const [activeTab, setActiveTab] = useState<string>("ALL");

//   const query =
//     activeTab === "ALL"
//       ? { page, limit }
//       : activeTab === "PAID"
//       ? { isDue: false, page, limit }
//       : { isDue: true, page, limit };

//   const { data, isLoading, isError, refetch } = useGetMyAllPayments(query);

//   const payments: Payment[] = data?.data ?? [];
//   const meta = data?.meta ?? { total: 0, page, limit };

//   // --- Summary Stats ---
//   const { totalPaid, totalDue, totalDueAmount } = useMemo(() => {
//     let paid = 0;
//     let due = 0;
//     let dueAmount = 0;

//     payments.forEach((p) => {
//       if (p.isDue) {
//         due++;
//         dueAmount += p.amount;
//       } else {
//         paid++;
//       }
//     });

//     return { totalPaid: paid, totalDue: due, totalDueAmount: dueAmount };
//   }, [payments]);

//   if (!user) {
//     return (
//       <Card className="p-6">
//         <CardHeader className="bg-amber-500 text-white rounded-t-2xl px-6 py-4">
//           <h2 className="text-lg font-bold">My Payments</h2>
//         </CardHeader>
//         <div className="p-6">Please login to view your payments.</div>
//       </Card>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <Card>
//         {/* Header */}
//         <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-amber-500 text-white rounded-t-2xl px-6 py-4">
//           <div>
//             <h1 className="text-2xl font-bold">My Payments</h1>
//             <p className="text-sm opacity-90">
//               Track your payment history here.
//             </p>
//           </div>

//           {/* Tabs */}
//           <div className="flex gap-2">
//             {TABS.map((tab) => (
//               <button
//                 key={tab.key}
//                 onClick={() => {
//                   setActiveTab(tab.key);
//                   setPage(1);
//                   setTimeout(() => refetch(), 0);
//                 }}
//                 className={`px-3 py-1 rounded-md font-medium ${
//                   activeTab === tab.key
//                     ? "bg-white text-amber-600"
//                     : "bg-white/20 text-white hover:bg-white/30"
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//         </CardHeader>

//         {/* Summary Section */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 py-4 border-b">
//           <div className="bg-green-50 text-green-700 rounded-lg p-4 shadow-sm">
//             <h3 className="text-sm font-medium">Total Paid</h3>
//             <p className="text-xl font-bold">{totalPaid}</p>
//           </div>
//           <div className="bg-red-50 text-red-700 rounded-lg p-4 shadow-sm">
//             <h3 className="text-sm font-medium">Total Due</h3>
//             <p className="text-xl font-bold">{totalDue}</p>
//           </div>
//           <div className="bg-amber-50 text-amber-700 rounded-lg p-4 shadow-sm">
//             <h3 className="text-sm font-medium">Due Amount</h3>
//             <p className="text-xl font-bold">${totalDueAmount.toFixed(2)}</p>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="p-4">
//           {isLoading ? (
//             <div className="flex justify-center py-10">
//               <Spinner size="lg" />
//             </div>
//           ) : isError ? (
//             <div className="text-red-600 p-4">
//               Failed to load payments. Please try again.
//             </div>
//           ) : payments.length === 0 ? (
//             <div className="p-6 text-center text-gray-600">
//               No payments found.
//             </div>
//           ) : (
//             <>
//               <Table
//                 aria-label="My Payments"
//                 removeWrapper
//                 className="border border-amber-200 rounded-xl shadow-md overflow-x-auto"
//               >
//                 <TableHeader>
//                   <TableColumn>Transaction ID</TableColumn>
//                   <TableColumn>Amount</TableColumn>
//                   <TableColumn>Method</TableColumn>
//                   <TableColumn>Status</TableColumn>
//                   <TableColumn>Due</TableColumn>
//                   <TableColumn>Due Amount</TableColumn>
//                   <TableColumn>Date</TableColumn>
//                   <TableColumn>Action</TableColumn>
//                 </TableHeader>

//                 <TableBody>
//                   {payments.map((p) => (
//                     <TableRow key={p.id}>
//                       <TableCell className="font-mono">
//                         {p.transactionId}
//                       </TableCell>
//                       <TableCell className="font-semibold">
//                         ${p.amount.toFixed(2)}
//                       </TableCell>
//                       <TableCell>{p.method || "-"}</TableCell>
//                       <TableCell>
//                         <Chip
//                           size="sm"
//                           color={p.isDue ? "warning" : "success"}
//                         >
//                           {p.isDue ? "UNPAID" : "PAID"}
//                         </Chip>
//                       </TableCell>
//                       <TableCell>
//                         {p.isDue ? (
//                           <Chip color="danger" size="sm">
//                             Due
//                           </Chip>
//                         ) : (
//                           <Chip color="success" size="sm">
//                             Paid
//                           </Chip>
//                         )}
//                       </TableCell>
//                        <TableCell>
//                     {p.due ? `$${p.due.amount.toFixed(2)}` : "-"}
//                     </TableCell>
//                       <TableCell>
//                         {new Date(p.createdAt).toLocaleDateString()}
//                       </TableCell>
//                       <TableCell className="flex gap-2">
//                         <Button
//                           size="sm"
//                           color="primary"
//                           onPress={() => setSelectedPayment(p)}
//                         >
//                           View
//                         </Button>

//                         {p.isDue && (
//   <Button
//     size="sm"
//     className="bg-amber-500 text-white hover:bg-amber-600"
//     onPress={() => {
//       fetch("http://localhost:5000/api/v1/payment/initiate-due", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ paymentId: p.id }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log("Frontend fetch response:", data); // ✅ এখানে payment_url দেখাবে
//           if (data?.payment_url) {
//             window.location.href = data.payment_url; // AmarPay পেইজে redirect
//           } else {
//             alert("Something went wrong!");
//           }
//         })
//         .catch(() => alert("Payment failed!"));
//     }}
//   >
//     Pay Now
//   </Button>
// )}

//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>

//               {/* Pagination + Limit Selector */}
//               <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4">
//                 <div className="flex items-center gap-2 text-gray-700">
//                   <span className="font-medium">Items per page:</span>
//                   <select
//                     value={limit}
//                     onChange={(e) => {
//                       setLimit(parseInt(e.target.value));
//                       setPage(1);
//                       setTimeout(() => refetch(), 0);
//                     }}
//                     className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
//                   >
//                     <option value={5}>5</option>
//                     <option value={10}>10</option>
//                     <option value={20}>20</option>
//                   </select>
//                 </div>

//                 <Pagination
//                   page={meta.page}
//                   total={Math.max(1, Math.ceil(meta.total / limit))}
//                   onChange={(p) => {
//                     setPage(p);
//                     setTimeout(() => refetch(), 0);
//                   }}
//                   className="bg-white rounded-lg shadow px-4 py-2"
//                   prevLabel="«"
//                   nextLabel="»"
//                 />
//               </div>
//             </>
//           )}
//         </div>
//       </Card>

//       {/* Modal for Payment Details */}
//       <Modal
//         isOpen={!!selectedPayment}
//         onOpenChange={() => setSelectedPayment(null)}
//         size="lg"
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="font-bold text-lg">
//                 Payment Details
//               </ModalHeader>
//               <ModalBody className="space-y-4">
//                 {selectedPayment && (
//                   <div className="space-y-2">
//                     <p>
//                       <strong>Transaction ID:</strong>{" "}
//                       {selectedPayment.transactionId}
//                     </p>
//                     <p>
//                       <strong>Amount:</strong> $
//                       {selectedPayment.amount.toFixed(2)}
//                     </p>
//                     <p>
//                       <strong>Method:</strong>{" "}
//                       {selectedPayment.method || "-"}
//                     </p>
//                     <p>
//                       <strong>Status:</strong>{" "}
//                       {selectedPayment.isDue ? "Due" : "Paid"}
//                     </p>
//                     <p>
//                       <strong>Created:</strong>{" "}
//                       {new Date(selectedPayment.createdAt).toLocaleString()}
//                     </p>

//                     {/* Show Order Items if available */}
//                     {selectedPayment.order && (
//                       <div className="mt-4">
//                         <h3 className="font-semibold">Order Items:</h3>
//                         <ul className="list-disc list-inside space-y-1">
//                           {selectedPayment.order.items.map((item) => (
//                             <li key={item.id}>
//                               {item.product.name} × {item.quantity} = $
//                               {(item.price * item.quantity).toFixed(2)}
//                             </li>
//                           ))}
//                         </ul>
//                         <p className="mt-2 font-bold">
//                           Order Total: ${selectedPayment.order.total}
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </ModalBody>
//               <ModalFooter>
//                 {selectedPayment?.isDue && (
//                   <Button
//                     className="bg-amber-500 text-white"
//                     onPress={() =>
//                       alert(
//                         `Proceed to pay for ${selectedPayment.transactionId}`
//                       )
//                     }
//                   >
//                     Pay Now
//                   </Button>
//                 )}
//                 <Button color="danger" variant="light" onPress={onClose}>
//                   Close
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }

"use client";

import React, { useState, useMemo } from "react";
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
import { Spinner } from "@heroui/spinner";
import { Pagination } from "@heroui/pagination";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

import { useUser } from "@/src/context/User.context";
import { useGetMyAllPayments } from "@/src/hooks/payment.hook";

// --- Payment Typings ---
type Payment = {
  id: string;
  transactionId: string;
  amount: number;
  method: string;
  createdAt: string;
  updatedAt: string;
  order?: {
    id: string;
    total: number;
    status: string;
    items: {
      id: string;
      quantity: number;
      price: number;
      product: { id: string; name: string; price: number };
    }[];
  };
};

export default function CustomerPaymentsPage() {
  const { user } = useUser();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const { data, isLoading, isError, refetch } = useGetMyAllPayments({
    page,
    limit,
  });

  const payments: Payment[] = data?.data ?? [];
  const meta = data?.meta ?? { total: 0, page, limit };

  console.log(payments);
  // --- Summary Stats (শুধু Total Paid Count) ---
  const totalPaid = useMemo(() => payments.length, [payments]);

  if (!user) {
    return (
      <Card className="p-6">
        <CardHeader className="bg-amber-500 text-white rounded-t-2xl px-6 py-4">
          <h2 className="text-lg font-bold">My Payments</h2>
        </CardHeader>
        <div className="p-6">Please login to view your payments.</div>
      </Card>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Card>
        {/* Header */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-amber-500 text-white rounded-t-2xl px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold">My Payments</h1>
            <p className="text-sm opacity-90">
              Track your payment history here.
            </p>
          </div>
          <div className="bg-green-50 text-green-700 rounded-lg px-4 py-2 shadow-sm">
            <h3 className="text-sm font-medium">Total Payments</h3>
            <p className="text-xl font-bold">{totalPaid}</p>
          </div>
        </CardHeader>

        {/* Table */}
        <div className="p-4">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Spinner size="lg" />
            </div>
          ) : isError ? (
            <div className="text-red-600 p-4">
              Failed to load payments. Please try again.
            </div>
          ) : payments.length === 0 ? (
            <div className="p-6 text-center text-gray-600">
              No payments found.
            </div>
          ) : (
            <>
              <Table
                removeWrapper
                aria-label="My Payments"
                className="border border-amber-200 rounded-xl shadow-md overflow-x-auto"
              >
                <TableHeader>
                  <TableColumn>Transaction ID</TableColumn>
                  <TableColumn>Amount</TableColumn>
                  <TableColumn>Method</TableColumn>
                  <TableColumn>Date</TableColumn>
                  <TableColumn>Action</TableColumn>
                </TableHeader>

                <TableBody>
                  {payments.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-mono">
                        {p.transactionId}
                      </TableCell>
                      <TableCell className="font-semibold">
                        ${p.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>{p.method || "-"}</TableCell>
                      <TableCell>
                        {new Date(p.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          color="primary"
                          size="sm"
                          onPress={() => setSelectedPayment(p)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="font-medium">Items per page:</span>
                  <select
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    value={limit}
                    onChange={(e) => {
                      setLimit(parseInt(e.target.value));
                      setPage(1);
                      setTimeout(() => refetch(), 0);
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>

                <Pagination
                  showControls
                  className="bg-white rounded-lg shadow px-4 py-2"
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

      {/* Modal for Payment Details */}
      <Modal
        isOpen={!!selectedPayment}
        size="lg"
        onOpenChange={() => setSelectedPayment(null)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="font-bold text-lg">
                Payment Details
              </ModalHeader>
              <ModalBody className="space-y-4">
                {selectedPayment && (
                  <div className="space-y-2">
                    <p>
                      <strong>Transaction ID:</strong>{" "}
                      {selectedPayment.transactionId}
                    </p>
                    <p>
                      <strong>Amount:</strong> $
                      {selectedPayment.amount.toFixed(2)}
                    </p>
                    <p>
                      <strong>Method:</strong> {selectedPayment.method || "-"}
                    </p>
                    <p>
                      <strong>Created:</strong>{" "}
                      {new Date(selectedPayment.createdAt).toLocaleString()}
                    </p>

                    {/* Order Items if available */}
                    {selectedPayment.order && (
                      <div className="mt-4">
                        <h3 className="font-semibold">Order Items:</h3>
                        <ul className="list-disc list-inside space-y-1">
                          {selectedPayment.order.items.map((item) => (
                            <li key={item.id}>
                              {item.product.name} × {item.quantity} = $
                              {(item.price * item.quantity).toFixed(2)}
                            </li>
                          ))}
                        </ul>
                        <p className="mt-2 font-bold">
                          Order Total: ${selectedPayment.order.total}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
