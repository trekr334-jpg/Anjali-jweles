import React from 'react';
import { useStore } from '../context/StoreContext';

interface BrandLogoProps {
  variant?: 'header' | 'footer' | 'compact' | 'large';
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'header',
  className = '',
  onClick,
}) => {
  const { setCurrentView, settings } = useStore();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Official logo image path uploaded by the user
  const logoSrc = settings?.logoUrl || '/assets/aistudio/IMG-20261102-WA0011_f11c9034.jpg';

  // Responsive heights matching variant, preserving natural aspect ratio without distortion
  const heightClasses = {
    compact: 'h-11 sm:h-12',
    header: 'h-14 sm:h-16 md:h-18',
    footer: 'h-20 sm:h-24 md:h-28',
    large: 'h-24 sm:h-32 md:h-36',
  }[variant];

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
      className={`inline-flex items-center cursor-pointer select-none group transition-transform duration-300 hover:scale-[1.02] ${className}`}
      aria-label="ANJALI JEWELS — Official Brand Logo"
    >
      <div className="relative overflow-hidden rounded-lg sm:rounded-xl border border-[#B89A62]/40 bg-[#1e0a0d] shadow-[0_4px_16px_rgba(43,37,32,0.18)] group-hover:border-[#B89A62] group-hover:shadow-[0_6px_24px_rgba(184,154,98,0.35)] transition-all">
        <img
          src={logoSrc}
          alt="ANJALI JEWELS — Artificial Jewellery Official Logo"
          className={`${heightClasses} w-auto object-contain block`}
          loading="eager"
        />
        {/* Subtle royal highlight overlay sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-[#B89A62]/10 opacity-60 pointer-events-none group-hover:opacity-90 transition-opacity" />
      </div>
    </div>
  );
};
