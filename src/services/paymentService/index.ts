"use server";

import { axiosInstance } from "@/src/lib/axiosInatance";

export const getMyAllPayments = async (query: any) => {
  const { data } = await axiosInstance.get("/payment/my-payment", {
    params: query,
  });

  return data;
};
