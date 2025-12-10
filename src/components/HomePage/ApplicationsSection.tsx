import React from "react";

interface Application {
  title: string;
  description: string;
  image: string;
}

interface ApplicationsSectionProps {
  applications: Application[];
}

const ApplicationsSection: React.FC<ApplicationsSectionProps> = ({
  applications,
}) => {
  return (
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
  );
};

export default ApplicationsSection;
