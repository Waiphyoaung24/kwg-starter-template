import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/reports/sales-summary")({
  component: SalesSummaryPage,
});

const salesData = [
  { date: "2024-01-01", sales: 4000, orders: 2400 },
  { date: "2024-01-02", sales: 3000, orders: 1398 },
  { date: "2024-01-03", sales: 2000, orders: 9800 },
  { date: "2024-01-04", sales: 2780, orders: 3908 },
  { date: "2024-01-05", sales: 1890, orders: 4800 },
  { date: "2024-01-06", sales: 2390, orders: 3800 },
  { date: "2024-01-07", sales: 3490, orders: 4300 },
];

function SalesSummaryPage() {
  const { t } = useTranslation();

  const totalRevenue = salesData.reduce((acc, item) => acc + item.sales, 0);
  const totalOrders = salesData.reduce((acc, item) => acc + item.orders, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("reports.salesSummary")}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("reports.totalRevenue")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              ฿{totalRevenue.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("reports.totalOrders")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalOrders.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("reports.averageOrderValue")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              ฿{averageOrderValue.toFixed(2)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("reports.rawData")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("reports.date")}</TableHead>
                <TableHead>{t("reports.sales")}</TableHead>
                <TableHead>{t("reports.orders")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((item) => (
                <TableRow key={item.date}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>฿{item.sales.toLocaleString()}</TableCell>
                  <TableCell>{item.orders.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
