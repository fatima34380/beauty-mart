'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingBag, Search, Heart, Sparkles, Sun, Moon, Package } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onCartOpen: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenOrders: () => void;
  wishlistCount: number;
  isWishlistActive?: boolean;
  onLogoClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onCartOpen,
  searchQuery,
  onSearchChange,
  theme,
  onToggleTheme,
  onOpenOrders,
  wishlistCount,
  isWishlistActive = false,
  onLogoClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll to shrink header
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 40;
      setIsScrolled(scrolled);
      // Sync aisle-nav top offset with current header height
      document.documentElement.style.setProperty(
        '--header-h',
        scrolled ? '70px' : '80px'
      );
    };
    // Set initial value
    document.documentElement.style.setProperty('--header-h', '80px');
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} role="banner">
      <div className="container header-inner">
        {/* Logo */}
        <button
          onClick={onLogoClick}
          className="header-logo"
          style={{ textAlign: 'left', cursor: onLogoClick ? 'pointer' : 'default' }}
          aria-label="Miss Rose Cosmetics Home"
        >
          <div className="logo-icon-wrap" aria-hidden="true">
            <Sparkles size={20} color="#fff" />
          </div>
          <div>
            <h1 className="logo-brand">MISS ROSE</h1>
            <span className="logo-sub">Luxe Edition</span>
          </div>
        </button>

        {/* Search */}
        <div className="header-search" role="search">
          <span className="header-search-icon" aria-hidden="true">
            <Search size={16} />
          </span>
          <input
            id="main-search"
            type="search"
            placeholder="Search cosmetics, shades, products…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search cosmetics products"
            autoComplete="off"
          />
        </div>

        {/* Action Buttons */}
        <div className="header-actions">
          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="action-btn"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Orders History Panel Button */}
          <button
            onClick={onOpenOrders}
            className="action-btn"
            aria-label="View Order History"
            title="Order History"
          >
            <Package size={18} />
          </button>

          {/* Wishlist Button */}
          <button
            className={`action-btn ${isWishlistActive ? 'active-wishlist' : ''}`}
            aria-label={`Wishlist, ${wishlistCount} items`}
            title="My Wishlist"
            onClick={() => {
              // Custom event to filter wishlist or pop a message
              const event = new CustomEvent('filter-wishlist');
              window.dispatchEvent(event);
            }}
          >
            <Heart size={18} fill={isWishlistActive ? '#e85a80' : 'none'} color={isWishlistActive ? '#e85a80' : 'currentColor'} />
            {wishlistCount > 0 && (
              <span className="badge-count" aria-live="polite">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Button */}
          <button
            id="header-cart-btn"
            className="action-btn cart-action-btn"
            onClick={onCartOpen}
            aria-label={`Open shopping cart, ${cartCount} items`}
          >
            <ShoppingBag size={18} />
            <span style={{ display: 'inline' }}>Cart</span>
            {cartCount > 0 && (
              <span className="badge-count" style={{ position: 'relative', top: 0, right: 0 }} aria-live="polite">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
