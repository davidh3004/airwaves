import { motion } from "framer-motion";
import { PhoneCall, Clock } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import { useLanguage } from "@/context/LanguageContext";

export default function EmergencyRepair() {
  const { contact } = useSiteContent();
  const { T } = useLanguage();
  const E = T.emergency;

  return (
    <section className="bg-[#F72D36] py-16 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 2px, transparent 2px)", backgroundSize: "30px 30px" }} />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-black/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-white/20 shadow-2xl">
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Clock className="w-6 h-6 animate-pulse" />
              <span className="font-bold tracking-wider uppercase text-sm">{E.badge}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-serif mb-4">{E.heading}</h2>
            <p className="text-lg md:text-xl text-white/90 max-w-xl font-medium">{E.body}</p>
          </div>

          <motion.div initial={{ scale: 0.9 }} animate={{ scale: [0.9, 1.05, 0.9] }} transition={{ repeat: Infinity, duration: 2 }} className="relative">
            <div className="absolute inset-0 rounded-full bg-white/30 blur-xl animate-pulse" />
            <a href={`tel:${contact.phone1.replace(/\D/g, "")}`} className="relative flex items-center gap-4 bg-white text-[#F72D36] px-8 py-5 rounded-full font-bold text-2xl md:text-3xl shadow-2xl hover:bg-gray-50 transition-colors group">
              <div className="bg-[#F72D36]/10 p-3 rounded-full group-hover:bg-[#F72D36]/20 transition-colors">
                <PhoneCall className="w-8 h-8" />
              </div>
              {contact.phone1}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
