import { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { Button } from '../common/Button';
import { useAnimation } from '../../hooks/useAnimation';

export function CustomProductCard({ product, delay = '' }) {
  const [ref, , className] = useAnimation('fade-up', 0.1, delay);
  const { addToCart } = useCart();

  // Initialize selections with first option of each customization
  const [selections, setSelections] = useState(() => {
    const initial = {};
    product.customizations.forEach((customization) => {
      initial[customization.id] = customization.options[0];
    });
    return initial;
  });

  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Calculate total price based on selections
  const totalPrice = useMemo(() => {
    let price = product.basePrice;
    Object.values(selections).forEach((selection) => {
      price += selection.priceAdd || 0;
    });
    return price;
  }, [product.basePrice, selections]);

  const handleSelectionChange = (customizationId, optionId, customization) => {
    const option = customization.options.find((o) => o.id === optionId);
    setSelections((prev) => ({
      ...prev,
      [customizationId]: option
    }));
  };

  const handleAddToCart = () => {
    setIsAdding(true);

    // Build customization summary for cart
    const customizationSummary = product.customizations
      .map((c) => `${c.label}: ${selections[c.id].name}`)
      .join(', ');

    addToCart({
      productId: product.id,
      productName: product.name,
      image: product.image,
      type: 'semi-custom',
      customizations: selections,
      customizationSummary,
      price: totalPrice,
      quantity: 1
    });

    setTimeout(() => {
      setIsAdding(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 300);
  };

  // Get color palette customization for swatches
  const colorCustomization = product.customizations.find(
    (c) => c.id === 'color-palette'
  );

  return (
    <div
      ref={ref}
      className={`bg-ivory-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <span className="absolute top-4 left-4 bg-terracotta-500 text-ivory-50 text-xs font-medium px-3 py-1 rounded-full">
          Customizable
        </span>
      </div>

      {/* Product Details */}
      <div className="p-6">
        <h3 className="text-xl md:text-2xl font-display text-charcoal-800 mb-2">
          {product.name}
        </h3>

        <p className="text-charcoal-600 text-sm leading-relaxed mb-6">
          {product.description}
        </p>

        {/* Customization Options */}
        <div className="space-y-4 mb-6">
          {product.customizations.map((customization) => (
            <div key={customization.id}>
              <label className="block text-sm font-medium text-charcoal-700 mb-2">
                {customization.label}
                {customization.isAddon && (
                  <span className="text-charcoal-500 font-normal ml-1">
                    (Optional)
                  </span>
                )}
              </label>
              <select
                value={selections[customization.id]?.id}
                onChange={(e) =>
                  handleSelectionChange(customization.id, e.target.value, customization)
                }
                className="w-full px-4 py-3 rounded-xl border-2 border-linen-300 focus:border-sage-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 bg-white"
              >
                {customization.options.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>

              {/* Color Swatches for color palette */}
              {customization.id === 'color-palette' && (
                <div className="flex gap-2 mt-3">
                  {customization.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() =>
                        handleSelectionChange(customization.id, option.id, customization)
                      }
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selections[customization.id]?.id === option.id
                          ? 'border-sage-500 ring-2 ring-sage-300'
                          : 'border-linen-300 hover:border-sage-400'
                      }`}
                      style={{
                        backgroundColor: option.hex || '#f9f9f7',
                        background: !option.hex
                          ? 'linear-gradient(135deg, #f8d7da 25%, #d4ddd0 50%, #e2d7c9 75%)'
                          : option.hex
                      }}
                      title={option.name}
                      aria-label={`Select ${option.name}`}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Price Display */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-2xl font-display text-charcoal-800">
              ${totalPrice}
            </span>
            {totalPrice > product.basePrice && (
              <span className="block text-sm text-charcoal-500">
                Base ${product.basePrice} + ${totalPrice - product.basePrice} upgrades
              </span>
            )}
          </div>
          <span className="text-sm text-sage-600 font-medium">
            Starting at ${product.basePrice}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          variant="primary"
          size="lg"
          loading={isAdding}
          disabled={isAdding || !product.inStock}
          className="w-full"
        >
          {showSuccess ? (
            <span className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Added to Cart
            </span>
          ) : isAdding ? (
            'Adding...'
          ) : (
            <span className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to Cart
            </span>
          )}
        </Button>

        {!product.inStock && (
          <p className="text-center text-terracotta-600 text-sm mt-2">
            Currently out of stock
          </p>
        )}
      </div>
    </div>
  );
}
