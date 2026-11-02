import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  OrderStatus,
  HeroBannerItem,
  WebsiteSettings,
  CustomerProfile,
  ProductCategory,
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_HERO_BANNERS, INITIAL_SETTINGS } from '../data/initialData';

export type ActivePageView =
  | 'home'
  | 'catalogue'
  | 'product-detail'
  | 'cart'
  | 'order-confirmation'
  | 'account'
  | 'admin'
  | 'about'
  | 'orders';

interface ToastNotification {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'gold';
}

interface StoreContextType {
  // Navigation & View
  currentView: ActivePageView;
  setCurrentView: (view: ActivePageView) => void;
  selectedCategory: ProductCategory;
  setSelectedCategory: (cat: ProductCategory) => void;
  selectedProductId: string | null;
  openProductDetail: (productId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Catalogue & Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Banners
  heroBanners: HeroBannerItem[];
  updateHeroBanners: (banners: HeroBannerItem[]) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartOriginalTotal: number;
  cartFinalTotal: number;
  cartSavingsTotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Checkout & Orders
  orders: Order[];
  lastCreatedOrder: Order | null;
  createOrder: (
    items: CartItem[],
    customer: {
      name: string;
      phone: string;
      email?: string;
      address: string;
      city: string;
      state: string;
      pincode: string;
      isGuest: boolean;
    },
    notes?: string
  ) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Direct Buy Now Trigger
  directBuyProduct: Product | null;
  initiateBuyNow: (product: Product) => void;
  closeBuyNowModal: () => void;
  isBuyNowModalOpen: boolean;

  // Customer Profile
  customer: CustomerProfile;
  loginCustomer: (phone: string, name?: string) => void;
  logoutCustomer: () => void;
  updateCustomerProfile: (data: Partial<CustomerProfile>) => void;
  isAccountModalOpen: boolean;
  setIsAccountModalOpen: (open: boolean) => void;

  // Website Settings
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;

  // Notifications
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'info' | 'gold') => void;

  // Camera / Visual search modal
  isCameraSearchOpen: boolean;
  setIsCameraSearchOpen: (open: boolean) => void;

  // Three dot menu
  isThreeDotMenuOpen: boolean;
  setIsThreeDotMenuOpen: (open: boolean) => void;

