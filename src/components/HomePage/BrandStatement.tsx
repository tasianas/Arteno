import React from "react";

const BrandStatement: React.FC = () => {
  return (
    <section className="py-12 md:py-20" style={{ backgroundColor: "#D7B387" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="space-y-6 text-gray-800">
            <p className="text-xl lg:text-2xl leading-relaxed font-light">
              ARTENO is more than a material source. It's a meeting point for
              design visionaries.
            </p>
            <p className="text-xl lg:text-2xl leading-relaxed font-light">
              We work alongside architects and creators to explore how
              structure, light, and form can shape meaningful spaces.
            </p>
            <p className="text-xl lg:text-2xl leading-relaxed font-light">
              Discover our best-selling glass blocks. Selected by architects and
              designers for their performance, versatility, and timeless appeal.
            </p>
            <p className="text-xl lg:text-2xl leading-relaxed font-light">
              Projects that inspire new ways of seeing and building. Where
              materials become ideas, and ideas become architecture.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStatement;
