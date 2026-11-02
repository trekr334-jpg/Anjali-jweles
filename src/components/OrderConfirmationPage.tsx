import React from 'react';
import {
  CheckCircle2,
  MessageCircle,
  Copy,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Send,
  Phone,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { BrandLogo } from './BrandLogo';

export const OrderConfirmationPage: React.FC = () => {
  const {
    lastCreatedOrder,
    orders,
    settings,
    triggerWhatsAppOrder,
    setCurrentView,
    showToast,
  } = useStore();

  const order = lastCreatedOrder || orders[0];

  if (!order) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="font-playfair text-3xl font-medium text-[#2B2520]">
          No active order in session
        </h2>
        <button
          onClick={() => setCurrentView('catalogue')}
          className="mt-6 px-6 py-3 bg-[#B89A62] text-[#2B2520] font-montserrat text-xs font-bold uppercase rounded-lg cursor-pointer"
        >
          Explore Catalogue
        </button>
      </div>
    );
  }

  const copyOrderDetails = () => {
    const text = `ANJALI JEWELS Order ${order.id}\nTotal: ₹${order.finalTotal.toLocaleString('en-IN')}\nStatus: ${order.status}`;
    navigator.clipboard?.writeText(text);
    showToast('Order details copied to clipboard', 'info');
  };

  const rawPhone = settings.ownerPhone.replace(/[^0-9]/g, '');
  const phoneFormatted = rawPhone.startsWith('91') ? rawPhone.slice(2) : rawPhone;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Decorative Brand Header */}
      <div className="text-center pb-8 border-b border-[#B89A62]/30">
        <div className="inline-block mx-auto mb-4">
          <BrandLogo variant="large" />
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B89A62]/20 border border-[#B89A62] text-[#2B2520] text-xs font-montserrat uppercase tracking-[0.2em] font-semibold">
          <CheckCircle2 className="w-4 h-4 text-[#B89A62]" />
          <span>ORDER REQUEST PREPARED</span>
        </div>
        <p className="mt-3 text-xs sm:text-sm font-lato text-[#786B59] max-w-lg mx-auto">
          Your exclusive reservation has been logged in the ANJALI JEWELS private registry. Please finalize order confirmation via WhatsApp with our concierge.
        </p>
      </div>

      {/* Main Order Voucher Card (Warm Off-White #FFF9F0 with Charcoal Bronze #2B2520 header, NO pure white) */}
      <div className="my-8 rounded-3xl bg-[#FFF9F0] text-[#2B2520] border border-[#B89A62]/40 shadow-[0_16px_40px_rgba(43,37,32,0.1)] overflow-hidden">
        {/* Top Metallic Gold / Charcoal Banner */}
        <div className="bg-[#2B2520] text-[#FFF9F0] px-6 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#B89A62]/40">
          <div>
            <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] text-[#B89A62] font-semibold">
              Official Reservation Receipt
            </span>
            <h2 className="font-mono text-2xl font-bold tracking-wider text-[#FFF9F0]">
              {order.id}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyOrderDetails}
              className="p-2 rounded-lg bg-[#38312A] hover:bg-[#B89A62] hover:text-[#2B2520] text-[#FFF9F0] text-xs font-montserrat transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Copy Order Summary"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
            <button
              onClick={() => window.print()}
              className="p-2 rounded-lg bg-[#38312A] hover:bg-[#B89A62] hover:text-[#2B2520] text-[#FFF9F0] text-xs font-montserrat transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Print Receipt"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Order Status Indicator */}
          <div className="p-4 rounded-2xl bg-[#F8F3EA] border border-[#B89A62]/35">
            <div className="flex items-center justify-between text-xs font-montserrat font-semibold mb-2">
              <span className="text-[#786B59] uppercase tracking-wider">Order Status:</span>
              <span className="text-[#2B2520] bg-[#FFF9F0] px-3 py-1 rounded-full border border-[#B89A62]/50 font-montserrat font-semibold text-[11px]">
                {order.status}
              </span>
            </div>

            {/* Stepper Bar */}
            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] font-montserrat uppercase">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-[#2B2520] text-[#B89A62] flex items-center justify-center font-bold mb-1">
                  ✓
                </div>
                <span className="font-semibold text-[#2B2520]">Order Prepared</span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold mb-1 ${
                    order.status.includes('WhatsApp') || order.status.includes('Confirmed')
                      ? 'bg-[#2B2520] text-[#B89A62]'
                      : 'bg-[#EDE2D0] border border-[#B89A62]/40 text-[#786B59]'
                  }`}
                >
                  2
                </div>
                <span className="font-semibold text-[#2B2520]">
                  WhatsApp Booking
                </span>
              </div>
              <div className="flex flex-col items-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold mb-1 ${
                    order.status === 'Seller Confirmed' || order.status === 'Delivered'
                      ? 'bg-[#2B2520] text-[#B89A62]'
                      : 'bg-[#EDE2D0] border border-[#B89A62]/40 text-[#786B59]'
                  }`}
                >
                  3
                </div>
                <span className="text-[#786B59]">
                  Seller Confirmed
                </span>
              </div>
            </div>
          </div>

          {/* Details: Patron & Financial Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Details Box */}
            <div className="p-4 rounded-xl bg-[#F8F3EA] border border-[#B89A62]/25 space-y-2">
              <span className="text-[11px] font-montserrat uppercase tracking-wider text-[#B89A62] font-semibold block">
                Patron Information
              </span>
              <p className="font-montserrat font-bold text-base text-[#2B2520]">
                {order.customer.name}
              </p>
              <p className="text-xs font-lato text-[#786B59]">
                Phone: +91 {order.customer.phone}
              </p>
              {order.customer.email && (
                <p className="text-xs font-lato text-[#786B59]">
                  Email: {order.customer.email}
                </p>
              )}
              <div className="pt-2 border-t border-[#B89A62]/15 text-xs font-lato text-[#786B59]">
                <span className="font-semibold text-[#2B2520] block">
                  Delivery Destination:
                </span>
                {order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-4 rounded-xl bg-[#F8F3EA] border border-[#B89A62]/25 space-y-2 text-xs font-lato">
              <span className="text-[11px] font-montserrat uppercase tracking-wider text-[#B89A62] font-semibold block">
                Commercial Summary
              </span>
              <div className="flex justify-between text-[#786B59]">
                <span>Catalogue MRP:</span>
                <span className="font-mono">
                  ₹{order.originalPriceTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[#2B2520] font-semibold">
                <span>Total Courtesy Discount:</span>
                <span className="font-mono text-emerald-700">
                  - ₹{order.discountTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between text-[#786B59]">
                <span>Insured Doorstep Transit:</span>
                <span className="text-[#2B2520] font-bold">COMPLIMENTARY</span>
              </div>
              <div className="pt-2 border-t border-[#B89A62]/20 flex justify-between items-baseline">
                <span className="font-montserrat font-bold text-sm uppercase text-[#2B2520]">
                  Total Booking Amount:
                </span>
                <span className="font-cormorant text-2xl font-bold text-[#2B2520]">
                  ₹{order.finalTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Itemized Order Line Items */}
          <div>
            <h3 className="font-montserrat font-semibold text-xs uppercase tracking-wider text-[#786B59] mb-3">
              Reserved Jewellery Masterpieces ({order.items.length})
            </h3>
            <div className="divide-y divide-[#B89A62]/15 border border-[#B89A62]/25 rounded-xl overflow-hidden bg-[#F8F3EA]">
              {order.items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-4 flex items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded object-cover border border-[#B89A62]/30"
                    />
                    <div>
                      <h4 className="font-montserrat font-semibold text-sm text-[#2B2520]">
                        {product.name}
                      </h4>
                      <p className="text-[11px] font-lato text-[#786B59]">
                        Quantity: {quantity} · Discount: {product.discountPercent}%
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-cormorant text-lg font-bold text-[#2B2520] block">
                      ₹{(product.discountedPrice * quantity).toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] font-lato text-[#786B59] line-through">
                      ₹{(product.originalPrice * quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PRIMARY ACTION: Open WhatsApp with pre-filled message */}
          <div className="p-6 rounded-2xl bg-[#2B2520] text-[#FFF9F0] border border-[#B89A62]/40 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B89A62] text-[#2B2520] flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-montserrat font-bold text-sm text-[#FFF9F0]">
                  Send Order to ANJALI JEWELS Concierge
                </h4>
                <p className="text-xs font-lato text-[#EDE2D0]/80">
                  Click the button below to open WhatsApp with your pre-formatted order summary addressed directly to the boutique owner (+91 {phoneFormatted}).
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => triggerWhatsAppOrder(order)}
                className="flex-1 py-3.5 px-6 rounded-xl bg-[#B89A62] hover:bg-[#D4AF37] text-[#2B2520] font-montserrat text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Open WhatsApp & Send Order (+91 9319862576)</span>
              </button>

              <a
                href={`tel:+91${phoneFormatted}`}
                className="px-5 py-3.5 rounded-xl border border-[#B89A62]/50 hover:border-[#B89A62] text-[#FFF9F0] font-montserrat text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#B89A62]" />
                <span>Call Owner</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Return to Catalogue */}
      <div className="text-center pt-4">
        <button
          onClick={() => setCurrentView('catalogue')}
          className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-wider text-[#B89A62] hover:text-[#2B2520] underline underline-offset-4 cursor-pointer"
        >
          <span>Continue Browsing Catalogue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
