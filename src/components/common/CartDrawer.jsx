import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Button } from './Button';
import { OrderRequestModal } from './OrderRequestModal';
import { ROUTES } from '../../utils/constants';

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount
  } = useCart();

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleCheckout = () => {
    closeCart();
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  return (
    <>
      {/* Order Request Modal */}
      <OrderRequestModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrderModal}
      />

      {/* Cart Drawer - only render if cart is open */}
      {!isCartOpen ? null : (
      <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-charcoal-900/50 z-40 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-ivory-50 z-50 shadow-2xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-linen-300">
            <h2 className="text-xl font-display text-charcoal-800">
              Your Cart ({getCartCount()})
            </h2>
            <button
              onClick={closeCart}
              className="p-2 text-charcoal-600 hover:text-charcoal-800 transition-colors"
              aria-label="Close cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-linen-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-charcoal-600 mb-4">Your cart is empty</p>
                <Button href={ROUTES.floralShop} variant="primary" onClick={closeCart}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 bg-white rounded-xl p-4 shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-display text-charcoal-800 mb-1">
                        {item.productName}
                      </h3>
                      <p className="text-sm text-charcoal-600">
                        {item.type === 'semi-custom' ? (
                          item.customizationSummary
                        ) : (
                          <>{item.sizeName} ({item.stems} stems) • {item.optionName}</>
                        )}
                      </p>
                      <p className="text-sage-600 font-medium mt-1">
                        ${item.price}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-charcoal-400 hover:text-terracotta-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-linen-300 flex items-center justify-center text-charcoal-600 hover:border-sage-400 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-charcoal-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-linen-300 flex items-center justify-center text-charcoal-600 hover:border-sage-400 transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-linen-300 p-6 bg-linen-50">
              <div className="flex items-center justify-between mb-4">
                <span className="text-charcoal-700">Subtotal</span>
                <span className="text-xl font-display text-charcoal-800">
                  ${getCartTotal()}
                </span>
              </div>
              <p className="text-sm text-charcoal-500 mb-4">
                Delivery fees calculated at checkout
              </p>
              <Button
                onClick={handleCheckout}
                variant="primary"
                size="lg"
                className="w-full"
              >
                Proceed to Order
              </Button>
              <button
                onClick={closeCart}
                className="w-full mt-3 text-center text-sage-600 hover:text-sage-700 font-medium transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
      </>
      )}
    </>
  );
}
