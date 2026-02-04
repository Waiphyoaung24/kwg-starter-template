import { Outlet, createFileRoute } from "@tanstack/react-router";
import { ReportsList } from "@/components/reports-list";

export const Route = createFileRoute("/(app)/reports")({
  component: ReportsLayout,
});

function ReportsLayout() {
  return (
    <div className="flex h-full">
      <aside className="w-64 border-r bg-muted/20 overflow-y-auto shrink-0">
        <ReportsList />
      </aside>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
