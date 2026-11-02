import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FooterModelBanner: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useStore();

  const handleShopNow = () => {
    setSelectedCategory('Bridal Jewellery');
    setCurrentView('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14">
      <div className="relative rounded-3xl overflow-hidden border border-[#B99A62]/50 shadow-[0_20px_60px_rgba(20,26,22,0.8)] bg-[#222C26] min-h-[460px] md:min-h-[520px] flex items-center">
        {/* Background Image: Model on the right, atmospheric dark forest on left */}
        <img
          src="/src/assets/images/footer_model_campaign_banner_1793623153541.jpg"
          alt="ANJALI JEWELS Editorial Model Campaign"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
        />

        {/* Cinematic Scrim Gradient (Left side dark for typography readability) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#222C26]/95 via-[#222C26]/60 to-transparent md:bg-gradient-to-r md:from-[#222C26]/95 md:via-[#222C26]/75 md:to-transparent" />

        {/* Content on Left Side */}
        <div className="relative z-10 p-8 sm:p-12 md:p-16 max-w-xl text-left space-y-5">
          <div className="inline-flex items-center gap-2 text-[#B99A62] text-xs font-montserrat uppercase tracking-[0.25em]">
            <Sparkles className="w-4 h-4 text-[#B99A62]" />
            <span>The Bridal Haute Archive</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-medium text-[#E8D8B8] leading-[1.15] text-balance">
            Heirlooms Crafted for Generations of Splendour
          </h2>

          <p className="font-lato text-xs sm:text-sm md:text-base text-[#E8D8B8]/85 leading-relaxed">
            Every creation at ANJALI JEWELS captures the divine aura of ancient Indian sanctums, marrying temple devotion with contemporary bridal royalty. Experience handcrafted perfection made to outshine time itself.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={handleShopNow}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#B99A62] hover:bg-[#D4AF37] text-[#29251F] font-montserrat text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-xl transition-all duration-200 group cursor-pointer"
            >
              <span>Discover the Collection</span>
              <ArrowRight className="w-4 h-4 text-[#29251F] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                setCurrentView('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 border border-[#B99A62]/50 hover:border-[#B99A62] text-[#E8D8B8] hover:text-[#B99A62] font-montserrat text-xs sm:text-sm font-medium uppercase tracking-wider rounded-xl backdrop-blur-xs transition-colors"
            >
              Our Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
