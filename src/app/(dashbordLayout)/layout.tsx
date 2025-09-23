"use client";
import { useState } from "react";
import Sidebar from "@/src/components/sitebar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex container mx-auto mt-2">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default AdminLayout;
