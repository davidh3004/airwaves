import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/context/LanguageContext";

export default function FAQ() {
  const { T } = useLanguage();
  const F = T.faq;

  return (
    <section id="faq" className="py-24 bg-[#F4F7FB]">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-[#00AEEF] font-bold tracking-wider uppercase text-sm mb-3">{F.label}</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#0A2A6E] font-serif mb-6">{F.heading}</h3>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {F.items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white border border-gray-200 rounded-xl px-6 data-[state=open]:shadow-md transition-all">
              <AccordionTrigger className="text-left font-bold text-lg text-[#0A2A6E] hover:text-[#00AEEF] py-6 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#6B7280] text-base leading-relaxed pb-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
