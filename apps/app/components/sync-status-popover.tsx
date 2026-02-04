import { useAtom } from "jotai";
import { useTranslation } from "react-i18next";
import { SyncStatusIcon } from "./sync-status-icon";
import { InventoryList } from "./inventory-list";
import { ReportsList } from "./reports-list";
import { Button } from "@repo/ui";
import { RefreshCw } from "lucide-react";
import { syncStatusAtom } from "@/lib/store";

export function SyncStatusPopover() {
  const { t } = useTranslation();
  const [status] = useAtom(syncStatusAtom);

  const statusText = {
    synced: t("syncStatus.lastSynced", { time: "2 minutes ago" }),
    syncing: t("syncStatus.syncing"),
    error: t("syncStatus.error"),
  };

  return (
    <div className="w-80 border bg-background rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <SyncStatusIcon />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{statusText[status]}</p>
          </div>
          {status === "error" && (
            <Button variant="ghost" size="sm">
              <RefreshCw className="h-3 w-3 mr-1" />
              {t("syncStatus.retry")}
            </Button>
          )}
        </div>
      </div>
      <InventoryList />
      <div className="border-t">
        <ReportsList />
      </div>
    </div>
  );
}
