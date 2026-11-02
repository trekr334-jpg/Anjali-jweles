import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { ThreeDotMenu } from './components/ThreeDotMenu';
import { SearchBarWithCamera } from './components/SearchBarWithCamera';
import { CameraSearchModal } from './components/CameraSearchModal';
import { HeroCarousel } from './components/HeroCarousel';
import { DiscountStrip } from './components/DiscountStrip';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductCard } from './components/ProductCard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartPage } from './components/CartPage';
import { WhatsAppCheckoutModal } from './components/WhatsAppCheckoutModal';
import { OrderConfirmationPage } from './components/OrderConfirmationPage';
import { CustomerAccountModal } from './components/CustomerAccountModal';
import { AdminPanel } from './components/AdminPanel';
import { BrandStorySection } from './components/BrandStorySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FooterModelBanner } from './components/FooterModelBanner';
import { Footer } from './components/Footer';
import { CataloguePage } from './components/CataloguePage';
import { AboutPage } from './components/AboutPage';
import { OrdersPage } from './components/OrdersPage';
import { ArrowRight, Sparkles } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    setSelectedCategory,
    products,
    directBuyProduct,
    isBuyNowModalOpen,
    closeBuyNowModal,
    cart,
    toasts,
  } = useStore();

  const [isCartCheckoutOpen, setIsCartCheckoutOpen] = React.useState(false);

  // Filter products for homepage sections
  // Strict rule: User-provided products MUST appear first!
  const userProducts = products.filter((p) => p.isUserProduct);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const newArrivals = products.filter((p) => p.isNewArrival);

  return (
    <div className="min-h-screen bg-[#F3EBDD] text-[#2B2520] flex flex-col font-lato selection:bg-[#B89A62] selection:text-[#2B2520]">
      {/* Toast Notifications */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="p-3.5 px-4 rounded-xl shadow-2xl bg-[#FFF9F0] text-[#2B2520] border border-[#B89A62] text-xs font-montserrat font-medium flex items-center gap-2.5 pointer-events-auto animate-fade-in"
          >
            <Sparkles className="w-4 h-4 text-[#B89A62] shrink-0" />
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Global Modals & Drawers */}
      <ThreeDotMenu />
      <CameraSearchModal />
      <CustomerAccountModal />

      {/* Direct Single-Product Buy Now Modal */}
      {directBuyProduct && (
        <WhatsAppCheckoutModal
          isOpen={isBuyNowModalOpen}
          onClose={closeBuyNowModal}
          checkoutItems={[{ product: directBuyProduct, quantity: 1 }]}
        />
      )}

      {/* Full Cart WhatsApp Checkout Modal */}
      <WhatsAppCheckoutModal
        isOpen={isCartCheckoutOpen}
        onClose={() => setIsCartCheckoutOpen(false)}
        checkoutItems={cart}
      />

      {/* Navigation Header */}
      <Header />

      {/* Main Content Router */}
      <main className="flex-1">
        {/* VIEW 1: PRODUCT DETAIL PAGE */}
        {currentView === 'product-detail' && <ProductDetailPage />}

        {/* VIEW 2: ALL PRODUCTS CATALOGUE */}
        {currentView === 'catalogue' && <CataloguePage />}

        {/* VIEW 3: SHOPPING BAG */}
        {currentView === 'cart' && (
          <CartPage onProceedToOrder={() => setIsCartCheckoutOpen(true)} />
        )}

        {/* VIEW 4: ORDER CONFIRMATION PAGE */}
        {currentView === 'order-confirmation' && <OrderConfirmationPage />}

        {/* VIEW 5: ORDER TRACKING & HISTORY */}
        {currentView === 'orders' && <OrdersPage />}

        {/* VIEW 6: ABOUT & POLICIES */}
        {currentView === 'about' && <AboutPage />}

        {/* VIEW 7: OWNER ADMIN PANEL */}
        {currentView === 'admin' && <AdminPanel />}

        {/* VIEW 8: HOMEPAGE */}
        {currentView === 'home' && (
          <div className="space-y-4">
            {/* Search Bar with Camera Search */}
            <SearchBarWithCamera />

            {/* H1 Hero Heading & Hero Banner Carousel */}
            <HeroCarousel />

            {/* Trust Features Strip */}
            <DiscountStrip variant="features" />

            {/* Thin Discount Banner Strip 1 */}
            <DiscountStrip
              variant="gold"
              title="Celebrate Every Moment in Elegance"
              subtitle="Special 10% Courtesy on Handcrafted Bridal Suites with code AJROYAL"
              code="AJROYAL"
              ctaText="Explore Bridal Suites"
              categoryLink="Bridal Jewellery"
            />

            {/* Shop by Category */}
            <CategoryShowcase />

            {/* Featured Jewellery Collection — USER-PROVIDED PRODUCTS HIGHEST PRIORITY */}
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#B89A62]/25 gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-montserrat uppercase tracking-[0.25em] text-[#B89A62] mb-1 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>The Royal Signature Archive</span>
                  </div>
                  <h2 className="font-playfair text-3xl sm:text-4xl font-medium text-[#2B2520]">
                    Featured Masterpieces
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setCurrentView('catalogue');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-wider text-[#B89A62] hover:text-[#2B2520] transition-colors cursor-pointer font-semibold"
                >
                  <span>View All Masterpieces</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Grid: Displays user-provided authentic products first */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {userProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Thin Promotional Strip 2 */}
            <DiscountStrip
              variant="pink"
              title="The Royal Mayur Collection in Vitreous Enamel"
              subtitle="Hand-engraved peacock motifs chiseled in 22K antique matte gold polish"
              code="MAYUR12"
              ctaText="Shop Peacock Bangles"
              categoryLink="Bangles"
            />

            {/* New Arrivals Section */}
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#B89A62]/25 gap-4">
                <div>
                  <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#B89A62] block mb-1 font-semibold">
                    Newly Chiseled Additions
                  </span>
                  <h2 className="font-playfair text-3xl sm:text-4xl font-medium text-[#2B2520]">
                    New Arrivals
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('New Arrivals');
                    setCurrentView('catalogue');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-wider text-[#B89A62] hover:text-[#2B2520] transition-colors cursor-pointer font-semibold"
                >
                  <span>Explore All Arrivals</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {newArrivals.slice(0, 3).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Best Sellers Section */}
            <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#B89A62]/25 gap-4">
                <div>
                  <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#B89A62] block mb-1 font-semibold">
                    Most Coveted Heirlooms
                  </span>
                  <h2 className="font-playfair text-3xl sm:text-4xl font-medium text-[#2B2520]">
                    Best Sellers
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setCurrentView('catalogue');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-wider text-[#B89A62] hover:text-[#2B2520] transition-colors cursor-pointer font-semibold"
                >
                  <span>View Full Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {bestSellers.slice(0, 3).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Luxury Brand Story Section */}
            <BrandStorySection />

            {/* Customer Testimonials */}
            <TestimonialsSection />

            {/* Premium Model Footer Banner */}
            <FooterModelBanner />
          </div>
        )}
      </main>

      {/* Luxury Footer in Deep Accent #2B2520 with connected links */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
