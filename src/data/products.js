export const products = [
  {
    id: 'classic-rose-bouquet',
    name: 'Classic Rose Bouquets',
    category: 'bouquets',
    description: 'Our Classic Rose Bouquets are hand-cut, hand-tied, and designed with premium roses for timeless elegance. Each bouquet is wrapped with care and finished with refined details. Color tones may vary slightly to ensure freshness and artistry.',
    image: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=800&auto=format&fit=crop'
    ],
    sizes: [
      { id: 'petite', name: 'Petite', stems: 12, price: 65 },
      { id: 'classic', name: 'Classic', stems: 24, price: 120 },
      { id: 'luxe', name: 'Luxe', stems: 36, price: 175 },
      { id: 'grand', name: 'Grand', stems: '50+', price: 250 }
    ],
    optionType: 'color',
    optionLabel: 'Color Family',
    options: [
      { id: 'soft-blush', name: 'Soft Blush', hex: '#f8d7da' },
      { id: 'white-cream', name: 'White & Cream', hex: '#f9f9f7' },
      { id: 'romantic-red', name: 'Romantic Red', hex: '#c94c4c' },
      { id: 'designers-choice', name: "Seasonal Designer's Choice", hex: null }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'mixed-bouquet',
    name: 'Mixed Bouquets',
    category: 'bouquets',
    description: 'A curated blend of seasonal blooms designed to feel romantic, fresh, and intentional. Each mixed bouquet is thoughtfully composed to create a balanced and elegant floral moment.',
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&auto=format&fit=crop'
    ],
    sizes: [
      { id: 'petite', name: 'Petite', stems: 15, price: 55 },
      { id: 'classic', name: 'Classic', stems: 25, price: 95 },
      { id: 'luxe', name: 'Luxe', stems: 40, price: 145 }
    ],
    optionType: 'style',
    optionLabel: 'Style',
    options: [
      { id: 'soft-romantic', name: 'Soft Romantic', hex: '#f8d7da' },
      { id: 'garden-inspired', name: 'Garden-Inspired', hex: '#d4ddd0' },
      { id: 'modern-neutral', name: 'Modern Neutral', hex: '#e2d7c9' },
      { id: 'designers-choice', name: "Seasonal Designer's Choice", hex: null }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'custom-bouquet',
    name: 'Custom Bouquets',
    category: 'bouquets',
    type: 'semi-custom',
    description: 'Our Custom Bouquets are designed around your vision while maintaining the signature Good Nature aesthetic. Perfect for gifting, celebrations, and meaningful moments.',
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562932831-afcfe48b5786?w=800&auto=format&fit=crop'
    ],
    basePrice: 95,
    customizations: [
      {
        id: 'color-palette',
        label: 'Color Palette',
        options: [
          { id: 'soft-blush', name: 'Soft Blush', hex: '#f8d7da', priceAdd: 0 },
          { id: 'white-cream', name: 'White & Cream', hex: '#f9f9f7', priceAdd: 0 },
          { id: 'romantic-red', name: 'Romantic Red', hex: '#c94c4c', priceAdd: 0 },
          { id: 'warm-sunset', name: 'Warm Sunset', hex: '#e8a87c', priceAdd: 0 },
          { id: 'designers-choice', name: "Designer's Choice", hex: null, priceAdd: 0 }
        ]
      },
      {
        id: 'size-upgrade',
        label: 'Size',
        options: [
          { id: 'small', name: 'Small', priceAdd: 0 },
          { id: 'medium', name: 'Medium', priceAdd: 25 },
          { id: 'large', name: 'Large', priceAdd: 50 },
          { id: 'xl', name: 'Extra Large', priceAdd: 85 }
        ]
      },
      {
        id: 'premium-blooms',
        label: 'Premium Blooms',
        isAddon: true,
        options: [
          { id: 'standard', name: 'Standard Blooms', priceAdd: 0 },
          { id: 'premium', name: 'Add Premium Blooms (+$20)', priceAdd: 20 }
        ]
      },
      {
        id: 'luxe-wrapping',
        label: 'Wrapping',
        isAddon: true,
        options: [
          { id: 'standard', name: 'Standard Wrapping', priceAdd: 0 },
          { id: 'luxe', name: 'Luxe Wrapping (+$15)', priceAdd: 15 }
        ]
      }
    ],
    inStock: true,
    featured: true
  },
  {
    id: 'vase-arrangement',
    name: 'Vase Arrangements',
    category: 'arrangements',
    description: 'Designed in a curated vase, our arrangements are perfect for homes, offices, and thoughtful gifting. Each piece is water-arranged and styled for longevity. Vase style may vary slightly while maintaining the same elegance and value.',
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522057384400-681b421cfebc?w=800&auto=format&fit=crop'
    ],
    sizes: [
      { id: 'classic', name: 'Classic', stems: '15-20', price: 85 },
      { id: 'luxe', name: 'Luxe', stems: '25-35', price: 145 }
    ],
    optionType: 'style',
    optionLabel: 'Style',
    options: [
      { id: 'soft-romantic', name: 'Soft Romantic', hex: '#f8d7da' },
      { id: 'garden-inspired', name: 'Garden-Inspired', hex: '#d4ddd0' },
      { id: 'modern-neutral', name: 'Modern Neutral', hex: '#e2d7c9' },
      { id: 'designers-choice', name: "Designer's Choice", hex: null }
    ],
    inStock: true,
    featured: false
  }
];

// Inquiry-only services (Events & Experiences)
export const services = [
  {
    id: 'micro-wedding',
    name: 'Micro Wedding Floral Decor',
    category: 'events',
    type: 'inquiry-only',
    description: 'Our micro wedding florals are thoughtfully designed to complement intimate celebrations. Each wedding is custom curated based on your vision, venue, and guest count.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop',
    includes: ['Bridal bouquets', 'Ceremony florals', 'Reception centerpieces', 'Personal flowers']
  },
  {
    id: 'special-event',
    name: 'Dinner / Proposal / Special Event Decor',
    category: 'events',
    type: 'inquiry-only',
    description: 'These experiences are designed intentionally and priced based on scale, floral selection, and setup needs. Inquiries allow us to create something truly personal.',
    image: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&auto=format&fit=crop',
    includes: ['Romantic dinners', 'Proposals', 'Birthdays', 'Private events']
  },
  {
    id: 'fully-custom',
    name: 'Fully Custom Arrangements',
    category: 'events',
    type: 'inquiry-only',
    description: 'For clients seeking one-of-a-kind floral experiences that go beyond our standard offerings.',
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&auto=format&fit=crop',
    includes: ['Unique installs', 'Statement florals', 'Non-standard designs', 'Bespoke creations']
  }
];

export const getProductById = (id) => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};
