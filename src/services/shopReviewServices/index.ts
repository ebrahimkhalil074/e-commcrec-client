"use server";

import { FieldValues } from "react-hook-form";

import { axiosInstance } from "@/src/lib/axiosInatance";

export const createShopReview = async (revData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/", revData);

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};
export const getAllShopReview = async () => {
  try {
    const { data } = await axiosInstance.get("/shopReview");

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteShopReview = async (id: string) => {
  try {
    const { data } = await axiosInstance.delete(`/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};
