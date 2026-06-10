import { motion } from "framer-motion";
import { Check, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

export default function MaintenancePlans() {
  const { T } = useLanguage();
  const M = T.maintenance;

  return (
    <section id="maintenance" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#00AEEF] font-bold tracking-wider uppercase text-sm mb-3">{M.label}</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#0A2A6E] font-serif mb-6">{M.heading}</h3>
          <p className="text-lg text-[#6B7280]">{M.body}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {M.plans.map((plan, index) => {
            const highlighted = "highlight" in plan && plan.highlight;
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`relative rounded-3xl p-8 ${
                highlighted
                  ? "bg-[#0A2A6E] text-white shadow-2xl scale-105 border-2 border-[#00AEEF] z-10"
                  : "bg-white text-[#0A2A6E] border border-gray-200 shadow-lg"
              }`}
            >
              {highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#00AEEF] text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-md">
                  <Shield className="w-4 h-4" /> {M.mostPopular}
                </div>
              )}
              <h4 className="text-2xl font-bold font-serif mb-2">{plan.name}</h4>
              <p className={`mb-6 text-sm ${highlighted ? "text-white/80" : "text-[#6B7280]"}`}>{plan.description}</p>
              <div className="mb-8">
                <span className="text-5xl font-bold font-serif">
                  {index === 0 ? "$15" : index === 1 ? "$25" : "$45"}
                </span>
                <span className={highlighted ? "text-white/80" : "text-[#6B7280]"}>/mo</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 shrink-0 text-[#00AEEF]" />
                    <span className="font-medium text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className={`w-full py-6 text-lg font-bold rounded-xl transition-all ${
                highlighted
                  ? "bg-[#00AEEF] hover:bg-white hover:text-[#0A2A6E] text-white"
                  : "bg-[#F4F7FB] hover:bg-[#0A2A6E] text-[#0A2A6E] hover:text-white"
              }`}>
                {M.choose} {plan.name}
              </Button>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
