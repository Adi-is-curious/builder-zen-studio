import { NavLink } from "react-router-dom";
import { Home, Megaphone, PlusCircle, User, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { tFor, getInitialLocale, type Locale } from "@/lib/i18n";
import { useEffect, useState } from "react";

export default function BottomNav() {
  const [locale, setLocale] = useState<Locale>("en");
  const [animateReward, setAnimateReward] = useState(false);
  useEffect(() => setLocale(getInitialLocale()), []);
  const t = tFor(locale);

  useEffect(() => {
    const handler = () => {
      setAnimateReward(true);
      setTimeout(() => setAnimateReward(false), 1200);
    };
    window.addEventListener("coins-earned", handler as any);
    return () => window.removeEventListener("coins-earned", handler as any);
  }, []);

  const items = [
    { to: "/", label: t("home"), icon: Home },
    { to: "/report", label: t("report"), icon: PlusCircle },
    { to: "/community", label: t("community"), icon: Megaphone },
    { to: "/redeem", label: t("rewards"), icon: Trophy },
    { to: "/profile", label: t("profile"), icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:bg-neutral-900/80 dark:supports-[backdrop-filter]:bg-neutral-900/60">
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 py-1">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              className={({ isActive }) =>
                cn(
                  "group flex flex-col items-center justify-center gap-1 rounded-md px-2 py-2 text-xs font-medium text-neutral-600 transition-colors hover:text-primary dark:text-neutral-300",
                  isActive &&
                    "text-primary dark:text-primary border border-transparent bg-primary/10 dark:bg-primary/15",
                )
              }
              end={to === "/"}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
