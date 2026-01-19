import { useCart } from '../../context/CartContext';

export function CartButton() {
  const { toggleCart, getCartCount } = useCart();
  const count = getCartCount();

  return (
    <button
      onClick={toggleCart}
      className="relative p-2.5 text-charcoal-600 hover:text-sage-600 transition-colors rounded-lg hover:bg-linen-100"
      aria-label={`Shopping cart with ${count} items`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {count > 0 && (
        <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-sage-500 text-ivory-50 text-[10px] font-semibold rounded-full flex items-center justify-center">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  );
}
