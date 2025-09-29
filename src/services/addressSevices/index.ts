"use server";
import { FieldValues } from "react-hook-form";

import { axiosInstance } from "@/src/lib/axiosInatance";

export const createAddress = async (addressData: FieldValues) => {
  try {
    console.log(addressData);
    const { data } = await axiosInstance.post(`/address`, addressData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const updateAddress = async (addressData: FieldValues) => {
  try {
    console.log(addressData);
    const { data } = await axiosInstance.put(
      `/address/${addressData?.id}`,
      addressData,
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
