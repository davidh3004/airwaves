"use client";

import { motion } from "framer-motion";
import { Zap, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function EmergencyRepair() {
  const { T } = useLanguage();
  const E = T.emergency;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #1a0308 0%, #2d0510 40%, #0a0515 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(247,45,54,0.3) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-red-brand/20 border border-red-brand/40 text-red-brand text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-8"
        >
          <Zap className="w-3.5 h-3.5" />
          {E.badge}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight"
        >
          {E.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/60 text-lg max-w-xl mx-auto mb-10"
        >
          {E.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="tel:+17863623648"
            className="inline-flex items-center justify-center gap-3 bg-red-brand text-white font-bold text-lg px-9 py-4 rounded-full hover:bg-red-500 transition-colors shadow-2xl shadow-red-brand/40"
          >
            <Phone className="w-5 h-5" />
            (786) 362-3648
          </a>
          <a
            href="tel:+17864242925"
            className="inline-flex items-center justify-center gap-3 border border-white/20 text-white/80 font-semibold px-9 py-4 rounded-full hover:border-white/40 hover:text-white transition-colors"
          >
            <Phone className="w-5 h-5" />
            (786) 424-2925
          </a>
        </motion.div>
      </div>
    </section>
  );
}
