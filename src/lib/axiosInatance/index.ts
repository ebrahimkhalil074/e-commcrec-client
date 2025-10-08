import axios from "axios";
import { cookies } from "next/headers";

import { getNewRefreshToken } from "@/src/services/authServices";

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
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const config = error.config;

    if (error?.response?.status === 401 && !config.sent) {
      config.sent = true;
      const res = await getNewRefreshToken();
      const accessToken = res.data.accessToken;

      config.headers["Authorization"] = accessToken;
      // Update the access token in the cookie store
      (
        await // Update the access token in the cookie store
        cookies()
      ).set("accesstoken", accessToken);

      return axiosInstance(config);
    }

    return Promise.reject(error);
  },
);
