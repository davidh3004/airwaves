import { PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteContent } from "@/context/SiteContentContext";

export default function MobileCallBar() {
  const { contact } = useSiteContent();

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.4 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      <div className="flex gap-0 shadow-2xl">
        <a
          href={`tel:${contact.phone1.replace(/\D/g, "")}`}
          className="flex-1 flex items-center justify-center gap-2 bg-[#00AEEF] text-white font-bold py-4 text-base active:bg-[#00AEEF]/90 transition-colors"
          data-testid="mobile-call-btn-primary"
        >
          <PhoneCall className="w-5 h-5" />
          <span>{contact.phone1}</span>
        </a>
        <a
          href={`tel:${contact.phone2.replace(/\D/g, "")}`}
          className="flex-1 flex items-center justify-center gap-2 bg-[#F72D36] text-white font-bold py-4 text-base active:bg-[#F72D36]/90 transition-colors border-l border-white/20"
          data-testid="mobile-call-btn-secondary"
        >
          <PhoneCall className="w-5 h-5" />
          <span>{contact.phone2}</span>
        </a>
      </div>
    </motion.div>
  );
}
