"use server";
import { FieldValues } from "react-hook-form";

import { axiosInstance } from "@/src/lib/axiosInatance";

export const createOrder = async (orderData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/order", orderData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const markAsShippedOrder = async (orderId: string) => {
  try {
    const { data } = await axiosInstance.patch(`order/${orderId}/ship`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const assignDeliveryBoyForOrder = async (asinOrder: FieldValues) => {
  try {
    const { data } = await axiosInstance.patch(
      `order/${asinOrder.orderId}/assign`,
      asinOrder.data,
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getMyAllOrders = async (query: any) => {
  const { data } = await axiosInstance.get("/order/my-order", {
    params: query,
  });

  return data;
};
