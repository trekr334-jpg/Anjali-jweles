import React from 'react';
import { Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const BrandStorySection: React.FC = () => {
  const { setCurrentView } = useStore();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Side: Editorial Story Details (Span 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-[#B89A62] text-xs font-montserrat uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="w-4 h-4 text-[#B89A62]" />
            <span>The Heritage Chronicle</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-medium text-[#2B2520] leading-[1.2] text-balance">
            Rooted in Centuries of Sacred Temple Craftsmanship
          </h2>

          <p className="font-lato text-sm sm:text-base text-[#786B59] leading-relaxed">
            At ANJALI JEWELS, jewellery is not merely adornment—it is a sacred testament to India’s royal lineages and divine architecture. Inspired by the legendary dynasties of the South and the majestic courts of Rajasthan, each piece is chiseled by fourth-generation hereditary karigars who pour weeks of wax-carving, filigree sculpting, and kundan-setting into singular creations.
          </p>

          <p className="font-lato text-sm sm:text-base text-[#786B59] leading-relaxed">
            Our signature 22K antique micron gold plating reproduces the velvety warmth and deep patina of treasured museum heirlooms, ensuring every bride and connoisseur walks in undeniable imperial grace.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#B89A62]/25">
            <div className="space-y-1">
              <span className="font-cormorant text-3xl font-bold text-[#B89A62]">
                4th Gen
              </span>
              <p className="font-montserrat text-xs uppercase tracking-wider text-[#786B59] font-medium">
                Master Karigars
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-cormorant text-3xl font-bold text-[#B89A62]">
                100%
              </span>
              <p className="font-montserrat text-xs uppercase tracking-wider text-[#786B59] font-medium">
                Hand-Set Kundan Stones
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-cormorant text-3xl font-bold text-[#B89A62]">
                24K / 22K
              </span>
              <p className="font-montserrat text-xs uppercase tracking-wider text-[#786B59] font-medium">
                Micron Temple Plating
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Vignette (Span 5) */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#B89A62]/40 shadow-xl bg-[#EDE2D0]">
            <img
              src="/assets/aistudio/IMG_20261102_163820_bb61e3a6.jpg"
              alt="ANJALI JEWELS Craftsmanship on Red Silk"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B2520]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 inset-x-6 p-4 rounded-xl bg-[#FFF9F0]/95 text-[#2B2520] border border-[#B89A62] shadow-lg backdrop-blur-xs">
              <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] font-semibold text-[#B89A62] block">
                Sanctum Craftsmanship
              </span>
              <h4 className="font-cormorant text-lg font-bold text-[#2B2520]">
                The Temple Haar Suite
              </h4>
              <p className="text-xs font-lato text-[#786B59] mt-0.5">
                Chiseled in high relief with kemp stones & freshwater seed pearls
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
