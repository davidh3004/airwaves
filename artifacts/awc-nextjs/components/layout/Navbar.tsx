"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { type Lang } from "@/i18n/translations";

export default function Navbar() {
  const { T, lang, setLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: T.nav.services, href: "#services" },
    { label: T.nav.gallery, href: "#gallery" },
    { label: T.nav.maintenance, href: "#maintenance" },
    { label: T.nav.reviews, href: "#reviews" },
    { label: T.nav.faq, href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#040e26]/95 backdrop-blur-md shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Air Waves Comfort" className="h-9 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="text-sm text-white/70 hover:text-white transition-colors font-medium"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language toggle */}
          <div className="flex items-center gap-1 text-sm font-medium">
            {(["en", "es"] as Lang[]).map((l, i) => (
              <span key={l} className="flex items-center gap-1">
                {i > 0 && <span className="text-white/30">|</span>}
                <button
                  onClick={() => setLang(l)}
                  className={`transition-colors ${
                    lang === l ? "text-white" : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              </span>
            ))}
          </div>

          {/* Phone */}
          <a
            href="tel:+17863623648"
            className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span className="font-semibold">(786) 362-3648</span>
          </a>

          {/* CTA */}
          <a
            href="#quote"
            className="bg-sky-brand text-white text-sm font-semibold px-5 py-2 rounded-full hover:brightness-110 transition-all"
          >
            {T.nav.scheduleService}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-white/80 hover:text-white"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#05153a]/98 backdrop-blur-md border-t border-white/10 px-4 py-6 space-y-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block text-white/80 hover:text-white font-medium py-1"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-2 flex items-center gap-4 border-t border-white/10">
            <div className="flex gap-2 text-sm font-medium">
              {(["en", "es"] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={lang === l ? "text-white" : "text-white/40"}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
            <a
              href="tel:+17863623648"
              className="flex items-center gap-1.5 text-sm text-white/80"
            >
              <Phone className="w-4 h-4" /> (786) 362-3648
            </a>
          </div>
          <a
            href="#quote"
            onClick={() => setMenuOpen(false)}
            className="block bg-sky-brand text-center text-white font-semibold px-5 py-3 rounded-full"
          >
            {T.nav.scheduleService}
          </a>
        </div>
      )}
    </header>
  );
}
