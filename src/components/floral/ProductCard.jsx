import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Button } from '../common/Button';
import { useAnimation } from '../../hooks/useAnimation';

export function ProductCard({ product, delay = '' }) {
  const [ref, , className] = useAnimation('fade-up', 0.1, delay);
  const { addToCart, openCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedOption, setSelectedOption] = useState(product.options[0]);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);

    addToCart({
      productId: product.id,
      productName: product.name,
      image: product.image,
      sizeId: selectedSize.id,
      sizeName: selectedSize.name,
      stems: selectedSize.stems,
      optionId: selectedOption.id,
      optionName: selectedOption.name,
      optionType: product.optionType,
      price: selectedSize.price,
      quantity: 1
    });

    setTimeout(() => {
      setIsAdding(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 300);
  };

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
        {product.featured && (
          <span className="absolute top-4 left-4 bg-sage-500 text-ivory-50 text-xs font-medium px-3 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-6">
        <h3 className="text-xl md:text-2xl font-display text-charcoal-800 mb-2">
          {product.name}
        </h3>

        <p className="text-charcoal-600 text-sm leading-relaxed mb-6">
          {product.description}
        </p>

        {/* Size Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-charcoal-700 mb-2">
            Size
          </label>
          <select
            value={selectedSize.id}
            onChange={(e) => {
              const size = product.sizes.find(s => s.id === e.target.value);
              setSelectedSize(size);
            }}
            className="w-full px-4 py-3 rounded-xl border-2 border-linen-300 focus:border-sage-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 bg-white"
          >
            {product.sizes.map((size) => (
              <option key={size.id} value={size.id}>
                {size.name} ({size.stems} stems) - ${size.price}
              </option>
            ))}
          </select>
        </div>

        {/* Option Selection (Color/Style) */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-charcoal-700 mb-2">
            {product.optionLabel}
          </label>
          <select
            value={selectedOption.id}
            onChange={(e) => {
              const option = product.options.find(o => o.id === e.target.value);
              setSelectedOption(option);
            }}
            className="w-full px-4 py-3 rounded-xl border-2 border-linen-300 focus:border-sage-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 bg-white"
          >
            {product.options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>

          {/* Option Preview Swatches */}
          <div className="flex gap-2 mt-3">
            {product.options.map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedOption.id === option.id
                    ? 'border-sage-500 ring-2 ring-sage-300'
                    : 'border-linen-300 hover:border-sage-400'
                }`}
                style={{
                  backgroundColor: option.hex || 'linear-gradient(135deg, #f8d7da 25%, #f9f9f7 50%, #c94c4c 75%)',
                  background: !option.hex ? 'linear-gradient(135deg, #f8d7da 25%, #d4ddd0 50%, #e2d7c9 75%)' : option.hex
                }}
                title={option.name}
                aria-label={`Select ${option.name}`}
              />
            ))}
          </div>
        </div>

        {/* Price Display */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-2xl font-display text-charcoal-800">
            ${selectedSize.price}
          </span>
          <span className="text-sm text-charcoal-500">
            {selectedSize.stems} stems
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
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Added to Cart
            </span>
          ) : isAdding ? (
            'Adding...'
          ) : (
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
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
