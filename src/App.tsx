import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  ArrowLeft,
  ArrowRight,
  Building2,
  Lightbulb,
  Shield,
  Users,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Eye,
  EyeOff,
  Clock,
  CircleUser as UserCircle,
  LogOut,
  Settings,
} from "lucide-react";
import ProductsPage from "./components/ProductsPage";
import ProductDetailPage from "./components/ProductDetailPage";
import InspirationsPage from "./components/InspirationsPage";
import AdminPanel from "./components/AdminPanel";
import AboutPage from "./components/AboutPage";
import { signIn, signOut, getCurrentUser, type AuthUser } from "./lib/auth";
import { supabase } from "./lib/supabase";

interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  image: string;
  description?: string;
}

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const bestSellersScrollerRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState<
    "home" | "products" | "product-detail" | "inspirations" | "about" | "admin"
  >("home");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [contactFormSubmitting, setContactFormSubmitting] = useState(false);
  const [contactFormSuccess, setContactFormSuccess] = useState(false);

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
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setProductsLoading(false);
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
      setLoginData({ email: "", password: "" });
      setCurrentPage("home");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleProductsClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentPage("products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage("product-detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBestSellersClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentPage("home");
    // wait for Home to render, then scroll to the section
    setTimeout(() => {
      document.getElementById("best-sellers")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleContactClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentPage("home");
    setTimeout(() => {
      document.getElementById("contact-section")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleColorSeriesClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentPage("products"); // go to products page
    setTimeout(() => {
      const element = document.getElementById("color-series");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleWhyChooseUsClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const section = document.getElementById("why-choose-us");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInspirationsClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentPage("inspirations");
    // Scroll to top of the page smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAboutClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentPage("about");
    // Scroll to top of the page smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAdminClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentPage("admin");
    // Scroll to top of the page smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setCurrentPage("home");
    // Scroll to top of the page smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogoClick = () => {
    setCurrentPage("home");
    // Scroll to top of the page smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchToggle = () => {
    setShowSearchBar(!showSearchBar);
    if (!showSearchBar) {
      // Focus the input after the animation starts
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery("");
    }
  };

  const handleSearchClear = () => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  };

  const handleSearchSubmit = () => {
    setShowSearchBar(false);
    setCurrentPage("products");
  };

  const bestSellers = [
    {
      name: "GLXR-B201",
      description: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR01.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjAxLnBuZyIsImlhdCI6MTc2MDM0ODY0OSwiZXhwIjoxNzkxODg0NjQ5fQ.XVRnWwGS0Y3oqWmGAZ_xaXxRUHQBJzdjn1pbgt27k54",
      features: ["Maximum transparency"],
      bestseller: true,
    },
    {
      name: "GLXR-B204",
      description: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR04%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA0ICgyKS5wbmciLCJpYXQiOjE3NjAzNDg2ODIsImV4cCI6MTc5MTg4NDY4Mn0.Ed8gEy77WSqwdRoOPJWpCtOTuwsGFy-gHSZh5cjazTI",
      features: ["Privacy protection"],
      bestseller: true,
    },
    {
      name: "GLXR-B212",
      description: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR12.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjEyLnBuZyIsImlhdCI6MTc2MDM0ODcwMywiZXhwIjoxNzkxODg0NzAzfQ.fnOaR2cmPVVq1ev1rC70OkRt1wwXwdkr9DEl-KMKNBo",
      features: ["Multiple colors"],
      bestseller: true,
    },
    {
      name: "GLXR-B219",
      description: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR19%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE5ICgzKS5wbmciLCJpYXQiOjE3NjAzNDg3MjIsImV4cCI6MTc5MTg4NDcyMn0.gmKH0zo7IWIwNIsi4ttJzdHMcIg7zaDxxvCi0oty_Dc",
      features: ["Multiple colors"],
      bestseller: true,
    },
    {
      name: "GLXR-D404",
      description: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS004.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA0LnBuZyIsImlhdCI6MTc2MDM0ODgxMiwiZXhwIjoxNzkxODg0ODEyfQ.8LMzTbERIIsmTcFwwS4bnYKasuJyHjXJO72dajAAP40",
      features: ["Multiple colors"],
      bestseller: true,
    },
    {
      name: "GLXR-D407",
      description: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS007.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA3LnBuZyIsImlhdCI6MTc2MDM0ODgzMywiZXhwIjoxNzkxODg0ODMzfQ.cTruWSNzANfW_rm5MpcgwMzl8zAyLeqeUylWrcyOizo",
      features: ["Multiple colors"],
      bestseller: true,
    },
    {
      name: "GLXR-E504",
      description: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ004.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNC5wbmciLCJpYXQiOjE3NjAzNDg5MzgsImV4cCI6MTc5MTg4NDkzOH0.oHWU4E6sUeY36CRzgexXC5FqpFv1KHannwdkeWfEzjs",
      features: ["Multiple colors"],
      bestseller: true,
    },
  ];

  const applications = [
    {
      title: "Interior Walls",
      description:
        "Create stunning partition walls that maintain openness while providing definition",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/1%20(122)%20(1).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS8xICgxMjIpICgxKS5qcGciLCJpYXQiOjE3NjAzNDc1MjIsImV4cCI6MTc5MTg4MzUyMn0.Hb7su1MqF22zu857yYuH_alZlAohf7prOW5Wo0JU3gk",
    },
    {
      title: "Bathroom Design",
      description:
        "Perfect for shower enclosures and bathroom walls with privacy and style",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/1%20(118).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS8xICgxMTgpLmpwZyIsImlhdCI6MTc2MDM0NzQ5MSwiZXhwIjoxNzkxODgzNDkxfQ.2rcwzg0i6iVR7Si53DVS30pTB3O4_jcDZ4tDyf-KR5U",
    },
    {
      title: "Commercial Facades",
      description:
        "Impressive exterior applications for retail and office buildings",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/10100.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS8xMDEwMC5qcGciLCJpYXQiOjE3NjAzNDczODAsImV4cCI6MTc5MTg4MzM4MH0.lizwVKzR8ZMbx4RnFQti5rpUzorIhlEXeumfW2X15q0",
    },
    {
      title: "Architectural Features",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/nampei.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS9uYW1wZWkuanBnIiwiaWF0IjoxNzYwMzQ3MzMxLCJleHAiOjE3OTE4ODMzMzF9.Ko-sPW5uB8JsQcLh4sZ4Tt21IqQdl0Skk3PnAIfh5mg",
      description: "Creative architectural features and decorative elements",
    },
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const updateScrollProgress = () => {
    const el = bestSellersScrollerRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const scrollWidth = el.scrollWidth - el.clientWidth;
    const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
    setScrollProgress(progress);
  };

  const scrollBestSellers = (dir: number) => {
    const el = bestSellersScrollerRef.current;
    if (!el) return;

    const firstCard = el.querySelector<HTMLElement>("[data-best-sellers-card]");
    const step = firstCard
      ? firstCard.offsetWidth + 24
      : Math.round(window.innerWidth * 0.8);

    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const handleScrollbarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = bestSellersScrollerRef.current;
    if (!el) return;

    const scrollbar = e.currentTarget;
    const rect = scrollbar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;

    const scrollWidth = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: scrollWidth * percentage, behavior: "smooth" });
  };

  useEffect(() => {
    const el = bestSellersScrollerRef.current;
    if (!el) return;

    el.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress();

    return () => el.removeEventListener("scroll", updateScrollProgress);
  }, []);

  // Login Modal Component
  const LoginModal: React.FC = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoginError("");
      setLoginLoading(true);

      const email = emailRef.current?.value.trim() || "";
      const password = passwordRef.current?.value || "";

      if (!email || !password) {
        setLoginError("Please enter both email and password.");
        setLoginLoading(false);
        return;
      }

      try {
        const result = await signIn(email, password);

        if (result.success && result.user) {
          setUser(result.user);
          setIsLoggedIn(true);
          setShowLoginForm(false);
          setLoginData({ email: "", password: "" });
        } else {
          setLoginError(result.error || "Login failed");
        }
      } catch (error) {
        setLoginError("An unexpected error occurred");
      } finally {
        setLoginLoading(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4">
        <div className="bg-[#0f172a] rounded-2xl shadow-2xl w-full max-w-md p-8 relative">
          {/* Close */}
          <button
            onClick={() => setShowLoginForm(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold text-white mb-6">Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginError && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm">{loginError}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="login-email"
                className="block text-sm text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                ref={emailRef}
                id="login-email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-600 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387]"
                disabled={loginLoading}
                required
              />
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block text-sm text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                ref={passwordRef}
                id="login-password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-600 bg-transparent text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D7B387] focus:border-[#D7B387]"
                disabled={loginLoading}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#D7B387] text-black font-semibold rounded-lg hover:bg-[#c49f6c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loginLoading}
            >
              {loginLoading ? "Signing In..." : "Sign In"}
            </button>

            <div className="text-center mt-6">
              <p className="text-gray-300 text-sm">
                Call Us at:{" "}
                <span className="text-white font-semibold">210 440 85 85</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Search Bar Component - Full Screen Black Overlay
  const SearchBar = () => (
    <div
      className={`fixed inset-0 bg-black z-[60] transition-all duration-300 ease-in-out ${
        showSearchBar ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Search Input Area */}
        <div className="flex items-center justify-center flex-1 px-6">
          <div className="w-full max-w-4xl">
            <div className="flex items-center border-b border-gray-600 pb-4">
              <div className="flex-1 relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by product code (e.g., GRLX, A, B201)..."
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  autoFocus
                />
              </div>

              <div className="flex items-center space-x-6 ml-8">
                {searchQuery && (
                  <button
                    onClick={handleSearchSubmit}
                    className="text-gray-400 hover:text-white transition-colors text-lg font-medium"
                  >
                    SEARCH
                  </button>
                )}
                {searchQuery && (
                  <button
                    onClick={handleSearchClear}
                    className="text-gray-400 hover:text-white transition-colors text-lg font-medium"
                  >
                    CLEAR
                  </button>
                )}
                <button
                  onClick={handleSearchToggle}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-8 w-8" />
                </button>
              </div>
            </div>

            {/* Search Results/Suggestions Area */}
            {searchQuery && (
              <div className="mt-8">
                <p className="text-gray-400 text-lg mb-6">
                  {filteredProducts.length > 0 ? (
                    <>
                      Found {filteredProducts.length} product
                      {filteredProducts.length !== 1 ? "s" : ""} for "
                      {searchQuery}"
                    </>
                  ) : (
                    <>
                      {user?.type === "admin" && (
                        <button
                          onClick={() => setCurrentPage("admin")}
                          className="text-gray-300 hover:text-white transition-colors"
                        >
                          Admin
                        </button>
                      )}
                    </>
                  )}
                </p>

                {/* Product Search Results */}
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {filteredProducts.slice(0, 6).map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          setCurrentPage("products");
                          setShowSearchBar(false);
                        }}
                        className="p-4 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors cursor-pointer flex items-center space-x-4"
                      >
                        <div className="w-16 h-16 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white text-lg font-semibold mb-1">
                            {product.code}
                          </h3>
                          <p className="text-gray-400 text-sm mb-1">
                            {product.name}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {product.category}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400 text-lg mb-4">
                      No products found
                    </p>
                    <p className="text-gray-500 text-sm">
                      Try searching by product code:
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-xs">
                        GRLX
                      </span>
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-xs">
                        GRCL
                      </span>
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-xs">
                        GRFR
                      </span>
                    </div>
                  </div>
                )}

                {filteredProducts.length > 6 && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={handleSearchSubmit}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      View all {filteredProducts.length} results →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom hint */}
        <div className="p-6 text-center">
          <p className="text-gray-500 text-sm">
            {searchQuery ? "Click on any product to view details • " : ""}Press
            ESC to close or click the X button above
          </p>
        </div>
      </div>
    </div>
  );

  // Handle ESC key to close search
  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showSearchBar) {
        setShowSearchBar(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [showSearchBar]);

  // Show loading screen while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D7B387] mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // Show Products Page
  if (isLoggedIn && currentPage === "products") {
    return (
      <ProductsPage
        onBack={handleBackToHome}
        onLogoClick={handleLogoClick}
        onInspirationsClick={handleInspirationsClick}
        onAboutClick={handleAboutClick}
        onSignOut={handleLogout}
        onProductClick={handleProductClick}
      />
    );
  }

  // Show Product Detail Page
  if (isLoggedIn && currentPage === "product-detail" && selectedProductId) {
    return (
      <ProductDetailPage
        productId={selectedProductId}
        onBack={handleProductsClick}
        onLogoClick={handleLogoClick}
        onInspirationsClick={handleInspirationsClick}
        onAboutClick={handleAboutClick}
        onSignOut={handleLogout}
      />
    );
  }

  // Show Inspirations Page
  if (isLoggedIn && currentPage === "inspirations") {
    return (
      <InspirationsPage
        onBack={handleBackToHome}
        onLogoClick={handleLogoClick}
        onProductsClick={handleProductsClick}
        onAboutClick={handleAboutClick}
        onSignOut={handleLogout}
      />
    );
  }

  // Show About Page
  if (isLoggedIn && currentPage === "about") {
    return (
      <AboutPage
        onBack={handleBackToHome}
        onLogoClick={handleLogoClick}
        onProductsClick={handleProductsClick}
        onInspirationsClick={handleInspirationsClick}
        onSignOut={handleLogout}
      />
    );
  }

  // Show Admin Panel
  if (isLoggedIn && currentPage === "admin") {
    return (
      <AdminPanel
        onBack={handleBackToHome}
        onLogoClick={handleLogoClick}
        onSignOut={handleLogout}
      />
    );
  }

  // If not logged in, show minimal landing page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black">
        {/* Simple Navigation - Only Logo and Sign In */}
        <nav
          className="fixed top-0 w-full backdrop-blur-sm border-b z-50"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.9)", borderColor: "#333" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Center Logo */}
              <div className="flex-1 flex justify-center">
                <button
                  onClick={handleLogoClick}
                  className="hover:opacity-80 transition-opacity"
                >
                  <img
                    src="https://rteznkwgofrhunwtwamk.supabase.co/storage/v1/object/public/media/2880726A-8DC4-4EA4-9E98-4D57812AD32E2%20(1).png"
                    alt="ARTENO"
                    className="h-16 w-auto"
                  />
                </button>
              </div>

              {/* Sign In Button - Updated Color */}
              <div className="absolute right-4 hidden md:block">
                <button
                  onClick={() => setShowLoginForm(true)}
                  className="text-black px-6 py-2 rounded-lg hover:opacity-80 transition-colors font-semibold"
                  style={{ backgroundColor: "#D7B387" }}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section - Updated with new PNG image */}
        <section className="relative h-screen flex flex-col items-center justify-center bg-black">
          <div className="flex justify-center items-center h-full">
            <img
              src="https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/84ea73b6-d075-4a08-9668-d2da49c53e3e_removalai_preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS84NGVhNzNiNi1kMDc1LTRhMDgtOTY2OC1kMmRhNDljNTNlM2VfcmVtb3ZhbGFpX3ByZXZpZXcucG5nIiwiaWF0IjoxNzU2MjMwMzk4LCJleHAiOjE3ODc3NjYzOTh9.ahKjfmjpk422Pc8DWTSAXxcZ2JUKDz5RACEqvuWze98"
              alt="ARTENO"
              className="max-h-[80vh] w-auto object-contain"
            />
          </div>

          {/* Sign In Button - Mobile only, positioned at bottom center */}
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
        {showLoginForm && <LoginModal />}
      </div>
    );
  }

  // Full website content after login
  return (
    <div className="min-h-screen bg-black">
      {/* Search Bar - Full Screen Black Overlay */}
      <SearchBar />

      {/* Full Navigation */}
      <nav
        className="fixed top-0 w-full backdrop-blur-sm border-b z-40"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.9)", borderColor: "#333" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center h-20">
            {/* Left Navigation */}
            <div className="hidden md:flex items-center space-x-8 flex-1">
              <a
                href="#products"
                onClick={handleProductsClick}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Products
              </a>
              <a
                href="#applications"
                onClick={handleInspirationsClick}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Inspirations
              </a>
              <a
                href="#about"
                onClick={handleAboutClick}
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </a>
              {user?.type === "admin" && (
                <a
                  href="#admin"
                  onClick={handleAdminClick}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Admin
                </a>
              )}
            </div>

            {/* Center Logo - Clickable - Absolutely positioned for true centering */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <button
                onClick={handleLogoClick}
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
                        onClick={() => setShowProfileDropdown(false)}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </button>
                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          handleLogout();
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
                onClick={handleSearchToggle}
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

              <a
                href="#products"
                onClick={handleProductsClick}
                className="block px-3 py-2 text-gray-300 hover:text-white"
              >
                Products
              </a>
              <a
                href="#applications"
                onClick={handleInspirationsClick}
                className="block px-3 py-2 text-gray-300 hover:text-white"
              >
                Inspirations
              </a>
              <a
                href="#about"
                onClick={handleAboutClick}
                className="block px-3 py-2 text-gray-300 hover:text-white"
              >
                About
              </a>
              {user?.type === "admin" && (
                <a
                  href="#admin"
                  onClick={handleAdminClick}
                  className="block px-3 py-2 text-gray-300 hover:text-white"
                >
                  Admin
                </a>
              )}
              <button
                onClick={handleSearchToggle}
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
                }}
                className="flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white w-full text-left"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </button>
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
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

      {/* Hero Section - Updated with new PNG image */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center bg-black"
      >
        <div className="flex justify-center items-center h-full">
          <img
            src="https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/84ea73b6-d075-4a08-9668-d2da49c53e3e_removalai_preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS84NGVhNzNiNi1kMDc1LTRhMDgtOTY2OC1kMmRhNDljNTNlM2VfcmVtb3ZhbGFpX3ByZXZpZXcucG5nIiwiaWF0IjoxNzU2MjMwMzk4LCJleHAiOjE3ODc3NjYzOTh9.ahKjfmjpk422Pc8DWTSAXxcZ2JUKDz5RACEqvuWze98"
            alt="ARTENO"
            className="max-h-[80vh] w-auto object-contain"
          />
        </div>
      </section>

      {/* Brand Statement Section - Updated Beige Background */}
      <section
        className="py-12 md:py-20"
        style={{ backgroundColor: "#D7B387" }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="space-y-6 text-gray-800">
              <p className="text-xl lg:text-2xl leading-relaxed font-light">
                ARTENO is more than a material source. It’s a meeting point for
                design visionaries.
              </p>
              <p className="text-xl lg:text-2xl leading-relaxed font-light">
                We work alongside architects and creators to explore how
                structure, light, and form can shape meaningful spaces.
              </p>
              <p className="text-xl lg:text-2xl leading-relaxed font-light">
                Discover our best-selling glass blocks. Selected by architects
                and designers for their performance, versatility, and timeless
                appeal.
              </p>
              <p className="text-xl lg:text-2xl leading-relaxed font-light">
                Projects that inspire new ways of seeing and building. Where
                materials become ideas, and ideas become architecture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
    BEST SELLERS (Carousel)
    ========================= */}
      <section id="best-sellers" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Our Best Sellers
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto mt-4">
              Discover our most popular glass blocks, each engineered for
              specific applications and beloved by architects worldwide.
            </p>
          </div>

          <div className="relative">
            {/* Carousel scroller */}
            <div
              ref={bestSellersScrollerRef}
              className="
          flex gap-6 overflow-x-auto snap-x snap-mandatory px-1 md:px-2
          scroll-smooth
          [&::-webkit-scrollbar]:hidden
        "
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {bestSellers.map((item, index) => (
                <article
                  key={index}
                  data-best-sellers-card
                  className="
              snap-start shrink-0
              min-w-[260px] md:min-w-[360px]
              rounded-2xl overflow-hidden
              bg-gradient-to-b from-gray-900 to-black
              ring-1 ring-white/10
              hover:ring-white/20 transition
            "
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-64 w-full object-cover"
                      loading="lazy"
                    />
                    {/* Label */}
                    <span className="absolute right-4 top-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                      Best Seller
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-white font-semibold">{item.name}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                    {item.features && (
                      <ul className="mt-3 text-sm text-gray-300 list-disc list-inside">
                        {item.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Right arrow (desktop only) */}
            <button
              type="button"
              onClick={() => scrollBestSellers(1)}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-black/70 backdrop-blur ring-1 ring-white/10 hover:bg-black/85 transition"
              aria-label="Scroll right"
            >
              <ArrowRight className="h-5 w-5 text-white" />
            </button>
            {/* Left arrow (desktop only) */}
            <button
              type="button"
              onClick={() => scrollBestSellers(-1)}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 items-center justify-center rounded-full bg-black/70 backdrop-blur ring-1 ring-white/10 hover:bg-black/85 transition"
              aria-label="Scroll left"
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Custom Scrollbar */}
          <div className="mt-8 max-w-4xl mx-auto px-4">
            <div
              onClick={handleScrollbarClick}
              className="relative h-2 bg-gray-800 rounded-full cursor-pointer overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
                style={{
                  width: `${scrollProgress}%`,
                  backgroundColor: "#D7B387",
                }}
              />
            </div>
          </div>
        </div>

        {/* tiny hint under the carousel */}
        <div className="text-center mt-8 mb-6 text-xs text-gray-400 select-none">
          Swipe to see more
        </div>

        {/* Beige separator with gradient edges */}
        <div className="flex justify-center py-6 bg-black">
          <div className="w-[220px] md:w-[800px] h-[2px] relative">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, transparent, #D7B387 10%, #D7B387 90%, transparent)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Applications Section - Now titled "Inspirations" */}
      <section id="applications" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Inspirations
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ideas start with materials. Discover how our glass blocks can
              define, divide, and elevate space, one detail at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {applications.map((app, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{app.title}</h3>
                  <p className="text-gray-200">{app.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extended Beige Separator Line Before Features Section - Updated Color */}
      <div className="flex justify-center py-16 bg-black">
        <div className="w-[250px] md:w-[800px] h-0.5 relative">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, transparent, #D7B387 10%, #D7B387 90%, transparent)",
            }}
          />
        </div>
      </div>

      {/* Features Section - Now with Black Background */}
      <section id="why-choose-us" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 px-2">
              Why Choose Us
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white max-w-3xl mx-auto px-4 leading-relaxed">
              At ARTENO, we bring a fresh vision to architectural materials,
              curating rare, design-driven elements that empower architects and
              designers to create distinctive, expressive spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center text-white">
              <div className="mx-2 md:mx-0 bg-gradient-to-br from-gray-900 to-gray-1100 border-0 md:border md:border-gray-700 rounded-2xl md:rounded-2xl p-4 md:p-8 flex flex-col justify-center shadow-xl md:shadow-none">
                <Lightbulb className="h-8 md:h-12 w-8 md:w-12 mx-auto mb-3 md:mb-4 text-yellow-300" />
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4">
                  Sampling
                </h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Experience the material before the build. We provide tailored
                  samples and mock-ups to help you explore texture, light, and
                  finish in context.
                </p>
              </div>
            </div>

            <div className="text-center text-white">
              <div className="mx-2 md:mx-0 bg-gradient-to-br from-gray-900 to-gray-1100 border-0 md:border md:border-gray-700 rounded-2xl md:rounded-2xl p-4 md:p-8 flex flex-col justify-center shadow-xl md:shadow-none">
                <Shield className="h-8 md:h-12 w-8 md:w-12 mx-auto mb-3 md:mb-4 text-green-300" />
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4">
                  Range
                </h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  A curated selection of unique design materials from glass
                  blocks to new surfaces chosen for their quality, character,
                  and architectural integrity.
                </p>
              </div>
            </div>

            <div className="text-center text-white">
              <div className="mx-2 md:mx-0 bg-gradient-to-br from-gray-900 to-gray-1100 border-0 md:border md:border-gray-700 rounded-2xl md:rounded-2xl p-4 md:p-8 flex flex-col justify-center shadow-xl md:shadow-none">
                <Users className="h-8 md:h-12 w-8 md:w-12 mx-auto mb-3 md:mb-4 text-purple-300" />
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4">
                  Support
                </h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  From concept to completion, our team works alongside
                  architects and designers, offering technical insight and
                  design guidance at every stage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extended Beige Separator Line Before About Section - Updated Color */}
      <div className="flex justify-center py-16 bg-black">
        <div className="w-[250px] md:w-[800px] h-0.5 relative">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, transparent, #D7B387 10%, #D7B387 90%, transparent)",
            }}
          />
        </div>
      </div>

      {/* About Section - Now with Black Background */}
      <section id="about" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                A new chapter built on years of experience.
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                ARTENO combines the insight of years of expertise with a
                forward-looking approach to design materials.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    100+
                  </div>
                  <div className="text-gray-300">Projects Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    35+
                  </div>
                  <div className="text-gray-300">Years Experience</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/10%20(3).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS8xMCAoMykuanBnIiwiaWF0IjoxNzYwMzQ3NDIxLCJleHAiOjE3OTE4ODM0MjF9.b9T-J4dd8e3kq_MQQ-z-vuI6xcCzrt7RgNqS6q6hKWU"
                  alt="Glass block manufacturing"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
                <div className="text-2xl font-bold mb-1">ISO 9001</div>
                <div className="text-sm text-white">Certified Quality</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extended Beige Separator Line After About Section - Updated Color */}
      <div className="flex justify-center py-16 bg-black">
        <div className="w-[250px] md:w-[800px] h-0.5 relative">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, transparent, #D7B387 10%, #D7B387 90%, transparent)",
            }}
          />
        </div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to discuss your next project?
            </p>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From material selection to design consultation, our team is here
              to provide insight, samples, and support tailored to your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-blue-400 mt-1" />
                  <div>
                    <div className="font-semibold text-white">
                      Visit Our Showroom
                    </div>
                    <div className="text-gray-300">
                      181 Grigoriou Lambraki St., Thessaloniki 543 42
                      <br />
                      Fotiadis – Bathroom & Tiles
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-blue-400 mt-1" />
                  <div>
                    <div className="font-semibold text-white">Call Us</div>
                    <div className="text-gray-300">210 440 85 85</div>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-blue-400 mt-1" />
                  <div>
                    <div className="font-semibold text-white">Email Us</div>
                    <div className="text-gray-300">
                      info@artenomaterials.com
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-gray-900 to-gray-950 text-white rounded-lg shadow-xl border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors rounded-2xl">
                <h4 className="font-semibold text-white mb-2">
                  Business Hours
                </h4>
                <div className="space-y-1 text-gray-300">
                  <div>Monday - Friday: 8:00 AM - 6:00 PM</div>
                  <div>Saturday: 9:00 AM - 2:00 PM</div>
                  <div>Sunday: Closed</div>
                </div>
              </div>
            </div>

            <div>
              {contactFormSuccess ? (
                <div className="bg-green-900/20 border border-green-500 text-green-400 px-6 py-4 rounded-lg">
                  <p className="font-semibold">Thank you for your message!</p>
                  <p className="text-sm mt-1">We'll get back to you soon.</p>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();

                    setContactFormSubmitting(true);
                    try {
                      const { error } = await supabase
                        .from("contact_messages")
                        .insert([
                          {
                            first_name: contactForm.firstName,
                            last_name: contactForm.lastName,
                            email: contactForm.email,
                            project_type: contactForm.projectType,
                            message: contactForm.message,
                          },
                        ]);

                      if (error) throw error;

                      setContactFormSuccess(true);
                      setContactForm({
                        firstName: "",
                        lastName: "",
                        email: "",
                        projectType: "",
                        message: "",
                      });
                      setTimeout(() => setContactFormSuccess(false), 5000);
                    } catch (error) {
                      console.error("Error submitting form:", error);
                      alert("Failed to send message. Please try again.");
                    } finally {
                      setContactFormSubmitting(false);
                    }
                  }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block font-medium text-gray-300 mb-2"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={contactForm.firstName}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            firstName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-gradient-to-br from-gray-900 to-gray-950 text-white rounded-lg shadow-xl border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="...."
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block font-medium text-gray-300 mb-2"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={contactForm.lastName}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            lastName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 bg-gradient-to-br from-gray-900 to-gray-950 text-white rounded-lg shadow-xl border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="...."
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block font-medium text-gray-300 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gradient-to-br from-gray-900 to-gray-950 text-white rounded-lg shadow-xl border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="....@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="project"
                      className="block font-medium text-gray-300 mb-2"
                    >
                      Project Type
                    </label>
                    <select
                      id="project"
                      value={contactForm.projectType}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          projectType: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-gradient-to-br from-gray-900 to-gray-950 text-white rounded-lg shadow-xl border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors dropdown-custom"
                      required
                    >
                      <option value="" className="bg-white text-black">
                        Select a project type
                      </option>
                      <option
                        value="residential"
                        className="bg-white text-black"
                      >
                        Residential
                      </option>
                      <option
                        value="commercial"
                        className="bg-white text-black"
                      >
                        Commercial
                      </option>
                      <option
                        value="industrial"
                        className="bg-white text-black"
                      >
                        Industrial
                      </option>
                      <option value="other" className="bg-white text-black">
                        Other
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block font-medium text-gray-300 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-4 py-3 bg-gradient-to-br from-gray-900 to-gray-950 text-white rounded-lg shadow-xl border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Tell us about your project..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactFormSubmitting}
                    className="w-full text-black py-3 px-6 rounded-lg font-semibold transition-colors hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: "#D7B387" }}
                  >
                    {contactFormSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: "#D7B387" }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Black Line */}
          <div className="w-full h-0.5 bg-black mb-8"></div>

          {/* 3 Equal Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8 items-start text-center">
            {/* Left Column (Products) */}
            <div className="flex flex-col items-center">
              <h4 className="font-semibold mb-4 text-black">Products</h4>
              <ul className="space-y-2 text-gray-800 text-sm text-center">
                <li>
                  <a
                    href="#products"
                    onClick={handleProductsClick}
                    className="hover:text-black transition-colors"
                  >
                    Clear Series
                  </a>
                </li>
                <li>
                  <a
                    href="#products"
                    onClick={handleProductsClick}
                    className="hover:text-black transition-colors"
                  >
                    Color Series
                  </a>
                </li>
                <li>
                  <a
                    href="#products"
                    onClick={handleProductsClick}
                    className="hover:text-black transition-colors"
                  >
                    All Products
                  </a>
                </li>
                <li>
                  <a
                    href="#best-sellers"
                    onClick={handleBestSellersClick}
                    className="hover:text-black transition-colors"
                  >
                    Best Sellers
                  </a>
                </li>
              </ul>
            </div>

            {/* Middle Column (Logo + Text) */}
            <div className="flex flex-col items-center text-center">
              <img
                src="https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/0a0b85e4-eeb5-4f3e-965b-6c18c556b5f2_removalai_preview.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzBhMGI4NWU0LWVlYjUtNGYzZS05NjViLTZjMThjNTU2YjVmMl9yZW1vdmFsYWlfcHJldmlldy5wbmciLCJpYXQiOjE3NTgwMzY1OTEsImV4cCI6MTc4OTU3MjU5MX0.oRuzdlmkltSZDgmhSKNlI3u9IbUQrHknOyjQFpUfeTE"
                alt="ARTENO"
                className="h-16 w-auto mb-4"
              />
              <div className="space-y-2 text-gray-800 text-sm leading-relaxed">
                <p>Premium glass blocks for visionary architecture.</p>
                <p>Designed with precision, built to inspire.</p>
              </div>
            </div>

            {/* Right Column (Company) */}
            <div className="flex flex-col items-center">
              <h4 className="font-semibold mb-4 text-black">Company</h4>
              <ul className="space-y-2 text-gray-800 text-sm text-center">
                <li>
                  <a
                    href="#about"
                    onClick={handleAboutClick}
                    className="hover:text-black transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#why-choose-us"
                    onClick={handleWhyChooseUsClick}
                    className="hover:text-black transition-colors"
                  >
                    Why Choose Us
                  </a>
                </li>

                <li>
                  <a
                    href="#inspirations"
                    onClick={handleInspirationsClick}
                    className="hover:text-black transition-colors"
                  >
                    Inspirations
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-black transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Black Line */}
          <div className="w-full h-0.5 bg-black mt-8 mb-4"></div>

          {/* Copyright */}
          <div className="text-center text-gray-800 text-xs md:text-sm">
            <p>&copy; 2025 ARTENO. All rights reserved.</p>
          </div>
          {/* closes max-w-7xl container */}
        </div>
      </footer>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Custom dropdown styling with brand color hover */
        .dropdown-custom option {
          background-color: white !important;
          color: black !important;
        }

        .dropdown-custom option:hover {
          background-color: #d7b387 !important;
          color: black !important;
        }

        .dropdown-custom option:checked {
          background-color: #d7b387 !important;
          color: black !important;
        }

        .dropdown-custom:focus {
          --tw-ring-color: #d7b387 !important;
          border-color: #d7b387 !important;
        }

        /* Additional styling for better cross-browser support */
        .dropdown-custom option:focus {
          background-color: #d7b387 !important;
          color: black !important;
        }

        .dropdown-custom option:active {
          background-color: #d7b387 !important;
          color: black !important;
        }
      `}</style>
    </div>
  );
};

export default App;
