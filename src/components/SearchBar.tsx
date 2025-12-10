import React from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import type { Product } from "../types/Product";

interface SearchBarProps {
  showSearchBar: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  filteredProducts: Product[];
  handleSearchToggle: () => void;
  handleSearchSubmit: () => void;
  handleSearchClear: () => void;
  userType?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  showSearchBar,
  searchQuery,
  setSearchQuery,
  searchInputRef,
  filteredProducts,
  handleSearchToggle,
  handleSearchSubmit,
  userType,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`fixed inset-0 bg-black/80 backdrop-blur-md z-[60] transition-all duration-300 ease-in-out ${
        showSearchBar ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={handleSearchToggle}
    >
      <div className="flex flex-col items-center justify-center h-full px-6 md:pl-80 md:pr-80 md:ml-80 md:mr-80">
        {/* Search Input Area */}
        <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product code..."
                className="w-full px-6 py-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:border-[#D7B387] text-white placeholder-gray-500 text-sm transition-colors"
                autoFocus
              />
            </div>

            <button
              onClick={handleSearchToggle}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Search Results/Suggestions Area */}
          {searchQuery && (
            <div className="bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
              <p className="text-gray-400 text-sm mb-4">
                {filteredProducts.length > 0 ? (
                  <>
                    Found {filteredProducts.length} product
                    {filteredProducts.length !== 1 ? "s" : ""}
                  </>
                ) : (
                  <>No products found</>
                )}
              </p>

              {/* Product Search Results */}
              {filteredProducts.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {filteredProducts.slice(0, 6).map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                        handleSearchToggle();
                      }}
                      className="p-3 border border-gray-800 rounded-md hover:border-gray-700 hover:bg-gray-900/50 transition-all cursor-pointer flex items-center space-x-3"
                    >
                      <div className="w-12 h-12 bg-gray-900 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white text-sm font-medium mb-0.5 truncate">
                          {product.code}
                        </h3>
                        <p className="text-gray-400 text-xs truncate">
                          {product.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-sm mb-3">
                    Try searching by product code:
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-full text-gray-400 text-xs">
                      GRLX
                    </span>
                    <span className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-full text-gray-400 text-xs">
                      GRCL
                    </span>
                    <span className="px-3 py-1.5 bg-gray-900 border border-gray-800 rounded-full text-gray-400 text-xs">
                      GRFR
                    </span>
                  </div>
                  {userType === "admin" && (
                    <button
                      onClick={() => navigate("/admin")}
                      className="mt-4 text-gray-400 hover:text-white transition-colors text-xs"
                    >
                      Go to Admin Panel →
                    </button>
                  )}
                </div>
              )}

              {filteredProducts.length > 6 && (
                <div className="mt-4 pt-4 border-t border-gray-800 text-center">
                  <button
                    onClick={handleSearchSubmit}
                    className="text-gray-400 hover:text-white transition-colors text-xs"
                  >
                    View all {filteredProducts.length} results →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Bottom hint */}
          {!searchQuery && (
            <div className="mt-8 text-center">
              <p className="text-gray-500 text-xs">Press ESC to close</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
