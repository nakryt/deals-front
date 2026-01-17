"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteClient } from "@/hooks/useClients";
import type { Client } from "@/types";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteClientDialogProps {
  client: Client;
  trigger?: React.ReactNode;
  onDeleteSuccess?: () => void;
}

export const DeleteClientDialog = ({
  client,
  trigger,
  onDeleteSuccess,
}: DeleteClientDialogProps) => {
  const [open, setOpen] = useState(false);
  const deleteClient = useDeleteClient();

  const handleDelete = async () => {
    await deleteClient.mutateAsync(client.id);
    setOpen(false);
    if (onDeleteSuccess) {
      onDeleteSuccess();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="destructive" size="sm">
            <Trash2 className="mr-2 h-4 w-4" />
            Видалити
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Підтвердження видалення
          </DialogTitle>
          <DialogDescription className="space-y-2 pt-2">
            <p>
              Ви впевнені, що хочете видалити клієнта{" "}
              <span className="font-semibold">{client.name}</span>?
            </p>
            <p className="text-sm text-muted-foreground">
              <AlertTriangle className="inline h-4 w-4 mr-1" />
              Увага: Всі пов'язані угоди також будуть видалені. Цю дію не можна
              скасувати.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={deleteClient.isPending}
          >
            Скасувати
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteClient.isPending}
          >
            {deleteClient.isPending ? "Видалення..." : "Видалити"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
