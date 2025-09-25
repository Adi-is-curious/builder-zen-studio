import { useEffect, useState } from "react";
import { Globe2 } from "lucide-react";
import { type Locale, getInitialLocale, tFor } from "@/lib/i18n";

export default function LanguageToggle() {
  const [locale, setLocale] = useState<Locale>("en");
  useEffect(() => setLocale(getInitialLocale()), []);
  const t = tFor(locale);

  const switchLang = () => {
    const next = locale === "en" ? "hi" : "en";
    setLocale(next);
    localStorage.setItem("locale", next);
    window.dispatchEvent(new CustomEvent("locale-changed", { detail: next }));
  };

  return (
    <button
      onClick={switchLang}
      aria-label={t("language")}
      className="inline-flex items-center gap-2 rounded-full border bg-white/80 px-3 py-1 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur hover:bg-white dark:bg-neutral-800 dark:text-neutral-200"
    >
      <Globe2 className="h-4 w-4" />
      <span>{locale === "en" ? t("hindi") : t("english")}</span>
    </button>
  );
}
