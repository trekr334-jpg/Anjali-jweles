import React, { useState } from 'react';
import {
  ShieldCheck,
  Package,
  Image as ImageIcon,
  ShoppingBag,
  Users,
  Settings,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  ArrowLeft,
  Save,
  MessageCircle,
  Phone,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product, HeroBannerItem, OrderStatus, ProductCategory } from '../types';

export const AdminPanel: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    heroBanners,
    updateHeroBanners,
    orders,
    updateOrderStatus,
    settings,
    updateSettings,
    setCurrentView,
    customer,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'products' | 'banners' | 'orders' | 'settings'>('orders');

  // Edit / Add Product State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    category: 'Necklaces',
    originalPrice: 12000,
    discountPercent: 10,
    discountedPrice: 10800,
    images: ['/assets/aistudio/674632780_1793616377942623_63edcdf2.jpg'],
    description: '',
    isUserProduct: true,
    specifications: {
      jewelleryType: 'Royal Suite',
      material: '22K Gold Antique Plating',
      finish: 'Matte Temple Polish',
      design: 'Heritage Filigree',
      colour: 'Gold',
      availableQuantity: 10,
      careInstructions: 'Store in airtight velvet pouch.',
      shippingInfo: 'Complimentary insured shipping.',
      returnPolicy: '7-day inspection window.',
    },
  });

  // Settings State Form
  const [settingsForm, setSettingsForm] = useState(settings);

  // Handle Product Save
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.category) return;

    const original = Number(productForm.originalPrice) || 10000;
    const disc = Number(productForm.discountPercent) || 0;
    const discounted = Math.round(original * (1 - disc / 100));

    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        ...productForm,
        originalPrice: original,
        discountPercent: disc,
        discountedPrice: discounted,
        name: productForm.name!,
        category: productForm.category as ProductCategory,
        description: productForm.description || '',
        specifications: productForm.specifications || editingProduct.specifications,
        images: productForm.images?.length ? productForm.images : editingProduct.images,
      } as Product);
      setEditingProduct(null);
    } else if (isAddingProduct) {
      addProduct({
        name: productForm.name!,
        category: productForm.category as ProductCategory,
        originalPrice: original,
        discountPercent: disc,
        discountedPrice: discounted,
        images: productForm.images && productForm.images.length > 0 ? productForm.images : ['/assets/aistudio/674632780_1793616377942623_63edcdf2.jpg'],
        videoUrl: productForm.videoUrl,
        isUserProduct: true,
        isBestSeller: false,
        isNewArrival: true,
        description: productForm.description || 'Exclusive handcrafted luxury jewellery masterpiece by ANJALI JEWELS.',
        specifications: productForm.specifications || {
          jewelleryType: 'Handcrafted Suite',
          material: '22K Gold Antique Micron Plating',
          finish: 'Matte Temple Polish',
          design: 'Filigree & Kundan Setting',
          colour: 'Antique Gold',
          availableQuantity: 10,
          careInstructions: 'Store in velvet box.',
          shippingInfo: 'Insured transit across India.',
          returnPolicy: '7-day return policy.',
        },
      });
      setIsAddingProduct(false);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#B99A62]/30 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#514331] border border-[#B99A62] text-[#B99A62] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-playfair text-2xl sm:text-3xl font-medium text-[#E8D8B8]">
                Owner Administration Dashboard
              </h1>
              <span className="text-[10px] font-mono bg-[#B99A62] text-[#29251F] font-bold px-2 py-0.5 rounded">
                LIVE OPS
              </span>
            </div>
            <p className="text-xs font-lato text-[#E8D8B8]/70 mt-0.5">
              ANJALI JEWELS Commerce & Operations Console
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentView('home')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#514331]/40 border border-[#B99A62]/40 text-[#E8D8B8] hover:text-[#B99A62] text-xs font-montserrat uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit to Storefront</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-[#B99A62]/20 pb-4 text-xs font-montserrat uppercase tracking-wider font-semibold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
            activeTab === 'orders'
              ? 'bg-[#B99A62] text-[#29251F] shadow-md'
              : 'text-[#E8D8B8]/80 hover:text-[#B99A62] bg-[#514331]/30'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
            activeTab === 'products'
              ? 'bg-[#B99A62] text-[#29251F] shadow-md'
              : 'text-[#E8D8B8]/80 hover:text-[#B99A62] bg-[#514331]/30'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('banners')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
            activeTab === 'banners'
              ? 'bg-[#B99A62] text-[#29251F] shadow-md'
              : 'text-[#E8D8B8]/80 hover:text-[#B99A62] bg-[#514331]/30'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Hero Banners ({heroBanners.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
            activeTab === 'settings'
              ? 'bg-[#B99A62] text-[#29251F] shadow-md'
              : 'text-[#E8D8B8]/80 hover:text-[#B99A62] bg-[#514331]/30'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Website & WhatsApp Config</span>
        </button>
      </div>

      {/* TAB 1: ORDER MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-playfair text-2xl font-medium text-[#E8D8B8]">
              Customer Order Reservations
            </h2>
            <span className="text-xs font-montserrat text-[#B99A62]">
              Real-time synchronization with WhatsApp inquiries
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#EDE2D4] text-[#29251F] border border-[#B99A62]/40">
              <ShoppingBag className="w-12 h-12 text-[#B99A62] mx-auto mb-3" />
              <h3 className="font-playfair text-xl font-bold text-[#29251F]">
                No orders registered yet
              </h3>
              <p className="text-xs font-lato text-[#786B59] mt-1">
                When patrons click "Buy Now" or checkout via WhatsApp, reservations are logged here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="rounded-2xl bg-[#EDE2D4] text-[#29251F] border border-[#B99A62]/40 p-5 sm:p-6 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-base font-bold text-[#343A2B] bg-[#F2E5D5] px-2.5 py-1 rounded border border-[#B99A62]/40">
                        {ord.id}
                      </span>
                      <span className="text-xs font-montserrat text-[#786B59]">
                        {new Date(ord.createdAt).toLocaleString()}
                      </span>
                      {ord.customer.isGuest && (
                        <span className="text-[10px] font-montserrat uppercase bg-[#514331] text-[#E8D8B8] px-2 py-0.5 rounded">
                          Guest Order
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-montserrat font-bold text-[#29251F]">
                      Patron: {ord.customer.name} · Phone: {ord.customer.phone}
                    </div>

                    <div className="text-xs font-lato text-[#514331]">
                      Address: {ord.customer.address}, {ord.customer.city}, {ord.customer.state} - {ord.customer.pincode}
                    </div>

                    <div className="text-xs font-lato text-[#786B59]">
                      Items: {ord.items.map((it) => `${it.product.name} (Qty: ${it.quantity})`).join(', ')}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t lg:border-t-0 pt-3 lg:pt-0 border-[#514331]/10">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] font-montserrat uppercase text-[#786B59] block">
                        Total Amount
                      </span>
                      <span className="font-cormorant text-2xl font-bold text-[#343A2B]">
                        ₹{ord.finalTotal.toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Status Dropdown */}
                    <div>
                      <label className="block text-[10px] font-montserrat uppercase text-[#786B59] mb-1 font-semibold">
                        Update Status:
                      </label>
                      <select
                        value={ord.status}
                        onChange={(e) =>
                          updateOrderStatus(ord.id, e.target.value as OrderStatus)
                        }
                        className="py-2 px-3 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-xs font-montserrat font-semibold text-[#29251F] focus:outline-none focus:border-[#B99A62]"
                      >
                        <option value="Order Request Created">Order Request Created</option>
                        <option value="WhatsApp Order Request Sent">WhatsApp Order Request Sent</option>
                        <option value="Seller Confirmed">Seller Confirmed</option>
                        <option value="Crafting & Quality Check">Crafting & Quality Check</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>

                    {/* WhatsApp Action */}
                    <a
                      href={`https://wa.me/${ord.customer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                        `Hello ${ord.customer.name}, ANJALI JEWELS owner confirming your order ${ord.id}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-lg bg-[#343A2B] hover:bg-[#514331] text-[#E8D8B8] hover:text-[#B99A62] text-xs font-montserrat flex items-center gap-1.5 transition-colors"
                      title="Chat with Customer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#B99A62]" />
                      <span>WhatsApp Customer</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PRODUCT MANAGEMENT */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-playfair text-2xl font-medium text-[#E8D8B8]">
                Catalogue Inventory ({products.length})
              </h2>
              <p className="text-xs font-lato text-[#E8D8B8]/70 mt-0.5">
                Manage prices, discounts, images, stock, and descriptions
              </p>
            </div>

            <button
              onClick={() => {
                setIsAddingProduct(true);
                setEditingProduct(null);
                setProductForm({
                  name: '',
                  category: 'Necklaces',
                  originalPrice: 15000,
                  discountPercent: 10,
                  discountedPrice: 13500,
                  images: ['/assets/aistudio/674632780_1793616377942623_63edcdf2.jpg'],
                  description: '',
                  isUserProduct: true,
                });
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#B99A62] text-[#29251F] font-montserrat text-xs font-bold uppercase rounded-lg hover:bg-[#D4AF37] transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {/* Add / Edit Form Modal */}
          {(isAddingProduct || editingProduct) && (
            <div className="p-6 rounded-2xl bg-[#EDE2D4] text-[#29251F] border-2 border-[#B99A62] shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#514331]/20 pb-3">
                <h3 className="font-playfair text-xl font-bold">
                  {editingProduct ? `Edit: ${editingProduct.name}` : 'Add New Jewellery Piece'}
                </h3>
                <button
                  onClick={() => {
                    setEditingProduct(null);
                    setIsAddingProduct(false);
                  }}
                  className="p-1 text-[#514331] hover:text-[#29251F]"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-montserrat uppercase font-semibold mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={productForm.name || ''}
                      onChange={(e) =>
                        setProductForm({ ...productForm, name: e.target.value })
                      }
                      className="w-full py-2 px-3 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-montserrat uppercase font-semibold mb-1">
                      Category *
                    </label>
                    <select
                      value={productForm.category || 'Necklaces'}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          category: e.target.value as ProductCategory,
                        })
                      }
                      className="w-full py-2 px-3 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-xs"
                    >
                      <option value="Necklaces">Necklaces</option>
                      <option value="Bangles">Bangles</option>
                      <option value="Earrings">Earrings</option>
                      <option value="Bridal Jewellery">Bridal Jewellery</option>
                      <option value="Rings">Rings</option>
                      <option value="Pendant Sets">Pendant Sets</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-montserrat uppercase font-semibold mb-1">
                      Original Price (₹)
                    </label>
                    <input
                      type="number"
                      required
                      value={productForm.originalPrice || 0}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          originalPrice: Number(e.target.value),
                        })
                      }
                      className="w-full py-2 px-3 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-montserrat uppercase font-semibold mb-1">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      value={productForm.discountPercent || 0}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          discountPercent: Number(e.target.value),
                        })
                      }
                      className="w-full py-2 px-3 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-montserrat uppercase font-semibold mb-1">
                      Stock Count
                    </label>
                    <input
                      type="number"
                      value={productForm.specifications?.availableQuantity || 10}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          specifications: {
                            ...productForm.specifications!,
                            availableQuantity: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full py-2 px-3 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-montserrat uppercase font-semibold mb-1">
                    Primary Image URL
                  </label>
                  <input
                    type="text"
                    value={productForm.images?.[0] || ''}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        images: [e.target.value, ...(productForm.images?.slice(1) || [])],
                      })
                    }
                    className="w-full py-2 px-3 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-montserrat uppercase font-semibold mb-1">
                    Product Description
                  </label>
                  <textarea
                    rows={2}
                    value={productForm.description || ''}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        description: e.target.value,
                      })
                    }
                    className="w-full py-2 px-3 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-xs font-lato"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProduct(null);
                      setIsAddingProduct(false);
                    }}
                    className="px-4 py-2 rounded-lg border border-[#514331] text-xs font-montserrat"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-[#343A2B] text-[#E8D8B8] hover:text-[#B99A62] text-xs font-montserrat font-bold uppercase"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Product Items Table */}
          <div className="rounded-2xl bg-[#EDE2D4] text-[#29251F] border border-[#B99A62]/40 overflow-hidden shadow-lg">
            <div className="divide-y divide-[#514331]/15">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-16 h-16 rounded-xl object-cover border border-[#514331]/20 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-montserrat uppercase text-[#786B59]">
                          {prod.category}
                        </span>
                        {prod.isUserProduct ? (
                          <span className="text-[9px] bg-[#343A2B] text-[#B99A62] px-1.5 py-0.2 rounded font-montserrat">
                            Authentic
                          </span>
                        ) : (
                          <span className="text-[9px] bg-[#514331] text-[#E8D8B8] px-1.5 py-0.2 rounded font-montserrat">
                            Sample
                          </span>
                        )}
                      </div>
                      <h4 className="font-montserrat font-semibold text-sm text-[#29251F]">
                        {prod.name}
                      </h4>
                      <p className="font-cormorant font-bold text-base text-[#343A2B]">
                        ₹{prod.discountedPrice.toLocaleString('en-IN')}{' '}
                        <span className="text-xs font-lato text-[#786B59] line-through">
                          ₹{prod.originalPrice.toLocaleString('en-IN')}
                        </span>{' '}
                        ({prod.discountPercent}% OFF)
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingProduct(prod);
                        setProductForm(prod);
                        setIsAddingProduct(false);
                      }}
                      className="p-2 rounded-lg bg-[#F2E5D5] hover:bg-[#B99A62] text-[#29251F] transition-colors"
                      title="Edit Product"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove ${prod.name} from store?`)) {
                          deleteProduct(prod.id);
                        }
                      }}
                      className="p-2 rounded-lg bg-[#F2E5D5] hover:bg-red-800 hover:text-white text-red-800 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BANNER MANAGEMENT */}
      {activeTab === 'banners' && (
        <div className="space-y-6">
          <h2 className="font-playfair text-2xl font-medium text-[#E8D8B8]">
            Homepage Hero Carousel Banners ({heroBanners.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {heroBanners.map((banner, index) => (
              <div
                key={banner.id}
                className="rounded-2xl bg-[#EDE2D4] text-[#29251F] border border-[#B99A62]/40 overflow-hidden shadow-md flex flex-col justify-between"
              >
                <div className="aspect-[16/9] w-full overflow-hidden bg-black relative">
                  <img
                    src={banner.imageUrl}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-[#343A2B]/90 text-[#E8D8B8] px-2.5 py-0.5 rounded text-[10px] font-montserrat uppercase">
                    Slide #{index + 1} · {banner.isUserBanner ? 'Uploaded Banner' : 'AI Editorial'}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <h4 className="font-playfair font-semibold text-base text-[#29251F]">
                    {banner.title}
                  </h4>
                  <p className="text-xs font-lato text-[#786B59] line-clamp-2">
                    {banner.subtitle}
                  </p>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-[#514331]/10">
                    <span className="font-montserrat text-[#343A2B] font-semibold">
                      Tag: {banner.offerTag}
                    </span>
                    <span className="font-montserrat text-[#786B59]">
                      Link: {banner.categoryLink}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: WEBSITE & WHATSAPP SETTINGS */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <h2 className="font-playfair text-2xl font-medium text-[#E8D8B8]">
            Owner Contact & WhatsApp Configuration
          </h2>

          <form
            onSubmit={handleSaveSettings}
            className="rounded-2xl bg-[#EDE2D4] text-[#29251F] border border-[#B99A62]/50 p-6 sm:p-8 shadow-xl space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-montserrat uppercase font-semibold mb-1 text-[#29251F]">
                  Owner WhatsApp Number (for Order Booking) *
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.ownerWhatsApp}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      ownerWhatsApp: e.target.value,
                    })
                  }
                  className="w-full py-2.5 px-3 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-xs font-mono"
                />
                <p className="text-[10px] font-lato text-[#786B59] mt-1">
                  Patron WhatsApp order summaries will be sent directly to this number.
                </p>
              </div>

              <div>
                <label className="block text-xs font-montserrat uppercase font-semibold mb-1 text-[#29251F]">
                  Owner Calling Phone Number *
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.ownerPhone}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, ownerPhone: e.target.value })
                  }
                  className="w-full py-2.5 px-3 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-montserrat uppercase font-semibold mb-1 text-[#29251F]">
                Instagram Direct Profile URL
              </label>
              <input
                type="url"
                value={settingsForm.instagramUrl}
                onChange={(e) =>
                  setSettingsForm({ ...settingsForm, instagramUrl: e.target.value })
                }
                className="w-full py-2.5 px-3 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-montserrat uppercase font-semibold mb-1 text-[#29251F]">
                Business Address (For Footer & Google Maps Integration)
              </label>
              <textarea
                rows={2}
                value={settingsForm.businessAddress}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    businessAddress: e.target.value,
                  })
                }
                className="w-full py-2 px-3 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-xs font-lato"
              />
            </div>

            <div>
              <label className="block text-xs font-montserrat uppercase font-semibold mb-1 text-[#29251F]">
                Header Announcement Strip Text
              </label>
              <input
                type="text"
                value={settingsForm.announcementText}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    announcementText: e.target.value,
                  })
                }
                className="w-full py-2.5 px-3 rounded-lg bg-[#F2E5D5] border border-[#514331]/30 text-xs font-lato"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#343A2B] hover:bg-[#514331] text-[#E8D8B8] hover:text-[#B99A62] font-montserrat text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                <Save className="w-4 h-4" />
                <span>Save Website Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
