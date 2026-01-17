"use client";

import { DashboardContent } from "@/components/dashboard-content";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Огляд вашої CRM системи</p>
      </div>

      <Suspense
        fallback={
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }, (_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
            <Skeleton className="h-64 w-full" />
            <div className="grid gap-4 md:grid-cols-2">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        }
      >
        <DashboardContent />
      </Suspense>
    </div>
  );
}
