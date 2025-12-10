import React, { useState, useEffect } from "react";
import { Search, Filter, Eye } from "lucide-react";
import { supabase } from "../lib/supabase";

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

const ProductsPage: React.FC<ProductsPageProps> = ({ onProductClick }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  const categories = [
    { value: "all", label: "All Products" },
    { value: "Clear Series", label: "Clear Series" },
    { value: "Color Series", label: "Color Series" },
  ];

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setSearching(true);
      let query = supabase.from("products").select("*");

      if (selectedCategory !== "all") {
        query = query.eq("category", selectedCategory);
      }

      if (searchTerm) {
        query = query.or(
          `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,code.ilike.%${searchTerm}%`
        );
      }

      const { data, error } = await query;

      if (error) throw error;

      // Custom sorting: by series (B, A, C, D, E, F, G) then by numeric code
      const seriesOrder = ["B", "A", "C", "D", "E", "F", "G"];
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
            return {
              series: simpleMatch[1],
              num: parseInt(simpleMatch[2], 10),
            };
          }
          return { series: "", num: 999999 };
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
      console.error("Error fetching products:", error);
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
      {/* Page Content - with top padding for fixed nav */}
      <div className="pt-20 md:pl-80 md:pr-80 ">
        {/* Header */}
        <div className="bg-black pt-8 pb-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-light text-white mb-3">
              Our Products
            </h1>
            <p className="text-lg text-gray-400 font-light">
              Discover our complete collection of premium glass blocks
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Search */}
            <div className="w-full sm:w-auto sm:flex-1 sm:max-w-md">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-800 text-white text-sm rounded-md focus:outline-none focus:border-gray-700 placeholder:text-gray-600"
                />
              </div>
            </div>

            {/* Category Filter & Count */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial sm:w-48">
                <Filter
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-800 text-white text-sm rounded-md focus:outline-none focus:border-gray-700 appearance-none cursor-pointer"
                >
                  {categories.map((category) => (
                    <option
                      key={category.value}
                      value={category.value}
                      className="bg-black"
                    >
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <p className="text-gray-500 text-sm whitespace-nowrap">
                {products.length}{" "}
                {products.length !== 1 ? "products" : "product"}
              </p>
            </div>
          </div>
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
            <h3 className="text-xl font-semibold text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-300">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => onProductClick(product.id)}
                className="group bg-black border border-gray-900 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:border-gray-700"
              >
                <div className="relative overflow-hidden bg-gray-950">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  {product.code && (
                    <p className="text-[#D7B387] text-xs font-medium mb-2 tracking-wide">
                      {product.code}
                    </p>
                  )}
                  <h3 className="text-base font-medium text-white mb-2 group-hover:text-gray-200 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-900">
                    <span className="text-xs text-gray-600">
                      {product.category}
                    </span>
                    <button className="text-[#D7B387] text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                      View Details
                      <Eye size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
