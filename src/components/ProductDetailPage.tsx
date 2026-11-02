import React, { useState, useRef } from 'react';
import {
  Heart,
  ShoppingBag,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  MessageCircle,
  Share2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    products,
    setCurrentView,
    addToCart,
    initiateBuyNow,
    toggleWishlist,
    isInWishlist,
    showToast,
  } = useStore();

  const product =
    products.find((p) => p.id === selectedProductId) || products[0];

  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomCoords, setZoomCoords] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const videoElementRef = useRef<HTMLVideoElement | null>(null);

  if (!product) return null;

  // Media items list: 4 square images (Image 1, Image 2, Image 3, Model Image) + Video at the end
  const mediaItems: { type: 'image' | 'video'; url: string; label: string }[] = [
    ...product.images.map((img, idx) => ({
      type: 'image' as const,
      url: img,
      label:
        idx === 0
          ? 'Angle 1 (Front View)'
          : idx === 1
          ? 'Angle 2 (Detailed Angle)'
          : idx === 2
          ? 'Angle 3 (Styling Layout)'
          : 'Jewellery Worn by Model',
    })),
  ];

  if (product.videoUrl) {
    mediaItems.push({
      type: 'video',
      url: product.videoUrl,
      label: '4K Model Video Campaign',
    });
  }

  const currentMedia = mediaItems[activeMediaIndex] || mediaItems[0];
  const isVideo = currentMedia?.type === 'video';
  const wishlisted = isInWishlist(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isVideo) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomCoords({ x, y });
  };

  const handlePrevMedia = () => {
    setActiveMediaIndex((prev) =>
      prev === 0 ? mediaItems.length - 1 : prev - 1
    );
  };

  const handleNextMedia = () => {
    setActiveMediaIndex((prev) =>
      prev === mediaItems.length - 1 ? 0 : prev + 1
    );
  };

  const toggleVideoPlayback = () => {
    if (videoElementRef.current) {
      if (videoElementRef.current.paused) {
        videoElementRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoElementRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const toggleVideoMute = () => {
    if (videoElementRef.current) {
      videoElementRef.current.muted = !videoElementRef.current.muted;
      setIsVideoMuted(videoElementRef.current.muted);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `ANJALI JEWELS — ${product.name}`,
          text: `Inspect this royal masterpiece on ANJALI JEWELS: ${product.name}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Masterpiece link copied to clipboard', 'info');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumbs & Back Navigation */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#B89A62]/25">
        <button
          onClick={() => setCurrentView('catalogue')}
          className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-wider text-[#2B2520] hover:text-[#B89A62] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="p-2 text-[#786B59] hover:text-[#2B2520] transition-colors cursor-pointer"
            title="Share this Piece"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              wishlisted
                ? 'bg-[#B89A62] border-[#B89A62] text-[#2B2520]'
                : 'border-[#B89A62]/40 text-[#2B2520] hover:text-[#B89A62]'
            }`}
            title="Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main PDP Split Layout: Gallery Left, Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Gallery with 1:1 Aspect Ratio (Span 7) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Media Showcase Viewport */}
          <div
            className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#EDE2D0] border border-[#B89A62]/40 shadow-xl cursor-crosshair group select-none"
            onMouseEnter={() => !isVideo && setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleMouseMove}
          >
            {isVideo ? (
              <div className="relative w-full h-full bg-black flex items-center justify-center">
                <video
                  ref={videoElementRef}
                  src={currentMedia.url}
                  autoPlay
                  loop
                  playsInline
                  muted={isVideoMuted}
                  className="w-full h-full object-cover"
                />
                {/* Video Controls Bar */}
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between z-20 bg-[#2B2520]/80 backdrop-blur-md px-4 py-2 rounded-full border border-[#B89A62]/30 text-[#FFF9F0]">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleVideoPlayback}
                      className="p-1 hover:text-[#B89A62] transition-colors cursor-pointer"
                      aria-label={isVideoPlaying ? 'Pause' : 'Play'}
                    >
                      {isVideoPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={toggleVideoMute}
                      className="p-1 hover:text-[#B89A62] transition-colors cursor-pointer"
                      aria-label={isVideoMuted ? 'Unmute' : 'Mute'}
                    >
                      {isVideoMuted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <span className="text-[11px] font-montserrat tracking-wider uppercase text-[#B89A62] font-semibold">
                    High-Definition Model Presentation
                  </span>
                </div>
              </div>
            ) : (
              <>
                <img
                  src={currentMedia.url}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300"
                />

                {/* Magnifier Zoom Overlay on Hover */}
                {isZooming && (
                  <div
                    className="absolute inset-0 pointer-events-none hidden md:block bg-no-repeat z-10 transition-opacity"
                    style={{
                      backgroundImage: `url(${currentMedia.url})`,
                      backgroundPosition: `${zoomCoords.x}% ${zoomCoords.y}%`,
                      backgroundSize: '240%',
                    }}
                  />
                )}
              </>
            )}

            {/* Manual Carousel Arrows */}
            {mediaItems.length > 1 && (
              <>
                <button
                  onClick={handlePrevMedia}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#2B2520]/75 hover:bg-[#B89A62] text-[#FFF9F0] hover:text-[#2B2520] flex items-center justify-center transition-all z-20 shadow-md cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextMedia}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#2B2520]/75 hover:bg-[#B89A62] text-[#FFF9F0] hover:text-[#2B2520] flex items-center justify-center transition-all z-20 shadow-md cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Expand / Fullscreen Viewport Trigger */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#2B2520]/75 hover:bg-[#B89A62] text-[#FFF9F0] hover:text-[#2B2520] flex items-center justify-center transition-all z-20 shadow-md cursor-pointer"
              title="Fullscreen View"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Current Media Label Tag */}
            <div className="absolute left-3 bottom-3 z-20">
              <span className="text-[10px] font-montserrat uppercase font-semibold px-3 py-1 rounded bg-[#2B2520]/80 text-[#FFF9F0] backdrop-blur-sm border border-[#B89A62]/30">
                {currentMedia.label}
              </span>
            </div>
          </div>

          {/* Sequential 5 Thumbnail Selector Strip (Angle 1, Angle 2, Angle 3, Model, Video) */}
          <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {mediaItems.map((item, index) => {
              const isSelected = activeMediaIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveMediaIndex(index)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#B89A62] shadow-[0_0_12px_rgba(184,154,98,0.5)] scale-102'
                      : 'border-[#B89A62]/30 hover:border-[#B89A62]/60 opacity-80 hover:opacity-100'
                  }`}
                >
                  {item.type === 'video' ? (
                    <div className="w-full h-full bg-[#2B2520] flex flex-col items-center justify-center text-[#B89A62] p-1">
                      <Play className="w-5 h-5 fill-current" />
                      <span className="text-[8px] font-montserrat uppercase tracking-wider mt-1 text-[#FFF9F0]">
                        Video
                      </span>
                    </div>
                  ) : (
                    <img
                      src={item.url}
                      alt={item.label}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Thumbnail Number */}
                  <span className="absolute bottom-1 right-1 text-[9px] font-mono font-bold bg-[#2B2520]/80 text-[#FFF9F0] px-1 rounded">
                    {index + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Contiguous Purchase Module (Span 5) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#FFF9F0] text-[#2B2520] border border-[#B89A62]/40 shadow-xl space-y-6">
          {/* Category & Collection Tag */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-montserrat uppercase tracking-[0.2em] font-semibold text-[#786B59]">
              {product.category}
            </span>
            {product.isUserProduct ? (
              <span className="text-[10px] font-montserrat uppercase tracking-wider font-bold text-[#2B2520] bg-[#B89A62] px-2.5 py-0.5 rounded shadow-sm">
                Authentic Brand Masterpiece
              </span>
            ) : (
              <span className="text-[10px] font-montserrat uppercase tracking-wider text-[#786B59] bg-[#EDE2D0] px-2 py-0.5 rounded">
                Sample Catalogue Piece
              </span>
            )}
          </div>

          {/* Product Title */}
          <div>
            <h1 className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-bold text-[#2B2520] leading-tight">
              {product.name}
            </h1>
            <p className="text-xs font-montserrat tracking-wider uppercase text-[#786B59] mt-1">
              SKU: AJ-{product.id.substring(product.id.length - 6).toUpperCase()}
            </p>
          </div>

          {/* Price Breakdown in Cormorant Garamond */}
          <div className="p-4 rounded-xl bg-[#F8F3EA] border border-[#B89A62]/30 space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="font-cormorant text-3xl sm:text-4xl font-bold text-[#2B2520] leading-none">
                ₹{product.discountedPrice.toLocaleString('en-IN')}
              </span>
              {product.discountPercent > 0 && (
                <>
                  <span className="font-lato text-base text-[#786B59] line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="font-montserrat text-xs font-bold text-[#2B2520] bg-[#B89A62] px-2 py-0.5 rounded">
                    {product.discountPercent}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-[11px] font-lato text-[#786B59]">
              MRP inclusive of all taxes. Free insured door-step delivery & gift packaging included.
            </p>
          </div>

          {/* Quantity Stepper */}
          <div className="flex items-center gap-4">
            <span className="font-montserrat text-xs font-semibold uppercase tracking-wider text-[#2B2520]">
              Quantity:
            </span>
            <div className="flex items-center border border-[#B89A62]/40 rounded-lg overflow-hidden bg-[#F8F3EA]">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1.5 text-sm font-bold text-[#2B2520] hover:bg-[#EDE2D0] transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="px-4 py-1.5 font-montserrat font-semibold text-xs text-[#2B2520]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1.5 text-sm font-bold text-[#2B2520] hover:bg-[#EDE2D0] transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
            <span className="text-[11px] font-montserrat text-[#786B59]">
              {product.specifications.availableQuantity} in stock
            </span>
          </div>

          {/* Primary CTA Buttons (Add to Cart & Direct Buy Now WhatsApp) */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => addToCart(product, quantity)}
              className="w-full py-3.5 px-6 rounded-xl bg-[#2B2520] hover:bg-[#38312A] text-[#FFF9F0] hover:text-[#B89A62] font-montserrat text-xs sm:text-sm font-bold tracking-wider uppercase shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Shopping Bag</span>
            </button>

            <button
              onClick={() => initiateBuyNow(product)}
              className="w-full py-3.5 px-6 rounded-xl bg-[#B89A62] hover:bg-[#D4AF37] text-[#2B2520] font-montserrat text-xs sm:text-sm font-bold tracking-wider uppercase shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Buy Now via WhatsApp Concierge</span>
            </button>
          </div>

          {/* Description */}
          <div className="pt-2">
            <h4 className="font-montserrat font-semibold text-xs uppercase tracking-wider text-[#2B2520] mb-1.5">
              Design Story & Details
            </h4>
            <p className="text-xs sm:text-sm font-lato text-[#514331] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Authentic Specifications Table */}
          <div className="pt-2 border-t border-[#B89A62]/20">
            <h4 className="font-montserrat font-semibold text-xs uppercase tracking-wider text-[#2B2520] mb-3">
              Jewellery Specifications
            </h4>
            <dl className="divide-y divide-[#B89A62]/15 text-xs">
              <div className="py-2 grid grid-cols-3">
                <dt className="font-montserrat font-medium text-[#786B59]">Type</dt>
                <dd className="col-span-2 font-lato text-[#29251F]">
                  {product.specifications.jewelleryType}
                </dd>
              </div>
              <div className="py-2 grid grid-cols-3">
                <dt className="font-montserrat font-medium text-[#786B59]">Material</dt>
                <dd className="col-span-2 font-lato text-[#29251F]">
                  {product.specifications.material}
                </dd>
              </div>
              <div className="py-2 grid grid-cols-3">
                <dt className="font-montserrat font-medium text-[#786B59]">Finish</dt>
                <dd className="col-span-2 font-lato text-[#29251F]">
                  {product.specifications.finish}
                </dd>
              </div>
              <div className="py-2 grid grid-cols-3">
                <dt className="font-montserrat font-medium text-[#786B59]">Design Motif</dt>
                <dd className="col-span-2 font-lato text-[#29251F]">
                  {product.specifications.design}
                </dd>
              </div>
              <div className="py-2 grid grid-cols-3">
                <dt className="font-montserrat font-medium text-[#786B59]">Shade</dt>
                <dd className="col-span-2 font-lato text-[#29251F]">
                  {product.specifications.colour}
                </dd>
              </div>
              <div className="py-2 grid grid-cols-3">
                <dt className="font-montserrat font-medium text-[#786B59]">Care Note</dt>
                <dd className="col-span-2 font-lato text-[#29251F]">
                  {product.specifications.careInstructions}
                </dd>
              </div>
              <div className="py-2 grid grid-cols-3">
                <dt className="font-montserrat font-medium text-[#786B59]">Shipping</dt>
                <dd className="col-span-2 font-lato text-[#29251F]">
                  {product.specifications.shippingInfo}
                </dd>
              </div>
              <div className="py-2 grid grid-cols-3">
                <dt className="font-montserrat font-medium text-[#786B59]">Returns</dt>
                <dd className="col-span-2 font-lato text-[#29251F]">
                  {product.specifications.returnPolicy}
                </dd>
              </div>
            </dl>
          </div>

          {/* Trust Highlights */}
          <div className="pt-4 border-t border-[#B89A62]/20 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-lg bg-[#F8F3EA] flex flex-col items-center">
              <ShieldCheck className="w-4 h-4 text-[#B89A62] mb-1" />
              <span className="text-[10px] font-montserrat uppercase font-semibold text-[#2B2520]">
                22K Antique Micron
              </span>
            </div>
            <div className="p-2 rounded-lg bg-[#F8F3EA] flex flex-col items-center">
              <Truck className="w-4 h-4 text-[#B89A62] mb-1" />
              <span className="text-[10px] font-montserrat uppercase font-semibold text-[#2B2520]">
                Insured Transit
              </span>
            </div>
            <div className="p-2 rounded-lg bg-[#F8F3EA] flex flex-col items-center">
              <RotateCcw className="w-4 h-4 text-[#B89A62] mb-1" />
              <span className="text-[10px] font-montserrat uppercase font-semibold text-[#2B2520]">
                7-Day Exchange
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal View */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-[#2B2520]/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#38312A] text-[#FFF9F0] hover:text-[#B89A62] flex items-center justify-center transition-colors z-50 cursor-pointer"
            aria-label="Close fullscreen"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-4xl max-h-[85vh] w-full flex items-center justify-center">
            {isVideo ? (
              <video
                src={currentMedia.url}
                autoPlay
                controls
                className="max-h-[80vh] max-w-full rounded-xl shadow-2xl"
              />
            ) : (
              <img
                src={currentMedia.url}
                alt={product.name}
                className="max-h-[85vh] max-w-full object-contain rounded-xl shadow-2xl"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
