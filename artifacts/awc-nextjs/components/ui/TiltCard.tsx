"use client";

import {
  useRef,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * TiltCard
 * Interactive 3D tilt wrapper. Tracks the pointer over the card and rotates it
 * on X/Y with spring smoothing for an expensive, tactile feel. Also exposes a
 * `--mx`/`--my` CSS variable pair so children can render a pointer-following
 * glare/spotlight. Falls back to no motion under prefers-reduced-motion
 * (springs simply never get driven on devices without a fine pointer).
 */
export default function TiltCard({
  children,
  className = "",
  max = 8,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees on each axis. */
  max?: number;
  /** Render a soft pointer-following highlight. */
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Normalised pointer position, -0.5 .. 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), {
    stiffness: 220,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), {
    stiffness: 220,
    damping: 18,
  });

  const glareX = useTransform(px, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(py, [-0.5, 0.5], ["0%", "100%"]);

  const handleMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { duration: 0.25 } }}
      className={`relative [transform-style:preserve-3d] ${className}`}
    >
      {children}

      {glare && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [transform:translateZ(1px)] group-hover:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(220px circle at ${x} ${y}, rgba(0,174,239,0.18), transparent 60%)`,
            ),
          }}
        />
      )}
    </motion.div>
  );
}
