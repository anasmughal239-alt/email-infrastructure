'use client'

import { motion } from 'framer-motion'
import { 
  FiMail,
  FiUsers,
  FiHome,
  FiCheck
} from 'react-icons/fi'
import Link from 'next/link'
import { useState } from 'react'

export default function CookiePolicyPage() {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true, // Always required
    analytics: true,
    marketing: false,
    functional: true
  })

  const cookieTypes = [
    {
      type: 'Essential Cookies',
      icon: FiCheck,
      required: true,
      description: 'These cookies are necessary for the website to function and cannot be switched off.',
      purpose: 'Authentication, security, and basic website functionality',
      examples: ['Session management', 'Security tokens', 'Load balancing'],
      retention: 'Session or up to 1 year',
      thirdParty: false
    },
    {
      type: 'Analytics Cookies',
      icon: FiMail,
      required: false,
      description: 'These cookies help us understand how visitors interact with our website.',
      purpose: 'Website performance analysis and improvement',
      examples: ['Google Analytics', 'Page views', 'User behavior tracking'],
      retention: 'Up to 2 years',
      thirdParty: true
    },
    {
      type: 'Marketing Cookies',
      icon: FiUsers,
      required: false,
      description: 'These cookies are used to deliver personalized advertisements and track campaign effectiveness.',
      purpose: 'Targeted advertising and marketing campaign measurement',
      examples: ['Ad targeting', 'Conversion tracking', 'Social media pixels'],
      retention: 'Up to 1 year',
      thirdParty: true
    },
    {
      type: 'Functional Cookies',
      icon: FiHome,
      required: false,
      description: 'These cookies enable enhanced functionality and personalization.',
      purpose: 'Enhanced user experience and personalized features',
      examples: ['Language preferences', 'Theme settings', 'Form data'],
      retention: 'Up to 1 year',
      thirdParty: false
    }
  ]

  const specificCookies = [
    {
      name: '_session_id',
      purpose: 'User session management',
      type: 'Essential',
      duration: 'Session',
      domain: 'emailinfra.com'
    },
    {
      name: '_csrf_token',
      purpose: 'Security protection against CSRF attacks',
      type: 'Essential',
      duration: 'Session',
      domain: 'emailinfra.com'
    },
    {
      name: 'user_preferences',
      purpose: 'Store user interface preferences',
      type: 'Functional',
      duration: '1 year',
      domain: 'emailinfra.com'
    },
    {
      name: '_ga',
      purpose: 'Google Analytics - distinguish users',
      type: 'Analytics',
      duration: '2 years',
      domain: '.emailinfra.com'
    },
    {
      name: '_gid',
      purpose: 'Google Analytics - distinguish users',
      type: 'Analytics',
      duration: '24 hours',
      domain: '.emailinfra.com'
    },
    {
      name: '_fbp',
      purpose: 'Facebook Pixel - track conversions',
      type: 'Marketing',
      duration: '3 months',
      domain: '.emailinfra.com'
    },
    {
      name: 'intercom-session',
      purpose: 'Customer support chat functionality',
      type: 'Functional',
      duration: '1 week',
      domain: 'widget.intercom.io'
    }
  ]

  const thirdPartyServices = [
    {
      name: 'Google Analytics',
      purpose: 'Website analytics and performance monitoring',
      category: 'Analytics',
      privacyPolicy: 'https://policies.google.com/privacy',
      optOut: 'https://tools.google.com/dlpage/gaoptout'
    },
    {
      name: 'Facebook Pixel',
      purpose: 'Advertising and conversion tracking',
      category: 'Marketing',
      privacyPolicy: 'https://www.facebook.com/privacy/explanation',
      optOut: 'https://www.facebook.com/settings?tab=ads'
    },
    {
      name: 'Intercom',
      purpose: 'Customer support and communication',
      category: 'Functional',
      privacyPolicy: 'https://www.intercom.com/legal/privacy',
      optOut: 'Contact support'
    },
    {
      name: 'Stripe',
      purpose: 'Payment processing',
      category: 'Essential',
      privacyPolicy: 'https://stripe.com/privacy',
      optOut: 'Not applicable (essential)'
    }
  ]

  const handleCookieToggle = (type: string) => {
    if (type === 'essential') return // Cannot disable essential cookies
    
    setCookiePreferences(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }))
  }

  const savePreferences = () => {
    // In a real implementation, this would save to localStorage and update actual cookies
    console.log('Saving cookie preferences:', cookiePreferences)
    alert('Cookie preferences saved successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <FiMail className="w-20 h-20 mx-auto mb-6 opacity-90" />
            <h1 className="text-5xl font-bold mb-6">
              Cookie Policy
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Learn about how we use cookies and similar technologies to improve your experience 
              on our website and provide personalized services.
            </p>
            <div className="text-sm opacity-75">
              <p>Last updated: December 15, 2023</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Cookie Preferences Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <FiHome className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Cookie Preferences</h2>
            </div>
            
            <p className="text-gray-600 mb-6">
              Manage your cookie preferences below. You can enable or disable different types of cookies, 
              except for essential cookies which are required for the website to function properly.
            </p>

            <div className="space-y-4 mb-6">
              {cookieTypes.map((cookie, index) => {
                const Icon = cookie.icon
                const isEnabled = cookiePreferences[cookie.type.toLowerCase().split(' ')[0] as keyof typeof cookiePreferences]
                
                return (
                  <div key={cookie.type} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{cookie.type}</h3>
                          {cookie.required && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                              Required
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{cookie.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCookieToggle(cookie.type.toLowerCase().split(' ')[0])}
                      disabled={cookie.required}
                      className={`flex items-center ${cookie.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {isEnabled ? (
                        <FiCheck className="w-8 h-8 text-blue-600" />
                      ) : (
                        <FiUsers className="w-8 h-8 text-gray-400" />
                      )}
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-4">
              <button
                onClick={savePreferences}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Save Preferences
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Accept All
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Reject All (except essential)
              </button>
            </div>
          </div>
        </motion.div>

        {/* What Are Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What Are Cookies?</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-gray-600 mb-4">
              Cookies are small text files that are stored on your device when you visit a website. 
              They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p className="text-gray-600 mb-4">
              Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device 
              for a set period of time or until you delete them. Session cookies are temporary and are 
              deleted when you close your browser.
            </p>
            <p className="text-gray-600">
              We use both first-party cookies (set by our website) and third-party cookies (set by other 
              services we use) to provide you with the best possible experience.
            </p>
          </div>
        </motion.div>

        {/* Cookie Types Detail */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Cookies We Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cookieTypes.map((cookie, index) => {
              const Icon = cookie.icon
              return (
                <motion.div
                  key={cookie.type}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{cookie.type}</h3>
                      {cookie.required && (
                        <span className="text-xs text-red-600 font-medium">Required</span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{cookie.description}</p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Purpose:</span>
                      <span className="text-gray-600 ml-1">{cookie.purpose}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Examples:</span>
                      <span className="text-gray-600 ml-1">{cookie.examples.join(', ')}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Retention:</span>
                      <span className="text-gray-600 ml-1">{cookie.retention}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Third-party:</span>
                      <span className="text-gray-600 ml-1">{cookie.thirdParty ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Specific Cookies Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Specific Cookies We Use</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cookie Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Purpose
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Domain
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {specificCookies.map((cookie, index) => (
                    <tr key={cookie.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {cookie.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {cookie.purpose}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          cookie.type === 'Essential' ? 'bg-red-100 text-red-800' :
                          cookie.type === 'Analytics' ? 'bg-blue-100 text-blue-800' :
                          cookie.type === 'Marketing' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {cookie.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {cookie.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {cookie.domain}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Third-Party Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Third-Party Services</h2>
          <p className="text-gray-600 mb-6">
            We use various third-party services that may set their own cookies. Below are the main services we use:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {thirdPartyServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{service.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    service.category === 'Essential' ? 'bg-red-100 text-red-800' :
                    service.category === 'Analytics' ? 'bg-blue-100 text-blue-800' :
                    service.category === 'Marketing' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {service.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{service.purpose}</p>
                <div className="flex flex-col gap-2">
                  <a 
                    href={service.privacyPolicy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <FiMail className="w-4 h-4" />
                    Privacy Policy
                  </a>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <FiHome className="w-4 h-4" />
                    Opt-out: {service.optOut}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Managing Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Managing Your Cookies</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Browser Settings</h3>
                <p className="text-gray-600 text-sm mb-4">
                  You can control and delete cookies through your browser settings. Here are links to 
                  cookie management for popular browsers:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                      <FiMail className="w-4 h-4" />
                      Chrome Cookie Settings
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                      <FiMail className="w-4 h-4" />
                      Firefox Cookie Settings
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                      <FiMail className="w-4 h-4" />
                      Safari Cookie Settings
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                      <FiMail className="w-4 h-4" />
                      Edge Cookie Settings
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Opt-Out Tools</h3>
                <p className="text-gray-600 text-sm mb-4">
                  You can also use these industry tools to opt out of certain types of tracking:
                </p>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                      <FiCheck className="w-4 h-4" />
                      Google Analytics Opt-out
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                      <FiCheck className="w-4 h-4" />
                      Digital Advertising Alliance
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                      <FiCheck className="w-4 h-4" />
                      Network Advertising Initiative
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                      <FiCheck className="w-4 h-4" />
                      European Interactive Digital Advertising Alliance
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white"
        >
          <FiUsers className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">Questions About Our Cookie Policy?</h2>
          <p className="text-xl mb-6 opacity-90">
            If you have any questions about our use of cookies or this policy, please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:privacy@emailinfra.com" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center gap-2 justify-center"
            >
              <FiMail className="w-4 h-4" />
              Email Us
            </a>
            <Link 
              href="/contact" 
              className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors font-medium flex items-center gap-2 justify-center"
            >
              <FiHome className="w-4 h-4" />
              Contact Support
            </Link>
          </div>
          <div className="mt-6 text-sm opacity-75">
            <p>Email: <a href="mailto:privacy@emailinfra.com" className="underline">privacy@emailinfra.com</a></p>
            <p>This policy was last updated on December 15, 2023</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
