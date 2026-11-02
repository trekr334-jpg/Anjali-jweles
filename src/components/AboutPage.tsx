import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Sparkles, MessageCircle, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BrandLogo } from './BrandLogo';

export const AboutPage: React.FC = () => {
  const { setCurrentView, settings } = useStore();

  const rawWhatsApp = settings.ownerWhatsApp.replace(/[^0-9]/g, '');
  const waFormatted = rawWhatsApp.startsWith('91') ? rawWhatsApp : `91${rawWhatsApp}`;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back button */}
      <div className="mb-6">
        <button
          onClick={() => setCurrentView('home')}
          className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-wider text-[#2B2520] hover:text-[#B89A62] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Brand Hero */}
      <div className="text-center pb-10 border-b border-[#B89A62]/30">
        <div className="inline-block mx-auto mb-4">
          <BrandLogo variant="large" />
        </div>
        <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-medium text-[#2B2520]">
          The ANJALI JEWELS Ethos
        </h1>
        <p className="mt-3 text-sm sm:text-base font-lato text-[#786B59] max-w-2xl mx-auto leading-relaxed">
          Crafting heritage artificial and semi-precious jewellery with the regal heft, immaculate polish, and sacred grandeur of museum-grade Indian royal heirlooms.
        </p>
      </div>

      {/* Content Sections */}
      <div className="my-10 space-y-10">
        {/* Our Karigar Legacy */}
        <div className="p-8 rounded-3xl bg-[#FFF9F0] text-[#2B2520] border border-[#B89A62]/40 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-montserrat uppercase tracking-[0.2em] font-semibold text-[#B89A62]">
            <Sparkles className="w-4 h-4 text-[#B89A62]" />
            <span>The Karigar Legacy</span>
          </div>
          <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#2B2520]">
            Sculpted by Hand, Blessed by Tradition
          </h2>
          <p className="text-sm font-lato text-[#786B59] leading-relaxed">
            ANJALI JEWELS was founded with an unyielding dedication: to revive the sacred temple sculptures of Thanjavur and the courtly Kundan Meenakari of the Jaipur royalty, making them accessible to discerning brides worldwide without compromising on density, gold tone, or stone brilliance.
          </p>
          <p className="text-sm font-lato text-[#786B59] leading-relaxed">
            Each creation undergoes over 12 stages of hand fabrication—from wax embossing to ancient kemp encrustation and our signature 22K antique matte micron plating that wards off tarnishing.
          </p>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping & Delivery */}
          <div className="p-6 rounded-2xl bg-[#FFF9F0] text-[#2B2520] border border-[#B89A62]/30 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2B2520] text-[#B89A62] flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-montserrat font-bold text-base text-[#2B2520]">
                Pan-India Insured Transit
              </h3>
            </div>
            <p className="text-xs font-lato text-[#786B59] leading-relaxed">
              Every parcel is shipped through insured premium express logistics in tamper-evident safety packaging with door-step signature verification. Dispatch takes place within 24 to 48 hours from our Janakpuri, Delhi boutique.
            </p>
          </div>

          {/* Guarantee & Finish */}
          <div className="p-6 rounded-2xl bg-[#FFF9F0] text-[#2B2520] border border-[#B89A62]/30 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#2B2520] text-[#B89A62] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-montserrat font-bold text-base text-[#2B2520]">
                22K Antique Micron Plating
              </h3>
            </div>
            <p className="text-xs font-lato text-[#786B59] leading-relaxed">
              Our artificial jewellery utilizes multi-layer antique micron electroplating, providing authentic real-gold lustre without cheap brass yellow tints. Lead, nickel, and allergen compliant.
            </p>
          </div>
        </div>

        {/* WhatsApp Concierge Banner */}
        <div className="p-8 rounded-3xl bg-[#2B2520] text-[#FFF9F0] border border-[#B89A62]/50 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-playfair text-2xl font-medium text-[#FFF9F0]">
              Personalized Video Styling Consultation
            </h3>
            <p className="text-xs sm:text-sm font-lato text-[#EDE2D0]/80">
              Inspect pieces live with our jewellery concierge on WhatsApp prior to ordering.
            </p>
          </div>
          <a
            href={`https://wa.me/${waFormatted}?text=${encodeURIComponent(
              'Hello ANJALI JEWELS Concierge, I would like to book a personal jewellery styling consultation.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-[#B89A62] hover:bg-[#D4AF37] text-[#2B2520] font-montserrat text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp (+91 9319862576)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
