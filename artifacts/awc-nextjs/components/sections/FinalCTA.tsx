"use client";

import { motion } from "framer-motion";
import { CalendarCheck, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FinalCTA() {
  const { T } = useLanguage();
  const C = T.cta;

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #0a2a6e 0%, #040e26 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 50% at 50% 100%, rgba(0,174,239,0.4) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight"
        >
          {C.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/60 text-lg max-w-xl mx-auto mb-10"
        >
          {C.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#quote"
            className="inline-flex items-center justify-center gap-2 bg-sky-brand text-white font-semibold px-8 py-4 rounded-full hover:brightness-110 transition-all shadow-xl shadow-sky-brand/30"
          >
            <CalendarCheck className="w-5 h-5" />
            {C.schedule}
          </a>
          <a
            href="tel:+17863623648"
            className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:border-sky-brand/60 hover:text-sky-brand transition-colors"
          >
            <Phone className="w-5 h-5" />
            {C.call}: (786) 362-3648
          </a>
        </motion.div>
      </div>
    </section>
  );
}
