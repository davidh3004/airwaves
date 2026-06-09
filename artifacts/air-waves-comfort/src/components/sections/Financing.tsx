import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Percent, CreditCard, Banknote } from "lucide-react";

export default function Financing() {
  return (
    <section id="financing" className="py-24 bg-[#F4F7FB]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white rounded-3xl p-8 md:p-16 shadow-xl border border-gray-100 max-w-5xl mx-auto overflow-hidden relative">
          
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#00AEEF]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-[#0A2A6E]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[#00AEEF] font-bold tracking-wider uppercase text-sm mb-3">Flexible Options</h2>
              <h3 className="text-4xl md:text-5xl font-bold text-[#0A2A6E] font-serif mb-6 leading-tight">
                Comfort Now, <br/>Pay Later.
              </h3>
              <p className="text-lg text-[#6B7280] mb-8">
                A new HVAC system is a significant investment. We offer flexible financing options with approved credit to help you achieve perfect comfort without breaking the bank.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F4F7FB] flex items-center justify-center text-[#0A2A6E]">
                    <Percent className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A2A6E]">0% APR Available</h4>
                    <p className="text-sm text-[#6B7280]">For up to 60 months on select systems.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F4F7FB] flex items-center justify-center text-[#0A2A6E]">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A2A6E]">Instant Approvals</h4>
                    <p className="text-sm text-[#6B7280]">Paperless process with quick decisions.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#F4F7FB] flex items-center justify-center text-[#0A2A6E]">
                    <Banknote className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A2A6E]">Low Monthly Payments</h4>
                    <p className="text-sm text-[#6B7280]">Plans designed to fit your monthly budget.</p>
                  </div>
                </div>
              </div>

              <Button className="h-14 px-8 bg-[#0A2A6E] hover:bg-[#00AEEF] text-white font-bold text-lg rounded-full transition-colors w-full sm:w-auto">
                Apply Now
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#0A2A6E] to-[#081B4B] rounded-3xl p-8 text-white text-center shadow-2xl transform md:rotate-2"
            >
              <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                <Percent className="w-10 h-10 text-[#00AEEF]" />
              </div>
              <h4 className="text-3xl font-bold font-serif mb-2">Special Offer</h4>
              <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#00AEEF] to-white mb-4">
                0%
              </div>
              <p className="text-xl font-medium mb-2">Financing For 60 Months</p>
              <p className="text-white/60 text-sm mb-6">*With approved credit. See dealer for details.</p>
              <div className="border-t border-white/20 pt-6">
                <p className="font-bold text-lg">Call to pre-qualify today</p>
                <p className="text-[#00AEEF] text-xl font-bold mt-1">(786) 362-3648</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}