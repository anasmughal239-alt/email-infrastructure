'use client';

import { useEffect } from 'react';
import { 
  injectCriticalCSS, 
  loadNonCriticalCSS, 
  initLazyLoading,
  markBelowFoldLoaded 
} from '@/lib/critical-css';

interface CSSOptimizerProps {
  enableLazyLoading?: boolean;
  markBelowFoldDelay?: number;
}

export function CSSOptimizer({ 
  enableLazyLoading = true, 
  markBelowFoldDelay = 1000 
}: CSSOptimizerProps) {
  useEffect(() => {
    // Inject critical CSS immediately
    injectCriticalCSS();

    // Load non-critical CSS after a short delay
    const loadNonCriticalTimer = setTimeout(() => {
      loadNonCriticalCSS();
    }, 100);

    // Initialize lazy loading for below-fold content
    if (enableLazyLoading) {
      const lazyLoadTimer = setTimeout(() => {
        initLazyLoading();
      }, 200);

      return () => {
        clearTimeout(loadNonCriticalTimer);
        clearTimeout(lazyLoadTimer);
      };
    }

    // Mark below-fold content as loaded after delay
    const belowFoldTimer = setTimeout(() => {
      markBelowFoldLoaded();
    }, markBelowFoldDelay);

    return () => {
      clearTimeout(loadNonCriticalTimer);
      clearTimeout(belowFoldTimer);
    };
  }, [enableLazyLoading, markBelowFoldDelay]);

  return null; // This component doesn't render anything
}

// Higher-order component for pages that need CSS optimization
export function withCSSOptimization<T extends object>(
  Component: React.ComponentType<T>,
  options?: CSSOptimizerProps
) {
  return function OptimizedComponent(props: T) {
    return (
      <>
        <CSSOptimizer {...options} />
        <Component {...props} />
      </>
    );
  };
}

// Hook for manual CSS optimization control
export function useCSSOptimization(options?: CSSOptimizerProps) {
  useEffect(() => {
    const { enableLazyLoading = true, markBelowFoldDelay = 1000 } = options || {};

    // Inject critical CSS
    injectCriticalCSS();

    // Load non-critical CSS
    const timer1 = setTimeout(loadNonCriticalCSS, 100);

    // Initialize lazy loading
    if (enableLazyLoading) {
      const timer2 = setTimeout(initLazyLoading, 200);
      const timer3 = setTimeout(markBelowFoldLoaded, markBelowFoldDelay);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }

    return () => clearTimeout(timer1);
  }, [options]);
}

// Utility component for marking sections as below-fold
export function BelowFold({ 
  children, 
  className = '',
  delay = 0 
}: { 
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => {
        const element = document.querySelector(`[data-below-fold-delay="${delay}"]`);
        if (element) {
          element.classList.add('loaded');
        }
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [delay]);

  return (
    <div 
      className={`below-fold ${className}`}
      data-below-fold-delay={delay > 0 ? delay : undefined}
    >
      {children}
    </div>
  );
}
