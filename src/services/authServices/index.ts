"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

import { axiosInstance } from "@/src/lib/axiosInatance";

export const userRegister = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/user", userData);

    if (data.success) {
      (await cookies()).set("accessToken", data?.data?.accessToken);
      (await cookies()).set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const userLogin = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    console.log(data);

    if (data.success) {
      (await cookies()).set("accessToken", data?.data?.accessToken);
      (await cookies()).set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const Logout = async () => {
  try {
    (await cookies()).delete("accessToken");
    (await cookies()).delete("refreshToken");
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;

  let decodedToken = null;

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
    console.log(decodedToken);

    return {
      email: decodedToken.email,
      role: decodedToken.role,
    };
  }
};

export const getNewRefreshToken = async () => {
  // refresh token is expired, request a new one from the server
  const refreshToken = (await cookies()).get("refreshToken")?.value;

  if (!refreshToken) {
    throw new Error("no accesstoken refreshToken found");
  }
  try {
    const res = await axiosInstance({
      method: "POST",
      url: "/auth/refresh-token",
      withCredentials: true,
      headers: {
        cookies: `refreshToken${refreshToken}`,
      },
    });

    return res?.data;
  } catch (error) {
    throw new Error("failed to get new refresh token");
  }
};
