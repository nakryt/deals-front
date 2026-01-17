export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: ClientStatus;
  createdAt: string;
  updatedAt: string;
}

export enum ClientStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
}

export interface CreateClientDto {
  name: string;
  email: string;
  phone: string;
  status?: ClientStatus;
}

export interface UpdateClientDto {
  name?: string;
  email?: string;
  phone?: string;
  status?: ClientStatus;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
