import { Input } from "@heroui/input";
import React from "react";

type IconInputProps = {
  icon: React.ElementType;
  label: string;
  field: any;
  type?: string;
  required?: boolean;
  error?: string;
};

export const IconInput = ({
  icon: Icon,
  label,
  field,
  type = "text",
  required = false,
  error,
}: IconInputProps) => {
  return (
    <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 p-3 rounded-xl shadow-sm hover:shadow-md transition w-full">
      <Icon className="text-amber-500 text-xl" />
      <Input
        value={field.value}          // explicit value
        onChange={field.onChange}    // explicit onChange
        label={label}
        type={type}
        required={required}
        isInvalid={Boolean(error)}
        errorMessage={error || ""}
        fullWidth
        className="flex-1"
      />
    </div>
  );
};
