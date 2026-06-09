import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import { Star, Quote } from "lucide-react";
import { useSiteContent } from "@/context/SiteContentContext";

export default function Reviews() {
  const { reviews } = useSiteContent();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    if (!emblaApi) return;
    
    // Auto-scroll logic
    const autoplay = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 5000);

    return () => clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <section id="reviews" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#00AEEF] font-bold tracking-wider uppercase text-sm mb-3">Testimonials</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#0A2A6E] font-serif mb-6">
            Trusted by Your Neighbors
          </h3>
          <p className="text-lg text-[#6B7280]">
            Don't just take our word for it. See what homeowners across Miami-Dade say about our premium service.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex gap-6 py-4">
              {reviews.map((review, index) => (
                <div key={index} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4">
                  <div className="bg-[#F4F7FB] rounded-2xl p-8 h-full border border-gray-100 hover:shadow-lg transition-shadow relative">
                    <Quote className="absolute top-6 right-8 w-12 h-12 text-[#0A2A6E]/10" />
                    <div className="flex gap-1 mb-6">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-[#0A2A6E] font-medium mb-8 leading-relaxed">
                      "{review.text}"
                    </p>
                    <div className="mt-auto flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#0A2A6E] rounded-full flex items-center justify-center text-white font-bold text-xl font-serif">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0A2A6E]">{review.name}</h4>
                        <p className="text-sm text-[#6B7280]">{review.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}