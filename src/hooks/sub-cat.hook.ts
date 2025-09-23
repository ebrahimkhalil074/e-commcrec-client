import { useMutation, useQuery } from "@tanstack/react-query"
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { createSubCayegory ,getAllSubCayegory, getSubCayegoryById, updateSubCategory} from "../services/sub-cat-services";

export const useCreateSubCategory = () => {
    return useMutation({
        mutationKey: ["CREATE_Sub_Category"],
       mutationFn: async (categoryData:FieldValues) =>await createSubCayegory(categoryData),
        
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })
    
}
export const useGetAllSubCategory = (query:any) => {
    return useQuery({
        queryKey: ["GET_ALL_Sub_Category",query],
        queryFn: async () =>await getAllSubCayegory(query),
        
        
    })
}
export const useUpdateSubCategory =()=>{
    return useMutation({
        mutationKey:["UPDATE_SUB_CAT"],
        mutationFn: async (upCategoryData:any)=>await updateSubCategory(upCategoryData),
         onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
    })
}
export const usegetSubCayegoryById = (id:string) => {
    return useQuery({
        queryKey: ["GET_Sub_Category_BYID",id],
        queryFn: async () =>await getSubCayegoryById(id),
        
        
    })
}