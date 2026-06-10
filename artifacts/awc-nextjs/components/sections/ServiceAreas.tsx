"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const AREAS = [
  "Miami",
  "Miami Beach",
  "Coral Gables",
  "Coconut Grove",
  "Brickell",
  "Downtown Miami",
  "Wynwood",
  "Little Havana",
  "Hialeah",
  "Hialeah Gardens",
  "Doral",
  "Sweetwater",
  "Westchester",
  "Kendall",
  "Pinecrest",
  "South Miami",
  "Palmetto Bay",
  "Cutler Bay",
  "Homestead",
  "Miami Lakes",
  "Opa-locka",
  "North Miami",
  "North Miami Beach",
  "Aventura",
  "Sunny Isles Beach",
  "Bal Harbour",
  "Surfside",
  "Miami Gardens",
  "Miramar",
  "Pembroke Pines",
  "Hollywood",
  "Hallandale Beach",
  "Fort Lauderdale",
];

const HQ = {
  address: "9802 NW 80 Ave Bay G48",
  city: "Hialeah Gardens, FL 33016",
};

export default function ServiceAreas() {
  const { T } = useLanguage();
  const A = T.areas;

  return (
    <section className="section-pad bg-[#060f24]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
        {/* Left */}
        <div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sky-brand text-xs font-semibold tracking-widest uppercase"
          >
            {A.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-serif font-bold mt-3 mb-5 leading-tight"
          >
            {A.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/60 leading-relaxed mb-8"
          >
            {A.body}
          </motion.p>

          {/* HQ card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6 border border-sky-brand/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-sky-brand/10 flex items-center justify-center">
                <MapPin className="w-4.5 h-4.5 text-sky-brand" />
              </div>
              <div>
                <p className="text-xs text-white/40">{A.hq}</p>
                <p className="font-semibold text-sm">{HQ.address}</p>
              </div>
            </div>
            <p className="text-white/50 text-sm">{HQ.city}</p>
          </motion.div>

          <p className="mt-6 text-sm text-white/40 italic">{A.notFound}</p>
        </div>

        {/* Right: area grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap gap-2"
        >
          {AREAS.map((area, i) => (
            <motion.span
              key={area}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
              className="inline-flex items-center gap-1.5 glass border border-white/8 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full hover:border-sky-brand/40 hover:text-white transition-colors cursor-default"
            >
              <MapPin className="w-2.5 h-2.5 text-sky-brand" />
              {area}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
