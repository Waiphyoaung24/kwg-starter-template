import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "th", label: "TH", flag: "🇹🇭" },
] as const;

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  const currentLanguage =
    languages.find((l) => l.code === i18n.language) ?? languages[0];

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[100px]">
        <Globe className="h-4 w-4 mr-2" />
        <SelectValue>
          {currentLanguage.flag} {currentLanguage.label}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.flag} {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
