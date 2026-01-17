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
import { useUpdateClient } from "@/hooks/useClients";
import type { Client, UpdateClientInput } from "@/types";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { ClientForm } from "./client-form";

interface EditClientDialogProps {
  client: Client;
  trigger?: React.ReactNode;
}

export const EditClientDialog = ({
  client,
  trigger,
}: EditClientDialogProps) => {
  const [open, setOpen] = useState(false);
  const updateClient = useUpdateClient();

  const handleSubmit = async (data: UpdateClientInput) => {
    await updateClient.mutateAsync({ id: client.id, data });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Pencil className="mr-2 h-4 w-4" />
            Редагувати
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Редагувати клієнта</DialogTitle>
          <DialogDescription>
            Внесіть зміни в інформацію про клієнта
          </DialogDescription>
        </DialogHeader>
        <ClientForm
          mode="edit"
          initialData={client}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          isLoading={updateClient.isPending}
        />
      </DialogContent>
    </Dialog>
  );
};
