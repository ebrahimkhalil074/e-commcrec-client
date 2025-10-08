// "use client";

// import { useState } from "react";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@heroui/react";
// import { Input, Button, Chip } from "@heroui/react";
// import { FaSearch, FaCheckCircle, FaBan } from "react-icons/fa";

// import {
//   useApproveSellerRequest,
//   useGetAllSellerRequest,
// } from "@/src/hooks/user.hook";

// export default function SellerManagement() {
//   const { data: sellerReqData, isLoading } = useGetAllSellerRequest(undefined);
//   const sellerRequest = sellerReqData?.data ?? [];
//   console.log("Seller Request Data:", sellerRequest);

//   const { mutate: approveSellerRequest, isPending } = useApproveSellerRequest();
//   const [search, setSearch] = useState("");

//   const handleApprove = (id: string) => {
//     approveSellerRequest({ id, action: "APPROVE" });
//   };

//   const handleBlock = (id: string) => {
//     approveSellerRequest({ id, action: "BLOCK" });
//   };

//   const filteredSellers = sellerRequest.filter((seller: any) =>
//     seller.name?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-100">
//       {/* Header */}
//       <h1 className="text-3xl font-bold mb-6">
//         Seller <span className="text-amber-500">Management</span>
//       </h1>

//       {/* Search */}
//       <div className="mb-6 flex items-center gap-3">
//         <Input
//           className="max-w-sm"
//           placeholder="Search sellers by name..."
//           startContent={<FaSearch className="w-4 h-4 text-amber-500" />}
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Seller Table */}
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
//         <Table removeWrapper aria-label="Seller Management Table">
//           <TableHeader>
//             <TableColumn>Shop Name</TableColumn>
//             <TableColumn>Phone</TableColumn>
//             <TableColumn>Address</TableColumn>
//             <TableColumn>Status</TableColumn>
//             <TableColumn>Join Date</TableColumn>
//             <TableColumn>Actions</TableColumn>
//           </TableHeader>
//           <TableBody emptyContent="No sellers found." isLoading={isLoading}>
//             {filteredSellers.map((seller: any) => (
//               <TableRow key={seller.id}>
//                 <TableCell className="font-medium">
//                   {seller.Shop?.name ?? "N/A"}
//                 </TableCell>
//                 <TableCell>{seller.Shop?.phone ?? "N/A"}</TableCell>
//                 <TableCell>{seller.Shop?.address ?? "N/A"}</TableCell>
//                 <TableCell>
//                   <Chip
//                     color={
//                       seller.shopStatus === "APPROVED"
//                         ? "success"
//                         : seller.shopStatus === "BLOCKED"
//                         ? "danger"
//                         : "warning"
//                     }
//                     variant="flat"
//                   >
//                     {seller.shopStatus === "APPROVED"
//                       ? "Approved"
//                       : seller.shopStatus === "BLOCKED"
//                       ? "Blocked"
//                       : "Pending"}
//                   </Chip>
//                 </TableCell>
//                 <TableCell>
//                   {seller.Shop?.createdAt
//                     ? new Date(seller.Shop.createdAt).toLocaleDateString()
//                     : "N/A"}
//                 </TableCell>
//                 <TableCell className="flex gap-2">
//                   {seller.shopStatus !== "APPROVED" && (
//                     <Button
//                       className="bg-amber-500 text-white"
//                       isLoading={isPending}
//                       size="sm"
//                       startContent={<FaCheckCircle className="w-4 h-4" />}
//                       onPress={() => handleApprove(seller.id)}
//                     >
//                       Approve
//                     </Button>
//                   )}
//                   {seller.shopStatus !== "BLOCKED" && (
//                     <Button
//                       color="danger"
//                       isLoading={isPending}
//                       size="sm"
//                       startContent={<FaBan className="w-4 h-4" />}
//                       onPress={() => handleBlock(seller.id)}
//                     >
//                       Block
//                     </Button>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import {
  FiShoppingBag,
  FiPhone,
  FiMapPin,
  FiCheckCircle,
  FiCalendar,
  FiSettings,
} from "react-icons/fi";
import { Input, Button, Chip, Pagination } from "@heroui/react";
import { FaSearch, FaCheckCircle, FaBan } from "react-icons/fa";

import {
  useApproveSellerRequest,
  useGetAllSellerRequest,
} from "@/src/hooks/user.hook";
import { SkeletonTable } from "@/src/components/skeloton/SkelotonTable";

