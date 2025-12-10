import React from "react";

interface FooterProps {
  handleProductsClick: (e?: React.MouseEvent) => void;
  handleBestSellersClick: (e?: React.MouseEvent) => void;
  handleAboutClick: (e?: React.MouseEvent) => void;
  handleWhyChooseUsClick: (e?: React.MouseEvent) => void;
  handleInspirationsClick: (e?: React.MouseEvent) => void;
}

const Footer: React.FC<FooterProps> = ({
  handleProductsClick,
  handleBestSellersClick,
  handleAboutClick,
  handleWhyChooseUsClick,
  handleInspirationsClick,
}) => {
  return (
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
      </div>
    </footer>
  );
};

export default Footer;
