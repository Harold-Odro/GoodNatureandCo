import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered animations
 * @param {string} animation - Animation type: 'fade-up', 'fade-in', 'fade-left', 'fade-right', 'scale-up', 'reveal', 'stagger-item'
 * @param {number} threshold - Intersection threshold (0-1)
 * @param {string} delay - Delay class: 'delay-1', 'delay-2', etc.
 * @returns {[React.RefObject, boolean, string]} - [ref, isVisible, className]
 */
export function useAnimation(animation = 'fade-up', threshold = 0.1, delay = '') {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if element is already in viewport on mount
    const rect = element.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isInViewport) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '50px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  const className = `${animation} ${delay} ${isVisible ? 'visible' : ''}`.trim();

  return [ref, isVisible, className];
}

/**
 * Hook for staggered animations on multiple items
 * @param {number} itemCount - Number of items to animate
 * @param {number} staggerDelay - Delay between each item in ms
 * @returns {[React.RefObject, boolean[], Function]} - [containerRef, visibleStates, getItemClass]
 */
export function useStaggerAnimation(itemCount, staggerDelay = 100) {
  const containerRef = useRef(null);
  const [visibleStates, setVisibleStates] = useState(Array(itemCount).fill(false));
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom >= 0;

    const triggerAnimation = () => {
      if (triggered) return;
      setTriggered(true);

      for (let i = 0; i < itemCount; i++) {
        setTimeout(() => {
          setVisibleStates(prev => {
            const newStates = [...prev];
            newStates[i] = true;
            return newStates;
          });
        }, i * staggerDelay);
      }
    };

    if (isInViewport) {
      setTimeout(triggerAnimation, 100);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [itemCount, staggerDelay, triggered]);

  const getItemClass = (index) => {
    return `stagger-item ${visibleStates[index] ? 'visible' : ''}`;
  };

  return [containerRef, visibleStates, getItemClass];
}
