import React, { useState, useRef, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProductsPage from "./components/ProductsPage";
import ProductDetailPage from "./components/ProductDetailPage";
import InspirationsPage from "./components/InspirationsPage";
import AdminPanel from "./components/AdminPanel";
import AboutPage from "./components/AboutPage";
import SettingsPage from "./components/SettingsPage";
import LoginModal from "./components/LoginModal";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import { signOut, getCurrentUser, type AuthUser } from "./lib/auth";
import { supabase } from "./lib/supabase";
import type { Product } from "./types/Product";

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);

  // Fetch products from database
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("code");

        if (error) throw error;
        setProducts(data || []);

        // Filter bestsellers
        const bestsellersData = data?.filter((p) => p.bestseller) || [];
        setBestSellers(bestsellersData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Check for existing authentication on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Filter products based on search query - prioritize matches at the start of the code
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.code
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      const queryLower = searchQuery.toLowerCase();
      const aStartsWith = a.code.toLowerCase().startsWith(queryLower);
      const bStartsWith = b.code.toLowerCase().startsWith(queryLower);

      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      return a.code.localeCompare(b.code);
    });

  const handleLogout = async () => {
    try {
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleProductsClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigate("/products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    navigate(`/product/${productId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInspirationsClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigate("/inspirations");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAboutClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigate("/about");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAdminClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigate("/admin");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSettingsClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigate("/settings");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogoClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchToggle = () => {
    if (showSearchBar) {
      setShowSearchBar(false);
      setSearchQuery("");
    } else {
      setShowSearchBar(true);
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const handleSearchSubmit = () => {
    if (filteredProducts.length > 0) {
      const firstProduct = filteredProducts[0];
      setSelectedProductId(firstProduct.id);
      navigate(`/product/${firstProduct.id}`);
      setShowSearchBar(false);
      setSearchQuery("");
    }
  };

  const handleSearchClear = () => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Not logged in - Show landing page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black">
        {/* Header for not logged in users */}
        <Header
          isLoggedIn={false}
          user={null}
          onLogoClick={handleLogoClick}
          onProductsClick={() => {}}
          onInspirationsClick={() => {}}
          onAboutClick={() => {}}
          onAdminClick={() => {}}
          onSettingsClick={() => {}}
          onSearchToggle={() => {}}
          onLogout={() => {}}
          onSignInClick={() => setShowLoginForm(true)}
        />

        {/* Hero Section */}
        <section className="relative h-screen flex flex-col items-center justify-center bg-black">
          <div className="flex justify-center items-center h-full">
            <img
              src="https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/84ea73b6-d075-4a08-9668-d2da49c53e3e_removalai_preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS84NGVhNzNiNi1kMDc1LTRhMDgtOTY2OC1kMmRhNDljNTNlM2VfcmVtb3ZhbGFpX3ByZXZpZXcucG5nIiwiaWF0IjoxNzU2MjMwMzk4LCJleHAiOjE3ODc3NjYzOTh9.ahKjfmjpk422Pc8DWTSAXxcZ2JUKDz5RACEqvuWze98"
              alt="ARTENO"
              className="max-h-[80vh] w-auto object-contain"
            />
          </div>

          {/* Sign In Button - Mobile only */}
          <div className="md:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => setShowLoginForm(true)}
              className="text-black px-8 py-3 rounded-lg hover:opacity-80 transition-colors font-semibold shadow-lg"
              style={{ backgroundColor: "#D7B387" }}
            >
              Sign In
            </button>
          </div>
        </section>

        {/* Login Modal */}
        {showLoginForm && (
          <LoginModal
            onClose={() => setShowLoginForm(false)}
            onLoginSuccess={(user) => {
              setUser(user);
              setIsLoggedIn(true);
            }}
            loginError={loginError}
            setLoginError={setLoginError}
            loginLoading={loginLoading}
            setLoginLoading={setLoginLoading}
          />
        )}
      </div>
    );
  }

  // Logged in - Use React Router for navigation
  return (
    <div className="min-h-screen bg-black">
      {/* Search Bar */}
      <SearchBar
        showSearchBar={showSearchBar}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchInputRef={searchInputRef}
        filteredProducts={filteredProducts}
        handleSearchToggle={handleSearchToggle}
        handleSearchSubmit={handleSearchSubmit}
        handleSearchClear={handleSearchClear}
        userType={user?.type}
      />

      {/* Header Navigation */}
      <Header
        isLoggedIn={true}
        user={user}
        onLogoClick={handleLogoClick}
        onProductsClick={handleProductsClick}
        onInspirationsClick={handleInspirationsClick}
        onAboutClick={handleAboutClick}
        onAdminClick={handleAdminClick}
        onSettingsClick={handleSettingsClick}
        onSearchToggle={handleSearchToggle}
        onLogout={handleLogout}
        onSignInClick={() => {}}
      />

      {/* Routes */}
      <Routes>
        <Route
          path="/products"
          element={
            <ProductsPage
              onBack={handleBackToHome}
              onLogoClick={handleLogoClick}
              onInspirationsClick={handleInspirationsClick}
              onAboutClick={handleAboutClick}
              onSignOut={handleLogout}
              onProductClick={handleProductClick}
            />
          }
        />
        <Route
          path="/product/:productId"
          element={
            <ProductDetailPage
              productId={selectedProductId || ""}
              onBack={handleProductsClick}
              onLogoClick={handleLogoClick}
              onInspirationsClick={handleInspirationsClick}
              onAboutClick={handleAboutClick}
              onSignOut={handleLogout}
            />
          }
        />
        <Route
          path="/inspirations"
          element={
            <InspirationsPage
              onBack={handleBackToHome}
              onLogoClick={handleLogoClick}
              onProductsClick={handleProductsClick}
              onAboutClick={handleAboutClick}
              onSignOut={handleLogout}
            />
          }
        />
        <Route
          path="/about"
          element={
            <AboutPage
              onBack={handleBackToHome}
              onLogoClick={handleLogoClick}
              onProductsClick={handleProductsClick}
              onInspirationsClick={handleInspirationsClick}
              onSignOut={handleLogout}
            />
          }
        />
        {user?.type === "admin" && (
          <Route
            path="/admin"
            element={
              <AdminPanel
                onBack={handleBackToHome}
                onLogoClick={handleLogoClick}
                onSignOut={handleLogout}
              />
            }
          />
        )}
        <Route
          path="/settings"
          element={<SettingsPage user={user} onBack={handleBackToHome} />}
        />
        <Route path="/" element={<HomePage bestSellers={bestSellers} />} />
      </Routes>
    </div>
  );
};

export default App;
