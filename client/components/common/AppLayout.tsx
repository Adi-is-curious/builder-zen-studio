import { ReactNode, useEffect, useState } from "react";
import BottomNav from "./BottomNav";
import LanguageToggle from "./LanguageToggle";
import { type Locale, getInitialLocale, tFor } from "@/lib/i18n";

export default function AppLayout({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");
  const [version, setVersion] = useState(0);
  useEffect(() => {
    setLocale(getInitialLocale());
    const handler = (e: any) => {
      setLocale(e.detail);
      setVersion((v) => v + 1);
    };
    window.addEventListener("locale-changed", handler as any);
    return () => window.removeEventListener("locale-changed", handler as any);
  }, []);
  const t = tFor(locale);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20 pb-16">
      <header className="sticky top-0 z-20 border-b bg-white/90 px-4 py-3 backdrop-blur dark:bg-neutral-900/80">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary" aria-hidden />
            <div>
              <div className="text-sm font-semibold tracking-wide text-primary uppercase">{t("app_name")}</div>
              <div className="text-[10px] text-neutral-500">Government of Jharkhand</div>
            </div>
          </div>
          <LanguageToggle key={version} />
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-4">{children}</main>
      <BottomNav />
    </div>
  );
}
