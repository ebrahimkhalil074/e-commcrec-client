"use client";

import { Card, CardHeader, CardBody } from "@heroui/react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import {
  FaShoppingCart,
  FaDollarSign,
  FaClock,
  FaCreditCard,
} from "react-icons/fa";
import Image from "next/image";

import StatCard from "@/src/components/card/StatCard";
import { useGetCustomerOverviewData } from "@/src/hooks/dashboard.hook";
import CustomerOverviewSkeleton from "@/src/components/skeloton/CustomerOverviewPageSklton";

const amberShades = ["#f59e0b", "#fbbf24", "#fcd34d", "#fde68a"];

export default function CustomerOverviewPage() {
  const { data, isLoading } = useGetCustomerOverviewData();
  const customer = data?.data;
  const ordersOverTime = (customer?.orders?.ordersOverTime || []).map(
    (o: any) => ({
      month: o.month,
      count: o.count,
    }),
  );

  const paymentMethods = (customer?.orders?.paymentMethods || []).map(
    (p: any, i: number) => ({
      name: p.method,
      value: p.count,
      color: amberShades[i % amberShades.length],
    }),
  );

  const statusWise = (customer?.orders?.statusWise || []).map(
    (s: any, i: number) => ({
      name: s.status,
      value: s.count,
      color: amberShades[i % amberShades.length],
    }),
  );

  const deliveryStats = [
    { name: "Pending", value: customer?.delivery?.pendingDeliveries },
    {
      name: "Delivered",
      value:
        customer?.orders?.statusWise?.find((s: any) => s.status === "DELIVERED")
          ?.count || 0,
    },
  ];

  return (
    <>
      {isLoading ? (
        <CustomerOverviewSkeleton />
      ) : (
        <div className="p-6 space-y-6 ">
          {/* === Profile Info Banner Card === */}
          <Card className="border-l-8 border-amber-500 bg-amber-50 dark:bg-gray-800 shadow-lg rounded-xl">
            <CardBody>
              <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6">
                {/* Profile Section */}
                <div className="flex items-center gap-4">
                  <Image
                    alt={customer.profile.name}
                    className="w-20 h-20 rounded-full border-4 border-amber-500 object-cover shadow-md"
                    height={80}
                    src={customer.profile.image}
                    width={80}
                  />
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-amber-500 dark:text-amber-500">
                      Welcome, {customer.profile.name}!
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      {customer.profile.email}
                    </p>
                  </div>
                </div>

                {/* Message Section */}
                <div className="bg-amber-100 dark:bg-gray-700 text-amber-800 dark:text-gray-200 px-5 py-4 rounded-xl shadow-md text-center md:text-left">
                  <p className="font-semibold text-lg">
                    Thanks for shopping with us!
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Track your orders and payments from this dashboard.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* === KPI Cards === */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard
              icon={<FaShoppingCart className="text-amber-500" />}
              title="Total Orders"
              value={customer.orders.totalOrders}
            />
            <StatCard
              icon={<FaDollarSign className="text-amber-500" />}
              title="Total Spent"
              value={`৳ ${customer.orders.totalSpent.toFixed(2)}`}
            />
            {/* <StatCard
              icon={<FaClock className="text-amber-500" />}
              title="Due Amount"
              value={`৳ ${customer.orders.dueAmount.toFixed(2)}`}
            /> */}
            <StatCard
              icon={<FaCreditCard className="text-amber-500" />}
              title="Avg Order Value"
              value={`৳ ${customer.orders.avgOrderValue.toFixed(2)}`}
            />
          </div>

          {/* === Orders Over Time === */}
          <Card className="border-t-4 border-b-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800">
            <CardHeader>Orders Over Time</CardHeader>
            <CardBody>
              <ResponsiveContainer height={250} width="100%">
                <LineChart data={ordersOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    dataKey="count"
                    dot={{ r: 5 }}
                    stroke={amberShades[0]}
                    strokeWidth={3}
                    type="monotone"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          {/* === Payment Methods + Orders Status === */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:bg-gray-800">
            <Card className="border-t-4 border-b-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800">
              <CardHeader>Payment Method Distribution</CardHeader>
              <CardBody>
                <ResponsiveContainer height={250} width="100%">
                  <PieChart>
                    <Pie
                      label
                      data={paymentMethods}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                    >
                      {paymentMethods.map((p: any, i: any) => (
                        <Cell key={i} fill={p.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>

            <Card className="border-t-4 border-b-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800">
              <CardHeader>Orders Status</CardHeader>
              <CardBody>
                <ResponsiveContainer height={250} width="100%">
                  <PieChart>
                    <Pie
                      label
                      data={statusWise}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                    >
                      {statusWise.map((s: any, i: any) => (
                        <Cell key={i} fill={s.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>
          </div>

          {/* === Delivery Stats === */}
          <Card className="border-t-4 border-b-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800">
            <CardHeader>Delivery Stats</CardHeader>
            <CardBody>
              <ResponsiveContainer height={250} width="100%">
                <BarChart data={deliveryStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="value"
                    fill={amberShades[0]}
                    radius={[5, 5, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>

          {/* === Latest Delivery Logs === */}
          <Card className="border-t-4 border-b-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800">
            <CardHeader>Latest Delivery Updates</CardHeader>
            <CardBody>
              {customer.delivery.latestLogs?.length ? (
                <ul className="space-y-2">
                  {customer.delivery.latestLogs.map((log: any) => (
                    <li
                      key={log.orderId}
                      className="flex justify-between text-sm"
                    >
                      <span className="font-medium">
                        Order ID: {log.orderId}
                      </span>
                      <span className="text-gray-600">
                        {log.status} on {log.updatedAt}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No recent delivery updates.</p>
              )}
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
}
