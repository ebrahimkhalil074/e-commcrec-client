'use server';

import { axiosInstance } from "@/src/lib/axiosInatance";
import { FieldValues } from "react-hook-form";

export const getCart = async () => {
  try {
    const { data } = await axiosInstance.get("/cart");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};

export const addCartItem = async (cartItem: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/cart/add", cartItem);
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};

export const updateCartItem = async (cartItemId: string, quantity: number) => {
  try {
    const { data } = await axiosInstance.put(`/cart/${cartItemId}`, { quantity });
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};

export const removeCartItem = async (cartItemId: string) => {
  try {
    const { data } = await axiosInstance.delete(`/cart/${cartItemId}`);
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};

export const clearCart = async () => {
  try {
    const { data } = await axiosInstance.delete("/cart");
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};

export const syncCart = async (items: FieldValues[]) => {
  try {
    const { data } = await axiosInstance.post("/cart/sync", { items });
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};

// ✅ Usage Example (Next.js client)
// const cart = await getCart();
// await addCartItem({ productId: "123", quantity: 2 });
