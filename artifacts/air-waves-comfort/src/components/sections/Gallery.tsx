import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

export default function Gallery() {
  const { gallery } = useSiteContent();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = () =>
    setLightbox((i) => (i === null ? null : (i - 1 + gallery.length) % gallery.length));
  const next = () =>
    setLightbox((i) => (i === null ? null : (i + 1) % gallery.length));

  return (
    <section id="gallery" className="py-24 bg-[#F4F7FB]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-[#0A2A6E] mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Our Work in Action
          </h2>
          <div className="w-16 h-1 bg-[#00AEEF] mx-auto mb-4" />
          <p
            className="text-gray-600 max-w-xl mx-auto text-lg"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Real jobs. Real results. See what Miami's most trusted HVAC crew delivers every day.
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {gallery.map((photo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ scale: 1.02 }}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group shadow-md ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              style={{ aspectRatio: i === 0 ? "16/9" : "4/3" }}
              onClick={() => setLightbox(i)}
              data-testid={`gallery-photo-${i}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2A6E]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span
                  className="text-white text-sm font-semibold"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {photo.label}
                </span>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
            data-testid="gallery-lightbox"
          >
            <button
              className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
              onClick={() => setLightbox(null)}
              data-testid="gallery-lightbox-close"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              data-testid="gallery-lightbox-prev"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
              onClick={(e) => { e.stopPropagation(); next(); }}
              data-testid="gallery-lightbox-next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl max-h-[80vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={gallery[lightbox].src}
                alt={gallery[lightbox].alt}
                className="w-full h-full object-contain rounded-xl"
              />
              <p className="text-white/80 text-center mt-3 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {gallery[lightbox].label}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
