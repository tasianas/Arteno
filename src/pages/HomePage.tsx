import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HomePage/HeroSection";
import BrandStatement from "../components/HomePage/BrandStatement";
import BestSellersSection from "../components/HomePage/BestSellersSection";
import ApplicationsSection from "../components/HomePage/ApplicationsSection";
import WhyChooseUsSection from "../components/HomePage/WhyChooseUsSection";
import AboutSection from "../components/HomePage/AboutSection";
import ContactSection from "../components/HomePage/ContactSection";
import Footer from "../components/HomePage/Footer";
import type { Product } from "../types/Product";

interface HomePageProps {
  bestSellers: Product[];
}

const HomePage: React.FC<HomePageProps> = ({ bestSellers }) => {
  const navigate = useNavigate();
  const bestSellersScrollerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  const handleProductsClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigate("/products");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBestSellersClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigate("/");
    setTimeout(() => {
      document.getElementById("best-sellers")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
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
    navigate("/inspirations");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAboutClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigate("/about");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <HeroSection />
      <BrandStatement />
      <BestSellersSection
        bestSellers={bestSellers}
        bestSellersScrollerRef={bestSellersScrollerRef}
        scrollProgress={scrollProgress}
        scrollBestSellers={scrollBestSellers}
        handleScrollbarClick={handleScrollbarClick}
      />
      <ApplicationsSection applications={applications} />
      <WhyChooseUsSection />
      <AboutSection />
      <ContactSection />
      <Footer
        handleProductsClick={handleProductsClick}
        handleBestSellersClick={handleBestSellersClick}
        handleAboutClick={handleAboutClick}
        handleWhyChooseUsClick={handleWhyChooseUsClick}
        handleInspirationsClick={handleInspirationsClick}
      />

      <style>{`
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
    </>
  );
};

export default HomePage;
