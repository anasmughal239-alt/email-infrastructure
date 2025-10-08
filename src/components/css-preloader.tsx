'use client';

import { useEffect } from 'react';

interface CSSPreloaderProps {
  stylesheets?: string[];
  fonts?: string[];
  preloadImages?: string[];
}

export function CSSPreloader({ 
  stylesheets = [], 
  fonts = [],
  preloadImages = []
}: CSSPreloaderProps) {
  useEffect(() => {
    // Preload stylesheets
    stylesheets.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.onload = () => {
        link.rel = 'stylesheet';
      };
      document.head.appendChild(link);
    });

    // Preload fonts
    fonts.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Preload images
    preloadImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Preload critical resources
    preloadCriticalResources();

    // Setup resource hints
    setupResourceHints();

  }, [stylesheets, fonts, preloadImages]);

  return null;
}

function preloadCriticalResources() {
  // Preload Inter font (already used in layout)
  const interFont = document.createElement('link');
  interFont.rel = 'preload';
  interFont.as = 'font';
  interFont.type = 'font/woff2';
  interFont.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2';
  interFont.crossOrigin = 'anonymous';
  document.head.appendChild(interFont);

  // Preload Tailwind CSS if using CDN (though we're using local)
  // This is more for demonstration of the pattern
}

function setupResourceHints() {
  // DNS prefetch for external resources
  const dnsPrefetchDomains = [
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'api.emailinfra.com', // Your API domain
  ];

  dnsPrefetchDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = `//${domain}`;
    document.head.appendChild(link);
  });

  // Preconnect to critical domains
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
  ];

  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    if (domain.includes('fonts.gstatic.com')) {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
}

// Hook for manual CSS preloading
export function useCSSPreloader(resources: CSSPreloaderProps) {
  useEffect(() => {
    const { stylesheets = [], fonts = [], preloadImages = [] } = resources;

    // Create preload links
    const links: HTMLLinkElement[] = [];

    stylesheets.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
      links.push(link);
    });

    fonts.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
      links.push(link);
    });

    preloadImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      links.push(link);
    });

    // Cleanup function
    return () => {
      links.forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [resources]);
}

// Utility function to check if resource is already preloaded
export function isResourcePreloaded(href: string, type: 'style' | 'font' | 'image'): boolean {
  const selector = `link[rel="preload"][as="${type}"][href="${href}"]`;
  return document.querySelector(selector) !== null;
}

// Utility function to preload a single resource
export function preloadResource(href: string, type: 'style' | 'font' | 'image', options?: {
  crossOrigin?: string;
  type?: string;
}) {
  if (isResourcePreloaded(href, type)) {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = type;
  link.href = href;

  if (options?.crossOrigin) {
    link.crossOrigin = options.crossOrigin;
  }

  if (options?.type) {
    link.type = options.type;
  }

  document.head.appendChild(link);
}
