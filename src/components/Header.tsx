import React, { useState } from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  MoreVertical,
  Menu,
  X,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BrandLogo } from './BrandLogo';
import { ProductCategory } from '../types';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    selectedCategory,
    setSelectedCategory,
    cartTotalCount,
    wishlist,
    customer,
    settings,
    setIsAccountModalOpen,
    setIsCameraSearchOpen,
    isThreeDotMenuOpen,
    setIsThreeDotMenuOpen,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navCategories: { label: string; category?: ProductCategory; view?: 'home' | 'catalogue' | 'about' }[] = [
    { label: 'Home', view: 'home' },
    { label: 'All Jewellery', view: 'catalogue', category: 'All' },
    { label: 'Necklaces', view: 'catalogue', category: 'Necklaces' },
    { label: 'Bangles', view: 'catalogue', category: 'Bangles' },
    { label: 'Earrings', view: 'catalogue', category: 'Earrings' },
    { label: 'Bridal Jewellery', view: 'catalogue', category: 'Bridal Jewellery' },
    { label: 'New Arrivals', view: 'catalogue', category: 'New Arrivals' },
  ];

  const handleNavClick = (item: (typeof navCategories)[0]) => {
    if (item.category) {
      setSelectedCategory(item.category);
    }
    if (item.view) {
      setCurrentView(item.view);
    } else {
      setCurrentView('catalogue');
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cleanPhone = settings.ownerPhone.replace(/[^0-9]/g, '');

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#2B2520] text-[#FFF9F0] text-[11px] md:text-xs py-1.5 px-4 text-center border-b border-[#B89A62]/30 font-montserrat tracking-wider flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#B89A62] shrink-0" />
        <span className="truncate">{settings.announcementText}</span>
        <span className="hidden md:inline text-[#B89A62] font-semibold">·</span>
        <a
          href={`tel:+91${cleanPhone.replace(/^91/, '')}`}
          className="hidden md:inline-flex items-center gap-1 text-[#B89A62] hover:text-[#FFF9F0] transition-colors font-medium ml-1"
        >
          <Phone className="w-3 h-3" />
          <span>Concierge: {settings.ownerPhone}</span>
        </a>
      </div>

      {/* Main Luxury Header with distinct Champagne background (#FAF5ED) & gold border */}
      <header className="sticky top-0 z-40 bg-[#FAF5ED]/95 backdrop-blur-md border-b border-[#B89A62]/30 shadow-[0_4px_20px_rgba(43,37,32,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 md:h-24 flex items-center justify-between gap-4">
          {/* Mobile Menu Button (Left on mobile) */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#2B2520] hover:text-[#B89A62] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B89A62] cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* LEFT: Official Brand Logo prominent display */}
          <div className="flex items-center shrink-0">
            <BrandLogo variant="header" />
          </div>

          {/* CENTER: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center justify-center gap-7 text-xs font-montserrat font-medium tracking-[0.14em] uppercase text-[#2B2520]">
            {navCategories.map((item) => {
              const isActive =
                item.view === 'home'
                  ? currentView === 'home'
                  : currentView === 'catalogue' && selectedCategory === item.category;

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item)}
                  className={`relative py-2 whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#B89A62] font-bold'
                      : 'hover:text-[#B89A62]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B89A62]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT: Minimalist luxury action icons in dark charcoal with gold hover */}
          <div className="flex items-center gap-1 sm:gap-3 shrink-0">
            {/* Visual / Text Search Trigger */}
            <button
              onClick={() => setIsCameraSearchOpen(true)}
              className="p-2 text-[#2B2520] hover:text-[#B89A62] transition-colors rounded-full hover:bg-[#EDE2D0]/60 cursor-pointer"
              title="Search by Keyword or Photo"
              aria-label="Search Jewellery"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => {
                setCurrentView('catalogue');
              }}
              className="relative p-2 text-[#2B2520] hover:text-[#B89A62] transition-colors rounded-full hover:bg-[#EDE2D0]/60 cursor-pointer"
              title="My Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B89A62] text-[#2B2520] text-[10px] font-bold rounded-full flex items-center justify-center font-montserrat">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Customer Account */}
            <button
              onClick={() => setIsAccountModalOpen(true)}
              className="p-2 text-[#2B2520] hover:text-[#B89A62] transition-colors rounded-full hover:bg-[#EDE2D0]/60 hidden sm:flex items-center cursor-pointer"
              title={customer.isLoggedIn ? `Account (${customer.name})` : 'Login / Guest Account'}
              aria-label="Customer Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Shopping Bag */}
            <button
              onClick={() => setCurrentView('cart')}
              className="relative p-2 text-[#2B2520] hover:text-[#B89A62] transition-colors rounded-full hover:bg-[#EDE2D0]/60 cursor-pointer"
              title="Shopping Bag"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartTotalCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#B89A62] text-[#2B2520] text-[10px] font-bold rounded-full flex items-center justify-center font-montserrat animate-pulse">
                  {cartTotalCount}
                </span>
              )}
            </button>

            {/* Three-Dot Customer Menu Trigger */}
            <button
              onClick={() => setIsThreeDotMenuOpen(!isThreeDotMenuOpen)}
              className="p-2 text-[#2B2520] hover:text-[#B89A62] transition-colors rounded-full hover:bg-[#EDE2D0]/60 cursor-pointer"
              title="Customer Menu"
              aria-label="More Options"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation in matching Warm Champagne palette */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#2B2520]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-4/5 max-w-sm bg-[#FAF5ED] border-r border-[#B89A62]/30 h-full p-6 flex flex-col justify-between overflow-y-auto shadow-2xl">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#B89A62]/20">
                <BrandLogo variant="compact" onClick={() => setMobileMenuOpen(false)} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#2B2520] hover:text-[#B89A62] transition-colors cursor-pointer"
                  aria-label="Close Navigation Menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="py-5 flex flex-col space-y-2 font-montserrat uppercase tracking-[0.14em] text-sm">
                {navCategories.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className="text-left py-2.5 px-3 text-[#2B2520] hover:text-[#B89A62] hover:bg-[#EDE2D0]/70 rounded-lg transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Customer Actions */}
              <div className="pt-4 border-t border-[#B89A62]/20 flex flex-col space-y-2.5 font-montserrat text-xs">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAccountModalOpen(true);
                  }}
                  className="flex items-center gap-3 p-2.5 text-[#2B2520] hover:text-[#B89A62] bg-[#EDE2D0]/60 rounded-lg cursor-pointer"
                >
                  <User className="w-4 h-4 text-[#B89A62]" />
                  <span>{customer.isLoggedIn ? `Account: ${customer.name}` : 'Login / My Account'}</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCurrentView('cart');
                  }}
                  className="flex items-center justify-between p-2.5 text-[#2B2520] hover:text-[#B89A62] bg-[#EDE2D0]/60 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4 text-[#B89A62]" />
                    <span>Shopping Bag</span>
                  </div>
                  <span className="bg-[#B89A62] text-[#2B2520] px-2 py-0.5 rounded text-[10px] font-bold">
                    {cartTotalCount}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCurrentView('admin');
                  }}
                  className="flex items-center gap-3 p-2.5 text-[#2B2520]/80 hover:text-[#B89A62] border border-[#B89A62]/40 rounded-lg cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#B89A62]" />
                  <span>Admin Dashboard</span>
                </button>
              </div>
            </div>

            {/* Drawer Footer Contact */}
            <div className="pt-6 border-t border-[#B89A62]/20 text-xs text-[#786B59] font-lato">
              <p className="font-montserrat text-[11px] text-[#B89A62] font-semibold tracking-wider uppercase mb-1">
                Concierge Assistance
              </p>
              <a href={`tel:+91${cleanPhone.replace(/^91/, '')}`} className="hover:text-[#2B2520]">
                +91 {settings.ownerPhone}
              </a>
              <p className="text-[10px] text-[#786B59]/70 mt-2">
                © {new Date().getFullYear()} ANJALI JEWELS. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
