"use client";

import { useGetAllTasks, useupdateDelivaryStatus } from "@/src/hooks/delivary.hook";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

type Task = {
  id: string;
  orderId: string;
  customerName: string;
  address: string;
  lat: number;
  lng: number;
  latestStatus: "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
};

export default function DeliveryTasks() {
  const [activeTab, setActiveTab] =
    useState<"TODAY" | "ALL" | "PENDING" | "COMPLETED">("TODAY");

  // ✅ Query for tasks
  const { data, isLoading, refetch } = useGetAllTasks(activeTab === "TODAY");

  // ✅ Mutation hook
  const { mutate: updateStatusMutation, isPending: isUpdating } =
    useupdateDelivaryStatus();

  const tasks: Task[] = data?.data || [];

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "ALL" || activeTab === "TODAY") return true;
    if (activeTab === "PENDING")
      return task.latestStatus === "PENDING" || task.latestStatus === "SHIPPED";
    if (activeTab === "COMPLETED") return task.latestStatus === "DELIVERED";
    return true;
  });

 
  const updateStatus = (orderId: string, status: "SHIPPED" | "DELIVERED" | "CANCELLED") => {
    console.log([orderId, status]);
    updateStatusMutation(
      { orderId, status, note: "" }, 
      
    );
  };

  if (isLoading) return <p className="text-center mt-10">Loading tasks...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold text-amber-600">Delivery Tasks</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        {["TODAY", "ALL", "PENDING", "COMPLETED"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 -mb-px font-medium text-sm border-b-2 transition-colors ${
              activeTab === tab
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-gray-600 hover:text-amber-500 hover:border-amber-300"
            }`}
          >
            {tab.charAt(0) + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No tasks found 🎉</p>
      )}

      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className="bg-white border border-amber-200 shadow rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h2 className="font-semibold text-lg">{task.customerName}</h2>
            <p className="text-gray-600">{task.address}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${task.lat},${task.lng}`}
              target="_blank"
              rel="noreferrer"
              className="text-amber-500 underline"
            >
              View on Map
            </a>
            <p className="mt-1 text-sm">
              Status:{" "}
              <span
                className={`font-medium ${
                  task.latestStatus === "DELIVERED"
                    ? "text-green-600"
                    : task.latestStatus === "SHIPPED"
                    ? "text-blue-600"
                    : task.latestStatus === "CANCELLED"
                    ? "text-red-600"
                    : "text-amber-700"
                }`}
              >
                {task.latestStatus}
              </span>
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            {task.latestStatus === "PENDING" && (
              <>
                <button
                  disabled={isUpdating}
                  onClick={() => updateStatus(task.orderId, "SHIPPED")}
                  className="bg-amber-500 text-white px-3 py-1 rounded-lg hover:bg-amber-600 disabled:opacity-50"
                >
                  Mark Picked
                </button>
                <button
                  disabled={isUpdating}
                  onClick={() => updateStatus(task.orderId, "CANCELLED")}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 disabled:opacity-50"
                >
                  Cancel
                </button>
              </>
            )}
            {task.latestStatus === "SHIPPED" && (
              <button
                disabled={isUpdating}
                onClick={() => updateStatus(task.orderId, "DELIVERED")}
                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 disabled:opacity-50"
              >
                Mark Delivered
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
