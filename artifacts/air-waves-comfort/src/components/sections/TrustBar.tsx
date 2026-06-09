import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function TrustBar() {
  const trusts = [
    "15+ Years Experience",
    "Licensed & Insured",
    "5-Star Rated",
    "Same-Day Service",
    "Financing Available",
  ];

  return (
    <section className="bg-[#0A2A6E] py-4 border-y border-white/10 relative z-20">
      <div className="container mx-auto px-4 overflow-hidden">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-4 md:gap-8 text-sm md:text-base text-white font-medium">
          {trusts.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5 text-[#00AEEF]" />
              <span className="whitespace-nowrap">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}