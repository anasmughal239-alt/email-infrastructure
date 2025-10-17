'use client';

import HeroSection from '@/components/sections/hero/HeroSection';
import { TrustBadges } from '@/components/sections/trust-badges';
import { WhatWeDo } from '@/components/sections/what-we-do';
import { FeaturesGrid } from '@/components/sections/features-grid';
import { TechnicalInfrastructure } from '@/components/sections/technical-infrastructure';
import { UseCases } from '@/components/sections/use-cases';
import { HowItWorks } from '@/components/sections/how-it-works';
import { PerformanceResults } from '@/components/sections/performance-results';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
// removed PricingPreview
import { FAQSection } from '@/components/sections/faq-section';
import { ContactSection } from '@/components/sections/contact-section';

// Main Homepage Component
export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TrustBadges />
      <WhatWeDo />
      <FeaturesGrid />
      <TechnicalInfrastructure />
      <UseCases />
      <HowItWorks />
      <PerformanceResults />
      <TestimonialsSection />
      {/* <PricingPreview /> removed */}
      <FAQSection />
      <ContactSection />
    </main>
  );
}
