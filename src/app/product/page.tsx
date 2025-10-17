import { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import ProductClient from './product-client';

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  ...pageMetadata.product,
  title: 'Professional Email Infrastructure & PowerMTA Management - SendingOps',
  description: 'Enterprise-grade email infrastructure with PowerMTA management, dedicated SMTP servers, and advanced deliverability tools. Built for high-volume senders who need reliability and control.',
  keywords: 'PowerMTA management, email infrastructure, SMTP servers, email deliverability, email authentication, bounce processing, infrastructure monitoring',
  openGraph: {
    title: 'Professional Email Infrastructure & PowerMTA Management',
    description: 'Enterprise-grade email infrastructure with PowerMTA management, dedicated SMTP servers, and advanced deliverability tools.',
    url: '/product',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Email Infrastructure & PowerMTA Management',
    description: 'Enterprise-grade email infrastructure with PowerMTA management, dedicated SMTP servers, and advanced deliverability tools.',
  },
};

export default function ProductPage() {
  return <ProductClient />;
}