import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';

interface CategoryCard {
  name: ProductCategory;
  title: string;
  subtitle: string;
  image: string;
  count: number;
}

export const CategoryShowcase: React.FC = () => {
  const { setSelectedCategory, setCurrentView } = useStore();

  const categories: CategoryCard[] = [
    {
      name: 'Necklaces',
      title: 'Haar & Chokers',
      subtitle: 'Imperial Kundan & Firoza collars',
      image: '/assets/aistudio/674632780_1793616377942623_63edcdf2.jpg',
      count: 14,
    },
    {
      name: 'Bangles',
      title: 'Kada & Bangles',
      subtitle: 'Hand-enamelled peacock filigree',
      image: '/assets/aistudio/IMG_20261102_164945_f4129557.jpg',
      count: 9,
    },
    {
      name: 'Bridal Jewellery',
      title: 'Bridal Suites',
      subtitle: 'Complete Lakshmi heirloom sets',
      image: '/assets/aistudio/478667503_1793618808073294_08a3c9ae.jpg',
      count: 8,
    },
    {
      name: 'Earrings',
      title: 'Jhumkas & Chandbali',
      subtitle: 'Cascading pearls & ruby kemp',
      image: '/src/assets/images/product_kundan_chandbali_earrings_1793623154640.jpg',
      count: 12,
    },
  ];

  const handleSelect = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    setCurrentView('catalogue');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-[#B89A62]/25 gap-3">
        <div>
          <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#B89A62] font-semibold block mb-1">
            Curated Classifications
          </span>
          <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-medium text-[#2B2520]">
            Shop by Category
          </h2>
        </div>
        <p className="text-xs sm:text-sm font-lato text-[#786B59] max-w-md">
          Explore iconic Indian jewellery styles chiseled by revered karigars, from Rajasthan kundan to Dravidian temple sanctuaries.
        </p>
      </div>

      {/* Categories Layout:
          - Mobile: 2 cards visible simultaneously side-by-side with smooth horizontal snap scrolling
          - Tablet & Desktop: Refined 4-column luxury grid
      */}
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 overflow-x-auto sm:overflow-visible pb-3 sm:pb-0 snap-x snap-mandatory scrollbar-none">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => handleSelect(cat.name)}
            className="w-[calc(50%-6px)] shrink-0 sm:w-auto snap-start group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden bg-[#FFF9F0] border border-[#B89A62]/30 hover:border-[#B89A62] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(43,37,32,0.12)] flex flex-col shadow-sm"
          >
            {/* Image Container with 1:1 Aspect Ratio */}
            <div className="relative aspect-square w-full overflow-hidden bg-[#EDE2D0]">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B2520]/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#2B2520]/80 text-[#FFF9F0] group-hover:bg-[#B89A62] group-hover:text-[#2B2520] flex items-center justify-center transition-colors shadow-sm">
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>

            {/* Content Area */}
            <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[9px] sm:text-[10px] font-montserrat uppercase tracking-[0.16em] text-[#B89A62] font-semibold">
                  {cat.count} Masterpieces
                </span>
                <h3 className="font-cormorant text-base sm:text-xl md:text-2xl font-bold text-[#2B2520] group-hover:text-[#B89A62] transition-colors mt-0.5 leading-snug">
                  {cat.title}
                </h3>
                <p className="hidden sm:block text-xs font-lato text-[#786B59] mt-1 line-clamp-1">
                  {cat.subtitle}
                </p>
              </div>

              <div className="pt-2 sm:pt-4 mt-2 border-t border-[#B89A62]/15 flex items-center justify-between text-[11px] sm:text-xs font-montserrat font-semibold text-[#2B2520]">
                <span className="group-hover:text-[#B89A62] transition-colors">Explore</span>
                <span className="text-[#B89A62] font-serif text-sm">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
