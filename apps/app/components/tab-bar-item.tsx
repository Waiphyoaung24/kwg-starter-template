import { useRef, useEffect } from "react";
import { useAtom } from "jotai";
import { SyncStatusIcon } from "./sync-status-icon";
import { SyncStatusPopover } from "./sync-status-popover";
import {
  syncStatusAtom,
  syncStatusPopoverOpenAtom,
  type SyncStatus,
} from "@/lib/store";

export function TabBarItem() {
  const [isPopoverOpen, setIsPopoverOpen] = useAtom(syncStatusPopoverOpenAtom);
  const [, setStatus] = useAtom(syncStatusAtom);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => setIsPopoverOpen(!isPopoverOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverRef, setIsPopoverOpen]);

  // Cycle through statuses for demonstration purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus((prevStatus: SyncStatus) => {
        if (prevStatus === "synced") return "syncing";
        if (prevStatus === "syncing") return "error";
        return "synced";
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [setStatus]);

  return (
    <div className="relative" ref={popoverRef}>
      <button onClick={togglePopover}>
        <SyncStatusIcon />
      </button>
      {isPopoverOpen && (
        <div className="absolute bottom-full mb-2 right-0 z-50">
          <SyncStatusPopover />
        </div>
      )}
    </div>
  );
}
