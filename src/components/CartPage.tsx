import React, { useState } from 'react';
import {
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface CartPageProps {
  onProceedToOrder: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onProceedToOrder }) => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartOriginalTotal,
    cartFinalTotal,
    cartSavingsTotal,
    setCurrentView,
    openProductDetail,
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const clean = couponCode.trim().toUpperCase();
    if (clean === 'AJROYAL' || clean === 'ANJALI10') {
      const extraDiscount = Math.round(cartFinalTotal * 0.1);
      setAppliedDiscount(extraDiscount);
      setCouponSuccess('Privilege Code Applied: Extra 10% Royal Courtesy!');
    } else if (clean) {
      setCouponError('Invalid coupon code. Try code "AJROYAL" for 10% privilege discount.');
    }
  };

  const netPayable = Math.max(0, cartFinalTotal - appliedDiscount);

  if (cart.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="p-10 rounded-3xl bg-[#FFF9F0] text-[#2B2520] border border-[#B89A62]/40 shadow-xl space-y-5 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#2B2520] text-[#B89A62] mx-auto flex items-center justify-center">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-playfair text-3xl font-medium text-[#2B2520]">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-xs sm:text-sm font-lato text-[#786B59] leading-relaxed">
            Adorn your moments with timeless handcrafted necklaces, heritage bangles, and regal bridal sets from the ANJALI JEWELS royal archive.
          </p>
          <button
            onClick={() => setCurrentView('catalogue')}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#2B2520] hover:bg-[#B89A62] text-[#FFF9F0] hover:text-[#2B2520] font-montserrat text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
          >
            <span>Explore All Jewellery</span>
            <ArrowRight className="w-4 h-4 text-[#B89A62]" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-[#B89A62]/25 gap-4">
        <div>
          <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#B89A62] font-semibold block mb-1">
            Curated Selections
          </span>
          <h1 className="font-playfair text-3xl sm:text-4xl font-medium text-[#2B2520]">
            Your Royal Shopping Bag
          </h1>
        </div>
        <button
          onClick={() => setCurrentView('catalogue')}
          className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-wider text-[#2B2520] hover:text-[#B89A62] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {/* Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Itemized List (Span 8) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl bg-[#FFF9F0] border border-[#B89A62]/35 p-4 sm:p-6 shadow-sm divide-y divide-[#B89A62]/15">
            {cart.map(({ product, quantity }) => {
              const itemSubtotal = product.discountedPrice * quantity;
              const itemOriginalSubtotal = product.originalPrice * quantity;
              const itemSavings = itemOriginalSubtotal - itemSubtotal;

              return (
                <div
                  key={product.id}
                  className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
                >
                  {/* Product Thumbnail */}
                  <div
                    onClick={() => openProductDetail(product.id)}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-[#EDE2D0] border border-[#B89A62]/25 shrink-0 cursor-pointer group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-montserrat uppercase tracking-wider text-[#786B59] block">
                      {product.category}
                    </span>
                    <h3
                      onClick={() => openProductDetail(product.id)}
                      className="font-montserrat font-semibold text-sm sm:text-base text-[#2B2520] hover:text-[#B89A62] cursor-pointer transition-colors truncate mt-0.5"
                    >
                      {product.name}
                    </h3>

                    {/* Unit Pricing */}
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-cormorant text-lg font-bold text-[#2B2520]">
                        ₹{product.discountedPrice.toLocaleString('en-IN')}
                      </span>
                      {product.discountPercent > 0 && (
                        <>
                          <span className="text-xs font-lato text-[#786B59] line-through">
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] font-montserrat text-[#2B2520] bg-[#B89A62] px-1.5 py-0.2 rounded font-semibold">
                            {product.discountPercent}% OFF
                          </span>
                        </>
                      )}
                    </div>

                    {/* Quantity Stepper & Remove */}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border border-[#B89A62]/35 rounded-lg overflow-hidden bg-[#F8F3EA]">
                        <button
                          onClick={() => updateCartQuantity(product.id, quantity - 1)}
                          className="px-2.5 py-1 text-xs font-bold text-[#2B2520] hover:bg-[#EDE2D0] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-montserrat text-xs font-semibold text-[#2B2520]">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(product.id, quantity + 1)}
                          className="px-2.5 py-1 text-xs font-bold text-[#2B2520] hover:bg-[#EDE2D0] cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="inline-flex items-center gap-1 text-xs text-[#786B59] hover:text-red-700 font-montserrat transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  {/* Item Subtotal */}
                  <div className="sm:text-right w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#B89A62]/15">
                    <span className="text-[10px] font-montserrat uppercase text-[#786B59] block">
                      Subtotal
                    </span>
                    <span className="font-cormorant text-xl font-bold text-[#2B2520]">
                      ₹{itemSubtotal.toLocaleString('en-IN')}
                    </span>
                    {itemSavings > 0 && (
                      <span className="text-[10px] font-lato text-emerald-800 font-medium block">
                        Saved ₹{itemSavings.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-xs font-montserrat text-[#2B2520]">
            <button
              onClick={() => setCurrentView('catalogue')}
              className="hover:text-[#B89A62] underline underline-offset-4 cursor-pointer"
            >
              ← Add more items to bag
            </button>
            <button
              onClick={clearCart}
              className="text-[#786B59] hover:text-red-600 cursor-pointer"
            >
              Clear entire bag
            </button>
          </div>
        </div>

        {/* Order Summary Module (Span 4) */}
        <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-[#FFF9F0] text-[#2B2520] border border-[#B89A62]/35 shadow-sm space-y-6">
          <h2 className="font-playfair text-2xl font-medium text-[#2B2520] pb-3 border-b border-[#B89A62]/20">
            Order Summary
          </h2>

          {/* Pricing Details */}
          <div className="space-y-3 text-xs sm:text-sm font-lato">
            <div className="flex justify-between text-[#786B59]">
              <span>Original MRP Subtotal:</span>
              <span className="font-mono">
                ₹{cartOriginalTotal.toLocaleString('en-IN')}
              </span>
            </div>

            {cartSavingsTotal > 0 && (
              <div className="flex justify-between text-emerald-800 font-medium">
                <span>Catalogue Courtesy Discount:</span>
                <span className="font-mono">
                  - ₹{cartSavingsTotal.toLocaleString('en-IN')}
                </span>
              </div>
            )}

            {appliedDiscount > 0 && (
              <div className="flex justify-between text-emerald-800 font-medium">
                <span>Privilege Code (AJROYAL):</span>
                <span className="font-mono">
                  - ₹{appliedDiscount.toLocaleString('en-IN')}
                </span>
              </div>
            )}

            <div className="flex justify-between text-[#786B59]">
              <span>Insured Doorstep Transit:</span>
              <span className="text-[#2B2520] font-bold uppercase text-xs">
                FREE
              </span>
            </div>

            <div className="pt-3 border-t border-[#B89A62]/20 flex justify-between items-baseline">
              <div>
                <span className="font-montserrat font-bold text-sm uppercase text-[#2B2520] block">
                  Total Payable:
                </span>
                <span className="text-[10px] font-lato text-[#786B59]">
                  Inclusive of all taxes & insurance
                </span>
              </div>
              <span className="font-cormorant text-2xl sm:text-3xl font-bold text-[#2B2520]">
                ₹{netPayable.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Coupon Code Input */}
          <form onSubmit={handleApplyCoupon} className="pt-2">
            <label className="block text-[11px] font-montserrat uppercase font-semibold text-[#786B59] mb-1.5">
              Have a Royal Privilege Voucher?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="e.g. AJROYAL"
                className="flex-1 py-2 px-3 rounded-lg bg-[#F8F3EA] border border-[#B89A62]/35 text-xs font-mono uppercase tracking-wider text-[#2B2520] focus:outline-none focus:border-[#B89A62]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#2B2520] hover:bg-[#B89A62] text-[#FFF9F0] hover:text-[#2B2520] text-xs font-montserrat font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
            {couponError && (
              <p className="text-[11px] text-red-700 mt-1.5 font-lato">
                {couponError}
              </p>
            )}
            {couponSuccess && (
              <p className="text-[11px] text-emerald-800 font-semibold mt-1.5 font-lato flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#B89A62]" />
                {couponSuccess}
              </p>
            )}
          </form>

          {/* Checkout Action Button */}
          <button
            onClick={onProceedToOrder}
            className="w-full py-4 px-6 rounded-xl bg-[#B89A62] hover:bg-[#D4AF37] text-[#2B2520] font-montserrat text-xs sm:text-sm font-bold tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Proceed to Order via WhatsApp</span>
          </button>

          {/* Guarantees */}
          <div className="pt-2 space-y-2 text-xs font-lato text-[#786B59] border-t border-[#B89A62]/20">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B89A62] shrink-0" />
              <span>Certified karigar artistry & tamper-evident lock</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#B89A62] shrink-0" />
              <span>Free doorstep insured transit across all Indian pincodes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
