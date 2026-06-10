"use client";

/**
 * Aurora
 * Ambient animated gradient-mesh background. Three blurred color blobs drift
 * slowly behind content to add depth without distracting motion.
 * Pure CSS animation (see tailwind `aurora` keyframes) — cheap, GPU-composited,
 * and disabled automatically under prefers-reduced-motion.
 *
 * Drop inside a `relative overflow-hidden` parent. It is pointer-events-none
 * and aria-hidden, so it never interferes with layout or a11y.
 */
export default function Aurora({
  className = "",
  intensity = "medium",
}: {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
}) {
  const opacity =
    intensity === "subtle" ? 0.35 : intensity === "strong" ? 0.7 : 0.5;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      {/* Sky-blue cool front */}
      <div
        className="absolute -top-1/4 left-[10%] h-[55vh] w-[55vh] rounded-full blur-[90px] animate-aurora"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,174,239,0.55), transparent 65%)",
        }}
      />
      {/* Deep navy mass */}
      <div
        className="absolute top-1/4 right-[5%] h-[60vh] w-[60vh] rounded-full blur-[110px] animate-float-slow"
        style={{
          background:
            "radial-gradient(circle at center, rgba(10,42,110,0.7), transparent 65%)",
          animationDelay: "-4s",
        }}
      />
      {/* Cyan glow lower-center */}
      <div
        className="absolute bottom-[-15%] left-1/3 h-[50vh] w-[50vh] rounded-full blur-[100px] animate-aurora"
        style={{
          background:
            "radial-gradient(circle at center, rgba(80,200,255,0.4), transparent 60%)",
          animationDelay: "-9s",
        }}
      />
    </div>
  );
}
