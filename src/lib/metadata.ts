import { Metadata } from 'next';

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  noIndex?: boolean;
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
  };
}

const defaultMetadata = {
  siteName: 'EmailInfra',
  siteUrl: 'https://emailinfra.com',
  defaultTitle: 'EmailInfra - Email Infrastructure Platform',
  defaultDescription: 'Build, deploy, and scale your email services with our powerful infrastructure platform. Reliable email delivery, advanced analytics, and enterprise-grade security.',
  defaultKeywords: [
    'email infrastructure',
    'email delivery',
    'SMTP service',
    'email API',
    'transactional email',
    'email analytics',
    'email automation',
    'bulk email',
    'email marketing',
    'developer tools'
  ],
  defaultOgImage: '/og-image.jpg',
  twitterHandle: '@emailinfra',
  author: 'EmailInfra Team'
};

export function generateMetadata({
  title,
  description,
  keywords = [],
  canonical,
  ogImage,
  ogType = 'website',
  noIndex = false,
  alternates
}: PageMetadata): Metadata {
  const fullTitle = title === defaultMetadata.defaultTitle 
    ? title 
    : `${title} | ${defaultMetadata.siteName}`;
  
  const allKeywords = [...defaultMetadata.defaultKeywords, ...keywords];
  const imageUrl = ogImage || defaultMetadata.defaultOgImage;
  const canonicalUrl = canonical || alternates?.canonical;

  return {
    title: fullTitle,
    description,
    keywords: allKeywords.join(', '),
    authors: [{ name: defaultMetadata.author }],
    creator: defaultMetadata.author,
    publisher: defaultMetadata.siteName,
    
    // Robots
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Open Graph
    openGraph: {
      type: ogType,
      locale: 'en_US',
      url: canonicalUrl || defaultMetadata.siteUrl,
      siteName: defaultMetadata.siteName,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      site: defaultMetadata.twitterHandle,
      creator: defaultMetadata.twitterHandle,
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    
    // Verification
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
      yahoo: 'your-yahoo-verification-code',
    },
    
    // Alternates
    alternates: alternates || {
      canonical: canonicalUrl,
    },
    
    // Additional metadata
    category: 'Technology',
    classification: 'Business',
    
    // App-specific
    applicationName: defaultMetadata.siteName,
    referrer: 'origin-when-cross-origin',
    
    // Format detection
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
}

// Pre-defined metadata for common pages
export const pageMetadata = {
  home: {
    title: defaultMetadata.defaultTitle,
    description: defaultMetadata.defaultDescription,
    keywords: ['email infrastructure platform', 'email delivery service', 'SMTP API'],
  },
  
  pricing: {
    title: 'Pricing Plans - EmailInfra',
    description: 'Choose the perfect email infrastructure plan for your business. Flexible pricing with pay-as-you-scale options. Start free, upgrade anytime.',
    keywords: ['email pricing', 'SMTP pricing', 'email service cost', 'transactional email pricing'],
  },
  
  features: {
    title: 'Features - EmailInfra',
    description: 'Discover powerful email infrastructure features including real-time analytics, advanced deliverability, webhook support, and enterprise security.',
    keywords: ['email features', 'email analytics', 'deliverability', 'email webhooks'],
  },
  
  about: {
    title: 'About Us - EmailInfra',
    description: 'Learn about EmailInfra\'s mission to simplify email infrastructure for developers and businesses worldwide. Meet our team and company story.',
    keywords: ['about emailinfra', 'company story', 'email infrastructure team'],
  },
  
  contact: {
    title: 'Contact Us - EmailInfra',
    description: 'Get in touch with EmailInfra support team. We\'re here to help with your email infrastructure needs and technical questions.',
    keywords: ['contact support', 'email help', 'technical support'],
  },
  
  docs: {
    title: 'Documentation - EmailInfra',
    description: 'Complete EmailInfra documentation with API references, integration guides, and best practices for email infrastructure.',
    keywords: ['email API docs', 'SMTP documentation', 'integration guide'],
  },
  
  blog: {
    title: 'Blog - EmailInfra',
    description: 'Stay updated with the latest email infrastructure trends, best practices, and EmailInfra product updates.',
    keywords: ['email blog', 'email best practices', 'email trends'],
  },
  
  dashboard: {
    title: 'Dashboard - EmailInfra',
    description: 'Manage your email infrastructure, monitor deliverability, and access analytics from your EmailInfra dashboard.',
    keywords: ['email dashboard', 'email analytics', 'email management'],
    noIndex: true, // Private area
  },
  
  login: {
    title: 'Login - EmailInfra',
    description: 'Sign in to your EmailInfra account to access your email infrastructure dashboard and manage your services.',
    keywords: ['login', 'sign in', 'account access'],
    noIndex: true,
  },
  
  signup: {
    title: 'Sign Up - EmailInfra',
    description: 'Create your EmailInfra account and start building reliable email infrastructure. Free tier available with instant setup.',
    keywords: ['sign up', 'create account', 'free email service'],
  },
  
  tools: {
    title: 'Free Email Tools - EmailInfra',
    description: 'Free email authentication checker tool. Verify SPF, DKIM, and DMARC records instantly to improve email deliverability and security.',
    keywords: ['free email tools', 'SPF checker', 'DKIM checker', 'DMARC checker', 'email authentication', 'email security tools'],
  },
};
