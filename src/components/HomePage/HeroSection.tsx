import React from "react";

const HeroSection: React.FC = () => {
  return (
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
  );
};

export default HeroSection;
