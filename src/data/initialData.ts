import { Product, HeroBannerItem, WebsiteSettings } from '../types';

export const INITIAL_SETTINGS: WebsiteSettings = {
  brandName: 'ANJALI JEWELS',
  ownerWhatsApp: '9319862576',
  ownerPhone: '9319862576',
  businessAddress: 'Janakpuri, Delhi',
  instagramUrl: 'https://www.instagram.com/AnjaliiJewels/',
  instagramHandle: '@AnjaliiJewels',
  logoUrl: '/assets/aistudio/IMG-20261102-WA0011_f11c9034.jpg',
  announcementText: 'Complimentary Insured Shipping Across India · Special 10% Courtesy on Bridal Heritage Sets with code AJROYAL',
  freeShippingThreshold: 5000,
};

export const INITIAL_PRODUCTS: Product[] = [
  // Product 1: Royal Firoza Kundan Pearl Choker Set (User Product #1)
  {
    id: 'prod-firoza-choker-01',
    name: 'Royal Firoza Kundan Pearl Choker Set',
    category: 'Necklaces',
    originalPrice: 14500,
    discountPercent: 15,
    discountedPrice: 12325,
    isUserProduct: true,
    isBestSeller: true,
    isNewArrival: false,
    dominantColor: '#4CA6B8', // Turquoise
    images: [
      // Sequence: Angle 1 -> Angle 2 -> Angle 3 -> Model Image
      '/assets/aistudio/674632780_1793616377942623_63edcdf2.jpg',
      '/assets/aistudio/505669175_1793616440615519_1c612f09.jpg',
      '/assets/aistudio/IMG_20261102_162641_b2ab2bc0.jpg',
      '/assets/aistudio/1000735598_1793616468947709_35f19320.jpg',
    ],
    videoUrl: '/assets/aistudio/1059262275_1793615951724750_4e3a416e.mp4',
    description:
      'A majestic bridal collar necklace featuring celestial turquoise firoza meenakari roundels surrounded by micro-pearl halos, uncut kundan polki work, and clusters of drop pearls. Paired with coordinating chandelier drop earrings.',
    specifications: {
      jewelleryType: 'Choker Necklace & Chandelier Earrings Set',
      material: 'Brass Alloy with 22K Antique Micron Gold Plating',
      finish: 'Handcrafted Meenakari & Antique Matte Polish',
      design: 'Heritage Rajasthani Royal Kundan with Firoza Enamel',
      colour: 'Turquoise Blue, Champagne Pearl & Regal Gold',
      availableQuantity: 12,
      careInstructions: 'Store in airtight velvet pouch. Wipe gently with dry cotton cloth. Keep away from water and perfumes.',
      shippingInfo: 'Dispatched within 24–48 hours in tamper-evident velvet gift box. Free insured transit.',
      returnPolicy: '7-day seamless return or exchange on unworn jewellery with security tag intact.',
    },
  },

  // Product 2: Royal Mayur Antique Gold Kada Bangles (User Product #2)
  {
    id: 'prod-mayur-kada-02',
    name: 'Royal Mayur Antique Gold Kada Bangles',
    category: 'Bangles',
    originalPrice: 9800,
    discountPercent: 12,
    discountedPrice: 8624,
    isUserProduct: true,
    isBestSeller: true,
    isNewArrival: false,
    dominantColor: '#B8860B', // Antique Gold / Green
    images: [
      // Sequence: Angle 1 -> Angle 2 -> Angle 3 -> Model Image
      '/assets/aistudio/486907549_1793617572671048_e5cb0a7f.jpg',
      '/assets/aistudio/621186673_1793617599293473_867d94c4.jpg',
      '/assets/aistudio/IMG_20261102_164945_f4129557.jpg',
      '/assets/aistudio/445310977_1793618210676293_8e9e9225.jpg',
    ],
    videoUrl: '/assets/aistudio/14030021_1793617623663880_f30a86e5.mp4',
    description:
      'Architectural statement kada bangles adorned with dancing peacock (Mayur) motifs, rich bottle-green and crimson vitreous enamel feathers, precision-faceted polki stones, and an antique screw-hinge lock for effortless wear.',
    specifications: {
      jewelleryType: 'Pair of Statement Hinged Kada Bangles',
      material: 'Heritage Brass Alloy with High-Micron 22K Gold Finish',
      finish: 'Antique Temple Gold Polish with Vitreous Enamel',
      design: 'Sculpted Mayur (Peacock) Filigree Relief',
      colour: 'Antique Gold with Emerald Green & Ruby Red Inlays',
      availableQuantity: 8,
      careInstructions: 'Avoid harsh chemicals or abrasives. Store individually in plush soft roll.',
      shippingInfo: 'Hand-packed in ANJALI JEWELS signature velvet wooden jewellery box.',
      returnPolicy: '7-day exchange window with door-step courier pickup.',
    },
  },

  // Product 3: Maharani Peacock Temple Haar Set (User Product #3)
  {
    id: 'prod-peacock-temple-haar-03',
    name: 'Maharani Peacock Temple Haar Set',
    category: 'Necklaces',
    originalPrice: 18500,
    discountPercent: 10,
    discountedPrice: 16650,
    isUserProduct: true,
    isBestSeller: false,
    isNewArrival: true,
    dominantColor: '#800020', // Ruby / Temple Gold
    images: [
      // Sequence: Angle 1 -> Angle 2 -> Angle 3 -> Model Image
      '/assets/aistudio/447416567_1793618185932994_61445c62.jpg',
      '/assets/aistudio/66586718_1793618192266026_f498aa2e.jpg',
      '/assets/aistudio/IMG_20261102_163820_bb61e3a6.jpg',
      '/assets/aistudio/873625309_1793617549539907_e7586121.jpg',
    ],
    videoUrl: '/assets/aistudio/274453033_1793618283074247_41f03a04.mp4',
    description:
      'Imposing South Indian temple haar embodying imperial grandeur. Featuring dancing peacock links along the collar, flanked by kemp stones and micro-pearl seed fringes, crowned by a central Lakshmi deity medallion.',
    specifications: {
      jewelleryType: 'Temple Grand Haar & Matching Jhumkas',
      material: '22K Temple Gold Matte Micron Plating on Alloy',
      finish: 'Nakshi Engraving & Heritage Kemp Stone Setting',
      design: 'Sacred Temple Nakshi with Peacock & Deity Medallion',
      colour: 'Deep Matte Gold, Kemp Ruby & Forest Green',
      availableQuantity: 6,
      careInstructions: 'Protect from moisture. Clean only using soft lint-free flannel.',
      shippingInfo: 'Insured blue-dart express courier with signature delivery.',
      returnPolicy: 'Hassle-free 7-day exchange policy.',
    },
  },

  // Product 4: Aishwarya Grand Lakshmi Bridal Haram Set (User Product #4)
  {
    id: 'prod-lakshmi-bridal-haram-04',
    name: 'Aishwarya Grand Lakshmi Bridal Haram Set',
    category: 'Bridal Jewellery',
    originalPrice: 24000,
    discountPercent: 15,
    discountedPrice: 20400,
    isUserProduct: true,
    isBestSeller: true,
    isNewArrival: true,
    dominantColor: '#4A0E17', // Maroon / Antique Gold
    images: [
      // Sequence: Angle 1 -> Angle 2 -> Angle 3 -> Model Image
      '/assets/aistudio/478667503_1793618808073294_08a3c9ae.jpg',
      '/assets/aistudio/410929015_1793618817861967_a21fb69f.jpg',
      '/assets/aistudio/292323392_1793618824818257_f0f6bd09.jpg',
      '/assets/aistudio/258846268_1793618829785694_ed7d14fe.jpg',
    ],
    videoUrl: '/assets/aistudio/448116992_1793618870694127_d9a4cb5c.mp4',
    description:
      'The pinnacle of South Indian wedding splendour. This multi-tiered heirloom bridal suite includes the Grand Lakshmi Long Haram, matching collar necklace, opulent temple jhumkas, and intricate Maang Tikka with ruby kemp clusters.',
    specifications: {
      jewelleryType: 'Complete 4-Piece Grand Bridal Suite (Haram, Choker, Jhumkas, Tikka)',
      material: 'Imperial 24K Matte Gold Micron Finish on Copper Alloy',
      finish: 'Ancient Wax Mould Casting & Hand-Chiseled Detailing',
      design: 'Goddess Lakshmi Ashtalakshmi Blessings with Twin Peacocks',
      colour: 'Sacred Temple Gold, Deep Maroon Kemp & Emerald Highlights',
      availableQuantity: 4,
      careInstructions: 'Keep inside lined wooden box away from direct light. Do not spray perfumes.',
      shippingInfo: 'Dedicated luxury courier delivery in velvet heirloom chest.',
      returnPolicy: '7-day inspection guarantee with full refund or exchange.',
    },
  },

  // Product 5: Nizam Polki & Emerald Choker Necklace (AI Supplementary Product)
  {
    id: 'prod-polki-emerald-05',
    name: 'Nizam Polki & Emerald Royal Choker',
    category: 'Necklaces',
    originalPrice: 16000,
    discountPercent: 10,
    discountedPrice: 14400,
    isUserProduct: false, // Sample catalogue product
    isBestSeller: false,
    isNewArrival: true,
    dominantColor: '#1B4D3E', // Emerald Green
    images: [
      '/src/assets/images/product_polki_emerald_choker_1793623153895.jpg',
      '/src/assets/images/product_polki_emerald_choker_1793623153895.jpg',
    ],
    description:
      'Sample Catalogue Item: Inspired by Hyderabadi royal archives, this regal choker features uncut Polki diamonds framed by Colombian emerald roundels and cascading South Sea pearl teardrops.',
    specifications: {
      jewelleryType: 'Regal Polki Choker with Emerald Cabochons',
      material: '22K Gold Finished Alloy with Glass Kundan',
      finish: 'Micro-Pave Setting with Vintage Gold Wash',
      design: 'Nizami Archway & Floral Filigree',
      colour: 'Zambian Emerald Green, Polki Lustre & Gold',
      availableQuantity: 5,
      careInstructions: 'Handle with clean hands. Store in soft felt pouch.',
      shippingInfo: 'Dispatched within 48 hours across India.',
      returnPolicy: '7-day sample return guarantee.',
    },
  },

  // Product 6: Noor Chandbali Kundan & Ruby Earrings (AI Supplementary Product)
  {
    id: 'prod-chandbali-earrings-06',
    name: 'Noor Chandbali Kundan & Ruby Earrings',
    category: 'Earrings',
    originalPrice: 6500,
    discountPercent: 10,
    discountedPrice: 5850,
    isUserProduct: false, // Sample catalogue product
    isBestSeller: true,
    isNewArrival: false,
    dominantColor: '#9B111E', // Ruby Red
    images: [
      '/src/assets/images/product_kundan_chandbali_earrings_1793623154640.jpg',
      '/src/assets/images/product_kundan_chandbali_earrings_1793623154640.jpg',
    ],
    description:
      'Sample Catalogue Item: Crescent moon Chandbali earrings handset with table-cut kundan stones, carved ruby cabochon drops, and delicate golden ghungroos.',
    specifications: {
      jewelleryType: 'Royal Kundan Crescent Chandbali Earrings',
      material: 'Silver-Alloy Core with 22K Gold Vermeil',
      finish: 'Foil Backed Kundan with Hand-Strung Drops',
      design: 'Mughal Crescent Moon & Lotus Floral Stud',
      colour: 'Pigeon Blood Ruby, Kundan White & Antique Gold',
      availableQuantity: 10,
      careInstructions: 'Wipe with soft cloth. Avoid moisture and sprays.',
      shippingInfo: 'Dispatched in signature velvet gift box.',
      returnPolicy: '7-day hassle-free exchange.',
    },
  },
];

