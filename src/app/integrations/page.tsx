'use client'

import { motion } from 'framer-motion'
import { 
  FiCode, 
  FiZap, 
  FiSettings, 
  FiExternalLink,
  FiCheck,
  FiArrowRight,
  FiGithub,
  FiDatabase,
  FiCloud,
  FiShoppingCart,
  FiUsers,
  FiMail
} from 'react-icons/fi'
import Link from 'next/link'

export default function IntegrationsPage() {
  const integrationCategories = [
    {
      title: 'Development Platforms',
      description: 'Integrate with your favorite development tools and platforms',
      integrations: [
        {
          name: 'GitHub',
          description: 'Trigger emails based on repository events and pull requests',
          icon: FiGithub,
          status: 'available',
          color: 'bg-gray-900'
        },
        {
          name: 'Vercel',
          description: 'Deploy and manage email templates with your applications',
          icon: FiZap,
          status: 'available',
          color: 'bg-black'
        },
        {
          name: 'Netlify',
          description: 'Seamless integration with Netlify forms and functions',
          icon: FiCloud,
          status: 'available',
          color: 'bg-teal-600'
        },
        {
          name: 'Heroku',
          description: 'Easy deployment and scaling of email infrastructure',
          icon: FiSettings,
          status: 'coming-soon',
          color: 'bg-purple-600'
        }
      ]
    },
    {
      title: 'E-commerce Platforms',
      description: 'Connect with popular e-commerce solutions',
      integrations: [
        {
          name: 'Shopify',
          description: 'Send order confirmations, shipping updates, and marketing emails',
          icon: FiShoppingCart,
          status: 'available',
          color: 'bg-green-600'
        },
        {
          name: 'WooCommerce',
          description: 'WordPress e-commerce email automation and notifications',
          icon: FiShoppingCart,
          status: 'available',
          color: 'bg-blue-600'
        },
        {
          name: 'Magento',
          description: 'Enterprise e-commerce email solutions',
          icon: FiShoppingCart,
          status: 'coming-soon',
          color: 'bg-orange-600'
        },
        {
          name: 'BigCommerce',
          description: 'Scalable email infrastructure for growing businesses',
          icon: FiShoppingCart,
          status: 'coming-soon',
          color: 'bg-red-600'
        }
      ]
    },
    {
      title: 'CRM & Marketing',
      description: 'Enhance your customer relationship management',
      integrations: [
        {
          name: 'Salesforce',
          description: 'Sync customer data and automate email campaigns',
          icon: FiUsers,
          status: 'available',
          color: 'bg-blue-500'
        },
        {
          name: 'HubSpot',
          description: 'Integrated marketing automation and lead nurturing',
          icon: FiMail,
          status: 'available',
          color: 'bg-orange-500'
        },
        {
          name: 'Pipedrive',
          description: 'Sales pipeline email automation and follow-ups',
          icon: FiUsers,
          status: 'available',
          color: 'bg-green-500'
        },
        {
          name: 'Intercom',
          description: 'Customer messaging and support email integration',
          icon: FiUsers,
          status: 'coming-soon',
          color: 'bg-blue-400'
        }
      ]
    },
    {
      title: 'Databases & Analytics',
      description: 'Connect with your data sources and analytics tools',
      integrations: [
        {
          name: 'PostgreSQL',
          description: 'Direct database triggers for email automation',
          icon: FiDatabase,
          status: 'available',
          color: 'bg-blue-700'
        },
        {
          name: 'MongoDB',
          description: 'NoSQL database integration for flexible email data',
          icon: FiDatabase,
          status: 'available',
          color: 'bg-green-700'
        },
        {
          name: 'Google Analytics',
          description: 'Track email campaign performance and user behavior',
          icon: FiMail,
          status: 'available',
          color: 'bg-orange-400'
        },
        {
          name: 'Mixpanel',
          description: 'Advanced email analytics and user segmentation',
          icon: FiMail,
          status: 'coming-soon',
          color: 'bg-purple-500'
        }
      ]
    }
  ]

  const quickStartSteps = [
    {
      step: 1,
      title: 'Choose Integration',
      description: 'Select the platform you want to integrate with EmailInfra'
    },
    {
      step: 2,
      title: 'Configure Settings',
      description: 'Set up authentication and configure integration parameters'
    },
    {
      step: 3,
      title: 'Test Connection',
      description: 'Verify the integration is working correctly'
    },
    {
      step: 4,
      title: 'Go Live',
      description: 'Start sending emails through your integrated platform'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <FiZap className="w-12 h-12 text-blue-600" />
              <h1 className="text-5xl font-bold text-gray-900">Integrations</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Connect EmailInfra with your favorite tools and platforms. 
              Streamline your workflow and automate email delivery across your entire tech stack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/docs" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <FiCode className="w-5 h-5" />
                View API Docs
              </Link>
              <Link 
                href="/contact" 
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                Request Integration
                <FiArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Quick Start Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Start Guide</h2>
            <p className="text-lg text-gray-600">Get up and running with integrations in minutes</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStartSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center"
              >
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Integration Categories */}
        <div className="space-y-16">
          {integrationCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{category.title}</h2>
                <p className="text-lg text-gray-600">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.integrations.map((integration, index) => {
                  const Icon = integration.icon
                  return (
                    <motion.div
                      key={integration.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 ${integration.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center gap-2">
                          {integration.status === 'available' ? (
                            <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                              <FiCheck className="w-4 h-4" />
                              Available
                            </span>
                          ) : (
                            <span className="text-orange-600 text-sm font-medium">
                              Coming Soon
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {integration.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{integration.description}</p>
                      
                      {integration.status === 'available' ? (
                        <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                          Configure
                          <FiSettings className="w-4 h-4" />
                        </button>
                      ) : (
                        <button className="w-full bg-gray-50 text-gray-400 py-2 px-4 rounded-md cursor-not-allowed">
                          Coming Soon
                        </button>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Integration CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Integration?</h2>
            <p className="text-xl mb-6 opacity-90">
              Don't see your platform listed? We can build custom integrations for enterprise customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center gap-2 justify-center"
              >
                Contact Sales
                <FiExternalLink className="w-5 h-5" />
              </Link>
              <Link 
                href="/docs" 
                className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors font-medium flex items-center gap-2 justify-center"
              >
                <FiCode className="w-5 h-5" />
                Build Your Own
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
