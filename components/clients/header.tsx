import { DeleteClientDialog } from "./delete-client-dialog";
import { EditClientDialog } from "./edit-client-dialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Client } from "@/types";
import { useRouter } from "next/router";

interface HeaderProps {
  client: Client;
}

export const Header = ({ client }: HeaderProps) => {
  const router = useRouter();

  const handleDeleteSuccess = () => {
    router.push("/clients");
  };
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/clients">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
        </div>
        <p className="text-muted-foreground">
          Створено {format(new Date(client.createdAt), "dd.MM.yyyy")}
        </p>
      </div>

      <div className="flex gap-2">
        <EditClientDialog client={client} />
        <DeleteClientDialog
          client={client}
          onDeleteSuccess={handleDeleteSuccess}
        />
      </div>
    </div>
  );
};
