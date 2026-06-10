"use client";

/**
 * AirflowRibbon
 * Abstract cooling-airflow visual: a stack of flowing SVG ribbons with an
 * animated stroke dash, plus drifting "cool air" highlight strokes. Reads as
 * HVAC airflow / cool waves rather than a literal object — the premium,
 * Apple-keynote direction. Decorative only (aria-hidden, pointer-events-none).
 */
export default function AirflowRibbon({
  className = "",
}: {
  className?: string;
}) {
  // Layered ribbon paths — varied amplitude/offset so they interleave.
  const ribbons = [
    { d: "M-50,260 C200,140 480,360 760,220 1040,90 1300,300 1490,180", o: 0.6, w: 2, c: "#00AEEF", delay: "0s" },
    { d: "M-50,320 C220,220 520,420 800,280 1080,150 1320,360 1490,250", o: 0.4, w: 1.5, c: "#7FDCFF", delay: "-3s" },
    { d: "M-50,200 C180,90 460,300 740,160 1020,40 1280,240 1490,120", o: 0.3, w: 1.5, c: "#00AEEF", delay: "-6s" },
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 480"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <linearGradient id="ribbonFade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="ribbonMask">
          <rect width="1440" height="480" fill="url(#ribbonFade)" />
        </mask>
      </defs>

      <g mask="url(#ribbonMask)">
        {ribbons.map((r, i) => (
          <path
            key={i}
            d={r.d}
            fill="none"
            stroke={r.c}
            strokeWidth={r.w}
            strokeOpacity={r.o}
            strokeLinecap="round"
            strokeDasharray="14 22"
            className="animate-flow-dash"
            style={{ animationDelay: r.delay }}
          />
        ))}
      </g>
    </svg>
  );
}
