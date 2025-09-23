"use client";

import React from "react";
import {
  Card, CardHeader, CardBody
} from "@heroui/react";
import {
  ResponsiveContainer,
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
  BarChart, Bar,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { useGetDelivaryOverviewData } from "@/src/hooks/dashboard.hook";
import StatCard from "@/src/components/card/StatCard";
import { FaShoppingCart } from "react-icons/fa";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A855F7"];

export default function DeliveryOverviewPage() {
  const { data: delivaryOverviewData, isError, isLoading, error } =
    useGetDelivaryOverviewData();

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError) return <p className="p-6 text-red-500">{(error as Error).message}</p>;

  // যদি API রেসপন্স nested থাকে যেমন { success:true, data:{ ... } }
  const apiData = delivaryOverviewData?.data;
  if (!apiData) return <p className="p-6 text-gray-500">No data found</p>;

  const { summary, weekStats, monthlyTrend, statusBreakdown, paymentMethods } = apiData;

  const summaryCards = [
    { label: "Total Tasks", value: summary.totalTasks },
    { label: "Completed", value: summary.completed },
    { label: "Pending", value: summary.pending },
    { label: "Cancelled", value: summary.cancelled },
    { label: "Avg Delivery (min)", value: summary.avgDeliveryMinutes },
    { label: "Earnings Today", value: `৳${summary.earningsToday}` },
    { label: "Cash Collected", value: `৳${summary.cashCollectedToday}` },
  ];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">Delivery Overview</h1>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <StatCard
          title="Total Tasks"
          value={summary.totalTasks}
          icon={<FaShoppingCart className="text-amber-500" />}
        />
        <StatCard
          title="Completed"
          value={summary.completed}
          icon={<FaShoppingCart className="text-amber-500" />}
        />
        <StatCard
          title="Pending"
          value={summary.pending}
          icon={<FaShoppingCart className="text-amber-500" />}
        />
        <StatCard
          title="Cancelled"
          value={summary.cancelled}
          icon={<FaShoppingCart className="text-amber-500" />}
        />
        <StatCard
          title="Avg Delivery (min)"
          value={summary.avgDeliveryMinutes}
          icon={<FaShoppingCart className="text-amber-500" />}
        />
        <StatCard
          title="Earnings Today"
          value={summary.earningsToday}
          icon={<FaShoppingCart className="text-amber-500" />}
        />
        <StatCard
          title="Cash Collected"
          value={summary.cashCollectedToday}
          icon={<FaShoppingCart className="text-amber-500" />}
        />
      </div>

      {/* Weekly Stats */}
      <Card className="shadow-md">
        <CardHeader>Weekly Stats (Completed vs Pending)</CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weekStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#4ade80" name="Completed" />
              <Bar dataKey="pending" fill="#f87171" name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      {/* Monthly Trend */}
      <Card className="shadow-md">
        <CardHeader>Monthly Trend (Completed Deliveries & Earnings)</CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="#3b82f6" name="Completed" />
              <Line type="monotone" dataKey="earnings" stroke="#f59e0b" name="Earnings" />
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      {/* Status Breakdown */}
      <Card className="shadow-md">
        <CardHeader>Status Breakdown</CardHeader>
        <CardBody className="flex justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusBreakdown}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statusBreakdown.map((entry, index) => (
                  <Cell key={entry.status} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      {/* Payment Methods */}
      <Card className="shadow-md">
        <CardHeader>Payment Methods (Amount & Count)</CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={paymentMethods}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="method" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#60a5fa" name="Count" />
              <Bar dataKey="amount" fill="#fbbf24" name="Amount" />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  );
}
