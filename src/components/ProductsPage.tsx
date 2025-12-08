import React, { useState, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Star, Eye, Menu, X, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  image: string;
  description: string;
  long_description: string | null;
  images: string | null;
}

interface ProductsPageProps {
  onBack: () => void;
  onLogoClick: () => void;
  onInspirationsClick: () => void;
  onAboutClick: () => void;
  onSignOut: () => void;
  onProductClick: (productId: string) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({
  onBack,
  onLogoClick,
  onInspirationsClick,
  onAboutClick,
  onSignOut,
  onProductClick,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searching, setSearching] = useState(false);

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'Clear Series', label: 'Clear Series' },
    { value: 'Color Series', label: 'Color Series' }
  ];

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setSearching(true);
      let query = supabase
        .from('products')
        .select('*');

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,code.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Custom sorting: by series (B, A, C, D, E, F, G) then by numeric code
      const seriesOrder = ['B', 'A', 'C', 'D', 'E', 'F', 'G'];
      const sortedData = (data || []).sort((a, b) => {
        // Extract series letter and number from code (e.g., GRLX-A101 -> series: A, num: 101)
        const getSeriesAndNum = (code: string) => {
          const match = code.match(/([A-Z])-([A-Z])(\d+)$/);
          if (match) {
            return { series: match[2], num: parseInt(match[3], 10) };
          }
          // Fallback for codes without GRLX- prefix
          const simpleMatch = code.match(/^([A-Z])(\d+)$/);
          if (simpleMatch) {
            return { series: simpleMatch[1], num: parseInt(simpleMatch[2], 10) };
          }
          return { series: '', num: 999999 };
        };

        const aData = getSeriesAndNum(a.code);
        const bData = getSeriesAndNum(b.code);

        // Compare by series order first
        const aSeriesIndex = seriesOrder.indexOf(aData.series);
        const bSeriesIndex = seriesOrder.indexOf(bData.series);

        const aIndex = aSeriesIndex === -1 ? 999 : aSeriesIndex;
        const bIndex = bSeriesIndex === -1 ? 999 : bSeriesIndex;

        if (aIndex !== bIndex) {
          return aIndex - bIndex;
        }

        // If same series, sort by number
        return aData.num - bData.num;
      });

      setProducts(sortedData);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
      setSearching(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D7B387] mx-auto mb-4"></div>
          <p className="text-gray-300">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full backdrop-blur-sm border-b z-40" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', borderColor: '#333' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-20">
            {/* Left Navigation */}
            <div className="hidden md:flex items-center space-x-8 flex-1">
              <a href="#products" onClick={onBack} className="text-gray-300 hover:text-white transition-colors">Products</a>
              <a href="#applications" onClick={onInspirationsClick} className="text-gray-300 hover:text-white transition-colors">Inspirations</a>
              <a href="#about" onClick={onAboutClick} className="text-gray-300 hover:text-white transition-colors">About</a>
            </div>

            {/* Center Logo - Clickable - Absolutely positioned for true centering */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <button
                onClick={onLogoClick}
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="https://rteznkwgofrhunwtwamk.supabase.co/storage/v1/object/public/media/2880726A-8DC4-4EA4-9E98-4D57812AD32E2%20(1).png"
                  alt="ARTENO"
                  className="h-16 w-auto"
                />
              </button>
            </div>

            {/* Right Navigation */}
            <div className="hidden md:flex items-center space-x-6 flex-1 justify-end">
              <button
                onClick={onSignOut}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-black border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#products" onClick={onBack} className="block px-3 py-2 text-gray-300 hover:text-white">Products</a>
              <a href="#applications" onClick={onInspirationsClick} className="block px-3 py-2 text-gray-300 hover:text-white">Inspirations</a>
              <a href="#about" onClick={onAboutClick} className="block px-3 py-2 text-gray-300 hover:text-white">About</a>
              <button
                onClick={onSignOut}
                className="block px-3 py-2 text-gray-300 hover:text-white w-full text-left"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content - with top padding for fixed nav */}
      <div className="pt-20">
        {/* Header */}
        <div className="bg-black border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-white mb-4">Our Products</h1>
            <p className="text-xl text-gray-300">
              Discover our complete collection of premium glass blocks
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-gray-900 rounded-lg shadow-sm p-6 mb-8 border border-gray-800">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387]"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="lg:w-64">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387] appearance-none"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-300">
              Showing {products.length} product{products.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Products Grid */}
          {searching && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D7B387] mx-auto mb-4"></div>
              <p className="text-gray-300">Searching...</p>
            </div>
          )}
          {!searching && products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
              <p className="text-gray-300">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => onProductClick(product.id)}
                  className="bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-800 cursor-pointer hover:border-[#D7B387]"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                  </div>

                  <div className="p-6">
                    {product.code && (
                      <p className="text-[#D7B387] text-xs font-semibold mb-2">{product.code}</p>
                    )}
                    <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-400">
                        {product.category}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        className="flex-1 py-2 px-4 rounded-lg font-semibold transition-colors bg-[#D7B387] hover:bg-[#c49f6c] text-black"
                      >
                        <Eye size={16} className="inline mr-2" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;