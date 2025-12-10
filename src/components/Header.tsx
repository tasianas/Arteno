import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ArrowRight,
  UserCircle,
  LogOut,
  Settings,
} from "lucide-react";
import type { AuthUser } from "../lib/auth";

interface HeaderProps {
  isLoggedIn: boolean;
  user: AuthUser | null;
  onLogoClick: () => void;
  onProductsClick: (e?: React.MouseEvent) => void;
  onInspirationsClick: (e?: React.MouseEvent) => void;
  onAboutClick: (e?: React.MouseEvent) => void;
  onAdminClick?: (e?: React.MouseEvent) => void;
  onSettingsClick?: (e?: React.MouseEvent) => void;
  onSearchToggle: () => void;
  onLogout: () => void;
  onSignInClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isLoggedIn,
  user,
  onLogoClick,
  onProductsClick,
  onInspirationsClick,
  onAboutClick,
  onAdminClick,
  onSettingsClick,
  onSearchToggle,
  onLogout,
  onSignInClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  // Not logged in - Simple header
  if (!isLoggedIn) {
    return (
      <nav
        className="fixed top-0 w-full backdrop-blur-sm border-b z-50"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.9)", borderColor: "#333" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Center Logo */}
            <div className="flex-1 flex justify-center">
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

            {/* Sign In Button - Desktop */}
            <div className="absolute right-4 hidden md:block">
              <button
                onClick={onSignInClick}
                className="text-black px-6 py-2 rounded-lg hover:opacity-80 transition-colors font-semibold"
                style={{ backgroundColor: "#D7B387" }}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // Logged in - Full header with navigation
  return (
    <nav
      className="fixed top-0 w-full backdrop-blur-sm border-b z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.9)", borderColor: "#333" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-20">
          {/* Left Navigation */}
          <div className="hidden md:flex items-center space-x-8 flex-1">
            <Link
              to="/products"
              onClick={onProductsClick}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Products
            </Link>
            <Link
              to="/inspirations"
              onClick={onInspirationsClick}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Inspirations
            </Link>
            <Link
              to="/about"
              onClick={onAboutClick}
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </Link>
            {user?.type === "admin" && onAdminClick && (
              <Link
                to="/admin"
                onClick={onAdminClick}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Admin
              </Link>
            )}
          </div>

          {/* Center Logo - Absolutely positioned for true centering */}
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
            {/* Profile Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <UserCircle className="h-6 w-6" />
              </button>

              {/* Dropdown Menu */}
              {showProfileDropdown && (
                <div
                  className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  style={{
                    width: "256px",
                    maxWidth: "256px",
                    minWidth: "256px",
                  }}
                >
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {user?.email}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user?.type} Account
                    </p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        onSettingsClick?.();
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileDropdown(false);
                        onLogout();
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={onSearchToggle}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <span>Search</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-black border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* User Profile Section - Mobile */}
            <div className="px-3 py-3 border-b border-gray-700 mb-2">
              <div className="flex items-center space-x-3">
                <div className="bg-[#D7B387] rounded-full p-2">
                  <UserCircle className="h-6 w-6 text-black" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {user?.email}
                  </p>
                  <p className="text-gray-400 text-xs capitalize">
                    {user?.type} Account
                  </p>
                </div>
              </div>
            </div>

            <Link
              to="/products"
              onClick={onProductsClick}
              className="block px-3 py-2 text-gray-300 hover:text-white"
            >
              Products
            </Link>
            <Link
              to="/inspirations"
              onClick={onInspirationsClick}
              className="block px-3 py-2 text-gray-300 hover:text-white"
            >
              Inspirations
            </Link>
            <Link
              to="/about"
              onClick={onAboutClick}
              className="block px-3 py-2 text-gray-300 hover:text-white"
            >
              About
            </Link>
            {user?.type === "admin" && onAdminClick && (
              <Link
                to="/admin"
                onClick={onAdminClick}
                className="block px-3 py-2 text-gray-300 hover:text-white"
              >
                Admin
              </Link>
            )}
            <button
              onClick={onSearchToggle}
              className="block px-3 py-2 text-gray-300 hover:text-white w-full text-left"
            >
              Search →
            </button>

            {/* Divider */}
            <div className="border-t border-gray-700 my-2"></div>

            {/* Settings and Sign Out */}
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onSettingsClick?.();
              }}
              className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white w-full text-left"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                onLogout();
              }}
              className="flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 w-full text-left"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
