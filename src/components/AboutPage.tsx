import React, { useState } from "react";

interface AboutPageProps {
  onBack: () => void;
  onLogoClick: () => void;
  onProductsClick: () => void;
  onInspirationsClick: () => void;
  onSignOut: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({
  onLogoClick,
  onProductsClick,
}) => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleGetInTouchClick = () => {
    // Navigate to home page first
    onLogoClick();
    // Then scroll to contact section after a brief delay
    setTimeout(() => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  // Handle ESC key to close search
  React.useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showSearchBar) {
        setShowSearchBar(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [showSearchBar]);

  return (
    <div className="min-h-screen bg-black">
      {/* Content with top padding to account for fixed nav */}
      <div className="pt-20">
        {/* Main About Section - Mobile First Design */}
        <div className="min-h-screen py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Mobile: Photo First, Desktop: Photo First */}
              <div className="order-1 lg:order-1 relative">
                {/* Mobile: Simple, Clean Photo */}
                <div className="aspect-[3/4] md:aspect-[4/5] rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl transform hover:scale-[1.02] lg:hover:scale-105 transition-all duration-300 lg:duration-500 mb-8 lg:mb-0">
                  <img
                    src="https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/1%20(154).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEgKDE1NCkuanBnIiwiaWF0IjoxNzU2MzAxNjM5LCJleHAiOjE3ODc4Mzc2Mzl9.JYQt2sW9BBLS52efRJD0wACf-7XVc9DDRWE1NTz4rmo"
                    alt="ARTENO Team"
                    className="w-full h-full object-cover lg:hover:scale-110 transition-transform duration-500 lg:duration-700"
                  />
                </div>

                {/* Subtle decorative elements - hidden on mobile */}
                <div
                  className="hidden lg:block absolute -top-6 -left-6 w-24 h-24 border-2 rounded-full opacity-30"
                  style={{ borderColor: "#D7B387" }}
                ></div>
                <div
                  className="hidden lg:block absolute -bottom-8 -right-8 w-32 h-32 border rounded-2xl opacity-20"
                  style={{ borderColor: "#D7B387" }}
                ></div>
              </div>

              {/* Mobile: Text Second, Desktop: Text Second */}
              <div className="order-2 lg:order-2 space-y-4 lg:space-y-8">
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 lg:mb-6 leading-tight">
                    About Us
                  </h1>
                  <div
                    className="w-16 lg:w-24 h-0.5 lg:h-1 mb-4 lg:mb-8 rounded-full"
                    style={{ backgroundColor: "#D7B387" }}
                  ></div>
                </div>

                <div className="space-y-3 lg:space-y-6 text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
                  <p className="text-center lg:text-left">
                    At Arteno, we bring a new perspective to architectural
                    materials. One that merges design, functionality, and
                    emotion.
                  </p>

                  <p className="text-center lg:text-left">
                    We see materials not simply as components of construction,
                    but as instruments of expression capable of shaping light,
                    texture, and atmosphere.
                  </p>

                  <p className="text-center lg:text-left">
                    Our story begins with glass blocks, timeless architectural
                    elements reimagined for contemporary spaces. Designed for
                    projects of high specification and refined aesthetics, they
                    embody precision, clarity, and enduring quality.
                  </p>

                  <p className="text-center lg:text-left">
                    At Arteno, our vision is to redefine how materials
                    participate in design: not as background elements, but as
                    active forms that give identity to a space. We believe that
                    true architecture lives in the dialogue between light and
                    matter, where transparency becomes structure, and structure
                    becomes art.
                  </p>

                  <p className="text-center lg:text-left">
                    Guided by authenticity, innovation, and aesthetic integrity,
                    we create materials that inspire timeless, thoughtful, and
                    elevated projects.
                  </p>

                  <p className="text-center lg:text-left">
                    Arteno stands for a design-driven philosophy, the art of
                    building with intention.
                  </p>
                </div>

                {/* Company Stats with Button - Mobile Optimized */}
                <div className="pt-4 lg:pt-8">
                  {/* Separator line */}
                  <div className="flex justify-center mb-6 lg:mb-8">
                    <div className="w-[280px] md:w-[400px] h-0.5 relative">
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to right, transparent, #D7B387 10%, #D7B387 90%, transparent)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Mobile: Stack everything vertically, Desktop: Side by side */}
                  <div className="space-y-6 lg:space-y-0 lg:flex lg:items-center lg:justify-between flex flex-col items-center lg:flex-row">
                    {/* Stats Grid - Centered on mobile */}
                    <div className="flex justify-center gap-12 lg:grid lg:grid-cols-2 lg:gap-12 lg:justify-start lg:max-w-none">
                      <div className="text-center lg:text-left">
                        <div
                          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1"
                          style={{ color: "#D7B387" }}
                        >
                          2024
                        </div>
                        <div className="text-gray-400 text-xs md:text-sm lg:text-base">
                          Founded
                        </div>
                      </div>
                      <div className="text-center lg:text-left">
                        <div
                          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1"
                          style={{ color: "#D7B387" }}
                        >
                          100%
                        </div>
                        <div className="text-gray-400 text-xs md:text-sm lg:text-base">
                          Architect-Focused
                        </div>
                      </div>
                    </div>

                    {/* Button - Full width on mobile, auto on desktop */}
                    <div className="lg:ml-8 flex justify-center lg:justify-start lg:max-w-none lg:w-auto">
                      <button
                        onClick={onProductsClick}
                        className="w-[280px] lg:w-auto text-black px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 text-base whitespace-nowrap shadow-lg"
                        style={{ backgroundColor: "#D7B387" }}
                      >
                        Explore Our Materials
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Extended Beige Separator Line Before Mission Section */}
        <div className="flex justify-center py-8 md:py-16 bg-black">
          <div className="w-[280px] md:w-[800px] h-0.5 relative">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, transparent, #D7B387 10%, #D7B387 90%, transparent)",
              }}
            />
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="py-20 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Our Mission
            </h2>
            <div className="space-y-6 text-xl text-gray-300 leading-relaxed">
              <p>
                We aim to redefine architectural design materials, providing
                refined solutions that inspire and empower visionary projects.
              </p>
              <p>
                We highlight the essence of each material as an architectural
                statement, helping architects transform their vision into
                extraordinary reality.
              </p>
            </div>
          </div>
        </div>

