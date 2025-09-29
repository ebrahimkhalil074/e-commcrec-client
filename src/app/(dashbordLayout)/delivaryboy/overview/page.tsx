"use client";

import React from "react";
import { Card, CardHeader, CardBody } from "@heroui/react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { FaShoppingCart } from "react-icons/fa";

import { useGetDelivaryOverviewData } from "@/src/hooks/dashboard.hook";
import StatCard from "@/src/components/card/StatCard";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A855F7"];

export default function DeliveryOverviewPage() {
  const {
    data: delivaryOverviewData,
    isError,
    isLoading,
    error,
  } = useGetDelivaryOverviewData();

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (isError)
    return <p className="p-6 text-red-500">{(error as Error).message}</p>;

  // যদি API রেসপন্স nested থাকে যেমন { success:true, data:{ ... } }
  const apiData = delivaryOverviewData?.data;

  if (!apiData) return <p className="p-6 text-gray-500">No data found</p>;

  const { summary, weekStats, monthlyTrend, statusBreakdown, paymentMethods } =
    apiData;

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
          icon={<FaShoppingCart className="text-amber-500" />}
          title="Total Tasks"
          value={summary.totalTasks}
        />
        <StatCard
          icon={<FaShoppingCart className="text-amber-500" />}
          title="Completed"
          value={summary.completed}
        />
        <StatCard
          icon={<FaShoppingCart className="text-amber-500" />}
          title="Pending"
          value={summary.pending}
        />
        <StatCard
          icon={<FaShoppingCart className="text-amber-500" />}
          title="Cancelled"
          value={summary.cancelled}
        />
        <StatCard
          icon={<FaShoppingCart className="text-amber-500" />}
          title="Avg Delivery (min)"
          value={summary.avgDeliveryMinutes}
        />
        <StatCard
          icon={<FaShoppingCart className="text-amber-500" />}
          title="Earnings Today"
          value={summary.earningsToday}
        />
        <StatCard
          icon={<FaShoppingCart className="text-amber-500" />}
          title="Cash Collected"
          value={summary.cashCollectedToday}
        />
      </div>

      {/* Weekly Stats */}
      <Card className="shadow-md">
        <CardHeader>Weekly Stats (Completed vs Pending)</CardHeader>
        <CardBody>
          <ResponsiveContainer height={300} width="100%">
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
          <ResponsiveContainer height={300} width="100%">
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                dataKey="completed"
                name="Completed"
                stroke="#3b82f6"
                type="monotone"
              />
              <Line
                dataKey="earnings"
                name="Earnings"
                stroke="#f59e0b"
                type="monotone"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      {/* Status Breakdown */}
      <Card className="shadow-md">
        <CardHeader>Status Breakdown</CardHeader>
        <CardBody className="flex justify-center">
          <ResponsiveContainer height={300} width="100%">
            <PieChart>
              <Pie
                label
                cx="50%"
                cy="50%"
                data={statusBreakdown}
                dataKey="count"
                nameKey="status"
                outerRadius={100}
              >
                {statusBreakdown.map((entry: any, index: any) => (
                  <Cell
                    key={entry.status}
                    fill={COLORS[index % COLORS.length]}
                  />
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
          <ResponsiveContainer height={300} width="100%">
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
