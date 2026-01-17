import { z } from "zod";
import { DealStatus } from "@/types";

export const clientSchema = z.object({
  name: z.string().min(1, "Ім'я не може бути порожнім").max(255),
  email: z.string().email("Невірний формат email"),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Невірний формат телефону")
    .optional()
    .or(z.literal("")),
});

export const updateClientSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  email: z.string().email().optional(),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/)
    .optional()
    .or(z.literal("")),
});

export const dealSchema = z.object({
  title: z.string().min(1, "Назва угоди не може бути порожньою").max(255),
  amount: z.number().positive("Сума повинна бути додатною").max(999999999),
  status: z.nativeEnum(DealStatus),
  clientId: z.string().uuid("Невірний формат ID клієнта"),
});

export const updateDealSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  amount: z.number().positive().max(999999999).optional(),
  status: z.nativeEnum(DealStatus).optional(),
  clientId: z.string().uuid().optional(),
});

export type ClientFormData = z.infer<typeof clientSchema>;
export type UpdateClientFormData = z.infer<typeof updateClientSchema>;
export type DealFormData = z.infer<typeof dealSchema>;
export type UpdateDealFormData = z.infer<typeof updateDealSchema>;
