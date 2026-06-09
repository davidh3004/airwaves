"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQ() {
  const { T } = useLanguage();
  const F = T.faq;
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad bg-[#040e26]">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sky-brand text-xs font-semibold tracking-widest uppercase"
          >
            {F.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-bold mt-3"
          >
            {F.heading}
          </motion.h2>
        </div>

        {/* Items */}
        <div className="space-y-3">
          {F.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="glass rounded-2xl border border-white/8 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-semibold text-white/90 text-sm md:text-base">
                  {item.question}
                </span>
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-sky-brand/10 flex items-center justify-center">
                  {open === i ? (
                    <Minus className="w-3.5 h-3.5 text-sky-brand" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-sky-brand" />
                  )}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-white/55 text-sm leading-relaxed">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
