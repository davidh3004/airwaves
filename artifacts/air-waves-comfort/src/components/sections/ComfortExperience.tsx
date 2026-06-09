import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

function Counter({ end, duration = 2, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const step = end / (duration * 60);
      const timer = setInterval(() => {
        start += step;
        if (start >= end) { setCount(end); clearInterval(timer); }
        else setCount(Math.floor(start));
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function ComfortExperience() {
  const { T } = useLanguage();
  const C = T.comfort;

  const stats = [
    { end: 15, suffix: "+", label: C.stats.years },
    { end: 5000, suffix: "+", label: C.stats.clients },
    { end: 24, suffix: "/7", label: C.stats.emergency },
    { end: 100, suffix: "%", label: C.stats.satisfaction },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#0A2A6E] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none flex items-center justify-end">
        <svg viewBox="0 0 200 200" className="w-[400px] h-[400px] md:w-[800px] md:h-[800px] translate-x-1/4">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="20" fill="none" />
          <path d="M100 20 L100 180 M20 100 L180 100" stroke="currentColor" strokeWidth="20" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-[#00AEEF] font-bold tracking-wider uppercase text-sm mb-3">{C.label}</h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif mb-5 leading-tight">{C.heading}</h3>
            <p className="text-base md:text-lg text-white/80 mb-6 md:mb-8 font-light">{C.body}</p>
            <ul className="space-y-3 md:space-y-4">
              {C.bullets.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00AEEF]/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#00AEEF]" />
                  </div>
                  <span className="font-medium text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.1 }} className="bg-white/5 border border-white/10 rounded-2xl p-5 md:p-8 backdrop-blur-sm">
                <div className="text-3xl md:text-5xl font-bold font-serif text-[#00AEEF] mb-1 md:mb-2">
                  <Counter end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="text-white/80 font-medium text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
