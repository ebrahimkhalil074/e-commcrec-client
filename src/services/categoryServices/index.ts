'use server';
import { axiosInstance } from "@/src/lib/axiosInatance";

export const createCayegory = async (categoryData:any) => {
  console.log({categoryData})
  try {
    const { data } = await axiosInstance.post(`/category`,categoryData);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
 export const updateCategory =async(id:string,categoryData:any)=>{
try{
const {data} = await axiosInstance.put(`/category/${id}`,categoryData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }) ;
return data
}catch(error :any){
 throw new Error(error);
}
}
export const getAllCayegory = async (query:any) => {
  try {
    const { data } = await axiosInstance.get(`/category`,{
      params:query?{name:query}:{}
    });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
export const getCayegoryById = async (id:string) => {
  try {
    const { data } = await axiosInstance.get(`/category/${id}`,);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}