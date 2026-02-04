import { atom } from "jotai";

// Atom for controlling the visibility of the sync status popover
export const syncStatusPopoverOpenAtom = atom(false);

// Atom for the current sync status
export type SyncStatus = "synced" | "syncing" | "error";
export const syncStatusAtom = atom<SyncStatus>("synced");
