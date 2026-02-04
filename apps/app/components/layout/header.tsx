import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import { CheckCircle, Menu, X, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../language-switcher";
import { TabBarItem } from "../tab-bar-item";

interface HeaderProps {
  isSidebarOpen: boolean;
  onMenuToggle: () => void;
}

export function Header({ isSidebarOpen, onMenuToggle }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="h-14 border-b bg-background flex items-center px-4 gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuToggle}
        className="shrink-0"
      >
        {isSidebarOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      <div className="flex-1 flex items-center gap-4">
        <Select>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder={t("header.selectBranch")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="siam">Siam Paragon Branch</SelectItem>
            <SelectItem value="thonglo">Thong Lo Branch</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className="text-sm font-medium">{t("platforms.wongnai")}</span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="h-5 w-5 text-red-500" />
          <span className="text-sm font-medium">{t("platforms.grab")}</span>
        </div>
        <TabBarItem />
        <LanguageSwitcher />
      </div>
    </header>
  );
}
