import { useTranslation } from "react-i18next";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/reports/")({
  component: ReportsPage,
});

function ReportsPage() {
  const { t } = useTranslation();
  return (
    <div className="p-12 text-center">
      <h1 className="text-2xl font-bold mb-4">{t("reports.title")}</h1>
      <p className="text-muted-foreground">{t("reports.selectReport")}</p>
    </div>
  );
}
