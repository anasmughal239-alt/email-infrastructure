import { generateMetadata, pageMetadata } from '@/lib/metadata';
import AboutClient from './about-client';

export const metadata = generateMetadata({
  ...pageMetadata.about,
  alternates: {
    canonical: 'https://emailinfra.com/about',
  },
});

export default function AboutPage() {
  return <AboutClient />;
}