import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

const mockReports = [
  { id: "1", labelKey: "reports.salesSummary", to: "/reports/sales-summary" },
  { id: "2", labelKey: "reports.stockLevels", to: "/reports/stock-levels" },
  {
    id: "3",
    labelKey: "reports.monthlyRevenue",
    to: "/reports/monthly-revenue",
  },
];

export function ReportsList() {
  const { t } = useTranslation();
  return (
    <div className="p-4">
      <h3 className="text-xs font-semibold uppercase text-muted-foreground px-3 mb-4 tracking-wider">
        {t("reports.title")}
      </h3>
      <div className="space-y-1">
        {mockReports.map((report) => (
          <Link
            key={report.id}
            to={report.to}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            activeProps={{
              className: "bg-accent text-accent-foreground",
            }}
          >
            {t(report.labelKey)}
          </Link>
        ))}
      </div>
    </div>
  );
}