export default function SellerManagement() {
  const {
    data: sellerReqData,
    isLoading,
    isError,
    refetch,
  } = useGetAllSellerRequest(undefined);
  const sellerRequest = sellerReqData?.data ?? [];

  const { mutate: approveSellerRequest, isPending } = useApproveSellerRequest();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(8);

  const handleApprove = (id: string) => {
    approveSellerRequest({ id, action: "APPROVE" });
  };

  const handleBlock = (id: string) => {
    approveSellerRequest({ id, action: "BLOCK" });
  };

  const filteredSellers = sellerRequest.filter((seller: any) =>
    seller.Shop?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const meta = sellerReqData?.meta ?? { total: filteredSellers.length, page };

  return (
    <div className="min-h-screen p-6 space-y-6 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-amber-500 dark:bg-amber-600 text-white rounded-t-2xl px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold">Seller Management</h1>
            <p className="text-sm opacity-90">
              Approve or block seller requests here.
            </p>
          </div>

          {/* Search */}
          <Input
            className="max-w-sm text-gray-900 dark:text-gray-100"
            placeholder="Search sellers by name..."
            startContent={<FaSearch className="w-4 h-4 text-amber-500" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="p-4">
          {isLoading ? (
            <div>
              {/* <Spinner size="lg" /> */}
              <SkeletonTable cols={5} rows={5} />
            </div>
          ) : isError ? (
            <div className="text-red-600 dark:text-red-400 p-4">
              Failed to load sellers. Please try again.
            </div>
          ) : filteredSellers.length === 0 ? (
            <div className="p-6 text-center text-gray-600 dark:text-gray-300">
              No sellers found.
            </div>
          ) : (
            <>
              <Table
                removeWrapper
                aria-label="Seller Management Table"
                className="border border-amber-200 dark:border-gray-700 rounded-xl shadow-md overflow-x-auto"
              >
                <TableHeader>
                  <TableColumn>
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <FiShoppingBag className="text-amber-500 dark:text-amber-400" />
                      Shop Name
                    </div>
                  </TableColumn>

                  <TableColumn>
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <FiPhone className="text-amber-500 dark:text-amber-400" />
                      Phone
                    </div>
                  </TableColumn>

                  <TableColumn>
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <FiMapPin className="text-amber-500 dark:text-amber-400" />
                      Address
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
                      <FiCalendar className="text-amber-500 dark:text-amber-400" />
                      Join Date
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
                  {filteredSellers.map((seller: any) => (
                    <TableRow key={seller.id}>
                      <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                        {seller.Shop?.name ?? "N/A"}
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">
                        {seller.Shop?.phone ?? "N/A"}
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">
                        {seller.Shop?.address ?? "N/A"}
                      </TableCell>
                      <TableCell>
                        <Chip
                          color={
                            seller.shopStatus === "APPROVED"
                              ? "success"
                              : seller.shopStatus === "BLOCKED"
                                ? "danger"
                                : "warning"
                          }
                          size="sm"
                          variant="flat"
                        >
                          {seller.shopStatus === "APPROVED"
                            ? "Approved"
                            : seller.shopStatus === "BLOCKED"
                              ? "Blocked"
                              : "Pending"}
                        </Chip>
                      </TableCell>
                      <TableCell className="text-gray-700 dark:text-gray-300">
                        {seller.Shop?.createdAt
                          ? new Date(seller.Shop.createdAt).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                      <TableCell className="flex gap-2">
                        {seller.shopStatus !== "APPROVED" && (
                          <Button
                            className="bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700"
                            isLoading={isPending}
                            size="sm"
                            startContent={<FaCheckCircle className="w-4 h-4" />}
                            onPress={() => handleApprove(seller.id)}
                          >
                            Approve
                          </Button>
                        )}
                        {seller.shopStatus !== "BLOCKED" && (
                          <Button
                            className="border-amber-500 text-amber-600 dark:text-amber-400 dark:border-amber-500"
                            isLoading={isPending}
                            size="sm"
                            startContent={<FaBan className="w-4 h-4" />}
                            variant="bordered"
                            onPress={() => handleBlock(seller.id)}
                          >
                            Block
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
                {/* Items per page selector */}
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Items per page:</span>
                  <select
                    className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    value={limit}
                    onChange={(e) => {
                      setLimit(parseInt(e.target.value));
                      setPage(1);
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
                  className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-lg shadow-md px-4 py-2"
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
      </div>
    </div>
  );
}
