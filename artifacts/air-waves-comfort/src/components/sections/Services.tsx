import { motion, useMotionValue, useTransform } from "framer-motion";
import { Wrench, ThermometerSun, PenTool, Building2, Wind, AlertTriangle, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";

const ICONS = [Wrench, ThermometerSun, PenTool, Building2, Wind, AlertTriangle];

function ServiceCard({ service, index, learnMore }: { service: any; index: number; learnMore: string }) {
  const Icon = ICONS[index] || Wrench;
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative group rounded-2xl p-8 cursor-pointer transition-colors duration-300 ${
        service.highlight
          ? "bg-gradient-to-br from-[#F72D36]/10 to-[#F72D36]/5 border-2 border-[#F72D36]/20 hover:border-[#F72D36]"
          : "bg-white border border-[#E5E7EB] hover:border-[#00AEEF] hover:shadow-xl"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" style={{ transform: "translateZ(1px)" }} />
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm ${service.highlight ? "bg-[#F72D36] text-white" : "bg-[#F4F7FB] text-[#0A2A6E]"}`} style={{ transform: "translateZ(30px)" }}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-[#0A2A6E] mb-3 font-serif" style={{ transform: "translateZ(40px)" }}>{service.title}</h3>
      <p className="text-[#6B7280] mb-6 line-clamp-2" style={{ transform: "translateZ(20px)" }}>{service.description}</p>
      <div className={`flex items-center text-sm font-bold mt-auto ${service.highlight ? "text-[#F72D36]" : "text-[#00AEEF]"}`} style={{ transform: "translateZ(30px)" }}>
        {learnMore} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
}

export default function Services() {
  const { T } = useLanguage();
  const S = T.services;

  return (
    <section id="services" className="py-24 bg-[#F4F7FB]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#00AEEF] font-bold tracking-wider uppercase text-sm mb-3">{S.label}</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#0A2A6E] font-serif mb-6">{S.heading}</h3>
          <p className="text-lg text-[#6B7280]">{S.body}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {S.items.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} learnMore={S.learnMore} />
          ))}
        </div>
      </div>
    </section>
  );
}
