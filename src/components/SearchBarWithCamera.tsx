import React, { useState } from 'react';
import { Search, Camera, X, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SearchBarWithCamera: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    setCurrentView,
    setIsCameraSearchOpen,
    products,
    openProductDetail,
  } = useStore();

  const [isFocused, setIsFocused] = useState(false);

  // Quick auto-complete dropdown when typing
  const matchingSuggestions = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.specifications.design.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.specifications.material.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('catalogue');
    }
  };

  const handleSelectSuggestion = (id: string) => {
    setSearchQuery('');
    openProductDetail(id);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 my-4 z-30">
      <form
        onSubmit={handleSearchSubmit}
        className={`relative flex items-center bg-[#F2E5D5] rounded-full shadow-[0_4px_20px_rgba(34,44,38,0.25)] transition-all duration-300 border ${
          isFocused
            ? 'border-[#B99A62] ring-2 ring-[#B99A62]/40 shadow-[0_6px_28px_rgba(185,154,98,0.3)]'
            : 'border-[#B99A62]/40 hover:border-[#B99A62]'
        }`}
      >
        {/* Search Icon */}
        <div className="pl-4 sm:pl-5 pr-2 text-[#514331] shrink-0">
          <Search className="w-5 h-5 text-[#514331]" />
        </div>

        {/* Input Field: Warm champagne background with rich dark charcoal text */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 250)}
          placeholder="Search by necklace, bangles, bridal kundan, temple gold, or keywords..."
          className="w-full py-3.5 sm:py-4 px-2 bg-transparent text-[#29251F] placeholder-[#786B59] font-montserrat text-xs sm:text-sm focus:outline-none tracking-wide"
        />

        {/* Clear query button */}
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="p-1.5 text-[#786B59] hover:text-[#29251F] transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Camera Visual Search Button */}
        <div className="pr-2 sm:pr-3 shrink-0 flex items-center">
          <button
            type="button"
            onClick={() => setIsCameraSearchOpen(true)}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-[#343A2B] hover:bg-[#514331] text-[#E8D8B8] hover:text-[#B99A62] rounded-full transition-all duration-200 text-xs font-montserrat font-medium shadow-sm group"
            title="Search similar jewellery using Camera or Photo"
            aria-label="Visual Camera Search"
          >
            <Camera className="w-4 h-4 text-[#B99A62] group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline tracking-wider uppercase text-[11px]">
              Visual Match
            </span>
          </button>
        </div>
      </form>

      {/* Live Search Dropdown Suggestions */}
      {isFocused && searchQuery.trim() && matchingSuggestions.length > 0 && (
        <div className="absolute left-4 right-4 top-full mt-2 bg-[#EDE2D4] text-[#29251F] rounded-xl shadow-2xl border border-[#B99A62]/40 overflow-hidden z-40 max-h-80 overflow-y-auto">
          <div className="p-2.5 bg-[#F2E5D5] border-b border-[#514331]/15 text-[11px] font-montserrat uppercase tracking-wider text-[#786B59] flex items-center justify-between">
            <span>Matching Pieces ({matchingSuggestions.length})</span>
            <span className="flex items-center gap-1 text-[#514331]">
              <Sparkles className="w-3 h-3 text-[#B99A62]" /> Handcrafted Catalogue
            </span>
          </div>

          <div className="divide-y divide-[#514331]/10">
            {matchingSuggestions.map((prod) => (
              <div
                key={prod.id}
                onMouseDown={() => handleSelectSuggestion(prod.id)}
                className="p-3 hover:bg-[#F2E5D5] cursor-pointer transition-colors flex items-center gap-3.5 group"
              >
                <div className="w-12 h-12 rounded overflow-hidden shrink-0 border border-[#514331]/20">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-montserrat uppercase tracking-wider text-[#786B59]">
                      {prod.category}
                    </span>
                    {prod.isUserProduct && (
                      <span className="text-[9px] font-montserrat font-semibold text-[#B99A62] bg-[#343A2B] px-1.5 py-0.2 rounded">
                        Royal Edition
                      </span>
                    )}
                  </div>
                  <h5 className="text-xs font-montserrat font-semibold text-[#29251F] truncate group-hover:text-[#514331]">
                    {prod.name}
                  </h5>
                  <p className="font-cormorant text-sm font-bold text-[#343A2B]">
                    ₹{prod.discountedPrice.toLocaleString('en-IN')}{' '}
                    <span className="text-[11px] line-through font-normal text-[#786B59]">
                      ₹{prod.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
