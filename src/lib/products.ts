export interface Product {
  id: string;
  slug: string;
  name: string;
  strain: string;
  comingSoon: boolean;
  price: number; // in cents
  description: string;
  tagline: string;
  color: string; // tailwind color class
  colorHex: string;
  colorBg: string; // light background
  sizes: string[];
  images: {
    mockup: string;
    front: string;
    detail: string;
  };
}

export const products: Product[] = [
  {
    id: "strain-tee-blue-dream",
    slug: "blue-dream",
    name: "Blue Dream Tee",
    strain: "Blue Dream",
    comingSoon: true,
    price: 0,
    description:
      "A smooth blend of creativity and calm — the Blue Dream Strain Tee brings that mellow, euphoric energy to your fit. Premium heavyweight cotton, relaxed cut, signature Puff Social branding.",
    tagline: "Dreamy vibes. Elevated style.",
    color: "text-blue-500",
    colorHex: "#6090C0",
    colorBg: "bg-blue-50",
    sizes: ["S", "M", "L", "XL", "2XL"],
    images: {
      mockup: "/merch/blue-dream-mockup.png",
      front: "/merch/blue-dream-front.png",
      detail: "/merch/blue-dream-detail.png",
    },
  },
  {
    id: "strain-tee-og-kush",
    slug: "og-kush",
    name: "OG Kush Tee",
    strain: "OG Kush",
    comingSoon: true,
    price: 0,
    description:
      "The classic that started it all. The OG Kush Strain Tee is for the ones who know. Deep forest green, bold lettering, unmistakable Puff Social craftsmanship.",
    tagline: "Original. Genuine. Iconic.",
    color: "text-green-600",
    colorHex: "#5B8C5A",
    colorBg: "bg-green-50",
    sizes: ["S", "M", "L", "XL", "2XL"],
    images: {
      mockup: "/merch/og-kush-mockup.png",
      front: "/merch/og-kush-front.png",
      detail: "/merch/og-kush-detail.png",
    },
  },
  {
    id: "strain-tee-lemon-cake",
    slug: "lemon-cake",
    name: "Lemon Cake Tee",
    strain: "Lemon Cake",
    comingSoon: true,
    price: 0,
    description:
      "Sweet, citrusy, and uplifting — just like the strain. The Lemon Cake Tee is sunshine you can wear. Light cream tone, playful design, feel-good energy.",
    tagline: "Sweet citrus. Sunny vibes.",
    color: "text-amber-500",
    colorHex: "#E8C97A",
    colorBg: "bg-amber-50",
    sizes: ["S", "M", "L", "XL", "2XL"],
    images: {
      mockup: "/merch/lemon-cake-mockup.png",
      front: "/merch/lemon-cake-front.png",
      detail: "/merch/lemon-cake-detail.png",
    },
  },
  {
    id: "strain-tee-purple-haze",
    slug: "purple-haze",
    name: "Purple Haze Tee",
    strain: "Purple Haze",
    comingSoon: true,
    price: 0,
    description:
      "Bold, psychedelic, legendary. The Purple Haze Tee channels that Hendrix energy with rich violet tones and hand-crafted typography. A statement piece for the culture.",
    tagline: "Legendary strain. Legendary fit.",
    color: "text-purple-500",
    colorHex: "#8E6BAD",
    colorBg: "bg-purple-50",
    sizes: ["S", "M", "L", "XL", "2XL"],
    images: {
      mockup: "/merch/purple-haze-mockup.png",
      front: "/merch/purple-haze-front.png",
      detail: "/merch/purple-haze-detail.png",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
