"use client";

import { PaginationControls } from "@/components/common/pagination-controls";
import { CreateDealDialog } from "@/components/deals/create-deal-dialog";
import { DealsFilters } from "@/components/deals/deals-filters";
import { DealsTable } from "@/components/deals/deals-table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeals } from "@/hooks/useDeals";
import type { DealStatus } from "@/types";
import { AlertCircle } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const DealsContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const statusParam = searchParams.get("status");
  const clientIdParam = searchParams.get("clientId");

  const queryParams = {
    page,
    limit,
    ...(statusParam && statusParam !== "all"
      ? { status: statusParam as DealStatus }
      : {}),
    ...(clientIdParam && clientIdParam !== "all"
      ? { clientId: clientIdParam }
      : {}),
  };

  const { data, isLoading, error } = useDeals(queryParams);

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
      <DealsFilters />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Помилка</AlertTitle>
          <AlertDescription>
            Не вдалося завантажити угоди. Спробуйте оновити сторінку.
          </AlertDescription>
        </Alert>
      )}

      <DealsTable deals={data?.data || []} isLoading={isLoading} />

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

const DealsPage = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Угоди</h1>
          <p className="text-muted-foreground">
            Керуйте вашими угодами та відстежуйте їх статус
          </p>
        </div>
        <CreateDealDialog />
      </div>

      <Suspense
        fallback={
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-96 w-full" />
          </div>
        }
      >
        <DealsContent />
      </Suspense>
    </div>
  );
};

export default DealsPage;
