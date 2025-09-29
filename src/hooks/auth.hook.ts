import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { Logout, userLogin, userRegister } from "../services/authServices";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USERREGISTRATION"],
    mutationFn: async (userData) => await userRegister(userData),
    onSuccess: (data) => {
      console.log("rejister", data);
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USERLOGIN"],
    mutationFn: async (userData) => await userLogin(userData),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      toast.error(error?.meta || "Something went wrong!");
    },
  });
};
export const useLogout = () => {
  return useMutation({
    mutationKey: ["LOGOUT"],
    mutationFn: async () => {
      await Logout();
    },
    onSuccess: () => {
      toast.success("Logout successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
