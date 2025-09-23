import { useMutation, useQuery } from "@tanstack/react-query"
import { createCayegory, getAllCayegory, getCayegoryById, updateCategory } from "../services/categoryServices"
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

export const useCreateCategory = () => {
    return useMutation({
        mutationKey: ["CREATE_Category"],
       mutationFn: async (categoryData:FieldValues) =>await createCayegory(categoryData),
        
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })
    
}
export const useGetAllCategory = (query:any) => {
    return useQuery({
        queryKey: ["GET_ALL_Category",query],
        queryFn: async () => getAllCayegory(query),
        
        
    })
}
export const useUpdateCategory =()=>{
    return useMutation({
        mutationKey:["UPDATE_CATEGORY"],
        mutationFn: async ({id,categoryData}:{id:string,categoryData:FormData})=> updateCategory(id,categoryData),
         onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
    })
}
export const usegetCayegoryById = (id:string) => {
    return useQuery({
        queryKey: ["GET__Category_BYID",id],
        queryFn: async () =>await getCayegoryById(id),
        
        
    })
}