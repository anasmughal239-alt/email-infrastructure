'use client'

import { motion } from 'framer-motion'
import { 
  FiSearch, 
  FiBook, 
  FiMessageCircle,
  FiMail,
  FiPhone,
  FiClock,
  FiChevronDown,
  FiChevronRight,
  FiExternalLink,
  FiPlay,
  FiDownload,
  FiCode,
  FiSettings,
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiHelpCircle,
  FiArrowRight
} from 'react-icons/fi'
import Link from 'next/link'
import { useState } from 'react'

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const categories = [
    {
      icon: FiCode,
      title: 'API Documentation',
      description: 'Complete guides for integrating our email API',
      articles: 12,
      color: 'blue'
    },
    {
      icon: FiSettings,
      title: 'Getting Started',
      description: 'Setup guides and quick start tutorials',
      articles: 8,
      color: 'green'
    },
    {
      icon: FiShield,
      title: 'Security & Compliance',
      description: 'Security best practices and compliance guides',
      articles: 6,
      color: 'purple'
    },
    {
      icon: FiTrendingUp,
      title: 'Deliverability',
      description: 'Improve your email delivery rates',
      articles: 10,
      color: 'orange'
    },
    {
      icon: FiUsers,
      title: 'Account Management',
      description: 'Billing, plans, and account settings',
      articles: 7,
      color: 'pink'
    },
    {
      icon: FiMail,
      title: 'Email Templates',
      description: 'Creating and managing email templates',
      articles: 5,
      color: 'indigo'
    }
  ]

  const popularArticles = [
    {
      title: 'Getting Started with Email API',
      category: 'Getting Started',
      readTime: '5 min',
      views: '12.5k'
    },
    {
      title: 'Authentication and API Keys',
      category: 'API Documentation',
      readTime: '3 min',
      views: '8.2k'
    },
    {
      title: 'Improving Email Deliverability',
      category: 'Deliverability',
      readTime: '8 min',
      views: '6.7k'
    },
    {
      title: 'Setting Up Domain Authentication',
      category: 'Security & Compliance',
      readTime: '6 min',
      views: '5.9k'
    },
    {
      title: 'Webhook Configuration Guide',
      category: 'API Documentation',
      readTime: '7 min',
      views: '4.8k'
    }
  ]

  const faqs = [
    {
      question: 'How do I get started with the Email API?',
      answer: 'Getting started is easy! First, sign up for an account and verify your email. Then, generate your API key from the dashboard, verify your sending domain, and start sending emails using our REST API or SDKs.'
    },
    {
      question: 'What are the rate limits for sending emails?',
      answer: 'Rate limits depend on your plan. Starter plans allow 1,000 emails per hour, Professional plans allow 10,000 emails per hour, and Enterprise plans have custom limits. You can monitor your usage in the dashboard.'
    },
    {
      question: 'How do I improve my email deliverability?',
      answer: 'To improve deliverability: 1) Set up proper domain authentication (SPF, DKIM, DMARC), 2) Maintain a good sender reputation, 3) Use double opt-in for subscribers, 4) Monitor bounce and complaint rates, 5) Follow email best practices.'
    },
    {
      question: 'Can I use custom domains for sending emails?',
      answer: 'Yes! You can add and verify custom domains in your dashboard. We recommend using a subdomain like "mail.yourdomain.com" for better deliverability. Domain verification involves adding DNS records.'
    },
    {
      question: 'What happens if I exceed my plan limits?',
      answer: 'If you exceed your plan limits, additional emails will be queued until the next billing cycle or you can upgrade your plan. We\'ll send notifications before you reach your limits.'
    },
    {
      question: 'How do I track email opens and clicks?',
      answer: 'Email tracking is automatically enabled for all emails. You can view detailed analytics in your dashboard, including open rates, click rates, and engagement metrics. You can also use webhooks for real-time tracking.'
    },
    {
      question: 'Is there an SLA for email delivery?',
      answer: 'Yes, we offer a 99.9% uptime SLA for Professional and Enterprise plans. We also guarantee email delivery within 30 seconds for 95% of emails under normal conditions.'
    },
    {
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription anytime from the billing section in your dashboard. Your service will continue until the end of your current billing period, and no future charges will occur.'
    }
  ]

  const supportChannels = [
    {
      icon: FiMessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: '24/7',
      action: 'Start Chat'
    },
    {
      icon: FiMail,
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Response within 4 hours',
      action: 'Send Email'
    },
    {
      icon: FiPhone,
      title: 'Phone Support',
      description: 'Talk to our experts directly',
      availability: 'Business hours',
      action: 'Schedule Call'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      pink: 'bg-pink-100 text-pink-600',
      indigo: 'bg-indigo-100 text-indigo-600'
    }
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-600'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              How can we help you?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Find answers to your questions, browse our documentation, or get in touch with our support team.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help articles, guides, or FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Support Channels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Support</h2>
            <p className="text-lg text-gray-600">Choose the best way to reach us</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportChannels.map((channel, index) => {
              const Icon = channel.icon
              return (
                <motion.div
                  key={channel.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{channel.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{channel.description}</p>
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-4">
                    <FiClock className="w-4 h-4" />
                    {channel.availability}
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    {channel.action}
                  </button>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-lg text-gray-600">Find the information you need</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${getColorClasses(category.color)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{category.articles} articles</span>
                    <FiArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Popular Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Articles</h2>
            <p className="text-lg text-gray-600">Most viewed help articles</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {popularArticles.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                  index !== popularArticles.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <FiClock className="w-4 h-4" />
                        {article.readTime}
                      </div>
                      <span>{article.views} views</span>
                    </div>
                  </div>
                  <FiChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Quick answers to common questions</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${index !== faqs.length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    {expandedFaq === index ? (
                      <FiChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <FiChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <FiBook className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">API Docs</h3>
            <p className="text-sm text-gray-600 mb-4">Complete API reference</p>
            <Link href="/docs" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View Docs →
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <FiPlay className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Video Tutorials</h3>
            <p className="text-sm text-gray-600 mb-4">Step-by-step guides</p>
            <a href="#" className="text-green-600 hover:text-green-700 text-sm font-medium">
              Watch Now →
            </a>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <FiDownload className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">SDKs</h3>
            <p className="text-sm text-gray-600 mb-4">Download our libraries</p>
            <a href="#" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              Download →
            </a>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <FiUsers className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
            <p className="text-sm text-gray-600 mb-4">Join our community</p>
            <Link href="/community" className="text-orange-600 hover:text-orange-700 text-sm font-medium">
              Join Now →
            </Link>
          </div>
        </motion.div>

        {/* Still Need Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white"
        >
          <FiHelpCircle className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
          <p className="text-xl mb-6 opacity-90">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Contact Support
            </button>
            <Link 
              href="/contact" 
              className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors font-medium"
            >
              Send Message
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}