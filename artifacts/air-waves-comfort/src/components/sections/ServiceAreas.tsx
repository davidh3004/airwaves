import { MapPin } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";
import { useLanguage } from "@/context/LanguageContext";

export default function ServiceAreas() {
  const { serviceAreas, contact } = useSiteContent();
  const { T } = useLanguage();
  const A = T.areas;

  return (
    <section className="py-24 bg-[#0A2A6E] text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3">
            <h2 className="text-[#00AEEF] font-bold tracking-wider uppercase text-sm mb-3">{A.label}</h2>
            <h3 className="text-4xl font-bold font-serif mb-6">{A.heading}</h3>
            <p className="text-white/80 mb-8 text-lg">{A.body}</p>
            <div className="flex items-start gap-4 bg-white/10 p-6 rounded-2xl border border-white/20">
              <MapPin className="w-8 h-8 text-[#00AEEF] shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-xl mb-2">{A.hq}</h4>
                <p className="text-white/80">{contact.address}</p>
                <p className="text-[#00AEEF] font-bold mt-2">{contact.phone1}</p>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {serviceAreas.map((area, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-[#00AEEF]/20 hover:border-[#00AEEF] transition-colors cursor-default">
                  <span className="font-medium text-sm md:text-base">{area}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center text-white/60 text-sm">{A.notFound}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
