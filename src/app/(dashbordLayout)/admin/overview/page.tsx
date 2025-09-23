"use client";

import {
  Card, CardBody, CardHeader,
} from "@heroui/react";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar,
} from "recharts";
import {
  FaUsers, FaDollarSign, FaStar, FaShoppingCart, FaExclamationCircle,
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
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

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

  const topSellingBarData = dashboard.products.topSellingProducts.map((p: any) => ({
    name: p.name,
    totalSold: p.totalSold,
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Orders" 
          value={dashboard.orders.totalOrders} 
          icon={<FaShoppingCart className="text-amber-500" />} 
          
        />
        <StatCard 
          title="Total Revenue" 
          value={`৳ ${dashboard.orders.totalRevenue.toFixed(2)}`} 
          icon={<FaDollarSign className="text-amber-500" />} 
          
        />
        <StatCard 
          title="Due Payments" 
          value={`৳ ${dashboard.orders.totalDueAmount.toFixed(2)}`} 
          icon={<FaDollarSign className="text-amber-500" />} 
          
        />
        <StatCard 
          title="Total Users" 
          value={dashboard.users.totalUsers} 
          icon={<FaUsers className="text-amber-500" />} 
          
        />
        <StatCard 
          title="Low Stock" 
          value={dashboard.products.lowStockItems} 
          icon={<FaExclamationCircle className="text-amber-500" />} 
          
        />
        <StatCard 
          title="Avg Rating" 
          value={dashboard.reviews.averageRating?.toFixed(1)} 
          icon={<FaStar className="text-amber-500" />} 
          
        />
      </div>

      {/* Orders Over Time + Payment Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-t-4 border-b-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardHeader>Orders Over Time</CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={ordersOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke={amberShades[0]} strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>

        <Card className="border-t-4 border-b-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardHeader>Payment Method Distribution</CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={paymentMethodData} dataKey="value" nameKey="name" outerRadius={100} label>
                  {paymentMethodData.map((_, i) => (
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
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topSellingBarData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalSold" fill={amberShades[0]} radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Orders Status (Pie Chart) */}
        <Card className="border-t-4 border-b-4 border-amber-500 shadow-md hover:shadow-xl transition-shadow duration-300">
          <CardHeader>Orders Status</CardHeader>
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={ordersStatusData} dataKey="value" nameKey="name" outerRadius={110} label>
                  {ordersStatusData.map((_, i) => (
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
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={usersRoleData} dataKey="value" nameKey="name" outerRadius={110} label>
                  {usersRoleData.map((_, i) => (
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
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={deliveryStatsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill={amberShades[0]} radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>
    </div>
  );
}
