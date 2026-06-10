"use client";

import { motion } from "framer-motion";
import { CreditCard, Wallet, Zap, BadgePercent, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Aurora from "@/components/ui/Aurora";
import TiltCard from "@/components/ui/TiltCard";

// Icons map 1:1 to financing.perks order
const ICONS = [Wallet, CreditCard, Zap, BadgePercent];

export default function Financing() {
  const { T } = useLanguage();
  const F = T.financing;

  return (
    <section
      id="financing"
      className="section-pad relative overflow-hidden bg-[#040e26] noise-overlay"
    >
      <Aurora intensity="subtle" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        {/* Left: pitch */}
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-widest text-sky-brand"
          >
            {F.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 mb-5 font-serif text-3xl font-bold leading-tight md:text-5xl"
          >
            {F.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-8 max-w-md leading-relaxed text-white/60"
          >
            {F.body}
          </motion.p>

          <motion.a
            href="#quote"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group inline-flex items-center gap-2 rounded-full bg-sky-brand px-7 py-3.5 font-semibold text-white shadow-glow transition-all hover:brightness-110"
          >
            {F.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.a>

          <p className="mt-6 max-w-md text-xs leading-relaxed text-white/30">
            {F.disclaimer}
          </p>
        </div>

        {/* Right: perk cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {F.perks.map((perk, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <TiltCard className="group h-full rounded-2xl">
                  <div className="glass-panel h-full rounded-2xl p-6 [transform:translateZ(20px)]">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-brand/10 text-sky-brand">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-1.5 font-serif text-base font-bold">
                      {perk.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/50">
                      {perk.description}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
