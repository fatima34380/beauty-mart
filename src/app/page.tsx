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
} from 'lucide-react';
import { PRODUCTS, AISLES, Product } from '@/data/products';
import { Header } from '@/components/UI/Header';
import { ProductCard } from '@/components/ProductCard';
import { CartDrawer, CartItem } from '@/components/CartDrawer';

// Aisle icon mapping
const AISLE_ICONS: Record<string, React.ReactNode> = {
  lips:  <Palette size={16} />,
  eyes:  <Eye     size={16} />,
  face:  <Smile   size={16} />,
  nails: <Gem     size={16} />,
  tools: <Wrench  size={16} />,
};

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
  cleaner: 'Brush Cleaner'
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
    { id: 'foundations_primers', name: 'Foundations & Primers', emoji: '🧴', categories: ['foundation', 'primer'] },
    { id: 'concealers_correctors', name: 'Concealers & Correctors', emoji: '🧪', categories: ['concealer', 'corrector'] },
    { id: 'highlighters_powders', name: 'Highlighters & Powders', emoji: '💨', categories: ['highlighter', 'powder', 'settingspray'] }
  ],
  nails: [
    { id: 'nails_polish', name: 'Nails & Nail Polishes', emoji: '💅', categories: ['nailpolish', 'nails'] }
  ],
  tools: [
    { id: 'makeup_tools', name: 'Professional Brushes & Tools', emoji: '🪮', categories: ['brushset', 'blender', 'curler', 'cleaner'] }
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

  // ── LOAD THEME & STORAGE ON MOUNT ──
  useEffect(() => {
    // Sync theme
    const savedTheme = localStorage.getItem('mr-theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);

    // Sync wishlist
    const savedWish = localStorage.getItem('mr-wishlist');
    if (savedWish) {
      setWishlist(JSON.parse(savedWish));
    }

    // Sync orders
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
        // Remove toast automatically after 3s
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
      
      // Toast notification
      window.dispatchEvent(new CustomEvent('show-toast', {
        detail: { message: `Switched to ${next === 'light' ? 'Blushing Rose' : 'Night Onyx'} mode! 💅` }
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

    // Search query matches
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
      // Standard Aisle select
      result = result.filter((p) => p.aisle === activeAisle);
    }

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Wishlist check
    if (showOnlyWishlisted) {
      result = result.filter((p) => wishlist.includes(p.id));
    }

    // Sorting
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

  // Unique categories in current viewed aisle
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

  // Reset category when Aisle/Search changes
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

    // Verify fields
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

    // Save order
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('mr-orders', JSON.stringify(updatedOrders));

    // Clear cart and reset states
    setCartItems([]);
    setLastSubmittedOrder(newOrder);
    setCheckoutOpen(false);

    // Fire Confetti!
    const confetti = (await import('canvas-confetti')).default;
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#e85a80', '#d4af37', '#ffffff'],
    });

    window.dispatchEvent(new CustomEvent('show-toast', {
      detail: { message: 'Order created successfully! 🎊' }
    }));
  };

  // ── FORMAT WHATSAPP PREFILL TEXT ──
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
    // Merchant phone number prefilled placeholder
    const whatsappUrl = `https://wa.me/923001234567?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
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
        
        {/* ══ HERO BANNER ══ */}
        {!searchQuery && !showOnlyWishlisted && (
          <section className="hero-banner" aria-label="Welcome Banner">
            <div className="container hero-grid">
              <div className="hero-text">
                <div className="hero-badge">
                  <span /> Custom Branded Cosmetics
                </div>
                <h2 className="hero-title">
                  Elevate Your Glamour <span>MISS ROSE Cosmetics</span>
                </h2>
                <p className="hero-desc">
                  Explore professional-grade, affordable cosmetics built for your everyday beauty needs. Discover rich velvet lipsticks, precision wing liner stamps, full coverage foundations, and luxury brushes.
                </p>
                <div className="hero-ctas">
                  <button
                    className="btn-luxury primary"
                    onClick={() => {
                      document.getElementById('explore-collection')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Shop Collection <ArrowRight size={16} />
                  </button>
                  <button
                    className="btn-luxury outline"
                    onClick={() => {
                      setActiveAisle('face');
                      document.getElementById('explore-collection')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <Flame size={16} /> Bestsellers
                  </button>
                </div>
                <div className="hero-stats">
                  <div className="stat-box">
                    <h3>50+</h3>
                    <p>Branded Items</p>
                  </div>
                  <div className="stat-box">
                    <h3>5</h3>
                    <p>Aisle Categories</p>
                  </div>
                  <div className="stat-box">
                    <h3>100%</h3>
                    <p>Authentic</p>
                  </div>
                </div>
              </div>

              <div className="hero-image-wrap">
                <div className="hero-circle-bg" />
                <div className="hero-main-img">
                  <img
                    src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop"
                    alt="Miss Rose Premium Makeup Set Collection"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ══ PRODUCTS WRAPPER ══ */}
        <section
          id="explore-collection"
          style={{ paddingBottom: '3rem' }}
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
                      {AISLE_ICONS[aisle.id]}
                      <span>{aisle.name}</span>
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
                <p style={{ textTransform: 'uppercase', fontSize: '0.72rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '1px' }}>
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
                  All Categories
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
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Sort by:</span>
                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Sort product items"
                >
                  <option value="default">Popular Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated Stars</option>
                  <option value="popular">Review Counts</option>
                </select>
              </div>
            </div>

            {/* Search results banner */}
            {searchQuery && (
              <div style={{ marginBlock: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}>
                  Search Results for: <span style={{ color: 'var(--primary)', fontWeight: 700 }}>&ldquo;{searchQuery}&rdquo;</span>
                </h3>
                <button className="category-chip" onClick={() => setSearchQuery('')}>Clear Search</button>
              </div>
            )}

            {/* Wishlist Active banner */}
            {showOnlyWishlisted && (
              <div style={{ marginBlock: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}>
                  Wishlist Collection: <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</span>
                </h3>
                <button className="category-chip" onClick={() => setShowOnlyWishlisted(false)}>Show All Products</button>
              </div>
            )}

            {/* Product Card Grid */}
            {filteredProducts.length > 0 ? (
              (activeCategory === 'all' && !searchQuery && !showOnlyWishlisted && AISLE_PORTIONS[activeAisle]) ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', width: '100%' }}>
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
                <SparklesIcon size={44} style={{ marginInline: 'auto', marginBottom: '1rem', opacity: 0.4 }} />
                <h3>No Cosmetics Found</h3>
                <p style={{ fontSize: '0.88rem', marginTop: '0.5rem' }}>
                  Try resetting the filters, clear your search text, or verify your wishlist contents!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ── LUXURY SITE FOOTER ── */}
      <footer className="site-footer" role="contentinfo">
        <div className="container">
          <div className="site-footer-logo-wrap">
            <span className="site-footer-logo">MISS ROSE</span>
            <span className="site-footer-sub">Official Store Reseller</span>
          </div>
          
          <div className="site-footer-links">
            <a href="#explore-collection" onClick={() => { setActiveAisle('lips'); setShowOnlyWishlisted(false); }}>Lips</a>
            <a href="#explore-collection" onClick={() => { setActiveAisle('eyes'); setShowOnlyWishlisted(false); }}>Eyes</a>
            <a href="#explore-collection" onClick={() => { setActiveAisle('face'); setShowOnlyWishlisted(false); }}>Face</a>
            <a href="#explore-collection" onClick={() => { setActiveAisle('nails'); setShowOnlyWishlisted(false); }}>Nails</a>
            <a href="#explore-collection" onClick={() => { setActiveAisle('tools'); setShowOnlyWishlisted(false); }}>Tools & Brushes</a>
          </div>

          <p className="site-footer-text">
            © 2026 MISS ROSE Luxe Cosmetics Store · Designed with Premium Aesthetics for Professional Results.
          </p>
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

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              Finalize Order Checkout
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
                  <h4 style={{ fontWeight: 700, borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.4rem' }}>
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
                  <h4 style={{ fontWeight: 700, marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.4rem' }}>
                    2. Select Payment Method
                  </h4>
                  <div className="payment-options-grid">
                    <div
                      className={`payment-box-selector ${paymentMethod === 'cod' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      <Check size={20} color={paymentMethod === 'cod' ? 'var(--primary)' : 'transparent'} />
                      <p>Cash on Delivery</p>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Pay cash at your doorstep</span>
                    </div>

                    <div
                      className={`payment-box-selector ${paymentMethod === 'bank' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('bank')}
                    >
                      <Check size={20} color={paymentMethod === 'bank' ? 'var(--primary)' : 'transparent'} />
                      <p>Direct Bank Transfer</p>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Send payment to HBL Account</span>
                    </div>

                    <div
                      className={`payment-box-selector ${paymentMethod === 'easypaisa' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('easypaisa')}
                    >
                      <Check size={20} color={paymentMethod === 'easypaisa' ? 'var(--primary)' : 'transparent'} />
                      <p>EasyPaisa / JazzCash</p>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Instant mobile wallets transfer</span>
                    </div>
                  </div>
                  
                  {paymentMethod !== 'cod' && (
                    <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.8rem' }}>
                      <p style={{ fontWeight: 700 }}>Transfer Account Guidelines:</p>
                      <p style={{ marginTop: '0.25rem', color: 'var(--text-secondary)' }}>
                        {paymentMethod === 'bank' 
                          ? 'Habib Bank Limited (HBL) - A/C: 1234-567890-123. Title: MISS ROSE STORE. Send screenshot receipt to WhatsApp.'
                          : 'EasyPaisa Mobile Number: 0300-1234567. Account Title: Ayesha Khan. Forward the SMS verification message to WhatsApp.'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: Review Details */}
              {checkoutStep === 3 && (
                <div>
                  <h4 style={{ fontWeight: 700, marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.4rem' }}>
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

                  <div style={{ background: 'var(--bg-base)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
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
                    Back Step
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
                    Proceed Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn-checkout-nav next"
                    style={{ flex: 1 }}
                  >
                    Confirm & Place Order
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
            <h2 className="success-title">Order Received!</h2>
            <p className="success-desc">
              Your Miss Rose order <strong>{lastSubmittedOrder.id}</strong> has been logged! 
              To finalize processing, send details directly to our WhatsApp support team.
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
                Close and Continue
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
              <Package size={22} color="var(--primary)" />
              <span>Your Order History</span>
            </h3>

            {orders.length === 0 ? (
              <div className="portal-empty-state">
                <ShoppingBag size={44} className="portal-empty-icon" />
                <p>You haven't placed any orders yet. Place some orders to view history logs!</p>
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
