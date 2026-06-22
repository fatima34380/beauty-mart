'use client';

import React, { useEffect, useRef } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, Package } from 'lucide-react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  shade: string;
  shadeHex: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (productId: string, shade: string, delta: number) => void;
  onRemove: (productId: string, shade: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemove,
  onCheckout,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Trap focus inside drawer & close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKey);
      panelRef.current?.focus();
    }
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.05; // 5% tax
  const FREE_SHIPPING_LIMIT = 50.00;
  const shipping = subtotal >= FREE_SHIPPING_LIMIT ? 0 : 5.99;
  const total = subtotal + tax + shipping;
  const totalQty = items.reduce((acc, item) => acc + item.quantity, 0);

  // Free shipping progress calculations
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_LIMIT) * 100);
  const remainingForFree = FREE_SHIPPING_LIMIT - subtotal;

  return (
    <>
      {/* Overlay */}
      <div className="cart-drawer-overlay" onClick={onClose} aria-hidden="true" />

      {/* Drawer Panel */}
      <aside
        ref={panelRef}
        className="cart-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart drawer"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="cart-drawer-header">
          <div>
            <h2 className="cart-drawer-title">Shopping Cart</h2>
            <p className="cart-drawer-subtitle">
              {totalQty === 0 ? 'Your bag is empty' : `${totalQty} item${totalQty > 1 ? 's' : ''} selected`}
            </p>
          </div>
          <button className="cart-close-action" onClick={onClose} aria-label="Close cart">
            <X size={16} />
          </button>
        </div>

        {/* Free Shipping Progress (Only show if there are items) */}
        {items.length > 0 && (
          <div className="shipping-progress-box">
            <div className="shipping-progress-text">
              {subtotal >= FREE_SHIPPING_LIMIT ? (
                <span>🎉 Congratulations! You unlocked <strong>FREE SHIPPING</strong>!</span>
              ) : (
                <span>Spend <strong>${remainingForFree.toFixed(2)}</strong> more for FREE shipping</span>
              )}
              <span>{progressPercent.toFixed(0)}%</span>
            </div>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Items List */}
        {items.length === 0 ? (
          <div className="cart-empty-state">
            <ShoppingBag size={52} className="cart-empty-icon" strokeWidth={1.5} />
            <h3>Your Bag is Empty</h3>
            <p style={{ fontSize: '0.85rem', marginTop: '0.5rem', paddingInline: '1rem' }}>
              Looks like you haven't added anything yet. Explore our Miss Rose collections to fill it!
            </p>
          </div>
        ) : (
          <div className="cart-items-list" role="list" aria-label="Cart items">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.shade}`}
                className="cart-item-row"
                role="listitem"
              >
                {/* Visual */}
                <div className="cart-item-visual">
                  <img src={item.product.image} alt={item.product.name} />
                </div>

                {/* Details */}
                <div className="cart-item-details">
                  <h4 className="cart-item-name">{item.product.name}</h4>
                  <div className="cart-item-shade-tag">
                    <span
                      className="cart-shade-dot"
                      style={{ backgroundColor: item.shadeHex }}
                    />
                    <span>{item.shade}</span>
                  </div>
                  <p className="cart-item-price-val">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Controls */}
                <div className="cart-item-controls">
                  <div className="cart-item-qty">
                    <button
                      className="cart-qty-btn"
                      onClick={() => onUpdateQty(item.product.id, item.shade, -1)}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="cart-qty-num">{item.quantity}</span>
                    <button
                      className="cart-qty-btn"
                      onClick={() => onUpdateQty(item.product.id, item.shade, 1)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={10} />
                    </button>
                  </div>
                  
                  <button
                    className="cart-item-del-btn"
                    onClick={() => onRemove(item.product.id, item.shade)}
                    aria-label={`Remove ${item.product.name} from cart`}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Summary (Only if items exist) */}
        {items.length > 0 && (
          <div className="cart-footer-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Estimated Tax (5%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              className="btn-checkout-submit"
              onClick={onCheckout}
              aria-label="Proceed to checkout order"
            >
              <Package size={16} />
              <span>Checkout Order</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
