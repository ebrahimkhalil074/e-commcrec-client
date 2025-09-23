// 'use client'
// import React from "react";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   User,
//   Chip,
//   Tooltip,
// } from "@heroui/react";
// import { DeleteIcon, EditIcon, EyeIcon } from "../icons";

// export const columns = [
//   {name: "NAME", uid: "name"},
//   {name: "ROLE", uid: "role"},
//   {name: "STATUS", uid: "status"},
//   {name: "ACTIONS", uid: "actions"},
// ];





// const statusColorMap = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };

// export default function AllUsersTable({user}) {
//   const renderCell = React.useCallback((user, columnKey) => {
//     const cellValue = user[columnKey];

//     switch (columnKey) {
//       case "name":
//         return (
//           <User
//             avatarProps={{radius: "lg", src: user.avatar}}
//             description={user.email}
//             name={cellValue}
//           >
//             {user.email}
//           </User>
//         );
//       case "role":
//         return (
//           <div className="flex flex-col">
//             <p className="text-bold text-sm capitalize">{cellValue}</p>
//             <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
//           </div>
//         );
//       case "status":
//         return (
//           <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
//             {cellValue}
//           </Chip>
//         );
//       case "actions":
//         return (
//           <div className="relative flex items-center gap-2">
//             <Tooltip content="Details">
//               <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
//                 <EyeIcon />
//               </span>
//             </Tooltip>
//             <Tooltip content="Edit user">
//               <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
//                 <EditIcon />
//               </span>
//             </Tooltip>
//             <Tooltip color="danger" content="Delete user">
//               <span className="text-lg text-danger cursor-pointer active:opacity-50">
//                 <DeleteIcon />
//               </span>
//             </Tooltip>
//           </div>
//         );
//       default:
//         return cellValue;
//     }
//   }, []);

//   return (
//     <Table aria-label="Example table with custom cells">
//       <TableHeader columns={columns}>
//         {(column) => (
//           <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
//             {column.name}
//           </TableColumn>
//         )}
//       </TableHeader>
//       <TableBody items={user}>
//         {(item) => (
//           <TableRow key={item.id}>
//             {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// }

'use client'
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
} from "@heroui/react";
import { FiEye, FiEdit, FiTrash2, FiUser, FiBriefcase, FiCheckCircle } from "react-icons/fi";
import clsx from "clsx";

export const columns = [
  { name: "NAME", uid: "name", icon: <FiUser className="inline mr-1" /> },
  { name: "ROLE", uid: "role", icon: <FiBriefcase className="inline mr-1" /> },
  { name: "STATUS", uid: "status", icon: <FiCheckCircle className="inline mr-1" /> },
  { name: "ACTIONS", uid: "actions", icon: <FiEye className="inline mr-1" /> },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function AllUsersTable({ user }) {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );

      case "role":
        return (
          <div className="flex flex-col">
            <p className="font-bold text-sm capitalize">{cellValue}</p>
            <p className="font-bold text-sm capitalize text-default-400">{user.team}</p>
          </div>
        );

      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );

      case "actions":
        return (
          <div className="flex items-center gap-2 justify-center">
            <Tooltip content="Details">
              <span className="text-lg text-amber-500 cursor-pointer hover:opacity-80">
                <FiEye />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-amber-500 cursor-pointer hover:opacity-80">
                <FiEdit />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-amber-500 cursor-pointer hover:opacity-80">
                <FiTrash2 />
              </span>
            </Tooltip>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Users Table with React Icons">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            <span className="flex items-center">
              {column.icon} {column.name}
            </span>
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={user}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
