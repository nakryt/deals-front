import { QuickLinks } from "./dashboard/quick-links";
import { useClients } from "@/hooks/useClients";
import { useDeals } from "@/hooks/useDeals";
import { DealStatus } from "@/types";
import { DashboardStats } from "./dashboard/dashboard-stats";
import { DealsByStatus } from "./dashboard/deals-by-status";

export const DashboardContent = () => {
  const { data: clientsData, isLoading: isLoadingClients } = useClients({
    limit: 1,
  });
  const { data: dealsData, isLoading: isLoadingDeals } = useDeals({
    limit: 100,
  });

  const totalClients = clientsData?.meta.total || 0;
  const totalDeals = dealsData?.meta.total || 0;

  const dealsByStatus = {
    new: dealsData?.data.filter((d) => d.status === DealStatus.NEW).length || 0,
    inProgress:
      dealsData?.data.filter((d) => d.status === DealStatus.IN_PROGRESS)
        .length || 0,
    won: dealsData?.data.filter((d) => d.status === DealStatus.WON).length || 0,
    lost:
      dealsData?.data.filter((d) => d.status === DealStatus.LOST).length || 0,
  };

  const totalAmount =
    dealsData?.data
      .filter((d) => d.status === DealStatus.WON)
      .reduce((sum, deal) => sum + Number(deal.amount), 0) || 0;

  return (
    <div className="space-y-8">
      <DashboardStats
        totalClients={totalClients}
        totalDeals={totalDeals}
        wonDealsCount={dealsByStatus.won}
        totalAmount={totalAmount}
        isLoadingClients={isLoadingClients}
        isLoadingDeals={isLoadingDeals}
      />
      <DealsByStatus stats={dealsByStatus} isLoading={isLoadingDeals} />
      <QuickLinks />
    </div>
  );
};
