import { useTranslation } from "react-i18next";
import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";

export const Route = createFileRoute("/(app)/reports/stock-levels")({
  component: StockLevelsPage,
});

function StockLevelsPage() {
  const { t } = useTranslation();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{t("reports.stockLevels")}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{t("reports.stockLevels")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Stock levels report coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
