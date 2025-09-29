"use client";

import React, { useState } from "react";

import {
  useGetAllTasks,
  useUpdateDelivaryStatus,
} from "@/src/hooks/delivary.hook";

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
  const [activeTab, setActiveTab] = useState<
    "TODAY" | "ALL" | "PENDING" | "COMPLETED"
  >("TODAY");

  // ✅ Query for tasks
  const { data, isLoading, refetch } = useGetAllTasks(activeTab === "TODAY");

  // ✅ Mutation hook
  const { mutate: updateStatusMutation, isPending: isUpdating } =
    useUpdateDelivaryStatus();

  const tasks: Task[] = data?.data || [];

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "ALL" || activeTab === "TODAY") return true;
    if (activeTab === "PENDING")
      return task.latestStatus === "PENDING" || task.latestStatus === "SHIPPED";
    if (activeTab === "COMPLETED") return task.latestStatus === "DELIVERED";

    return true;
  });

  const updateStatus = (
    orderId: string,
    status: "SHIPPED" | "DELIVERED" | "CANCELLED",
  ) => {
    console.log([orderId, status]);
    updateStatusMutation({ orderId, status, note: "" });
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
            className={`px-4 py-2 -mb-px font-medium text-sm border-b-2 transition-colors ${
              activeTab === tab
                ? "border-amber-500 text-amber-600"
                : "border-transparent text-gray-600 hover:text-amber-500 hover:border-amber-300"
            }`}
            onClick={() => setActiveTab(tab as any)}
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
              className="text-amber-500 underline"
              href={`https://www.google.com/maps/search/?api=1&query=${task.lat},${task.lng}`}
              rel="noreferrer"
              target="_blank"
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
                  className="bg-amber-500 text-white px-3 py-1 rounded-lg hover:bg-amber-600 disabled:opacity-50"
                  disabled={isUpdating}
                  onClick={() => updateStatus(task.orderId, "SHIPPED")}
                >
                  Mark Picked
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 disabled:opacity-50"
                  disabled={isUpdating}
                  onClick={() => updateStatus(task.orderId, "CANCELLED")}
                >
                  Cancel
                </button>
              </>
            )}
            {task.latestStatus === "SHIPPED" && (
              <button
                className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 disabled:opacity-50"
                disabled={isUpdating}
                onClick={() => updateStatus(task.orderId, "DELIVERED")}
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
