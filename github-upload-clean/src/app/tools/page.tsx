import { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import ToolsClient from './tools-client';

export const metadata: Metadata = {
  ...pageMetadata.tools,
  title: 'Free Email Authentication Checker | SPF, DKIM, DMARC Tool - EmailInfra',
  description: 'Free SPF, DKIM, and DMARC record checker tool. Verify your email authentication setup, improve deliverability, and protect against spoofing. Get instant results and expert recommendations.',
  keywords: 'SPF checker, DKIM checker, DMARC checker, email authentication, email security, deliverability tool, free email tool',
  openGraph: {
    title: 'Free Email Authentication Checker | SPF, DKIM, DMARC Tool',
    description: 'Free SPF, DKIM, and DMARC record checker tool. Verify your email authentication setup and improve deliverability.',
    url: '/tools',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Email Authentication Checker | SPF, DKIM, DMARC Tool',
    description: 'Free SPF, DKIM, and DMARC record checker tool. Verify your email authentication setup and improve deliverability.',
  },
};

export default function ToolsPage() {
  return <ToolsClient />;
}