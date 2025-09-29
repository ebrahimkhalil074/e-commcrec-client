"use server";
import { axiosInstance } from "@/src/lib/axiosInatance";

export const getAllVariants = async () => {
  try {
    const { data } = await axiosInstance.get("/variant");

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
