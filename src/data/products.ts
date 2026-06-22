export interface ProductShade {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category:
    | 'lipstick'
    | 'lipgloss'
    | 'lipliner'
    | 'liptint'
    | 'lipbalm'
    | 'eyeshadow'
    | 'eyeliner'
    | 'mascara'
    | 'eyebrow'
    | 'eyelashes'
    | 'primer'
    | 'foundation'
    | 'concealer'
    | 'corrector'
    | 'blush'
    | 'highlighter'
    | 'powder'
    | 'settingspray'
    | 'nailpolish'
    | 'nails'
    | 'brushset'
    | 'blender'
    | 'curler'
    | 'cleaner';
  aisle: 'lips' | 'eyes' | 'face' | 'nails' | 'tools';
  price: number;
  originalPrice: number;
  description: string;
  rating: number;
  reviews: number;
  image: string;
  shades?: ProductShade[];
  features: string[];
  specs: Record<string, string>;
}

export const AISLES = [
  { id: 'lips', name: 'Lips Aisle', icon: 'Sparkles', color: '#ff4d88', desc: 'Premium velvet mattes, glosses & lip glazes' },
  { id: 'eyes', name: 'Eyes Aisle', icon: 'Eye', color: '#884dff', desc: 'Eyeshadow palettes, precision stamps & fiber mascara' },
  { id: 'face', name: 'Face Aisle', icon: 'Smile', color: '#ffb347', desc: 'Full coverage foundations, primers & glowing blushes' },
  { id: 'nails', name: 'Nails Aisle', icon: 'Sparkles', color: '#4dffb5', desc: 'Gel polishes & salon-finish acrylic press-ons' },
  { id: 'tools', name: 'Tools Aisle', icon: 'Sparkles', color: '#ff9ff3', desc: 'Professional brush sets, blenders & styling tools' }
] as const;

