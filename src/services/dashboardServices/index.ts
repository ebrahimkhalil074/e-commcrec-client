"use server";

import { axiosInstance } from "@/src/lib/axiosInatance";

export const getAdminDashboardData = async () => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/admin-overview`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getCustomerDashboardData = async () => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/customer-overview`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getDelivaryDashboardData = async () => {
  try {
    const { data } = await axiosInstance.get(`/dashboard/delivary-overview`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
