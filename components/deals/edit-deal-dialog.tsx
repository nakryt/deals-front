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
import { useUpdateDeal } from "@/hooks/useDeals";
import type { CreateDealInput, Deal } from "@/types";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { DealForm } from "./deal-form";

interface EditDealDialogProps {
  deal: Deal;
  trigger?: React.ReactNode;
}

export const EditDealDialog = ({ deal, trigger }: EditDealDialogProps) => {
  const [open, setOpen] = useState(false);
  const updateDeal = useUpdateDeal();

  const handleSubmit = async (data: CreateDealInput) => {
    await updateDeal.mutateAsync({ id: deal.id, data });
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
          <DialogTitle>Редагувати угоду</DialogTitle>
          <DialogDescription>
            Внесіть зміни в інформацію про угоду
          </DialogDescription>
        </DialogHeader>
        <DealForm
          mode="edit"
          initialData={deal}
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
          isLoading={updateDeal.isPending}
        />
      </DialogContent>
    </Dialog>
  );
};
