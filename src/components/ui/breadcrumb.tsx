'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiChevronRight, FiHome } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const pathname = usePathname();
  
  // Generate breadcrumbs from pathname if items not provided
  const breadcrumbs = items || generateBreadcrumbs(pathname);
  
  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center"
      >
        <Link
          href="/"
          className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
        >
          <FiHome className="w-4 h-4" />
          <span className="sr-only">Home</span>
        </Link>
      </motion.div>

      {breadcrumbs.map((item, index) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-2"
        >
          <FiChevronRight className="w-4 h-4 text-muted-foreground" />
          {index === breadcrumbs.length - 1 ? (
            <span className="text-foreground font-medium" aria-current="page">
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          )}
        </motion.div>
      ))}
    </nav>
  );
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];
  
  // Route name mappings
  const routeNames: Record<string, string> = {
    'dashboard': 'Dashboard',
    'features': 'Features',
    'pricing': 'Pricing',
    'docs': 'Documentation',
    'demo': 'Demo',
    'about': 'About',
    'contact': 'Contact',
    'blog': 'Blog',
    'careers': 'Careers',
    'community': 'Community',
    'help': 'Help Center',
    'status': 'Status',
    'security': 'Security',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Service',
    'cookie-policy': 'Cookie Policy',
    'gdpr': 'GDPR',
    'integrations': 'Integrations',
    'auth': 'Authentication',
    'login': 'Login',
    'signup': 'Sign Up',
    'forgot-password': 'Forgot Password',
    'reset-password': 'Reset Password',
    'verify-email': 'Verify Email',
    'admin': 'Admin',
    'billing': 'Billing',
    'mailboxes': 'Mailboxes',
    'domains': 'Domains',
    'deliverability': 'Deliverability',
    'settings': 'Settings',
    'setup': 'Setup',
    'test-registration': 'Test Registration'
  };

  let currentPath = '';
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const label = routeNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    
    breadcrumbs.push({
      label,
      href: currentPath
    });
  });

  return breadcrumbs;
}