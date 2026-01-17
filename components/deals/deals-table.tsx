"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { type Deal, DealStatus } from "@/types";
import { format } from "date-fns";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DeleteDealDialog } from "./delete-deal-dialog";

interface DealsTableProps {
  deals: Deal[];
  isLoading?: boolean;
}

const statusConfig = {
  [DealStatus.NEW]: {
    label: "Нова",
    className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  },
  [DealStatus.IN_PROGRESS]: {
    label: "В роботі",
    className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  },
  [DealStatus.WON]: {
    label: "Виграна",
    className: "bg-green-100 text-green-800 hover:bg-green-100",
  },
  [DealStatus.LOST]: {
    label: "Програна",
    className: "bg-red-100 text-red-800 hover:bg-red-100",
  },
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency: "UAH",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const DealsTable = ({ deals, isLoading }: DealsTableProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const handleDeleteClick = (deal: Deal) => {
    setSelectedDeal(deal);
    setDeleteDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (!deals || deals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
        <h3 className="text-lg font-semibold">Угод не знайдено</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Почніть з створення нової угоди
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Назва</TableHead>
            <TableHead>Сума</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Клієнт</TableHead>
            <TableHead>Дата створення</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deals.map((deal) => (
            <TableRow key={deal.id}>
              <TableCell className="font-medium">{deal.title}</TableCell>
              <TableCell className="font-mono">
                {formatCurrency(Number(deal.amount))}
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={cn(statusConfig[deal.status].className)}
                >
                  {statusConfig[deal.status].label}
                </Badge>
              </TableCell>
              <TableCell>
                {deal.client ? (
                  <Link
                    href={`/clients/${deal.clientId}`}
                    className="text-primary hover:underline"
                  >
                    {deal.client.name}
                  </Link>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell>
                {format(new Date(deal.createdAt), "dd.MM.yyyy")}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Відкрити меню</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Дії</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/deals/${deal.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        Переглянути
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/deals/${deal.id}/edit`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Редагувати
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteClick(deal);
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Видалити
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedDeal && (
        <DeleteDealDialog
          deal={selectedDeal}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        />
      )}
    </div>
  );
};
