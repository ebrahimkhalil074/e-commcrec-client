import axios from "axios";
import { cookies } from "next/headers";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // You can add any request interceptors here
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }

    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  },
);
axiosInstance.interceptors.response.use(
  (response) => {
    // You can add any response interceptors here
    return response;
  },
  async (error) => {
    // Handle response error
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      console.error("Unauthorized access - redirecting to login");
      // You can implement a redirect here if needed
    } else {
      console.error("An error occurred:", error);
    }

    return Promise.reject(error);
  },
);
