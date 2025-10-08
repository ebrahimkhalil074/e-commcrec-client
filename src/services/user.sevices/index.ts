"use server";
import { FieldValues } from "react-hook-form";

import { axiosInstance } from "@/src/lib/axiosInatance";

export const updateUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.put("/user", userData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const createSellerRequest = async (sellerData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/user/seller", sellerData);

    console.log(data);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const approveSellerRequest = async (sellerData: FieldValues) => {
  try {
    const { data } = await axiosInstance.put(
      `/user/approve-sellers/${sellerData.id}`,
      sellerData,
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getAllSellerRequest = async (query: any) => {
  const { data } = await axiosInstance.get("/user/req-sellers", {
    params: query,
  });

  return data;
};
export const getAllUsers = async (query: any) => {
  const { data } = await axiosInstance.get("/user", { params: query });

  return data;
};
export const getUserById = async (id: string) => {
  const { data } = await axiosInstance.get(`user/${id}`);

  return data;
};
export const getUserByEmail = async (email: string) => {
  const { data } = await axiosInstance.get(`user/profile/${email}`);

  return data;
};
