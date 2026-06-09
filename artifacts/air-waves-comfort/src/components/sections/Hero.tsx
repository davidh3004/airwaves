import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AirflowParticles from "../three/AirflowParticles";
import { PhoneCall, Calendar } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0A2A6E] via-[#081B4B] to-black">
      {/* Canvas-based particle background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <AirflowParticles />
      </div>

      {/* Animated SVG wave layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          style={{ height: "220px" }}
        >
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 2 }}
            fill="#00AEEF"
            d="M0,160L60,144C120,128,240,96,360,90.7C480,85,600,107,720,122.7C840,139,960,149,1080,138.7C1200,128,1320,96,1380,80L1440,64L1440,220L1380,220C1320,220,1200,220,1080,220C960,220,840,220,720,220C600,220,480,220,360,220C240,220,120,220,60,220L0,220Z"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          style={{ height: "180px" }}
        >
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            transition={{ duration: 2.5, delay: 0.3 }}
            fill="#00AEEF"
            d="M0,96L80,112C160,128,320,160,480,154.7C640,149,800,107,960,90.7C1120,75,1280,85,1360,90.7L1440,96L1440,180L1360,180C1280,180,1120,180,960,180C800,180,640,180,480,180C320,180,160,180,80,180L0,180Z"
          />
        </svg>
      </div>

      {/* Diagonal light accent */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-10"
        style={{
          background:
            "linear-gradient(135deg, #00AEEF 0%, transparent 50%, transparent 100%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center text-center mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block py-1 px-4 rounded-full bg-white/10 border border-[#00AEEF]/40 text-[#00AEEF] font-semibold text-sm mb-6 backdrop-blur-sm tracking-wide uppercase"
          >
            Miami's Premier Climate Control
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Where Experience <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-[#F4F7FB]">
              Meets Cool.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Miami's Most Trusted HVAC Service — 15+ Years of Excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
          >
            <Button
              className="w-full sm:w-auto h-14 px-8 bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white font-bold text-lg rounded-full shadow-[0_0_30px_rgba(0,174,239,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_45px_rgba(0,174,239,0.6)]"
              data-testid="hero-cta-estimate"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Get a Free Estimate
            </Button>
            <a href="tel:7863623648" className="w-full sm:w-auto" data-testid="hero-link-emergency">
              <Button
                variant="outline"
                className="w-full h-14 px-8 bg-transparent border-2 border-[#F72D36] text-[#F72D36] hover:bg-[#F72D36] hover:text-white font-bold text-lg rounded-full transition-all hover:scale-105"
                data-testid="hero-cta-emergency"
              >
                <PhoneCall className="mr-2 h-5 w-5 animate-pulse" />
                Emergency Service
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <span className="text-white/40 text-xs uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-0.5 h-8 bg-gradient-to-b from-[#00AEEF]/60 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
