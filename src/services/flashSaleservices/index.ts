"use server";
import { axiosInstance } from "@/src/lib/axiosInatance";

export const createFlashSale = async (fsData: any) => {
  try {
    const { data } = await axiosInstance.post("/flash-sale", fsData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const updateFlashSale = async (updatedData: any) => {
  console.log({ updatedData });
  try {
    const { data } = await axiosInstance.put(
      `/flash-sale/${updatedData.id}`,
      updatedData.data,
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getAllFlashSale = async () => {
  try {
    const { data } = await axiosInstance.get("/flash-sale");

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getFlashSaleById = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/flash-sale/${id}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
