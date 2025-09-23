import { useMutation, useQuery } from "@tanstack/react-query"
import { createBrand, getAllBrands, getBrandById, updateBrand } from "../services/brandServices"
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { getTasks, updateDelivaryStatus } from "../services/delivaryServices";



export const useGetAllTasks = (query:any) => {
    return useQuery({
        queryKey: ["GET_ALL_TASKS",query],
        queryFn: async () =>await getTasks(query),
          
    })
}


export const useupdateDelivaryStatus = ()=>{
return useMutation({
  mutationKey:['UPDATE_Tasks'],
  mutationFn: async (data:FieldValues)=> await updateDelivaryStatus(data)
})
}