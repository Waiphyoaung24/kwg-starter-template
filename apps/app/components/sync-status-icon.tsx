import { useAtom } from "jotai";
import { Cloud, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { syncStatusAtom } from "@/lib/store";

export function SyncStatusIcon() {
  const [status] = useAtom(syncStatusAtom);

  const iconClassName = "h-5 w-5";
  const overlayClassName = "h-3 w-3 absolute -bottom-1 -right-1";

  return (
    <div className="relative">
      <Cloud className={iconClassName} />
      {status === "synced" && (
        <CheckCircle className={`${overlayClassName} text-green-500`} />
      )}
      {status === "syncing" && (
        <RefreshCw
          className={`${overlayClassName} text-blue-500 animate-spin`}
        />
      )}
      {status === "error" && (
        <AlertTriangle className={`${overlayClassName} text-red-500`} />
      )}
    </div>
  );
}
