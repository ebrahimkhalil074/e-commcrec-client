import { useMutation, useQuery } from "@tanstack/react-query";

import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { assignDeliveryBoyForOrder, createOrder, getMyAllOrders, markAsShippedOrder } from "../services/orderservices";

export const useCreateOrder = () => {
    return useMutation({
        mutationKey: ["CREATE_order"],
        mutationFn: async (orderData: FieldValues) =>await createOrder(orderData),
        
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })
}
export const useMarkAsShippedOrder = () => {
    return useMutation({
        mutationKey: ["SHIPPED_order"],
        mutationFn: async (id:string) =>await markAsShippedOrder(id),
        
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })
}
export const useAssignDeliveryBoyForOrder = () => {
    return useMutation({
        mutationKey: ["ASSIN_DV_BOY_order"],
        mutationFn: async (orderData: FieldValues) =>await assignDeliveryBoyForOrder(orderData),
        
        onSuccess: (data) => {
            console.log(data)
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })
}


export const useGetMyAllOrders = (query:any) => {
  return useQuery({
    queryKey: ["GET_ALL_Orders", query], // param include করে cache differentiate
    queryFn: () =>getMyAllOrders(query),
    
  });
};
