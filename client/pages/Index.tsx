import { useEffect, useMemo, useState } from "react";
import AppLayout from "@/components/common/AppLayout";
import { tFor, getInitialLocale, type Locale } from "@/lib/i18n";
import { Link } from "react-router-dom";
import {
  MapPinned,
  ShieldCheck,
  AlertTriangle,
  BadgeCheck,
} from "lucide-react";

interface Issue {
  id: string;
  title: string;
  status: "pending" | "inprogress" | "resolved";
  category: string;
  area: string;
}

export default function Index() {
  const [locale, setLocale] = useState<Locale>("en");
  useEffect(() => {
    setLocale(getInitialLocale());
    const handler = (e: any) => setLocale(e.detail);
    window.addEventListener("locale-changed", handler as any);
    return () => window.removeEventListener("locale-changed", handler as any);
  }, []);
  const t = tFor(locale);

  const issues: Issue[] = useMemo(
    () => [
      {
        id: "1",
        title: t("pothole"),
        status: "pending",
        category: t("pothole"),
        area: "Ranchi",
      },
      {
        id: "2",
        title: t("garbage"),
        status: "inprogress",
        category: t("garbage"),
        area: "Dhanbad",
      },
      {
        id: "3",
        title: t("streetlight"),
        status: "resolved",
        category: t("streetlight"),
        area: "Jamshedpur",
      },
    ],
    [locale],
  );

  const statusBadge = (s: Issue["status"]) => (
    <span
      className={
        s === "pending"
          ? "rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800"
          : s === "inprogress"
            ? "rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-semibold text-sky-800"
            : "rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800"
      }
    >
      {s === "pending"
        ? t("status_pending")
        : s === "inprogress"
          ? t("status_inprogress")
          : t("status_resolved")}
    </span>
  );

  return (
    <AppLayout>
      <section className="space-y-4">
        <div className="rounded-xl bg-gradient-to-br from-primary/90 to-primary p-4 text-primary-foreground shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-lg font-bold leading-tight">
                {t("welcome_title")}
              </h1>
              <p className="mt-1 text-xs opacity-90">{t("welcome_sub")}</p>
              <div className="mt-3 flex gap-2">
                <Link
                  className="rounded-md bg-white px-3 py-2 text-xs font-semibold text-primary shadow hover:bg-white/90"
                  to="/report"
                >
                  {t("report_issue")}
                </Link>
                <Link
                  className="rounded-md border border-white/30 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
                  to="/report"
                >
                  {t("view_map")}
                </Link>
              </div>
            </div>
            <div className="hidden h-16 w-16 shrink-0 rounded-lg bg-white/15 sm:block" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card
            title="Secure"
            icon={<ShieldCheck className="h-4 w-4 text-primary" />}
          >
            OTP login, privacy-first.
          </Card>
          <Card
            title="Fast"
            icon={<AlertTriangle className="h-4 w-4 text-amber-600" />}
          >
            One-tap urgency.
          </Card>
          <Card
            title="Maps"
            icon={<MapPinned className="h-4 w-4 text-sky-600" />}
          >
            OSM/MapTiler.
          </Card>
          <Card
            title="Trust"
            icon={<BadgeCheck className="h-4 w-4 text-emerald-700" />}
          >
            Community verify.
          </Card>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold">{t("my_issues")}</h2>
            <Link to="/report" className="text-xs font-medium text-primary">
              + {t("report_issue")}
            </Link>
          </div>
          <ul className="space-y-2">
            {issues.map((it) => (
              <li
                key={it.id}
                className="rounded-lg border bg-white p-3 shadow-sm dark:bg-neutral-900"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{it.title}</div>
                    <div className="text-xs text-neutral-500">
                      {it.category} • {it.area}
                    </div>
                  </div>
                  {statusBadge(it.status)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </AppLayout>
  );
}

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border bg-white p-3 shadow-sm dark:bg-neutral-900">
      <div className="flex items-center gap-2">
        {icon}
        <div className="text-xs font-semibold">{title}</div>
      </div>
      <div className="mt-1 text-[11px] text-neutral-500">{children}</div>
    </div>
  );
}
