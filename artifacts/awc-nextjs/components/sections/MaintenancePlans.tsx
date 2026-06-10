"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function MaintenancePlans() {
  const { T } = useLanguage();
  const M = T.maintenance;

  return (
    <section id="maintenance" className="section-pad bg-[#060f24]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sky-brand text-xs font-semibold tracking-widest uppercase"
          >
            {M.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-bold mt-3 mb-4"
          >
            {M.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto"
          >
            {M.body}
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {M.plans.map((plan, i) => {
            const isHighlight = "highlight" in plan && plan.highlight;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                  isHighlight
                    ? "border-sky-brand/40 bg-gradient-to-b from-sky-brand/20 to-[#060f24] shadow-glow md:scale-105"
                    : "glass-panel hover:border-sky-brand/25"
                }`}
              >
                {isHighlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-sky-brand text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
                    {M.mostPopular}
                  </div>
                )}

                <h3 className="font-serif text-xl font-bold mb-2">
                  {plan.name}
                </h3>
                <p className="text-white/50 text-sm mb-6">{plan.description}</p>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-white/80"
                    >
                      <CheckCircle2 className="w-4 h-4 text-sky-brand flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#quote"
                  className={`block text-center font-semibold py-3 rounded-full transition-all ${
                    isHighlight
                      ? "bg-sky-brand text-white hover:brightness-110 shadow-lg shadow-sky-brand/30"
                      : "border border-white/20 text-white/80 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {M.choose} {plan.name}
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
