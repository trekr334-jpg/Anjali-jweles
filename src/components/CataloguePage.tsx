import React, { useState, useMemo } from 'react';
import { ArrowUpDown, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ProductCategory } from '../types';

export const CataloguePage: React.FC = () => {
  const { products, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } =
    useStore();

  const [sortBy, setSortBy] = useState<'priority' | 'price-asc' | 'price-desc' | 'discount'>('priority');
  const [filterUserOnly, setFilterUserOnly] = useState(false);

  const categories: ProductCategory[] = [
    'All',
    'Necklaces',
    'Bangles',
    'Earrings',
    'Bridal Jewellery',
    'New Arrivals',
  ];

  // Filtering & Sorting logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory === 'New Arrivals') {
          if (!p.isNewArrival) return false;
        } else if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }

        // Authenticity filter
        if (filterUserOnly && !p.isUserProduct) return false;

        // Search Query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchDesign = p.specifications.design.toLowerCase().includes(q);
          const matchMat = p.specifications.material.toLowerCase().includes(q);
          if (!matchName && !matchCat && !matchDesc && !matchDesign && !matchMat) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priority') {
          // STRICT RULE: User-provided products MUST appear first!
          if (a.isUserProduct && !b.isUserProduct) return -1;
          if (!a.isUserProduct && b.isUserProduct) return 1;
          return 0;
        }
        if (sortBy === 'price-asc') return a.discountedPrice - b.discountedPrice;
        if (sortBy === 'price-desc') return b.discountedPrice - a.discountedPrice;
        if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
        return 0;
      });
  }, [products, selectedCategory, filterUserOnly, searchQuery, sortBy]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="font-montserrat text-xs uppercase tracking-[0.25em] text-[#B89A62] font-semibold block mb-2">
          The Master Archive
        </span>
        <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-medium text-[#2B2520]">
          All Handcrafted Jewellery
        </h1>
        <p className="mt-3 text-xs sm:text-sm font-lato text-[#786B59] leading-relaxed">
          Chiseled with 22K antique micron gold plating, hand-set kundan polki stones, and sacred Dravidian & Rajasthani motifs.
        </p>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="mb-8 p-4 rounded-2xl bg-[#FFF9F0] border border-[#B89A62]/35 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-montserrat uppercase tracking-wider font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#B89A62] text-[#2B2520] shadow-sm'
                  : 'text-[#2B2520] hover:text-[#B89A62] hover:bg-[#EDE2D0]/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sorting & Authentic toggle */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Priority filter */}
          <button
            onClick={() => setFilterUserOnly(!filterUserOnly)}
            className={`px-3 py-1.5 rounded-lg text-xs font-montserrat uppercase tracking-wider font-medium border transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              filterUserOnly
                ? 'bg-[#2B2520] border-[#B89A62] text-[#B89A62]'
                : 'border-[#B89A62]/40 text-[#2B2520] hover:text-[#B89A62]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B89A62]" />
            <span>Royal Editions Only</span>
          </button>

          {/* Sort selector */}
          <div className="flex items-center gap-2 text-xs font-montserrat text-[#2B2520] shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#B89A62]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-1.5 px-2.5 rounded-lg bg-[#F8F3EA] text-[#2B2520] border border-[#B89A62]/40 text-xs font-montserrat focus:outline-none focus:border-[#B89A62] cursor-pointer"
            >
              <option value="priority">Featured Priority</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Search Notification */}
      {searchQuery && (
        <div className="mb-6 flex items-center justify-between p-3.5 rounded-xl bg-[#FFF9F0] text-[#2B2520] text-xs font-montserrat border border-[#B89A62]/40 shadow-xs">
          <span>
            Filtering by query: <strong>"{searchQuery}"</strong> ({filteredProducts.length} pieces found)
          </span>
          <button
            onClick={() => setSearchQuery('')}
            className="text-[#786B59] hover:text-[#2B2520] underline font-semibold cursor-pointer"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center rounded-3xl bg-[#FFF9F0] text-[#2B2520] border border-[#B89A62]/40 max-w-md mx-auto p-8 shadow-sm">
          <p className="font-playfair text-2xl font-bold">No jewellery pieces found</p>
          <p className="text-xs font-lato text-[#786B59] mt-2">
            Try adjusting your search criteria or resetting filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
              setFilterUserOnly(false);
            }}
            className="mt-5 px-6 py-2.5 bg-[#B89A62] text-[#2B2520] font-montserrat text-xs font-bold uppercase rounded-lg cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
