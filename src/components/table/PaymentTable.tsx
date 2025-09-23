// "use client";

// import { useState, useMemo } from "react";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@heroui/table";
// import { Input } from "@heroui/input";
// import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@heroui/react";
// import { Card, CardBody } from "@heroui/card";

// interface ProductItem {
//   id: string;
//   name: string;
//   price: number;
// }

// interface OrderItem {
//   id: string;
//   productId: string;
//   quantity: number;
//   price: number;
//   product: ProductItem;
// }

// interface Order {
//   id: string;
//   total: number;
//   isPaid: boolean;
//   items: OrderItem[];
//   createdAt: string;
// }

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
// }

// interface Payment {
//   id: string;
//   transactionId: string;
//   amount: number;
//   method: string;
//   isDue: boolean;
//   createdAt: string;
//   user: User;
//   order: Order;
// }

// interface PaymentTableProps {
//   payments: Payment[];
// }

// const PaymentTable: React.FC<PaymentTableProps> = ({ payments }) => {
//   const [search, setSearch] = useState("");

//   const filteredPayments = useMemo(() => {
//     if (!search) return payments;
//     return payments.filter(
//       (p) =>
//         p.transactionId.toLowerCase().includes(search.toLowerCase()) ||
//         p.user.email.toLowerCase().includes(search.toLowerCase())||
//         p.user.name.toLowerCase().includes(search.toLowerCase())
//     );
//   }, [search, payments]);

//   return (
//     <div className="p-4">
//       {/* Search */}
//       <div className="mb-4 w-full max-w-sm">
//         <Input
//           placeholder="Search by Transaction ID and Name or Customer Email"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Payment Table */}
//       <Table>
//         <TableHeader>
//           <TableColumn>Transaction ID</TableColumn>
//           <TableColumn>Name</TableColumn>
//           <TableColumn>Email</TableColumn>
//           <TableColumn>Role</TableColumn>
//           <TableColumn>Amount</TableColumn>
//           <TableColumn>Status</TableColumn>
//           <TableColumn>Products</TableColumn>
//           <TableColumn>Date</TableColumn>
//         </TableHeader>

//         <TableBody>
//           {filteredPayments?.map((payment) => (
//             <TableRow key={payment.id}>
//               <TableCell>{payment.transactionId}</TableCell>
//               <TableCell>{payment.user.name}</TableCell>
//               <TableCell>{payment.user.email}</TableCell>
//               <TableCell>{payment.user.role}</TableCell>
//               <TableCell>${payment.amount.toFixed(2)}</TableCell>
//               <TableCell>{payment.isDue ? "Due" : "Paid"}</TableCell>

//               {/* Products Dropdown */}
//               <TableCell>
//                 <Dropdown placement="bottom" className="overflow-scroll" >
//                   <DropdownTrigger>
//                     <Button size="sm">View Products ({payment.order.items.length})</Button>
//                   </DropdownTrigger>
//                   <DropdownMenu closeOnSelect={false} aria-label="Products" color="default" variant="flat">
//                     <DropdownSection title="Order Items">
//                       {payment.order.items.map((item) => (
//                         <DropdownItem key={item.id} className="p-2">
//                           <div className="w-full p-2">
//                             <div className="">
//                               <span className="font-semibold">{item.product.name}</span>
//                               <span> Qty: {item.quantity}</span>
//                               <span> Price: ${item.price.toFixed(2)}</span>
//                             </div>
//                           </div>
//                         </DropdownItem>
//                       ))}
//                     </DropdownSection>
//                   </DropdownMenu>
//                 </Dropdown>
//               </TableCell>

//               <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default PaymentTable;


'use client';

import { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Input } from "@heroui/input";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@heroui/react";
import { FiShoppingCart, FiDollarSign, FiUser, FiClock } from "react-icons/fi";

interface ProductItem {
  id: string;
  name: string;
  price: number;
}

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: ProductItem;
}

interface Order {
  id: string;
  total: number;
  isPaid: boolean;
  items: OrderItem[];
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Payment {
  id: string;
  transactionId: string;
  amount: number;
  method: string;
  isDue: boolean;
  createdAt: string;
  user: User;
  order: Order;
  due:{
    amount:number
  }
}

interface PaymentTableProps {
  payments: Payment[];
}

const PaymentTable: React.FC<PaymentTableProps> = ({ payments }) => {
  const [search, setSearch] = useState("");

  const filteredPayments = useMemo(() => {
    if (!search) return payments;
    return payments.filter(
      (p) =>
        p.transactionId.toLowerCase().includes(search.toLowerCase()) ||
        p.user.email.toLowerCase().includes(search.toLowerCase()) ||
        p.user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, payments]);

  return (
    <div className="p-4">
      {/* Search */}
      <div className="mb-4 w-full max-w-sm">
        <Input
          placeholder="Search by Transaction ID, Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Payment Table */}
     <div className=" w-full overflow-x-auto">
         <Table className="">
        <TableHeader>
          <TableColumn><FiDollarSign className="inline mr-1 text-amber-500" /> Transaction ID</TableColumn>
          <TableColumn><FiUser className="inline mr-1 text-amber-500" /> Name</TableColumn>
          <TableColumn><FiUser className="inline mr-1 text-amber-500" /> Email</TableColumn>
          <TableColumn><FiUser className="inline mr-1 text-amber-500" /> Role</TableColumn>
          <TableColumn><FiDollarSign className="inline mr-1 text-amber-500" /> Amount</TableColumn>
          <TableColumn><FiDollarSign className="inline mr-1 text-amber-500" /> Due Amount</TableColumn>
          <TableColumn><FiClock className="inline mr-1 text-amber-500" /> Status</TableColumn>
          <TableColumn><FiShoppingCart className="inline mr-1 text-amber-500" /> Products</TableColumn>
          <TableColumn><FiClock className="inline mr-1 text-amber-500" /> Date</TableColumn>
        </TableHeader>

        <TableBody>
          {filteredPayments?.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.transactionId}</TableCell>
              <TableCell>{payment.user.name}</TableCell>
              <TableCell>{payment.user.email}</TableCell>
              <TableCell>{payment.user.role}</TableCell>
              <TableCell>${payment.amount.toFixed(2)}</TableCell>
              <TableCell>${payment?.due?.amount.toFixed(2)}</TableCell>
              <TableCell>{payment.isDue ? "Due" : "Paid"}</TableCell>

              {/* Products Dropdown */}
              <TableCell>
                <Dropdown placement="bottom" className="overflow-scroll">
                  <DropdownTrigger>
                    <Button size="sm" color="warning" variant="flat" className="text-amber-500">
                      View Products ({payment.order.items.length})
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu closeOnSelect={false} aria-label="Products" color="default" variant="flat">
                    <DropdownSection title="Order Items">
                      {payment.order.items.map((item) => (
                        <DropdownItem key={item.id} className="p-2 text-amber-500">
                          <div className="flex justify-between w-full p-2">
                            <span className="font-semibold">{item.product.name}</span>
                            <span>Qty: {item.quantity}</span>
                            <span>Price: ${item.price.toFixed(2)}</span>
                          </div>
                        </DropdownItem>
                      ))}
                    </DropdownSection>
                  </DropdownMenu>
                </Dropdown>
              </TableCell>

              <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     </div>
    </div>
  );
};

export default PaymentTable;
