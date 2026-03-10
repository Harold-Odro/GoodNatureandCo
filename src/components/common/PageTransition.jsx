import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Wraps page content with a fade transition on route changes.
 * Uses CSS transitions (no extra dependencies).
 */
export function PageTransition({ children }) {
  useLocation(); // triggers re-render on route change
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('enter');

  useEffect(() => {
    if (children !== displayChildren) {
      setTransitionStage('exit');
    }
  }, [children, displayChildren]);

  const handleTransitionEnd = () => {
    if (transitionStage === 'exit') {
      setDisplayChildren(children);
      setTransitionStage('enter');
    }
  };

  return (
    <div
      className={`page-transition page-transition-${transitionStage}`}
      onTransitionEnd={handleTransitionEnd}
    >
      {displayChildren}
    </div>
  );
}
