import { useEffect, useMemo, useState } from "react";
import React, { useEffect, useMemo, useState } from "react";
import AppLayout from "@/components/common/AppLayout";
import { tFor, getInitialLocale, type Locale } from "@/lib/i18n";
import { Link } from "react-router-dom";
import { MapPinned } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

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
  const shouldReduceMotion = useReducedMotion();

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
      role="status"
      aria-label={`status-${s}`}
    >
      {s === "pending"
        ? t("status_pending")
        : s === "inprogress"
        ? t("status_inprogress")
        : t("status_resolved")}
    </span>
  );

  const achievements = [
    {
      id: "a1",
      title: "Road Fixed in Kanke",
      desc: "Local community validated a repair near Kanke market.",
      impact: "Reduced travel time by 20%",
    },
    {
      id: "a2",
      title: "Streetlights Restored",
      desc: "Citizens reported multiple faulty lights; repairs completed.",
      impact: "Improved safety at night",
    },
    {
      id: "a3",
      title: "Clean-up Drive",
      desc: "Community-led initiative cleared the drainage issue.",
      impact: "Reduced flooding in monsoon",
    },
  ];

  return (
    <AppLayout>
      <section className="space-y-5">
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 6 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl bg-gradient-to-br from-primary/90 to-primary p-4 text-primary-foreground shadow-lg"
          role="region"
          aria-label="intro"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center" aria-hidden>
                  <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg font-bold leading-tight">{t("welcome_title")}</h1>
                  <p className="mt-1 text-xs opacity-90">{t("welcome_sub")}</p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Link
                  aria-label="Report an issue"
                  className="rounded-md bg-white px-3 py-2 text-xs font-semibold text-primary shadow hover:bg-white/90"
                  to="/report"
                >
                  {t("report_issue")}
                </Link>
                <Link
                  aria-label="View map"
                  className="rounded-md border border-white/30 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
                  to="/report"
                >
                  {t("view_map")}
                </Link>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <span className="rounded-full bg-white/10 px-2 py-1 text-[11px] text-white">Official</span>
              <span className="mt-2 text-[12px] text-white/80">Government of Jharkhand</span>
            </div>
          </div>
        </motion.div>

        {/* Achievements / Surveys */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold">{t("achievements")}</h2>
            <Link to="/community" className="text-xs font-medium text-primary">See all</Link>
          </div>

          <div className="-mx-4 overflow-x-auto px-4">
            <div className="flex gap-3">
              {achievements.map((a) => (
                <motion.article
                  key={a.id}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 6 }}
                  animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="min-w-[220px] flex-shrink-0 rounded-xl border bg-white p-3 shadow-sm"
                  aria-labelledby={`ach-${a.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold" id={`ach-${a.id}`}>{a.title}</div>
                    <div className="text-xs text-neutral-400">{a.impact}</div>
                  </div>
                  <div className="mt-2 text-xs text-neutral-600">{a.desc}</div>
                  <div className="mt-3 flex items-center gap-2">
                    <button className="rounded-md border px-3 py-1 text-xs">Read</button>
                    <button className="rounded-md bg-primary px-3 py-1 text-xs text-primary-foreground">Share</button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold">{t("my_issues")}</h2>
            <Link to="/report" className="text-xs font-medium text-primary">+ {t("report_issue")}</Link>
          </div>
          <ul className="space-y-2">
            {issues.map((it) => (
              <li key={it.id} className="rounded-lg border bg-white p-3 shadow-sm dark:bg-neutral-900">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{it.title}</div>
                    <div className="text-xs text-neutral-500">{it.category} • {it.area}</div>
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
