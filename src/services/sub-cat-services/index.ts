'use server';
import { axiosInstance } from "@/src/lib/axiosInatance";

export const createSubCayegory = async (categorySubData:any) => {
  console.log({categorySubData})
  try {
    const { data } = await axiosInstance.post(`/sub-category`,categorySubData);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
 export const updateSubCategory =async(updatedData:any)=>{
  console.log({updatedData})
try{
const {data} = await axiosInstance.put(`/sub-category/${updatedData.id}`,updatedData.data) ;
return data
}catch(error :any){
 throw new Error(error);
}
}
export const getAllSubCayegory = async (query:any) => {
  try {
    const { data } = await axiosInstance.get(`/sub-category`,{
      params:query?{name:query}:{}
    });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
export const getSubCayegoryById = async (id:string) => {
  try {
    const { data } = await axiosInstance.get(`/sub-category/${id}`,);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}