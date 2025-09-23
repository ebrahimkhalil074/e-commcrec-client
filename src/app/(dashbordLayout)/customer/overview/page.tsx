"use client";

import {
  Card,
  CardHeader,
  CardBody,
} from "@heroui/react";
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
  FaTruck,
} from "react-icons/fa";
import StatCard from "@/src/components/card/StatCard";
import { useGetCustomerOverviewData } from "@/src/hooks/dashboard.hook";

const amberShades = ["#f59e0b", "#fbbf24", "#fcd34d", "#fde68a"];

export default function CustomerOverviewPage() {
  const { data, isPending, error } = useGetCustomerOverviewData();
  const customer = data?.data;
  console.log(customer)

  if (isPending) return <p className="p-4">Loading…</p>;
  if (error) return <p className="p-4">Error loading data.</p>;
  if (!customer) return <p className="p-4">No data available.</p>;

  const ordersOverTime = (customer.orders.ordersOverTime || []).map((o: any) => ({
    month: o.month,
    count: o.count,
  }));

  const paymentMethods = (customer.orders.paymentMethods || []).map((p: any, i: number) => ({
    name: p.method,
    value: p.count,
    color: amberShades[i % amberShades.length],
  }));

  const statusWise = (customer.orders.statusWise || []).map((s: any, i: number) => ({
    name: s.status,
    value: s.count,
    color: amberShades[i % amberShades.length],
  }));

  const deliveryStats = [
    { name: "Pending", value: customer.delivery.pendingDeliveries },
    {
      name: "Delivered",
      value:
        customer.orders.statusWise?.find((s: any) => s.status === "DELIVERED")
          ?.count || 0,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* === Profile Info Banner Card === */}
      <Card className="border-l-8 border-amber-500 bg-amber-50 shadow-lg">
        <CardBody>
          <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={customer.profile.image}
                alt={customer.profile.name}
                className="w-20 h-20 rounded-full border-4 border-amber-400 object-cover shadow-md"
              />
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-amber-700">
                  Welcome, {customer.profile.name}!
                </h2>
                <p className="text-gray-700">{customer.profile.email}</p>
               
              </div>
            </div>

            <div className="bg-amber-100 text-amber-800 px-4 py-3 rounded-xl shadow-md text-center">
              <p className="font-semibold text-lg">Thanks for shopping with us!</p>
              <p className="text-sm">
                Track your orders and payments from this dashboard.
              </p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* === KPI Cards === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Orders"
          value={customer.orders.totalOrders}
          icon={<FaShoppingCart className="text-amber-500" />}
        />
        <StatCard
          title="Total Spent"
          value={`৳ ${customer.orders.totalSpent.toFixed(2)}`}
          icon={<FaDollarSign className="text-amber-500" />}
        />
        <StatCard
          title="Due Amount"
          value={`৳ ${customer.orders.dueAmount.toFixed(2)}`}
          icon={<FaClock className="text-amber-500" />}
        />
        <StatCard
          title="Avg Order Value"
          value={`৳ ${customer.orders.avgOrderValue.toFixed(2)}`}
          icon={<FaCreditCard className="text-amber-500" />}
        />
      </div>

      {/* === Orders Over Time === */}
      <Card className="border-t-4 border-b-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow duration-300">
        <CardHeader>Orders Over Time</CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ordersOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke={amberShades[0]}
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      {/* === Payment Methods + Orders Status === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-t-4 border-b-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardHeader>Payment Method Distribution</CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={paymentMethods} dataKey="value" nameKey="name" outerRadius={100} label>
                  {paymentMethods.map((p, i) => (
                    <Cell key={i} fill={p.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card className="border-t-4 border-b-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardHeader>Orders Status</CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={statusWise} dataKey="value" nameKey="name" outerRadius={100} label>
                  {statusWise.map((s, i) => (
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
      <Card className="border-t-4 border-b-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow duration-300">
        <CardHeader>Delivery Stats</CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={deliveryStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill={amberShades[0]} radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      {/* === Latest Delivery Logs === */}
      <Card className="border-t-4 border-b-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow duration-300">
        <CardHeader>Latest Delivery Updates</CardHeader>
        <CardBody>
          {customer.delivery.latestLogs?.length ? (
            <ul className="space-y-2">
              {customer.delivery.latestLogs.map((log: any) => (
                <li key={log.orderId} className="flex justify-between text-sm">
                  <span className="font-medium">Order ID: {log.orderId}</span>
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
  );
}
