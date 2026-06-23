'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  Sparkles as SparklesIcon,
  ArrowRight,
  Flame,
  Palette,
  Eye,
  Smile,
  Gem,
  Wrench,
  X,
  Check,
  ShoppingBag,
  ExternalLink,
  MessageCircle,
  Package,
  Heart,
  Star,
  Gift,
  Award,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Plus,
  Minus
} from 'lucide-react';
import { PRODUCTS, AISLES, Product } from '@/data/products';
import { Header } from '@/components/UI/Header';
import { ProductCard } from '@/components/ProductCard';
import { CartDrawer, CartItem } from '@/components/CartDrawer';

// Category label formatting dictionary
const CATEGORY_NAMES: Record<string, string> = {
  lipstick: 'Lipstick',
  lipgloss: 'Lip Gloss',
  lipliner: 'Lip Liner',
  liptint: 'Lip Tint',
  lipbalm: 'Lip Balm',
  eyeshadow: 'Eyeshadow',
  eyeliner: 'Eyeliner',
  mascara: 'Mascara',
  eyebrow: 'Eyebrow',
  eyelashes: 'Eyelashes',
  primer: 'Primer',
  foundation: 'Foundation',
  concealer: 'Concealer',
  corrector: 'Corrector',
  blush: 'Blush',
  highlighter: 'Highlighter',
  powder: 'Powder',
  settingspray: 'Setting Spray',
  nailpolish: 'Nail Polish',
  nails: 'Nails',
  brushset: 'Brush Set',
  blender: 'Beauty Blender',
  curler: 'Eyelash Curler',
  cleaner: 'Brush Cleaner',
  fragrance: 'Fragrance',
  skincare: 'Skincare',
  giftset: 'Gift Set'
};

function formatCategoryName(category: string): string {
  return CATEGORY_NAMES[category] || category.charAt(0).toUpperCase() + category.slice(1);
}

interface PortionDefinition {
  id: string;
  name: string;
  emoji: string;
  categories: string[];
}

const AISLE_PORTIONS: Record<string, PortionDefinition[]> = {
  lips: [
    { id: 'lipsticks', name: 'Lipsticks Collection', emoji: '💋', categories: ['lipstick', 'liptint'] },
    { id: 'lipliners', name: 'Lip Liners', emoji: '✏️', categories: ['lipliner'] },
    { id: 'lipgloss_balms', name: 'Lip Glosses & Balms', emoji: '✨', categories: ['lipgloss', 'lipbalm'] }
  ],
  eyes: [
    { id: 'eyeshadows', name: 'Eyeshadow Palettes', emoji: '🎨', categories: ['eyeshadow'] },
    { id: 'eyeliners_mascaras', name: 'Eyeliners & Mascaras', emoji: '✒️', categories: ['eyeliner', 'mascara'] },
    { id: 'brows_lashes', name: 'Eyebrows & Eyelashes', emoji: '👁️', categories: ['eyebrow', 'eyelashes'] }
  ],
  face: [
    { id: 'blush', name: 'Blush & Cheeks', emoji: '🌸', categories: ['blush'] },
    { id: 'foundations_primers', name: 'Foundations & Primers', emoji: '🧴', categories: ['foundation', 'primer', 'skincare'] },
    { id: 'concealers_correctors', name: 'Concealers & Correctors', emoji: '🧪', categories: ['concealer', 'corrector'] },
    { id: 'highlighters_powders', name: 'Highlighters & Powders', emoji: '💨', categories: ['highlighter', 'powder', 'settingspray'] }
  ],
  nails: [
    { id: 'nails_polish', name: 'Nails & Nail Polishes', emoji: '💅', categories: ['nailpolish', 'nails'] }
  ],
  tools: [
    { id: 'makeup_tools', name: 'Professional Brushes & Tools', emoji: '🪮', categories: ['brushset', 'blender', 'curler', 'cleaner', 'fragrance', 'giftset'] }
  ]
};

// Toast notification interface
interface ToastMessage {
  id: number;
  message: string;
}

// Order log interface
interface OrderLog {
  id: string;
  date: string;
  items: {
    name: string;
    shade: string;
    qty: number;
    price: number;
  }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'Pending' | 'Packing' | 'Shipped';
  shippingInfo: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
  paymentMethod: string;
}

