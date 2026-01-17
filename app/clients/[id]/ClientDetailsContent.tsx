"use client";

import { Breadcrumbs } from "@/components/clients/breadcrumbs";
import { Deals } from "@/components/clients/deals";
import { Header } from "@/components/clients/header";
import { InfoCard } from "@/components/clients/info-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useClient, useDeleteClient } from "@/hooks/useClients";
import { useDeals } from "@/hooks/useDeals";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const ClientDetailsContent = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data: client, isLoading, error } = useClient(id);
  const {
    data: dealsData,
    isLoading: dealsLoading,
    error: dealsError,
  } = useDeals({ clientId: id });
  const _deleteClient = useDeleteClient();

  const handleDeleteSuccess = () => {
    router.push("/clients");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" asChild>
          <Link href="/clients">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад до клієнтів
          </Link>
        </Button>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Помилка</AlertTitle>
          <AlertDescription>
            Не вдалося завантажити клієнта. Можливо, клієнт не існує або був
            видалений.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" asChild>
          <Link href="/clients">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад до клієнтів
          </Link>
        </Button>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Клієнта не знайдено</AlertTitle>
          <AlertDescription>
            Клієнт з таким ID не існує або був видалений.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const deals = dealsData?.data || [];

  return (
    <div className="space-y-6">
      <Breadcrumbs client={client} />

      <Header client={client} />

      <InfoCard client={client} />

      {/* Deals Section */}
      <Deals
        id={id}
        deals={deals}
        dealsLoading={dealsLoading}
        dealsError={dealsError}
      />
    </div>
  );
};
