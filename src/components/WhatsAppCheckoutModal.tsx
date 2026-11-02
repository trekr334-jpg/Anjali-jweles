import React, { useState } from 'react';
import {
  X,
  MessageCircle,
  ShieldCheck,
  CheckCircle,
  Truck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CartItem } from '../types';

interface WhatsAppCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkoutItems: CartItem[];
}

export const WhatsAppCheckoutModal: React.FC<WhatsAppCheckoutModalProps> = ({
  isOpen,
  onClose,
  checkoutItems,
}) => {
  const { customer, createOrder, triggerWhatsAppOrder, setCurrentView } =
    useStore();

  const [formData, setFormData] = useState({
    name: customer.name || '',
    phone: customer.phone || '',
    email: customer.email || '',
    address: customer.address || '',
    city: customer.city || 'Delhi',
    state: customer.state || 'Delhi',
    pincode: customer.pincode || '110058',
    isGuest: !customer.isLoggedIn,
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen || checkoutItems.length === 0) return null;

  const originalTotal = checkoutItems.reduce(
    (sum, it) => sum + it.product.originalPrice * it.quantity,
    0
  );
  const finalTotal = checkoutItems.reduce(
    (sum, it) => sum + it.product.discountedPrice * it.quantity,
    0
  );
  const discountTotal = originalTotal - finalTotal;

  const validate = () => {
    const err: Record<string, string> = {};
    if (!formData.name.trim()) err.name = 'Please provide your full name.';
    if (!formData.phone.trim() || formData.phone.length < 8)
      err.phone = 'Valid phone number required for WhatsApp order confirmation.';
    if (!formData.address.trim()) err.address = 'Complete delivery address required.';
    if (!formData.city.trim()) err.city = 'City required.';
    if (!formData.pincode.trim() || formData.pincode.length < 5)
      err.pincode = 'Valid postal PIN code required.';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Step 1: Create Order in system
    const newOrder = createOrder(
      checkoutItems,
      {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        isGuest: formData.isGuest,
      },
      formData.notes
    );

    // Close modal
    onClose();

    // Step 2: Navigate to Order Confirmation Page
    setCurrentView('order-confirmation');

    // Step 3: Trigger WhatsApp window with pre-filled message addressed to +91 9319862576
    setTimeout(() => {
      triggerWhatsAppOrder(newOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2B2520]/75 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Box (Warm Off-White #FFF9F0, Luxury Gold Accent #B89A62, Rich Charcoal Text #2B2520) */}
      <div className="relative w-full max-w-2xl bg-[#FFF9F0] text-[#2B2520] rounded-2xl shadow-2xl border border-[#B89A62]/50 p-6 sm:p-8 max-h-[92vh] overflow-y-auto z-10">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#B89A62]/25">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-montserrat text-xs uppercase tracking-[0.2em] font-semibold text-[#B89A62]">
                ANJALI JEWELS
              </span>
              <span className="text-[10px] bg-[#2B2520] text-[#FFF9F0] px-2 py-0.5 rounded font-montserrat font-bold">
                WhatsApp Booking
              </span>
            </div>
            <h2 className="font-playfair text-2xl sm:text-3xl font-medium text-[#2B2520] mt-1">
              Direct Order Reservation
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#786B59] hover:text-[#2B2520] hover:bg-[#EDE2D0] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Items Mini-Summary */}
        <div className="my-5 p-4 rounded-xl bg-[#F8F3EA] border border-[#B89A62]/30 space-y-3">
          <div className="flex items-center justify-between text-xs font-montserrat uppercase font-semibold text-[#786B59]">
            <span>Selected Pieces ({checkoutItems.length})</span>
            <span className="text-[#2B2520] font-bold">Total: ₹{finalTotal.toLocaleString('en-IN')}</span>
          </div>

          <div className="divide-y divide-[#B89A62]/15 max-h-40 overflow-y-auto">
            {checkoutItems.map((item) => (
              <div
                key={item.product.id}
                className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-10 h-10 rounded object-cover border border-[#B89A62]/30 shrink-0"
                  />
                  <div className="truncate">
                    <p className="font-montserrat font-medium text-[#2B2520] truncate">
                      {item.product.name}
                    </p>
                    <p className="text-[11px] font-lato text-[#786B59]">
                      Qty: {item.quantity} · Disc: {item.product.discountPercent}%
                    </p>
                  </div>
                </div>

                <span className="font-cormorant text-base font-bold text-[#2B2520] shrink-0">
                  ₹{(item.product.discountedPrice * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#B89A62]/20 flex items-center justify-between text-xs font-lato">
            <span className="text-[#B89A62] font-semibold">
              Total Courtesy Savings: ₹{discountTotal.toLocaleString('en-IN')}
            </span>
            <span className="text-[#786B59]">Free Doorstep Insured Delivery</span>
          </div>
        </div>

        {/* Customer Information Form */}
        <form onSubmit={handleOrderSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Name */}
            <div>
              <label className="block text-xs font-montserrat uppercase font-semibold text-[#2B2520] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Aditi Sharma"
                className="w-full py-2.5 px-3 rounded-lg bg-[#F8F3EA] border border-[#B89A62]/35 text-xs font-lato text-[#2B2520] focus:outline-none focus:border-[#B89A62]"
              />
              {errors.name && (
                <p className="text-[10px] text-red-700 mt-1">{errors.name}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-montserrat uppercase font-semibold text-[#2B2520] mb-1">
                WhatsApp Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="e.g. 9876543210"
                className="w-full py-2.5 px-3 rounded-lg bg-[#F8F3EA] border border-[#B89A62]/35 text-xs font-lato text-[#2B2520] focus:outline-none focus:border-[#B89A62]"
              />
              {errors.phone && (
                <p className="text-[10px] text-red-700 mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email Address */}
            <div>
              <label className="block text-xs font-montserrat uppercase font-semibold text-[#2B2520] mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. aditi@example.com"
                className="w-full py-2.5 px-3 rounded-lg bg-[#F8F3EA] border border-[#B89A62]/35 text-xs font-lato text-[#2B2520] focus:outline-none focus:border-[#B89A62]"
              />
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-xs font-montserrat uppercase font-semibold text-[#2B2520] mb-1">
                Postal PIN Code *
              </label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                placeholder="e.g. 110058"
                className="w-full py-2.5 px-3 rounded-lg bg-[#F8F3EA] border border-[#B89A62]/35 text-xs font-lato text-[#2B2520] focus:outline-none focus:border-[#B89A62]"
              />
              {errors.pincode && (
                <p className="text-[10px] text-red-700 mt-1">{errors.pincode}</p>
              )}
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block text-xs font-montserrat uppercase font-semibold text-[#2B2520] mb-1">
              Full Street Delivery Address *
            </label>
            <textarea
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Flat / House No., Building Name, Street / Sector, Landmark"
              className="w-full py-2.5 px-3 rounded-lg bg-[#F8F3EA] border border-[#B89A62]/35 text-xs font-lato text-[#2B2520] focus:outline-none focus:border-[#B89A62]"
            />
            {errors.address && (
              <p className="text-[10px] text-red-700 mt-1">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-montserrat uppercase font-semibold text-[#2B2520] mb-1">
                City *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full py-2.5 px-3 rounded-lg bg-[#F8F3EA] border border-[#B89A62]/35 text-xs font-lato text-[#2B2520] focus:outline-none focus:border-[#B89A62]"
              />
              {errors.city && (
                <p className="text-[10px] text-red-700 mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-montserrat uppercase font-semibold text-[#2B2520] mb-1">
                State *
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full py-2.5 px-3 rounded-lg bg-[#F8F3EA] border border-[#B89A62]/35 text-xs font-lato text-[#2B2520] focus:outline-none focus:border-[#B89A62]"
              />
            </div>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-xs font-montserrat uppercase font-semibold text-[#2B2520] mb-1">
              Special Customization or Gifting Note (Optional)
            </label>
            <input
              type="text"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Ring size 14, Royal Gift Box, Delivery by Friday"
              className="w-full py-2 px-3 rounded-lg bg-[#F8F3EA] border border-[#B89A62]/35 text-xs font-lato text-[#2B2520] focus:outline-none focus:border-[#B89A62]"
            />
          </div>

          {/* Assurance strip */}
          <div className="pt-2 flex items-center justify-between text-[11px] font-lato text-[#786B59] border-t border-[#B89A62]/20">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B89A62]" />
              <span>Direct WhatsApp Concierge Confirmation</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#B89A62]" />
              <span>Insured Transit</span>
            </span>
          </div>

          {/* Submit Order Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl bg-[#B89A62] hover:bg-[#D4AF37] text-[#2B2520] font-montserrat text-sm font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            <MessageCircle className="w-4 h-4 text-[#2B2520]" />
            <span>Confirm & Open WhatsApp Booking (+91 9319862576)</span>
            <ArrowRight className="w-4 h-4 text-[#2B2520]" />
          </button>
        </form>
      </div>
    </div>
  );
};
