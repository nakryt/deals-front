"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import { ClientDetailsContent } from "./ClientDetailsContent";

const ClientDetailsPage = () => {
  const params = useParams();
  const id = params.id as string;

  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      }
    >
      <ClientDetailsContent id={id} />
    </Suspense>
  );
};

export default ClientDetailsPage;
