'use server';
import { axiosInstance } from "@/src/lib/axiosInatance";
import { FieldValues } from "react-hook-form";

export const updateUser = async (userData: FieldValues) => {
  try {
    console.log(userData)
    const { data } = await axiosInstance.put("/user", userData,);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export const getAllUsers= async (query: any) => {
  
    const { data } = await axiosInstance.get("/user", {params:query });
    return data;
  } 
export const getUserById = async (id: string) => {
  
    const { data } = await axiosInstance.get(`user/${id}`,);
    return data;
  } 
export const getUserByEmail = async (email: string) => {
  
    const { data } = await axiosInstance.get(`user/profile/${email}`,);
    return data;
  } 

