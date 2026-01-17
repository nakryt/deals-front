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
import { useCreateDeal } from "@/hooks/useDeals";
import type { CreateDealInput } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { DealForm } from "./deal-form";

interface CreateDealDialogProps {
  clientId?: string;
  trigger?: React.ReactNode;
}

export const CreateDealDialog = ({
  clientId,
  trigger,
}: CreateDealDialogProps) => {
  const [open, setOpen] = useState(false);
  const createDeal = useCreateDeal();

  const handleSubmit = async (data: CreateDealInput) => {
    await createDeal.mutateAsync(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Додати угоду
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Створити угоду</DialogTitle>
          <DialogDescription>
            Заповніть форму для створення нової угоди
          </DialogDescription>
        </DialogHeader>
        <DealForm
          mode="create"
          initialData={
            clientId ? ({ clientId } as Partial<CreateDealInput>) : undefined
          }
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          isLoading={createDeal.isPending}
        />
      </DialogContent>
    </Dialog>
  );
};
