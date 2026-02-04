import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import type { NavSection } from "./constants";

interface SidebarNavProps {
  sections: NavSection[];
}

export function SidebarNav({ sections }: SidebarNavProps) {
  const { t } = useTranslation();

  return (
    <nav className="flex-1 p-4 space-y-4">
      {sections.map((section) => (
        <div key={section.titleKey}>
          <h3 className="text-xs font-semibold uppercase text-muted-foreground px-3 mb-2">
            {t(section.titleKey)}
          </h3>
          <div className="space-y-1">
            {section.items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                activeProps={{
                  className: "bg-accent text-accent-foreground",
                }}
              >
                <item.icon className="h-4 w-4" />
                <span>{t(item.labelKey)}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}
