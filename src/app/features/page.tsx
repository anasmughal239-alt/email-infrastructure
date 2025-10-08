import { generateMetadata, pageMetadata } from '@/lib/metadata';
import FeaturesClient from './features-client';

export const metadata = generateMetadata({
  ...pageMetadata.features,
  alternates: {
    canonical: 'https://emailinfra.com/features',
  },
});

export default function FeaturesPage() {
  return <FeaturesClient />;
}
