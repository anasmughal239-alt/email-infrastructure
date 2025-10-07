// Critical CSS extraction and inlining utility
export const criticalCSS = `
  /* Critical CSS - Above the fold styles */
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --border: 217.2 32.6% 17.5%;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: Inter, system-ui, -apple-system, sans-serif;
    background: hsl(var(--background));
    color: hsl(var(--foreground));
    line-height: 1.6;
  }

  /* Navigation critical styles */
  nav {
    position: sticky;
    top: 0;
    z-index: 50;
    background: hsl(var(--background));
    border-bottom: 1px solid hsl(var(--border));
  }

  /* Button critical styles */
  .btn-primary {
    background: linear-gradient(to right, #2563eb, #9333ea);
    color: white;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    text-decoration: none;
    display: inline-block;
  }

  .btn-primary:hover {
    background: linear-gradient(to right, #1d4ed8, #7c3aed);
  }

  /* Layout critical styles */
  .max-w-7xl {
    max-width: 80rem;
    margin: 0 auto;
  }

  .container {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  /* Typography critical styles */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    line-height: 1.2;
    margin: 0;
  }

  h1 {
    font-size: 2.25rem;
  }

  @media (min-width: 768px) {
    h1 {
      font-size: 3rem;
    }
  }

  @media (min-width: 1024px) {
    h1 {
      font-size: 3.75rem;
    }
  }

  /* Loading state */
  .loading {
    opacity: 0;
    animation: fadeIn 0.3s ease-in-out forwards;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }

  /* Hide non-critical content initially */
  .below-fold {
    opacity: 0;
  }

  .below-fold.loaded {
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }
`;

export const nonCriticalCSS = `
  /* Non-critical CSS - Below the fold and interactive styles */
  
  /* Complex animations */
  @keyframes slideInUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideInLeft {
    from {
      transform: translateX(-30px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(30px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  /* Complex component styles */
  .card-hover {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  /* Form styles */
  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-label {
    display: block;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: hsl(var(--foreground));
  }

  .form-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid hsl(var(--border));
    border-radius: 0.375rem;
    background: hsl(var(--background));
    color: hsl(var(--foreground));
    transition: all 0.2s;
  }

  .form-input:focus {
    outline: none;
    border-color: hsl(var(--primary));
    box-shadow: 0 0 0 3px hsl(var(--primary) / 0.1);
  }

  /* Dashboard specific styles */
  .dashboard-sidebar {
    width: 16rem;
    background: hsl(var(--background));
    border-right: 1px solid hsl(var(--border));
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 40;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
  }

  .dashboard-sidebar.open {
    transform: translateX(0);
  }

  @media (min-width: 1024px) {
    .dashboard-sidebar {
      position: relative;
      transform: translateX(0);
    }
  }

  /* Footer styles */
  .footer-link {
    color: hsl(var(--foreground) / 0.7);
    text-decoration: none;
    transition: color 0.2s;
  }

  .footer-link:hover {
    color: hsl(var(--foreground));
  }
`;

// Function to inject critical CSS
export function injectCriticalCSS() {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = criticalCSS;
    style.setAttribute('data-critical', 'true');
    document.head.insertBefore(style, document.head.firstChild);
  }
}

// Function to load non-critical CSS asynchronously
export function loadNonCriticalCSS() {
  if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = nonCriticalCSS;
    style.setAttribute('data-non-critical', 'true');
    
    // Load after page load
    if (document.readyState === 'complete') {
      document.head.appendChild(style);
    } else {
      window.addEventListener('load', () => {
        document.head.appendChild(style);
      });
    }
  }
}

// Function to mark below-fold content as loaded
export function markBelowFoldLoaded() {
  if (typeof document !== 'undefined') {
    const belowFoldElements = document.querySelectorAll('.below-fold');
    belowFoldElements.forEach(element => {
      element.classList.add('loaded');
    });
  }
}

// Intersection Observer for lazy loading below-fold content
export function initLazyLoading() {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    // Observe all below-fold elements
    document.querySelectorAll('.below-fold').forEach(element => {
      observer.observe(element);
    });
  }
}