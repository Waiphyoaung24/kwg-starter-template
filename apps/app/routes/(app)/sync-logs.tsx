import { useTranslation } from "react-i18next";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/sync-logs")({
  component: SyncLogs,
});

function SyncLogs() {
  const { t } = useTranslation();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{t("nav.syncLogs")}</h1>
    </div>
  );
}
