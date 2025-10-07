'use client'

import { motion } from 'framer-motion'
import { 
  FiShield,
  FiUser,
  FiEye,
  FiEdit,
  FiTrash2,
  FiDownload,
  FiLock,
  FiGlobe,
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiPhone,
  FiAlertCircle,
  FiInfo,
  FiSettings,
  FiDatabase,
  FiKey,
  FiRefreshCw,
  FiExternalLink,
  FiHelpCircle,
  FiFlag,
  FiUsers,
  FiServer
} from 'react-icons/fi'
import Link from 'next/link'
import { useState } from 'react'

export default function GDPRPage() {
  const [selectedRight, setSelectedRight] = useState<string | null>(null)

  const dataRights = [
    {
      id: 'access',
      title: 'Right of Access',
      icon: FiEye,
      description: 'You have the right to know what personal data we process about you and receive a copy of it.',
      details: [
        'Request a copy of your personal data',
        'Information about how we use your data',
        'Details about data sharing with third parties',
        'Data retention periods'
      ],
      timeframe: '30 days',
      process: 'Submit a request through our data portal or contact our DPO'
    },
    {
      id: 'rectification',
      title: 'Right to Rectification',
      icon: FiEdit,
      description: 'You can request correction of inaccurate or incomplete personal data.',
      details: [
        'Correct inaccurate personal information',
        'Complete incomplete data',
        'Update outdated information',
        'Verify data accuracy'
      ],
      timeframe: '30 days',
      process: 'Update your profile or contact support with corrections'
    },
    {
      id: 'erasure',
      title: 'Right to Erasure',
      icon: FiTrash2,
      description: 'Request deletion of your personal data under certain circumstances.',
      details: [
        'Delete data when no longer necessary',
        'Withdraw consent for processing',
        'Object to unlawful processing',
        'Exercise right to be forgotten'
      ],
      timeframe: '30 days',
      process: 'Submit deletion request with verification of identity'
    },
    {
      id: 'portability',
      title: 'Right to Data Portability',
      icon: FiDownload,
      description: 'Receive your data in a structured, machine-readable format.',
      details: [
        'Export data in common formats (JSON, CSV)',
        'Transfer data to another service',
        'Receive structured data files',
        'Automated data export tools'
      ],
      timeframe: '30 days',
      process: 'Use our data export tool or request manual export'
    },
    {
      id: 'restriction',
      title: 'Right to Restrict Processing',
      icon: FiLock,
      description: 'Limit how we process your personal data in certain situations.',
      details: [
        'Suspend processing during disputes',
        'Limit use while verifying accuracy',
        'Restrict processing for specific purposes',
        'Maintain data without processing'
      ],
      timeframe: '30 days',
      process: 'Contact our DPO with specific restriction requests'
    },
    {
      id: 'objection',
      title: 'Right to Object',
      icon: FiAlertCircle,
      description: 'Object to processing based on legitimate interests or for direct marketing.',
      details: [
        'Object to direct marketing',
        'Challenge legitimate interest processing',
        'Opt-out of profiling',
        'Stop automated decision-making'
      ],
      timeframe: 'Immediate for marketing',
      process: 'Use unsubscribe links or contact our DPO'
    }
  ]

  const legalBases = [
    {
      basis: 'Consent',
      description: 'You have given clear consent for us to process your personal data for specific purposes.',
      examples: ['Newsletter subscriptions', 'Marketing communications', 'Optional features'],
      withdrawal: 'You can withdraw consent at any time through your account settings or by contacting us.'
    },
    {
      basis: 'Contract',
      description: 'Processing is necessary for the performance of a contract with you.',
      examples: ['Account creation', 'Service delivery', 'Payment processing'],
      withdrawal: 'Cannot be withdrawn as it\'s necessary for service provision.'
    },
    {
      basis: 'Legal Obligation',
      description: 'Processing is necessary to comply with legal obligations.',
      examples: ['Tax records', 'Fraud prevention', 'Regulatory compliance'],
      withdrawal: 'Cannot be withdrawn due to legal requirements.'
    },
    {
      basis: 'Legitimate Interest',
      description: 'Processing is necessary for legitimate interests pursued by us or third parties.',
      examples: ['Security monitoring', 'Service improvement', 'Analytics'],
      withdrawal: 'You can object to this processing in certain circumstances.'
    }
  ]

  const dataCategories = [
    {
      category: 'Account Information',
      types: ['Name', 'Email address', 'Phone number', 'Company details'],
      purpose: 'Account management and service provision',
      retention: '3 years after account closure',
      sharing: 'Not shared with third parties'
    },
    {
      category: 'Usage Data',
      types: ['API usage', 'Feature usage', 'Performance metrics', 'Error logs'],
      purpose: 'Service improvement and support',
      retention: '2 years',
      sharing: 'Aggregated data may be shared with analytics providers'
    },
    {
      category: 'Communication Data',
      types: ['Support tickets', 'Email content', 'Chat logs', 'Feedback'],
      purpose: 'Customer support and service improvement',
      retention: '5 years for support history',
      sharing: 'Not shared except with support tool providers'
    },
    {
      category: 'Payment Information',
      types: ['Billing address', 'Payment method', 'Transaction history'],
      purpose: 'Payment processing and billing',
      retention: '7 years for tax purposes',
      sharing: 'Shared with payment processors (Stripe)'
    },
    {
      category: 'Technical Data',
      types: ['IP address', 'Browser type', 'Device information', 'Cookies'],
      purpose: 'Security, analytics, and functionality',
      retention: '1-2 years depending on type',
      sharing: 'May be shared with analytics and security providers'
    }
  ]

  const dataTransfers = [
    {
      region: 'United States',
      safeguards: 'Standard Contractual Clauses (SCCs)',
      providers: ['AWS', 'Stripe', 'Intercom'],
      purpose: 'Cloud hosting and payment processing'
    },
    {
      region: 'United Kingdom',
      safeguards: 'Adequacy Decision',
      providers: ['Analytics providers'],
      purpose: 'Website analytics and monitoring'
    },
    {
      region: 'European Union',
      safeguards: 'Within EU/EEA',
      providers: ['Various EU-based services'],
      purpose: 'Data processing and storage'
    }
  ]

  const complianceFeatures = [
    {
      feature: 'Data Protection Officer',
      description: 'Dedicated DPO to handle privacy matters and GDPR compliance',
      status: 'Implemented',
      icon: FiUser
    },
    {
      feature: 'Privacy by Design',
      description: 'Privacy considerations built into all systems and processes',
      status: 'Implemented',
      icon: FiShield
    },
    {
      feature: 'Data Protection Impact Assessments',
      description: 'Regular assessments for high-risk processing activities',
      status: 'Ongoing',
      icon: FiFileText
    },
    {
      feature: 'Breach Notification Procedures',
      description: '72-hour breach notification system to authorities',
      status: 'Implemented',
      icon: FiAlertCircle
    },
    {
      feature: 'Records of Processing',
      description: 'Comprehensive documentation of all data processing activities',
      status: 'Maintained',
      icon: FiDatabase
    },
    {
      feature: 'Regular Audits',
      description: 'Annual GDPR compliance audits and assessments',
      status: 'Scheduled',
      icon: FiCheckCircle
    }
  ]

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
            <FiFlag className="w-20 h-20 mx-auto mb-6 opacity-90" />
            <h1 className="text-5xl font-bold mb-6">
              GDPR Compliance
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              We are committed to protecting your privacy and ensuring full compliance with the 
              General Data Protection Regulation (GDPR). Learn about your rights and how we handle your data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                Exercise Your Rights
              </button>
              <Link 
                href="/privacy" 
                className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors font-medium"
              >
                Privacy Policy
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Your Data Rights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Data Rights Under GDPR</h2>
            <p className="text-lg text-gray-600">
              As a data subject, you have several rights regarding your personal data. Click on each right to learn more.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataRights.map((right, index) => {
              const Icon = right.icon
              const isSelected = selectedRight === right.id
              
              return (
                <motion.div
                  key={right.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-white rounded-lg shadow-sm border-2 cursor-pointer transition-all ${
                    isSelected ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedRight(isSelected ? null : right.id)}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-gray-900">{right.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{right.description}</p>
                    
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-gray-200 pt-4"
                      >
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">What you can do:</h4>
                            <ul className="space-y-1">
                              {right.details.map((detail, detailIndex) => (
                                <li key={detailIndex} className="flex items-center gap-2 text-sm text-gray-600">
                                  <FiCheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <FiClock className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600">Response time: {right.timeframe}</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            <strong>How to exercise:</strong> {right.process}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Legal Bases for Processing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Legal Bases for Data Processing</h2>
            <p className="text-lg text-gray-600">
              We only process your personal data when we have a valid legal basis to do so under GDPR.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {legalBases.map((basis, index) => (
              <motion.div
                key={basis.basis}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-3">{basis.basis}</h3>
                <p className="text-gray-600 text-sm mb-4">{basis.description}</p>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Examples:</h4>
                    <ul className="space-y-1">
                      {basis.examples.map((example, exampleIndex) => (
                        <li key={exampleIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <FiCheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Your control:</strong> {basis.withdrawal}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Data We Collect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Data We Collect and Process</h2>
            <p className="text-lg text-gray-600">
              Transparency about what data we collect, why we collect it, and how long we keep it.
            </p>
          </div>
          
          <div className="space-y-6">
            {dataCategories.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{category.category}</h3>
                    <ul className="space-y-1">
                      {category.types.map((type, typeIndex) => (
                        <li key={typeIndex} className="text-sm text-gray-600">• {type}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Purpose</h4>
                    <p className="text-sm text-gray-600">{category.purpose}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Retention</h4>
                    <p className="text-sm text-gray-600">{category.retention}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Sharing</h4>
                    <p className="text-sm text-gray-600">{category.sharing}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* International Data Transfers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
            <p className="text-lg text-gray-600">
              When we transfer your data outside the EU/EEA, we ensure appropriate safeguards are in place.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Region
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Safeguards
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service Providers
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dataTransfers.map((transfer, index) => (
                    <tr key={transfer.region} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <FiGlobe className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-900">{transfer.region}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {transfer.safeguards}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {transfer.providers.join(', ')}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {transfer.purpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Compliance Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our GDPR Compliance Measures</h2>
            <p className="text-lg text-gray-600">
              We have implemented comprehensive measures to ensure full GDPR compliance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{feature.feature}</h3>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                        {feature.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Data Subject Request Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center mb-8">
              <FiFileText className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Exercise Your Data Rights</h2>
              <p className="text-lg text-gray-600">
                Submit a request to exercise any of your GDPR rights. We'll respond within 30 days.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FiUser className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Verify Identity</h3>
                <p className="text-gray-600 text-sm">We'll verify your identity to protect your data</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FiSettings className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">2. Process Request</h3>
                <p className="text-gray-600 text-sm">We'll review and process your request</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FiCheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Respond</h3>
                <p className="text-gray-600 text-sm">You'll receive a response within 30 days</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Submit Data Request
              </button>
              <a 
                href="mailto:dpo@emailinfra.com" 
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center"
              >
                Email Our DPO
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact DPO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white"
        >
          <FiHelpCircle className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">Questions About GDPR?</h2>
          <p className="text-xl mb-6 opacity-90">
            Our Data Protection Officer is here to help with any privacy-related questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:dpo@emailinfra.com" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium flex items-center gap-2 justify-center"
            >
              <FiMail className="w-4 h-4" />
              Contact DPO
            </a>
            <Link 
              href="/privacy-policy" 
              className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors font-medium flex items-center gap-2 justify-center"
            >
              <FiFileText className="w-4 h-4" />
              Privacy Policy
            </Link>
          </div>
          <div className="mt-6 text-sm opacity-75">
            <p>Data Protection Officer: <a href="mailto:dpo@emailinfra.com" className="underline">dpo@emailinfra.com</a></p>
            <p>Address: 123 Privacy Street, Data City, EU 12345</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}