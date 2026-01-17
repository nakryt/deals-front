import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DealsTable } from "../deals/deals-table";
import { CreateDealDialog } from "../deals/create-deal-dialog";
import { Deal } from "@/types";

interface DealsProps {
  id: string;
  deals: Deal[];
  dealsLoading: boolean;
  dealsError: Error | null;
}

export const Deals = ({ id, deals, dealsLoading, dealsError }: DealsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Угоди</h2>
          <p className="text-muted-foreground">
            Угоди, пов'язані з цим клієнтом
          </p>
        </div>
        <CreateDealDialog clientId={id} />
      </div>

      {dealsError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Помилка</AlertTitle>
          <AlertDescription>
            Не вдалося завантажити угоди. Спробуйте оновити сторінку.
          </AlertDescription>
        </Alert>
      )}

      <DealsTable deals={deals} isLoading={dealsLoading} />
    </div>
  );
};
