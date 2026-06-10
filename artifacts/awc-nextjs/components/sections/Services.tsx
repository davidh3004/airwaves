"use client";

import { motion } from "framer-motion";
import {
  Wrench,
  Settings,
  CheckCircle2,
  Building2,
  Wind,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Aurora from "@/components/ui/Aurora";
import TiltCard from "@/components/ui/TiltCard";

const ICONS = [Wrench, Settings, CheckCircle2, Building2, Wind, Zap];

export default function Services() {
  const { T } = useLanguage();
  const S = T.services;

  return (
    <section
      id="services"
      className="section-pad relative overflow-hidden bg-[#040e26] noise-overlay"
    >
      <Aurora intensity="subtle" />
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sky-brand text-xs font-semibold tracking-widest uppercase"
          >
            {S.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-bold mt-3 mb-4"
          >
            {S.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto"
          >
            {S.body}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {S.items.map((item, i) => {
            const Icon = ICONS[i];
            const isHighlight = "highlight" in item && item.highlight;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <TiltCard className="group h-full rounded-2xl" max={7}>
                  <div
                    className={`relative flex h-full flex-col rounded-2xl border p-7 transition-colors duration-300 [transform-style:preserve-3d] ${
                      isHighlight
                        ? "border-red-brand/30 bg-gradient-to-br from-red-brand/20 to-[#0A2A6E] shadow-glow-red"
                        : "glass-panel hover:border-sky-brand/30"
                    }`}
                  >
                    <div
                      className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl [transform:translateZ(30px)] ${
                        isHighlight ? "bg-red-brand/20" : "bg-sky-brand/10"
                      }`}
                    >
                      {/* Icon does a slow continuous rotation on hover */}
                      <Icon
                        className={`h-5 w-5 transition-transform duration-700 group-hover:rotate-[360deg] ${
                          isHighlight ? "text-red-brand" : "text-sky-brand"
                        }`}
                      />
                    </div>
                    <h3 className="mb-2 font-serif text-lg font-bold [transform:translateZ(24px)]">
                      {item.title}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-white/50 [transform:translateZ(14px)]">
                      {item.description}
                    </p>
                    <a
                      href="#quote"
                      className={`mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-colors [transform:translateZ(24px)] ${
                        isHighlight
                          ? "text-red-brand hover:text-red-400"
                          : "text-sky-brand hover:text-sky-300"
                      }`}
                    >
                      {S.learnMore} →
                    </a>
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
