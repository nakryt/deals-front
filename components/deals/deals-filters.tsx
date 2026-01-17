"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClients } from "@/hooks/useClients";
import { DealStatus } from "@/types";
import { X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const statusOptions = [
  { value: "all", label: "Всі статуси" },
  { value: DealStatus.NEW, label: "Нова" },
  { value: DealStatus.IN_PROGRESS, label: "В роботі" },
  { value: DealStatus.WON, label: "Виграна" },
  { value: DealStatus.LOST, label: "Програна" },
];

export const DealsFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: clientsData } = useClients({ limit: 100 });

  const currentStatus = searchParams.get("status") || "all";
  const currentClientId = searchParams.get("clientId") || "all";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    router.push(pathname);
  };

  const hasActiveFilters = currentStatus !== "all" || currentClientId !== "all";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={currentStatus}
        onValueChange={(value) => updateFilter("status", value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Статус" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={currentClientId}
        onValueChange={(value) => updateFilter("clientId", value)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Клієнт" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Всі клієнти</SelectItem>
          {clientsData?.data.map((client) => (
            <SelectItem key={client.id} value={client.id}>
              {client.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="h-10"
        >
          <X className="mr-2 h-4 w-4" />
          Скинути фільтри
        </Button>
      )}
    </div>
  );
};
