"use client";

import { ClientsTable } from "@/components/clients/clients-table";
import { CreateClientDialog } from "@/components/clients/create-client-dialog";
import { PaginationControls } from "@/components/common/pagination-controls";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useClients } from "@/hooks/useClients";
import { AlertCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const ClientsContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  const { data, isLoading, error } = useClients({ page, limit });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleItemsPerPageChange = (newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit.toString());
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Помилка</AlertTitle>
          <AlertDescription>
            Не вдалося завантажити клієнтів. Спробуйте оновити сторінку.
          </AlertDescription>
        </Alert>
      )}

      <ClientsTable clients={data?.data || []} isLoading={isLoading} />

      {data?.meta && data.meta.total > 0 && (
        <PaginationControls
          page={data.meta.page}
          totalPages={data.meta.lastPage}
          onPageChange={handlePageChange}
          itemsPerPage={limit}
          onItemsPerPageChange={handleItemsPerPageChange}
          showItemsPerPage
        />
      )}
    </>
  );
};

const ClientsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Клієнти</h1>
          <p className="text-muted-foreground">
            Керуйте вашими клієнтами та їх контактною інформацією
          </p>
        </div>
        <CreateClientDialog />
      </div>

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <ClientsContent />
      </Suspense>
    </div>
  );
};

export default ClientsPage;
