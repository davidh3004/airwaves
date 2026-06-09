import { Button } from "@/components/ui/button";
import { PhoneCall, Calendar } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0A2A6E] to-[#05153A] text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,50 Q25,25 50,50 T100,50 L100,100 L0,100 Z" fill="#00AEEF" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold font-serif mb-6">Ready for Premium Comfort?</h2>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light">
          Experience the difference of Miami's most trusted HVAC agency. Schedule your service or get a free estimate today.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="h-14 px-8 bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white font-bold text-lg rounded-full">
            <Calendar className="mr-2 h-5 w-5" /> Schedule Service Now
          </Button>
          <a href="tel:7863623648">
            <Button variant="outline" className="h-14 px-8 bg-transparent border-2 border-white hover:bg-white hover:text-[#0A2A6E] text-white font-bold text-lg rounded-full w-full sm:w-auto">
              <PhoneCall className="mr-2 h-5 w-5" /> Call (786) 362-3648
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}