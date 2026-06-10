"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  RefreshCw,
  MessageSquare,
  LayoutDashboard,
  ExternalLink,
} from "lucide-react";
import ContentAdmin from "./components/ContentAdmin";

interface QuoteRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  message: string | null;
  lang: string;
  status: string;
  created_at: string;
}

type Tab = "content" | "quotes";

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("content");
  const [quotes, setQuotes] = useState<QuoteRow[]>([]);
  const [quotesLoading, setQuotesLoading] = useState(false);

  const fetchQuotes = async () => {
    setQuotesLoading(true);
    try {
      const res = await fetch("/api/admin/quotes");
      if (res.ok) setQuotes(await res.json());
    } finally {
      setQuotesLoading(false);
    }
  };

  useEffect(() => {
    if (tab === "quotes") fetchQuotes();
  }, [tab]);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#040e26] text-white">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#040e26]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Air Waves Comfort"
              className="h-10 w-auto shrink-0 sm:h-12"
            />
            <div className="min-w-0 border-l border-white/10 pl-3">
              <p className="truncate text-sm font-semibold text-white">
                Content Manager
              </p>
              <p className="text-xs text-white/40">Air Waves Comfort</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60 hover:text-white sm:text-sm"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View site
            </a>
            <button
              type="button"
              onClick={logout}
              className="flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl gap-1 border-t border-white/5 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => setTab("content")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              tab === "content"
                ? "border-sky-brand text-sky-brand"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Website Content
          </button>
          <button
            type="button"
            onClick={() => setTab("quotes")}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              tab === "quotes"
                ? "border-sky-brand text-sky-brand"
                : "border-transparent text-white/50 hover:text-white"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            Quote Requests
            {quotes.length > 0 && (
              <span className="rounded-full bg-sky-brand/20 px-2 py-0.5 text-xs text-sky-brand">
                {quotes.filter((q) => q.status === "new").length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
        {tab === "content" && <ContentAdmin />}

        {tab === "quotes" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {[
                { label: "Total", value: quotes.length },
                {
                  label: "New",
                  value: quotes.filter((q) => q.status === "new").length,
                },
                {
                  label: "Contacted",
                  value: quotes.filter((q) => q.status === "contacted").length,
                },
                {
                  label: "Closed",
                  value: quotes.filter((q) => q.status === "closed").length,
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-2xl border border-white/8 p-4 sm:p-5"
                >
                  <p className="text-xs text-white/50">{s.label}</p>
                  <p className="mt-1 font-serif text-2xl font-bold text-sky-brand sm:text-3xl">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="glass overflow-hidden rounded-2xl border border-white/8">
              <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 sm:px-6 sm:py-4">
                <h2 className="font-serif text-lg font-bold">
                  Quote Submissions
                </h2>
                <button
                  type="button"
                  onClick={fetchQuotes}
                  className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Refresh
                </button>
              </div>

              {quotesLoading ? (
                <div className="py-16 text-center text-white/40">
                  Loading…
                </div>
              ) : quotes.length === 0 ? (
                <div className="py-16 text-center text-white/40">
                  No submissions yet.
                </div>
              ) : (
                <>
                  {/* Mobile cards */}
                  <div className="space-y-3 p-4 md:hidden">
                    {quotes.map((q) => (
                      <div
                        key={q.id}
                        className="rounded-xl border border-white/8 bg-white/[0.02] p-4 text-sm"
                      >
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <p className="font-semibold">{q.name}</p>
                          <span
                            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                              q.status === "new"
                                ? "bg-amber-500/15 text-amber-400"
                                : q.status === "contacted"
                                  ? "bg-sky-brand/15 text-sky-brand"
                                  : "bg-green-500/15 text-green-400"
                            }`}
                          >
                            {q.status}
                          </span>
                        </div>
                        <p className="text-white/60">{q.service_type}</p>
                        <p className="mt-1 text-white/50">{q.phone}</p>
                        <p className="text-white/50">{q.email}</p>
                        <p className="mt-2 text-xs text-white/30">
                          {new Date(q.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                  {/* Desktop table */}
                  <div className="hidden overflow-x-auto md:block">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/5">
                          {[
                            "Date",
                            "Name",
                            "Email",
                            "Phone",
                            "Service",
                            "Lang",
                            "Status",
                          ].map((h) => (
                            <th
                              key={h}
                              className="px-6 py-3 text-left text-xs font-medium text-white/40"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {quotes.map((q) => (
                          <tr
                            key={q.id}
                            className="border-b border-white/5 transition-colors hover:bg-white/[0.03]"
                          >
                            <td className="whitespace-nowrap px-6 py-4 text-white/50">
                              {new Date(q.created_at).toLocaleDateString()}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {q.name}
                            </td>
                            <td className="px-6 py-4 text-white/60">
                              {q.email}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 text-white/60">
                              {q.phone}
                            </td>
                            <td className="px-6 py-4 text-white/60">
                              {q.service_type}
                            </td>
                            <td className="px-6 py-4 uppercase text-sky-brand">
                              {q.lang}
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                  q.status === "new"
                                    ? "bg-amber-500/15 text-amber-400"
                                    : q.status === "contacted"
                                      ? "bg-sky-brand/15 text-sky-brand"
                                      : "bg-green-500/15 text-green-400"
                                }`}
                              >
                                {q.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
