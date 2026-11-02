import React from 'react';
import {
  User,
  ShoppingBag,
  Heart,
  Package,
  Search,
  Headphones,
  Mail,
  Info,
  LogOut,
  LogIn,
  X,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ThreeDotMenu: React.FC = () => {
  const {
    isThreeDotMenuOpen,
    setIsThreeDotMenuOpen,
    customer,
    orders,
    wishlist,
    cartTotalCount,
    setCurrentView,
    setIsAccountModalOpen,
    logoutCustomer,
    settings,
  } = useStore();

  if (!isThreeDotMenuOpen) return null;

  const handleAction = (callback: () => void) => {
    callback();
    setIsThreeDotMenuOpen(false);
  };

  const rawWhatsApp = settings.ownerWhatsApp.replace(/[^0-9]/g, '');
  const waFormatted = rawWhatsApp.startsWith('91') ? rawWhatsApp : `91${rawWhatsApp}`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2B2520]/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsThreeDotMenuOpen(false)}
      />

      {/* Slide-over Side Panel (Warm Champagne #FAF5ED, NO pure white) */}
      <div className="relative w-full max-w-sm bg-[#FAF5ED] border-l border-[#B89A62]/35 h-full p-6 flex flex-col justify-between overflow-y-auto shadow-2xl z-10">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#B89A62]/20">
            <div>
              <h3 className="font-cormorant text-2xl font-bold text-[#2B2520]">
                Customer Concierge
              </h3>
              <p className="text-[11px] font-montserrat uppercase tracking-[0.16em] text-[#B89A62] font-semibold">
                ANJALI JEWELS
              </p>
            </div>
            <button
              onClick={() => setIsThreeDotMenuOpen(false)}
              className="p-1.5 text-[#2B2520] hover:text-[#B89A62] transition-colors rounded-full cursor-pointer"
              aria-label="Close Concierge Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Customer Greeting / Status Box */}
          <div className="my-5 p-4 rounded-xl bg-[#F8F3EA] border border-[#B89A62]/30">
            {customer.isLoggedIn ? (
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#B89A62]/20 border border-[#B89A62] flex items-center justify-center text-[#B89A62]">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-montserrat font-bold text-[#2B2520]">
                      {customer.name}
                    </h4>
                    <p className="text-[11px] font-lato text-[#786B59]">
                      {customer.phone}
                    </p>
                  </div>
                </div>
                <div className="pt-2 flex items-center justify-between text-[11px] text-[#B89A62] font-montserrat font-semibold border-t border-[#B89A62]/15">
                  <span>{orders.length} Placed Orders</span>
                  <span>·</span>
                  <span>{wishlist.length} in Wishlist</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-montserrat text-[#2B2520] font-bold">
                  <CheckCircle2 className="w-4 h-4 text-[#B89A62]" />
                  <span>Welcome to ANJALI JEWELS</span>
                </div>
                <p className="text-[12px] font-lato text-[#786B59] leading-relaxed">
                  Enjoy seamless guest checkout, instant Buy Now, and direct WhatsApp order booking (+91 9319862576).
                </p>
                <button
                  onClick={() => handleAction(() => setIsAccountModalOpen(true))}
                  className="w-full mt-1 py-2 px-3 bg-[#B89A62] hover:bg-[#D4AF37] text-[#2B2520] font-montserrat text-xs font-bold uppercase rounded-lg transition-colors text-center cursor-pointer shadow-sm"
                >
                  Sign In with Phone
                </button>
              </div>
            )}
          </div>

          {/* Core Menu Options List */}
          <div className="space-y-1 font-montserrat text-xs uppercase tracking-wider text-[#2B2520]">
            {/* My Account */}
            <button
              onClick={() => handleAction(() => setIsAccountModalOpen(true))}
              className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-lg hover:bg-[#EDE2D0] hover:text-[#B89A62] transition-colors text-left cursor-pointer"
            >
              <User className="w-4 h-4 text-[#B89A62]" />
              <span>My Account</span>
            </button>

            {/* My Orders */}
            <button
              onClick={() => handleAction(() => setCurrentView('orders'))}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#EDE2D0] hover:text-[#B89A62] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <Package className="w-4 h-4 text-[#B89A62]" />
                <span>My Orders</span>
              </div>
              {orders.length > 0 && (
                <span className="text-[11px] bg-[#2B2520] text-[#FFF9F0] px-2 py-0.5 rounded font-mono">
                  {orders.length}
                </span>
              )}
            </button>

            {/* My Wishlist */}
            <button
              onClick={() => handleAction(() => setCurrentView('catalogue'))}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#EDE2D0] hover:text-[#B89A62] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <Heart className="w-4 h-4 text-[#B89A62]" />
                <span>My Wishlist</span>
              </div>
              {wishlist.length > 0 && (
                <span className="text-[11px] bg-[#B89A62] text-[#2B2520] px-2 py-0.5 rounded font-bold font-mono">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* My Cart */}
            <button
              onClick={() => handleAction(() => setCurrentView('cart'))}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-[#EDE2D0] hover:text-[#B89A62] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3.5">
                <ShoppingBag className="w-4 h-4 text-[#B89A62]" />
                <span>My Cart</span>
              </div>
              {cartTotalCount > 0 && (
                <span className="text-[11px] bg-[#B89A62] text-[#2B2520] px-2 py-0.5 rounded font-bold font-mono">
                  {cartTotalCount}
                </span>
              )}
            </button>

            {/* Track Order */}
            <button
              onClick={() => handleAction(() => setCurrentView('orders'))}
              className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-lg hover:bg-[#EDE2D0] hover:text-[#B89A62] transition-colors text-left cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#B89A62]" />
              <span>Track Order</span>
            </button>

            <div className="my-2 border-t border-[#B89A62]/20" />

            {/* Customer Support */}
            <a
              href={`https://wa.me/${waFormatted}?text=${encodeURIComponent(
                'Hello ANJALI JEWELS Concierge, I need assistance with an enquiry.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-lg hover:bg-[#EDE2D0] hover:text-[#B89A62] transition-colors text-left"
            >
              <Headphones className="w-4 h-4 text-[#B89A62]" />
              <span>Customer Support (WhatsApp)</span>
            </a>

            {/* Contact Us */}
            <button
              onClick={() => {
                handleAction(() => {
                  const footer = document.getElementById('footer-section');
                  if (footer) footer.scrollIntoView({ behavior: 'smooth' });
                });
              }}
              className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-lg hover:bg-[#EDE2D0] hover:text-[#B89A62] transition-colors text-left cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#B89A62]" />
              <span>Contact Us</span>
            </button>

            {/* About ANJALI JEWELS */}
            <button
              onClick={() => handleAction(() => setCurrentView('about'))}
              className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-lg hover:bg-[#EDE2D0] hover:text-[#B89A62] transition-colors text-left cursor-pointer"
            >
              <Info className="w-4 h-4 text-[#B89A62]" />
              <span>About ANJALI JEWELS</span>
            </button>

            {/* Admin Dashboard */}
            <button
              onClick={() => handleAction(() => setCurrentView('admin'))}
              className="w-full flex items-center gap-3.5 px-3 py-2.5 rounded-lg hover:bg-[#EDE2D0] hover:text-[#B89A62] transition-colors text-left text-[#B89A62] font-semibold cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Owner Admin Panel</span>
            </button>
          </div>
        </div>

        {/* Footer / Logout */}
        <div className="pt-4 border-t border-[#B89A62]/20">
          {customer.isLoggedIn ? (
            <button
              onClick={() => handleAction(logoutCustomer)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-[#B89A62]/40 text-[#2B2520] hover:text-[#B89A62] hover:border-[#B89A62] transition-colors text-xs font-montserrat uppercase tracking-wider cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          ) : (
            <button
              onClick={() => handleAction(() => setIsAccountModalOpen(true))}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#B89A62] text-[#2B2520] font-montserrat text-xs font-bold uppercase tracking-wider hover:bg-[#D4AF37] transition-colors cursor-pointer shadow-sm"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
