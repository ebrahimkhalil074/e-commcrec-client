"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: { name: string; sold: number }[];
}

export const TopProductsChart = ({ data }: Props) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 shadow rounded-lg border-t-4 border-amber-500">
      <h2 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">
        Top Selling Products
      </h2>
      <ResponsiveContainer height={250} width="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            dataKey="sold"
            stroke="#f59e0b"
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
