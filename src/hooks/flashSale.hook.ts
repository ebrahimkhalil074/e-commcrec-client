import { useMutation, useQuery } from "@tanstack/react-query"

import { createFlashSale, getAllFlashSale, getFlashSaleById, updateFlashSale } from "../services/flashSaleservices"
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
 


export const useCreateFlashSale = () => {
    return useMutation({
        mutationKey: ["CREATE_FlashSale"],
       mutationFn: async (fsData:FieldValues) =>await createFlashSale(fsData),
        
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })
    
}
export const useGetAllFlashSale = () => {
    return useQuery({
        queryKey: ["GET_ALL_FlashSale"],
        queryFn: async () =>await getAllFlashSale(),
        
        
    })
}

export const useUpdateFlashSale =()=>{
    return useMutation({
        mutationKey:["UPDATE_FlashSale"],
        mutationFn: async (upFsData:any)=>await updateFlashSale(upFsData),
         onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
    })
}
export const useGetFlashSaleById = (id:string) => {
    return useQuery({
        queryKey: ["GET_FlashSale_BYID",id],
        queryFn: async () =>await getFlashSaleById(id),
        
        
    })
}