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
import { useDeleteDeal } from "@/hooks/useDeals";
import type { Deal } from "@/types";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteDealDialogProps {
  deal: Deal;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const DeleteDealDialog = ({
  deal,
  trigger,
  open: isOpenProp,
  onOpenChange,
}: DeleteDealDialogProps) => {
  const [isOpenState, setIsOpenState] = useState(false);
  const isControlled = isOpenProp !== undefined;
  const isOpen = isControlled ? isOpenProp : isOpenState;

  const deleteDeal = useDeleteDeal();

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setIsOpenState(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  const handleDelete = async () => {
    await deleteDeal.mutateAsync(deal.id);
    handleOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {!isControlled && (
        <DialogTrigger asChild>
          {trigger || (
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Видалити
            </Button>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Підтвердження видалення
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-2 pt-2">
              <p>
                Ви впевнені, що хочете видалити угоду{" "}
                <span className="font-semibold">{deal.title}</span>?
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={deleteDeal.isPending}
          >
            Скасувати
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteDeal.isPending}
          >
            {deleteDeal.isPending ? "Видалення..." : "Видалити"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
