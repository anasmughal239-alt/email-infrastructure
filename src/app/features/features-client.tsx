'use client';

import { motion } from 'framer-motion';
import { FiCheckCircle, FiHome, FiLink, FiMail, FiSettings, FiShield, FiZap } from 'react-icons/fi';

const features = [
  {
    icon: FiSettings,
    title: 'Automated Domain & DNS Setup',
    description: 'Complete automated setup of SPF, DKIM, and DMARC records for maximum deliverability. No technical knowledge required.',
    benefits: ['One-click SPF configuration', 'Automatic DKIM signing', 'DMARC policy setup', 'DNS propagation monitoring'],
    badge: 'FREE',
    illustration: '🔧'
  },
  {
    icon: FiMail,
    title: 'Pre-warmed Google & Microsoft Inboxes',
    description: 'Access to regular and pre-warmed email accounts from Google Workspace and Microsoft 365 for instant high deliverability.',
    benefits: ['Pre-warmed Gmail accounts', 'Microsoft 365 inboxes', 'Instant high reputation', 'Multiple account types'],
    illustration: '📧'
  },
  {
    icon: FiMail,
    title: 'Deliverability Insights Dashboard',
    description: 'Real-time analytics and insights into your email performance, deliverability rates, and sender reputation.',
    benefits: ['Real-time deliverability tracking', 'Sender reputation monitoring', 'Bounce rate analysis', 'Spam folder detection'],
    illustration: '📊'
  },
  {
    icon: FiLink,
    title: '50+ Outreach Tool Integrations',
    description: 'Seamlessly integrate with popular cold email tools like Lemlist, Instantly, Reply.io, and many more.',
    benefits: ['Lemlist integration', 'Instantly.ai support', 'Reply.io connector', '50+ tool compatibility'],
    illustration: '🔗'
  }
];

const additionalFeatures = [
  {
    icon: FiShield,
    title: 'Advanced Security',
    description: 'Enterprise-grade security with encryption and compliance features.',
    benefits: ['End-to-end encryption', 'GDPR compliance', 'SOC 2 certified']
  },
  {
    icon: FiZap,
    title: 'Lightning Setup',
    description: 'Get started in minutes with our automated onboarding process.',
    benefits: ['5-minute setup', 'Automated configuration', 'Instant activation']
  },
  {
    icon: FiHome,
    title: 'Global Infrastructure',
    description: 'Worldwide email delivery with optimized routing and local compliance.',
    benefits: ['Global delivery network', 'Local compliance', 'Multi-region support']
  }
];

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
      duration: 0.6
    }
  }
};

export default function FeaturesClient(): JSX.Element {
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
            Everything You Need for <span className="text-primary">Cold Email Success</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            From automated domain setup to pre-warmed inboxes and powerful integrations - scale your outreach with confidence.
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              {feature.badge && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {feature.badge}
                </div>
              )}
              
              <div className="flex items-start mb-6">
                <div className="p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mr-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <div className="text-4xl mb-4">{feature.illustration}</div>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">{feature.description}</p>
              
              <ul className="space-y-3">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center">
                    <FiCheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">Plus These Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="card hover:shadow-lg transition-all duration-300 group text-center"
                whileHover={{ y: -3 }}
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 w-fit mx-auto mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                <ul className="space-y-1">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="text-xs text-muted-foreground">
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Banner */}
        <motion.div 
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Scaling in 5 Minutes
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of businesses already using our platform to scale their cold email outreach. 
              Setup is instant, results are immediate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started Free
              </motion.button>
              <motion.button 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </div>
            <p className="text-sm opacity-75 mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
