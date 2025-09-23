'use server'

import { axiosInstance } from "@/src/lib/axiosInatance";

export const getTasks = async (query) => {
  console.log({query});
  try {
    const { data } = await axiosInstance.get(`/delivary/tasks`,{
      params:{onlyToday:query}  
    });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
export const updateDelivaryStatus = async (updatedData:any) => {
  try {
    const { data } = await axiosInstance.put(`/delivary/update-status`, updatedData);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}