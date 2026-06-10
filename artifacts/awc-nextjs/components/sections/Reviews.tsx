"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import TiltCard from "@/components/ui/TiltCard";

export default function Reviews() {
  const { T } = useLanguage();
  const R = T.reviews;
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "right" ? 320 : -320,
      behavior: "smooth",
    });
  };

  return (
    <section id="reviews" className="section-pad bg-[#040e26] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sky-brand text-xs font-semibold tracking-widest uppercase"
            >
              {R.label}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-serif font-bold mt-2"
            >
              {R.heading}
            </motion.h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-sky-brand hover:text-sky-brand transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-sky-brand hover:text-sky-brand transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="mask-fade-x flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {R.items.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="w-[300px] flex-shrink-0 snap-start md:w-[340px]"
            >
              <TiltCard className="group h-full rounded-2xl" max={6}>
                <div className="glass-panel relative flex h-full flex-col rounded-2xl p-7">
                  <Quote className="absolute right-6 top-6 h-8 w-8 text-sky-brand/15 [transform:translateZ(10px)]" />
                  {/* Stars */}
                  <div className="mb-4 flex gap-1 [transform:translateZ(24px)]">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-white/70 [transform:translateZ(16px)]">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="[transform:translateZ(24px)]">
                    <div className="text-sm font-semibold">{review.name}</div>
                    <div className="text-xs text-white/40">
                      {review.location}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
