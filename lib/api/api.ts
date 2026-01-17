import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const apiConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "10000", 10),
  headers: {
    "Content-Type": "application/json",
  },
};

export const api: AxiosInstance = axios.create(apiConfig);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
    }
    return Promise.reject(error);
  },
);

export default api;
