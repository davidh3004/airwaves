"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, RefreshCw, Save, Database, MessageSquare } from "lucide-react";

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

export default function AdminDashboard() {
  const router = useRouter();
  const [quotes, setQuotes] = useState<QuoteRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/quotes");
      if (res.ok) setQuotes(await res.json());
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#040e26] text-white">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Air Waves Comfort" className="h-8 w-auto" />
          <span className="text-sm text-white/50 border-l border-white/10 pl-3">Admin</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Total Quotes", value: quotes.length, icon: MessageSquare },
            { label: "New", value: quotes.filter((q) => q.status === "new").length, icon: Database },
            { label: "Contacted", value: quotes.filter((q) => q.status === "contacted").length, icon: Save },
            { label: "Closed", value: quotes.filter((q) => q.status === "closed").length, icon: RefreshCw },
          ].map((s) => (
            <div key={s.label} className="glass border border-white/8 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <s.icon className="w-4 h-4 text-sky-brand" />
                <span className="text-xs text-white/50">{s.label}</span>
              </div>
              <div className="text-3xl font-serif font-bold text-sky-brand">{s.value}</div>
            </div>
          ))}
        </div>

        {/* Quotes table */}
        <div className="glass border border-white/8 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h2 className="font-serif font-bold text-lg">Quote Submissions</h2>
            <button
              onClick={fetchQuotes}
              className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="py-20 text-center text-white/40">Loading...</div>
          ) : quotes.length === 0 ? (
            <div className="py-20 text-center text-white/40">No submissions yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {["Date", "Name", "Email", "Phone", "Service", "Lang", "Status"].map((h) => (
                      <th key={h} className="text-left text-xs text-white/40 font-medium px-6 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((q) => (
                    <tr key={q.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                      <td className="px-6 py-4 text-white/50 whitespace-nowrap">
                        {new Date(q.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-medium whitespace-nowrap">{q.name}</td>
                      <td className="px-6 py-4 text-white/60">{q.email}</td>
                      <td className="px-6 py-4 text-white/60 whitespace-nowrap">{q.phone}</td>
                      <td className="px-6 py-4 text-white/60">{q.service_type}</td>
                      <td className="px-6 py-4">
                        <span className="uppercase text-xs font-semibold text-sky-brand">
                          {q.lang}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
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
          )}
        </div>
      </main>
    </div>
  );
}