        {/* Extended Beige Separator Line Between Mission and Values */}
        <div className="flex justify-center py-16 bg-black">
          <div className="w-[280px] md:w-[800px] h-0.5 relative">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, transparent, #D7B387 10%, #D7B387 90%, transparent)",
              }}
            />
          </div>
        </div>

        {/* Values Section - Cards now in beige color */}
        <div className="py-20 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Our Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center h-full">
                <div
                  className="rounded-2xl p-8 h-full flex flex-col"
                  style={{ backgroundColor: "#D7B387", minHeight: "200px" }}
                >
                  <h3 className="text-2xl font-bold text-black mb-4">Design</h3>
                  <p className="text-gray-800 leading-relaxed flex-grow">
                    We design with intention. Our goal is harmony: materials
                    that shape space with quiet confidence.
                  </p>
                </div>
              </div>

              <div className="text-center h-full">
                <div
                  className="rounded-2xl p-8 h-full flex flex-col"
                  style={{ backgroundColor: "#D7B387", minHeight: "200px" }}
                >
                  <h3 className="text-2xl font-bold text-black mb-4">
                    Innovation
                  </h3>
                  <p className="text-gray-800 leading-relaxed flex-grow">
                    We challenge conventions and seek new possibilities in every
                    form. Innovation for us means progress with purpose, design
                    that evolves without losing its essence.
                  </p>
                </div>
              </div>

              <div className="text-center h-full">
                <div
                  className="rounded-2xl p-8 h-full flex flex-col"
                  style={{ backgroundColor: "#D7B387", minHeight: "200px" }}
                >
                  <h3 className="text-2xl font-bold text-black mb-4">
                    Quality
                  </h3>
                  <p className="text-gray-800 leading-relaxed flex-grow">
                    We value integrity over excess. Each material is chosen,
                    crafted, and refined to meet the highest standards of
                    performance and aesthetics, built to endure both physically
                    and in time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Extended Beige Separator Line Before Contact Section */}
        <div className="flex justify-center py-16 bg-black">
          <div className="w-[280px] md:w-[800px] h-0.5 relative">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, transparent, #D7B387 10%, #D7B387 90%, transparent)",
              }}
            />
          </div>
        </div>

        {/* Contact CTA Section */}
        <div className="py-20 bg-black">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Collaborate with Arteno.
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Explore how our materials transform architecture into art.
            </p>
            <button
              onClick={handleGetInTouchClick}
              className="text-black px-8 py-3 rounded-lg font-semibold transition-colors hover:opacity-90"
              style={{ backgroundColor: "#D7B387" }}
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
