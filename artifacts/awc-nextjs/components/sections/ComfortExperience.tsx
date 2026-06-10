"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import TiltCard from "@/components/ui/TiltCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

// `value`/`suffix` drive the count-up; `text` is used for non-numeric stats.
const STATS = [
  { key: "years" as const, value: 15, suffix: "+" },
  { key: "clients" as const, value: 2000, suffix: "+" },
  { key: "emergency" as const, text: "24/7" },
  { key: "satisfaction" as const, value: 100, suffix: "%" },
];

export default function ComfortExperience() {
  const { T } = useLanguage();
  const C = T.comfort;

  return (
    <section className="section-pad bg-[#040e26]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Image placeholder / visual */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <TiltCard className="group rounded-2xl" max={6}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0a2a6e] to-[#040e26] shadow-glow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={C.imageSrc}
                alt={C.imageAlt}
                className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040e26]/80 via-transparent to-transparent" />
            </div>
          </TiltCard>

          {/* Animated stat counters */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            {STATS.map((s, i) => (
              <motion.div
                key={s.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-panel rounded-xl p-4 text-center"
              >
                <div className="font-serif text-2xl font-bold text-sky-brand">
                  {"text" in s ? (
                    s.text
                  ) : (
                    <AnimatedCounter value={s.value} suffix={s.suffix} />
                  )}
                </div>
                <div className="mt-1 text-xs text-white/50">
                  {C.stats[s.key]}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Content */}
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sky-brand text-xs font-semibold tracking-widest uppercase"
          >
            {C.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-serif font-bold mt-3 mb-5 leading-tight"
          >
            {C.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 leading-relaxed mb-8"
          >
            {C.body}
          </motion.p>

          <ul className="space-y-3 mb-8">
            {C.bullets.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="flex items-center gap-3 text-white/80"
              >
                <CheckCircle2 className="w-5 h-5 text-sky-brand flex-shrink-0" />
                <span>{b}</span>
              </motion.li>
            ))}
          </ul>

          <a
            href="#quote"
            className="inline-flex items-center gap-2 bg-sky-brand text-white font-semibold px-7 py-3.5 rounded-full hover:brightness-110 transition-all shadow-lg shadow-sky-brand/30"
          >
            {T.hero.ctaEstimate}
          </a>
        </div>
      </div>
    </section>
  );
}
