'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiChevronDown, FiChevronUp, FiMail, FiGlobe, FiClock } from 'react-icons/fi';
import { useState } from 'react';

// Provider types
type Provider = 'google' | 'microsoft';
type BillingPeriod = 'monthly' | 'yearly';

// Plan data structure
interface PlanData {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  inboxes: number;
  extraInboxCost: number;
  features: string[];
  isPopular?: boolean;
}

// Pricing data for both providers
const pricingData: Record<Provider, PlanData[]> = {
  google: [
    {
      name: 'Starter',
      monthlyPrice: 39,
      yearlyPrice: 31, // 2 months free
      inboxes: 10,
      extraInboxCost: 3,
      features: [
        'Shared IP',
        'DNS setup',
        'Standard Support'
      ]
    },
    {
      name: 'Growth',
      monthlyPrice: 99,
      yearlyPrice: 79, // 2 months free
      inboxes: 50,
      extraInboxCost: 2.5,
      features: [
        'Dedicated domains',
        'Priority DNS',
        'Deliverability Reports',
        'Priority Support'
      ],
      isPopular: true
    },
    {
      name: 'Pro',
      monthlyPrice: 199,
      yearlyPrice: 159, // 2 months free
      inboxes: 100,
      extraInboxCost: 2,
      features: [
        'Dedicated IP',
        'Advanced Monitoring',
        'API Access',
        'SLA Support'
      ]
    }
  ],
  microsoft: [
    {
      name: 'Starter',
      monthlyPrice: 49,
      yearlyPrice: 39, // 2 months free
      inboxes: 10,
      extraInboxCost: 3.5,
      features: [
        'Shared IP',
        'DNS setup',
        'Standard Support'
      ]
    },
    {
      name: 'Growth',
      monthlyPrice: 129,
      yearlyPrice: 103, // 2 months free
      inboxes: 50,
      extraInboxCost: 3,
      features: [
        'Dedicated domains',
        'Priority DNS',
        'Deliverability Reports',
        'Priority Support'
      ],
      isPopular: true
    },
    {
      name: 'Pro',
      monthlyPrice: 229,
      yearlyPrice: 183, // 2 months free
      inboxes: 100,
      extraInboxCost: 2.5,
      features: [
        'Dedicated IP',
        'Advanced Monitoring',
        'API Access',
        'SLA Support'
      ]
    }
  ]
};

// Stats data
const statsData = [
  {
    icon: FiMail,
    label: 'Mailboxes Setup',
    value: '50,000+',
    description: 'Pre-warmed and ready'
  },
  {
    icon: FiGlobe,
    label: 'Domains Managed',
    value: '10,000+',
    description: 'Across all providers'
  },
  {
    icon: FiClock,
    label: 'Avg Setup Time',
    value: '< 5 min',
    description: 'Automated process'
  }
];

// FAQ data
const faqData = [
  {
    question: 'How does billing work?',
    answer: 'You are billed monthly or yearly based on your selected plan. Yearly plans save you 2 months compared to monthly billing. You can upgrade or downgrade at any time.'
  },
  {
    question: 'What happens if I need more inboxes?',
    answer: 'You can add extra inboxes to any plan at the per-inbox rate shown. Additional inboxes are billed at the same frequency as your base plan.'
  },
  {
    question: 'How quickly can I get started?',
    answer: 'Setup is automated and typically takes less than 5 minutes. Our pre-warmed mailboxes are ready to use immediately after DNS configuration.'
  },
  {
    question: 'Can I switch between Google Workspace and Microsoft Outlook?',
    answer: 'Yes, you can switch providers at any time. We support both Google Workspace and Microsoft Outlook with the same high deliverability standards.'
  },
  {
    question: 'What\'s included in DNS setup?',
    answer: 'We automatically configure SPF, DKIM, and DMARC records for optimal deliverability. Our system handles all technical setup so you can focus on your campaigns.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied with our service, contact support for a full refund within 30 days of signup.'
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3
    }
  }
};

