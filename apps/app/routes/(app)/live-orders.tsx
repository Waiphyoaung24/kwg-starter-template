import { useTranslation } from "react-i18next";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { Grab } from "lucide-react";

export const Route = createFileRoute("/(app)/live-orders")({
  component: LiveOrders,
});

type OrderStatus = "pending" | "accepted" | "completed";

type Order = {
  id: string;
  customer: string;
  items: string[];
  status: OrderStatus;
};

const initialOrders: Order[] = [
  {
    id: "88A1",
    customer: "John Doe",
    items: ["Chicken Rice", "Coke"],
    status: "pending",
  },
  {
    id: "88A2",
    customer: "Jane Smith",
    items: ["Pad Thai", "Iced Tea"],
    status: "accepted",
  },
  {
    id: "88A3",
    customer: "Peter Jones",
    items: ["Chicken Rice"],
    status: "completed",
  },
];

function LiveOrders() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  useEffect(() => {
    const interval = setInterval(() => {
      const newOrder: Order = {
        id: `88A${orders.length + 1}`,
        customer: "New Customer",
        items: ["Random Item"],
        status: "pending",
      };
      setOrders((prev) => [newOrder, ...prev]);
    }, 5000); // Add a new order every 5 seconds

    return () => clearInterval(interval);
  }, [orders]);

  const columns: { status: OrderStatus; labelKey: string }[] = [
    { status: "pending", labelKey: "liveOrders.pending" },
    { status: "accepted", labelKey: "liveOrders.accepted" },
    { status: "completed", labelKey: "liveOrders.completed" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t("liveOrders.title")}</h1>
      <div className="grid grid-cols-3 gap-6">
        {columns.map((col) => (
          <Card key={col.status}>
            <CardHeader>
              <CardTitle>{t(col.labelKey)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orders
                .filter((order) => order.status === col.status)
                .map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">#{order.id}</span>
                        <Grab className="h-4 w-4" />
                      </div>
                      <p className="text-sm">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.items.join(", ")}
                      </p>
                    </CardContent>
                  </Card>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
