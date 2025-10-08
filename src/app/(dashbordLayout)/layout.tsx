// "use client";
// import { useState } from "react";

// import Sidebar from "@/src/components/sitebar";

// const AdminLayout = ({ children }: { children: React.ReactNode }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <div className="flex container mx-auto mt-2">
//       {/* Sidebar */}
//       <div
//         className={`transition-all duration-300 ${
//           sidebarOpen ? "w-64" : "w-16"
//         }`}
//       >
//         <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-4">{children}</div>
//     </div>
//   );
// };

// export default AdminLayout;

// ✅ AdminLayout (update this)
"use client";
import { useState } from "react";

import Sidebar from "@/src/components/sitebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex w-full min-h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <Sidebar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      </div>

      {/* ✅ Main Content scrollable + responsive */}
      <div className="flex-1 overflow-x-auto overflow-y-auto p-4">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
