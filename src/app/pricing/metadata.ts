import { generateMetadata, pageMetadata } from '@/lib/metadata';

export const metadata = generateMetadata({
  ...pageMetadata.pricing,
  alternates: {
    canonical: 'https://emailinfra.com/pricing',
  },
});
