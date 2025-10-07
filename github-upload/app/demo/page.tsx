import { generateMetadata, pageMetadata } from '@/lib/metadata';
import DemoClient from './demo-client';

export const metadata = generateMetadata({
  title: 'Live Demo - EmailInfra Platform',
  description: 'Experience our email infrastructure platform with a live interactive demo. See how easy it is to set up domains, manage mailboxes, and track deliverability.',
  keywords: ['email demo', 'platform demo', 'email infrastructure demo', 'interactive demo'],
  alternates: {
    canonical: 'https://emailinfra.com/demo',
  },
});

export default function DemoPage() {
  return <DemoClient />;
}