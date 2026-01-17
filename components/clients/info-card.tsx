import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Client } from "@/types";
import { format } from "date-fns";
import { Calendar, Mail, Phone } from "lucide-react";

interface InfoCardProps {
  client: Client;
}

export const InfoCard = ({ client }: InfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Контактна інформація</CardTitle>
        <CardDescription>Основні дані про клієнта</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">
                <a href={`mailto:${client.email}`} className="hover:underline">
                  {client.email}
                </a>
              </p>
            </div>
          </div>

          {client.phone && (
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Телефон</p>
                <p className="text-sm text-muted-foreground">
                  <a href={`tel:${client.phone}`} className="hover:underline">
                    {client.phone}
                  </a>
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Дата створення</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(client.createdAt), "dd MMMM yyyy, HH:mm", {
                  locale: undefined,
                })}
              </p>
            </div>
          </div>

          {client.updatedAt !== client.createdAt && (
            <div className="flex items-start gap-3">
              <Calendar className="mt-0.5 h-5 w-5 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Останнє оновлення</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(client.updatedAt), "dd MMMM yyyy, HH:mm", {
                    locale: undefined,
                  })}
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
