"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClients } from "@/hooks/useClients";
import { dealSchema } from "@/lib/validations";
import { type CreateDealInput, DealStatus } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface DealFormProps {
  mode: "create" | "edit";
  initialData?: Partial<CreateDealInput>;
  onSubmit: (data: CreateDealInput) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

const statusOptions = [
  { value: DealStatus.NEW, label: "Нова" },
  { value: DealStatus.IN_PROGRESS, label: "В роботі" },
  { value: DealStatus.WON, label: "Виграна" },
  { value: DealStatus.LOST, label: "Програна" },
];

export const DealForm = ({
  mode,
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: DealFormProps) => {
  const { data: clientsData, isLoading: isLoadingClients } = useClients({
    limit: 100,
  });

  const form = useForm<CreateDealInput>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      title: initialData?.title || "",
      amount: initialData?.amount || 0,
      status: initialData?.status || DealStatus.NEW,
      clientId: initialData?.clientId || "",
    },
  });

  const getSubmitButtonText = () => {
    if (isLoading) return "Збереження...";
    return mode === "create" ? "Створити" : "Зберегти";
  };

  const renderClientOptions = () => {
    if (isLoadingClients) {
      return (
        <SelectItem value="loading" disabled>
          Завантаження...
        </SelectItem>
      );
    }

    if (clientsData?.data && clientsData.data.length > 0) {
      return clientsData.data.map((client) => (
        <SelectItem key={client.id} value={client.id}>
          {client.name} ({client.email})
        </SelectItem>
      ));
    }

    return (
      <SelectItem value="empty" disabled>
        Немає доступних клієнтів
      </SelectItem>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Назва угоди</FormLabel>
              <FormControl>
                <Input placeholder="Введіть назву угоди" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Сума</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Статус</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Виберіть статус" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="clientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Клієнт</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={mode === "edit" || isLoadingClients}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Виберіть клієнта" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>{renderClientOptions()}</SelectContent>
              </Select>
              <FormMessage />
              {mode === "edit" && (
                <p className="text-sm text-muted-foreground">
                  Клієнта не можна змінити при редагуванні
                </p>
              )}
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Скасувати
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading || isLoadingClients}
          >
            {getSubmitButtonText()}
          </Button>
        </div>
      </form>
    </Form>
  );
};
