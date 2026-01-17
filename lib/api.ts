import type {
  ApiError,
  Client,
  ClientQueryParams,
  CreateClientInput,
  CreateDealInput,
  Deal,
  DealQueryParams,
  PaginatedResponse,
  UpdateClientInput,
  UpdateDealInput,
} from "@/types";
import axios, { type AxiosError, type AxiosInstance } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response) {
      const apiError: ApiError = error.response.data;
      console.error("API Error:", apiError);
      throw apiError;
    }
    throw error;
  }
);

export const clientsApi = {
  getAll: async (
    params?: ClientQueryParams
  ): Promise<PaginatedResponse<Client>> => {
    const response = await apiClient.get<PaginatedResponse<Client>>(
      "/clients",
      { params }
    );
    return response.data;
  },

  getById: async (id: string): Promise<Client> => {
    const response = await apiClient.get<Client>(`/clients/${id}`);
    return response.data;
  },

  create: async (data: CreateClientInput): Promise<Client> => {
    const response = await apiClient.post<Client>("/clients", data);
    return response.data;
  },

  update: async (id: string, data: UpdateClientInput): Promise<Client> => {
    const response = await apiClient.patch<Client>(`/clients/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/clients/${id}`);
  },
};

export const dealsApi = {
  getAll: async (
    params?: DealQueryParams
  ): Promise<PaginatedResponse<Deal>> => {
    const response = await apiClient.get<PaginatedResponse<Deal>>("/deals", {
      params,
    });
    return response.data;
  },

  getById: async (id: string): Promise<Deal> => {
    const response = await apiClient.get<Deal>(`/deals/${id}`);
    return response.data;
  },

  create: async (data: CreateDealInput): Promise<Deal> => {
    const response = await apiClient.post<Deal>("/deals", data);
    return response.data;
  },

  update: async (id: string, data: UpdateDealInput): Promise<Deal> => {
    const response = await apiClient.patch<Deal>(`/deals/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/deals/${id}`);
  },
};

export default apiClient;
