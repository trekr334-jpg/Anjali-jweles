export type ProductCategory =
  | 'All'
  | 'Necklaces'
  | 'Bangles'
  | 'Earrings'
  | 'Bridal Jewellery'
  | 'Rings'
  | 'Pendant Sets'
  | 'New Arrivals';

export interface ProductSpecifications {
  jewelleryType: string;
  material: string;
  finish: string;
  design: string;
  colour: string;
  availableQuantity: number;
  careInstructions: string;
  shippingInfo: string;
  returnPolicy: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  originalPrice: number;
  discountPercent: number;
  discountedPrice: number;
  images: string[]; // Angle 1, Angle 2, Angle 3, Model Image
  videoUrl?: string; // Product video
  isUserProduct: boolean; // True for supplied 4 products
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  description: string;
  specifications: ProductSpecifications;
  dominantColor?: string; // Used for camera visual similarity
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | 'Order Request Created'
  | 'Order Request Prepared — Awaiting Confirmation'
  | 'WhatsApp Order Request Sent'
  | 'Seller Confirmed'
  | 'Crafting & Quality Check'
  | 'Dispatched'
  | 'Delivered';

export interface OrderCustomer {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isGuest: boolean;
}

export interface Order {
  id: string; // e.g. "AJ-00123"
  items: CartItem[];
  customer: OrderCustomer;
  originalPriceTotal: number;
  discountTotal: number;
  finalTotal: number;
  status: OrderStatus;
  createdAt: string;
  notes?: string;
}

export interface HeroBannerItem {
  id: string;
  title: string;
  subtitle: string;
  offerTag?: string;
  imageUrl: string;
  isUserBanner: boolean;
  categoryLink: ProductCategory;
  ctaText: string;
}

export interface WebsiteSettings {
  brandName: string;
  ownerWhatsApp: string;
  ownerPhone: string;
  businessAddress: string;
  instagramUrl: string;
  instagramHandle?: string;
  logoUrl?: string;
  announcementText: string;
  freeShippingThreshold: number;
}

export interface CustomerProfile {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isLoggedIn: boolean;
}
