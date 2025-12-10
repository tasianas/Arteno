import React from "react";

const AboutSection: React.FC = () => {
  return (
    <>
      {/* Extended Beige Separator Line Before About Section */}
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

      {/* About Section */}
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
    </>
  );
};

export default AboutSection;
