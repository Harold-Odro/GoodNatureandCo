import { useEffect, useRef } from 'react';

/**
 * Traps focus within a container element when active.
 * Returns a ref to attach to the container.
 */
export function useFocusTrap(isActive) {
  const containerRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    previousFocusRef.current = document.activeElement;

    const container = containerRef.current;
    if (!container) return;

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');

    const getFocusableElements = () =>
      Array.from(container.querySelectorAll(focusableSelectors)).filter(
        (el) => !el.closest('[aria-hidden="true"]')
      );

    // Focus the first focusable element
    const focusables = getFocusableElements();
    if (focusables.length > 0) {
      focusables[0].focus();
    }

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      const currentFocusables = getFocusableElements();
      if (currentFocusables.length === 0) return;

      const firstEl = currentFocusables[0];
      const lastEl = currentFocusables[currentFocusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      // Restore focus to the previously focused element
      if (previousFocusRef.current && previousFocusRef.current.focus) {
        previousFocusRef.current.focus();
      }
    };
  }, [isActive]);

  return containerRef;
}
