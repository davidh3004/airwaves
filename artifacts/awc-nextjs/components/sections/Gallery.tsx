"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const IMAGES = [
  { src: "/gallery/van-mansion.png",       alt: "Air Waves Comfort van at luxury home",        label: "Residential Service" },
  { src: "/gallery/van-residential.png",   alt: "Air Waves Comfort van at residential property",label: "Home Installation" },
  { src: "/gallery/commercial-1.jpeg",     alt: "Commercial HVAC unit installation",            label: "Commercial Project" },
  { src: "/gallery/commercial-2.jpeg",     alt: "Commercial HVAC rooftop unit",                 label: "Rooftop Unit" },
  { src: "/gallery/commercial-3.jpeg",     alt: "Commercial HVAC system",                       label: "Industrial HVAC" },
  { src: "/gallery/goodman-unit.jpeg",     alt: "Goodman AC unit installation",                 label: "AC Installation" },
  { src: "/gallery/van-fleet.png",         alt: "Air Waves Comfort service fleet",              label: "Our Fleet" },
  { src: "/gallery/van-duo.jpeg",          alt: "Air Waves Comfort service vehicles",           label: "Expert Team" },
  { src: "/gallery/vans-back.jpeg",        alt: "Air Waves Comfort vans stocked with equipment",label: "Fully Equipped" },
];

export default function Gallery() {
  const { T } = useLanguage();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () =>
    setLightbox((i) => (i !== null ? (i - 1 + IMAGES.length) % IMAGES.length : null));
  const next = () =>
    setLightbox((i) => (i !== null ? (i + 1) % IMAGES.length : null));

  return (
    <section id="gallery" className="section-pad bg-[#060f24]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold mb-4"
          >
            {T.gallery.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 max-w-lg mx-auto"
          >
            {T.gallery.body}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setLightbox(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-3 left-3 text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {img.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
              onClick={() => setLightbox(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={IMAGES[lightbox].src}
              alt={IMAGES[lightbox].alt}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
