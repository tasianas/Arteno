import React, { useState } from 'react';
import { Search, Menu, X, User, LogOut, Settings } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  user: any;
  onSignOut: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: () => void;
}

const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  user,
  onSignOut,
  searchTerm,
  setSearchTerm,
  handleSearch
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="fixed top-0 w-full backdrop-blur-sm border-b z-40" style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', borderColor: '#333' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:justify-between">
          {/* Mobile Menu Button - Left side on mobile */}
          <div className="md:hidden order-1">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo - Centered on mobile, left on desktop */}
          <button
            onClick={() => setCurrentPage('home')}
            className="hover:opacity-80 transition-opacity order-2 md:order-1 absolute left-1/2 transform -translate-x-1/2 md:relative md:left-0 md:transform-none"
          >
            <img
              src="https://rteznkwgofrhunwtwamk.supabase.co/storage/v1/object/public/media/2880726A-8DC4-4EA4-9E98-4D57812AD32E2%20(1).png"
              alt="ARTENO"
              className="h-16 w-auto"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={`text-lg font-medium transition-colors ${
                currentPage === 'home' ? 'text-[#D7B387]' : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('products')}
              className={`text-lg font-medium transition-colors ${
                currentPage === 'products' ? 'text-[#D7B387]' : 'text-gray-300 hover:text-white'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setCurrentPage('inspirations')}
              className={`text-lg font-medium transition-colors ${
                currentPage === 'inspirations' ? 'text-[#D7B387]' : 'text-gray-300 hover:text-white'
              }`}
            >
              Inspirations
            </button>
            <button
              onClick={() => setCurrentPage('about')}
              className={`text-lg font-medium transition-colors ${
                currentPage === 'about' ? 'text-[#D7B387]' : 'text-gray-300 hover:text-white'
              }`}
            >
              About
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-64 px-4 py-2 pl-10 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387]"
              />
              <Search 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[#D7B387] transition-colors" 
                size={18}
                onClick={handleSearch}
              />
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <User size={20} />
                  <span>{user.email}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2">
                    {user?.type === 'admin' && (
                      <button
                        onClick={() => {
                          setCurrentPage('admin');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center"
                      >
                        <Settings size={16} className="mr-2" />
                        Admin Panel
                      </button>
                    )}
                    <button
                      onClick={() => {
                        onSignOut();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setCurrentPage('login')}
                className="bg-[#D7B387] text-black px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Spacer for mobile to balance the layout */}
          <div className="md:hidden order-3 w-6"></div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-700 py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-2 pl-10 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387]"
                />
                <Search 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-[#D7B387] transition-colors" 
                  size={18}
                  onClick={handleSearch}
                />
              </div>

              {/* Mobile Navigation Links */}
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setIsMenuOpen(false);
                }}
                className={`text-left text-lg font-medium transition-colors ${
                  currentPage === 'home' ? 'text-[#D7B387]' : 'text-gray-300 hover:text-white'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setCurrentPage('products');
                  setIsMenuOpen(false);
                }}
                className={`text-left text-lg font-medium transition-colors ${
                  currentPage === 'products' ? 'text-[#D7B387]' : 'text-gray-300 hover:text-white'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => {
                  setCurrentPage('inspirations');
                  setIsMenuOpen(false);
                }}
                className={`text-left text-lg font-medium transition-colors ${
                  currentPage === 'inspirations' ? 'text-[#D7B387]' : 'text-gray-300 hover:text-white'
                }`}
              >
                Inspirations
              </button>
              <button
                onClick={() => {
                  setCurrentPage('about');
                  setIsMenuOpen(false);
                }}
                className={`text-left text-lg font-medium transition-colors ${
                  currentPage === 'about' ? 'text-[#D7B387]' : 'text-gray-300 hover:text-white'
                }`}
              >
                About
              </button>

              {/* Mobile User Menu */}
              {user ? (
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex items-center space-x-2 text-gray-300 mb-3">
                    <User size={20} />
                    <span>{user.email}</span>
                  </div>
                  {user?.type === 'admin' && (
                    <button
                      onClick={() => {
                        setCurrentPage('admin');
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-300 hover:text-white transition-colors flex items-center mb-2"
                    >
                      <Settings size={16} className="mr-2" />
                      Admin Panel
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setCurrentPage('login');
                    setIsMenuOpen(false);
                  }}
                  className="bg-[#D7B387] text-black px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;