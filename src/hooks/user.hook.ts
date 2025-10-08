import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import {
  approveSellerRequest,
  createSellerRequest,
  getAllSellerRequest,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser,
} from "../services/user.sevices";

export const useUpdateUser = () => {
  return useMutation({
    mutationKey: ["update_User"],
    mutationFn: async (UserData: FieldValues) => await updateUser(UserData),

    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useCreateSellerRequest = () => {
  return useMutation({
    mutationKey: ["create_seller"],
    mutationFn: async (sellerData: FieldValues) =>
      await createSellerRequest(sellerData),

    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useApproveSellerRequest = () => {
  return useMutation({
    mutationKey: ["approve_seller"],
    mutationFn: async (sellerData: FieldValues) =>
      await approveSellerRequest(sellerData),

    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useGetAllSellerRequest = (query: any) => {
  return useQuery({
    queryKey: ["GET_ALL_SELLERS_REQUEST"],
    queryFn: async () => await getAllSellerRequest(query),
  });
};

export const useGetAllUsers = (query: any) => {
  return useQuery({
    queryKey: ["GET_ALL_USERS"],
    queryFn: async () => await getAllUsers(query),
  });
};

export const useGetUserById = (UserId: string) => {
  return useQuery({
    queryKey: ["GET_User_BY_ID", UserId],
    queryFn: async () => await getUserById(UserId),
  });
};
export const useGetUserByEmail = (email: string) => {
  return useQuery({
    queryKey: ["GET_User_BY_email", email],
    queryFn: async () => await getUserByEmail(email),
  });
};
