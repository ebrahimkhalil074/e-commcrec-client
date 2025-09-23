'use server';
import { axiosInstance } from "@/src/lib/axiosInatance";



export const createBrand = async (brandData:any) => {
  console.log({brandData})
  try {
    const { data } = await axiosInstance.post(`/brand`,brandData);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
export const getAllBrands = async (query:any) => {
  try {
    const { data } = await axiosInstance.get("/brand",{
      params:query?{name:query}:{}
    });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
export const getBrandById = async (id:string) => {
  try {
    const { data } = await axiosInstance.get(`/brand/${id}`,);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
export const updateBrand= async (updatedData:any) => {
  try {
    const { data } = await axiosInstance.get(`/brand/${updatedData.id}`,updatedData.data);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}