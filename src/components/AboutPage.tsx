import React, { useState, useRef } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  image: string;
  description?: string;
}

interface AboutPageProps {
  onBack: () => void;
  onLogoClick: () => void;
  onProductsClick: () => void;
  onInspirationsClick: () => void;
  onSignOut: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({
  onBack,
  onLogoClick,
  onProductsClick,
  onInspirationsClick,
  onSignOut,
}) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Same products data as ProductsPage
  const products: Product[] = [
    {
      id: "1",
      code: "GRLX-B201",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR01.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjAxLnBuZyIsImlhdCI6MTc1NzUwNzMxNSwiZXhwIjoxNzg5MDQzMzE1fQ.DxnLncrRo9u4OQcZJxCasov6JLlWMYYqHY6nBvuNhrI",
      description: "HOT MELT CLEAR LINEAR GLASS BRICK",
      longDescription: `The HOT MELT CLEAR LINEAR GLASS BRICK embodies transparency and precision. Crafted through hot melt technology, it delivers a pure crystalline body enhanced with subtle linear flutes that guide light in elegant rhythms. Perfect for walls, partitions, or design accents, this brick adds structure without sacrificing brightness—an architectural element that blends timeless clarity with modern refinement.`,
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR01.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjAxLnBuZyIsImlhdCI6MTc1Nzc4MTA4NSwiZXhwIjoxNzg5MzE3MDg1fQ.TcbtVs0khX2SOC-zh-6mjCRo4bkaAO9dFZz6CBPyUWc",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR01%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjAxICgyKS5wbmciLCJpYXQiOjE3NTc3ODExMDMsImV4cCI6MTc4OTMxNzEwM30.3JYobRi5PitYyYysMus85ZEHtu9TnRtIPG6_H57AjR8",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR01%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjAxICgzKS5wbmciLCJpYXQiOjE3NTc3ODExMTksImV4cCI6MTc4OTMxNzExOX0.MA_uxkvk8kpTo9Ac15rHH3Kpax7p56k0wWuW51pqJ-E",
      ],
    },
    {
      id: "2",
      code: "GRLX-B202",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR02.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjAyLnBuZyIsImlhdCI6MTc1NzUwNzU2NywiZXhwIjoxNzg5MDQzNTY3fQ.-Q7xoeRgTpwgfnWy_jC3HDlX4TX8XEKII_KJvh4c0dA",
      description: "HOT MELT FROSTED LINEAR GLASS BRIC",
      longDescription:
        "The HOT MELT Frosted Linear Glass Brick softens light through its matte frosted surface while retaining the refined rhythm of subtle linear flutes. This unique combination creates a sense of privacy without losing brightness, adding both warmth and sophistication to interiors. Ideal for walls, partitions, and design features, it blends clarity with a gentle diffusion that elevates any architectural composition",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR02.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjAyLnBuZyIsImlhdCI6MTc1NzUwNzU2NywiZXhwIjoxNzg5MDQzNTY3fQ.-Q7xoeRgTpwgfnWy_jC3HDlX4TX8XEKII_KJvh4c0dA",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR02%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjAyICgyKS5wbmciLCJpYXQiOjE3NTc3ODEyNDYsImV4cCI6MTc4OTMxNzI0Nn0.r3QyrROqgkSWAyUEHKzPAtVlKnP0c_EmXFOUcQSsskc",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR02%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjAyICgzKS5wbmciLCJpYXQiOjE3NTc3ODEzNDMsImV4cCI6MTc4OTMxNzM0M30.UijXQxmZpI1SS47qqEPJWmKrkC6qSrmZlLxdJ1qJ-nI",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR02%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjAyICg0KS5wbmciLCJpYXQiOjE3NTc3ODEyNzYsImV4cCI6MTc4OTMxNzI3Nn0.YGFHDrP0-nLbgi5tDAU0DTtWpf-k9jBNhGxghZW0YVI",
      ],
    },
    {
      id: "3",
      code: "GRLX-B203",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR03.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjAzLnBuZyIsImlhdCI6MTc1NzUwNzk3NCwiZXhwIjoxNzg5MDQzOTc0fQ.vTabeZ-OlDQ1r4S7958HD_Q2Tr901s07D-si_Kxtsf4",
      description: "HOT MELT FLUTED GLASS BRICK",
      longDescription:
        "The HOT MELT Fluted Glass Brick showcases bold linear grooves that catch and refract light in dynamic ways. Its deeply sculpted surface introduces rhythm and movement, creating striking visual depth while maintaining transparency. Perfect for walls, partitions, and architectural accents, this brick combines strength with a refined aesthetic, turning light into a design element that enhances both modern and classic interiors.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR03.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjAzLnBuZyIsImlhdCI6MTc1NzUwNzk3NCwiZXhwIjoxNzg5MDQzOTc0fQ.vTabeZ-OlDQ1r4S7958HD_Q2Tr901s07D-si_Kxtsf4",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR03%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjAzICgyKS5wbmciLCJpYXQiOjE3NTc3ODE0NDUsImV4cCI6MTc4OTMxNzQ0NX0.ewvCo4zPuFUGi3iinX-Ea9mFaPGAIWeoBI_V7Mjiibg",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR03%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjAzICgzKS5wbmciLCJpYXQiOjE3NTc3ODE0NjcsImV4cCI6MTc4OTMxNzQ2N30.A-DYRLimpIweeM7tdcygUDbCwT_TSehRXiiQvxgjJzA",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR03(6).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjAzKDYpLnBuZyIsImlhdCI6MTc1Nzc4MjMzNiwiZXhwIjoxNzg5MzE4MzM2fQ.ExCHXkzqfG_5Ds8NuLs3dX4YU4jjmqPMcj4LM2NwYFY",
      ],
    },
    {
      id: "4",
      code: "GRLX-B204",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR04%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA0ICgyKS5wbmciLCJpYXQiOjE3NTc1MDgxODMsImV4cCI6MTc4OTA0NDE4M30.RVdcFK-p8YEik9Np3nmuplmCeoSwhdcfSG5SjPrGlxI",
      description: "HOT MELT POLISHED ARRIS GLASS BRICK",
      longDescription:
        "The HOT MELT Polished Arris Glass Brick embodies clarity and refinement. Its meticulously polished edges highlight the purity of the crystalline body, creating a sleek architectural element that radiates sophistication. By channeling light seamlessly through its transparent form, it offers both brightness and structure—perfect for feature walls, refined partitions, or timeless design compositions that demand elegance",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR04%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA0ICgyKS5wbmciLCJpYXQiOjE3NTc1MDgxODMsImV4cCI6MTc4OTA0NDE4M30.RVdcFK-p8YEik9Np3nmuplmCeoSwhdcfSG5SjPrGlxI",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR04%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA0ICgzKS5wbmciLCJpYXQiOjE3NTc3ODE2NDYsImV4cCI6MTc4OTMxNzY0Nn0.Xi-ZApvRs9o5HmI098o3QkDeGCTaJ_5mEzVP-7kGJz8",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR04%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA0ICg0KS5wbmciLCJpYXQiOjE3NTc3ODE2NTYsImV4cCI6MTc4OTMxNzY1Nn0.XdX4rfPERebTNmYXDBk0t9v_6_0MdkVIO35SMjtNMyI",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR04%20(5).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA0ICg1KS5wbmciLCJpYXQiOjE3NTc3ODIwOTQsImV4cCI6MTc4OTMxODA5NH0.lm3nszmsJalAW-jyShihd9R_YBZT1FDp-N4Ow_albSo",
      ],
    },
    {
      id: "5",
      code: "GRLX-B205",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR05.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA1LnBuZyIsImlhdCI6MTc1NzUwODMwNiwiZXhwIjoxNzg5MDQ0MzA2fQ.eOUQGnPIwRRPLzmwqVVuEPWoRxNamONgX8XUjniIBuU",
      description: "HOT MELT STIPPLED CRYSTALLINE GLASS BRICK",
      longDescription:
        "The HOT MELT Stippled Crystalline Glass Brick brings a unique interplay of light and texture. Its irregular, stippled surface scatters brightness into a soft crystalline glow, creating depth and atmosphere in any architectural setting. Perfect for walls, partitions, or decorative accents, this brick combines transparency with a distinctive texture that transforms light into a design element full of character and sophistication.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR05.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA1LnBuZyIsImlhdCI6MTc1NzUwODMwNiwiZXhwIjoxNzg5MDQ0MzA2fQ.eOUQGnPIwRRPLzmwqVVuEPWoRxNamONgX8XUjniIBuU",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR05%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA1ICgyKS5wbmciLCJpYXQiOjE3NTc3ODI2NTEsImV4cCI6MTc4OTMxODY1MX0.B7hDq5vO3ccPOSBzde8JLKIXhPNv_sTWrS1RcZXzxdw",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR05%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA1ICgzKS5wbmciLCJpYXQiOjE3NTc3ODI2NjIsImV4cCI6MTc4OTMxODY2Mn0.2aRidOotmTshIYtWm9WM76icNcwyk13BavxJrauwadI",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR05%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA1ICg0KS5wbmciLCJpYXQiOjE3NTc3ODI2NzMsImV4cCI6MTc4OTMxODY3M30.dLPk7xn-ijMHhJ060ROhUp_wRI4D_IGZt253rQUBwng",
      ],
    },
    {
      id: "6",
      code: "GRLX-B206",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR06%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA2ICg0KS5wbmciLCJpYXQiOjE3NTc1MDg0MTEsImV4cCI6MTc4OTA0NDQxMX0.aYvgPOIqoRbvUEebhzHsXmHPtpknY-quFmK-0I5fzcc",
      description: "HOT MELT PEBBLED FROST GLASS BRICK",
      longDescription:
        "The HOT MELT Pebbled Frost Glass Brick is defined by its textured, frosted surface that scatters light into a soft and atmospheric glow. Its pebbled finish adds depth and tactility, while still allowing brightness to pass through. Perfect for creating privacy with elegance, this brick is ideal for walls, partitions, or architectural details that demand a balance of subtle opacity and refined design.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR06%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA2ICg0KS5wbmciLCJpYXQiOjE3NTc1MDg0MTEsImV4cCI6MTc4OTA0NDQxMX0.aYvgPOIqoRbvUEebhzHsXmHPtpknY-quFmK-0I5fzcc",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR06%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA2ICgyKS5wbmciLCJpYXQiOjE3NTc3ODI3MzEsImV4cCI6MTc4OTMxODczMX0.pSFTMJs9hy9bwlq_9foZEHCuwb1ej_nq0JpIJ6pW3j4",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR06%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA2ICgzKS5wbmciLCJpYXQiOjE3NTc3ODI3NDEsImV4cCI6MTc4OTMxODc0MX0.AMNnWGKJvuV7G_4qG8kpuG2PxCTbfFSGIh7hPEHZiwA",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR06%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA2ICg0KS5wbmciLCJpYXQiOjE3NTc3ODI3NTgsImV4cCI6MTc4OTMxODc1OH0.xealQVedXKQwAE8ytCA4JTN1G7RhbZ4F4PYklWUH-a0",
      ],
    },
    {
      id: "7",
      code: "GRLX-B207",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR07.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA3LnBuZyIsImlhdCI6MTc1NzUwODU4NCwiZXhwIjoxNzg5MDQ0NTg0fQ.L2xDHlNgZPHWMeIZfQjdSJ5xTOI4t8BIhyN3tVQl6VU",
      description: "HOT MELT FINE-REEDED GLASS BRICK",
      longDescription:
        "Defined by its delicate vertical grooves, the HOT MELT Fine-Reeded Glass Brick adds subtle rhythm and elegance to architectural surfaces. The fine fluting captures and directs light in refined patterns, creating gentle shadows and depth without overwhelming transparency. Ideal for interiors that call for understated sophistication, it introduces texture and structure while maintaining a sense of clarity and openness.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR07.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA3LnBuZyIsImlhdCI6MTc1NzUwODU4NCwiZXhwIjoxNzg5MDQ0NTg0fQ.L2xDHlNgZPHWMeIZfQjdSJ5xTOI4t8BIhyN3tVQl6VU",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR07%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA3ICgyKS5wbmciLCJpYXQiOjE3NTc3ODM3ODcsImV4cCI6MTc4OTMxOTc4N30.HJm33Z0RqHaYUxJ9jx0Og1lHj00pgbBpONh4XCHCeOc",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR07%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA3ICgzKS5wbmciLCJpYXQiOjE3NTc3ODM3OTgsImV4cCI6MTc4OTMxOTc5OH0.-HDuuu6QSa-RJFbrSXs62fVtPgjDpttev1f-Z5mjIvc",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR07%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA3ICg0KS5wbmciLCJpYXQiOjE3NTc3ODM4MTEsImV4cCI6MTc4OTMxOTgxMX0.Nu-l0iQJZpdCCIMxZJ1sPq_UvpokugvjIhbtKVwah0Y",
      ],
    },
    {
      id: "8",
      code: "GRLX-B208",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR08.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA4LnBuZyIsImlhdCI6MTc1NzUwODcwNSwiZXhwIjoxNzg5MDQ0NzA1fQ.FqmS49GxwWLndqtsv69oQ1mq7i7opR0UVPre0GKHN6I",
      description: "  HOT MELT WIDE-REEDED GLASS BRICK",
      longDescription:
        "The HOT MELT Wide-Reeded Glass Brick makes a bold statement with its pronounced linear grooves. Broader fluting enhances texture and creates dramatic light refractions, adding strength and presence to architectural compositions. Designed for walls and partitions that aim to impress, it balances openness with structure, offering a contemporary aesthetic that feels both powerful and refined.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR08.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA4LnBuZyIsImlhdCI6MTc1NzUwODcwNSwiZXhwIjoxNzg5MDQ0NzA1fQ.FqmS49GxwWLndqtsv69oQ1mq7i7opR0UVPre0GKHN6I",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR08%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA4ICgyKS5wbmciLCJpYXQiOjE3NTc3ODY3NjAsImV4cCI6MTc4OTMyMjc2MH0.BbcpF7cRau7Lnj_OAD3cZzUWLy2m3M0TbYDXkFZEmZc",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR08%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA4ICgzKS5wbmciLCJpYXQiOjE3NTc3ODY3NzAsImV4cCI6MTc4OTMyMjc3MH0.m8JfUYWl3KvpqHGeodBNcvMPnnS6skjBdOV7o9xNPwg",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR08%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA4ICg0KS5wbmciLCJpYXQiOjE3NTc3ODY3ODYsImV4cCI6MTc4OTMyMjc4Nn0.nq_gWU467rU5Ek2EPlnz00qnI8rYu2IRLhWIdHWdiWw",
      ],
    },
    {
      id: "9",
      code: "GRLX-B209",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR09.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA5LnBuZyIsImlhdCI6MTc1NzUxMDE0MCwiZXhwIjoxNzg5MDQ2MTQwfQ.ldzRwShpOkOdzyiQyLneGUPt1PjjoBPuch8Bg7dKWqk",
      description: "HOT MELT ICE VEIN GLASS BRICK",
      longDescription: `The HOT MELT Ice Vein Glass Brick captures the raw beauty of frozen landscapes. Its organic, vein-like texture refracts light in unpredictable patterns, creating a striking interplay of clarity and shadow. Each brick becomes a unique architectural element that brings the essence of winter's artistry indoors.`,
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR09.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA5LnBuZyIsImlhdCI6MTc1NzUxMDE0MCwiZXhwIjoxNzg5MDQ2MTQwfQ.ldzRwShpOkOdzyiQyLneGUPt1PjjoBPuch8Bg7dKWqk",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR09%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA5ICgyKS5wbmciLCJpYXQiOjE3NTc3ODY4MzgsImV4cCI6MTc4OTMyMjgzOH0.xkX3vanBvdq_l0RMHVL_afcbesVLYvhpnWARpxDIJNw",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR09%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA5ICgzKS5wbmciLCJpYXQiOjE3NTc3ODY4NDksImV4cCI6MTc4OTMyMjg0OX0.frRwWXBKd5ZYvozyNn8Nfht9ty9PK754TcbqdA4fd2A",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR09%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjA5ICg0KS5wbmciLCJpYXQiOjE3NTc3ODY5MDgsImV4cCI6MTc4OTMyMjkwOH0.6mQ3GGSHxGoo2uFj6vZIarkWHdNr21Cu_JYXadum6T8",
      ],
    },
    {
      id: "10",
      code: "GRLX-B210",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR10.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjEwLnBuZyIsImlhdCI6MTc1NzUxMDI5MSwiZXhwIjoxNzg5MDQ2MjkxfQ.GKGp4zlD9RiLwv8lgwt4TvIDydUQlidoIGqHovJSmaM",
      description: "HOT MELT WAVE TEXTURE GLASS BRICK",
      longDescription:
        "The HOT MELT Wave Texture Glass Brick brings fluidity and motion into architectural design. Its undulating surface mimics the natural rhythm of water, bending and scattering light into dynamic, shifting patterns. Perfect for spaces that seek a sense of energy and vitality, this brick transforms ordinary partitions or walls into vibrant focal points that feel alive and ever-changing.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR10.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjEwLnBuZyIsImlhdCI6MTc1NzUxMDI5MSwiZXhwIjoxNzg5MDQ2MjkxfQ.GKGp4zlD9RiLwv8lgwt4TvIDydUQlidoIGqHovJSmaM",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR10%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjEwICgyKS5wbmciLCJpYXQiOjE3NTc3ODY5NTYsImV4cCI6MTc4OTMyMjk1Nn0._1DdMAlIRdaYYjIeHk-jkOiHwCH43aw6wrJDM125HqI",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR10%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjEwICgzKS5wbmciLCJpYXQiOjE3NTc3ODY5NjYsImV4cCI6MTc4OTMyMjk2Nn0.ExuJ0qfgi7uAvaPcJbW-vM11B2W8xlOyoxoeS50i6EA",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR10%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjEwICg0KS5wbmciLCJpYXQiOjE3NTc3ODY5NzYsImV4cCI6MTc4OTMyMjk3Nn0.S3ZQZQU5dtUuHM9aFzdZRML6gYS6pKCTjwxzmbj0oZw",
      ],
    },
    {
      id: "11",
      code: "GRLX-B211",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR11.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjExLnBuZyIsImlhdCI6MTc1NzUxMDQ5MywiZXhwIjoxNzg5MDQ2NDkzfQ.xUbbu9-yuwYxWhH-GqjxYh6NgKyj7VBTymt37NS68Uc",
      description: "HOT MELT REFLECTIVE GLASS BRICK",
      longDescription:
        "The HOT MELT Reflective Glass Brick is defined by its smooth, polished clarity that catches and amplifies light. Its sleek surface enhances brightness and introduces a subtle reflective quality, giving walls and partitions a luminous, spacious feel. A refined choice for contemporary architecture, it balances transparency with radiance, turning simplicity into understated elegance.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR11.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjExLnBuZyIsImlhdCI6MTc1NzUxMDQ5MywiZXhwIjoxNzg5MDQ2NDkzfQ.xUbbu9-yuwYxWhH-GqjxYh6NgKyj7VBTymt37NS68Uc",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR11%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjExICgyKS5wbmciLCJpYXQiOjE3NTc3ODcwMTgsImV4cCI6MTc4OTMyMzAxOH0.GWmTfxGw5AlX7Q4AdqZLysAJ5QwDbUAH3GBaaebf8tQ",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR11%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjExICgzKS5wbmciLCJpYXQiOjE3NTc3ODcwNDEsImV4cCI6MTc4OTMyMzA0MX0.9DONuk3zT4RxQof7EzgajmQWtVQhhqH5oY3eincD49E",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR11%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjExICg0KS5wbmciLCJpYXQiOjE3NTc3ODcwNTEsImV4cCI6MTc4OTMyMzA1MX0.LnLAK_GqgTfb9cWEKNlUNhMT58AY01N7vf_oIQFBOVM",
      ],
    },
    {
      id: "12",
      code: "GRLX-B212",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR12.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjEyLnBuZyIsImlhdCI6MTc1NzUxMjEyMCwiZXhwIjoxNzg5MDQ4MTIwfQ.msw09HUwozIT_G4EUzRAsZJog3NymKeBh_8vnNBZqUo",
      description: "HOT MELT PRISMATIC FACET GLASS BRICK",
      longDescription:
        "The HOT MELT Prismatic Facet Glass Brick transforms every surface into a play of brilliance. Its faceted geometry refracts light like a prism, scattering reflections into sparkling highlights that shift with every angle. More than just a building element, it becomes a decorative jewel within architecture—ideal for feature walls, partitions, or installations that seek vibrancy and radiance.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR12.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjEyLnBuZyIsImlhdCI6MTc1NzUxMjEyMCwiZXhwIjoxNzg5MDQ4MTIwfQ.msw09HUwozIT_G4EUzRAsZJog3NymKeBh_8vnNBZqUo",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR12%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjEyICgyKS5wbmciLCJpYXQiOjE3NTc3ODcwOTMsImV4cCI6MTc4OTMyMzA5M30.0axwMeZcc_S9HYSlQf2BdnV_ZmmFN27p-zSfiQh0WII",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR12%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjEyICgzKS5wbmciLCJpYXQiOjE3NTc3ODcxMDMsImV4cCI6MTc4OTMyMzEwM30.6vIkLF3_pZxm2_Up9LDSDWmPRe9Wxy0Y6SHOT7lKuxQ",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR12%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjEyICg0KS5wbmciLCJpYXQiOjE3NTc3ODcxMTUsImV4cCI6MTc4OTMyMzExNX0.XPti7rKnSC8WA4D4qEG6VEPRHSR0So9WqCGJhM8YWh0",
      ],
    },
    {
      id: "13",
      code: "GRLX-B213",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR13.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjEzLnBuZyIsImlhdCI6MTc1NzUxMjM4MCwiZXhwIjoxNzg5MDQ4MzgwfQ.fXNs_h4B7lHXkIPnVLdZzNINzvapSvvP69n-01zDsng",
      description: "HOT MELT CLEAR DOUBLE-STUD GLASS BRICK",
      longDescription:
        "The HOT MELT Clear Double-Stud Glass Brick emphasizes structure and precision. With two visible internal studs, it combines transparency with reinforced form, delivering both strength and visual clarity. Ideal for projects that value minimalism with a technical edge, it introduces architectural detail while maintaining the pure crystalline quality of glass.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR13.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjEzLnBuZyIsImlhdCI6MTc1NzUxMjM4MCwiZXhwIjoxNzg5MDQ4MzgwfQ.fXNs_h4B7lHXkIPnVLdZzNINzvapSvvP69n-01zDsng",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR13%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjEzICgyKS5wbmciLCJpYXQiOjE3NTc3ODcxNjEsImV4cCI6MTc4OTMyMzE2MX0.QxXEtYenieDLttlSOoG6bDizEjuAWiqtIJ4Qe85hTUQ",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR13%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjEzICgzKS5wbmciLCJpYXQiOjE3NTc3ODcxNzAsImV4cCI6MTc4OTMyMzE3MH0.1IuMYxEkRHhvJjUjuFpxxxaOTEpX7N3xGYqTZxJLabs",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR13%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjEzICg0KS5wbmciLCJpYXQiOjE3NTc3ODcyMjMsImV4cCI6MTc4OTMyMzIyM30.pJ8yNhvsmfU316KiDBrFH2nahHE2__-z96Msng_bEos",
      ],
    },
    {
      id: "14",
      code: "GRLX-B214",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR14.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE0LnBuZyIsImlhdCI6MTc1NzUxMjQ1OSwiZXhwIjoxNzg5MDQ4NDU5fQ.AgV5zUw93v35D2wGws_F7kp2k4qjU0lSifTbt2bVviY",
      description: "HOT MELT CLEAR DOUBLE-RIB GLASS BRICK",
      longDescription:
        "The HOT MELT Clear Double-Rib Glass Brick brings balance and rhythm to architectural compositions. Its dual internal ribs create symmetry within the crystal-clear body, offering both strength and visual order. Designed for spaces that seek refined minimalism, it delivers a clean, architectural aesthetic while allowing light to flow seamlessly.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR14.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE0LnBuZyIsImlhdCI6MTc1NzUxMjQ1OSwiZXhwIjoxNzg5MDQ4NDU5fQ.AgV5zUw93v35D2wGws_F7kp2k4qjU0lSifTbt2bVviY",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR14%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE0ICgyKS5wbmciLCJpYXQiOjE3NTc3ODcyNzcsImV4cCI6MTc4OTMyMzI3N30.k20oDm8P6OovzOHiQgh26V3FdlGg7IDcy0b5R26obM8",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR14%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE0ICgzKS5wbmciLCJpYXQiOjE3NTc3ODcyODksImV4cCI6MTc4OTMyMzI4OX0.2zFtyRr0LMyteJtgqFn46WqdImsCCAwqfnRGZZeuwQ0",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR14%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE0ICg0KS5wbmciLCJpYXQiOjE3NTc3ODczMDEsImV4cCI6MTc4OTMyMzMwMX0.3HEUtIK3yDWLgqHPBbvv6dST7yZIN9sVY3I11byWu-k",
      ],
    },
    {
      id: "15",
      code: "GRLX-B215",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR15.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE1LnBuZyIsImlhdCI6MTc1NzUxMjU2OCwiZXhwIjoxNzg5MDQ4NTY4fQ.4Cz2PwBFLfOvYyCkTrwfZw9E7P3ifJTX_d551jUKfJ4",
      longDescription:
        "The HOT MELT Textured Double-Stud Glass Brick combines structural clarity with a tactile surface. Its two internal studs give a sense of strength and precision, while the textured finish diffuses light into layered reflections. A perfect choice for designers seeking depth and character, it transforms functional detail into a refined architectural feature.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR15.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE1LnBuZyIsImlhdCI6MTc1NzUxMjU2OCwiZXhwIjoxNzg5MDQ4NTY4fQ.4Cz2PwBFLfOvYyCkTrwfZw9E7P3ifJTX_d551jUKfJ4",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR15%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE1ICgyKS5wbmciLCJpYXQiOjE3NTc3ODczNjAsImV4cCI6MTc4OTMyMzM2MH0.mnkkv4pBGqVFJ76GBpCmz4MHAuMLVdGCsgRuR29_0Dg",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR15%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE1ICgzKS5wbmciLCJpYXQiOjE3NTc3ODczNjksImV4cCI6MTc4OTMyMzM2OX0.t8AKCDJTYv1OXAXy8rSpphg-waaC8sF-RhBoMFLLSqo",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR15%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE1ICg0KS5wbmciLCJpYXQiOjE3NTc3ODc0MTcsImV4cCI6MTc4OTMyMzQxN30.wH7tK-e_aD1zOeojZbxCnyFQ82i9Sfd9aaIHu63FxXg",
      ],
    },
    {
      id: "16",
      code: "GRLX-B216",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR16%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE2ICgzKS5wbmciLCJpYXQiOjE3NTc1MTI2ODYsImV4cCI6MTc4OTA0ODY4Nn0.GQKHsVK10sRTCQkeFhdP7SOVBCcd46C3AU0pWgcmWEY",
      description: "HOT MELT TEXTURED DOUBLE-RIB GLASS BRICK",
      longDescription:
        "The HOT MELT Textured Double-Stud Glass Brick combines structural clarity with a tactile surface. Its two internal studs give a sense of strength and precision, while the textured finish diffuses light into layered reflections. A perfect choice for designers seeking depth and character, it transforms functional detail into a refined architectural feature.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR16%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE2ICgzKS5wbmciLCJpYXQiOjE3NTc1MTI2ODYsImV4cCI6MTc4OTA0ODY4Nn0.GQKHsVK10sRTCQkeFhdP7SOVBCcd46C3AU0pWgcmWEY",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR16%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE2ICgyKS5wbmciLCJpYXQiOjE3NTc3ODc0NzksImV4cCI6MTc4OTMyMzQ3OX0.MtYUyjdddGn-QxU27s4EVC_ZQ5ZwtYViIb42OFeowOw",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR16.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE2LnBuZyIsImlhdCI6MTc1Nzc4NzU0NywiZXhwIjoxNzg5MzIzNTQ3fQ.L8skRFmKSTsWVHnxvOtZ8uwzgcRgjhsidzBzd4hnhlQ",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR16%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE2ICg0KS5wbmciLCJpYXQiOjE3NTc3ODc0OTcsImV4cCI6MTc4OTMyMzQ5N30.T9VO55l_fzzzZJXK4p0aJAUNo0_Vo4Q2d-IVEEVVoFk",
      ],
    },
    {
      id: "17",
      code: "GRLX-B217",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR17.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE3LnBuZyIsImlhdCI6MTc1NzUxMjc4OSwiZXhwIjoxNzg5MDQ4Nzg5fQ.ItuQPsxv81c4J_C5DxHbSmTLR_9EdGm5bK2Bvv3qqpM",
      description: "HOT MELT OPAL SATIN GLASS BRICK",
      longDescription:
        "The HOT MELT Opal Satin Glass Brick diffuses light into a soft, velvety glow. Its opaline surface ensures privacy while maintaining a gentle luminosity, bringing calm and balance into any space. Perfect for serene interiors or architectural features that call for understated elegance, it transforms natural light into a soothing design elemen.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR17.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE3LnBuZyIsImlhdCI6MTc1NzUxMjc4OSwiZXhwIjoxNzg5MDQ4Nzg5fQ.ItuQPsxv81c4J_C5DxHbSmTLR_9EdGm5bK2Bvv3qqpM",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR17%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE3ICgyKS5wbmciLCJpYXQiOjE3NTc3ODkwNzUsImV4cCI6MTc4OTMyNTA3NX0.K5389hxS_hnmE-Odi8yLPepJ8fikJEXFLtTBLwXGfWk",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR17%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE3ICgzKS5wbmciLCJpYXQiOjE3NTc3ODkwODYsImV4cCI6MTc4OTMyNTA4Nn0.P16c91xRW5Q01on6HVfK3V6n3Sa1CvOmnp4K6cf9-eo",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR17%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE3ICg0KS5wbmciLCJpYXQiOjE3NTc3ODkwOTYsImV4cCI6MTc4OTMyNTA5Nn0.3ckyR-XUSbHqztv9t6U4-08NJ3P6ceMY8z_o4Y2BVVc",
      ],
    },
    {
      id: "18",
      code: "GRLX-B218",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR18.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE4LnBuZyIsImlhdCI6MTc1NzUxMzE1OCwiZXhwIjoxNzg5MDQ5MTU4fQ.c4tCWHRQz86CWkbFf355qJ336GzB5CY2YnrbKSKyVEM",
      description: "HOT MELT OPAL BULLNOSE GLASS BRICK",
      longDescription:
        "The HOT MELT Opal Bullnose Glass Brick introduces gentle curves into architectural design. Its semi-cylindrical bullnose face paired with a satin opal finish creates a sculptural form that softens both light and structure. Ideal for edges, feature walls, or flowing compositions, it blends translucency with form, adding movement and elegance to contemporary spaces.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR18.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE4LnBuZyIsImlhdCI6MTc1NzUxMzE1OCwiZXhwIjoxNzg5MDQ5MTU4fQ.c4tCWHRQz86CWkbFf355qJ336GzB5CY2YnrbKSKyVEM",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR18%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE4ICgyKS5wbmciLCJpYXQiOjE3NTc3ODkxNDAsImV4cCI6MTc4OTMyNTE0MH0.hKRWamENyUsBtbMmCx00Y5Hdwa5ye2hf3_7l85L-qyc",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR18%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE4ICgzKS5wbmciLCJpYXQiOjE3NTc3ODkxNDksImV4cCI6MTc4OTMyNTE0OX0.H7uLIyA9mzHNyJvaIWdxsANGQkn0t06DAIRRo9FE_ck",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR18%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE4ICg0KS5wbmciLCJpYXQiOjE3NTc3ODkxNjMsImV4cCI6MTc4OTMyNTE2M30.jE4ZRykDwy6B5Yq6xb5JaFcqHDTi-ObFrIgho63Iwcg",
      ],
    },
    {
      id: "19",
      code: "GRLX-B219",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR19%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE5ICgzKS5wbmciLCJpYXQiOjE3NTc1MTMyMzAsImV4cCI6MTc4OTA0OTIzMH0.uDADt-LY_NcvGbxU_rlx9VSPlR2a63PgfrGpI2juOYg",
      description: "HOT MELT HONEYCOMB TEXTURED GLASS BRICK",
      longDescription:
        "The HOT MELT Honeycomb Textured Glass Brick brings light to life through its intricate cellular pattern. Its honeycomb surface scatters reflections into geometric rhythms, creating playful shadows and visual depth. Both functional and decorative, it transforms walls and partitions into statement features that celebrate texture and pattern.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR19%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE5ICgzKS5wbmciLCJpYXQiOjE3NTc1MTMyMzAsImV4cCI6MTc4OTA0OTIzMH0.uDADt-LY_NcvGbxU_rlx9VSPlR2a63PgfrGpI2juOYg",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR19%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE5ICgyKS5wbmciLCJpYXQiOjE3NTc3ODkyMTUsImV4cCI6MTc4OTMyNTIxNX0.dG5RgdtIF30r5lIHejegy5VB0lXib-Fe-YAfd_UxqKk",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR19.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE5LnBuZyIsImlhdCI6MTc1Nzc4OTI2OCwiZXhwIjoxNzg5MzI1MjY4fQ.P94406f_03gAhVnMt0wgNSWaBtWNPuCZVq1LfrfomeA",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR19%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjE5ICg0KS5wbmciLCJpYXQiOjE3NTc3ODkyMzgsImV4cCI6MTc4OTMyNTIzOH0.gSLVKAcN0GorpeGs8iOYvUj2hQGNWQLBOhxnxjAUgmM",
      ],
    },
    {
      id: "20",
      code: "GRLX-B220",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR20.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjIwLnBuZyIsImlhdCI6MTc1NzUxMzI5MywiZXhwIjoxNzg5MDQ5MjkzfQ.jBpq2ABwwaks4GMc-RhM9rytuVmil80Wblvx70gRqkw",
      description: "HOT MELT GRANITE TEXTURED GLASS BRICK",
      longDescription:
        "The HOT MELT Granite Textured Glass Brick conveys raw strength and tactile character. Its rugged surface recalls the natural feel of stone, diffusing light with subtle opacity while adding architectural depth. Perfect for designs that embrace materiality and texture, it offers a balance of durability, privacy, and understated elegance.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR20.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjIwLnBuZyIsImlhdCI6MTc1NzUxMzI5MywiZXhwIjoxNzg5MDQ5MjkzfQ.jBpq2ABwwaks4GMc-RhM9rytuVmil80Wblvx70gRqkw",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR20%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjIwICgyKS5wbmciLCJpYXQiOjE3NTc3ODkzMTQsImV4cCI6MTc4OTMyNTMxNH0.csBWNFxYVrBQCt9Yu4vmzl6wfAwf56GpB69Dd0GpQ-0",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR20%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjIwICgzKS5wbmciLCJpYXQiOjE3NTc3ODkzMjcsImV4cCI6MTc4OTMyNTMyN30.M10XUux2lcGOIOAwgX449vaTKISbTMP7Np-LhxWC8Y8",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR20%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjIwICg0KS5wbmciLCJpYXQiOjE3NTc3ODkzMzgsImV4cCI6MTc4OTMyNTMzOH0._tf0rTx_uejRAq-b1c5dRggqz6og2srfG4u795kc5xs",
      ],
    },
    {
      id: "21",
      code: "GRLX-B221",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR21.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjIxLnBuZyIsImlhdCI6MTc1NzUxMzM1MCwiZXhwIjoxNzg5MDQ5MzUwfQ.bKfkr2M3URQ5txN9M1jAOmkTgPvnON2W2qHJIMUK8e4",
      description: "HOT MELT OVERSIZED CLEAR GLASS BRICK",
      longDescription:
        "The HOT MELT Oversized Clear Glass Brick commands attention with its generous scale and crystalline purity. Allowing light to flow seamlessly through its larger form, it creates a bold architectural presence while maintaining a clean, transparent aesthetic. Ideal for expansive walls, partitions, or striking installations, it turns scale into a design statement of clarity and strength.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR21.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjIxLnBuZyIsImlhdCI6MTc1NzUxMzM1MCwiZXhwIjoxNzg5MDQ5MzUwfQ.bKfkr2M3URQ5txN9M1jAOmkTgPvnON2W2qHJIMUK8e4",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR21%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjIxICgyKS5wbmciLCJpYXQiOjE3NTc3ODkzODUsImV4cCI6MTc4OTMyNTM4NX0.FD_Vc6gSUg0tvq_BfqgR9YwtjynKQdB_MXMhX9-2x_I",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR21%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjIxICgzKS5wbmciLCJpYXQiOjE3NTc3ODkzOTksImV4cCI6MTc4OTMyNTM5OX0.9Z6K9TgoAA7yw2U9NV9oWFzde6o-GWn27mbmKTo0HzM",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR21%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjIxICg0KS5wbmciLCJpYXQiOjE3NTc3ODk0MTEsImV4cCI6MTc4OTMyNTQxMX0.mC8B8eDk6iDL9UVHuHQoR7W9o6andnS6aE4rUihFCCk",
      ],
    },
    {
      id: "22",
      code: "GRLX-B222",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR22.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjIyLnBuZyIsImlhdCI6MTc1NzUxMzQyMywiZXhwIjoxNzg5MDQ5NDIzfQ.V6y1Uzvf5kpCcOBDu9Qg5oQayoPYThxBTN7wlAibxNo",
      description: "HOT MELT OVERSIZED GRANITE TEXTURED GLASS BRICK",
      longDescription:
        "The HOT MELT Oversized Granite Textured Glass Brick unites scale with material depth. Its large format and rugged granite-like surface provide both privacy and architectural boldness. Light filters gently through its textured body, creating an interplay of translucency and solidity. Perfect for monumental walls or statement features, it conveys strength, permanence, and refined tactility.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR22.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjIyLnBuZyIsImlhdCI6MTc1NzUxMzQyMywiZXhwIjoxNzg5MDQ5NDIzfQ.V6y1Uzvf5kpCcOBDu9Qg5oQayoPYThxBTN7wlAibxNo",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR22%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjIyICgyKS5wbmciLCJpYXQiOjE3NTc3ODk0NTAsImV4cCI6MTc4OTMyNTQ1MH0.Dr_ooYdjIuaOrmE4h__dMUH8NOW7UAFWaohxZSZpdKw",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR22%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjIyICgzKS5wbmciLCJpYXQiOjE3NTc3ODk0NjAsImV4cCI6MTc4OTMyNTQ2MH0.oiRD51zPrYD6QfRshPNOCDm2VkDyzUkK0W_1U-ew7bs",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR22%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjIyICg0KS5wbmciLCJpYXQiOjE3NTc3ODk0OTcsImV4cCI6MTc4OTMyNTQ5N30.NhfSSJXT9w97jj1MG8W44-J2drlL1CR_T0Cj-ugcPug",
      ],
    },
    {
      id: "23",
      code: "GRLX-B223",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR23.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjIzLnBuZyIsImlhdCI6MTc1NzUxMzQ5MCwiZXhwIjoxNzg5MDQ5NDkwfQ.Zu17rtBL6rHL27js4gEbiy_3mctp0KR6P-VDcH8CIOM",
      description: "HOT MELT OVERSIZED DOUBLE-STUD GLASS BRICK",
      longDescription:
        "The HOT MELT Oversized Double-Stud Glass Brick combines scale with technical clarity. Its enlarged format and dual internal studs emphasize strength, order, and transparency. Designed for bold architectural features, it turns structure into design, offering a refined balance between monumental presence and crystalline precision.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR23.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjIzLnBuZyIsImlhdCI6MTc1NzUxMzQ5MCwiZXhwIjoxNzg5MDQ5NDkwfQ.Zu17rtBL6rHL27js4gEbiy_3mctp0KR6P-VDcH8CIOM",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR23%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjIzICgyKS5wbmciLCJpYXQiOjE3NTc3ODk2MTcsImV4cCI6MTc4OTMyNTYxN30._6H8cp33H5M2W7L2vu7Ss3-8WkjqoC-Z8yYoPpHBU6s",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR23%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjIzICgzKS5wbmciLCJpYXQiOjE3NTc3ODk1NjcsImV4cCI6MTc4OTMyNTU2N30.rrVp1zsEVDCnp295DawJgImg1z5DctUdnH7BELZxL00",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR23%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjIzICg0KS5wbmciLCJpYXQiOjE3NTc3ODk1NzgsImV4cCI6MTc4OTMyNTU3OH0.nhcE39HI2m12vRzHblVwATvcMIws-dlC16lXGyRx3UI",
      ],
    },
    {
      id: "24",
      code: "GRLX-B224",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR24.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjI0LnBuZyIsImlhdCI6MTc1NzUxMzU3NSwiZXhwIjoxNzg5MDQ5NTc1fQ.UBeaWFmMlIfzULks9NX0-_HTJnPCK3TInFPCtRszeow",
      description: "HOT MELT NARROW CLEAR RIBBED GLASS BRICK",
      longDescription:
        "The HOT MELT Narrow Clear Ribbed Glass Brick introduces elegance through proportion and detail. Its slender format enhances verticality, while the ribbed surface channels light into refined linear patterns. Perfect for accent walls, partitions, or compositions that demand subtle sophistication, it balances clarity with rhythm in a graceful architectural form.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR24.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjI0LnBuZyIsImlhdCI6MTc1NzUxMzU3NSwiZXhwIjoxNzg5MDQ5NTc1fQ.UBeaWFmMlIfzULks9NX0-_HTJnPCK3TInFPCtRszeow",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR24%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjI0ICgyKS5wbmciLCJpYXQiOjE3NTc3ODk3MzAsImV4cCI6MTc4OTMyNTczMH0.gSqMKkjMEPlnetT5MWsLIju4-o1SSaj_NPpGSJUPYZg",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR24%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjI0ICgzKS5wbmciLCJpYXQiOjE3NTc3ODk3NDQsImV4cCI6MTc4OTMyNTc0NH0.RyOYSdrB6qSy9AfjZbbp3GdKfHqB0B-reqAginjVV4M",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR24%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjI0ICg0KS5wbmciLCJpYXQiOjE3NTc3ODk3NjAsImV4cCI6MTc4OTMyNTc2MH0.7KG2orfUy4-fBX-ZyhHTqFg6_Bw-wJJFpN_XvgXnv2w",
      ],
    },
    {
      id: "25",
      code: "GRLX-B225",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR25.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjI1LnBuZyIsImlhdCI6MTc1NzUxMzY1MCwiZXhwIjoxNzg5MDQ5NjUwfQ.N1mmMyM8xH7mKEC5ZAhwnH6hDB3Gsp4D0xml5uWpHuU",
      description: "HOT MELT NARROW CRACKLE GLASS BRICK",
      longDescription:
        "The HOT MELT Narrow Crackle Glass Brick captivates with its crystalline network of fractures. Its elongated form adds elegance, while the crackled texture scatters light into sparkling reflections that shift throughout the day. A bold architectural element, it blends structure with artistry, turning walls and partitions into luminous, dynamic features.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR25.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjI1LnBuZyIsImlhdCI6MTc1NzUxMzY1MCwiZXhwIjoxNzg5MDQ5NjUwfQ.N1mmMyM8xH7mKEC5ZAhwnH6hDB3Gsp4D0xml5uWpHuU",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR25%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjI1ICgyKS5wbmciLCJpYXQiOjE3NTc3ODk4MDQsImV4cCI6MTc4OTMyNTgwNH0.RNM50J1oTZQUiHJeulApspZaZwF0YyOr2koUUp-mDKY",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR25%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjI1ICgzKS5wbmciLCJpYXQiOjE3NTc3ODk4MTUsImV4cCI6MTc4OTMyNTgxNX0.aE_qhWInNSz-MpPmjsyMYS7JVxrdLVVWDqvE1V-JfAQ",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR25%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjI1ICg0KS5wbmciLCJpYXQiOjE3NTc3ODk4MjUsImV4cCI6MTc4OTMyNTgyNX0.XmrfGLFwXaXrki86LGaT3h1KRyY7VnV_LuKkR6B2o-w",
      ],
    },
    {
      id: "26",
      code: "GRLX-A101",
      name: "Color Series",
      category: "Color Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS001.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwMS5wbmciLCJpYXQiOjE3NTc1MTM5NTgsImV4cCI6MTc4OTA0OTk1OH0.KuT7Uqpl3eCr-IVlvtyNJTmJX9P6pkQavEfCtVYDPoA",
      description: "CRYSTAL RED GLASS BRICK",
      longDescription:
        "The CRYSTAL Red Glass Brick radiates passion and boldness. Its vivid ruby hue catches the eye instantly, transforming walls and partitions into vibrant design statements. With its translucent body, it balances intensity with luminosity, allowing light to flow through while enriching spaces with warmth and energy. Perfect for interiors that embrace drama, creativity, and modern luxury.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS001.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwMS5wbmciLCJpYXQiOjE3NTc1MTM5NTgsImV4cCI6MTc4OTA0OTk1OH0.KuT7Uqpl3eCr-IVlvtyNJTmJX9P6pkQavEfCtVYDPoA",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS001%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwMSAoMikucG5nIiwiaWF0IjoxNzU3NzkwMjk0LCJleHAiOjE3ODkzMjYyOTR9.LDDZZhS632d3mMIZu3X6e5ZBrcdxtSxDhkXdU8S2ZYQ",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS001%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwMSAoMykucG5nIiwiaWF0IjoxNzU3NzkwMzA2LCJleHAiOjE3ODkzMjYzMDZ9.COee4-vHFVC2t24sKRfgBJhJ9onB7Sm8COViL1BjTAU",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS001%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwMSAoNCkucG5nIiwiaWF0IjoxNzU3NzkwMzI2LCJleHAiOjE3ODkzMjYzMjZ9.ZAh2DDnULeUtOiO_yWnaqgwpakSZrQ6RTOtslqectHI",
      ],
    },
    {
      id: "27",
      code: "GRLX-A102",
      name: "Color Series",
      category: "Color Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS002.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwMi5wbmciLCJpYXQiOjE3NTc1MTQwMTYsImV4cCI6MTc4OTA1MDAxNn0.Jh4qDLmWS6iCRluRW2UJxUyoK4_5vSyA_seKzt0Kxxw",
      description: "CRYSTAL YELLOW GLASS BRICK",
      longDescription:
        "The CRYSTAL Yellow Glass Brick shines with radiant warmth and optimism. Its golden hue fills spaces with light and positivity, creating cheerful architectural accents that feel both modern and timeless. Allowing brightness to pass through effortlessly, it transforms ordinary surfaces into luminous features, perfect for interiors that celebrate joy, energy, and bold design.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS002.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwMi5wbmciLCJpYXQiOjE3NTc1MTQwMTYsImV4cCI6MTc4OTA1MDAxNn0.Jh4qDLmWS6iCRluRW2UJxUyoK4_5vSyA_seKzt0Kxxw",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS002%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwMiAoMikucG5nIiwiaWF0IjoxNzU3NzkwMzkxLCJleHAiOjE3ODkzMjYzOTF9.oq1kTy_nmJg2vwT04ebCnEkNvQBFv5P1gUWBELDEFvI",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS002%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwMiAoMykucG5nIiwiaWF0IjoxNzU3NzkwNDE4LCJleHAiOjE3ODkzMjY0MTh9.CoGMbTacFZsdkDBQAALi9_ihSVHexqv3hQwBypE7ASM",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS002%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwMiAoNCkucG5nIiwiaWF0IjoxNzU3NzkwNDMzLCJleHAiOjE3ODkzMjY0MzN9.3u07deJX3fv7ICKBU9OqzaQJnugpJln8D-UYmcg8S6U",
      ],
    },
    {
      id: "28",
      code: "GRLX-A103",
      name: "Color Series",
      category: "Color Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS003.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwMy5wbmciLCJpYXQiOjE3NTc1MTQwNzksImV4cCI6MTc4OTA1MDA3OX0.xkqZRw8YD8zCc55yQuD35aAS4otzwiCVtRLAQvU5O1Q",
      description: "CRYSTAL BLUE GLASS BRICK",
      longDescription:
        "The CRYSTAL Blue Glass Brick evokes calm and sophistication with its deep, serene hue. Its translucent body filters light into cool tones, creating a tranquil atmosphere that feels refined and contemporary. Perfect for feature walls, partitions, or artistic accents, it adds clarity and elegance, making spaces feel both expansive and composed.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS003.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwMy5wbmciLCJpYXQiOjE3NTc1MTQwNzksImV4cCI6MTc4OTA1MDA3OX0.xkqZRw8YD8zCc55yQuD35aAS4otzwiCVtRLAQvU5O1Q",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS003%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwMyAoMikucG5nIiwiaWF0IjoxNzU3NzkwNTA4LCJleHAiOjE3ODkzMjY1MDh9.8QjZPCFzdl4ICjT3q9ZltlPMHA0UursRdaq4SGxDhaE",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS003%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwMyAoMykucG5nIiwiaWF0IjoxNzU3NzkwNTIyLCJleHAiOjE3ODkzMjY1MjJ9.ua-SeyXK0_rgyoD69XOUGoykNZUiG_0a-g2o2EeRuoY",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS003%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwMyAoNCkucG5nIiwiaWF0IjoxNzU3NzkwNTM1LCJleHAiOjE3ODkzMjY1MzV9.1IF9GI9lokF4p-6h7Aj9YOB9zxCu1ELiWi_H7R_zHDQ",
      ],
    },
    {
      id: "29",
      code: "GRLX-A104",
      name: "Color Series",
      category: "Color Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS004.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwNC5wbmciLCJpYXQiOjE3NTc1MTQxNDQsImV4cCI6MTc4OTA1MDE0NH0.MHSV2W8mxVBf_vf3ogxzifP6xmGQtIOhwbna8kkM0Nc",
      description: "CRYSTAL GREEN GLASS BRICK",
      longDescription:
        "The CRYSTAL Green Glass Brick brings a refreshing touch of nature into architectural design. Its translucent emerald hue filters light into soft, organic tones, creating spaces that feel vibrant yet calming. Perfect for interiors inspired by natural harmony, it adds freshness, balance, and a timeless elegance to walls, partitions, and decorative feature.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS004.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwNC5wbmciLCJpYXQiOjE3NTc1MTQxNDQsImV4cCI6MTc4OTA1MDE0NH0.MHSV2W8mxVBf_vf3ogxzifP6xmGQtIOhwbna8kkM0Nc",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS004%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwNCAoMikucG5nIiwiaWF0IjoxNzU3NzkwNTkzLCJleHAiOjE3ODkzMjY1OTN9.PlmRS7roWG2loNoNJU7ZQwPHJTF_PXESyPnmIuwS--Q",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS004%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwNCAoMykucG5nIiwiaWF0IjoxNzU3NzkwNjA1LCJleHAiOjE3ODkzMjY2MDV9.xvgYWLTnzrglmITFcG2RHE31CY09VwkzMZiPJuRq0Hs",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS004%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwNCAoNCkucG5nIiwiaWF0IjoxNzU3NzkwNjE5LCJleHAiOjE3ODkzMjY2MTl9.kfolqOt3yq48AwfavWf5iVnn-mXoMkysg0_Pnprd7pY",
      ],
    },
    {
      id: "30",
      code: "GRLX-A105",
      name: "Color Series",
      category: "Color Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS005.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwNS5wbmciLCJpYXQiOjE3NTc1MTQyMTUsImV4cCI6MTc4OTA1MDIxNX0._qne51x3vFyu-kl4e9NdeGLP2dFnjLrGY02pyKIVTSk",
      description: "CRYSTAL SQUARE GREEN GLASS BRICK",
      longDescription:
        "The CRYSTAL Square Green Glass Brick combines vibrant color with strong geometry. Its square format introduces balance and precision, while the fresh green tone infuses interiors with natural energy. Ideal for patterned walls or decorative compositions, it transforms structure into design, offering both functionality and bold visual rhythm.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS005.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwNS5wbmciLCJpYXQiOjE3NTc1MTQyMTUsImV4cCI6MTc4OTA1MDIxNX0._qne51x3vFyu-kl4e9NdeGLP2dFnjLrGY02pyKIVTSk",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS005%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwNSAoMikucG5nIiwiaWF0IjoxNzU3NzkwNzIxLCJleHAiOjE3ODkzMjY3MjF9.6WA3ulXuQfBJ0S_Jn8RSsXyT3tVaOLG9cx102a3opRc",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS005%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwNSAoMykucG5nIiwiaWF0IjoxNzU3NzkwNjc1LCJleHAiOjE3ODkzMjY2NzV9.RgflchfwkTz1DZMm8RdTD39ghyodHxNr2Lm_5xqHgUM",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS005%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwNSAoNCkucG5nIiwiaWF0IjoxNzU3NzkwNjkzLCJleHAiOjE3ODkzMjY2OTN9.6KeOZNombbWz2uN9rEi8uRgm3tL3-6fCy1N6nlFAxA8",
      ],
    },
    {
      id: "31",
      code: "GRLX-A106",
      name: "Color Series",
      category: "Color Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS006.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwNi5wbmciLCJpYXQiOjE3NTc1MTQyODAsImV4cCI6MTc4OTA1MDI4MH0.k5noyQLA8KFR83bhSS3ayVM5_8G9aO0TkKa2xGqMHkg",
      description: "CRYSTAL SQUARE GREY GLASS BRICK",
      longDescription:
        "The CRYSTAL Square Grey Glass Brick embodies minimalism and refined elegance. Its neutral grey tone adapts effortlessly to any palette, while the square geometry provides balance and order. Perfect for contemporary interiors, it adds a subtle architectural presence that enhances light without overwhelming the design—an understated choice for timeless sophistication.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS006.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwNi5wbmciLCJpYXQiOjE3NTc1MTQyODAsImV4cCI6MTc4OTA1MDI4MH0.k5noyQLA8KFR83bhSS3ayVM5_8G9aO0TkKa2xGqMHkg",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS006%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwNiAoMikucG5nIiwiaWF0IjoxNzU3NzkwNzc5LCJleHAiOjE3ODkzMjY3Nzl9.pGo3FExYgFGbFTCNnWm_9KSNDdIX9ByYUj9SqtWsfMU",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS006%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwNiAoMykucG5nIiwiaWF0IjoxNzU3NzkwNzkxLCJleHAiOjE3ODkzMjY3OTF9.Q7qgXFWtnUSBuUMY_mwOOb7MMXCT27mX19HbvaUqhBw",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS006%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwNiAoNCkucG5nIiwiaWF0IjoxNzU3NzkwODM2LCJleHAiOjE3ODkzMjY4MzZ9.NZzj7aJzvTK5xBlZkoWN6IN9bYE1Y6BnXtJ6kz8Gs4w",
      ],
    },
    {
      id: "32",
      code: "GRLX-A107",
      name: "ColorSeries",
      category: "Color Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS007.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwNy5wbmciLCJpYXQiOjE3NTc1MTQzNjMsImV4cCI6MTc4OTA1MDM2M30.SvrEq6FGdQHVA1VQ_9Fr5hjV-I-Z3cgnQidFb3qGHnk",
      description: "CRYSTAL SQUARE ORANGE GLASS BRICK",
      longDescription:
        "The CRYSTAL Square Orange Glass Brick radiates energy and creativity. Its vivid hue brings warmth and excitement into interiors, while the square geometry adds structure and balance. Designed for bold compositions, it transforms walls and partitions into lively focal points, making spaces feel dynamic, modern, and full of character.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS007.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwNy5wbmciLCJpYXQiOjE3NTc1MTQzNjMsImV4cCI6MTc4OTA1MDM2M30.SvrEq6FGdQHVA1VQ_9Fr5hjV-I-Z3cgnQidFb3qGHnk",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS007%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwNyAoMikucG5nIiwiaWF0IjoxNzU3NzkxMTYxLCJleHAiOjE3ODkzMjcxNjF9.tpDCaSuSYv6BIdEnHkmzJZDQV25Kf6FjtINpqsle-r0",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS007%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwNyAoMykucG5nIiwiaWF0IjoxNzU3NzkxMTcyLCJleHAiOjE3ODkzMjcxNzJ9.2DZBQuyM2RtVntDL5lL_BcQIJaCwLutiGg_i-3pGCGw",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS007%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwNyAoNCkucG5nIiwiaWF0IjoxNzU3NzkxMTg1LCJleHAiOjE3ODkzMjcxODV9.1VeQTDMvalpBYwXFsYmnPecvlCc6SAY1wa_t5AMSvZQ",
      ],
    },
    {
      id: "33",
      code: "GRLX-A108",
      name: "Color Series",
      category: "Color Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS008.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwOC5wbmciLCJpYXQiOjE3NTc1MTQ0MjgsImV4cCI6MTc4OTA1MDQyOH0.m6uHxMYjFNgbMet1S5zdjvz1UYRTZqk1lqRg7x1DfeI",
      description: "CRYSTAL SQUARE PURPLE GLASS BRICK",
      longDescription:
        "The CRYSTAL Square Purple Glass Brick exudes luxury and mystery. Its deep, regal tone enriches interiors with sophistication, while the square format adds precision and order. Perfect for statement walls or decorative features, it transforms light into a dramatic accent, making spaces feel both opulent and intriguing.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS008.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwOC5wbmciLCJpYXQiOjE3NTc1MTQ0MjgsImV4cCI6MTc4OTA1MDQyOH0.m6uHxMYjFNgbMet1S5zdjvz1UYRTZqk1lqRg7x1DfeI",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS008%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwOCAoMikucG5nIiwiaWF0IjoxNzU3NzkxMjY0LCJleHAiOjE3ODkzMjcyNjR9.2eYX9aIwvyvSgAmbH3OYsEeirdblPjzV5Antx0sr0pY",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS008%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwOCAoMykucG5nIiwiaWF0IjoxNzU3NzkxMjc3LCJleHAiOjE3ODkzMjcyNzd9.gZgoJZwmGMrlsbdyD5K5kX066FCdfZfHB-bRBEFiXxg",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/bs%20codes/BS008%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJicyBjb2Rlcy9CUzAwOCAoNCkucG5nIiwiaWF0IjoxNzU3NzkxMjg5LCJleHAiOjE3ODkzMjcyODl9.8Gc_mVDecSXTDbPPaZHGTVXLelCKETPMg8huzsAsB_o",
      ],
    },
    {
      id: "34",
      code: "GRLX-D402",
      name: "Color Series",
      category: "Color Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS002.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDAyLnBuZyIsImlhdCI6MTc1NzUxNTY4NiwiZXhwIjoxNzg5MDUxNjg2fQ.90eDTdXVN-jYCgNmhc_jwtGG9v5QRiKkmVilYkMmSdI",
      description: "ROASTED RED GLASS BRICK",
      longDescription:
        "The Roasted Red Glass Brick is bold, passionate, and intensely radiant. Its deep crimson tone transforms light into a warm, fiery glow, instantly commanding attention. Perfect for feature walls, artistic partitions, or vibrant accents, this brick brings both drama and elegance to contemporary and classic design.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS002.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDAyLnBuZyIsImlhdCI6MTc1NzUxNTY4NiwiZXhwIjoxNzg5MDUxNjg2fQ.90eDTdXVN-jYCgNmhc_jwtGG9v5QRiKkmVilYkMmSdI",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS002%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDAyICgyKS5wbmciLCJpYXQiOjE3NTc3OTE1NDEsImV4cCI6MTc4OTMyNzU0MX0.JNvjnnRvQqSG6Oja2HHhqwstxd1T_d1cbf4Ko4XH_FU",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS002%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDAyICgzKS5wbmciLCJpYXQiOjE3NTc3OTE1NTEsImV4cCI6MTc4OTMyNzU1MX0.ezy7t0OccVfTAibNTNDr0H0LSMUDJZTkPXjMQHli_Ho",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS002%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDAyICg0KS5wbmciLCJpYXQiOjE3NTc3OTE1NjMsImV4cCI6MTc4OTMyNzU2M30.DffVzZxTw1x0d0g_X77GXulmZLb9j0qiOMiMRdw9icA",
      ],
    },
    {
      id: "35",
      code: "GRLX-D403",
      name: "Color Series",
      category: "Color Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS003.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDAzLnBuZyIsImlhdCI6MTc1NzUxNTc2MCwiZXhwIjoxNzg5MDUxNzYwfQ.hR1CHcbdJhJvYtMnscPCxmWpS3dgKxRqDyScSrn-IAA",
      description: "ROASTED AMBER GLASS BRICK",
      longDescription:
        "Glowing with timeless sophistication, the Roasted Amber Glass Brick radiates warmth and balance. Its golden-orange hue captures the essence of glowing embers, infusing interiors with a welcoming, luxurious atmosphere. Ideal for spaces where light and texture meet harmony, it creates an unforgettable architectural impact.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS003.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDAzLnBuZyIsImlhdCI6MTc1NzUxNTc2MCwiZXhwIjoxNzg5MDUxNzYwfQ.hR1CHcbdJhJvYtMnscPCxmWpS3dgKxRqDyScSrn-IAA",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS003%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDAzICgyKS5wbmciLCJpYXQiOjE3NTc3OTE2MTcsImV4cCI6MTc4OTMyNzYxN30.QogMVoxn83QU-2DMa55yhoK98c9YxRGbqNg50vfqiXQ",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS003%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDAzICgzKS5wbmciLCJpYXQiOjE3NTc3OTE2MjksImV4cCI6MTc4OTMyNzYyOX0.NoxVyRr0A6uKphTGIlrUAXpAne8FMXA1Sqa5P2_T8YQ",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS003%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDAzICg0KS5wbmciLCJpYXQiOjE3NTc3OTE2NDMsImV4cCI6MTc4OTMyNzY0M30.TAtBD5VNygwh7a6sbbNoJVTfHGWkdLvHKfU8XKNl-Jo",
      ],
    },
    {
      id: "36",
      code: "GRLX-D404",
      name: "Color Series",
      category: "Color Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS004.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA0LnBuZyIsImlhdCI6MTc1NzUxNTgyNCwiZXhwIjoxNzg5MDUxODI0fQ.ULODOgNhQ9CYKTMVfQp2AIH26365de0D6i2Vvfiu1HI",
      description: "ROASTED ORANGE GLASS BRICK",
      longDescription:
        "Energetic and striking, the Roasted Orange Glass Brick embodies vibrancy and creativity. Its rich citrus-inspired tone adds life to any design, catching the eye with dynamic warmth. Whether used as a focal point or as a complementary accent, it creates an uplifting atmosphere that energizes modern space.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS004.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA0LnBuZyIsImlhdCI6MTc1NzUxNTgyNCwiZXhwIjoxNzg5MDUxODI0fQ.ULODOgNhQ9CYKTMVfQp2AIH26365de0D6i2Vvfiu1HI",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS004%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA0ICgyKS5wbmciLCJpYXQiOjE3NTc3OTE2OTEsImV4cCI6MTc4OTMyNzY5MX0.jZn1M3oZuGBz1AruX8VUIvTda6uWmfwwroIOk_FqtNA",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS004%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA0ICgzKS5wbmciLCJpYXQiOjE3NTc3OTE3MDMsImV4cCI6MTc4OTMyNzcwM30.4Vt6SqjhtREKjUno0krL1jIysfrSUE6QVz8mPcnvQeM",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS004%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA0ICg0KS5wbmciLCJpYXQiOjE3NTc3OTE3MTUsImV4cCI6MTc4OTMyNzcxNX0.cLvOS7cceTH6mUMlwtiHKJR__QQ-A662FS5-cW3SCsI",
      ],
    },
    {
      id: "37",
      code: "GRLX-D405",
      name: "Color Series",
      category: "Color Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS005.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA1LnBuZyIsImlhdCI6MTc1NzUxNTg5NywiZXhwIjoxNzg5MDUxODk3fQ.zumQmLYgvKNG0dd5kXJ9TY9u0L464UC9r_uy95QjpAE",
      description: "ROASTED TEXTURED BLUE GLASS BRICK",
      longDescription:
        "The Roasted Textured Blue Glass Brick offers depth and character with its crystalline surface. Its unique texture enhances the play of light, creating shimmering aquatic reflections. A stunning blend of artistry and structure, this brick is perfect for feature installations that require both elegance and originality.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS005.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA1LnBuZyIsImlhdCI6MTc1NzUxNTg5NywiZXhwIjoxNzg5MDUxODk3fQ.zumQmLYgvKNG0dd5kXJ9TY9u0L464UC9r_uy95QjpAE",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS005%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA1ICgyKS5wbmciLCJpYXQiOjE3NTc3OTE3OTIsImV4cCI6MTc4OTMyNzc5Mn0.9YXkyNkNxnMq_2mpKvBw_kbX7w6_sGtMDAZSKkskw4Q",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS005%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA1ICgzKS5wbmciLCJpYXQiOjE3NTc3OTE4MDIsImV4cCI6MTc4OTMyNzgwMn0.U5bcC-7PxYrEiMra1eVfw3eZLE9q-qvbKZhuoErDNRE",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS005%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA1ICg0KS5wbmciLCJpYXQiOjE3NTc3OTE4MTgsImV4cCI6MTc4OTMyNzgxOH0.6BSjTowaMdPMMNmtjzmMJb92BA4THaIUSEgLJLctZks",
      ],
    },
    {
      id: "38",
      code: "GRLX-D406",
      name: "Color Series",
      category: "Color Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS006.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA2LnBuZyIsImlhdCI6MTc1NzUxNTk3NiwiZXhwIjoxNzg5MDUxOTc2fQ.K6juV_bziT2vUkyZE7sP3GjZWDD22CweY10WWCuzjuQ",
      description: "ROASTED BLUE GLASS BRICK",
      longDescription:
        "Classic and regal, the Roasted Blue Glass Brick captivates with its bold sapphire tone. Smooth and radiant, it adds drama and sophistication to architectural elements. Ideal for bold statements, its striking hue pairs beautifully with both modern minimalism and timeless design concepts.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS006.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA2LnBuZyIsImlhdCI6MTc1NzUxNTk3NiwiZXhwIjoxNzg5MDUxOTc2fQ.K6juV_bziT2vUkyZE7sP3GjZWDD22CweY10WWCuzjuQ",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS006%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA2ICgyKS5wbmciLCJpYXQiOjE3NTc3OTE4NjIsImV4cCI6MTc4OTMyNzg2Mn0.cjDTNOqeFgVtiuNf2cR8-l5-HjSHCoE6BSCgMvhaK14",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS006%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA2ICgzKS5wbmciLCJpYXQiOjE3NTc3OTE4NzIsImV4cCI6MTc4OTMyNzg3Mn0.3N0RdPG2o7x-zSLWvuqzNudGASJCDYEtE7UckrhMDfE",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS006%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA2ICg0KS5wbmciLCJpYXQiOjE3NTc3OTE4ODgsImV4cCI6MTc4OTMyNzg4OH0.jH1Svp1AWKOw3wza8xdQfclvB5vYdp83D175n03HcEs",
      ],
    },
    {
      id: "39",
      code: "GRLX-D407",
      name: "Color Series",
      category: "Color Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS007.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA3LnBuZyIsImlhdCI6MTc1NzUxNjA1NywiZXhwIjoxNzg5MDUyMDU3fQ.CaqEjrce0InCIof1EVzvRkPi7XNklEHUfh5jIKe48tc",
      description: "ROASTED GREEN GLASS BRICK",
      longDescription:
        "Inspired by nature's vibrancy, the Roasted Green Glass Brick exudes harmony and freshness. Its emerald hue brings balance and tranquility, perfect for spaces seeking organic inspiration. This brick embodies vitality, making it ideal for both calming sanctuaries and dynamic architectural features.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS007.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA3LnBuZyIsImlhdCI6MTc1NzUxNjA1NywiZXhwIjoxNzg5MDUyMDU3fQ.CaqEjrce0InCIof1EVzvRkPi7XNklEHUfh5jIKe48tc",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS007%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA3ICgyKS5wbmciLCJpYXQiOjE3NTc3OTE5MzksImV4cCI6MTc4OTMyNzkzOX0.hV5V0kTfcCo-NNASbReFPiu3mQO1V5Gb3uyAVTTV4sA",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS007%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA3ICgzKS5wbmciLCJpYXQiOjE3NTc3OTE5NTIsImV4cCI6MTc4OTMyNzk1Mn0.SyrUb2gLRVpTn_8v41bsAWzOKQGAP3SO3NYcyGlPTzE",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS007%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA3ICg0KS5wbmciLCJpYXQiOjE3NTc3OTE5NjUsImV4cCI6MTc4OTMyNzk2NX0.W_2kjcKot0yJt5KoMgsTok7L7pibdXTALPnB47LPd8Q",
      ],
    },
    {
      id: "40",
      code: "GRLX-LEIPEI400",
      name: "Color Series",
      category: "Color Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/ks%20code/KS007.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJrcyBjb2RlL0tTMDA3LnBuZyIsImlhdCI6MTc1NzUxNjA1NywiZXhwIjoxNzg5MDUyMDU3fQ.CaqEjrce0InCIof1EVzvRkPi7XNklEHUfh5jIKe48tc",
      description: "TO MOB POU LEIPEI",
      longDescription:
        "The HOT MELT Reflective Glass Brick is defined by its smooth, polished clarity that catches and amplifies light. Its sleek surface enhances brightness and introduces a subtle reflective quality, giving walls and partitions a luminous, spacious feel. A refined choice for contemporary architecture, it balances transparency with radiance, turning simplicity into understated elegance.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/rr%20codes/RR01.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyciBjb2Rlcy9SUjAxLnBuZyIsImlhdCI6MTc1NzUwNzMxNSwiZXhwIjoxNzg5MDQzMzE1fQ.DxnLncrRo9u4OQcZJxCasov6JLlWMYYqHY6nBvuNhrI",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/1%20(144).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEgKDE0NCkuanBnIiwiaWF0IjoxNzU2MzAyNDUxLCJleHAiOjE3ODc4Mzg0NTF9.slt2RsdW0jIMn3gIf4J5YJasNIZ8gFR6kXONADDTVW8",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/10100.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEwMTAwLmpwZyIsImlhdCI6MTc1NjMwMTkzOSwiZXhwIjoxNzg3ODM3OTM5fQ.McGIWePOMQIkTBQeO-nRnMjv6nkUJPJT5kKi1mrH5bo",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/10098.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEwMDk4LmpwZyIsImlhdCI6MTc1NjMwMTkxNSwiZXhwIjoxNzg3ODM3OTE1fQ.MWNQgd_Fo8SrRBfuVK0pbH8BD0BSf-6C2DooLF9-G6Y",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/10101.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEwMTAxLmpwZyIsImlhdCI6MTc1NjMwMTk4MywiZXhwIjoxNzg3ODM3OTgzfQ.fYqUSMw1B0DqtSRy8b4sfXdirSKuvFi5_UifTgnezkI",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/1%20(132).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEgKDEzMikuanBnIiwiaWF0IjoxNzU2MzAyNzU1LCJleHAiOjE3ODc4Mzg3NTV9.5KcjMKxDGScTFDtDvxxQ7iMlWz3joXfoLmgULlYHFaE",
      ],
    },
    {
      id: "41",
      code: "GRLX-E501",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ001.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwMS5wbmciLCJpYXQiOjE3NTc1MTc3NDIsImV4cCI6MTc4OTA1Mzc0Mn0.b3LG5HSS5i-dY6AK6agYHYM5J5fwHKOEigZEfScTJJI",
      description: "FINE-GROUND CLEAR CRYSTAL BRICK",
      longDescription:
        "The Fine-Ground Clear Crystal Brick offers unmatched purity and brilliance, with a flawless surface that highlights the elegance of precision craftsmanship. Its clarity makes it ideal for designs that demand transparency, light play, and a modern, sophisticated finish.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ001.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwMS5wbmciLCJpYXQiOjE3NTc1MTc3NDIsImV4cCI6MTc4OTA1Mzc0Mn0.b3LG5HSS5i-dY6AK6agYHYM5J5fwHKOEigZEfScTJJI",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ001%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwMSAoMikucG5nIiwiaWF0IjoxNzU3NzkyMDYzLCJleHAiOjE3ODkzMjgwNjN9.EMSNNZztRefAknZmfIuGaaN8JhSxMZtX7lksAImBw20",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ001%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwMSAoMykucG5nIiwiaWF0IjoxNzU3NzkyMDcyLCJleHAiOjE3ODkzMjgwNzJ9.v_DPdNQF8ACCEOsBDtwLYoKjWMgVGxjhLfBep4Ifqy0",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ001%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwMSAoNCkucG5nIiwiaWF0IjoxNzU3NzkyMDg3LCJleHAiOjE3ODkzMjgwODd9.3b8ViuBY-WQPm0YAFIAZhERbSo3mQ7C_55pNfrnteKc",
      ],
    },
    {
      id: "42",
      code: "GRLX-E502",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ002.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwMi5wbmciLCJpYXQiOjE3NTc1MTc4MTIsImV4cCI6MTc4OTA1MzgxMn0.Y1OOFMbZF0tECQcxduujTvtFQdswZsyAga9tm3JZIcY",
      description: "FINE-GROUND TEXTURED CRYSTAL BRICK",
      longDescription:
        "The Fine-Ground Textured Crystal Brick combines durability with artistic detail. Its subtle surface texture enhances depth and reflection, giving walls or partitions a luxurious, tactile quality that catches the eye from every angle.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ002.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwMi5wbmciLCJpYXQiOjE3NTc1MTc4MTIsImV4cCI6MTc4OTA1MzgxMn0.Y1OOFMbZF0tECQcxduujTvtFQdswZsyAga9tm3JZIcY",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ002%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwMiAoMikucG5nIiwiaWF0IjoxNzU3NzkyMTM1LCJleHAiOjE3ODkzMjgxMzV9.VM2J0NyPDNmr9BOZnNWazpegNJP3dYYIbYvepvytziw",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ002%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwMiAoMykucG5nIiwiaWF0IjoxNzU3NzkyMTQ1LCJleHAiOjE3ODkzMjgxNDV9.nAH96gHS_Q9esY63B1TBXF5njlBYuI-OGGTjTbLl-_w",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ002%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwMiAoNCkucG5nIiwiaWF0IjoxNzU3NzkyMTYwLCJleHAiOjE3ODkzMjgxNjB9.7U-o84quMkflBbUc7QXMsMsKDqL42hYHZrnN86E6RSg",
      ],
    },
    {
      id: "43",
      code: "GRLX-E503",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ003.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwMy5wbmciLCJpYXQiOjE3NTc1MTg2NDUsImV4cCI6MTc4OTA1NDY0NX0.2KhoG1Y2YRAqFvkOgzEfVqdZsWPIhmM41qGbFTI_Yc4",
      description: "FINE-GROUND LINEAR CRYSTAL BRICK",
      longDescription:
        "The Fine-Ground Linear Crystal Brick features sleek parallel striations that create a dynamic visual rhythm. Perfect for contemporary architecture, it adds both structure and elegance while amplifying natural and artificial light.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ003.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwMy5wbmciLCJpYXQiOjE3NTc1MTg2NDUsImV4cCI6MTc4OTA1NDY0NX0.2KhoG1Y2YRAqFvkOgzEfVqdZsWPIhmM41qGbFTI_Yc4",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ003%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwMyAoMikucG5nIiwiaWF0IjoxNzU3NzkyMjE5LCJleHAiOjE3ODkzMjgyMTl9.SaarS4yubTGmjzSm7IPDpVOp7rj5gMkzrB31nLQQWOI",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ003%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwMyAoMykucG5nIiwiaWF0IjoxNzU3NzkyMjMxLCJleHAiOjE3ODkzMjgyMzF9.d51UIPoS03YOZFb_vz4F0JMw9kie8XAEsUVmFOj2GS0",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ003%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwMyAoNCkucG5nIiwiaWF0IjoxNzU3NzkyMjQxLCJleHAiOjE3ODkzMjgyNDF9.Rs0L1p7w5mvRKw_NqaOIuw9P5Ylj_t1CAt0eAUAO8Yc",
      ],
    },
    {
      id: "44",
      code: "GRLX-E504",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ004.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNC5wbmciLCJpYXQiOjE3NTc1MTc5ODksImV4cCI6MTc4OTA1Mzk4OX0.S9-rYDWUONUlRvVDB6zyQrOK0t7hm26RHzD6y0ji1cE",
      description: "FINE-GROUND SATIN CRYSTAL BRICK",
      longDescription:
        "The Fine-Ground Satin Crystal Brick offers a velvety, frosted surface that diffuses light gently across a space. Its soft, satin glow makes it an excellent choice for environments seeking warmth, privacy, and refined sophistication.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ004.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNC5wbmciLCJpYXQiOjE3NTc1MTc5ODksImV4cCI6MTc4OTA1Mzk4OX0.S9-rYDWUONUlRvVDB6zyQrOK0t7hm26RHzD6y0ji1cE",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ004%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNCAoMikucG5nIiwiaWF0IjoxNzU3NzkyMzExLCJleHAiOjE3ODkzMjgzMTF9.oiae6Dj24_oyoGjS5_gJFTmS2kAUPRIBiHOLmpdR1gM",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ004%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNCAoMykucG5nIiwiaWF0IjoxNzU3NzkyMzIxLCJleHAiOjE3ODkzMjgzMjF9.r9bbcmJwfoh01Sxh8cJtdC-MEDc1uLFsCuHvCepPiP0",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ004%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNCAoNCkucG5nIiwiaWF0IjoxNzU3NzkyMzMyLCJleHAiOjE3ODkzMjgzMzJ9.7e6GPtHYdV8Ps7U38_aIBtI2_Is3b1dSHTLJjFNX3F4",
      ],
    },
    {
      id: "45",
      code: "GRLX-E505",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ005.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNS5wbmciLCJpYXQiOjE3NTc1MTgwODksImV4cCI6MTc4OTA1NDA4OX0.hiJXG8in2k6Gp5VrLKDNS8jnLCxzZdztuSw7NhgXXjA",
      description: "FINE-GROUND OPAL CRYSTAL BRICK",
      longDescription:
        "The Fine-Ground Opal Crystal Brick brings luminous translucency with a smooth, opalescent finish. Ideal for feature walls, this brick blends strength with subtle beauty, casting an ethereal glow that transforms any interior.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ005.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNS5wbmciLCJpYXQiOjE3NTc1MTgwODksImV4cCI6MTc4OTA1NDA4OX0.hiJXG8in2k6Gp5VrLKDNS8jnLCxzZdztuSw7NhgXXjA",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ005%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNSAoMikucG5nIiwiaWF0IjoxNzU3NzkyMzk0LCJleHAiOjE3ODkzMjgzOTR9.-gQushywHv-Xksn5YpWwbf5K2IV1CFuvftXnc5JLj7M",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ005%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNSAoMykucG5nIiwiaWF0IjoxNzU3NzkyNDA1LCJleHAiOjE3ODkzMjg0MDV9.MSsCMwUljqQCwrE0IubGfO3KeuGXHiVe7gPUnSgMWQQ",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ005%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNSAoNCkucG5nIiwiaWF0IjoxNzU3NzkyNDE2LCJleHAiOjE3ODkzMjg0MTZ9.9ymQBFpPdmHkSbbkfK2raIRmhDRtrZRgyjk_NTtNcVU",
      ],
    },
    {
      id: "46",
      code: "GRLX-E506",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ006.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNi5wbmciLCJpYXQiOjE3NTc1MTgxODgsImV4cCI6MTc4OTA1NDE4OH0.zmUF5GJLT_o-xezIWW5HvGzgGT_7YYczpo5L7sz633c",
      description: "FINE-GROUND REFLECTIVE CRYSTAL BRICK",
      longDescription:
        "The Fine-Ground Reflective Crystal Brick functions like a prism of polished light, bouncing reflections with precision. Its mirrored qualities add drama and brilliance, making it the centerpiece of modern luxury projects.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ006.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNi5wbmciLCJpYXQiOjE3NTc1MTgxODgsImV4cCI6MTc4OTA1NDE4OH0.zmUF5GJLT_o-xezIWW5HvGzgGT_7YYczpo5L7sz633c",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ006%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNiAoMikucG5nIiwiaWF0IjoxNzU3NzkzNzU4LCJleHAiOjE3ODkzMjk3NTh9.kNcwlCJK4kBPHfkDI21wI-SwiFJSgBVwIdcYDEBczCo",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ006%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNiAoMykucG5nIiwiaWF0IjoxNzU3NzkzNzY4LCJleHAiOjE3ODkzMjk3Njh9.EqYHXUnE4L79H3LH8ycpB15DoZlWSlbgM-7N3yXk0Tk",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ006%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNiAoNCkucG5nIiwiaWF0IjoxNzU3NzkzNzg2LCJleHAiOjE3ODkzMjk3ODZ9.nEPcldOpZ-n_p1j_PMm_TQaRAnJ0OO23_Y4CKVamHJQ",
      ],
    },
    {
      id: "47",
      code: "GRLX-E507",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ007.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNy5wbmciLCJpYXQiOjE3NTc1MTgyNTksImV4cCI6MTc4OTA1NDI1OX0.UIUP3Zi3BoPl6YoFzJyVJghBAsXh71nDf5OPAqGchB0",
      description: "FINE-GROUND GRID CRYSTAL BRICK",
      longDescription:
        "The Fine-Ground Grid Crystal Brick introduces geometric precision to design, featuring a clear lattice structure that evokes modern elegance. Both functional and artistic, it plays with shadow and transparency for striking visual effects.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ007.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNy5wbmciLCJpYXQiOjE3NTc1MTgyNTksImV4cCI6MTc4OTA1NDI1OX0.UIUP3Zi3BoPl6YoFzJyVJghBAsXh71nDf5OPAqGchB0",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ007%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNyAoMikucG5nIiwiaWF0IjoxNzU3NzkzODM1LCJleHAiOjE3ODkzMjk4MzV9.r9Tsp3uLCYTss9ml3UArCbUu4F3DFQWDcAA8_pJrpNI",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ007%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNyAoMykucG5nIiwiaWF0IjoxNzU3NzkzODQ1LCJleHAiOjE3ODkzMjk4NDV9.FUdFmYoVz4loUrKZkINrjyaUF7W4m80w4wDt_y6QIsg",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ007%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwNyAoNCkucG5nIiwiaWF0IjoxNzU3NzkzODU2LCJleHAiOjE3ODkzMjk4NTZ9.1IUDz_eb7JPA2ZOGLVzaRKVNk3QJ09b4f5uvim5TEMs",
      ],
    },
    {
      id: "48",
      code: "GRLX-E508",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ008.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwOC5wbmciLCJpYXQiOjE3NTc1MTgzOTYsImV4cCI6MTc4OTA1NDM5Nn0.mviXdDK9KF176SRTk2xfw6xr1j6vUwLxOAUZciTzuFM",
      description: "FINE-GROUND DOUBLE-STUD CRYSTAL BRICK",
      longDescription:
        "The Fine-Ground Double-Stud Crystal Brick is designed with distinct internal stud elements that enhance both structure and style. This bold detail makes it a standout option for installations that balance strength and unique design expression.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ008.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwOC5wbmciLCJpYXQiOjE3NTc1MTgzOTYsImV4cCI6MTc4OTA1NDM5Nn0.mviXdDK9KF176SRTk2xfw6xr1j6vUwLxOAUZciTzuFM",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ008%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwOCAoMikucG5nIiwiaWF0IjoxNzU3NzkzODgxLCJleHAiOjE3ODkzMjk4ODF9.XLr1G7SB_re_lqgEYRBPWLTdOobpF0LRzwE4NMYIrkw",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ008%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwOCAoMykucG5nIiwiaWF0IjoxNzU3NzkzOTA3LCJleHAiOjE3ODkzMjk5MDd9.fUO9USxQxcV-FZmcaDxFtY1oLvoHTsKFDfREDMrJl-I",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ008%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwOCAoNCkucG5nIiwiaWF0IjoxNzU3NzkzOTIyLCJleHAiOjE3ODkzMjk5MjJ9.TL_kZdxkLobvPQdy-Rs_hu_x0Dc_GXeYO76O89dTx7k",
      ],
    },
    {
      id: "49",
      code: "GRLX-E509",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ009.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwOS5wbmciLCJpYXQiOjE3NTc1MTg3MjYsImV4cCI6MTc4OTA1NDcyNn0.zN_mew24ohLc2sMIEjxyJ9zG2VKEoaHOSCEVldLUm-o",
      description: "FINE-GROUND DOUBLE- METAL STUD CRYSTAL BRICK",
      longDescription:
        "The Fine-Ground Double-Metal Stud Crystal Brick fuses glass artistry with metallic reinforcement. Its dual-stud design brings an industrial-meets-luxury aesthetic, making it ideal for projects seeking innovation and bold identity.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ009.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwOS5wbmciLCJpYXQiOjE3NTc1MTg3MjYsImV4cCI6MTc4OTA1NDcyNn0.zN_mew24ohLc2sMIEjxyJ9zG2VKEoaHOSCEVldLUm-o",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ009%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwOSAoMikucG5nIiwiaWF0IjoxNzU3NzkzOTYwLCJleHAiOjE3ODkzMjk5NjB9.WGprBks73HlZwMMeSf79oPrhW_TxgBuC0QZRacx_pag",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ009%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwOSAoMykucG5nIiwiaWF0IjoxNzU3NzkzOTczLCJleHAiOjE3ODkzMjk5NzN9.SX930BG8_Aur711CmDp7VGohhfv1D8p1jEPAgYalB50",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/sj%20codes/SJ009%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJzaiBjb2Rlcy9TSjAwOSAoNCkucG5nIiwiaWF0IjoxNzU3NzkzOTgzLCJleHAiOjE3ODkzMjk5ODN9.Oza1lcwSWcJj9H61CH00RGKLDP-A0x9ILYY5qcDbAoU",
      ],
    },
    {
      id: "50",
      code: "GRLX-C301",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ-001.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWi0wMDEucG5nIiwiaWF0IjoxNzU3NTIxOTg5LCJleHAiOjE3ODkwNTc5ODl9.AoKGyNnLZINYu0PZ-uwOAsU0v_OXMW4LHHpWcibG_g4",
      description: "HOT MELT CRACKLE SQUARE GLASS TILE",
      longDescription:
        "The HOT MELT Crackle Square Glass Tile dazzles with its crystalline fracture pattern, scattering light into brilliant sparkles. Its dynamic surface brings energy and texture to walls, making it an ideal choice for feature designs that demand both strength and visual drama.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ-001.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWi0wMDEucG5nIiwiaWF0IjoxNzU3NTIxOTg5LCJleHAiOjE3ODkwNTc5ODl9.AoKGyNnLZINYu0PZ-uwOAsU0v_OXMW4LHHpWcibG_g4",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ001.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwMS5wbmciLCJpYXQiOjE3NTc3OTQxNDksImV4cCI6MTc4OTMzMDE0OX0.ynzEr72W71rnXGralCBLe-DWleBgjTRNsLvixcJCn7A",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ001%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwMSAoMykucG5nIiwiaWF0IjoxNzU3Nzk0MTc1LCJleHAiOjE3ODkzMzAxNzV9.OFSN2gno3EMLDW47M_-i0VdhUMHYqQBrfNi3tE-j3B0",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ001%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwMSAoMikucG5nIiwiaWF0IjoxNzU3Nzk0MTg4LCJleHAiOjE3ODkzMzAxODh9.D3v3Nm0v3RpjKNzKFkL-j1eLkD92rlab1w-5Ov7B4C8",
      ],
    },
    {
      id: "51",
      code: "GRLX-C302",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ002.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwMi5wbmciLCJpYXQiOjE3NTc1MjIyNjcsImV4cCI6MTc4OTA1ODI2N30.arKXqbNaEn57is_-B4vCy8gNsi_metlYsJ7ba-_LuRU",
      description: "HOT MELT GRANITE TEXTURED SQUARE GLASS TILE",
      longDescription:
        "The HOT MELT Granite Textured Square Glass Tile embodies raw tactility. Its rugged surface recalls natural stone, diffusing light with depth and subtle opacity. Perfect for architectural features that embrace solidity and material richness.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ002.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwMi5wbmciLCJpYXQiOjE3NTc1MjIyNjcsImV4cCI6MTc4OTA1ODI2N30.arKXqbNaEn57is_-B4vCy8gNsi_metlYsJ7ba-_LuRU",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ002%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwMiAoMikucG5nIiwiaWF0IjoxNzU3Nzk0MjU0LCJleHAiOjE3ODkzMzAyNTR9.dLVQBKcPPdvHAG6MyotDr4ENrpWkFuJkMiZgp4c91LA",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ002%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwMiAoMykucG5nIiwiaWF0IjoxNzU3Nzk0MjY2LCJleHAiOjE3ODkzMzAyNjZ9.S5yOOC9_7Qid3XFEUIY-V1TUKdpakLceqqaJuOlYQ1E",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ002%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwMiAoNCkucG5nIiwiaWF0IjoxNzU3Nzk0Mjc1LCJleHAiOjE3ODkzMzAyNzV9.GSfy4rv05tXMEStsPt3SQGXcyR5iXPZSq7CAQVDX2qc",
      ],
    },
    {
      id: "52",
      code: "GRLX-C303",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ003.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwMy5wbmciLCJpYXQiOjE3NTc1MjI0NDEsImV4cCI6MTc4OTA1ODQ0MX0.84zxv-lJ_FEngsKq0xpA4UK7FeePZiV4lHHBv3S5-9s",
      description: "HOT MELT SATIN FROSTED SQUARE GLASS TILE",
      longDescription:
        "The HOT MELT Satin Frosted Square Glass Tile softens light into a gentle glow. Its matte finish provides privacy while maintaining luminosity, ideal for serene, contemporary interiors that seek balance and elegance.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ003.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwMy5wbmciLCJpYXQiOjE3NTc1MjI0NDEsImV4cCI6MTc4OTA1ODQ0MX0.84zxv-lJ_FEngsKq0xpA4UK7FeePZiV4lHHBv3S5-9s",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ003%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwMyAoMikucG5nIiwiaWF0IjoxNzU3Nzk0MzE4LCJleHAiOjE3ODkzMzAzMTh9.xjmtHXOvezAsS3PLs-UUXyzzERCJ3qtr_Jo5aIF3nRk",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ003%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwMyAoMykucG5nIiwiaWF0IjoxNzU3Nzk0MzI4LCJleHAiOjE3ODkzMzAzMjh9.28GyzQCNJci1U2w63SODPoUQ2a1B0JSR-blX1gC8cGk",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ003%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwMyAoNCkucG5nIiwiaWF0IjoxNzU3Nzk0MzM4LCJleHAiOjE3ODkzMzAzMzh9.XrSRtT_RqU2FBxKsn0EHnbv8raOgwGXMqKDEDPrdjcQ",
      ],
    },
    {
      id: "53",
      code: "GRLX-C304",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ004.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwNC5wbmciLCJpYXQiOjE3NTc1MjI2NDgsImV4cCI6MTc4OTA1ODY0OH0.zcfUVKxmyG63ZOlvTOS4Vql607u6cJc7je4PZHtwxiw",
      description: "HOT MELT BUBBLE SQUARE GLASS TILE",
      longDescription:
        "The HOT MELT Bubble Square Glass Tile celebrates playfulness and depth. Its embedded bubble-like patterns refract light unpredictably, creating lively visual effects. A bold choice for decorative partitions and statement installations.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ004.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwNC5wbmciLCJpYXQiOjE3NTc1MjI2NDgsImV4cCI6MTc4OTA1ODY0OH0.zcfUVKxmyG63ZOlvTOS4Vql607u6cJc7je4PZHtwxiw",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ004%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwNCAoMikucG5nIiwiaWF0IjoxNzU3Nzk0Mzc2LCJleHAiOjE3ODkzMzAzNzZ9.W44V7Ajejtx_U6TP2LFNMyO3Lwv78P9rF9NBLNx9suQ",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ004%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwNCAoMykucG5nIiwiaWF0IjoxNzU3Nzk0Mzg4LCJleHAiOjE3ODkzMzAzODh9.yWwYaJcoTNACwV91DuSB84gViRx9-87FvdZx4qI8ouU",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ004%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwNCAoNCkucG5nIiwiaWF0IjoxNzU3Nzk0Mzk3LCJleHAiOjE3ODkzMzAzOTd9.OeBBa3xFpEPyJxyl-aS0cLfh2N6wA7r-Hq7iVjQQSJo",
      ],
    },
    {
      id: "54",
      code: "GRLX-C305",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ005.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwNS5wbmciLCJpYXQiOjE3NTc1MjI3MDUsImV4cCI6MTc4OTA1ODcwNX0.2W6KCFR8ymSE740rOcQ5D15Snap6ggup9yVvDNXbFQk",
      description: "HOT MELT PRISMATIC PYRAMID SQUARE GLASS TILE",
      longDescription:
        "The HOT MELT Prismatic Pyramid Square Glass Tile transforms light into geometry. Its stepped pyramid design refracts reflections into multiple angles, adding brilliance and modern sculptural presence to any surface.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ005.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwNS5wbmciLCJpYXQiOjE3NTc1MjI3MDUsImV4cCI6MTc4OTA1ODcwNX0.2W6KCFR8ymSE740rOcQ5D15Snap6ggup9yVvDNXbFQk",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ005%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwNSAoMikucG5nIiwiaWF0IjoxNzU3Nzk0NDU0LCJleHAiOjE3ODkzMzA0NTR9.u0iKkn_GtLs9EHeZnXHW8MBg1jEaDNzpN0_dTABbeCk",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ005%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwNSAoMykucG5nIiwiaWF0IjoxNzU3Nzk0NDYzLCJleHAiOjE3ODkzMzA0NjN9.4mOBrmOZr_P416giOjoi8ZqJ6qnHK_f2lwgRUAtKH7k",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ005%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwNSAoNCkucG5nIiwiaWF0IjoxNzU3Nzk0NDczLCJleHAiOjE3ODkzMzA0NzN9.zkv073tpY-bCziRIY7pMT7p0M4zxw983GrupTat2tn4",
      ],
    },
    {
      id: "55",
      code: "GRLX-C306",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ006.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwNi5wbmciLCJpYXQiOjE3NTc1MjI4MTAsImV4cCI6MTc4OTA1ODgxMH0.CLQhi561RTldpHK3YS_KD45ZuLSk-nmZdjm8gJqW96M",
      description: "HOT MELT WAVE-PATTERN SQUARE GLASS TILE",
      longDescription:
        "The HOT MELT Wave-Pattern Square Glass Tile brings rhythm and motion to architectural design. Its flowing lines bend light into dynamic patterns, perfect for creating vibrant, textured walls and partitions.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ006.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwNi5wbmciLCJpYXQiOjE3NTc1MjI4MTAsImV4cCI6MTc4OTA1ODgxMH0.CLQhi561RTldpHK3YS_KD45ZuLSk-nmZdjm8gJqW96M",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ006%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwNiAoMikucG5nIiwiaWF0IjoxNzU3Nzk0NTIxLCJleHAiOjE3ODkzMzA1MjF9.4WM2fO7RMDSScSmaSmMEFWl8o2an02eNxz9BWq0pNi8",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ006%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwNiAoMykucG5nIiwiaWF0IjoxNzU3Nzk0NTQ2LCJleHAiOjE3ODkzMzA1NDZ9.9my7-OptHHjfvtUzMj-K37ORDOa2xyOcvJXWdWpvcaE",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ006%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwNiAoNCkucG5nIiwiaWF0IjoxNzU3Nzk0NTU4LCJleHAiOjE3ODkzMzA1NTh9.59Gg_D4SSWVS0p3GDW4TzIrvzDDMlBP277gClOJLCXw",
      ],
    },
    {
      id: "56",
      code: "GRLX-C307",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ007.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwNy5wbmciLCJpYXQiOjE3NTc1MjI4MzEsImV4cCI6MTc4OTA1ODgzMX0.u61KPL8nmHv-Km6yr88iu3ufTc6QzW4fNKcTNzAFP-I",
      description: "HOT MELT CIRCULAR LENS SQUARE GLASS TILE",
      longDescription:
        "The HOT MELT Circular Lens Square Glass Tile captivates with its central convex form, magnifying and distorting light like a lens. Both functional and artistic, it becomes a focal point in modern architectural compositions.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ007.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwNy5wbmciLCJpYXQiOjE3NTc1MjI4MzEsImV4cCI6MTc4OTA1ODgzMX0.u61KPL8nmHv-Km6yr88iu3ufTc6QzW4fNKcTNzAFP-I",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ007%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwNyAoMikucG5nIiwiaWF0IjoxNzU3Nzk0NTk5LCJleHAiOjE3ODkzMzA1OTl9.RKF1Rcr1fmtWocLsLDFAC0QGoGT85Rw9NYr-cCezbx8",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ007%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwNyAoMykucG5nIiwiaWF0IjoxNzU3Nzk0NjEwLCJleHAiOjE3ODkzMzA2MTB9.iEslZx3z200oPg3jPmEL2qpwLUzf0G0AUFwp_nUrGoo",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/fz%20codes/FZ007%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJmeiBjb2Rlcy9GWjAwNyAoNCkucG5nIiwiaWF0IjoxNzU3Nzk0NjIwLCJleHAiOjE3ODkzMzA2MjB9.gZT5DklQYavW_wi1aDGICxUXQFC4U0I17bGacHBhMdM",
      ],
    },
    {
      id: "57",
      code: "GRLX-F501",
      name: "Clear Series",
      category: "Clear Series",
      image: "https://i.postimg.cc/pXWs4tX3/001-3.png",
      description: "WAVE-PATTERN GLASS BLOCK",
      longDescription:
        "The Wave-Pattern Glass Block introduces fluid, organic motion into any design. Its soft rippling texture gently diffuses light, making it a sophisticated choice for partitions, feature walls, or spaces that seek dynamic elegance.",
      images: [
        "https://i.postimg.cc/pXWs4tX3/001-3.png",
        "https://i.postimg.cc/G3JMXprk/001-2.png",
        "https://i.postimg.cc/mrbJSF11/001.png",
        "https://i.postimg.cc/5thPRY6m/001-4.png",
      ],
    },
    {
      id: "58",
      code: "GRLX-F502",
      name: "Clear Series",
      category: "Clear Series",
      image: "https://i.postimg.cc/XXSDBZ0J/002-3.png",
      description: "CIRCULAR LENS GLASS BLOCK",
      longDescription:
        "The Circular Lens Glass Block transforms ordinary light into optical intrigue. With its central lens design, it magnifies and bends illumination, offering architects a bold yet functional feature for striking partitions and facades.",
      images: [
        "https://i.postimg.cc/XXSDBZ0J/002-3.png",
        "https://i.postimg.cc/tJVMg3ww/002-2.png",
        "https://i.postimg.cc/dQbqj4s7/002.png",
        "https://i.postimg.cc/pVhWjgHb/002-4.png",
      ],
    },
    {
      id: "59",
      code: "GRLX-F505",
      name: "Clear Series",
      category: "Clear Series",
      image: "https://i.postimg.cc/cHzzZ99f/005-3.png",
      description: "BUBBLE MATRIX GLASS BLOCK",
      longDescription:
        "The Bubble Matrix Glass Block captivates with its playful inner bubble pattern, creating a sense of depth and visual texture. This design element adds character and creativity, ideal for projects that seek originality and vibrant expression.",
      images: [
        "https://i.postimg.cc/cHzzZ99f/005-3.png",
        "https://i.postimg.cc/2SNPVtzw/005-2.png",
        "https://i.postimg.cc/KzjW6SNZ/005.png",
        "https://i.postimg.cc/9fJSgFy8/005-4.png",
      ],
    },
    {
      id: "60",
      code: "GRLX-F506",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/last%20bucket%20for%20products/KX006.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsYXN0IGJ1Y2tldCBmb3IgcHJvZHVjdHMvS1gwMDYucG5nIiwiaWF0IjoxNzU4MTI0NTYyLCJleHAiOjE3ODk2NjA1NjJ9.dwuVlW2Xv4Bn0SoDlgMIsUHf-yivQahoxOjPeiYxFVQ",
      description: "GRID CRYSTAL GLASS BLOCK",
      longDescription:
        "The Grid Crystal Glass Block is defined by its precise lattice pattern that enhances depth and geometry. Its clean, structured design refracts light into orderly reflections, making it ideal for modern wall partitions, facades, or interior dividers where clarity and symmetry are key.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/last%20bucket%20for%20products/KX006.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsYXN0IGJ1Y2tldCBmb3IgcHJvZHVjdHMvS1gwMDYucG5nIiwiaWF0IjoxNzU4MTI0NTYyLCJleHAiOjE3ODk2NjA1NjJ9.dwuVlW2Xv4Bn0SoDlgMIsUHf-yivQahoxOjPeiYxFVQ",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/last%20bucket%20for%20products/KX006%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsYXN0IGJ1Y2tldCBmb3IgcHJvZHVjdHMvS1gwMDYgKDIpLnBuZyIsImlhdCI6MTc1ODEyNDU4NiwiZXhwIjoxNzg5NjYwNTg2fQ.UyMbU0u6kifW4aP2e6zzJcVEqKzx5wVtkAwEsgCshVI",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/last%20bucket%20for%20products/KX006%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsYXN0IGJ1Y2tldCBmb3IgcHJvZHVjdHMvS1gwMDYgKDMpLnBuZyIsImlhdCI6MTc1ODEyNDYwMiwiZXhwIjoxNzg5NjYwNjAyfQ.MUPS2A0Gd1Jfg950Ga2dS1lvtIrgxcaMYLPW6kWIOv0",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/last%20bucket%20for%20products/KX006%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsYXN0IGJ1Y2tldCBmb3IgcHJvZHVjdHMvS1gwMDYgKDQpLnBuZyIsImlhdCI6MTc1ODEyNDYxNCwiZXhwIjoxNzg5NjYwNjE0fQ.cHa6T7nYQf-r0-yKu9W02lnsfl9CRYysQo1-dsQliHg",
      ],
    },
    {
      id: "61",
      code: "GRLX-F509",
      name: "Clear Series",
      category: "Clear Series",
      image: "https://i.postimg.cc/9Myx5m9H/KX009-3.png",
      description: "DIAMOND CRYSTAL BLOCK",
      longDescription:
        "The Diamond Crystal Glass Block features a faceted surface reminiscent of cut gemstones. Its diamond-like texture refracts light in multiple directions, creating dazzling reflections and a luxurious ambiance. Perfect for statement walls, decorative partitions, or high-end retail spaces where sparkle and elegance are essential.",
      images: [
        "https://i.postimg.cc/9Myx5m9H/KX009-3.png",
        "https://i.postimg.cc/zv5xqswb/KX009.png",
        "https://i.postimg.cc/sxcwxTKn/KX009-4.png",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/last%20bucket%20for%20products/KX009%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsYXN0IGJ1Y2tldCBmb3IgcHJvZHVjdHMvS1gwMDkgKDIpLnBuZyIsImlhdCI6MTc1ODEyNTA0NSwiZXhwIjoxNzg5NjYxMDQ1fQ.7Lsev7wBlLEVYehLVk8FNAjbO9ROSPjEYjAaovdR9t8",
      ],
    },
    {
      id: "62",
      code: "GRLX-G507",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/last%20bucket%20for%20products/GP007.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsYXN0IGJ1Y2tldCBmb3IgcHJvZHVjdHMvR1AwMDcucG5nIiwiaWF0IjoxNzU4MTI1MTk3LCJleHAiOjE3ODk2NjExOTd9.PsmYac9_hd-oeMz5wdgeR5Fh9rYyhzyv2ezUEN_Q-gU",
      description: "FACETED CRYSTAL BLOCK",
      longDescription:
        "A masterpiece of geometry, the Faceted Crystal Block features sharp, angled cuts that refract light into dazzling patterns. Its luxurious brilliance makes it ideal for high-end interiors, architectural accents, and artistic installations.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/last%20bucket%20for%20products/GP007.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsYXN0IGJ1Y2tldCBmb3IgcHJvZHVjdHMvR1AwMDcucG5nIiwiaWF0IjoxNzU4MTI1MTk3LCJleHAiOjE3ODk2NjExOTd9.PsmYac9_hd-oeMz5wdgeR5Fh9rYyhzyv2ezUEN_Q-gU",
      ],
    },
    {
      id: "63",
      code: "GRLX-G508",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/last%20bucket%20for%20products/GP008.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsYXN0IGJ1Y2tldCBmb3IgcHJvZHVjdHMvR1AwMDgucG5nIiwiaWF0IjoxNzU4MTI1MzcyLCJleHAiOjE3ODk2NjEzNzJ9.HMWP7bHJrDOPQr55VTToFli2aD6igEGUL_tkwoMZ_QI",
      description: "TEXTURED PRISM GLASS BLOCK",
      longDescription:
        "The Textured Prism Glass Block showcases layered prism-like surfaces that play with depth and reflection. Perfect for statement walls and bold architectural details, it blends structural strength with striking visual impact.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/last%20bucket%20for%20products/GP008.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsYXN0IGJ1Y2tldCBmb3IgcHJvZHVjdHMvR1AwMDgucG5nIiwiaWF0IjoxNzU4MTI1MzcyLCJleHAiOjE3ODk2NjEzNzJ9.HMWP7bHJrDOPQr55VTToFli2aD6igEGUL_tkwoMZ_QI",
      ],
    },
    {
      id: "64",
      code: "GRLX-G510",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/last%20bucket%20for%20products/GP0010.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsYXN0IGJ1Y2tldCBmb3IgcHJvZHVjdHMvR1AwMDEwLnBuZyIsImlhdCI6MTc1ODEyNTUxMCwiZXhwIjoxNzg5NjYxNTEwfQ.JQxZVDOPBH-DxgCjM6Fp6Y8q-o9e-5EeWCUq34gNRgE",
      description: "SOLID CUBE CLASS BLOCK",
      longDescription:
        "With flawless clarity and geometric precision, the Solid Cube Glass Block is a minimal yet powerful element. Its clean cube form is versatile, serving both decorative and structural purposes in modern architecture.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/last%20bucket%20for%20products/GP0010.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsYXN0IGJ1Y2tldCBmb3IgcHJvZHVjdHMvR1AwMDEwLnBuZyIsImlhdCI6MTc1ODEyNTUxMCwiZXhwIjoxNzg5NjYxNTEwfQ.JQxZVDOPBH-DxgCjM6Fp6Y8q-o9e-5EeWCUq34gNRgE",
      ],
    },
    {
      id: "65",
      code: "GRLX-G523",
      name: "Clear Series",
      category: "Clear Series",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/last%20bucket%20for%20products/GP023.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsYXN0IGJ1Y2tldCBmb3IgcHJvZHVjdHMvR1AwMjMucG5nIiwiaWF0IjoxNzU4MTI1NjMxLCJleHAiOjE3ODk2NjE2MzF9.ylMCKNDU8-k0Rz3s1Py0D7MJEiCPIcEMZVySVzYEyCI",
      description: "LEAF PATTERN GLASS BLOCK",
      longDescription:
        "Inspired by nature, the Leaf Pattern Glass Block carries elegant ridges and curves that resemble a delicate leaf. This organic design brings texture and sophistication to interiors while maintaining crystal clarity.",
      images: [
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/last%20bucket%20for%20products/GP023.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsYXN0IGJ1Y2tldCBmb3IgcHJvZHVjdHMvR1AwMjMucG5nIiwiaWF0IjoxNzU4MTI1NjMxLCJleHAiOjE3ODk2NjE2MzF9.ylMCKNDU8-k0Rz3s1Py0D7MJEiCPIcEMZVySVzYEyCI",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/last%20bucket%20for%20products/GP023%20(2).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsYXN0IGJ1Y2tldCBmb3IgcHJvZHVjdHMvR1AwMjMgKDIpLnBuZyIsImlhdCI6MTc1ODEyNTY1MywiZXhwIjoxNzg5NjYxNjUzfQ.AKiuSYmOA06Jxvcs4VHoxv3hFFL4LJIy12MOZQ1DY6A",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/last%20bucket%20for%20products/GP023%20(3).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsYXN0IGJ1Y2tldCBmb3IgcHJvZHVjdHMvR1AwMjMgKDMpLnBuZyIsImlhdCI6MTc1ODEyNTY3MSwiZXhwIjoxNzg5NjYxNjcxfQ.YPp26k4JCwIl7NL0mMwEKuqImkgGxPMAyGtDpdYQu1o",
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/last%20bucket%20for%20products/GP023%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsYXN0IGJ1Y2tldCBmb3IgcHJvZHVjdHMvR1AwMjMgKDQpLnBuZyIsImlhdCI6MTc1ODEyNTY4NiwiZXhwIjoxNzg5NjYxNjg2fQ.Aj0Y5GX_ht4rC1NsxtZfPzp1K7cFIwY4HdAqqd21Dko",
      ],
    },
  ];

  // Filter products based on search query
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleProductsClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    onProductsClick();
  };

  const handleAboutClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    onBack();
  };

  const handleSearchToggle = () => {
    setShowSearchBar(!showSearchBar);
    if (!showSearchBar) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery("");
    }
  };

  const handleSearchClear = () => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  };

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
        setSearchQuery("");
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [showSearchBar]);

  // Search Bar Component - Full Screen Black Overlay
  const SearchBarOverlay = () => (
    <div
      className={`fixed inset-0 bg-black z-[60] transition-all duration-300 ease-in-out ${
        showSearchBar ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Search Input Area */}
        <div className="flex items-center justify-center flex-1 px-6">
          <div className="w-full max-w-4xl">
            <div className="flex items-center border-b border-gray-600 pb-4">
              <div className="flex-1 relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  autoFocus
                />
              </div>

              <div className="flex items-center space-x-6 ml-8">
                {searchQuery && (
                  <button
                    onClick={handleSearchClear}
                    className="text-gray-400 hover:text-white transition-colors text-lg font-medium"
                  >
                    CLEAR
                  </button>
                )}
                <button
                  onClick={handleSearchToggle}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-8 w-8" />
                </button>
              </div>
            </div>

            {/* Search Results/Suggestions Area */}
            {searchQuery && (
              <div className="mt-8">
                <p className="text-gray-400 text-lg mb-6">
                  {filteredProducts.length > 0 ? (
                    <>
                      Found {filteredProducts.length} product
                      {filteredProducts.length !== 1 ? "s" : ""} for "
                      {searchQuery}"
                    </>
                  ) : (
                    <>No products found for "{searchQuery}"</>
                  )}
                </p>

                {/* Product Search Results */}
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                    {filteredProducts.slice(0, 6).map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          onProductsClick();
                          setShowSearchBar(false);
                        }}
                        className="p-4 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors cursor-pointer flex items-center space-x-4"
                      >
                        <div className="w-16 h-16 bg-gray-800 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white text-lg font-semibold mb-1">
                            {product.code}
                          </h3>
                          <p className="text-gray-400 text-sm mb-1">
                            {product.name}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {product.category}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400 text-lg mb-4">
                      No products found
                    </p>
                    <p className="text-gray-500 text-sm">Try searching for:</p>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-xs">
                        Basin
                      </span>
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-xs">
                        Glass Block
                      </span>
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-xs">
                        B6065
                      </span>
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-xs">
                        Clear
                      </span>
                    </div>
                  </div>
                )}

                {filteredProducts.length > 6 && (
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => {
                        onProductsClick();
                        setShowSearchBar(false);
                      }}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      View all {filteredProducts.length} results →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom hint */}
        <div className="p-6 text-center">
          <p className="text-gray-500 text-sm">
            Press ESC to close or click the X button above
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* Search Bar - Full Screen Black Overlay */}
      <SearchBarOverlay />

      {/* Full Navigation - Same as other pages */}
      <nav
        className="fixed top-0 w-full backdrop-blur-sm border-b z-40"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.9)", borderColor: "#333" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:justify-between">
            {/* Mobile menu button - Left side on mobile */}
            <div className="md:hidden order-1">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Left Navigation - Desktop only */}
            <div className="hidden md:flex items-center space-x-8 flex-1">
              <a
                href="#products"
                onClick={handleProductsClick}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Products
              </a>
              <a
                href="#applications"
                onClick={onInspirationsClick}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Inspirations
              </a>
              <a
                href="#about"
                onClick={handleAboutClick}
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </a>
            </div>

            {/* Center Logo - Centered on mobile AND desktop */}
            <div className="flex items-center order-2 absolute left-1/2 transform -translate-x-1/2">
              <button
                onClick={onLogoClick}
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src="https://rteznkwgofrhunwtwamk.supabase.co/storage/v1/object/public/media/2880726A-8DC4-4EA4-9E98-4D57812AD32E2%20(1).png"
                  alt="ARTENO"
                  className="h-16 w-auto"
                />
              </button>
            </div>

            {/* Right Navigation - Desktop only */}
            <div className="hidden md:flex items-center space-x-6 flex-1 justify-end">
              <button
                onClick={onSignOut}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sign Out
              </button>
              <button
                onClick={handleSearchToggle}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <span>Search</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Spacer for mobile to balance the layout */}
            <div className="md:hidden order-3 w-6"></div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-black border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#products"
                onClick={handleProductsClick}
                className="block px-3 py-2 text-gray-300 hover:text-white"
              >
                Products
              </a>
              <a
                href="#applications"
                onClick={onInspirationsClick}
                className="block px-3 py-2 text-gray-300 hover:text-white"
              >
                Inspirations
              </a>
              <a
                href="#about"
                onClick={handleAboutClick}
                className="block px-3 py-2 text-gray-300 hover:text-white"
              >
                About
              </a>
              <button
                onClick={onSignOut}
                className="block px-3 py-2 text-gray-300 hover:text-white"
              >
                Sign Out
              </button>
              <button
                onClick={handleSearchToggle}
                className="block px-3 py-2 text-gray-300 hover:text-white"
              >
                Search →
              </button>
            </div>
          </div>
        )}
      </nav>

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
