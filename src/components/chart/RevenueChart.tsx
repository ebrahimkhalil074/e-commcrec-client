"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  data: { date: string; revenue: number }[];
}

export const RevenueChart = ({ data }: Props) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg border-t-4 border-amber-500">
      <h2 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Revenue Over Time</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
