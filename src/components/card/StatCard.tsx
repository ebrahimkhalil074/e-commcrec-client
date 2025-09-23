import { FC, ReactNode } from "react";

interface Props {
  title: string;
  value: string | number;
  icon: ReactNode;
}

const StatCard: FC<Props> = ({ title, value, icon }) => {
  return (
    <div className="flex items-center p-4 bg-white dark:bg-gray-800 shadow rounded-lg border-l-4 border-r-4  border-amber-500 hover:shadow-lg transition-shadow duration-300">
      <div className="p-3 rounded-full bg-amber-100 text-amber-600 mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
