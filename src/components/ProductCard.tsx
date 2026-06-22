'use client';

import React, { useState } from 'react';
import { X, Heart, Star, Check, ShoppingBag, Plus, Minus } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, shade: string, shadeHex: string, qty?: number) => void;
  onToggleWishlist?: (productId: string) => void;
  isWishlisted?: boolean;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  index = 0,
}) => {
  const [selectedShadeIdx, setSelectedShadeIdx] = useState(0);
  const [adding, setAdding] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalQty, setModalQty] = useState(1);

  const selectedShade = product.shades?.[selectedShadeIdx];
  const shadeHex = selectedShade?.hex ?? '#e85a80';
  
  // Format price helper
  const formatPrice = (p: number) => `$${p.toFixed(2)}`;

  const handleAddToCart = (e: React.MouseEvent, qty: number = 1) => {
    e.stopPropagation();
    setAdding(true);
    onAddToCart(product, selectedShade?.name ?? 'Default', shadeHex, qty);
    
    // Custom event to trigger toast notifications in page.tsx
    const event = new CustomEvent('show-toast', {
      detail: { message: `Added ${qty}x ${product.name} (${selectedShade?.name ?? 'Default'}) to cart!` }
    });
    window.dispatchEvent(event);

    setTimeout(() => setAdding(false), 600);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(product.id);
      
      const isAdding = !isWishlisted;
      const event = new CustomEvent('show-toast', {
        detail: { message: isAdding ? `Added ${product.name} to wishlist! 💖` : `Removed ${product.name} from wishlist.` }
      });
      window.dispatchEvent(event);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const floor = Math.floor(rating);
    for (let i = 1; i <= 5; i++) {
      if (i <= floor) {
        stars.push(<Star key={i} size={13} fill="currentColor" stroke="none" />);
      } else if (i - rating < 1) {
        stars.push(<Star key={i} size={13} fill="currentColor" stroke="currentColor" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)' }} />);
      } else {
        stars.push(<Star key={i} size={13} fill="none" stroke="currentColor" />);
      }
    }
    return stars;
  };

  // Badges calculation
  const isSale = product.originalPrice > product.price;
  const isBestseller = product.rating >= 4.8 && product.reviews > 1000;
  const isNew = product.id.includes('-12') || product.id.includes('-13') || product.id.includes('-6');

  // Stagger load delay
  const animationDelay = `${(index % 10) * 0.05}s`;

  return (
    <>
      {/* ── PRODUCT CARD ── */}
      <article
        className="product-card"
        style={{
          animationDelay,
          '--shade-color': shadeHex,
        } as React.CSSProperties}
        onClick={() => {
          setModalQty(1);
          setShowModal(true);
        }}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${product.name}`}
        onKeyDown={(e) => e.key === 'Enter' && setShowModal(true)}
      >
        {/* Card Visual Container */}
        <div className="card-image-container">
          <div className="card-shade-glow" style={{ '--shade-color': shadeHex } as React.CSSProperties} />
          
          <div className="card-img-link">
            <img src={product.image} alt={product.name} loading="lazy" />
          </div>

          {/* Badges */}
          {isSale && <span className="card-badge sale">Sale</span>}
          {isBestseller && !isSale && <span className="card-badge bestseller">Bestseller</span>}
          {isNew && !isSale && !isBestseller && <span className="card-badge new">New</span>}

          {/* Wishlist Button */}
          <button
            className={`wishlist-toggle ${isWishlisted ? 'active' : ''}`}
            onClick={handleWishlistClick}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={16} fill={isWishlisted ? '#e85a80' : 'none'} />
          </button>

          {/* Quick Add Overlay */}
          <div className="quick-add-overlay">
            <button
              className="btn-quick-add"
              onClick={(e) => handleAddToCart(e, 1)}
              aria-label={`Quick add ${product.name} to cart`}
            >
              <ShoppingBag size={14} />
              {adding ? 'Added!' : 'Quick Add'}
            </button>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="card-body">
          <p className="card-category">{product.category.replace('on', ' On').replace('set', ' Set')}</p>
          <h3 className="card-title">{product.name}</h3>
          <p className="card-desc">{product.description}</p>

          {/* Shade Swatches */}
          {product.shades && product.shades.length > 0 && (
            <div className="card-swatches" role="radiogroup" aria-label="Select shade">
              {product.shades.map((shade, i) => (
                <button
                  key={i}
                  className={`swatch-dot ${selectedShadeIdx === i ? 'active' : ''}`}
                  style={{ backgroundColor: shade.hex }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedShadeIdx(i);
                  }}
                  role="radio"
                  aria-checked={selectedShadeIdx === i}
                  title={shade.name}
                />
              ))}
            </div>
          )}

          {/* Rating */}
          <div className="card-rating-row">
            <div className="rating-stars" aria-label={`Rating: ${product.rating} out of 5`}>
              {renderStars(product.rating)}
            </div>
            <span className="rating-avg">{product.rating}</span>
            <span className="rating-count">({product.reviews})</span>
          </div>

          {/* Footer Details */}
          <div className="card-footer">
            <div className="price-box">
              {isSale && <span className="price-original">{formatPrice(product.originalPrice)}</span>}
              <span className="price-sale">{formatPrice(product.price)}</span>
            </div>
            <button
              id={`card-add-to-cart-${product.id}`}
              className="btn-card-buy"
              onClick={(e) => handleAddToCart(e, 1)}
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingBag size={12} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </article>

      {/* ── DETAILED PRODUCT MODAL ── */}
      {showModal && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} details`}
          onClick={() => setShowModal(false)}
        >
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setShowModal(false)}
              aria-label="Close product details"
            >
              <X size={18} />
            </button>

            <div className="modal-layout">
              {/* Left Column: Image with accent glow */}
              <div className="modal-visuals" style={{ '--shade-color': shadeHex } as React.CSSProperties}>
                <div className="modal-visuals-glow" />
                <div className="modal-main-image">
                  <img src={product.image} alt={product.name} />
                </div>
              </div>

              {/* Right Column: Full specifications and shopping */}
              <div className="modal-details">
                <p className="modal-cat">{product.category.replace('on', ' On').replace('set', ' Set')}</p>
                <h2 className="modal-title">{product.name}</h2>

                {/* Rating */}
                <div className="card-rating-row" style={{ marginTop: 0 }}>
                  <div className="rating-stars">{renderStars(product.rating)}</div>
                  <span className="rating-avg">{product.rating}</span>
                  <span className="rating-count">({product.reviews} customer reviews)</span>
                </div>

                {/* Pricing */}
                <div className="modal-price-row">
                  {isSale && <span className="modal-price-orig">{formatPrice(product.originalPrice)}</span>}
                  <span className="modal-price-sale">{formatPrice(product.price)}</span>
                </div>

                <p className="modal-desc">{product.description}</p>

                {/* Shades Picker */}
                {product.shades && product.shades.length > 0 && (
                  <div className="modal-shades-section">
                    <h4>Selected Shade: <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{selectedShade?.name}</span></h4>
                    <div className="modal-shade-picker" role="radiogroup">
                      {product.shades.map((shade, i) => (
                        <button
                          key={i}
                          className={`modal-swatch ${selectedShadeIdx === i ? 'active' : ''}`}
                          style={{ backgroundColor: shade.hex }}
                          onClick={() => setSelectedShadeIdx(i)}
                          role="radio"
                          aria-checked={selectedShadeIdx === i}
                          title={shade.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Features list */}
                <div className="modal-features">
                  {product.features.map((feat, i) => (
                    <div key={i} className="modal-feat-item">
                      <span className="modal-feat-icon">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Specs table */}
                <div className="modal-specs-table">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className="spec-item-label">{key}</span>
                      <span className="spec-item-val">{val}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span className="spec-item-label">SKU</span>
                    <span className="spec-item-val">MR-{product.id.toUpperCase()}</span>
                  </div>
                </div>

                {/* Add to Cart Actions */}
                <div className="modal-cta-row">
                  <div className="qty-counter">
                    <button
                      className="qty-btn"
                      onClick={() => setModalQty(q => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="qty-val">{modalQty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => setModalQty(q => q + 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    className="btn-add-cart-large"
                    onClick={(e) => {
                      handleAddToCart(e, modalQty);
                      setShowModal(false);
                    }}
                    aria-label="Add product to cart"
                  >
                    <ShoppingBag size={16} />
                    <span>Add to Cart — {formatPrice(product.price * modalQty)}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
