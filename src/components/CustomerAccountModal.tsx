import React, { useState } from 'react';
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Package,
  Heart,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CustomerAccountModal: React.FC = () => {
  const {
    isAccountModalOpen,
    setIsAccountModalOpen,
    customer,
    loginCustomer,
    logoutCustomer,
    updateCustomerProfile,
    orders,
    wishlist,
    setCurrentView,
    openProductDetail,
    showToast,
  } = useStore();

  const [authStep, setAuthStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phoneNumber, setPhoneNumber] = useState(customer.phone || '');
  const [otpCode, setOtpCode] = useState('');
  const [otpTimer, setOtpTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');

  if (!isAccountModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 8) {
      showToast('Please enter a valid phone number', 'info');
      return;
    }
    setAuthStep('otp');
    setOtpTimer(30);
    showToast('Simulation: OTP code sent (Use 1234 to verify)', 'info');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      if (otpCode === '1234' || otpCode.length === 4) {
        loginCustomer(phoneNumber, customer.name || 'Valued Collector');
        setAuthStep('profile');
      } else {
        showToast('Invalid code. Please enter 1234', 'info');
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#222C26]/85 backdrop-blur-md"
        onClick={() => setIsAccountModalOpen(false)}
      />

      {/* Modal Dialog (Warm Off-White #FFF9F0 with Gold Accent #B89A62, NO pure white) */}
      <div className="relative w-full max-w-2xl bg-[#FFF9F0] text-[#2B2520] rounded-2xl shadow-2xl border border-[#B89A62]/50 p-6 sm:p-8 max-h-[90vh] overflow-y-auto z-10">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#B89A62]/25">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-montserrat text-xs uppercase tracking-[0.2em] font-semibold text-[#B89A62]">
                ANJALI JEWELS
              </span>
              <span className="text-[10px] bg-[#2B2520] text-[#FFF9F0] px-2 py-0.5 rounded font-montserrat font-bold">
                Private Portal
              </span>
            </div>
            <h2 className="font-playfair text-2xl sm:text-3xl font-medium text-[#2B2520] mt-1">
              Customer Account
            </h2>
          </div>
          <button
            onClick={() => setIsAccountModalOpen(false)}
            className="p-2 text-[#786B59] hover:text-[#2B2520] hover:bg-[#EDE2D0] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content depending on login state */}
        {!customer.isLoggedIn && authStep === 'phone' && (
          <div className="my-6 space-y-6">
            <div className="p-4 rounded-xl bg-[#F2E5D5] border border-[#B99A62]/30 text-xs font-lato text-[#514331] leading-relaxed">
              <span className="font-montserrat font-bold text-[#29251F] block mb-1">
                Guest Checkout Supported
              </span>
              You can purchase any jewellery piece instantly as a guest without creating an account. Sign in with your phone to view order history and saved addresses.
            </div>

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-montserrat uppercase font-semibold text-[#29251F] mb-1.5">
                  Mobile Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#786B59] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full py-3 pl-10 pr-3 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-sm font-lato text-[#29251F] focus:outline-none focus:border-[#B99A62]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#343A2B] hover:bg-[#514331] text-[#E8D8B8] hover:text-[#B99A62] font-montserrat text-xs font-bold tracking-wider uppercase transition-all shadow-md"
              >
                Send One-Time Verification Passcode (OTP)
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    loginCustomer(phoneNumber || '+91 98123 45678', 'Guest Collector');
                    setIsAccountModalOpen(false);
                  }}
                  className="text-xs font-montserrat text-[#514331] hover:text-[#29251F] underline underline-offset-4"
                >
                  Continue Browsing as Guest
                </button>
              </div>
            </form>
          </div>
        )}

        {!customer.isLoggedIn && authStep === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="my-6 space-y-6">
            <div className="p-4 rounded-xl bg-[#F2E5D5] border border-[#B99A62]/30 text-xs font-lato text-[#514331]">
              <span className="font-montserrat font-bold text-[#29251F] block mb-1">
                Enter 4-Digit Passcode
              </span>
              We simulated sending an SMS to <span className="font-mono font-bold text-[#29251F]">{phoneNumber}</span>. Enter code <span className="font-mono font-bold text-[#B99A62]">1234</span> to verify.
            </div>

            <div>
              <label className="block text-xs font-montserrat uppercase font-semibold text-[#29251F] mb-1.5">
                Verification Code
              </label>
              <input
                type="text"
                maxLength={4}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="1234"
                className="w-full py-3 px-4 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-center font-mono text-xl tracking-[0.5em] text-[#29251F] focus:outline-none focus:border-[#B99A62]"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 px-6 rounded-xl bg-[#B99A62] hover:bg-[#D4AF37] text-[#29251F] font-montserrat text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2"
            >
              {isVerifying ? 'Verifying Credentials...' : 'Verify & Enter Account'}
            </button>

            <div className="flex justify-between items-center text-xs font-montserrat text-[#786B59]">
              <button
                type="button"
                onClick={() => setAuthStep('phone')}
                className="hover:text-[#29251F] underline underline-offset-4"
              >
                Change Phone Number
              </button>
              <span>Resend in {otpTimer}s</span>
            </div>
          </form>
        )}

        {/* Logged In Customer Profile View */}
        {customer.isLoggedIn && (
          <div className="my-6 space-y-6">
            {/* Tab navigation */}
            <div className="flex items-center gap-2 border-b border-[#514331]/20 pb-2 text-xs font-montserrat uppercase font-semibold">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-[#343A2B] text-[#E8D8B8]'
                    : 'text-[#786B59] hover:text-[#29251F]'
                }`}
              >
                Personal Details
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-[#343A2B] text-[#E8D8B8]'
                    : 'text-[#786B59] hover:text-[#29251F]'
                }`}
              >
                Order History ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeTab === 'addresses'
                    ? 'bg-[#343A2B] text-[#E8D8B8]'
                    : 'text-[#786B59] hover:text-[#29251F]'
                }`}
              >
                Delivery Address
              </button>
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-montserrat uppercase font-semibold text-[#29251F] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={customer.name}
                      onChange={(e) => updateCustomerProfile({ name: e.target.value })}
                      className="w-full py-2.5 px-3 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-xs font-lato text-[#29251F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-montserrat uppercase font-semibold text-[#29251F] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={customer.phone}
                      onChange={(e) => updateCustomerProfile({ phone: e.target.value })}
                      className="w-full py-2.5 px-3 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-xs font-lato text-[#29251F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-montserrat uppercase font-semibold text-[#29251F] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => updateCustomerProfile({ email: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-xs font-lato text-[#29251F]"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      logoutCustomer();
                      setAuthStep('phone');
                    }}
                    className="px-4 py-2 border border-red-800 text-red-800 hover:bg-red-800 hover:text-white rounded-lg text-xs font-montserrat uppercase tracking-wider transition-colors flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="p-8 text-center text-xs font-lato text-[#786B59]">
                    No past reservations logged under this phone number.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-72 overflow-y-auto">
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-4 rounded-xl bg-[#F2E5D5] border border-[#514331]/20 space-y-2"
                      >
                        <div className="flex items-center justify-between text-xs font-montserrat">
                          <span className="font-bold text-[#29251F] font-mono">
                            {ord.id}
                          </span>
                          <span className="bg-[#343A2B] text-[#E8D8B8] px-2 py-0.5 rounded text-[10px]">
                            {ord.status}
                          </span>
                        </div>
                        <div className="text-xs font-lato text-[#514331]">
                          {ord.items.map((it) => it.product.name).join(', ')}
                        </div>
                        <div className="flex items-center justify-between pt-1 border-t border-[#514331]/10 text-xs">
                          <span className="text-[#786B59]">
                            {new Date(ord.createdAt).toLocaleDateString()}
                          </span>
                          <span className="font-cormorant font-bold text-base text-[#343A2B]">
                            ₹{ord.finalTotal.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Delivery Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-montserrat uppercase font-semibold text-[#29251F] mb-1">
                    Street Address
                  </label>
                  <textarea
                    rows={2}
                    value={customer.address}
                    onChange={(e) => updateCustomerProfile({ address: e.target.value })}
                    className="w-full py-2 px-3 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-xs font-lato text-[#29251F]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-montserrat uppercase font-semibold text-[#29251F] mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={customer.city}
                      onChange={(e) => updateCustomerProfile({ city: e.target.value })}
                      className="w-full py-2 px-2.5 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-xs font-lato text-[#29251F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-montserrat uppercase font-semibold text-[#29251F] mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={customer.state}
                      onChange={(e) => updateCustomerProfile({ state: e.target.value })}
                      className="w-full py-2 px-2.5 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-xs font-lato text-[#29251F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-montserrat uppercase font-semibold text-[#29251F] mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      value={customer.pincode}
                      onChange={(e) => updateCustomerProfile({ pincode: e.target.value })}
                      className="w-full py-2 px-2.5 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-xs font-lato text-[#29251F]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
