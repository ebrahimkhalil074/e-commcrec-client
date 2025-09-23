import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { createAddress, updateAddress } from "../services/addressSevices";


export const useCreateAddress = () => {
    return useMutation({
        mutationKey: ["create_address"],
        mutationFn: async (AddressData: FieldValues) =>await createAddress(AddressData,),
        
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })
}
export const useUpdateAddress = () => {
    return useMutation({
        mutationKey: ["update_address"],
        mutationFn: async (AddressData: FieldValues) =>await updateAddress(AddressData,),
        
        onSuccess: (data) => {
            toast.success(data.message);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    })
}