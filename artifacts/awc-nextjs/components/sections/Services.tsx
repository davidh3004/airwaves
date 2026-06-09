"use client";

import { motion } from "framer-motion";
import { Wrench, Settings, CheckCircle2, Building2, Wind, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ICONS = [Wrench, Settings, CheckCircle2, Building2, Wind, Zap];

export default function Services() {
  const { T } = useLanguage();
  const S = T.services;

  return (
    <section id="services" className="section-pad bg-[#040e26]">
      <div className="max-w-7xl mx-auto">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className={`group relative rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 ${
                  isHighlight
                    ? "bg-gradient-to-br from-red-brand/20 to-[#0A2A6E] border-red-brand/30 shadow-lg shadow-red-brand/10"
                    : "glass border-white/8 hover:border-sky-brand/30"
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
                    isHighlight ? "bg-red-brand/20" : "bg-sky-brand/10"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${isHighlight ? "text-red-brand" : "text-sky-brand"}`}
                  />
                </div>
                <h3 className="font-serif text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                <a
                  href="#quote"
                  className={`mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    isHighlight
                      ? "text-red-brand hover:text-red-400"
                      : "text-sky-brand hover:text-sky-300"
                  }`}
                >
                  {S.learnMore} →
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
