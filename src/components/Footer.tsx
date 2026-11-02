import React, { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Instagram,
  MapPin,
  Sparkles,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { settings, setCurrentView, setSelectedCategory, setIsAccountModalOpen, showToast } =
    useStore();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'info');
      return;
    }
    setNewsletterSubscribed(true);
    showToast('Welcome to the Royal Circle! Your 10% privilege code: AJROYAL', 'success');
  };

  const rawPhone = settings.ownerPhone.replace(/[^0-9]/g, '');
  const phoneFormatted = rawPhone.startsWith('91') ? rawPhone.slice(2) : rawPhone;
  const rawWhatsApp = settings.ownerWhatsApp.replace(/[^0-9]/g, '');
  const waFormatted = rawWhatsApp.startsWith('91') ? rawWhatsApp : `91${rawWhatsApp}`;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    settings.businessAddress || 'Janakpuri, Delhi'
  )}`;

  return (
    <footer id="footer-section" className="bg-[#2B2520] text-[#FFF9F0] border-t border-[#B89A62]/40 pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Privilege Section */}
        <div className="mb-12 p-6 sm:p-10 rounded-2xl md:rounded-3xl bg-[#38312A] border border-[#B89A62]/40 backdrop-blur-sm flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center lg:text-left max-w-xl">
            <div className="flex items-center justify-center lg:justify-start gap-2 text-[#B89A62] text-xs font-montserrat uppercase tracking-[0.2em] mb-2 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The ANJALI JEWELS Royal Circle</span>
            </div>
            <h3 className="font-playfair text-2xl sm:text-3xl font-medium text-[#FFF9F0]">
              Receive Exclusive Previews & 10% Welcome Courtesy
            </h3>
            <p className="text-xs sm:text-sm font-lato text-[#EDE2D0]/80 mt-1">
              Be the first to inspect limited-run bridal suites and private heritage archives.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 p-3 bg-[#2B2520] border border-[#B89A62] rounded-xl text-xs font-montserrat text-[#B89A62]">
                <Check className="w-4 h-4 text-[#B89A62]" />
                <span>Privilege Registered! Use code <strong>AJROYAL</strong> on WhatsApp checkout.</span>
              </div>
            ) : (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-96"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full py-3 px-4 rounded-xl bg-[#FFF9F0] text-[#2B2520] placeholder-[#786B59] text-xs font-lato focus:outline-none focus:ring-1 focus:ring-[#B89A62]"
                />
                <button
                  type="submit"
                  className="py-3 px-5 rounded-xl bg-[#B89A62] hover:bg-[#D4AF37] text-[#2B2520] text-xs font-montserrat font-bold uppercase tracking-wider transition-colors shrink-0 shadow-md cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Five Column Luxury Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-[#B89A62]/20">
          {/* Column 1: ANJALI JEWELS Official Logo & Statement */}
          <div className="space-y-4 lg:col-span-1">
            <BrandLogo variant="footer" />
            <p className="text-xs font-lato text-[#EDE2D0]/75 leading-relaxed">
              Curating South Indian temple gold, Rajasthani royal kundan, and timeless bridal heirlooms with uncompromising perfection.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-montserrat uppercase tracking-wider text-[#B89A62] font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified 22K Antique Micron</span>
            </div>
          </div>

          {/* Column 2: Customer Service */}
          <div>
            <h4 className="font-montserrat font-bold text-xs uppercase tracking-[0.2em] text-[#B89A62] mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2.5 text-xs font-lato text-[#EDE2D0]/80">
              <li>
                <a
                  href={`https://wa.me/${waFormatted}?text=${encodeURIComponent(
                    'Hello ANJALI JEWELS Concierge, I would like to contact customer support.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#B89A62] transition-colors"
                >
                  Contact Us (WhatsApp)
                </a>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-[#B89A62] transition-colors cursor-pointer text-left"
                >
                  FAQ & Care Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-[#B89A62] transition-colors cursor-pointer text-left"
                >
                  Shipping Information
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-[#B89A62] transition-colors cursor-pointer text-left"
                >
                  Return and Exchange Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('orders')}
                  className="hover:text-[#B89A62] transition-colors cursor-pointer text-left"
                >
                  Order Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Brand */}
          <div>
            <h4 className="font-montserrat font-bold text-xs uppercase tracking-[0.2em] text-[#B89A62] mb-4">
              Our Brand
            </h4>
            <ul className="space-y-2.5 text-xs font-lato text-[#EDE2D0]/80">
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-[#B89A62] transition-colors cursor-pointer text-left"
                >
                  About ANJALI JEWELS
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-[#B89A62] transition-colors cursor-pointer text-left"
                >
                  Our Karigar Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Bridal Jewellery');
                    setCurrentView('catalogue');
                  }}
                  className="hover:text-[#B89A62] transition-colors cursor-pointer text-left"
                >
                  Bridal Suites
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('New Arrivals');
                    setCurrentView('catalogue');
                  }}
                  className="hover:text-[#B89A62] transition-colors cursor-pointer text-left"
                >
                  New Arrivals
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Information */}
          <div>
            <h4 className="font-montserrat font-bold text-xs uppercase tracking-[0.2em] text-[#B89A62] mb-4">
              Customer Information
            </h4>
            <ul className="space-y-2.5 text-xs font-lato text-[#EDE2D0]/80">
              <li>
                <button
                  onClick={() => setIsAccountModalOpen(true)}
                  className="hover:text-[#B89A62] transition-colors cursor-pointer text-left"
                >
                  My Account
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('orders')}
                  className="hover:text-[#B89A62] transition-colors cursor-pointer text-left"
                >
                  My Orders
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('catalogue')}
                  className="hover:text-[#B89A62] transition-colors cursor-pointer text-left"
                >
                  Royal Wishlist
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-[#B89A62] transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-[#B89A62] transition-colors cursor-pointer text-left"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Connect With Us — Exact Contact Specifications */}
          <div className="space-y-3">
            <h4 className="font-montserrat font-bold text-xs uppercase tracking-[0.2em] text-[#B89A62] mb-4">
              Connect With Us
            </h4>

            {/* Instagram Link: @AnjaliiJewels */}
            <a
              href="https://www.instagram.com/AnjaliiJewels/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#38312A] hover:bg-[#B89A62] text-[#FFF9F0] hover:text-[#2B2520] transition-all group"
            >
              <Instagram className="w-4 h-4 text-[#B89A62] group-hover:text-[#2B2520] shrink-0" />
              <div className="text-xs font-montserrat truncate">
                <span className="block font-medium">Instagram</span>
                <span className="text-[10px] opacity-75">@AnjaliiJewels</span>
              </div>
            </a>

            {/* WhatsApp Booking Link: 9319862576 */}
            <a
              href={`https://wa.me/${waFormatted}?text=${encodeURIComponent(
                'Hello ANJALI JEWELS Concierge, I would like to inquire about your jewellery collection.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#38312A] hover:bg-[#B89A62] text-[#FFF9F0] hover:text-[#2B2520] transition-all group"
            >
              <MessageCircle className="w-4 h-4 text-[#B89A62] group-hover:text-[#2B2520] shrink-0" />
              <div className="text-xs font-montserrat truncate">
                <span className="block font-medium">WhatsApp Booking</span>
                <span className="text-[10px] opacity-75">+91 {phoneFormatted}</span>
              </div>
            </a>

            {/* Owner Phone Link: 9319862576 */}
            <a
              href={`tel:+91${phoneFormatted}`}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-[#38312A] hover:bg-[#B89A62] text-[#FFF9F0] hover:text-[#2B2520] transition-all group"
            >
              <Phone className="w-4 h-4 text-[#B89A62] group-hover:text-[#2B2520] shrink-0" />
              <div className="text-xs font-montserrat truncate">
                <span className="block font-medium">Direct Call</span>
                <span className="text-[10px] opacity-75">+91 {phoneFormatted}</span>
              </div>
            </a>

            {/* Business Address Link: Janakpuri, Delhi */}
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-2.5 rounded-xl bg-[#38312A] hover:bg-[#B89A62] text-[#FFF9F0] hover:text-[#2B2520] transition-all group text-left"
            >
              <MapPin className="w-4 h-4 text-[#B89A62] group-hover:text-[#2B2520] shrink-0 mt-0.5" />
              <div className="text-xs font-montserrat">
                <span className="block font-medium">Boutique Atelier</span>
                <span className="text-[11px] font-lato opacity-85">
                  Janakpuri, Delhi
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-lato text-[#EDE2D0]/60 gap-4">
          <p>© {new Date().getFullYear()} ANJALI JEWELS. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] font-montserrat uppercase tracking-wider flex-wrap justify-center">
            <span>Handcrafted in India</span>
            <span>·</span>
            <span>Pan-India Insured Transit</span>
            <span>·</span>
            <span>22K Antique Micron Gold</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