export const PRODUCTS: Product[] = [
  // ── LIPS AISLE (12 Products) ──
  {
    id: 'lips-1',
    name: 'Miss Rose Matte Velvet Lipstick',
    category: 'lipstick',
    aisle: 'lips',
    price: 8.50,
    originalPrice: 12.00,
    description: 'An iconic bullet lipstick delivering high-intensity, long-lasting matte color with a weightless, creamy hydration.',
    rating: 4.8,
    reviews: 1240,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Chic Red', hex: '#b30000' },
      { name: 'Rosy Pink', hex: '#d63031' },
      { name: 'Peach Nude', hex: '#e17055' },
      { name: 'Dusty Mauve', hex: '#6c5ce7' },
      { name: 'Soft Coral', hex: '#fd9644' }
    ],
    features: ['16H Long Wear', 'Velvet Smooth Finish', 'Transfer-Proof', 'Enriched with Vitamin E'],
    specs: { 'Finish': 'Matte', 'Weight': '3.4g', 'Form': 'Solid Bullet' }
  },
  {
    id: 'lips-2',
    name: 'Miss Rose Gold Satin Lipstick',
    category: 'lipstick',
    aisle: 'lips',
    price: 9.99,
    originalPrice: 15.00,
    description: 'Premium gold-cased lipstick that glides on like pure silk. Delivers rich pigmentation with a glowing satin finish.',
    rating: 4.9,
    reviews: 843,
    image: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Luxe Ruby', hex: '#c0392b' },
      { name: 'Royal Nude', hex: '#d35400' },
      { name: 'Satin Peach', hex: '#e67e22' },
      { name: 'Plum Royalty', hex: '#8e44ad' }
    ],
    features: ['Luminous Satin Glow', 'Ultra-Creamy Feel', 'Argan Oil Hydration', 'Premium Shell Case'],
    specs: { 'Finish': 'Satin', 'Weight': '3.8g', 'Ingredients': 'Argan Oil & Cocoa Butter' }
  },
  {
    id: 'lips-3',
    name: 'Miss Rose 2-in-1 Lip Crayon',
    category: 'lipstick',
    aisle: 'lips',
    price: 6.99,
    originalPrice: 10.00,
    description: 'A versatile lip crayon with a built-in sharpener. Outlines like a precision liner and fills in with a cozy matte splash.',
    rating: 4.7,
    reviews: 512,
    image: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Ruby Crayon', hex: '#bdc581' }, // custom hex mapped
      { name: 'Terra Cotta', hex: '#e15f41' },
      { name: 'Blush Berry', hex: '#cf6a87' },
      { name: 'Hot Magenta', hex: '#f8a5c2' }
    ],
    features: ['Dual Action Liner & Lipstick', 'Waterproof Formula', 'Smudge-Resistant', 'Soft Precision Point'],
    specs: { 'Finish': 'Semi-Matte', 'Weight': '2.8g', 'Origin': 'P.R.C' }
  },
  {
    id: 'lips-4',
    name: 'Miss Rose Liquid Matte Lip Color',
    category: 'lipstick',
    aisle: 'lips',
    price: 7.99,
    originalPrice: 11.50,
    description: 'High-pigment liquid lipstick that dries to a gorgeous, transfer-free matte seal. Does not crack or dry out lips.',
    rating: 4.6,
    reviews: 955,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Vamp Red', hex: '#800020' },
      { name: 'Sweet Pink', hex: '#ff6b81' },
      { name: 'Nude Almond', hex: '#cca490' },
      { name: 'Caramel Glaze', hex: '#a16a4f' }
    ],
    features: ['24H Wear', 'Kiss-Proof Formula', 'Hydrating Base', 'Soft Cushion Wand'],
    specs: { 'Volume': '5.5ml', 'Finish': 'Extreme Matte', 'Dry Time': '30 Seconds' }
  },
  {
    id: 'lips-5',
    name: 'Miss Rose Glass Shine Lipgloss',
    category: 'lipgloss',
    aisle: 'lips',
    price: 6.50,
    originalPrice: 9.00,
    description: 'A glossy glaze that reflects light like liquid glass. Hyaluronic acid blend leaves lips looking instantly fuller and plump.',
    rating: 4.8,
    reviews: 730,
    image: 'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Crystal Clear', hex: '#fdfbfb' },
      { name: 'Rosy Shimmer', hex: '#fab1a0' },
      { name: 'Peach Lustre', hex: '#ffeaa7' },
      { name: 'Golden Glow', hex: '#f39c12' }
    ],
    features: ['High-Shine Glassy Finish', 'Non-Sticky Texture', 'Plumping Effect', 'Coconut Oil Infused'],
    specs: { 'Volume': '6.0ml', 'Finish': 'Wet Gloss', 'Plumping': 'Active Menthol extract' }
  },
  {
    id: 'lips-6',
    name: 'Miss Rose Holographic Lip Lipgloss',
    category: 'lipgloss',
    aisle: 'lips',
    price: 7.50,
    originalPrice: 11.00,
    description: 'Cosmic holographic lip gloss loaded with multi-dimensional pearls. Reflects shifting colors in different lighting conditions.',
    rating: 4.5,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Unicorn Tears', hex: '#dff9fb' },
      { name: 'Pink Nebula', hex: '#ff7979' },
      { name: 'Purple Aurora', hex: '#e056fd' }
    ],
    features: ['Chameleon Shimmer', 'Smooth Sparkles (No Grit)', 'Scented Formula', 'Cruelty-Free'],
    specs: { 'Volume': '5.0ml', 'Finish': 'Glitter Shimmer', 'Flavor': 'Vanilla Strawberry' }
  },
  {
    id: 'lips-7',
    name: 'Miss Rose Liquid Lip Stain Tint',
    category: 'liptint',
    aisle: 'lips',
    price: 5.50,
    originalPrice: 8.00,
    description: 'A light water-based stain that delivers a natural flush of rosy color to lips and cheeks. Absorbs instantly and is kiss-proof.',
    rating: 4.7,
    reviews: 642,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Cherry Stain', hex: '#d63031' },
      { name: 'Strawberry Stain', hex: '#e84393' },
      { name: 'Orange Juice Stain', hex: '#e17055' }
    ],
    features: ['Dual Cheek & Lip Tint', 'Water-Weight Consistency', 'No-Smudge Finish', 'Long Lasting Tint'],
    specs: { 'Volume': '8ml', 'Base': 'Water', 'Texture': 'Liquid Fluid' }
  },
  {
    id: 'lips-8',
    name: 'Miss Rose Velvet Lip Mud',
    category: 'liptint',
    aisle: 'lips',
    price: 6.99,
    originalPrice: 10.00,
    description: 'An airy, whipped matte mousse that blurs lip lines for a soft-focus cloud finish. Feels like weightless cotton on the lips.',
    rating: 4.8,
    reviews: 290,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Clay Rose', hex: '#b33939' },
      { name: 'Sunset Terracotta', hex: '#cd6133' },
      { name: 'Muted Mauve', hex: '#833471' }
    ],
    features: ['Line-Blurring Texture', 'Mousse Cream Formula', 'Soft-Focus Edge', 'Weightless Touch'],
    specs: { 'Finish': 'Powder Matte', 'Weight': '4.5g', 'Application': 'Smudge with fingertip or brush' }
  },
  {
    id: 'lips-9',
    name: 'Miss Rose Shea Moisture Lip Balm',
    category: 'lipbalm',
    aisle: 'lips',
    price: 3.99,
    originalPrice: 6.00,
    description: 'A deeply nourishing lip balm packed with pure Shea Butter and Vitamin E. Locks in moisture for 12 hours.',
    rating: 4.9,
    reviews: 1400,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Sweet Mint', hex: '#a8e6cf' },
      { name: 'Wild Berry', hex: '#ffaaa6' },
      { name: 'Classic Coco', hex: '#d4a373' }
    ],
    features: ['12-Hour Hydration', 'Intense Healing Base', 'Natural Shea Butter', 'SPF 10 Protection'],
    specs: { 'Weight': '4.2g', 'Format': 'Stick', 'Active Agent': 'Shea Butter & Vitamin E' }
  },
  {
    id: 'lips-10',
    name: 'Miss Rose Overnight Lip Mask',
    category: 'lipbalm',
    aisle: 'lips',
    price: 7.99,
    originalPrice: 12.00,
    description: 'A luxurious leave-on gel mask that melts away dead skin cells and infuses lips with vitamin C antioxidants overnight.',
    rating: 4.9,
    reviews: 580,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop',
    shades: [{ name: 'Rose Nectar', hex: '#ffb7b2' }],
    features: ['Melting Texture', 'Exfoliates & Plumps', 'Berry Extract Complex', 'Wake Up to Soft Lips'],
    specs: { 'Weight': '15g', 'Jar Material': 'Premium Frosted Glass', 'Includes': 'Mini Application spatula' }
  },
  {
    id: 'lips-11',
    name: 'Miss Rose 12-Piece Lipliner Set',
    category: 'lipliner',
    aisle: 'lips',
    price: 12.50,
    originalPrice: 20.00,
    description: 'Complete collection of 12 pigment-dense wooden lipliners. Velvet smooth formula outlines lips and locks lipstick.',
    rating: 4.8,
    reviews: 1100,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop',
    features: ['12 Unique Matte Shades', 'Smooth Wooden Casing', 'Smudge-Free Contour', 'Highly Blendable'],
    specs: { 'Pack Count': '12 pencils', 'Finish': 'Matte', 'Core': 'Soft Pigmented Lead' }
  },
  {
    id: 'lips-12',
    name: 'Miss Rose Twist-Up Gel Lipliner',
    category: 'lipliner',
    aisle: 'lips',
    price: 4.50,
    originalPrice: 7.00,
    description: 'Retractable gel-based lipliner that slides effortlessly like melting butter. Creates a water-resistant boundary.',
    rating: 4.6,
    reviews: 340,
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Plum Line', hex: '#6f2232' },
      { name: 'Nude Silk', hex: '#e0a96d' },
      { name: 'Crimson Edge', hex: '#9a1750' }
    ],
    features: ['Twist-up Mechanical Barrel', 'Waterproof Gel Formula', 'Rich Gliding Pigment', 'Includes mini sharpener'],
    specs: { 'Weight': '0.35g', 'Type': 'Retractable Gel', 'Wear': '12 Hours' }
  },

  // ── EYES AISLE (13 Products) ──
  {
    id: 'eyes-1',
    name: 'Miss Rose 18-Color Nude Eyeshadow',
    category: 'eyeshadow',
    aisle: 'eyes',
    price: 14.50,
    originalPrice: 22.00,
    description: 'Best-selling 18-shade palette containing ultra-pigmented buttery mattes, reflective glimmers, and high-shine copper shimmers.',
    rating: 4.9,
    reviews: 1980,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Desert Nudes Palette', hex: '#c2a690' },
      { name: 'Rose Gold Glow Palette', hex: '#db9d9d' }
    ],
    features: ['18 Warm Pigmented Pans', 'Zero Fall-out Pressed Dust', 'Built-in Premium Mirror', 'Includes Double-sided Brush'],
    specs: { 'Pan Count': '18 Colors', 'Weight': '22.8g', 'Case Style': 'Luxury Rose Gold Magnetic Box' }
  },
  {
    id: 'eyes-2',
    name: 'Miss Rose Cosmic Shimmer Palette',
    category: 'eyeshadow',
    aisle: 'eyes',
    price: 16.99,
    originalPrice: 25.00,
    description: 'A stellar selection of 12 holographic pressed glitters. Perfect for adding high-intensity diamond sparkles over eyeshadow looks.',
    rating: 4.7,
    reviews: 420,
    image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=600&auto=format&fit=crop',
    features: ['Pressed Gel Base (No Glue Required)', 'Diamond Dust Particle Shine', 'Cruelty-Free Glam', 'Reflective Multi-chrome Color'],
    specs: { 'Pans': '12 Metallic Glitters', 'Texture': 'Pressed Cream-Gel', 'Net Weight': '16.0g' }
  },
  {
    id: 'eyes-3',
    name: 'Miss Rose Dual Chrome Eyeshadow Duo',
    category: 'eyeshadow',
    aisle: 'eyes',
    price: 5.99,
    originalPrice: 9.00,
    description: 'Travel-friendly compact duo featuring one rich velvety matte transition shade and one high-impact duochrome foil pigment.',
    rating: 4.6,
    reviews: 215,
    image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Sunset Bronze', hex: '#9d6b53' },
      { name: 'Emerald Night', hex: '#165e43' },
      { name: 'Rose Champagne', hex: '#e8a7a1' }
    ],
    features: ['Intense Pigment Payload', 'Compact Pocket Mirror Clamshell', 'Crease-Resistant Glow', 'Finger-friendly Application'],
    specs: { 'Pans': '2 Shades', 'Net Weight': '4.5g', 'Case': 'Round Clear Acrylic' }
  },
  {
    id: 'eyes-4',
    name: 'Miss Rose Liquid Foil Eyeshadow',
    category: 'eyeshadow',
    aisle: 'eyes',
    price: 7.50,
    originalPrice: 11.00,
    description: 'Water-infused liquid metallic eyeshadow that dries down to a heavy metallic foil. Smudge-proof and long lasting.',
    rating: 4.8,
    reviews: 630,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Pure Gold Foil', hex: '#d4af37' },
      { name: 'Platinum Ice', hex: '#dcdde1' },
      { name: 'Rose Gold Lustre', hex: '#ea8685' }
    ],
    features: ['Liquid Foil Metal Finish', 'No Fallout Gel Base', '24H Crease-Proof Shield', 'Precision Doe-Foot Applicator'],
    specs: { 'Volume': '4.5ml', 'Base': 'Aqua-infused Polymer', 'Finish': 'Liquid Metal Chrome' }
  },
  {
    id: 'eyes-5',
    name: 'Miss Rose Winged Eyeliner Stamp',
    category: 'eyeliner',
    aisle: 'eyes',
    price: 8.99,
    originalPrice: 14.00,
    description: 'The famous dual-sided eyeliner. One side has a winged stamp tool, other side is an ultra-fine felt-tip liner. Perfect wings in 5 seconds!',
    rating: 4.9,
    reviews: 3120,
    image: 'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Carbon Black', hex: '#1e272e' },
      { name: 'Dark Chocolate', hex: '#4834d4' } // mapped custom
    ],
    features: ['Perfect Winged Stamp', 'Carbon Black Matte Ink', '100% Smudge-Proof & Waterproof', 'Fast-Drying Polymer'],
    specs: { 'Style': 'Dual-Sided Pen (Stamp + Fine Tip)', 'Tip Size': '0.1mm', 'Vol': '2.5ml' }
  },
  {
    id: 'eyes-6',
    name: 'Miss Rose Liquid Liner Waterproof',
    category: 'eyeliner',
    aisle: 'eyes',
    price: 5.99,
    originalPrice: 9.00,
    description: 'Traditional dip liquid eyeliner with a super fine brush applicator. Delivers a glossy ink line with absolute control.',
    rating: 4.7,
    reviews: 840,
    image: 'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=600&auto=format&fit=crop',
    features: ['Ink Dip Style Brush', 'Deep Onyx Gloss Finish', 'Sweat & Tears Proof', 'Quick-Setting Resin'],
    specs: { 'Volume': '6ml', 'Color': 'Onyx Black', 'Applicator': 'Micro-Hair brush tip' }
  },
  {
    id: 'eyes-7',
    name: 'Miss Rose Pro Gel Liner Pot',
    category: 'eyeliner',
    aisle: 'eyes',
    price: 7.99,
    originalPrice: 12.00,
    description: 'Rich gel cream eyeliner in a glass pot. Comes with a professional angled brush for creating soft smokey wings or sharp cat eyes.',
    rating: 4.8,
    reviews: 490,
    image: 'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Pure Ink Black', hex: '#000000' },
      { name: 'Espresso Brown', hex: '#3d1c02' }
    ],
    features: ['Buttery Cream Texture', 'Indestructible 24H Wear', 'Smokey Blendable Setting', 'Comes with Free Angled Brush'],
    specs: { 'Weight': '4.0g', 'Jar Material': 'Heavy Glass Pot', 'Includes': 'Dual cap travel brush' }
  },
  {
    id: 'eyes-8',
    name: 'Miss Rose Brow Pomade Gel',
    category: 'eyebrow',
    aisle: 'eyes',
    price: 6.99,
    originalPrice: 10.00,
    description: 'Sculpt and fill sparse eyebrows with this wax-gel formula. Keeps brow hairs locked in place for a laminated look.',
    rating: 4.6,
    reviews: 580,
    image: 'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Dark Brown', hex: '#4a3728' },
      { name: 'Medium Brown', hex: '#70543e' },
      { name: 'Soft Black', hex: '#242424' }
    ],
    features: ['Waterproof Gel Wax', 'Sculpts & Lays Brows', 'High Pigment Density', 'Includes spoolie-brush duo'],
    specs: { 'Weight': '3.5g', 'Finish': 'Matte Clay', 'Hold': '24H Extreme' }
  },
  {
    id: 'eyes-9',
    name: 'Miss Rose Fine Brow Pencil',
    category: 'eyebrow',
    aisle: 'eyes',
    price: 4.99,
    originalPrice: 8.00,
    description: 'An ultra-fine retractable brow pencil with a 0.5mm tip. Allows you to draw realistic, hair-like strokes easily.',
    rating: 4.7,
    reviews: 930,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Ash Brown', hex: '#5e4f43' },
      { name: 'Charcoal Black', hex: '#2d3436' }
    ],
    features: ['0.5mm Retractable Tip', 'Waxy Cream Core', 'Built-in Soft Spoolie', 'Smudge-Free Blending'],
    specs: { 'Weight': '0.12g', 'Type': 'Mechanical Pencil', 'Tip': 'Micro-fine round' }
  },
  {
    id: 'eyes-10',
    name: 'Miss Rose 3D Fiber Lash Mascara',
    category: 'mascara',
    aisle: 'eyes',
    price: 9.50,
    originalPrice: 15.00,
    description: 'Advanced dual-step fiber mascara. Extends lashes to astronomical lengths and dramatic 3D volume using micro cellulose fibers.',
    rating: 4.8,
    reviews: 1840,
    image: 'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=600&auto=format&fit=crop',
    features: ['Micro Cellulose Fibers', 'Astronomical Length & Curl', 'Flake-Free 24H Shield', 'Hourglass Silicone Brush'],
    specs: { 'Volume': '10ml', 'Color': 'Midnight Black', 'Removal': 'Cleansing oil or warm water' }
  },
  {
    id: 'eyes-11',
    name: 'Miss Rose Hyper-Curl Mascara',
    category: 'mascara',
    aisle: 'eyes',
    price: 7.99,
    originalPrice: 12.00,
    description: 'Instant lash lifting formula with a curved comb wand. Holds curls in place for 18 hours without clumping.',
    rating: 4.7,
    reviews: 1120,
    image: 'https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=600&auto=format&fit=crop',
    features: ['Lash Lifting Resin', 'Curved comb wand', 'Clump-free light wax', 'Smudge-proof polymer'],
    specs: { 'Volume': '8.5ml', 'Finish': 'Matte Carbon Black', 'Wear': '18 Hours' }
  },
  {
    id: 'eyes-12',
    name: 'Miss Rose Faux Mink Lashes (3D)',
    category: 'eyelashes',
    aisle: 'eyes',
    price: 6.50,
    originalPrice: 10.00,
    description: 'Premium fluffy faux mink eyelashes with a flexible cotton band. Blends seamlessly with your natural lashes.',
    rating: 4.8,
    reviews: 640,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Wispy Natural', hex: '#222' },
      { name: 'Dramatic Volume', hex: '#000' }
    ],
    features: ['Reusable up to 25 times', 'Flexible Cotton Band', 'Premium Synthetic Silk', 'Feather-Light Feel'],
    specs: { 'Style': '3D Layered Fluffy', 'Length': '14mm - 16mm', 'Adhesive': 'Sold separately' }
  },
  {
    id: 'eyes-13',
    name: 'Miss Rose Self-Adhesive Lash Kit',
    category: 'eyelashes',
    aisle: 'eyes',
    price: 9.99,
    originalPrice: 16.00,
    description: 'Revolutionary lashes with pre-applied glue bands. Apply instantly without messy lash glue. Includes applicator tool.',
    rating: 4.5,
    reviews: 180,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop',
    features: ['No Glue Required', 'Pressure Sensitive Adhesive', '10-Second Application', 'Reusable bands included'],
    specs: { 'Includes': 'Pair of lashes, lash applicator, 2 spare adhesive strips', 'Width': '33mm' }
  },

  // ── FACE AISLE (15 Products) ──
  {
    id: 'face-1',
    name: 'Miss Rose Pore Blur Face Primer',
    category: 'primer',
    aisle: 'face',
    price: 8.50,
    originalPrice: 13.00,
    description: 'A velvety silicone-based primer that instantly blurs large pores, fills fine lines, and mattifies oily skin shine.',
    rating: 4.8,
    reviews: 1730,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop',
    features: ['Pore Blurring Effect', 'Velvet Silk Shield', 'Locks Makeup for 16H', 'Oil Control Formula'],
    specs: { 'Volume': '30ml', 'Base': 'Dimethicone Silicone', 'Texture': 'Velvet Mousse Gel' }
  },
  {
    id: 'face-2',
    name: 'Miss Rose Illuminating Glow Primer',
    category: 'primer',
    aisle: 'face',
    price: 9.50,
    originalPrice: 15.00,
    description: 'Water-gel primer infused with glowing micro-pearls. Creates a hydrated, glass-skin finish before foundation.',
    rating: 4.7,
    reviews: 430,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop',
    features: ['Glass Skin Glow Finish', 'Hyaluronic Acid Hydration', 'Water-light Comfort', 'Non-comedogenic'],
    specs: { 'Volume': '35ml', 'Skin Type': 'Dry, Normal & Combination', 'Finish': 'Dewy Glow' }
  },
  {
    id: 'face-3',
    name: 'Miss Rose Full Coverage Foundation',
    category: 'foundation',
    aisle: 'face',
    price: 11.99,
    originalPrice: 18.00,
    description: 'The legendary high-performance foundation. Delivers a flawless, full-coverage matte finish that conceals spots, redness, and acne.',
    rating: 4.9,
    reviews: 4230,
    image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Fair Ivory', hex: '#f9f1e3' },
      { name: 'Warm Beige', hex: '#f1dfbe' },
      { name: 'Natural Tan', hex: '#dfc295' },
      { name: 'Golden Honey', hex: '#cca16e' },
      { name: 'Sand Nude', hex: '#edd0b0' }
    ],
    features: ['24H Waterproof Wear', 'Full Coverage Masking', 'Sweat & Humidity Proof', 'SPF 15 Filters'],
    specs: { 'Volume': '38ml', 'Packaging': 'Luxury Glass Bottle with Pump', 'Finish': 'Natural Matte' }
  },
  {
    id: 'face-4',
    name: 'Miss Rose Silk Glow Serum Foundation',
    category: 'foundation',
    aisle: 'face',
    price: 13.50,
    originalPrice: 20.00,
    description: 'A light-weight serum foundation infused with skin nutrients. Blends like water for a medium, buildable, glowing skin-like finish.',
    rating: 4.8,
    reviews: 920,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Ivory Glow', hex: '#fcedda' },
      { name: 'Beige Glow', hex: '#edd5be' },
      { name: 'Almond Glow', hex: '#dbaa83' }
    ],
    features: ['Infused with Niacinamide', 'Medium Buildable Coverage', 'Luminous Dewy Shield', 'Weightless Texture'],
    specs: { 'Volume': '30ml', 'Active Agents': 'Niacinamide & Hyaluronic Acid', 'UV': 'SPF 20' }
  },
  {
    id: 'face-5',
    name: 'Miss Rose Cream-to-Powder Compact',
    category: 'foundation',
    aisle: 'face',
    price: 8.99,
    originalPrice: 14.00,
    description: 'Dual-action cream foundation that sets into a velvety powder shield on contact. Perfect for quick touch-ups on the go.',
    rating: 4.5,
    reviews: 310,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Porcelain Cream', hex: '#fff4e6' },
      { name: 'Honey Cream', hex: '#fcdcb8' }
    ],
    features: ['Cream-to-Powder Transition', 'Full Matte Finish', 'Includes Powder Puff', 'Built-in travel mirror'],
    specs: { 'Weight': '12g', 'Format': 'Pressed compact powder-cream', 'Origin': 'P.R.C' }
  },
  {
    id: 'face-6',
    name: 'Miss Rose Pro Matte Liquid Concealer',
    category: 'concealer',
    aisle: 'face',
    price: 5.99,
    originalPrice: 9.00,
    description: 'High-density liquid concealer that neutralizes dark circles, blemishes, and acne scars with a crease-free matte coverage.',
    rating: 4.8,
    reviews: 1540,
    image: 'https://images.unsplash.com/photo-1619451334792-150fd785ee74?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Ivory Light', hex: '#fff3e0' },
      { name: 'Fair Skin', hex: '#ffe0b2' },
      { name: 'Warm Tan', hex: '#ffe8d6' }
    ],
    features: ['Crease-free Liquid Matte', 'High-Density Hide Pigment', 'Botanical extracts base', 'Ophthalmologist tested'],
    specs: { 'Volume': '6.8ml', 'Finish': 'Matte', 'Applicator': 'Large flat paddle wand' }
  },
  {
    id: 'face-7',
    name: 'Miss Rose 6-Color Contour Palette',
    category: 'concealer',
    aisle: 'face',
    price: 10.99,
    originalPrice: 17.00,
    description: 'Essential face sculpting palette containing 6 cream colors for contouring, highlighting, and correcting cheekbones.',
    rating: 4.7,
    reviews: 670,
    image: 'https://images.unsplash.com/photo-1601612628452-9e99ced43524?q=80&w=600&auto=format&fit=crop',
    features: ['6 Ultra-Blendable Creams', 'Contours & Bronzes', 'Highlight & Correct shades', 'Travel-friendly slim pack'],
    specs: { 'Pans': '6 Cream Wells', 'Total Weight': '18g', 'Case Style': 'Slim matte black palette' }
  },
  {
    id: 'face-8',
    name: 'Miss Rose Color Corrector Palette',
    category: 'corrector',
    aisle: 'face',
    price: 9.50,
    originalPrice: 15.00,
    description: 'Color-neutralizing wheel featuring Green (for redness), Orange (for dark spots), Yellow (dullness) and Purple (yellow tones).',
    rating: 4.6,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1601612628452-9e99ced43524?q=80&w=600&auto=format&fit=crop',
    features: ['Green Redness Canceler', 'Orange Dark Circle Mask', 'Yellow Brightener', 'Cream-to-powder glide'],
    specs: { 'Pans': '4 Clay Correctors', 'Net Weight': '8.5g', 'Texture': 'Waxy blendable cream' }
  },
  {
    id: 'face-9',
    name: 'Miss Rose Soft Cream Blush Stick',
    category: 'blush',
    aisle: 'face',
    price: 7.99,
    originalPrice: 12.00,
    description: 'A creamy blush stick that melts on your cheeks for a natural, dewy flush of color. Blends seamlessly with warm fingertips.',
    rating: 4.9,
    reviews: 840,
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Peach Sorbet', hex: '#ffa07a' },
      { name: 'Rose Petal', hex: '#ff8a8a' },
      { name: 'Coral Flush', hex: '#ff7f50' }
    ],
    features: ['Cream-to-Skin Melting', 'Dewy Hydrated Finish', 'Stick Swivel Casing', 'Fragrant Nectar Scent'],
    specs: { 'Weight': '8.5g', 'Type': 'Cream Stick', 'Skin finish': 'Dewy Satin' }
  },
  {
    id: 'face-10',
    name: 'Miss Rose 6-Color Powder Blush Palette',
    category: 'blush',
    aisle: 'face',
    price: 11.50,
    originalPrice: 18.00,
    description: 'A collection of 6 highly-pigmented matte and shimmer powder blushes. From soft peach to deep pink.',
    rating: 4.8,
    reviews: 690,
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop',
    features: ['6 Pigmented Matte & Shimmer Blushes', 'Velvety Pressed Dust', 'Long Lasting Cheeks Color', 'Includes Blush Brush'],
    specs: { 'Pan Count': '6 Powders', 'Weight': '24g', 'Case Style': 'Luxury Rose Gold case' }
  },
  {
    id: 'face-11',
    name: 'Miss Rose 3D Liquid Highlighter',
    category: 'highlighter',
    aisle: 'face',
    price: 8.50,
    originalPrice: 13.00,
    description: 'Metallic glow drops that give a dazzling, multi-dimensional highlight. Mix with foundation or apply directly to high points.',
    rating: 4.8,
    reviews: 1430,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Champagne Shimmer', hex: '#eddccb' },
      { name: 'Rose Stardust', hex: '#f0ced3' },
      { name: 'Bronze Gold', hex: '#ccac8a' }
    ],
    features: ['Metallic Liquid Pearl Drops', 'Blendable Multi-dimensional Glow', 'Mixable with Foundation/Body Lotions', 'Quick Dry Glow'],
    specs: { 'Volume': '15ml', 'Applicator': 'Precision Dropper pipet', 'Finish': 'Diamond Chrome Shine' }
  },
  {
    id: 'face-12',
    name: 'Miss Rose Baked Glow Highlighter',
    category: 'highlighter',
    aisle: 'face',
    price: 7.99,
    originalPrice: 12.00,
    description: 'A baked powder highlighter that delivers a metallic, wet-look glow. Ultra-fine micro shimmer particles.',
    rating: 4.7,
    reviews: 820,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Diamond Sparkle', hex: '#ffffff' },
      { name: 'Golden Glow', hex: '#ffd700' }
    ],
    features: ['Baked Metallic Formulation', 'Wet-Look Glow Intensity', 'Zero Chunky Glitter', 'Silk Dust Glide'],
    specs: { 'Weight': '8.0g', 'Type': 'Baked Pressed Dome', 'Compact': 'Clear lid case' }
  },
  {
    id: 'face-13',
    name: 'Miss Rose Matte Setting Powder',
    category: 'powder',
    aisle: 'face',
    price: 6.99,
    originalPrice: 11.00,
    description: 'Ultra-fine translucent loose powder that bakes makeup, controls oil shine, and provides a soft-focus velvet finish.',
    rating: 4.9,
    reviews: 1140,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Translucent White', hex: '#ffffff' },
      { name: 'Banana Yellow', hex: '#f5f6e3' }
    ],
    features: ['Pore Blur Baking Finish', '12H Extreme Shine Control', 'Zero Flashback Photos', 'Includes Premium Powder Puff'],
    specs: { 'Weight': '20g', 'Packaging': 'Sifter jar with mesh lock', 'Origin': 'P.R.C' }
  },
  {
    id: 'face-14',
    name: 'Miss Rose Matte Compact Powder',
    category: 'powder',
    aisle: 'face',
    price: 5.99,
    originalPrice: 9.00,
    description: 'Pressed powder compact that controls shine and provides a light foundation coverage. Perfect for handbag touch-ups.',
    rating: 4.6,
    reviews: 840,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Ivory Tone', hex: '#fff5e6' },
      { name: 'Beige Tone', hex: '#edd3be' }
    ],
    features: ['Pressed Matte Finish', 'Seals Foundation Base', 'Built-in Sponge & Mirror', 'Oil-absorbing Kaolin Clay'],
    specs: { 'Weight': '10.5g', 'Packaging': 'Round luxury mirror compact', 'Kaolin': 'Active absorb' }
  },
  {
    id: 'face-15',
    name: 'Miss Rose 24H Setting Spray',
    category: 'settingspray',
    aisle: 'face',
    price: 7.99,
    originalPrice: 12.00,
    description: 'An advanced setting mist that locks makeup in place for 24 hours. Smudge-proof, transfer-proof, and water-resistant.',
    rating: 4.8,
    reviews: 2130,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop',
    features: ['24H Extreme Makeup Lock', 'Water & Smudge Proof Mist', 'Matte Non-sticky finish', 'Infused with Aloe Vera & Green Tea'],
    specs: { 'Volume': '100ml', 'Spray Type': 'Micro-Fine Aerosol Mist', 'Scent': 'Fresh cucumber' }
  },

  // ── NAILS AISLE (6 Products) ──
  {
    id: 'nails-1',
    name: 'Miss Rose Pro Gel Nail Polish',
    category: 'nailpolish',
    aisle: 'nails',
    price: 4.50,
    originalPrice: 7.00,
    description: 'High-shine, salon-quality gel nail polish that dries quickly without any UV lamp. Resists chipping for 7 days.',
    rating: 4.7,
    reviews: 1320,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Scarlet Shine', hex: '#b30000' },
      { name: 'Lavender Mist', hex: '#a29bfe' },
      { name: 'Midnight Black', hex: '#2d3436' },
      { name: 'Cotton Candy', hex: '#ff7675' },
      { name: 'Forest Emerald', hex: '#10ac84' }
    ],
    features: ['7-Day Chip-Resistant Gloss', 'No UV Lamp Required', 'Wide Paddle brush for 1-swipe', '10-Free Clean Chemistry'],
    specs: { 'Volume': '12ml', 'Dry Time': '3 Minutes', 'Finish': 'High Gloss Gel' }
  },
  {
    id: 'nails-2',
    name: 'Miss Rose Matte Velvet Nail Lacquer',
    category: 'nailpolish',
    aisle: 'nails',
    price: 4.99,
    originalPrice: 8.00,
    description: 'A velvet matte nail polish that dries to a sophisticated satin-matte texture. Instant modern nails look.',
    rating: 4.6,
    reviews: 580,
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Matte Royal Maroon', hex: '#6d214f' },
      { name: 'Matte Charcoal Grey', hex: '#2f3542' },
      { name: 'Matte Mauve Rose', hex: '#cf6a87' }
    ],
    features: ['Velvet Matte Finish', 'Ultra-fast 90s Dry', 'Smooth Chalk Glide', 'Chip Resistant Polymer'],
    specs: { 'Volume': '10ml', 'Finish': 'Satin Matte', 'Brush': 'Flat wide style' }
  },
  {
    id: 'nails-3',
    name: 'Miss Rose Water Breathable Polish',
    category: 'nailpolish',
    aisle: 'nails',
    price: 5.50,
    originalPrice: 9.00,
    description: 'Halal-friendly, water-permeable nail polish that allows water and oxygen to pass through to the nails.',
    rating: 4.8,
    reviews: 420,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Blush Nude', hex: '#f8a5c2' },
      { name: 'Crimson Queen', hex: '#c23616' }
    ],
    features: ['Water Permeable (Breathable)', 'Wudhu-Friendly Formula', 'Peel-off removal style', 'Nail-Strengthening Oil'],
    specs: { 'Volume': '11ml', 'Base': 'Water-Permeable Resin', 'Removal': 'Peel off or warm water' }
  },
  {
    id: 'nails-4',
    name: 'Miss Rose French Almond Press-On Nails',
    category: 'nails',
    aisle: 'nails',
    price: 8.99,
    originalPrice: 15.00,
    description: 'Expertly sculpted premium press-on nails in a classic French manicure style and elegant almond shape.',
    rating: 4.8,
    reviews: 620,
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=600&auto=format&fit=crop',
    features: ['Reusable up to 5 times', 'Salon-Like French Acrylic', 'Applied in 5 minutes', 'Includes glue & adhesive tabs'],
    specs: { 'Count': '24 Nails (12 Sizes)', 'Shape': 'Almond Medium', 'Kit Includes': '24 nails, glue, file, cuticle stick' }
  },
  {
    id: 'nails-5',
    name: 'Miss Rose Chrome Pink Press-On Nails',
    category: 'nails',
    aisle: 'nails',
    price: 9.50,
    originalPrice: 16.00,
    description: 'Glamorous coffin-shaped press-on acrylic nails featuring a high-impact metallic chrome pink glaze.',
    rating: 4.7,
    reviews: 280,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop',
    features: ['Mirror Chrome Glaze', 'Rigid Acrylic Shield', 'Custom Shape (Can file/trim)', 'Super-hold glue included'],
    specs: { 'Count': '24 Nails', 'Shape': 'Coffin Long', 'Wear': 'Up to 2 weeks' }
  },
  {
    id: 'nails-6',
    name: 'Miss Rose Matte Onyx Press-On Nails',
    category: 'nails',
    aisle: 'nails',
    price: 8.50,
    originalPrice: 14.00,
    description: 'Sleek stiletto-shaped press-on nails in an edgy matte black onyx finish. Instantly transforms hands.',
    rating: 4.6,
    reviews: 190,
    image: 'https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=600&auto=format&fit=crop',
    features: ['Bold Matte Black Onyx', 'Ultra-sharp Stiletto shape', 'Reusable Acrylic structure', 'Quick tabs & file included'],
    specs: { 'Count': '24 Nails', 'Shape': 'Stiletto Pointy', 'Material': 'Abs resin' }
  },

  // ── TOOLS AISLE (5 Products) ──
  {
    id: 'tools-1',
    name: 'Miss Rose 12-Piece Professional Brush Set',
    category: 'brushset',
    aisle: 'tools',
    price: 18.99,
    originalPrice: 30.00,
    description: 'A luxurious set of 12 professional makeup brushes with ultra-soft synthetic bristles. Pink wooden handles with a leather roll-up bag.',
    rating: 4.9,
    reviews: 1540,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Rose Pink Set', hex: '#ffb6c1' },
      { name: 'Classic Black Set', hex: '#1c1c1c' }
    ],
    features: ['12 Face & Eye Brushes', 'Ultra-Soft Cruelty-Free Bristles', 'Solid Wood Pink Handles', 'Includes Vegan Leather Travel Cup Holder'],
    specs: { 'Bristles': 'Premium Synthetic Silk Fiber', 'Bag Material': 'Vegan Leather Cylinder Case', 'Count': '12 Brushes' }
  },
  {
    id: 'tools-2',
    name: 'Miss Rose 8-Piece Eyes Brush Set',
    category: 'brushset',
    aisle: 'tools',
    price: 9.99,
    originalPrice: 15.00,
    description: 'Dedicated 8-piece brush set designed specifically for eyeshadow blending, eyeliner cut creases, brow carving, and details.',
    rating: 4.8,
    reviews: 580,
    image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=600&auto=format&fit=crop',
    features: ['Blending, Smudging & Crease brushes', 'Fine Detailer Eyeliner tips', 'Soft fluff density', 'Double metal ferrules'],
    specs: { 'Bristles': 'Cruelty-Free Nylon', 'Count': '8 eye brushes', 'Length': 'Average 15.5cm' }
  },
  {
    id: 'tools-3',
    name: 'Miss Rose Super-Soft Beauty Blender',
    category: 'blender',
    aisle: 'tools',
    price: 4.99,
    originalPrice: 8.00,
    description: 'Teardrop makeup sponge that expands in water. Ensures a seamless, airbrushed foundation blending with zero product waste.',
    rating: 4.9,
    reviews: 2310,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop',
    shades: [
      { name: 'Fuchsia Pink', hex: '#e84393' },
      { name: 'Peach Glow', hex: '#ffa07a' }
    ],
    features: ['Expands to 2x size when wet', 'Hydrophilic Non-latex Foam', 'Seamless Airbrush application', 'Ergonomic Teardrop curve'],
    specs: { 'Material': 'Latex-Free Hydrophilic Sponge', 'Shape': 'Classic Teardrop Cut', 'Dry Size': '6.0cm x 4.0cm' }
  },
  {
    id: 'tools-4',
    name: 'Miss Rose Precision Lash Curler',
    category: 'curler',
    aisle: 'tools',
    price: 5.99,
    originalPrice: 10.00,
    description: 'An ergonomic rose-gold eyelash curler with soft silicone padding. Lifts lashes to a sky-high curl without pinching.',
    rating: 4.7,
    reviews: 690,
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop',
    features: ['Rose-Gold Carbon Steel', 'Ergonomic spring tension handles', 'Pinch-free silicone curved pad', 'Includes 3 refill pads'],
    specs: { 'Material': 'Plated Carbon Steel', 'Finish': 'Rose Gold Gloss', 'Included Refills': '3 Silicon pads' }
  },
  {
    id: 'tools-5',
    name: 'Miss Rose Brush Cleanser Pad',
    category: 'cleaner',
    aisle: 'tools',
    price: 6.50,
    originalPrice: 10.00,
    description: 'A textured silicone cleansing mat. Features multiple ridges to scrub away pigment build-up, grease, and dirt from brush bristles.',
    rating: 4.8,
    reviews: 420,
    image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=600&auto=format&fit=crop',
    features: ['Suction cup back grips sink', 'Food-Grade Flexible Silicone', '4 Unique cleaning ridges', 'Gentle on fine hair bristles'],
    specs: { 'Material': 'Food-Grade Silicone', 'Size': '15cm x 11cm', 'Color': 'Pastel Pink' }
  }
];