// Stats Section Component
const StatsSection = () => {
  return (
    <motion.div 
      className="mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {statsData.map((stat, index) => (
          <motion.div
            key={index}
            className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
              <stat.icon className="h-6 w-6 text-primary" />
            </div>
            <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
            <div className="font-semibold mb-1">{stat.label}</div>
            <div className="text-sm text-muted-foreground">{stat.description}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Provider Toggle Component
const ProviderToggle = ({ provider, setProvider }: { provider: Provider; setProvider: (provider: Provider) => void }) => {
  return (
    <motion.div 
      className="flex justify-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-muted p-1 rounded-lg flex">
        <button
          onClick={() => setProvider('google')}
          className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
            provider === 'google'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Google Workspace
        </button>
        <button
          onClick={() => setProvider('microsoft')}
          className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
            provider === 'microsoft'
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Microsoft Outlook
        </button>
      </div>
    </motion.div>
  );
};

// Billing Toggle Component
const BillingToggle = ({ billing, setBilling }: { billing: BillingPeriod; setBilling: (billing: BillingPeriod) => void }) => {
  return (
    <motion.div 
      className="flex justify-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="bg-muted p-1 rounded-lg flex items-center">
        <button
          onClick={() => setBilling('monthly')}
          className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
            billing === 'monthly'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBilling('yearly')}
          className={`px-4 py-2 rounded-md font-medium transition-all duration-300 relative ${
            billing === 'yearly'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Yearly
          <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Save 2 months
          </span>
        </button>
      </div>
    </motion.div>
  );
};

// Pricing Card Component
const PricingCard = ({ plan, billing, index }: { plan: PlanData; billing: BillingPeriod; index: number }) => {
  const price = billing === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  const period = billing === 'monthly' ? '/month' : '/month (billed yearly)';

  return (
    <motion.div
      className={`relative rounded-2xl border-2 p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
        plan.isPopular
          ? 'border-primary bg-gradient-to-br from-primary/5 to-primary/10 scale-105'
          : 'border-border bg-background hover:border-primary/50'
      }`}
      variants={cardVariants}
      whileHover={{ y: -5 }}
    >
      {plan.isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
        <div className="mb-4">
          <span className="text-5xl font-bold">${price}</span>
          <span className="text-muted-foreground ml-2">{period}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{plan.inboxes}</div>
            <div className="text-sm text-muted-foreground">Inboxes included</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">${plan.extraInboxCost}</div>
            <div className="text-sm text-muted-foreground">Per extra inbox</div>
          </div>
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-center">
            <FiCheck className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button 
        className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
          plan.isPopular
            ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg'
            : 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
        }`}
      >
        Get Started
      </button>
    </motion.div>
  );
};

// FAQ Component
const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <motion.div 
      className="mt-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Common questions about billing, setup, and our services.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            className="border-b border-border last:border-b-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <button
              className="w-full py-6 text-left flex items-center justify-between hover:text-primary transition-colors duration-300"
              onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
            >
              <span className="font-semibold text-lg pr-4">{faq.question}</span>
              {openFAQ === index ? (
                <FiChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
              ) : (
                <FiChevronDown className="h-5 w-5 flex-shrink-0" />
              )}
            </button>
            <AnimatePresence>
              {openFAQ === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pb-6"
                >
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Main Pricing Page Component
export default function PricingPage(): JSX.Element {
  const [provider, setProvider] = useState<Provider>('google');
  const [billing, setBilling] = useState<BillingPeriod>('monthly');

  const currentPlans = pricingData[provider];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your email infrastructure needs. Pre-warmed mailboxes, automated setup, and enterprise-grade deliverability.
          </p>
        </motion.div>

        {/* Stats Section */}
        <StatsSection />

        {/* Provider Toggle */}
        <ProviderToggle provider={provider} setProvider={setProvider} />

        {/* Billing Toggle */}
        <BillingToggle billing={billing} setBilling={setBilling} />

        {/* Pricing Cards */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${provider}-${billing}`}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {currentPlans.map((plan, index) => (
              <PricingCard 
                key={`${provider}-${plan.name}`}
                plan={plan} 
                billing={billing} 
                index={index} 
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of businesses using our email infrastructure to achieve 90%+ inbox rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg">
                Start Free Trial
              </button>
              <button className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                Contact Sales
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}