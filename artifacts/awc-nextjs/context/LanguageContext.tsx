"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { type Lang } from "@/i18n/translations";
import type { SiteContent } from "@/types/site-content";
import { getDefaultContent } from "@/lib/default-content";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  T: SiteContent;
  contentLoading: boolean;
  refreshContent: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  T: getDefaultContent("en"),
  contentLoading: true,
  refreshContent: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [T, setT] = useState<SiteContent>(getDefaultContent("en"));
  const [contentLoading, setContentLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("awc-lang");
      if (saved === "es") setLangState("es");
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("awc-lang", l);
    } catch {}
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    let cancelled = false;
    setContentLoading(true);
    fetch(`/api/content?lang=${lang}`, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : getDefaultContent(lang)))
      .then((data: SiteContent) => {
        if (!cancelled) setT(data);
      })
      .catch(() => {
        if (!cancelled) setT(getDefaultContent(lang));
      })
      .finally(() => {
        if (!cancelled) setContentLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [lang, refreshKey]);

  const refreshContent = () => setRefreshKey((k) => k + 1);

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, T, contentLoading, refreshContent }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
