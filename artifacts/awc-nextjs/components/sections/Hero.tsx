"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Zap,
  ChevronDown,
  ShieldCheck,
  Clock,
  Star,
  Award,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { toTelHref } from "@/lib/contact-utils";
import Aurora from "@/components/ui/Aurora";
import AirflowRibbon from "@/components/ui/AirflowRibbon";

// Compact trust signals shown inside the glass CTA panel
const HERO_BADGES = [
  { icon: Award, label: "15+ Years" },
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: Clock, label: "Same-Day Service" },
  { icon: Star, label: "5-Star Rated" },
];

export default function Hero() {
  const { T } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Cooling-airflow particle field on a canvas. Particles drift rightward
  // (like air pushed from a vent) with a soft sine wobble.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;
    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * W(),
      y: Math.random() * H(),
      vx: Math.random() * 0.5 + 0.15,
      r: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.5 + 0.1,
      phase: Math.random() * Math.PI * 2,
      amp: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W(), H());
      for (const p of particles) {
        p.x += p.vx;
        p.phase += 0.01;
        p.y += Math.sin(p.phase) * p.amp;
        if (p.x > W() + 10) {
          p.x = -10;
          p.y = Math.random() * H();
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120,220,255,${p.alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    if (reduce) {
      // Single static frame, no animation loop
      draw();
      cancelAnimationFrame(raf);
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const lines = T.hero.headline.split("\n");

  return (
    <section
      id="hero"
      className="relative z-0 flex min-h-screen flex-col items-center justify-center overflow-hidden noise-overlay"
    >
      {/* Base radial gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #0a2a6e 0%, #040e26 60%)",
        }}
      />

      {/* Ambient aurora mesh */}
      <Aurora intensity="medium" />

      {/* Flowing airflow ribbons */}
      <div className="absolute inset-x-0 top-1/4 h-[60vh]">
        <AirflowRibbon />
      </div>

      {/* Drifting cooling particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Cool glow at the bottom edge */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 100%, rgba(0,174,239,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 pt-28 text-center md:pt-24">
        <h1 className="mb-6 font-serif text-5xl font-bold leading-[1.05] [text-wrap:balance] sm:text-6xl md:text-7xl lg:text-[6.5rem]">
          {lines.map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                delay: 0.2 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block text-gradient-sky-animated"
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mx-auto mb-10 max-w-xl text-lg text-white/60 md:text-xl"
        >
          {T.hero.subheadline}
        </motion.p>

        {/* Glassmorphism CTA panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="border-gradient mx-auto max-w-2xl rounded-3xl"
        >
          <div className="glass-panel rounded-3xl p-6 sm:p-7">
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <motion.a
                href="#quote"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-brand px-7 py-3.5 font-semibold text-white shadow-glow transition-[filter] hover:brightness-110"
              >
                <FileText className="h-4 w-4" />
                {T.hero.ctaEstimate}
              </motion.a>
              <motion.a
                href={toTelHref(T.contact.phone1)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-red-brand/50 px-7 py-3.5 font-semibold text-red-brand transition-colors hover:bg-red-brand/10"
              >
                <Zap className="h-4 w-4" />
                {T.hero.ctaEmergency}
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
