import React from 'react';
import { Package, ArrowLeft, ArrowRight, MessageCircle, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrdersPage: React.FC = () => {
  const { orders, setCurrentView, openProductDetail, triggerWhatsAppOrder, settings } = useStore();

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 mb-8 border-b border-[#B89A62]/25 gap-4">
        <div>
          <button
            onClick={() => setCurrentView('home')}
            className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-wider text-[#2B2520] hover:text-[#B89A62] transition-colors mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
          <h1 className="font-playfair text-3xl sm:text-4xl font-medium text-[#2B2520]">
            Order Tracking & History
          </h1>
        </div>
        <button
          onClick={() => setCurrentView('catalogue')}
          className="text-xs font-montserrat uppercase tracking-wider text-[#B89A62] hover:text-[#2B2520] underline underline-offset-4 cursor-pointer"
        >
          Explore Catalogue
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-[#FFF9F0] text-[#2B2520] border border-[#B89A62]/40 max-w-lg mx-auto shadow-sm space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#2B2520] text-[#B89A62] mx-auto flex items-center justify-center">
            <Package className="w-7 h-7" />
          </div>
          <h3 className="font-playfair text-2xl font-bold">No orders found</h3>
          <p className="text-xs font-lato text-[#786B59] leading-relaxed">
            You haven't initiated any jewellery reservations yet. Browse our royal archive and book your first heirloom piece.
          </p>
          <button
            onClick={() => setCurrentView('catalogue')}
            className="px-6 py-3 bg-[#2B2520] hover:bg-[#B89A62] text-[#FFF9F0] hover:text-[#2B2520] text-xs font-montserrat font-bold uppercase rounded-xl transition-colors cursor-pointer"
          >
            Browse Catalogue
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="rounded-3xl bg-[#FFF9F0] text-[#2B2520] border border-[#B89A62]/40 p-6 sm:p-8 shadow-sm space-y-6"
            >
              {/* Order Meta Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#B89A62]/20 gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-lg sm:text-xl font-bold text-[#2B2520] bg-[#F8F3EA] px-3 py-1 rounded-lg border border-[#B89A62]/35">
                      {ord.id}
                    </span>
                    <span className="text-xs font-montserrat uppercase tracking-wider text-[#B89A62] bg-[#2B2520] px-3 py-1 rounded-full font-semibold">
                      {ord.status}
                    </span>
                  </div>
                  <p className="text-xs font-lato text-[#786B59] mt-2">
                    Booked on {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-montserrat uppercase tracking-wider text-[#786B59] block">
                    Amount Payable:
                  </span>
                  <span className="font-cormorant text-2xl sm:text-3xl font-bold text-[#2B2520]">
                    ₹{ord.finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Items in this order */}
              <div className="divide-y divide-[#B89A62]/15 border border-[#B89A62]/25 rounded-2xl overflow-hidden bg-[#F8F3EA]">
                {ord.items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="p-4 flex items-center justify-between gap-4 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded object-cover border border-[#B89A62]/30 shrink-0"
                      />
                      <div>
                        <h4
                          onClick={() => openProductDetail(product.id)}
                          className="font-montserrat font-semibold text-sm text-[#2B2520] hover:text-[#B89A62] cursor-pointer"
                        >
                          {product.name}
                        </h4>
                        <p className="text-[11px] font-lato text-[#786B59]">
                          Quantity: {quantity} · SKU: AJ-{product.id.substring(product.id.length - 6).toUpperCase()}
                        </p>
                      </div>
                    </div>

                    <span className="font-cormorant text-base font-bold text-[#2B2520]">
                      ₹{(product.discountedPrice * quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Delivery Destination */}
              <div className="p-4 rounded-xl bg-[#F8F3EA] border border-[#B89A62]/20 text-xs font-lato text-[#786B59] flex flex-col sm:flex-row justify-between gap-3">
                <div>
                  <span className="font-montserrat font-semibold uppercase tracking-wider text-[#2B2520] block mb-1">
                    Shipment Recipient:
                  </span>
                  <p className="text-[#2B2520] font-medium">{ord.customer.name} ({ord.customer.phone})</p>
                  <p>{ord.customer.address}, {ord.customer.city}, {ord.customer.state} - {ord.customer.pincode}</p>
                </div>

                <div className="sm:text-right shrink-0">
                  <button
                    onClick={() => triggerWhatsAppOrder(ord)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#B89A62] hover:bg-[#D4AF37] text-[#2B2520] font-montserrat text-xs font-bold uppercase rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Concierge (+91 9319862576)</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
