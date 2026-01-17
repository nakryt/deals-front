export enum DealStatus {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  WON = "WON",
  LOST = "LOST",
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
  deals?: Deal[];
}

export interface Deal {
  id: string;
  title: string;
  amount: number;
  status: DealStatus;
  clientId: string;
  client?: Client;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClientInput {
  name: string;
  email: string;
  phone?: string;
}

export interface UpdateClientInput {
  name?: string;
  email?: string;
  phone?: string;
}

export interface CreateDealInput {
  title: string;
  amount: number;
  status: DealStatus;
  clientId: string;
}

export interface UpdateDealInput {
  title?: string;
  amount?: number;
  status?: DealStatus;
  clientId?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
  };
}

export interface ApiError {
  statusCode: number;
  timestamp: string;
  path: string;
  method: string;
  message: string | string[];
}

export interface ClientQueryParams {
  page?: number;
  limit?: number;
}

export interface DealQueryParams {
  page?: number;
  limit?: number;
  status?: DealStatus;
  clientId?: string;
}
