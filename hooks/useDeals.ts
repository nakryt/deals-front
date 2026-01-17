import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { dealsApi } from "@/lib/api";
import type {
  ApiError,
  CreateDealInput,
  DealQueryParams,
  UpdateDealInput,
} from "@/types";

const DEALS_QUERY_KEY = "deals";

export const useDeals = (params?: DealQueryParams) => {
  return useQuery({
    queryKey: [DEALS_QUERY_KEY, params],
    queryFn: () => dealsApi.getAll(params),
  });
};

export const useDeal = (id: string) => {
  return useQuery({
    queryKey: [DEALS_QUERY_KEY, id],
    queryFn: () => dealsApi.getById(id),
    enabled: !!id,
  });
};

export const useCreateDeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDealInput) => dealsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEALS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Угоду успішно створено");
    },
    onError: (error: ApiError) => {
      const message = Array.isArray(error.message)
        ? error.message.join(", ")
        : error.message || "Помилка при створенні угоди";
      toast.error(message);
    },
  });
};

export const useUpdateDeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDealInput }) =>
      dealsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [DEALS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [DEALS_QUERY_KEY, variables.id],
      });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Угоду успішно оновлено");
    },
    onError: (error: ApiError) => {
      const message = Array.isArray(error.message)
        ? error.message.join(", ")
        : error.message || "Помилка при оновленні угоди";
      toast.error(message);
    },
  });
};

export const useDeleteDeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => dealsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DEALS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Угоду успішно видалено");
    },
    onError: (error: ApiError) => {
      const message = Array.isArray(error.message)
        ? error.message.join(", ")
        : error.message || "Помилка при видаленні угоди";
      toast.error(message);
    },
  });
};
