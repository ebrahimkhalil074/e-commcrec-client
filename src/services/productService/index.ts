"use server";
import { FieldValues } from "react-hook-form";

import { axiosInstance } from "@/src/lib/axiosInatance";

export const createProduct = async (productData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/product", productData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getAllProducts = async () => {
  try {
    const { data } = await axiosInstance.get("/product");

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getAllFeaturedProducts = async () => {
  try {
    const { data } = await axiosInstance.get("/product/fetured-products");

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const getProductById = async (productId: string) => {
  try {
    const { data } = await axiosInstance.get(`/product/${productId}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const updateProduct = async (
  productId: string,
  productData: FormData,
) => {
  try {
    const { data } = await axiosInstance.put(
      `/product/${productId}`,
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const { data } = await axiosInstance.patch(`/product/${productId}`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getJustForYouProducts = async () => {
  try {
    const { data } = await axiosInstance.get(`/product/for-you`);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