export const INITIAL_HERO_BANNERS: HeroBannerItem[] = [
  // User Uploaded Banner 1 (Turquoise necklace model banner)
  {
    id: 'banner-user-01',
    title: 'Discover the Art of Timeless Elegance',
    subtitle: 'Handcrafted Kundan, Temple Gold & Heritage Masterpieces for Unforgettable Celebrations',
    offerTag: 'Festive Collection · 15% Off',
    imageUrl: '/assets/aistudio/file_00000000117c821183e993620ccc3199_ea1fbb58.png',
    isUserBanner: true,
    categoryLink: 'Necklaces',
    ctaText: 'Explore Collection',
  },
  // User Uploaded Banner 2 (Peacock Bangles on pedestal)
  {
    id: 'banner-user-02',
    title: 'The Royal Mayur Peacock Kada',
    subtitle: 'Sculpted in Antique Gold with Vitreous Enamel & Polki Flourish',
    offerTag: 'Exclusive Limited Edition',
    imageUrl: '/assets/aistudio/213299308_1793618346488337_4d48cdc9.jpg',
    isUserBanner: true,
    categoryLink: 'Bangles',
    ctaText: 'Shop Bangles',
  },
  // User Uploaded Banner 3 (Lakshmi Bridal Suite on maroon silk)
  {
    id: 'banner-user-03',
    title: 'Sacred Heritage Lakshmi Bridal Haram',
    subtitle: 'Centuries of South Indian Temple Artistry Reimagined for the Modern Bride',
    offerTag: 'Bridal Suite Exclusive',
    imageUrl: '/assets/aistudio/545442840_1793618837220755_d33d573a.jpg',
    isUserBanner: true,
    categoryLink: 'Bridal Jewellery',
    ctaText: 'View Bridal Suite',
  },
  // AI Promotional Banner 1 (Palace Courtyard Bridal Campaign)
  {
    id: 'banner-ai-01',
    title: 'Celebrate Every Moment in Regal Radiance',
    subtitle: 'Artisanal Temple Gold Jewellery Rooted in Royal Indian Heritage',
    offerTag: 'Special 10% Off with Code AJROYAL',
    imageUrl: '/src/assets/images/hero_festive_bridal_banner_1793623151040.jpg',
    isUserBanner: false,
    categoryLink: 'All',
    ctaText: 'Discover New Arrivals',
  },
  // AI Promotional Banner 2 (Polki & Emerald Glow)
  {
    id: 'banner-ai-02',
    title: 'Celestial Polki & Emerald Glow',
    subtitle: 'Refined Luxury Jewellery Designed to Be Cherished Across Generations',
    offerTag: 'Curated Festive Edit',
    imageUrl: '/src/assets/images/hero_diamonds_polki_banner_1793623152400.jpg',
    isUserBanner: false,
    categoryLink: 'Earrings',
    ctaText: 'Shop the Look',
  },
];
