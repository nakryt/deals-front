import type {
  ApiResponse,
  Client,
  CreateClientDto,
  PaginatedResponse,
  UpdateClientDto,
} from "@/types/client";
import api from "./api";

export const clientsApi = {
  getAll: async (page = 1, limit = 10): Promise<PaginatedResponse<Client>> => {
    const response = await api.get<PaginatedResponse<Client>>("/clients", {
      params: { page, limit },
    });
    return response.data;
  },

  getById: async (id: string): Promise<ApiResponse<Client>> => {
    const response = await api.get<ApiResponse<Client>>(`/clients/${id}`);
    return response.data;
  },

  create: async (data: CreateClientDto): Promise<ApiResponse<Client>> => {
    const response = await api.post<ApiResponse<Client>>("/clients", data);
    return response.data;
  },

  update: async (
    id: string,
    data: UpdateClientDto,
  ): Promise<ApiResponse<Client>> => {
    const response = await api.patch<ApiResponse<Client>>(
      `/clients/${id}`,
      data,
    );
    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    const response = await api.delete<ApiResponse<void>>(`/clients/${id}`);
    return response.data;
  },

  search: async (query: string): Promise<ApiResponse<Client[]>> => {
    const response = await api.get<ApiResponse<Client[]>>("/clients/search", {
      params: { q: query },
    });
    return response.data;
  },
};
