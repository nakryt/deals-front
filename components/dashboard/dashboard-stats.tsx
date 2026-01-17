import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Briefcase, TrendingUp, Users } from "lucide-react";

interface DashboardStatsProps {
  totalClients: number;
  totalDeals: number;
  wonDealsCount: number;
  totalAmount: number;
  isLoadingClients: boolean;
  isLoadingDeals: boolean;
}

export function DashboardStats({
  totalClients,
  totalDeals,
  wonDealsCount,
  totalAmount,
  isLoadingClients,
  isLoadingDeals,
}: DashboardStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Всього клієнтів</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoadingClients ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <div className="text-2xl font-bold">{totalClients}</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Всього угод</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoadingDeals ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <div className="text-2xl font-bold">{totalDeals}</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Виграні угоди</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          {isLoadingDeals ? (
            <Skeleton className="h-8 w-20" />
          ) : (
            <div className="text-2xl font-bold text-green-600">
              {wonDealsCount}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Загальна сума</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {isLoadingDeals ? (
            <Skeleton className="h-8 w-32" />
          ) : (
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat("uk-UA", {
                style: "currency",
                currency: "UAH",
                minimumFractionDigits: 0,
              }).format(totalAmount)}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
