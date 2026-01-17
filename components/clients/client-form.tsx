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
import { clientSchema } from "@/lib/validations";
import type { Client, CreateClientInput } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface ClientFormProps {
  mode: "create" | "edit";
  initialData?: Client;
  onSubmit: (data: CreateClientInput) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

export const ClientForm = ({
  mode,
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: ClientFormProps) => {
  const form = useForm<CreateClientInput>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
    },
  });

  const getSubmitButtonText = () => {
    if (isLoading) return "Збереження...";
    return mode === "create" ? "Створити" : "Зберегти";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ім'я</FormLabel>
              <FormControl>
                <Input placeholder="Введіть ім'я клієнта" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="client@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Телефон (необов'язково)</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="+380501234567"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
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
          <Button type="submit" disabled={isLoading}>
            {getSubmitButtonText()}
          </Button>
        </div>
      </form>
    </Form>
  );
};
