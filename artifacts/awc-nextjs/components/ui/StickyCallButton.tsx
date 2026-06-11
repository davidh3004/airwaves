"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { toTelHref } from "@/lib/contact-utils";

/**
 * StickyCallButton
 * Floating, always-reachable emergency call control. Appears after the user
 * scrolls past the hero so it never competes with the hero CTAs. Pulsing glow
 * ring draws the eye; expands to a full pill on desktop, compact FAB on mobile.
 */
export default function StickyCallButton() {
  const { T } = useLanguage();
  const phone = T.contact.phone1;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={toTelHref(phone)}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          aria-label={`${T.nav.call} ${phone}`}
          className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-red-brand px-4 py-4 font-bold text-white shadow-glow-red animate-glow-pulse sm:px-5"
        >
          <Phone className="h-5 w-5 flex-shrink-0" />
          <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm transition-all duration-300 sm:inline sm:max-w-[160px]">
            {phone}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
