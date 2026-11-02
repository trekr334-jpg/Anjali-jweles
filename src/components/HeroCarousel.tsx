import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const HeroCarousel: React.FC = () => {
  const { heroBanners, setCurrentView, setSelectedCategory } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const bannerCount = heroBanners.length;
  const resumeTimerRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % bannerCount);
  }, [bannerCount]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + bannerCount) % bannerCount);
  }, [bannerCount]);

  const handleManualNav = (action: () => void) => {
    action();
    // Temporarily set hover to give user breathing room, then resume
    setIsHovered(true);
    if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => {
      setIsHovered(false);
    }, 2500);
  };

  // Automatic carousel sliding every 3.5 seconds
  useEffect(() => {
    if (bannerCount <= 1 || isHovered) return;

    const timer = window.setInterval(() => {
      nextSlide();
    }, 3500);

    return () => {
      window.clearInterval(timer);
    };
  }, [currentIndex, isHovered, bannerCount, nextSlide]);

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const handleCtaClick = (categoryLink: any) => {
    if (categoryLink) {
      setSelectedCategory(categoryLink);
    }
    setCurrentView('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-10">
      {/* Editorial Heading Above Hero Banner (crisp dark text on luxury beige background) */}
      <div className="text-center py-4 md:py-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-2 text-[#B89A62] text-[11px] sm:text-xs font-montserrat tracking-[0.28em] uppercase font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#B89A62]" />
          <span>Haute Joaillerie & Royal Heritage</span>
          <Sparkles className="w-3.5 h-3.5 text-[#B89A62]" />
        </div>
        <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#2B2520] tracking-tight leading-[1.18] text-balance">
          Discover the Art of Timeless Elegance
        </h1>
        <div className="mt-3 flex items-center justify-center gap-3">
          <span className="h-[1px] w-12 bg-[#B89A62]/50" />
          <p className="font-cormorant italic text-lg sm:text-xl text-[#B89A62] font-semibold tracking-wide">
            ANJALI JEWELS Royal Archive
          </p>
          <span className="h-[1px] w-12 bg-[#B89A62]/50" />
        </div>
      </div>

      {/* Main Large Visual Banner Frame (significantly increased height for desktop & mobile) */}
      <div
        className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_16px_48px_rgba(43,37,32,0.18)] border border-[#B89A62]/35 group bg-[#2B2520]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-full h-[400px] sm:h-[480px] md:h-[560px] lg:h-[620px] overflow-hidden">
          {heroBanners.map((banner, index) => {
            const isActive = index === currentIndex;

            return (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Banner Image with subtle luxury zoom */}
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-[6000ms] scale-100 group-hover:scale-105"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />

                {/* Luxury Vignette & Gradient Overlay for pristine text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2520]/95 via-[#2B2520]/40 to-transparent sm:bg-gradient-to-r sm:from-[#2B2520]/90 sm:via-[#2B2520]/45 sm:to-transparent" />

                {/* Editorial Content Overlay */}
                <div className="absolute inset-0 p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-end sm:justify-center max-w-2xl text-left">
                  {banner.offerTag && (
                    <div className="inline-flex items-center gap-2 mb-2 sm:mb-3">
                      <span className="font-montserrat text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#2B2520] bg-[#B89A62] px-3 py-1 rounded shadow-sm">
                        {banner.offerTag}
                      </span>
                      {banner.isUserBanner && (
                        <span className="font-montserrat text-[10px] sm:text-xs font-semibold tracking-wider text-[#F8F3EA] bg-[#2B2520]/80 border border-[#B89A62]/50 px-2.5 py-1 rounded backdrop-blur-xs">
                          Signature Edit
                        </span>
                      )}
                    </div>
                  )}

                  <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#FFF9F0] leading-[1.2] drop-shadow-md text-balance">
                    {banner.title}
                  </h2>

                  <p className="mt-2 sm:mt-4 text-xs sm:text-sm md:text-base font-lato text-[#EDE2D0] max-w-xl leading-relaxed line-clamp-2 sm:line-clamp-none">
                    {banner.subtitle}
                  </p>

                  <div className="mt-4 sm:mt-8 flex items-center gap-3 sm:gap-4">
                    <button
                      onClick={() => handleCtaClick(banner.categoryLink)}
                      className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3.5 bg-[#B89A62] hover:bg-[#D4AF37] text-[#2B2520] font-montserrat text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer group/btn"
                    >
                      <span>{banner.ctaText}</span>
                      <ArrowRight className="w-4 h-4 text-[#2B2520] group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => handleCtaClick('All')}
                      className="hidden sm:inline-flex items-center gap-2 px-5 py-3 border border-[#FFF9F0]/60 hover:border-[#B89A62] text-[#FFF9F0] hover:text-[#B89A62] font-montserrat text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg backdrop-blur-xs transition-colors"
                    >
                      View All Jewellery
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Manual Left Arrow */}
        <button
          onClick={() => handleManualNav(prevSlide)}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2B2520]/75 hover:bg-[#B89A62] text-[#FFF9F0] hover:text-[#2B2520] border border-[#B89A62]/40 flex items-center justify-center backdrop-blur-sm transition-all duration-200 shadow-md focus:outline-none cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Manual Right Arrow */}
        <button
          onClick={() => handleManualNav(nextSlide)}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#2B2520]/75 hover:bg-[#B89A62] text-[#FFF9F0] hover:text-[#2B2520] border border-[#B89A62]/40 flex items-center justify-center backdrop-blur-sm transition-all duration-200 shadow-md focus:outline-none cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Auto Progress / Pagination Indicators */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3 bg-[#2B2520]/75 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-[#B89A62]/30">
          {heroBanners.map((_, i) => (
            <button
              key={i}
              onClick={() => handleManualNav(() => setCurrentIndex(i))}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                i === currentIndex
                  ? 'w-8 h-2 bg-[#B89A62]'
                  : 'w-2 h-2 bg-[#FFF9F0]/40 hover:bg-[#FFF9F0]/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
