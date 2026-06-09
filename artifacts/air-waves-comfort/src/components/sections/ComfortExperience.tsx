import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

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
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function ComfortExperience() {
  return (
    <section className="py-24 bg-[#0A2A6E] text-white relative overflow-hidden">
      {/* Decorative large logo or shape behind text */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none flex items-center justify-end">
        <svg viewBox="0 0 200 200" className="w-[800px] h-[800px] translate-x-1/4">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="20" fill="none" />
          <path d="M100 20 L100 180 M20 100 L180 100" stroke="currentColor" strokeWidth="20" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#00AEEF] font-bold tracking-wider uppercase text-sm mb-3">The Premium Difference</h2>
            <h3 className="text-4xl md:text-5xl font-bold font-serif mb-6 leading-tight">
              Crafting Perfect Comfort For Miami Homes.
            </h3>
            <p className="text-lg text-white/80 mb-8 font-light">
              We don't just fix air conditioners; we engineer your home's climate. With 15+ years of dedicated service in Miami, our certified technicians treat your home with the precision and respect it deserves.
            </p>
            <ul className="space-y-4">
              {[
                "NATE-Certified Expert Technicians",
                "Upfront, Transparent Pricing",
                "White-Glove Installation Service",
                "100% Satisfaction Guarantee"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#00AEEF]/20 flex items-center justify-center shrink-0">
                    <div className="w-2 h-2 rounded-full bg-[#00AEEF]" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
            >
              <div className="text-5xl font-bold font-serif text-[#00AEEF] mb-2">
                <Counter end={15} suffix="+" />
              </div>
              <div className="text-white/80 font-medium">Years Experience</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
            >
              <div className="text-5xl font-bold font-serif text-[#00AEEF] mb-2">
                <Counter end={5000} suffix="+" />
              </div>
              <div className="text-white/80 font-medium">Happy Clients</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
            >
              <div className="text-5xl font-bold font-serif text-[#00AEEF] mb-2">
                <Counter end={24} suffix="/7" />
              </div>
              <div className="text-white/80 font-medium">Emergency Service</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
            >
              <div className="text-5xl font-bold font-serif text-[#00AEEF] mb-2">
                <Counter end={100} suffix="%" />
              </div>
              <div className="text-white/80 font-medium">Satisfaction</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}