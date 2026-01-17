"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateClient } from "@/hooks/useClients";
import type { CreateClientInput } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ClientForm } from "./client-form";

export const CreateClientDialog = () => {
  const [open, setOpen] = useState(false);
  const createClient = useCreateClient();

  const handleSubmit = async (data: CreateClientInput) => {
    await createClient.mutateAsync(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Додати клієнта
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Створити клієнта</DialogTitle>
          <DialogDescription>
            Заповніть форму для створення нового клієнта
          </DialogDescription>
        </DialogHeader>
        <ClientForm
          mode="create"
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          isLoading={createClient.isPending}
        />
      </DialogContent>
    </Dialog>
  );
};
