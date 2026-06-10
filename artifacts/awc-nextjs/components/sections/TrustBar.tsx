"use client";

import { Award, ShieldCheck, Star, Clock, CreditCard } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ICONS = [Award, ShieldCheck, Star, Clock, CreditCard];

export default function TrustBar() {
  const { T } = useLanguage();

  // Duplicate the badge set so the marquee can loop seamlessly (-50% shift)
  const track = [...T.trustBadges, ...T.trustBadges];

  return (
    <section className="relative z-20 overflow-hidden border-y border-white/5 bg-[#060f24] py-6">
      <div className="mask-fade-x mx-auto max-w-7xl">
        <div className="flex w-max animate-marquee items-center gap-x-12 hover:[animation-play-state:paused]">
          {track.map((badge, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={i}
                className="flex flex-shrink-0 items-center gap-2.5 text-white/70"
              >
                <Icon className="h-4 w-4 flex-shrink-0 text-sky-brand" />
                <span className="whitespace-nowrap text-sm font-medium">
                  {badge.label}
                </span>
                <span className="ml-12 h-1 w-1 rounded-full bg-sky-brand/40" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
