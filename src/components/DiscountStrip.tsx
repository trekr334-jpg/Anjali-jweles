import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface DiscountStripProps {
  variant?: 'gold' | 'bronze' | 'pink' | 'features';
  title?: string;
  subtitle?: string;
  code?: string;
  ctaText?: string;
  categoryLink?: any;
}

export const DiscountStrip: React.FC<DiscountStripProps> = ({
  variant = 'gold',
  title = 'Celebrate Every Moment in Elegance',
  subtitle = 'Enjoy a Special 10% Courtesy on all Handcrafted Bridal Suites',
  code = 'AJROYAL',
  ctaText = 'Shop Royal Suite',
  categoryLink = 'Bridal Jewellery',
}) => {
  const { setCurrentView, setSelectedCategory } = useStore();

  const handleClick = () => {
    if (categoryLink) setSelectedCategory(categoryLink);
    setCurrentView('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (variant === 'features') {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 my-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#FFF9F0] border border-[#B89A62]/35 shadow-sm">
          <div className="flex items-center gap-3.5 p-2">
            <div className="w-10 h-10 rounded-full bg-[#EDE2D0] border border-[#B89A62] text-[#B89A62] flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-montserrat font-bold text-xs uppercase tracking-wider text-[#2B2520]">
                Complimentary Insured Shipping
              </h4>
              <p className="text-[11px] font-lato text-[#786B59]">
                Direct to your doorstep across India in tamper-proof seals
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 border-t sm:border-t-0 sm:border-l border-[#B89A62]/20">
            <div className="w-10 h-10 rounded-full bg-[#EDE2D0] border border-[#B89A62] text-[#B89A62] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-montserrat font-bold text-xs uppercase tracking-wider text-[#2B2520]">
                22K Antique Micron Gold Polish
              </h4>
              <p className="text-[11px] font-lato text-[#786B59]">
                Master karigar craftsmanship with heirloom longevity
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2 border-t sm:border-t-0 sm:border-l border-[#B89A62]/20">
            <div className="w-10 h-10 rounded-full bg-[#EDE2D0] border border-[#B89A62] text-[#B89A62] flex items-center justify-center shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-montserrat font-bold text-xs uppercase tracking-wider text-[#2B2520]">
                Concierge WhatsApp Booking
              </h4>
              <p className="text-[11px] font-lato text-[#786B59]">
                Direct booking on +91 9319862576 with personalized assistance
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Elegant Thin Ribbon Strip
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 my-8">
      <div
        className={`relative overflow-hidden rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-4 border shadow-sm ${
          variant === 'pink'
            ? 'bg-[#E8C9CB] text-[#2B2520] border-[#B89A62]/60'
            : variant === 'bronze'
            ? 'bg-[#2B2520] text-[#FFF9F0] border-[#B89A62]/40'
            : 'bg-[#EDE2D0] text-[#2B2520] border-[#B89A62]'
        }`}
      >
        <div className="flex items-center gap-4 text-center md:text-left">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 hidden sm:flex ${
              variant === 'bronze'
                ? 'bg-[#38312A] text-[#B89A62]'
                : 'bg-[#2B2520] text-[#B89A62]'
            }`}
          >
            <Sparkles className="w-6 h-6" />
          </div>

          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="font-montserrat text-[10px] uppercase tracking-[0.2em] font-bold text-[#B89A62]">
                Privilege Offer
              </span>
              <span className="text-xs font-mono font-bold bg-[#2B2520] text-[#FFF9F0] px-2 py-0.5 rounded">
                CODE: {code}
              </span>
            </div>

            <h3 className="font-playfair text-xl sm:text-2xl font-medium tracking-tight">
              {title}
            </h3>
            <p className="text-xs sm:text-sm font-lato opacity-85 mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        <button
          onClick={handleClick}
          className={`shrink-0 inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-montserrat font-bold uppercase tracking-wider transition-all shadow-md group cursor-pointer ${
            variant === 'bronze'
              ? 'bg-[#B89A62] text-[#2B2520] hover:bg-[#D4AF37]'
              : 'bg-[#2B2520] text-[#FFF9F0] hover:bg-[#B89A62] hover:text-[#2B2520]'
          }`}
        >
          <span>{ctaText}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
