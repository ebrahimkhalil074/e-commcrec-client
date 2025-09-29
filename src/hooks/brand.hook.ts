import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

import {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
} from "../services/brandServices";

export const useCreateBrand = () => {
  return useMutation({
    mutationKey: ["CREATE_brand"],
    mutationFn: async (brandData: FieldValues) => await createBrand(brandData),

    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useGetAllBrands = (query: any) => {
  return useQuery({
    queryKey: ["GET_ALL_Brands", query],
    queryFn: async () => await getAllBrands(query),
  });
};
export const useGetBrandById = (id: string) => {
  return useQuery({
    queryKey: ["GET_SINGLE_Brands", id],
    queryFn: async () => await getBrandById(id),
  });
};

export const useUpdateBrand = () => {
  return useMutation({
    mutationKey: ["UPDATE_BRAND"],
    mutationFn: async (data: FieldValues) => await updateBrand(data),
  });
};
