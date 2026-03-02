import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '../CartContext'

const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('useCart hook', () => {
    it('throws error when used outside CartProvider', () => {
      expect(() => {
        renderHook(() => useCart())
      }).toThrow('useCart must be used within a CartProvider')
    })

    it('provides cart context when wrapped in CartProvider', () => {
      const { result } = renderHook(() => useCart(), { wrapper })
      expect(result.current).toHaveProperty('cart')
      expect(result.current).toHaveProperty('addToCart')
      expect(result.current).toHaveProperty('removeFromCart')
    })
  })

  describe('addToCart', () => {
    it('adds item to empty cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.addToCart({
          productId: '1',
          name: 'Test Product',
          price: 50,
          quantity: 1,
          sizeId: 'small',
          optionId: 'red',
        })
      })

      expect(result.current.cart).toHaveLength(1)
      expect(result.current.cart[0].name).toBe('Test Product')
    })

    it('merges duplicate standard items by productId, sizeId, and optionId', () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.addToCart({
          productId: '1',
          name: 'Test Product',
          price: 50,
          quantity: 1,
          sizeId: 'small',
          optionId: 'red',
        })
      })

      act(() => {
        result.current.addToCart({
          productId: '1',
          name: 'Test Product',
          price: 50,
          quantity: 2,
          sizeId: 'small',
          optionId: 'red',
        })
      })

      expect(result.current.cart).toHaveLength(1)
      expect(result.current.cart[0].quantity).toBe(3)
    })

    it('treats different sizes as different items', () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.addToCart({
          productId: '1',
          name: 'Test Product',
          price: 50,
          quantity: 1,
          sizeId: 'small',
          optionId: 'red',
        })
      })

      act(() => {
        result.current.addToCart({
          productId: '1',
          name: 'Test Product',
          price: 75,
          quantity: 1,
          sizeId: 'large',
          optionId: 'red',
        })
      })

      expect(result.current.cart).toHaveLength(2)
    })

    it('merges semi-custom items by productId and customizationSummary', () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.addToCart({
          productId: '1',
          name: 'Custom Bouquet',
          price: 100,
          quantity: 1,
          type: 'semi-custom',
          customizationSummary: 'Pink roses, white lilies',
        })
      })

      act(() => {
        result.current.addToCart({
          productId: '1',
          name: 'Custom Bouquet',
          price: 100,
          quantity: 1,
          type: 'semi-custom',
          customizationSummary: 'Pink roses, white lilies',
        })
      })

      expect(result.current.cart).toHaveLength(1)
      expect(result.current.cart[0].quantity).toBe(2)
    })
  })

  describe('removeFromCart', () => {
    it('removes item by id', () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.addToCart({
          productId: '1',
          name: 'Test Product',
          price: 50,
          quantity: 1,
        })
      })

      const itemId = result.current.cart[0].id

      act(() => {
        result.current.removeFromCart(itemId)
      })

      expect(result.current.cart).toHaveLength(0)
    })
  })

  describe('updateQuantity', () => {
    it('updates item quantity', () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.addToCart({
          productId: '1',
          name: 'Test Product',
          price: 50,
          quantity: 1,
        })
      })

      const itemId = result.current.cart[0].id

      act(() => {
        result.current.updateQuantity(itemId, 5)
      })

      expect(result.current.cart[0].quantity).toBe(5)
    })

    it('removes item when quantity is less than 1', () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.addToCart({
          productId: '1',
          name: 'Test Product',
          price: 50,
          quantity: 1,
        })
      })

      const itemId = result.current.cart[0].id

      act(() => {
        result.current.updateQuantity(itemId, 0)
      })

      expect(result.current.cart).toHaveLength(0)
    })
  })

  describe('clearCart', () => {
    it('removes all items from cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.addToCart({ productId: '1', name: 'Item 1', price: 50, quantity: 1 })
        result.current.addToCart({ productId: '2', name: 'Item 2', price: 30, quantity: 1 })
      })

      expect(result.current.cart).toHaveLength(2)

      act(() => {
        result.current.clearCart()
      })

      expect(result.current.cart).toHaveLength(0)
    })
  })

  describe('getCartTotal', () => {
    it('calculates total correctly', () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.addToCart({ productId: '1', name: 'Item 1', price: 50, quantity: 2 })
        result.current.addToCart({ productId: '2', name: 'Item 2', price: 30, quantity: 1 })
      })

      expect(result.current.getCartTotal()).toBe(130)
    })

    it('returns 0 for empty cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper })
      expect(result.current.getCartTotal()).toBe(0)
    })
  })

  describe('getCartCount', () => {
    it('returns total quantity of all items', () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.addToCart({ productId: '1', name: 'Item 1', price: 50, quantity: 2 })
        result.current.addToCart({ productId: '2', name: 'Item 2', price: 30, quantity: 3 })
      })

      expect(result.current.getCartCount()).toBe(5)
    })
  })

  describe('cart open/close state', () => {
    it('starts with cart closed', () => {
      const { result } = renderHook(() => useCart(), { wrapper })
      expect(result.current.isCartOpen).toBe(false)
    })

    it('opens cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.openCart()
      })

      expect(result.current.isCartOpen).toBe(true)
    })

    it('closes cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.openCart()
      })

      act(() => {
        result.current.closeCart()
      })

      expect(result.current.isCartOpen).toBe(false)
    })

    it('toggles cart state', () => {
      const { result } = renderHook(() => useCart(), { wrapper })

      act(() => {
        result.current.toggleCart()
      })

      expect(result.current.isCartOpen).toBe(true)

      act(() => {
        result.current.toggleCart()
      })

      expect(result.current.isCartOpen).toBe(false)
    })
  })
})
