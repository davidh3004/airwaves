"use client";

import { Phone, MapPin, Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PHONE1 = "(786) 362-3648";
const PHONE2 = "(786) 424-2925";
const ADDRESS = "9802 NW 80 Ave Bay G48\nHialeah Gardens, FL 33016";
const LICENSE = "CAC1820880";
const YEAR = new Date().getFullYear();

export default function Footer() {
  const { T } = useLanguage();
  const F = T.footer;

  return (
    <footer className="bg-[#030b1c] border-t border-white/5 text-white/70 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="lg:col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Air Waves Comfort" className="h-10 w-auto mb-4" />
          <p className="leading-relaxed text-white/50">{F.description}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-white/30">
            <Shield className="w-3.5 h-3.5" />
            <span>{F.license}: {LICENSE}</span>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-semibold mb-4">{F.quickLinks}</h4>
          <ul className="space-y-2.5">
            {Object.entries(F.links).map(([key, label]) => (
              <li key={key}>
                <a href={`#${key}`} className="hover:text-white transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4">{F.ourServices}</h4>
          <ul className="space-y-2.5">
            {Object.values(F.serviceLinks).map((label) => (
              <li key={label}>
                <a href="#services" className="hover:text-white transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">{F.contactUs}</h4>
          <ul className="space-y-3">
            <li>
              <p className="text-xs text-white/40 mb-1">{F.emergencyLine}</p>
              <a
                href={`tel:+1${PHONE1.replace(/\D/g, "")}`}
                className="flex items-center gap-2 text-[#00aeef] font-semibold hover:brightness-110 transition"
              >
                <Phone className="w-4 h-4" /> {PHONE1}
              </a>
            </li>
            <li>
              <p className="text-xs text-white/40 mb-1">{F.office}</p>
              <a
                href={`tel:+1${PHONE2.replace(/\D/g, "")}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" /> {PHONE2}
              </a>
            </li>
            <li>
              <p className="text-xs text-white/40 mb-1">{F.address}</p>
              <address className="not-italic flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="whitespace-pre-line leading-relaxed">{ADDRESS}</span>
              </address>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-4 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-white/30">
          <span>© {YEAR} Air Waves Comfort LLC. {F.rights}</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/60 transition-colors">{F.privacy}</a>
            <a href="#" className="hover:text-white/60 transition-colors">{F.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
