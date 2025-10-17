'use client';

import { motion } from 'framer-motion';
import { FiCheckCircle, FiServer, FiMail, FiSettings, FiShield, FiZap, FiDatabase, FiUsers, FiLock, FiTrendingUp } from 'react-icons/fi';

const features = [
  {
    icon: FiServer,
    title: 'Dedicated SMTP Infrastructure',
    description: 'Enterprise-grade PowerMTA infrastructure, fully isolated and optimized for your sending needs.',
    benefits: [
      'Dedicated PowerMTA environment',
      'Custom routing rules',
      'Isolated IP pools',
      'Automatic scaling'
    ],
    badge: 'CORE',
    illustration: '🚀'
  },
  {
    icon: FiTrendingUp,
    title: 'Deliverability Optimization',
    description: 'Continuous monitoring and optimization by our expert team to ensure maximum inbox placement.',
    benefits: [
      'Inbox placement testing',
      'ISP feedback loop integration',
      'Real-time spam monitoring',
      'Inbox vs. Promotions tracking'
    ],
    illustration: '📈'
  },
  {
    icon: FiMail,
    title: 'Email Verification & Hygiene',
    description: 'Built-in email validation and list cleaning to maintain pristine sending reputation.',
    benefits: [
      'Real-time email validation',
      'Invalid address detection',
      'Role-based email filtering',
      '30% higher inbox rates'
    ],
    illustration: '✨'
  },
  {
    icon: FiSettings,
    title: 'IP & Domain Warm-Up',
    description: 'AI-driven warm-up process that safely establishes your sending reputation.',
    benefits: [
      'Gradual volume increase',
      'AI-powered scheduling',
      'Spam trap avoidance',
      'Reputation tracking'
    ],
    illustration: '🌡️'
  }
];

const additionalFeatures = [
  {
    icon: FiShield,
    title: 'Authentication & Compliance',
    description: 'Complete email authentication setup with ongoing compliance monitoring.',
    benefits: [
      'SPF, DKIM, DMARC setup',
      'Custom envelope configs',
      'GDPR compliance',
      'Blacklist monitoring'
    ]
  },
  {
    icon: FiDatabase,
    title: 'Monitoring & Analytics',
    description: 'Comprehensive visibility into your email delivery performance.',
    benefits: [
      'Daily performance logs',
      'Bounce tracking',
      'IP reputation monitoring',
      'Deliverability trends'
    ]
  },
  {
    icon: FiUsers,
    title: 'Dedicated Management',
    description: 'Expert oversight and optimization of your email infrastructure.',
    benefits: [
      'Dedicated manager',
      'Manual oversight',
      'Weekly optimization',
      'Enterprise support'
    ]
  },
  {
    icon: FiZap,
    title: 'Data & Lead Management',
    description: '600K+ verified lead database with monthly updates and segmentation.',
    benefits: [
      'Industry segmentation',
      'Geographic targeting',
      'Monthly updates',
      'Clean imports'
    ]
  },
  {
    icon: FiLock,
    title: 'Security & Reliability',
    description: 'Enterprise-grade security with 99.9% uptime SLA guarantee.',
    benefits: [
      'TLS encryption',
      'Multi-server redundancy',
      'Access management',
      'Daily backups'
    ]
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

export default function FeaturesClient() {
  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <div className="container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#1a3a54]">
            All the Power of Enterprise Email Infrastructure — Managed for You
          </h1>
          <p className="text-xl text-[#496b87] max-w-3xl mx-auto mb-8">
            SendingOps takes care of everything behind email delivery: from SMTP setup to deliverability tracking. 
            No need for developers, warm-up tools, or email reputation management — it's all included.
          </p>
          <div className="flex justify-center items-center space-x-8 text-lg font-semibold text-[#7d8898]">
            <div className="flex items-center">
              <FiCheckCircle className="text-[#496b87] mr-2" />
              <span>20,000+ emails per day</span>
            </div>
            <div className="flex items-center">
              <FiCheckCircle className="text-[#496b87] mr-2" />
              <span>98% inbox rate</span>
            </div>
            <div className="flex items-center">
              <FiCheckCircle className="text-[#496b87] mr-2" />
              <span>99.9% uptime SLA</span>
            </div>
          </div>
        </motion.div>

        {/* Main Features */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-8 border border-[#d0c9be] hover:shadow-lg transition-all duration-300 group relative"
              variants={itemVariants}
            >
              {feature.badge && (
                <div className="absolute top-4 right-4 bg-[#1a3a54] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {feature.badge}
                </div>
              )}
              
              <div className="flex items-start mb-6">
                <div className="p-4 rounded-xl bg-[#9ebfb1]/10 text-[#496b87] group-hover:bg-[#496b87] group-hover:text-white transition-all duration-300 mr-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-[#1a3a54]">{feature.title}</h3>
                  <div className="text-4xl mb-4">{feature.illustration}</div>
                </div>
              </div>
              
              <p className="text-[#496b87] mb-6 text-lg leading-relaxed">{feature.description}</p>
              
              <ul className="space-y-3">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center">
                    <FiCheckCircle className="h-5 w-5 text-[#9ebfb1] mr-3 flex-shrink-0" />
                    <span className="text-sm font-medium text-[#7d8898]">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-[#1a3a54]">Comprehensive Email Infrastructure</h2>
          <p className="text-lg text-[#496b87] max-w-2xl mx-auto">
            We don't just send your emails — we provide a complete infrastructure solution with expert management and detailed analytics.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 border border-[#d0c9be] hover:shadow-lg transition-all duration-300"
              variants={itemVariants}
            >
              <div className="p-3 rounded-lg bg-[#9ebfb1]/10 text-[#496b87] w-fit mb-6">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#1a3a54]">{feature.title}</h3>
              <p className="text-[#496b87] mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center">
                    <FiCheckCircle className="h-4 w-4 text-[#9ebfb1] mr-2 flex-shrink-0" />
                    <span className="text-sm text-[#7d8898]">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center bg-[#1a3a54] rounded-2xl p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4">Your Email Delivery is Mission-Critical</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Let our experts handle your email infrastructure while you focus on growing your business. 
            With SendingOps, you get enterprise-grade delivery with none of the complexity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#1a3a54] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#d0c9be] transition-colors duration-300">
              Schedule a Demo
            </button>
            <button className="border-2 border-[#9ebfb1] bg-transparent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#9ebfb1] hover:text-[#1a3a54] transition-colors duration-300">
              View Pricing
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
