import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

import {
  createShopReview,
  deleteShopReview,
  getAllShopReview,
} from "../services/shopReviewServices";

export const useCreateShopReview = () => {
  return useMutation({
    mutationKey: ["CREATE_shopReview"],
    mutationFn: async (shopReviewData: FieldValues) =>
      await createShopReview(shopReviewData),

    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useGetAllShopReview = (query: any) => {
  return useQuery({
    queryKey: ["GET_ALL_ShopReview", query],
    queryFn: async () => getAllShopReview(),
  });
};

export const useDeleteShopReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["GET_ALL_ShopReview"],
    mutationFn: async (id: string) => deleteShopReview(id),

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.refetchQueries({ queryKey: ["DELETE_SHOP_REVIEW"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
