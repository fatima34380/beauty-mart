'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingBag, Search, Heart, Sparkles, Sun, Moon, Package, User } from 'lucide-react';

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

  // Monitor scroll to shrink header and handle top offset
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 40;
      setIsScrolled(scrolled);
      // Sync aisle-nav top offset with current header height (scrolled header is 70px, unscrolled is 120px)
      document.documentElement.style.setProperty(
        '--header-h',
        scrolled ? '70px' : '120px'
      );
    };
    // Set initial value
    document.documentElement.style.setProperty('--header-h', '120px');
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ── PROMOTIONAL TOP BAR ── */}
      <div className="promo-bar">
        <span>Complimentary shipping on orders over $50</span>
        <span style={{ opacity: 0.5, marginInline: '0.5rem' }}>|</span>
        <span>3 Deluxe Samples with every order</span>
      </div>

      {/* ── SITE HEADER ── */}
      <header 
        className={`site-header ${isScrolled ? 'scrolled' : ''}`} 
        style={{ top: isScrolled ? '0' : '30px' }}
        role="banner"
      >
        <div className="container header-inner">
          {/* Logo */}
          <button
            onClick={onLogoClick}
            className="header-logo"
            style={{ textAlign: 'left', cursor: onLogoClick ? 'pointer' : 'default' }}
            aria-label="MISS ROSE Cosmetics Home"
          >
            <div>
              <h1 className="logo-brand">MISS ROSE</h1>
              <span className="logo-sub">Luxe Edition</span>
            </div>
          </button>

          {/* Navigation Links in Center */}
          <nav className="header-nav-links" aria-label="Main Navigation">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onLogoClick?.();
              }}
            >
              Home
            </a>
            <a 
              href="#shop" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('explore-collection')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Shop
            </a>
            <a 
              href="#collections" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Collections
            </a>
            <a 
              href="#bestsellers" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Best Sellers
            </a>
            <a 
              href="#about" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              About
            </a>
            <a 
              href="#blog" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Blog
            </a>
            <a 
              href="#newsletter" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('newsletter')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact
            </a>
          </nav>

          {/* Search Bar */}
          <div className="header-search" role="search">
            <span className="header-search-icon" aria-hidden="true">
              <Search size={15} />
            </span>
            <input
              id="main-search"
              type="search"
              placeholder="Search cosmetics..."
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
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>

            {/* Orders History Panel Button */}
            <button
              onClick={onOpenOrders}
              className="action-btn"
              aria-label="View Order History"
              title="Order History"
            >
              <Package size={17} />
            </button>

            {/* Wishlist Button */}
            <button
              className={`action-btn ${isWishlistActive ? 'active-wishlist' : ''}`}
              aria-label={`Wishlist, ${wishlistCount} items`}
              title="My Wishlist"
              onClick={() => {
                const event = new CustomEvent('filter-wishlist');
                window.dispatchEvent(event);
              }}
            >
              <Heart size={17} fill={isWishlistActive ? '#e5989b' : 'none'} color={isWishlistActive ? '#e5989b' : 'currentColor'} />
              {wishlistCount > 0 && (
                <span className="badge-count" aria-live="polite">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* User Account Button */}
            <button
              className="action-btn"
              aria-label="My Account"
              title="My Account"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('show-toast', {
                  detail: { message: 'Luxe Account Portal coming soon! ✨' }
                }));
              }}
            >
              <User size={17} />
            </button>

            {/* Shopping Cart Button */}
            <button
              id="header-cart-btn"
              className="action-btn cart-action-btn"
              onClick={onCartOpen}
              aria-label={`Open shopping cart, ${cartCount} items`}
            >
              <ShoppingBag size={17} />
              <span className="cart-btn-text">Cart</span>
              {cartCount > 0 && (
                <span className="badge-count cart-badge" aria-live="polite">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
