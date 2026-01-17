import { Client } from "@/types";
import Link from "next/link";

interface BreadcrumbsProps {
  client: Client;
}

export const Breadcrumbs = ({ client }: BreadcrumbsProps) => {
  return (
    <nav className="flex items-center text-sm text-muted-foreground">
      <Link href="/clients" className="hover:text-foreground">
        Клієнти
      </Link>
      <span className="mx-2">/</span>
      <span className="text-foreground">{client.name}</span>
    </nav>
  );
};
