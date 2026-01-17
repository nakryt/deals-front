import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { clientsApi } from "@/lib/api";
import type {
  ApiError,
  ClientQueryParams,
  CreateClientInput,
  UpdateClientInput,
} from "@/types";

const CLIENTS_QUERY_KEY = "clients";

export const useClients = (params?: ClientQueryParams) => {
  return useQuery({
    queryKey: [CLIENTS_QUERY_KEY, params],
    queryFn: () => clientsApi.getAll(params),
  });
};

export const useClient = (id: string) => {
  return useQuery({
    queryKey: [CLIENTS_QUERY_KEY, id],
    queryFn: () => clientsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClientInput) => clientsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CLIENTS_QUERY_KEY] });
      toast.success("Клієнта успішно створено");
    },
    onError: (error: ApiError) => {
      const message = Array.isArray(error.message)
        ? error.message.join(", ")
        : error.message || "Помилка при створенні клієнта";
      toast.error(message);
    },
  });
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateClientInput }) =>
      clientsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [CLIENTS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [CLIENTS_QUERY_KEY, variables.id],
      });
      toast.success("Клієнта успішно оновлено");
    },
    onError: (error: ApiError) => {
      const message = Array.isArray(error.message)
        ? error.message.join(", ")
        : error.message || "Помилка при оновленні клієнта";
      toast.error(message);
    },
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => clientsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CLIENTS_QUERY_KEY] });
      toast.success("Клієнта успішно видалено");
    },
    onError: (error: ApiError) => {
      const message = Array.isArray(error.message)
        ? error.message.join(", ")
        : error.message || "Помилка при видаленні клієнта";
      toast.error(message);
    },
  });
};