  // WhatsApp Order helper
  triggerWhatsAppOrder: (order: Order) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State
  const [currentView, setCurrentView] = useState<ActivePageView>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    INITIAL_PRODUCTS[0]?.id || null
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('anjali_products_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Hero Banners
  const [heroBanners, setHeroBanners] = useState<HeroBannerItem[]>(() => {
    const saved = localStorage.getItem('anjali_hero_banners_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_HERO_BANNERS;
      }
    }
    return INITIAL_HERO_BANNERS;
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('anjali_cart_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('anjali_wishlist_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('anjali_orders_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);

  // Direct Buy Now modal
  const [directBuyProduct, setDirectBuyProduct] = useState<Product | null>(null);
  const [isBuyNowModalOpen, setIsBuyNowModalOpen] = useState(false);

  // Customer Profile
  const [customer, setCustomer] = useState<CustomerProfile>(() => {
    const saved = localStorage.getItem('anjali_customer_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // default
      }
    }
    return {
      name: 'Aditi Sharma',
      phone: '+91 98123 45678',
      email: 'aditi.sharma@example.com',
      address: '42, Indiranagar 100 Feet Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560038',
      isLoggedIn: false,
    };
  });

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isCameraSearchOpen, setIsCameraSearchOpen] = useState(false);
  const [isThreeDotMenuOpen, setIsThreeDotMenuOpen] = useState(false);

  // Website Settings
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    const saved = localStorage.getItem('anjali_settings_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_SETTINGS;
      }
    }
    return INITIAL_SETTINGS;
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'gold' = 'gold') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('anjali_products_v2', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('anjali_hero_banners_v2', JSON.stringify(heroBanners));
  }, [heroBanners]);

  useEffect(() => {
    localStorage.setItem('anjali_cart_v2', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('anjali_wishlist_v2', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('anjali_orders_v2', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('anjali_customer_v2', JSON.stringify(customer));
  }, [customer]);

  useEffect(() => {
    localStorage.setItem('anjali_settings_v2', JSON.stringify(settings));
  }, [settings]);

  // Actions
  const openProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to your shopping bag`, 'gold');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from shopping bag', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartOriginalTotal = cart.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0
  );
  const cartFinalTotal = cart.reduce(
    (sum, item) => sum + item.product.discountedPrice * item.quantity,
    0
  );
  const cartSavingsTotal = cartOriginalTotal - cartFinalTotal;

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your Royal Wishlist', 'gold');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Buy Now direct flow
  const initiateBuyNow = (product: Product) => {
    setDirectBuyProduct(product);
    setIsBuyNowModalOpen(true);
  };

  const closeBuyNowModal = () => {
    setIsBuyNowModalOpen(false);
    setDirectBuyProduct(null);
  };

  // Create Order
  const createOrder = (
    items: CartItem[],
    customerData: {
      name: string;
      phone: string;
      email?: string;
      address: string;
      city: string;
      state: string;
      pincode: string;
      isGuest: boolean;
    },
    notes?: string
  ): Order => {
    // Generate unique order number: AJ- followed by 5 digits
    const uniqueNumber = Math.floor(10000 + Math.random() * 90000);
    const orderId = `AJ-${uniqueNumber}`;

    const originalPriceTotal = items.reduce(
      (sum, item) => sum + item.product.originalPrice * item.quantity,
      0
    );
    const finalTotal = items.reduce(
      (sum, item) => sum + item.product.discountedPrice * item.quantity,
      0
    );
    const discountTotal = originalPriceTotal - finalTotal;

    const newOrder: Order = {
      id: orderId,
      items,
      customer: customerData,
      originalPriceTotal,
      discountTotal,
      finalTotal,
      status: 'Order Request Created',
      createdAt: new Date().toISOString(),
      notes,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastCreatedOrder(newOrder);

    // If customer was updated, persist info
    setCustomer((prev) => ({
      ...prev,
      name: customerData.name,
      phone: customerData.phone,
      email: customerData.email || prev.email,
      address: customerData.address,
      city: customerData.city,
      state: customerData.state,
      pincode: customerData.pincode,
    }));

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
    if (lastCreatedOrder && lastCreatedOrder.id === orderId) {
      setLastCreatedOrder((prev) => (prev ? { ...prev, status } : null));
    }
    showToast(`Order ${orderId} status updated to: ${status}`, 'success');
  };

  // WhatsApp Order Trigger
  const triggerWhatsAppOrder = (order: Order) => {
    const firstItem = order.items[0];
    const itemSummaries = order.items
      .map(
        (it) =>
          `• ${it.product.name} (Qty: ${it.quantity}) — ₹${it.product.discountedPrice.toLocaleString('en-IN')}`
      )
      .join('\n');

    const cleanRaw = settings.ownerWhatsApp.replace(/[^0-9]/g, '');
    const cleanWa = cleanRaw.startsWith('91') ? cleanRaw : `91${cleanRaw}`;

    const message = `*ANJALI JEWELS — NEW ORDER REQUEST*\n\nHello ANJALI JEWELS,\nI would like to place an order.\n\n*Order Number:* ${order.id}\n*Primary Item:* ${firstItem ? firstItem.product.name : 'Curated Jewellery'}${order.items.length > 1 ? ` (+${order.items.length - 1} more items)` : ''}\n*Total Quantity:* ${order.items.reduce((s, i) => s + i.quantity, 0)}\n*Original Price:* ₹${order.originalPriceTotal.toLocaleString('en-IN')}\n*Savings / Discount:* ₹${order.discountTotal.toLocaleString('en-IN')}\n*Final Amount Payable:* ₹${order.finalTotal.toLocaleString('en-IN')}\n\n*Selected Items Breakdown:*\n${itemSummaries}\n\n*Delivery & Customer Details:*\n*Name:* ${order.customer.name}\n*Phone:* ${order.customer.phone}\n*Address:* ${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}\n\nPlease confirm my order request and share bank transfer/UPI details.\n\nThank you.`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${cleanWa}?text=${encoded}`;

    // Update status to WhatsApp Sent
    updateOrderStatus(order.id, 'Order Request Prepared — Awaiting Confirmation');

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Product Admin Operations
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const id = `prod-custom-${Date.now()}`;
    const product: Product = { ...newProd, id };
    setProducts((prev) => [product, ...prev]);
    showToast(`Product "${product.name}" created successfully`, 'success');
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    showToast(`Product "${updated.name}" updated`, 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalogue', 'info');
  };

  const updateHeroBanners = (banners: HeroBannerItem[]) => {
    setHeroBanners(banners);
    showToast('Hero Banners updated', 'success');
  };

  // Customer Profile Actions
  const loginCustomer = (phone: string, name?: string) => {
    setCustomer((prev) => ({
      ...prev,
      phone,
      name: name || prev.name || 'Valued Collector',
      isLoggedIn: true,
    }));
    showToast('Signed in successfully', 'success');
  };

  const logoutCustomer = () => {
    setCustomer((prev) => ({ ...prev, isLoggedIn: false }));
    showToast('Logged out of your account', 'info');
  };

  const updateCustomerProfile = (data: Partial<CustomerProfile>) => {
    setCustomer((prev) => ({ ...prev, ...data }));
    showToast('Profile updated', 'success');
  };

  const updateSettings = (newSettings: Partial<WebsiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Website settings saved', 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        selectedProductId,
        openProductDetail,
        searchQuery,
        setSearchQuery,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        heroBanners,
        updateHeroBanners,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalCount,
        cartOriginalTotal,
        cartFinalTotal,
        cartSavingsTotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        lastCreatedOrder,
        createOrder,
        updateOrderStatus,
        directBuyProduct,
        initiateBuyNow,
        closeBuyNowModal,
        isBuyNowModalOpen,
        customer,
        loginCustomer,
        logoutCustomer,
        updateCustomerProfile,
        isAccountModalOpen,
        setIsAccountModalOpen,
        settings,
        updateSettings,
        toasts,
        showToast,
        isCameraSearchOpen,
        setIsCameraSearchOpen,
        isThreeDotMenuOpen,
        setIsThreeDotMenuOpen,
        triggerWhatsAppOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
