import React, { useState, useEffect } from "react";

interface InspirationsPageProps {
  onBack: () => void;
  onLogoClick: () => void;
  onProductsClick: () => void;
  onAboutClick: () => void;
  onSignOut: () => void;
}

interface InspirationImage {
  id: string;
  title: string;
  category: string;
  image: string;
  height: number; // For masonry layout
}

export default function InspirationsPage({ onBack }: InspirationsPageProps) {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Inspiration images with varying heights for masonry effect - USING YOUR UPLOADED IMAGES
  const inspirationImages: InspirationImage[] = [
    {
      id: "1",
      title: "Exterior Glass Brick Wall Installation",
      category: "GRLX-F509",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/10100.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEwMTAwLmpwZyIsImlhdCI6MTc1NjMwMTkzOSwiZXhwIjoxNzg3ODM3OTM5fQ.McGIWePOMQIkTBQeO-nRnMjv6nkUJPJT5kKi1mrH5bo",
      height: 400,
    },
    {
      id: "2",
      title: "Modern Interior Wall Partition ",
      category: "GRLX-F509",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/10035.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEwMDM1LmpwZyIsImlhdCI6MTc1NjMwMTg1NywiZXhwIjoxNzg3ODM3ODU3fQ.m2ZmUGYvcxCH7HOUAk9Q0apD31eFgqVVS6lnH53UDXw",
      height: 300,
    },
    {
      id: "3",
      title: "Interior Feature Wall With Grid Glass Bricks ",
      category: "GRLX-F506",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/10038.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEwMDM4LmpwZyIsImlhdCI6MTc1NjMwMTg4OCwiZXhwIjoxNzg3ODM3ODg4fQ.ABmcQtpmBivErzklazXJsPC6HmqAlCj_a2pmAL49f7s",
      height: 500,
    },
    {
      id: "4",
      title: "Courtyard Installation With Glass Brick Wall",
      category: "GRLX-F509",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/10098.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEwMDk4LmpwZyIsImlhdCI6MTc1NjMwMTkxNSwiZXhwIjoxNzg3ODM3OTE1fQ.MWNQgd_Fo8SrRBfuVK0pbH8BD0BSf-6C2DooLF9-G6Y",
      height: 350,
    },
    {
      id: "5",
      title: "Retail Storefront Glass Brick Installation ",
      category: "GRLX-E501",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/1%20(1).webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEgKDEpLndlYnAiLCJpYXQiOjE3NTYzMDI1MDksImV4cCI6MTc4NzgzODUwOX0.OoLKBZFVK-8TyPJsfvOreeF6eaUYHZdDOjEX8bmA-5E",
      height: 450,
    },
    {
      id: "6",
      title: "Residential Glass Brick Façade With Windows",
      category: "GRLX-F501",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/10101.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEwMTAxLmpwZyIsImlhdCI6MTc1NjMwMTk4MywiZXhwIjoxNzg3ODM3OTgzfQ.fYqUSMw1B0DqtSRy8b4sfXdirSKuvFi5_UifTgnezkI",
      height: 320,
    },
    {
      id: "7",
      title: "Interior Dining Area Partition ",
      category: "GRLX-B201",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/1%20(144).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEgKDE0NCkuanBnIiwiaWF0IjoxNzU2MzAyNDUxLCJleHAiOjE3ODc4Mzg0NTF9.slt2RsdW0jIMn3gIf4J5YJasNIZ8gFR6kXONADDTVW8",
      height: 380,
    },
    {
      id: "8",
      title: "Large Residential Glass Brick Façade ",
      category: "GRLX-F502",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/1%20(2).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEgKDIpLmpwZyIsImlhdCI6MTc1NjMwMjU0MiwiZXhwIjoxNzg3ODM4NTQyfQ.wlFP3TQgf2OFwVsdUMYtFd4Xfjg1Gg5uqJjI-og2U28",
      height: 420,
    },
    {
      id: "9",
      title: "Atrium Courtyard Glass Brick Installation ",
      category: "GRLX-G508",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/13.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEzLmpwZyIsImlhdCI6MTc1NjMwMjYxNCwiZXhwIjoxNzg3ODM4NjE0fQ.9Gzcqt9gN3fK6E2odDQKWnTGiEemqwAdkpEzHBBD63I",
      height: 360,
    },
    {
      id: "10",
      title: "Vertical Glass Brick Wall Partition",
      category: "Stone Pattern",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/1%20(132).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEgKDEzMikuanBnIiwiaWF0IjoxNzU2MzAyNzU1LCJleHAiOjE3ODc4Mzg3NTV9.5KcjMKxDGScTFDtDvxxQ7iMlWz3joXfoLmgULlYHFaE",
      height: 480,
    },
    {
      id: "11",
      title: "Glass Brick Showroom Wall ",
      category: "Customized",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/1%20(3).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEgKDMpLmpwZyIsImlhdCI6MTc1NjMwMjY5NSwiZXhwIjoxNzg3ODM4Njk1fQ.3dFRU5w6k1sj7kE-3dmgfxXU97sWJv-GiPBjvTK6FjQ",
      height: 340,
    },
    {
      id: "12",
      title: "Bathroom Illuminated Glass Brick Partition ",
      category: "GRLX-B206",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/1%20(114).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEgKDExNCkuanBnIiwiaWF0IjoxNzU2MzAzMDY0LCJleHAiOjE3ODc4MzkwNjR9.UlG46le7mu-UR2S-Uc31LuN5dHUn7_5Xo3vo24JVFkM",
      height: 400,
    },
    {
      id: "13",
      title: "Office Illuminated Glass Brick Wall ",
      category: "Stone Pattern",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/1%20(122).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEgKDEyMikuanBnIiwiaWF0IjoxNzU2MzAzMDQyLCJleHAiOjE3ODc4MzkwNDJ9.1mdLOpPCl9-JNag_Wzr65fEvFLJuZANfuFSqIAGxBt8",
      height: 320,
    },
    {
      id: "14",
      title: "Retail Glass Brick Feature Wall ",
      category: "Tiffany Customed",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/1%20(4).png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEgKDQpLnBuZyIsImlhdCI6MTc1NjMwMjgzOSwiZXhwIjoxNzg3ODM4ODM5fQ.i_6ojRVYt9vyUOXYRdI6Q8k5Buxj2y8QldjoMO_LHOk",
      height: 460,
    },
    {
      id: "15",
      title: "Classic Interior Wall Partition With Piano Backdrop",
      category: "GRLX-F502",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/1%20(6).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEgKDYpLmpwZyIsImlhdCI6MTc1NjMwMjg3NSwiZXhwIjoxNzg3ODM4ODc1fQ.1uY38gztZ2KGlXevH_cv0j4wtN2AFjYK4WiyiUI1OfI",
      height: 380,
    },
    {
      id: "16",
      title: "Modern Staircase Glass Brick Divider ",
      category: "GRLX-G523",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/12.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzLzEyLmpwZyIsImlhdCI6MTc1NjMwMjYyOCwiZXhwIjoxNzg3ODM4NjI4fQ.xxfJGBER-UtY2LPHgN0sSsfBlqUUFQfDnzWOXFlDqzI",
      height: 420,
    },
    {
      id: "17",
      title: "Glass Brick Living Room Feature Partition",
      category: "GRLX-F501",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media%202%20products/O1CN01fbLPIe1zTW66lN019_!!1102366715.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYSAyIHByb2R1Y3RzL08xQ04wMWZiTFBJZTF6VFc2NmxOMDE5XyEhMTEwMjM2NjcxNS5qcGciLCJpYXQiOjE3NTYzMDI5MTUsImV4cCI6MTc4NzgzODkxNX0.e72OKRVXQJKRV0TF3CKwo37vJpaZVtex8vn9pG7tiyg",
      height: 350,
    },
    {
      id: "18",
      title: "Decorative Boutique Glass Brick Façade ",
      category: "GRLX-G523",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/1%20(112).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS8xICgxMTIpLmpwZyIsImlhdCI6MTc1NjMwMzMzNiwiZXhwIjoxNzg3ODM5MzM2fQ.nMv106h4wSt9uWrR23KDDh-LPc3fM3d4c-Ixo4zYtvg",
      height: 440,
    },
    {
      id: "19",
      title: "Minimalist Office Shelving With Glass Brick Wall",
      category: "GRLX-F501",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/10024%20(2).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS8xMDAyNCAoMikuanBnIiwiaWF0IjoxNzU2MzAzMTg0LCJleHAiOjE3ODc4MzkxODR9.81SmfY4IN2aDRrs-hGV72DCKKtjKxkcLHbK2gbrN4fE",
      height: 390,
    },
    {
      id: "20",
      title: "Glass Brick Office Wall With Staircase",
      category: "GRLX-F506",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/10016.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS8xMDAxNi5qcGciLCJpYXQiOjE3NTYzMDMxMjcsImV4cCI6MTc4NzgzOTEyN30.5GyKyD3aUtK9lP2l_4H9WFltvOEio5vDLzGbr0wsRfw",
      height: 330,
    },
    {
      id: "21",
      title: "Contemporary Retail Glass Brick Shelving ",
      category: "GRLX-B204",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/1%20(110).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS8xICgxMTApLmpwZyIsImlhdCI6MTc1NjMwMzMwNCwiZXhwIjoxNzg3ODM5MzA0fQ.WMVM3MNaLHcycjA6a_6oduMzfxK0mICmKZnrEl12mlw",
      height: 470,
    },
    {
      id: "22",
      title: "Decorative Glass Brick Stair Partition ",
      category: "GRLX-E501",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/1%20(2)2.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS8xICgyKTIucG5nIiwiaWF0IjoxNzU2MzAzNDY0LCJleHAiOjE3ODc4Mzk0NjR9.ZMC3elGxIBwLt04EnjB57CrW9cLlU47zJRVLnRnhCxU",
      height: 410,
    },
    {
      id: "23",
      title: "Textured Glass Brick Exterior Wall",
      category: "GRLX-B201",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/1%20(2)17.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS8xICgyKTE3LmpwZWciLCJpYXQiOjE3NTYzMDM0MTksImV4cCI6MTc4NzgzOTQxOX0.slPvGNF_GtrGzpNrzdzpS9CnbFSB_l8EnKxhOk6cPtw",
      height: 360,
    },
    {
      id: "24",
      title: "Lounge Illuminated Glass Brick Wall",
      category: "GRLX-G507",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/2%20(7).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS8yICg3KS5qcGciLCJpYXQiOjE3NTYzMDM4OTQsImV4cCI6MTc4NzgzOTg5NH0.GQuzqlj6Rvx9E-sQ2RBomfKyn9LL-CusbpHVnVjAnKM",
      height: 450,
    },
    {
      id: "25",
      title: "Smooth Curved Architectural Glass Brick Wall ",
      category: "Stone Pattern",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/1%20(25)26.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS8xICgyNSkyNi5qcGciLCJpYXQiOjE3NTYzMDM1MDcsImV4cCI6MTc4NzgzOTUwN30.CJ1W8V6ecYj0ohrn00Uv6JXIITx3yYvRUQkY2gINC5E",
      height: 440,
    },
    {
      id: "26",
      title: "Curved Decorative Glass Brick Wall",
      category: "F510 Gemstone Pattern",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/1%20(72).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS8xICg3MikuanBnIiwiaWF0IjoxNzU2MzAzOTQyLCJleHAiOjE3ODc4Mzk5NDJ9.nUWiVim5upmoWgd6rufMScE7taXVhjVEN6ouyl2Yka0",
      height: 390,
    },
    {
      id: "27",
      title: "Exterior Glass Brick Entryway",
      category: "Tiffany Customed",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/1%20(5)6.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS8xICg1KTYuanBnIiwiaWF0IjoxNzU2MzAzNzUyLCJleHAiOjE3ODc4Mzk3NTJ9.IXSEj5BFxKvU3VB9NiX4vgqRZFvHKILlQBVtVXdwmNg",
      height: 330,
    },
    {
      id: "28",
      title: "Minimalist Curved Glass Brick Feature Wall",
      category: "GRLX-E501",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/1%20(48).jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS8xICg0OCkuanBnIiwiaWF0IjoxNzU2MzAzNzI4LCJleHAiOjE3ODc4Mzk3Mjh9.WAj7Vw9L7XJzSMYbxYx15aTh43Yo13wy-TQXm_OAb8w",
      height: 470,
    },
    {
      id: "29",
      title: "Tall Illuminated Glass Brick Hotel Wall ",
      category: "G510 Crystal Block",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/nam.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS9uYW0uanBlZyIsImlhdCI6MTc1NjMwNDIwNywiZXhwIjoxNzg3ODQwMjA3fQ.b27FamCzL5dU-Y-8V2_O0-t9OOcf36w7fBL67CzRRcw",
      height: 440,
    },
    {
      id: "30",
      title: "Luxury Retail Glass Brick Storefront",
      category: "GRLX-B201",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/na.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS9uYS5qcGciLCJpYXQiOjE3NTYzMDYxNjMsImV4cCI6MTc4Nzg0MjE2M30.jRrpnuz37NJx1BEaDVFv6TD0TUquIPFh0VDQF0p4bpk",
      height: 450,
    },
    {
      id: "31",
      title: "Outdoor Multicolor Glass Brick Arch ",
      category: "Custom Interior Color",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/nampei.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS9uYW1wZWkuanBnIiwiaWF0IjoxNzU2MzA3MTA5LCJleHAiOjE3ODc4NDMxMDl9.7JqH-wcr2vwCEVNKZc0HPyHUH5g7wL4M8UE-Temr4Co",
      height: 250,
    },
    {
      id: "32",
      title: "Red Glass Brick Curved Wall Partition",
      category: "GRLX-F501",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/nampe.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS9uYW1wZS5qcGciLCJpYXQiOjE3NTYzMDY1NDcsImV4cCI6MTc4Nzg0MjU0N30.Jv1Z6Jf4jxR2EasO7oBo3QbFfiFPHHYWnIxpBL4ierw",
      height: 510,
    },
    {
      id: "33",
      title: "Textured Artistic Glass Brick Partition",
      category: "GRLX-G508",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/5.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS81LmpwZyIsImlhdCI6MTc1NjMwNjY0NSwiZXhwIjoxNzg3ODQyNjQ1fQ.Z3IddfNzHzNGuAYAzHd1IRylIZCQf4tOzNMId5zIAY4",
      height: 440,
    },
    {
      id: "34",
      title: "Freestanding Glass Brick Room Divider ",
      category: "GRLX-B201",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/n.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS9uLmpwZyIsImlhdCI6MTc1NjMwNjc3NiwiZXhwIjoxNzg3ODQyNzc2fQ.V_1BX_eVvxso3Y_UC2RQ1vN-w6RsaCp5x0nniQg5XI0",
      height: 385,
    },
    {
      id: "35",
      title: "Glass Brick Office Wall With Staircase",
      category: "GRLX-F505",
      image:
        "https://awjcsoixmhgvatzcismt.supabase.co/storage/v1/object/sign/media/10026.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYWNlMDFmMi04YzQ5LTQ1YjQtYWRmYi0zYjJjZjgyNmFkMmMiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJtZWRpYS8xMDAyNi5qcGciLCJpYXQiOjE3NTYzMDcyNDcsImV4cCI6MTc4Nzg0MzI0N30.GpN3FQv6pyQElewqodX9ttc1HBTlpUwaIn0f-FlDKxo",
      height: 270,
    },
  ];

  // Create columns for masonry layout
  const createMasonryColumns = (
    items: InspirationImage[],
    columnCount: number
  ) => {
    const columns: InspirationImage[][] = Array.from(
      { length: columnCount },
      () => []
    );
    const columnHeights = Array(columnCount).fill(0);

    items.forEach((item) => {
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );
      columns[shortestColumnIndex].push(item);
      columnHeights[shortestColumnIndex] += item.height + 16; // Add gap
    });

    return columns;
  };

  const [columns, setColumns] = useState<InspirationImage[][]>([]);

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      let cols = 4;
      if (width < 640) cols = 1;
      else if (width < 1024) cols = 2;
      else if (width < 1280) cols = 3;

      setColumns(createMasonryColumns(inspirationImages, cols));
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

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
        {/* Page Title */}
        <div className="py-12 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Inspirations
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Discover how our glass blocks transform spaces across the world.
            Each project tells a story of innovation, craftsmanship, and
            architectural excellence.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {/* Mobile: Simple 2-column grid, Desktop: Masonry */}
          <div className="md:hidden grid grid-cols-2 gap-3">
            {inspirationImages.map((item) => (
              <div
                key={item.id}
                className="relative group cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg"
                onMouseEnter={() => setHoveredImage(item.id)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                </div>

                {/* Mobile overlay - always visible but subtle */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <h3 className="text-white text-sm font-semibold mb-1">
                    {item.title}
                  </h3>
                  <p
                    className="text-xs opacity-90"
                    style={{ color: "#D7B387" }}
                  >
                    {item.category}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Masonry Layout */}
          <div className="hidden md:flex gap-4">
            {columns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex-1 space-y-4">
                {column.map((item) => (
                  <div
                    key={item.id}
                    className="relative group cursor-pointer overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02]"
                    style={{ height: `${item.height}px` }}
                    onMouseEnter={() => setHoveredImage(item.id)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-500"
                      style={{
                        filter:
                          hoveredImage === item.id
                            ? "grayscale(50%) brightness(0.7)"
                            : "none",
                      }}
                    />

                    {/* Overlay */}
                    <div
                      className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                        hoveredImage === item.id
                          ? "bg-opacity-40"
                          : "bg-opacity-0"
                      }`}
                    />

                    {/* Project Info Overlay */}
                    <div
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                        hoveredImage === item.id
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      <div className="text-center text-white px-4">
                        <h3 className="text-xl md:text-2xl font-bold mb-2">
                          {item.title}
                        </h3>
                        <p
                          className="text-sm md:text-base opacity-90"
                          style={{ color: "#D7B387" }}
                        >
                          {item.category}
                        </p>
                      </div>
                    </div>

                    {/* Subtle border on hover */}
                    <div
                      className={`absolute inset-0 border-2 transition-all duration-300 rounded-lg ${
                        hoveredImage === item.id
                          ? "border-opacity-60"
                          : "border-opacity-0"
                      }`}
                      style={{ borderColor: "#D7B387" }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div
          className="border-t border-gray-800 py-16"
          style={{ backgroundColor: "#D7B387" }}
        >
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
              Ready to Create Your Own Inspiration?
            </h2>
            <p className="text-lg text-gray-800 mb-8">
              Let's discuss how our glass blocks can transform your next project
              into something extraordinary.
            </p>
            <button
              onClick={onBack}
              className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Start Your Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
