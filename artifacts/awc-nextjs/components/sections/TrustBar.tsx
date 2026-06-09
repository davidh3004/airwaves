"use client";

import { motion } from "framer-motion";
import { Award, ShieldCheck, Star, Clock, CreditCard } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ICONS = [Award, ShieldCheck, Star, Clock, CreditCard];

export default function TrustBar() {
  const { T } = useLanguage();

  return (
    <section className="bg-[#060f24] border-y border-white/5 py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {T.trustBadges.map((badge, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-2.5 text-white/70"
              >
                <Icon className="w-4 h-4 text-sky-brand flex-shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap">{badge.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
