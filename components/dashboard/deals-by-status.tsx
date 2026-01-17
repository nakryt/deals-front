import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface DealsByStatusProps {
  stats: {
    new: number;
    inProgress: number;
    won: number;
    lost: number;
  };
  isLoading: boolean;
}

export function DealsByStatus({ stats, isLoading }: DealsByStatusProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Угоди за статусами</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Нові</p>
              <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                В роботі
              </p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.inProgress}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Виграні
              </p>
              <p className="text-2xl font-bold text-green-600">{stats.won}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Програні
              </p>
              <p className="text-2xl font-bold text-red-600">{stats.lost}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
