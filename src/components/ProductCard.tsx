import React from 'react';
import { Heart, ShoppingBag, Eye, Sparkles, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    openProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    initiateBuyNow,
  } = useStore();

  const wishlisted = isInWishlist(product.id);

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-[#FFF9F0] border border-[#B89A62]/30 hover:border-[#B89A62] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(43,37,32,0.12)] flex flex-col justify-between shadow-sm">
      {/* Lead With Imagery Container (Square 1:1 format) */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#EDE2D0]">
        {/* Main Product Image (Angle 1) */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Optional Secondary Image Reveal on Hover if available */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out pointer-events-none"
            loading="lazy"
          />
        )}

        {/* Wishlist Heart Icon (Top Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm z-20 cursor-pointer ${
            wishlisted
              ? 'bg-[#B89A62] text-[#2B2520]'
              : 'bg-[#2B2520]/75 text-[#FFF9F0] hover:bg-[#B89A62] hover:text-[#2B2520]'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              wishlisted ? 'fill-current scale-110' : ''
            }`}
          />
        </button>

        {/* Authentic Badge or Sample Indicator */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-20">
          {product.isUserProduct ? (
            <span className="text-[10px] font-montserrat uppercase tracking-wider font-bold text-[#2B2520] bg-[#B89A62] px-2.5 py-0.5 rounded shadow-sm">
              Royal Edition
            </span>
          ) : (
            <span className="text-[9.5px] font-montserrat uppercase tracking-wider font-semibold text-[#FFF9F0] bg-[#2B2520]/80 px-2 py-0.5 rounded backdrop-blur-xs">
              Sample Edit
            </span>
          )}

          {product.discountPercent > 0 && (
            <span className="text-[9.5px] font-montserrat uppercase tracking-wider font-bold text-[#2B2520] bg-[#EDE2D0] border border-[#B89A62]/50 px-2 py-0.5 rounded shadow-xs">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Quick View Button Hover Layer */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-20">
          <button
            onClick={() => openProductDetail(product.id)}
            className="flex-1 py-2 px-3 bg-[#2B2520]/90 hover:bg-[#2B2520] text-[#FFF9F0] hover:text-[#B89A62] text-xs font-montserrat font-semibold tracking-wider uppercase rounded-lg shadow-md backdrop-blur-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              initiateBuyNow(product);
            }}
            className="py-2 px-3 bg-[#B89A62] hover:bg-[#D4AF37] text-[#2B2520] text-xs font-montserrat font-bold tracking-wider uppercase rounded-lg shadow-md transition-colors flex items-center justify-center gap-1 cursor-pointer"
            title="Instant WhatsApp Order"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#2B2520]" />
            <span className="hidden sm:inline">Buy Now</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Verified Badge */}
          <div className="flex items-center justify-between text-[11px] font-montserrat uppercase tracking-wider text-[#786B59] mb-1">
            <span>{product.category}</span>
            {product.videoUrl && (
              <span className="flex items-center gap-1 text-[#B89A62] font-semibold lowercase">
                <Sparkles className="w-3 h-3 text-[#B89A62]" /> 4K Model Video
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3
            onClick={() => openProductDetail(product.id)}
            className="font-montserrat font-semibold text-sm sm:text-base text-[#2B2520] hover:text-[#B89A62] cursor-pointer transition-colors line-clamp-1 leading-snug"
          >
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs font-lato text-[#786B59] mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Add to Cart Action */}
        <div className="pt-4 mt-3 border-t border-[#B89A62]/20 flex items-center justify-between gap-2">
          {/* Price Typography */}
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-cormorant text-xl sm:text-2xl font-bold text-[#2B2520] leading-none">
                ₹{product.discountedPrice.toLocaleString('en-IN')}
              </span>
              {product.discountPercent > 0 && (
                <span className="text-xs font-lato text-[#786B59] line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[10px] font-montserrat uppercase text-[#786B59] font-medium block mt-0.5">
              Taxes Included · Free Insured Delivery
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="w-10 h-10 rounded-lg bg-[#2B2520] hover:bg-[#B89A62] text-[#FFF9F0] hover:text-[#2B2520] flex items-center justify-center transition-colors shrink-0 shadow-sm cursor-pointer"
            title="Add to Shopping Bag"
            aria-label={`Add ${product.name} to Shopping Bag`}
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
