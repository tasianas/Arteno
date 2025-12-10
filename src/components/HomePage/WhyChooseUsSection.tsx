import React from "react";
import { Lightbulb, Shield, Users } from "lucide-react";

const WhyChooseUsSection: React.FC = () => {
  return (
    <>
      {/* Extended Beige Separator Line Before Features Section */}
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

      {/* Features Section */}
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
    </>
  );
};

export default WhyChooseUsSection;
