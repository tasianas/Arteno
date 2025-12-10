import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Truck,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { supabase } from "../lib/supabase";

interface ProductDetailProps {
  productId?: string; // Optional now since we can get it from URL
  onBack: () => void;
  onLogoClick: () => void;
  onInspirationsClick: () => void;
  onAboutClick: () => void;
  onSignOut: () => void;
}

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

const ProductDetailPage: React.FC<ProductDetailProps> = ({
  productId: propProductId,
  onBack,
}) => {
  const { productId: urlProductId } = useParams<{ productId: string }>();
  const productId = propProductId || urlProductId;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const fetchProduct = async () => {
    if (!productId) return;

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .maybeSingle();

      if (error) throw error;
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const parseImages = (imagesStr: string | null): string[] => {
    if (!imagesStr) return [];
    try {
      const parsed = JSON.parse(imagesStr);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const additionalImages = product?.images ? parseImages(product.images) : [];
  const allImages = product ? [product.image, ...additionalImages] : [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D7B387] mx-auto mb-4"></div>
          <p className="text-gray-300">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Product not found
          </h2>
          <button
            onClick={onBack}
            className="bg-[#D7B387] text-black px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-300 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                <img
                  src={allImages[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-[500px] object-cover"
                />
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>

              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        currentImageIndex === index
                          ? "border-[#D7B387]"
                          : "border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                {product.code && (
                  <p className="text-[#D7B387] text-sm font-semibold mb-2">
                    {product.code}
                  </p>
                )}
                <h1 className="text-4xl font-bold text-white mb-4">
                  {product.name}
                </h1>
                <div className="mb-4">
                  <span className="text-sm text-gray-400">
                    Category: {product.category}
                  </span>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.long_description && (
                <div className="border-t border-gray-800 pt-6">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Details
                  </h3>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {product.long_description}
                  </p>
                </div>
              )}

              <div className="border-t border-gray-800 pt-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Product Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Package className="h-5 w-5 mr-3 text-[#D7B387]" />
                    <span>Product Code: {product.code}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Truck className="h-5 w-5 mr-3 text-[#D7B387]" />
                    <span>Available for order</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Shield className="h-5 w-5 mr-3 text-[#D7B387]" />
                    <span>Quality guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
