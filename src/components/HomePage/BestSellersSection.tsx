import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Product } from "../../types/Product";

interface BestSellersSectionProps {
  bestSellers: Product[];
  bestSellersScrollerRef: React.RefObject<HTMLDivElement>;
  scrollProgress: number;
  scrollBestSellers: (dir: number) => void;
  handleScrollbarClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const BestSellersSection: React.FC<BestSellersSectionProps> = ({
  bestSellers,
  bestSellersScrollerRef,
  scrollProgress,
  scrollBestSellers,
  handleScrollbarClick,
}) => {
  return (
    <section id="best-sellers" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Our Best Sellers
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto mt-4">
            Discover our most popular glass blocks, each engineered for specific
            applications and beloved by architects worldwide.
          </p>
        </div>

        <div className="relative">
          {/* Carousel scroller */}
          <div
            ref={bestSellersScrollerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-1 md:px-2 scroll-smooth [&::-webkit-scrollbar]:hidden"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {bestSellers.map((item, index) => (
              <article
                key={index}
                data-best-sellers-card
                className="snap-start shrink-0 min-w-[260px] md:min-w-[360px] rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-black ring-1 ring-white/10 hover:ring-white/20 transition"
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
  );
};

export default BestSellersSection;
