"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
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
  FaUsers,
  FaDollarSign,
  FaStar,
  FaShoppingCart,
  FaExclamationCircle,
} from "react-icons/fa";

import StatCard from "@/src/components/card/StatCard";
import { useGetAllAdminDashboardData } from "@/src/hooks/dashboard.hook";

const amberShades = ["#f59e0b", "#fbbf24", "#fcd34d", "#fde68a"];

export default function AdminDashboardPage() {
  const { data, isPending, error } = useGetAllAdminDashboardData();
  const dashboard = data?.data;

  if (isPending) return <p className="p-4">Loading…</p>;
  if (error) return <p className="p-4">Error loading dashboard data.</p>;
  if (!dashboard) return <p className="p-4">No dashboard data available.</p>;

  // ====== Data transforms ======
  const ordersOverTime = dashboard.orders.ordersOverTime
    .map((o: any) => ({
      date: new Date(o.date).toLocaleDateString(),
      orders: o.total,
    }))
    .sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

  const paymentMethodData = dashboard.orders.paymentMethods.map((p: any) => ({
    name: p.method || "Unknown",
    value: p._count.method,
  }));

  const ordersStatusData = dashboard.orders.statusWise.map((s: any) => ({
    name: s.status,
    value: s._count.status,
  }));

  const usersRoleData = dashboard.users.roleWise.map((r: any) => ({
    name: r.role,
    value: r._count.role,
  }));

  const deliveryStatsData = [
    { name: "Delivered", value: dashboard.delivery.totalDelivered },
    { name: "Pending", value: dashboard.delivery.pendingDeliveries },
  ];

  const topSellingBarData = dashboard.products.topSellingProducts.map(
    (p: any) => ({
      name: p.name,
      totalSold: p.totalSold,
    }),
  );

  return (
    <div className="p-6 space-y-6">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<FaShoppingCart className="text-amber-500" />}
          title="Total Orders"
          value={dashboard.orders.totalOrders}
        />
        <StatCard
          icon={<FaDollarSign className="text-amber-500" />}
          title="Total Revenue"
          value={`৳ ${dashboard.orders.totalRevenue.toFixed(2)}`}
        />
        <StatCard
          icon={<FaDollarSign className="text-amber-500" />}
          title="Due Payments"
          value={`৳ ${dashboard.orders.totalDueAmount.toFixed(2)}`}
        />
        <StatCard
          icon={<FaUsers className="text-amber-500" />}
          title="Total Users"
          value={dashboard.users.totalUsers}
        />
        <StatCard
          icon={<FaExclamationCircle className="text-amber-500" />}
          title="Low Stock"
          value={dashboard.products.lowStockItems}
        />
        <StatCard
          icon={<FaStar className="text-amber-500" />}
          title="Avg Rating"
          value={dashboard.reviews.averageRating?.toFixed(1)}
        />
      </div>

      {/* Orders Over Time + Payment Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-t-4 border-b-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardHeader>Orders Over Time</CardHeader>
          <CardBody>
            <ResponsiveContainer height={250} width="100%">
              <LineChart data={ordersOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  dataKey="orders"
                  dot={{ r: 5 }}
                  stroke={amberShades[0]}
                  strokeWidth={3}
                  type="monotone"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card className="border-t-4 border-b-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardHeader>Payment Method Distribution</CardHeader>
          <CardBody>
            <ResponsiveContainer height={250} width="100%">
              <PieChart>
                <Pie
                  label
                  data={paymentMethodData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                >
                  {paymentMethodData.map((_: any, i: any) => (
                    <Cell key={i} fill={amberShades[i % amberShades.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Top Selling Products (Bar Chart) */}
      <Card className="border-t-4 border-b-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow duration-300">
        <CardHeader>Top Selling Products</CardHeader>
        <CardBody>
          <ResponsiveContainer height={300} width="100%">
            <BarChart
              data={topSellingBarData}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis angle={-30} dataKey="name" interval={0} textAnchor="end" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="totalSold"
                fill={amberShades[0]}
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Orders Status (Pie Chart) */}
        <Card className="border-t-4 border-b-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardHeader>Orders Status</CardHeader>
          <CardBody>
            <ResponsiveContainer height={300} width="100%">
              <PieChart>
                <Pie
                  label
                  data={ordersStatusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                >
                  {ordersStatusData.map((_: any, i: any) => (
                    <Cell key={i} fill={amberShades[i % amberShades.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        {/* Users by Role (Pie Chart) */}
        <Card className="border-t-4 border-b-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardHeader>Users by Role</CardHeader>
          <CardBody>
            <ResponsiveContainer height={300} width="100%">
              <PieChart>
                <Pie
                  label
                  data={usersRoleData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                >
                  {usersRoleData.map((_: any, i: any) => (
                    <Cell key={i} fill={amberShades[i % amberShades.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </div>

      {/* Delivery Stats (Bar Chart) */}
      <Card className="border-t-4 border-b-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow duration-300">
        <CardHeader>Delivery Stats</CardHeader>
        <CardBody>
          <ResponsiveContainer height={250} width="100%">
            <BarChart data={deliveryStatsData}>
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
    </div>
  );
}
