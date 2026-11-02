import React from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  author: string;
  title: string;
  city: string;
  quote: string;
  jewelleryWorn: string;
}

export const TestimonialsSection: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 't-1',
      author: 'Dr. Radhika Sen',
      title: 'Royal Bride',
      city: 'Udaipur & Mumbai',
      quote:
        'I wore the Aishwarya Grand Lakshmi Bridal Suite for my wedding muhurtham. The antique 22K finish had the exact weight, rich warmth, and majestic presence of solid heirloom gold. The WhatsApp booking process and personal video preview with the owner gave me total peace of mind.',
      jewelleryWorn: 'Grand Lakshmi Bridal Suite',
    },
    {
      id: 't-2',
      author: 'Ananya Deshmukh',
      title: 'Classical Bharatanatyam Exponent',
      city: 'Pune',
      quote:
        'The Maharani Peacock Temple Haar has unmatched sculpture depth. Under the stage lights, the kemp stones and antique matte patina resonated with authentic temple divinity. Truly an investment in art.',
      jewelleryWorn: 'Maharani Peacock Haar',
    },
    {
      id: 't-3',
      author: 'Sunita Mehra',
      title: 'Boutique Collector',
      city: 'Bangalore',
      quote:
        'The Royal Mayur Peacock Kada is a revelation. The enamel work is flawlessly executed and the screw lock is sturdy. People at our family reception could not stop complimenting its vintage Rajasthani grace.',
      jewelleryWorn: 'Royal Mayur Peacock Kada',
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#B89A62] font-semibold block mb-2">
          Patron Acclaim
        </span>
        <h2 className="font-playfair text-3xl sm:text-4xl font-medium text-[#2B2520]">
          Words from Our Royal Collectors
        </h2>
        <p className="mt-2 text-xs sm:text-sm font-lato text-[#786B59]">
          Cherished by royal brides, connoisseurs, and classical artists across India.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="p-7 rounded-2xl bg-[#FFF9F0] text-[#2B2520] border border-[#B89A62]/35 shadow-sm flex flex-col justify-between relative group hover:-translate-y-1 hover:shadow-md transition-all duration-300"
          >
            <div>
              {/* Star Rating & Quote Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-[#B89A62]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-[#B89A62]/30" />
              </div>

              {/* Quote text */}
              <p className="font-lato text-xs sm:text-sm text-[#786B59] leading-relaxed italic">
                "{item.quote}"
              </p>
            </div>

            {/* Author info */}
            <div className="pt-5 mt-4 border-t border-[#B89A62]/20">
              <h4 className="font-montserrat font-bold text-sm text-[#2B2520]">
                {item.author}
              </h4>
              <p className="text-[11px] font-lato text-[#786B59]">
                {item.title} · {item.city}
              </p>
              <span className="inline-block mt-2 text-[10px] font-montserrat uppercase tracking-wider text-[#2B2520] bg-[#F8F3EA] px-2.5 py-0.5 rounded font-semibold border border-[#B89A62]/30">
                Wore: {item.jewelleryWorn}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