export default function HomePage() {
  // ── CORE STATES ──
  const [activeAisle, setActiveAisle] = useState<string>('lips');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [showOnlyWishlisted, setShowOnlyWishlisted] = useState(false);
  const [sortBy, setSortBy] = useState<string>('default');

  // ── ORDER SYSTEM STATES ──
  const [orders, setOrders] = useState<OrderLog[]>([]);
  const [ordersPortalOpen, setOrdersPortalOpen] = useState(false);

  // ── TOAST MESSAGES STATE ──
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // ── MULTI-STEP CHECKOUT STATES ──
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [shippingForm, setShippingForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Karachi',
  });
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank' | 'easypaisa'>('cod');
  const [lastSubmittedOrder, setLastSubmittedOrder] = useState<OrderLog | null>(null);

  // ── SLIDERS & DYNAMIC BLOCKS STATES ──
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [bestSellersIdx, setBestSellersIdx] = useState(0);

  const testimonials = useMemo(() => [
    {
      quote: "The velvet matte lipsticks are an absolute dream. Long lasting, hydration-rich, and the rose gold packaging looks so stunning on my dressing table!",
      name: "Sophia L.",
      role: "Luxury Beauty Blogger",
      avatar: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=150&auto=format&fit=crop"
    },
    {
      quote: "I am obsessed with the wing stamp eyeliner. It creates the perfect, symmetric cat-eye in literally seconds. Truly professional grade!",
      name: "Amina K.",
      role: "Professional Makeup Artist",
      avatar: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=150&auto=format&fit=crop"
    },
    {
      quote: "Their damask rose perfume is breathtaking—smells exactly like a fresh botanical garden in Paris. Highly recommend the bridal gift set too!",
      name: "Elena R.",
      role: "Fragrance Enthusiast",
      avatar: "https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=150&auto=format&fit=crop"
    }
  ], []);

  // Best Sellers (Top Rated with high review counts)
  const bestSellers = useMemo(() => {
    return PRODUCTS.filter((p) => p.rating >= 4.8 && p.reviews > 400).slice(0, 6);
  }, []);

  const handlePrevBestSeller = () => {
    setBestSellersIdx((prev) => (prev === 0 ? bestSellers.length - 3 : prev - 1));
  };
  const handleNextBestSeller = () => {
    setBestSellersIdx((prev) => (prev >= bestSellers.length - 3 ? 0 : prev + 1));
  };

  // Testimonials auto-sliding
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  // ── LOAD THEME & STORAGE ON MOUNT ──
  useEffect(() => {
    const savedTheme = localStorage.getItem('mr-theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);

    const savedWish = localStorage.getItem('mr-wishlist');
    if (savedWish) {
      setWishlist(JSON.parse(savedWish));
    }

    const savedOrders = localStorage.getItem('mr-orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // ── SYSTEM CUSTOM EVENTS ──
  useEffect(() => {
    const handleShowToast = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.message) {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, message: customEvent.detail.message }]);
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
      }
    };

    const handleFilterWishlist = () => {
      setShowOnlyWishlisted((w) => {
        const nextState = !w;
        const msg = nextState ? 'Displaying Wishlisted Items only! 💖' : 'Showing all products.';
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: msg } }));
        return nextState;
      });
    };

    window.addEventListener('show-toast', handleShowToast);
    window.addEventListener('filter-wishlist', handleFilterWishlist);
    return () => {
      window.removeEventListener('show-toast', handleShowToast);
      window.removeEventListener('filter-wishlist', handleFilterWishlist);
    };
  }, []);

  // ── THEME SWITCHER ──
  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('mr-theme', next);
      document.documentElement.setAttribute('data-theme', next);
      
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message: `Switched to ${next === 'light' ? 'Blushing Rose' : 'Onyx Violet'} mode! 💅` }
      }));
      return next;
    });
  }, []);

  // ── WISHLIST SWITCHER ──
  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      const updated = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem('mr-wishlist', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // ── PRODUCTS PIPELINE (Filter & Sort) ──
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.shades?.some((s) => s.name.toLowerCase().includes(q))
      );
    } else {
      result = result.filter((p) => p.aisle === activeAisle);
    }

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (showOnlyWishlisted) {
      result = result.filter((p) => wishlist.includes(p.id));
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'popular') {
      result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [activeAisle, activeCategory, searchQuery, showOnlyWishlisted, wishlist, sortBy]);

  const currentCategories = useMemo(() => {
    if (searchQuery.trim()) {
      const results = PRODUCTS.filter((p) => {
        const q = searchQuery.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      });
      return Array.from(new Set(results.map((p) => p.category)));
    }
    return Array.from(new Set(PRODUCTS.filter((p) => p.aisle === activeAisle).map((p) => p.category)));
  }, [activeAisle, searchQuery]);

  useEffect(() => {
    setActiveCategory('all');
    if (searchQuery.trim()) {
      setShowOnlyWishlisted(false);
    }
  }, [activeAisle, searchQuery]);

  // ── CART CONTROLLERS ──
  const handleAddToCart = useCallback(
    (product: Product, shade: string, shadeHex: string, qty: number = 1) => {
      setCartItems((prev) => {
        const existing = prev.find(
          (i) => i.product.id === product.id && i.shade === shade
        );
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id && i.shade === shade
              ? { ...i, quantity: i.quantity + qty }
              : i
          );
        }
        return [...prev, { product, shade, shadeHex, quantity: qty }];
      });
    },
    []
  );

  const handleUpdateQty = useCallback(
    (productId: string, shade: string, delta: number) => {
      setCartItems((prev) =>
        prev
          .map((i) =>
            i.product.id === productId && i.shade === shade
              ? { ...i, quantity: i.quantity + delta }
              : i
          )
          .filter((i) => i.quantity > 0)
      );
    },
    []
  );

  const handleRemoveItem = useCallback((productId: string, shade: string) => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.shade === shade))
    );
    window.dispatchEvent(new CustomEvent('show-toast', {
      detail: { message: 'Removed item from cart.' }
    }));
  }, []);

  // ── ORDER EXECUTION & CHECKOUT FORM ──
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const shipping = subtotal >= 50.00 ? 0 : 5.99;
  const grandTotal = subtotal + tax + shipping;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!shippingForm.name || !shippingForm.phone || !shippingForm.address) {
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message: 'Please fill in all shipping details!' }
      }));
      return;
    }

    const orderId = `MR-${Math.floor(Math.random() * 900000 + 100000)}`;
    const newOrder: OrderLog = {
      id: orderId,
      date: new Date().toLocaleDateString('en-PK', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: cartItems.map((i) => ({
        name: i.product.name,
        shade: i.shade,
        qty: i.quantity,
        price: i.product.price,
      })),
      subtotal,
      tax,
      shipping,
      total: grandTotal,
      status: 'Pending',
      shippingInfo: { ...shippingForm },
      paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'bank' ? 'Bank Transfer' : 'EasyPaisa/JazzCash',
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('mr-orders', JSON.stringify(updatedOrders));

    setCartItems([]);
    setLastSubmittedOrder(newOrder);
    setCheckoutOpen(false);

    const confetti = (await import('canvas-confetti')).default;
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#e5989b', '#e5c158', '#ffffff'],
    });

    window.dispatchEvent(new CustomEvent('show-toast', {
      detail: { message: 'Order created successfully! 🎊' }
    }));
  };

  const handleSendWhatsApp = (order: OrderLog) => {
    const itemsText = order.items
      .map((i) => `• ${i.qty}x ${i.name} (${i.shade}) - $${(i.price * i.qty).toFixed(2)}`)
      .join('\n');

    const message = `*MISS ROSE Luxe Edition - Order Details*
---------------------------------------
*Order ID:* ${order.id}
*Date:* ${order.date}
*Status:* ${order.status}

*Customer Details:*
• *Name:* ${order.shippingInfo.name}
• *Phone:* ${order.shippingInfo.phone}
• *Address:* ${order.shippingInfo.address}, ${order.shippingInfo.city}
• *Payment:* ${order.paymentMethod}

*Items Ordered:*
${itemsText}

---------------------------------------
*Subtotal:* $${order.subtotal.toFixed(2)}
*Tax (5%):* $${order.tax.toFixed(2)}
*Shipping:* ${order.shipping === 0 ? 'FREE' : `$${order.shipping.toFixed(2)}`}
*Total Order Value:* *$${order.total.toFixed(2)}*

Thank you for shopping with MISS ROSE! 🌸`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/923001234567?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  // Helper mapping for category selection clicks in Category section
  const handleCategoryCardClick = (catId: string) => {
    switch (catId) {
      case 'lipsticks':
        setActiveAisle('lips');
        setActiveCategory('lipstick');
        break;
      case 'foundations':
        setActiveAisle('face');
        setActiveCategory('foundation');
        break;
      case 'eye-makeup':
        setActiveAisle('eyes');
        setActiveCategory('all');
        break;
      case 'skincare':
        setActiveAisle('face');
        setActiveCategory('skincare');
        break;
      case 'brushes':
        setActiveAisle('tools');
        setActiveCategory('brushset');
        break;
      case 'fragrances':
        setActiveAisle('tools');
        setActiveCategory('fragrance');
        break;
      case 'new-arrivals':
        setActiveAisle('lips');
        setActiveCategory('all');
        setSortBy('popular');
        break;
      case 'gift-sets':
        setActiveAisle('tools');
        setActiveCategory('giftset');
        break;
      default:
        setActiveCategory('all');
    }
    setSearchQuery('');
    setShowOnlyWishlisted(false);
    document.getElementById('explore-collection')?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentAisleData = AISLES.find((a) => a.id === activeAisle) ?? AISLES[0];

  return (
    <>
      {/* ── STICKY NAVIGATION HEADER ── */}
      <Header
        cartCount={cartItems.reduce((a, i) => a + i.quantity, 0)}
        onCartOpen={() => setCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenOrders={() => setOrdersPortalOpen(true)}
        wishlistCount={wishlist.length}
        isWishlistActive={showOnlyWishlisted}
        onLogoClick={() => {
          setSearchQuery('');
          setActiveCategory('all');
          setShowOnlyWishlisted(false);
          setActiveAisle('lips');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* ── MAIN LAYOUT WRAPPER ── */}
      <main style={{ minHeight: '80vh' }}>
        
        {/* ══ HERO SECTION ══ */}
        {!searchQuery && !showOnlyWishlisted && (
          <section className="hero-banner" aria-label="Welcome Banner">
            {/* Floating decors */}
            <div className="floating-decor one" />
            <div className="floating-decor two" />
            
            <div className="container hero-grid">
              <div className="hero-text">
                <div className="hero-badge">
                  <span /> Premium Luxury Beauty
                </div>
                <h2 className="hero-title">
                  The New Standard of <span>Sensorial Elegance</span>
                </h2>
                <p className="hero-desc">
                  Step into a sensory world of French-formulated cosmetics, botanical skincare, and signature perfume blends. Crafted for unmatched longevity, texture, and visual brilliance.
                </p>
                <div className="hero-ctas">
                  <button
                    className="btn-luxury primary"
                    onClick={() => {
                      document.getElementById('explore-collection')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Explore Shop <ArrowRight size={14} />
                  </button>
                  <button
                    className="btn-luxury outline"
                    onClick={() => {
                      document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    View Best Sellers
                  </button>
                </div>
                <div className="hero-stats">
                  <div className="stat-box">
                    <h3>60+</h3>
                    <p>Luxe Formulations</p>
                  </div>
                  <div className="stat-box">
                    <h3>100%</h3>
                    <p>Cruelty-Free</p>
                  </div>
                  <div className="stat-box">
                    <h3>24H</h3>
                    <p>Hydrating Shield</p>
                  </div>
                </div>
              </div>

              <div className="hero-image-wrap">
                <div className="hero-circle-bg" />
                <div className="hero-main-img hero-fade">
                  <img
                    src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop"
                    alt="Premium luxury cosmetics bottles arrangement"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══ CATEGORY SECTION ══ */}
        {!searchQuery && !showOnlyWishlisted && (
          <section className="category-section" id="categories" aria-label="Beauty Categories">
            <div className="container">
              <div className="section-title-wrap">
                <p className="section-subtitle">Curated Collections</p>
                <h3 className="section-main-title">Shop by <span>Category</span></h3>
                <div className="section-decor-line" />
              </div>

              <div className="category-grid">
                <button className="category-card" onClick={() => handleCategoryCardClick('lipsticks')}>
                  <div className="category-icon-box"><Palette size={20} /></div>
                  <span className="category-title">Lipsticks</span>
                </button>
                <button className="category-card" onClick={() => handleCategoryCardClick('foundations')}>
                  <div className="category-icon-box"><Smile size={20} /></div>
                  <span className="category-title">Foundations</span>
                </button>
                <button className="category-card" onClick={() => handleCategoryCardClick('eye-makeup')}>
                  <div className="category-icon-box"><Eye size={20} /></div>
                  <span className="category-title">Eye Makeup</span>
                </button>
                <button className="category-card" onClick={() => handleCategoryCardClick('skincare')}>
                  <div className="category-icon-box"><Gem size={20} /></div>
                  <span className="category-title">Skincare</span>
                </button>
                <button className="category-card" onClick={() => handleCategoryCardClick('brushes')}>
                  <div className="category-icon-box"><Wrench size={20} /></div>
                  <span className="category-title">Brushes</span>
                </button>
                <button className="category-card" onClick={() => handleCategoryCardClick('fragrances')}>
                  <div className="category-icon-box"><Flame size={20} /></div>
                  <span className="category-title">Fragrances</span>
                </button>
                <button className="category-card" onClick={() => handleCategoryCardClick('new-arrivals')}>
                  <div className="category-icon-box"><SparklesIcon size={20} /></div>
                  <span className="category-title">New Arrivals</span>
                </button>
                <button className="category-card" onClick={() => handleCategoryCardClick('gift-sets')}>
                  <div className="category-icon-box"><Gift size={20} /></div>
                  <span className="category-title">Gift Sets</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ══ PRODUCTS LISTING WRAPPER ══ */}
        <section
          id="explore-collection"
          style={{ paddingBottom: '5rem' }}
          className={!searchQuery && !showOnlyWishlisted ? '' : 'no-hero-offset'}
        >
          {/* ══ AISLE NAV BAR ══ */}
          {!searchQuery && !showOnlyWishlisted && (
            <div className="aisle-nav">
              <div className="container">
                <div className="aisle-tabs-wrapper" role="tablist">
                  {AISLES.map((aisle) => (
                    <button
                      key={aisle.id}
                      className={`aisle-btn-tab ${activeAisle === aisle.id ? 'active' : ''}`}
                      role="tab"
                      aria-selected={activeAisle === aisle.id}
                      onClick={() => setActiveAisle(aisle.id)}
                    >
                      {aisle.name.replace(' Aisle', '')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="container">
            {/* Header info card showing currently selected Aisle */}
            {!searchQuery && !showOnlyWishlisted && (
              <div
                className="aisle-info-card"
                style={{
                  '--aisle-accent': currentAisleData.color,
                } as React.CSSProperties}
              >
                <p className="section-subtitle" style={{ marginBottom: '0.25rem' }}>
                  Explore Collection
                </p>
                <h3 className="aisle-info-title">{currentAisleData.name}</h3>
                <p className="aisle-info-desc">{currentAisleData.desc}</p>
              </div>
            )}

            {/* Filter and Sorting Row */}
            <div className="filter-row">
              {/* Category selector chips */}
              <div className="chips-container" role="group" aria-label="Subcategory filters">
                <button
                  className={`category-chip ${activeCategory === 'all' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory('all');
                    setShowOnlyWishlisted(false);
                  }}
                >
                  All Items
                </button>
                {currentCategories.map((cat) => (
                  <button
                    key={cat}
                    className={`category-chip ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => {
                      setActiveCategory(cat);
                      setShowOnlyWishlisted(false);
                    }}
                  >
                    {formatCategoryName(cat)}
                  </button>
                ))}
              </div>

              {/* Sorting options */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Sort by:</span>
                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort product items"
                >
                  <option value="default">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="popular">Most Reviewed</option>
                </select>
              </div>
            </div>

            {/* Search results banner */}
            {searchQuery && (
              <div style={{ marginBlock: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                  Search Results for: <span style={{ color: 'var(--primary-deep)', fontStyle: 'italic' }}>&ldquo;{searchQuery}&rdquo;</span>
                </h3>
                <button className="category-chip" onClick={() => setSearchQuery('')}>Clear Search</button>
              </div>
            )}

            {/* Wishlist Active banner */}
            {showOnlyWishlisted && (
              <div style={{ marginBlock: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400 }}>
                  Wishlist Collection: <span style={{ color: 'var(--primary-deep)', fontStyle: 'italic' }}>{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</span>
                </h3>
                <button className="category-chip" onClick={() => setShowOnlyWishlisted(false)}>Show All Products</button>
              </div>
            )}

            {/* Product Card Grid */}
            {filteredProducts.length > 0 ? (
              (activeCategory === 'all' && !searchQuery && !showOnlyWishlisted && AISLE_PORTIONS[activeAisle]) ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', width: '100%' }}>
                  {AISLE_PORTIONS[activeAisle].map((portion) => {
                    const portionProducts = filteredProducts.filter((p) =>
                      portion.categories.includes(p.category)
                    );
                    if (portionProducts.length === 0) return null;

                    return (
                      <div key={portion.id} className="portion-section">
                        <div className="portion-header">
                          <span className="portion-emoji">{portion.emoji}</span>
                          <h4>{portion.name}</h4>
                          <span className="portion-count-badge">{portionProducts.length} items</span>
                        </div>
                        <div className="products-grid">
                          {portionProducts.map((prod, idx) => (
                            <ProductCard
                              key={prod.id}
                              product={prod}
                              onAddToCart={handleAddToCart}
                              onToggleWishlist={toggleWishlist}
                              isWishlisted={wishlist.includes(prod.id)}
                              index={idx}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="products-grid">
                  {filteredProducts.map((prod, idx) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onAddToCart={handleAddToCart}
                      onToggleWishlist={toggleWishlist}
                      isWishlisted={wishlist.includes(prod.id)}
                      index={idx}
                    />
                  ))}
                </div>
              )
            ) : (
              <div style={{ textAlign: 'center', paddingBlock: '6rem', color: 'var(--text-muted)' }}>
                <SparklesIcon size={40} style={{ marginInline: 'auto', marginBottom: '1rem', opacity: 0.3 }} />
                <h3>No Cosmetics Found</h3>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  Reset filters or verify your search details to explore our luxury collections!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ══ PROMOTIONAL BANNER SECTION ══ */}
        {!searchQuery && !showOnlyWishlisted && (
          <section className="promo-banner-section" aria-label="Exclusive Promotion">
            <div className="container">
              <div className="promo-banner-box">
                <div className="promo-banner-grid">
                  <div>
                    <p className="promo-banner-subtitle">Limited Time Invitation</p>
                    <h3 className="promo-banner-title">Elevate Your Vanity with <span>20% Off</span></h3>
                    <p className="promo-banner-desc">
                      Experience the luxurious touch of premium cosmetics. Place your first order today and unlock exclusive benefits.
                    </p>
                    <div className="promo-coupon-wrap">
                      <span className="coupon-label">Use Code</span>
                      <span className="coupon-code">LUXE20</span>
                    </div>
                    <div>
                      <button 
                        className="btn-luxury primary"
                        onClick={() => {
                          document.getElementById('explore-collection')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Claim Offer Now
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="promo-banner-img">
                      <img 
                        src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop" 
                        alt="Miss Rose makeup set flatlay" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══ WHY CHOOSE US SECTION ══ */}
        {!searchQuery && !showOnlyWishlisted && (
          <section className="why-choose-section" id="about" aria-label="Brand Quality Pillars">
            <div className="container">
              <div className="section-title-wrap">
                <p className="section-subtitle">Our Promise</p>
                <h3 className="section-main-title">Crafted with <span>Integrity</span></h3>
                <div className="section-decor-line" />
              </div>

              <div className="why-grid">
                <div className="why-card">
                  <div className="why-card-icon"><Award size={20} /></div>
                  <div className="why-card-content">
                    <h4>Premium Quality</h4>
                    <p>Finest dermatologically tested oils, velvet pigments, and organic active ingredients.</p>
                  </div>
                </div>
                <div className="why-card">
                  <div className="why-card-icon"><Heart size={20} /></div>
                  <div className="why-card-content">
                    <h4>Cruelty Free</h4>
                    <p>100% vegan friendly, ethical sourcing, and absolutely zero animal testing.</p>
                  </div>
                </div>
                <div className="why-card">
                  <div className="why-card-icon"><ShieldCheck size={20} /></div>
                  <div className="why-card-content">
                    <h4>Long Lasting</h4>
                    <p>Designed for 16-hour endurance, transfer-proof finishes, and vibrant pigments.</p>
                  </div>
                </div>
                <div className="why-card">
                  <div className="why-card-icon"><Truck size={20} /></div>
                  <div className="why-card-content">
                    <h4>Secure Payment</h4>
                    <p>Complete safety via multiple mobile wallet, credit card, and door delivery steps.</p>
                  </div>
                </div>
                <div className="why-card">
                  <div className="why-card-icon"><RotateCcw size={20} /></div>
                  <div className="why-card-content">
                    <h4>Easy Returns</h4>
                    <p>Hassle-free 7-day returns if any shade or product does not match your exact desire.</p>
                  </div>
                </div>
                <div className="why-card">
                  <div className="why-card-icon"><Truck size={20} /></div>
                  <div className="why-card-content">
                    <h4>Complimentary Shipping</h4>
                    <p>Quick doorstep delivery across Pakistan, free for all luxury orders above $50.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══ BEST SELLERS SECTION (SLIDER CAROUSEL) ══ */}
        {!searchQuery && !showOnlyWishlisted && (
          <section className="bestsellers-section" id="bestsellers" aria-label="Bestselling Products Slider">
            <div className="container">
              <div className="section-title-wrap" style={{ textAlign: 'left', marginBottom: '1rem' }}>
                <p className="section-subtitle">Customer Favorites</p>
                <h3 className="section-main-title">The <span>Bestsellers</span> List</h3>
                <div className="section-decor-line" style={{ margin: '1rem 0 0' }} />
              </div>

              {/* Slider Arrow Controls */}
              <div className="slider-controls-row">
                <button 
                  className="slider-arrow-btn" 
                  onClick={handlePrevBestSeller}
                  aria-label="Previous bestseller"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  className="slider-arrow-btn" 
                  onClick={handleNextBestSeller}
                  aria-label="Next bestseller"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Visible Products Grid */}
              <div className="products-grid">
                {bestSellers.slice(bestSellersIdx, bestSellersIdx + 3).map((prod, idx) => (
                  <ProductCard
                    key={`bestseller-${prod.id}`}
                    product={prod}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={toggleWishlist}
                    isWishlisted={wishlist.includes(prod.id)}
                    index={idx}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══ TESTIMONIALS SECTION ══ */}
        {!searchQuery && !showOnlyWishlisted && (
          <section className="testimonials-section" aria-label="Customer Reviews">
            <div className="container">
              <div className="testimonials-slider-container">
                <div className="testimonial-card-wrap">
                  <div className="testimonial-card">
                    <div className="rating-stars" style={{ color: 'var(--accent-gold)' }}>
                      <Star size={16} fill="currentColor" stroke="none" />
                      <Star size={16} fill="currentColor" stroke="none" />
                      <Star size={16} fill="currentColor" stroke="none" />
                      <Star size={16} fill="currentColor" stroke="none" />
                      <Star size={16} fill="currentColor" stroke="none" />
                    </div>
                    
                    <p className="testimonial-quote">
                      &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                    </p>

                    <div className="testimonial-profile">
                      <div className="testimonial-avatar">
                        <img 
                          src={testimonials[activeTestimonial].avatar} 
                          alt={testimonials[activeTestimonial].name} 
                        />
                      </div>
                      <div className="testimonial-meta">
                        <h4 className="testimonial-name">{testimonials[activeTestimonial].name}</h4>
                        <span className="testimonial-role">{testimonials[activeTestimonial].role}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Slider Dots Indicator */}
                <div className="testimonial-dots">
                  {testimonials.map((_, idx) => (
                    <button 
                      key={idx}
                      className={`test-dot ${activeTestimonial === idx ? 'active' : ''}`}
                      onClick={() => setActiveTestimonial(idx)}
                      aria-label={`Show review ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══ EDITORIAL BLOG SECTION ══ */}
        {!searchQuery && !showOnlyWishlisted && (
          <section className="blog-section" id="blog" aria-label="Beauty Articles">
            <div className="container">
              <div className="section-title-wrap">
                <p className="section-subtitle">Editorial Journal</p>
                <h3 className="section-main-title">The Beauty <span>Edit</span></h3>
                <div className="section-decor-line" />
              </div>

              <div className="blog-grid">
                <article className="blog-card">
                  <div className="blog-img-box">
                    <img 
                      src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop" 
                      alt="Luxury perfume bottles" 
                    />
                  </div>
                  <div className="blog-card-body">
                    <span className="blog-meta-row">June 20, 2026 • Fragrance</span>
                    <h4 className="blog-title">The Art of Fragrance Layering: How to Design Your Signature Scent</h4>
                    <p className="blog-desc">Explore our masterclass guidelines on blending botanical notes and smoky sandalwood base scents to match your elegance.</p>
                    <button className="blog-btn-more" onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Journal article loading... 📖' } }))}>
                      Read More <ArrowRight size={12} />
                    </button>
                  </div>
                </article>

                <article className="blog-card">
                  <div className="blog-img-box">
                    <img 
                      src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop" 
                      alt="Luminous serum application" 
                    />
                  </div>
                  <div className="blog-card-body">
                    <span className="blog-meta-row">May 15, 2026 • Skincare</span>
                    <h4 className="blog-title">Parisian Glow: A Step-by-Step Dewy Skincare and Base Guide</h4>
                    <p className="blog-desc">Unlock secrets to achieving that effortless, glass-like dewy complexion using nourishing serums and hydrating liquid primers.</p>
                    <button className="blog-btn-more" onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Journal article loading... 📖' } }))}>
                      Read More <ArrowRight size={12} />
                    </button>
                  </div>
                </article>

                <article className="blog-card">
                  <div className="blog-img-box">
                    <img 
                      src="https://images.unsplash.com/photo-1627384113743-6bd5a479fffd?q=80&w=600&auto=format&fit=crop" 
                      alt="Eye makeup cosmetics stamp brush" 
                    />
                  </div>
                  <div className="blog-card-body">
                    <span className="blog-meta-row">April 28, 2026 • Makeup</span>
                    <h4 className="blog-title">Mastering the Cat-Eye: MUA Tips for Symmetric Eye Definition</h4>
                    <p className="blog-desc">A complete guide to utilizing dual-ended stamps, fine liners, and lashes for absolute precision and drama.</p>
                    <button className="blog-btn-more" onClick={() => window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Journal article loading... 📖' } }))}>
                      Read More <ArrowRight size={12} />
                    </button>
                  </div>
                </article>
              </div>
            </div>
          </section>
        )}

        {/* ══ INSTAGRAM GALLERY MASONRY ══ */}
        {!searchQuery && !showOnlyWishlisted && (
          <section className="instagram-section" aria-label="Instagram Showcase Gallery">
            <div className="container">
              <div className="section-title-wrap">
                <p className="section-subtitle">Visual Inspiration</p>
                <h3 className="section-main-title">On the <span>Grid</span></h3>
                <div className="section-decor-line" />
              </div>

              <div className="instagram-grid">
                <div className="gallery-item wide">
                  <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop" alt="Grid cosmetic vanity styling" />
                  <div className="gallery-overlay"><Mail size={24} /></div>
                </div>
                <div className="gallery-item tall">
                  <img src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop" alt="Floral beauty rose case setup" />
                  <div className="gallery-overlay"><Mail size={24} /></div>
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop" alt="Nail paints array" />
                  <div className="gallery-overlay"><Mail size={24} /></div>
                </div>
                <div className="gallery-item">
                  <img src="https://images.unsplash.com/photo-1515688594390-b649af70d282?q=80&w=600&auto=format&fit=crop" alt="Eyeshadow palettes collection" />
                  <div className="gallery-overlay"><Mail size={24} /></div>
                </div>
                <div className="gallery-item wide">
                  <img src="https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=600&auto=format&fit=crop" alt="Liquid makeup application details" />
                  <div className="gallery-overlay"><Mail size={24} /></div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══ NEWSLETTER SUBSCRIPTION SECTION ══ */}
        <section className="newsletter-section" id="newsletter" aria-label="Newsletter Signup">
          <div className="container">
            <div className="newsletter-box">
              <h3 className="newsletter-title">Join our Beauty <span>Circle</span></h3>
              <p className="newsletter-desc">
                Subscribe to receive early access to limited collections, deluxe sample offers, and curated editorial advice.
              </p>
              <form className="newsletter-form" onSubmit={(e) => {
                e.preventDefault();
                (e.target as HTMLFormElement).reset();
                window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Thank you for subscribing to our Circle! 🌸' } }));
              }}>
                <input 
                  type="email" 
                  required 
                  placeholder="Enter your email address" 
                  aria-label="Email Address for newsletter" 
                />
                <button type="submit" className="btn-subscribe">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* ── LUXURY SITE FOOTER ── */}
      <footer className="site-footer" role="contentinfo">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand-col">
              <h4 className="site-footer-logo">MISS ROSE</h4>
              <span className="site-footer-sub" style={{ alignSelf: 'flex-start' }}>Luxe Edition Reseller</span>
              <p className="footer-brand-desc">
                Bringing professional-grade sensorial cosmetics and premium botanical beauty lines direct to your vanity chest. Est. 2026.
              </p>
              <div className="footer-social-icons">
                <a href="#" className="social-icon-btn" aria-label="Facebook"><Mail size={16} /></a>
                <a href="#" className="social-icon-btn" aria-label="Instagram"><Phone size={16} /></a>
                <a href="#" className="social-icon-btn" aria-label="Twitter"><MapPin size={16} /></a>
              </div>
            </div>

            <div>
              <h5 className="footer-title">Collections</h5>
              <div className="footer-links-list">
                <a href="#explore-collection" onClick={() => { setActiveAisle('lips'); setShowOnlyWishlisted(false); }}>Lips Aisle</a>
                <a href="#explore-collection" onClick={() => { setActiveAisle('eyes'); setShowOnlyWishlisted(false); }}>Eyes Aisle</a>
                <a href="#explore-collection" onClick={() => { setActiveAisle('face'); setShowOnlyWishlisted(false); }}>Face Aisle</a>
                <a href="#explore-collection" onClick={() => { setActiveAisle('nails'); setShowOnlyWishlisted(false); }}>Nails Aisle</a>
                <a href="#explore-collection" onClick={() => { setActiveAisle('tools'); setShowOnlyWishlisted(false); }}>Tools & Brushes</a>
              </div>
            </div>

            <div>
              <h5 className="footer-title">Help & Support</h5>
              <div className="footer-links-list">
                <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Support ticket open. 🎟️' } })); }}>Contact Support</a>
                <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Track Order details loaded.' } })); }}>Track Order</a>
                <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Delivery information.' } })); }}>Shipping & Returns</a>
                <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'FAQs loaded.' } })); }}>FAQS & Guide</a>
              </div>
            </div>

            <div>
              <h5 className="footer-title">Contact Us</h5>
              <div className="footer-links-list">
                <span style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <MapPin size={14} style={{ flexShrink: 0 }} /> Karachi, Pakistan
                </span>
                <span style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <Phone size={14} /> +92 (300) 123 4567
                </span>
                <span style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <Mail size={14} /> concierge@missrose.pk
                </span>
              </div>
            </div>

            <div>
              <h5 className="footer-title">Newsletter</h5>
              <p className="footer-news-desc">Signup for exclusive beauty updates.</p>
              <form className="footer-news-input-wrap" onSubmit={(e) => {
                e.preventDefault();
                (e.target as HTMLFormElement).reset();
                window.dispatchEvent(new CustomEvent('show-toast', { detail: { message: 'Subscribed successfully! 🌸' } }));
              }}>
                <input type="email" required placeholder="Enter email" aria-label="concierge newsletter email" />
                <button type="submit" className="footer-news-submit" aria-label="Subscribe footer button"><ArrowRight size={14} /></button>
              </form>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <p className="site-footer-text">
              © 2026 MISS ROSE Luxe Cosmetics Store. Official Reseller. All Rights Reserved.
            </p>
            <div className="footer-bottom-links">
              <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
              <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ══ CART DRAWER DIALOG ══ */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveItem}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutStep(1);
          setCheckoutOpen(true);
        }}
      />

      {/* ══ TOAST NOTIFICATION STACK ══ */}
      <div className="toast-container-fixed">
        {toasts.map((t) => (
          <div key={t.id} className="toast-popup-alert">
            <span className="toast-msg-text">{t.message}</span>
          </div>
        ))}
      </div>

      {/* ══ MULTI-STEP CHECKOUT DIALOG MODAL ══ */}
      {checkoutOpen && (
        <div className="checkout-modal-backdrop" onClick={() => setCheckoutOpen(false)}>
          <div className="checkout-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setCheckoutOpen(false)}>
              <X size={16} />
            </button>

            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 400 }}>
              Checkout Order
            </h3>

            {/* Stepper Progress Bar */}
            <div className="checkout-steps-nav">
              <div className={`step-indicator-dot ${checkoutStep >= 1 ? 'active' : ''} ${checkoutStep > 1 ? 'completed' : ''}`}>1</div>
              <div className={`step-indicator-dot ${checkoutStep >= 2 ? 'active' : ''} ${checkoutStep > 2 ? 'completed' : ''}`}>2</div>
              <div className={`step-indicator-dot ${checkoutStep >= 3 ? 'active' : ''}`}>3</div>
            </div>

            <form onSubmit={handleCheckoutSubmit}>
              {/* STEP 1: Shipping Info */}
              {checkoutStep === 1 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h4 style={{ fontWeight: 600, borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.4rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    1. Delivery Details
                  </h4>
                  <div className="checkout-form-group">
                    <label htmlFor="chk-name">Your Full Name</label>
                    <input
                      id="chk-name"
                      type="text"
                      required
                      placeholder="e.g. Ayesha Khan"
                      value={shippingForm.name}
                      onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                    />
                  </div>
                  <div className="checkout-form-group">
                    <label htmlFor="chk-phone">Contact Phone Number</label>
                    <input
                      id="chk-phone"
                      type="tel"
                      required
                      placeholder="e.g. 03001234567"
                      value={shippingForm.phone}
                      onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                    />
                  </div>
                  <div className="checkout-form-group">
                    <label htmlFor="chk-address">Complete Home Address</label>
                    <input
                      id="chk-address"
                      type="text"
                      required
                      placeholder="Street, Area, Flat number"
                      value={shippingForm.address}
                      onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                    />
                  </div>
                  <div className="checkout-form-group">
                    <label htmlFor="chk-city">Delivery City</label>
                    <select
                      id="chk-city"
                      className="sort-select"
                      style={{ width: '100%', padding: '0.75rem' }}
                      value={shippingForm.city}
                      onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                    >
                      <option value="Karachi">Karachi</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Multan">Multan</option>
                      <option value="Peshawar">Peshawar</option>
                      <option value="Quetta">Quetta</option>
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 2: Payment Selector */}
              {checkoutStep === 2 && (
                <div>
                  <h4 style={{ fontWeight: 600, marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.4rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    2. Select Payment Method
                  </h4>
                  <div className="payment-options-grid">
                    <div
                      className={`payment-box-selector ${paymentMethod === 'cod' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <p style={{ fontSize: '0.85rem' }}>Cash on Delivery</p>
                        <Check size={16} color={paymentMethod === 'cod' ? 'var(--primary-deep)' : 'transparent'} />
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', alignSelf: 'flex-start' }}>Pay cash at your doorstep</span>
                    </div>

                    <div
                      className={`payment-box-selector ${paymentMethod === 'bank' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('bank')}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <p style={{ fontSize: '0.85rem' }}>Direct Bank Transfer</p>
                        <Check size={16} color={paymentMethod === 'bank' ? 'var(--primary-deep)' : 'transparent'} />
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', alignSelf: 'flex-start' }}>Send payment to HBL Account</span>
                    </div>

                    <div
                      className={`payment-box-selector ${paymentMethod === 'easypaisa' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('easypaisa')}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <p style={{ fontSize: '0.85rem' }}>EasyPaisa / JazzCash</p>
                        <Check size={16} color={paymentMethod === 'easypaisa' ? 'var(--primary-deep)' : 'transparent'} />
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', alignSelf: 'flex-start' }}>Instant mobile wallets transfer</span>
                    </div>
                  </div>
                  
                  {paymentMethod !== 'cod' && (
                    <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem' }}>
                      <p style={{ fontWeight: 700 }}>Transfer Account Guidelines:</p>
                      <p style={{ marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                        {paymentMethod === 'bank' 
                          ? 'Habib Bank Limited (HBL) - A/C: 1234-567890-123. Title: MISS ROSE STORE. Send screenshot receipt to WhatsApp.'
                          : 'EasyPaisa Mobile Number: 0300-1234567. Account Title: Ayesha Khan. Forward the SMS verification message to WhatsApp Concierge.'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: Review Details */}
              {checkoutStep === 3 && (
                <div>
                  <h4 style={{ fontWeight: 600, marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.4rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    3. Review Order & Confirm
                  </h4>
                  
                  <div className="review-items-summary">
                    {cartItems.map((item) => (
                      <div key={`${item.product.id}-${item.shade}`} className="review-item-row">
                        <span style={{ color: 'var(--text-secondary)' }}>
                          {item.quantity}x {item.product.name} ({item.shade})
                        </span>
                        <span style={{ fontWeight: 700 }}>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: 'var(--bg-base)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <p><strong>Deliver To:</strong> {shippingForm.name} ({shippingForm.phone})</p>
                    <p><strong>Address:</strong> {shippingForm.address}, {shippingForm.city}</p>
                    <p><strong>Payment Method:</strong> {paymentMethod.toUpperCase() === 'COD' ? 'Cash on Delivery' : paymentMethod.toUpperCase() === 'BANK' ? 'Bank Transfer' : 'Mobile Wallets (EasyPaisa)'}</p>
                  </div>

                  <div style={{ marginTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                    <div className="summary-row" style={{ fontSize: '0.8rem' }}>
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row" style={{ fontSize: '0.8rem' }}>
                      <span>Shipping Fee</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="summary-row total" style={{ padding: 0 }}>
                      <span>Grand Total Due</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Nav Row */}
              <div className="checkout-actions-row">
                {checkoutStep > 1 && (
                  <button
                    type="button"
                    className="btn-checkout-nav back"
                    onClick={() => setCheckoutStep((s) => s - 1)}
                  >
                    Back
                  </button>
                )}

                {checkoutStep < 3 ? (
                  <button
                    type="button"
                    className="btn-checkout-nav next"
                    onClick={() => {
                      if (checkoutStep === 1 && (!shippingForm.name || !shippingForm.phone || !shippingForm.address)) {
                        window.dispatchEvent(new CustomEvent('show-toast', {
                          detail: { message: 'Please input all delivery details!' }
                        }));
                        return;
                      }
                      setCheckoutStep((s) => s + 1);
                    }}
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-checkout-nav next"
                    style={{ flex: 1 }}
                  >
                    Place Order
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══ CHECKOUT ORDER SUCCESS OVERLAY ══ */}
      {lastSubmittedOrder && (
        <div className="checkout-success-view">
          <div className="success-card-content">
            <span className="success-badge-blast" role="img" aria-label="Celebration Party Popper">🎉</span>
            <h2 className="success-title">Order Logged</h2>
            <p className="success-desc">
              Your order <strong>{lastSubmittedOrder.id}</strong> has been successfully created. 
              Please click the button below to send details directly to our WhatsApp concierge.
            </p>

            <div className="success-actions-col">
              <button
                className="btn-success-wa"
                onClick={() => handleSendWhatsApp(lastSubmittedOrder)}
                title="Send confirmation message via WhatsApp"
              >
                <MessageCircle size={18} fill="currentColor" />
                <span>Submit to WhatsApp</span>
              </button>
              <button
                className="btn-success-close"
                onClick={() => setLastSubmittedOrder(null)}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ ORDERS PORTAL / CUSTOMER LOGS MODAL ══ */}
      {ordersPortalOpen && (
        <div className="portal-modal-backdrop" onClick={() => setOrdersPortalOpen(false)}>
          <div className="portal-modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setOrdersPortalOpen(false)}>
              <X size={16} />
            </button>

            <h3 className="portal-title">
              <Package size={22} color="var(--primary-deep)" />
              <span>Your Order History</span>
            </h3>

            {orders.length === 0 ? (
              <div className="portal-empty-state">
                <ShoppingBag size={44} className="portal-empty-icon" />
                <p>You haven't placed any orders yet. Once you make an order, it will appear here!</p>
              </div>
            ) : (
              <div className="orders-list-wrapper">
                {orders.map((ord) => (
                  <div key={ord.id} className="order-history-card">
                    {/* Header info */}
                    <div className="order-card-header">
                      <div>
                        <span className="order-id-label">{ord.id}</span>
                        <span className="order-date-label"> — {ord.date}</span>
                      </div>
                      <span className={`order-status-badge ${ord.status.toLowerCase()}`}>
                        {ord.status}
                      </span>
                    </div>

                    {/* Body items */}
                    <div className="order-card-body">
                      <div className="order-items-scroll">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="order-scroll-row">
                            <span>{item.qty}x {item.name} ({item.shade})</span>
                            <span>${(item.price * item.qty).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer total and WA helper */}
                      <div className="order-card-footer">
                        <div>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Grand Total: </span>
                          <span className="order-total-val">${ord.total.toFixed(2)}</span>
                        </div>

                        <button
                          className="btn-whatsapp-chat"
                          onClick={() => handleSendWhatsApp(ord)}
                          title="Chat with merchant about this order"
                        >
                          <ExternalLink size={12} />
                          <span>WhatsApp Resend</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
