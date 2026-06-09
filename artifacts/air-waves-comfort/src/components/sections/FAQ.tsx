import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How quickly can you respond to an AC emergency?",
    answer: "We offer 24/7 emergency repair services. In most cases, we can dispatch a technician to your home within hours of your call. We prioritize complete system failures, especially during extreme heat."
  },
  {
    question: "How often should I have my AC system serviced?",
    answer: "In Miami's demanding climate, we strongly recommend preventative maintenance twice a year—ideally in the spring before the intense summer heat, and in the fall. Regular maintenance prevents up to 80% of unexpected breakdowns."
  },
  {
    question: "Do you offer financing for new AC installations?",
    answer: "Yes, we offer flexible financing options with approved credit, including 0% APR for up to 60 months. We handle the application process instantly to get you cooling as soon as possible."
  },
  {
    question: "What brands of equipment do you install?",
    answer: "We install premium, high-efficiency equipment from top manufacturers like Carrier, Trane, and Lennox. We match the specific brand and model to your home's unique requirements rather than pushing a one-size-fits-all solution."
  },
  {
    question: "How do I know if I need a repair or a full replacement?",
    answer: "Generally, if your system is over 10-12 years old, uses R-22 Freon, or requires a repair that costs more than a third of a new system, replacement is more cost-effective. Our technicians provide honest, data-driven assessments without high-pressure sales tactics."
  },
  {
    question: "Are your technicians licensed and insured?",
    answer: "Absolutely. We are fully licensed (CAC1820880) and insured. Our technicians are NATE-certified, undergo rigorous background checks, and receive ongoing training on the latest HVAC technologies."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-[#F4F7FB]">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-[#00AEEF] font-bold tracking-wider uppercase text-sm mb-3">Got Questions?</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#0A2A6E] font-serif mb-6">
            Frequently Asked Questions
          </h3>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="bg-white border border-gray-200 rounded-xl px-6 data-[state=open]:shadow-md transition-all"
            >
              <AccordionTrigger className="text-left font-bold text-lg text-[#0A2A6E] hover:text-[#00AEEF] py-6 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#6B7280] text-base leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}