'use client'

import { motion } from 'framer-motion'
import { FiAlertTriangle, FiClock, FiFileText, FiMail, FiShield, FiUsers } from 'react-icons/fi';

export default function TermsPage() {
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: FiFileText,
      content: [
        'By accessing and using EmailInfra services, you accept and agree to be bound by the terms and provision of this agreement.',
        'If you do not agree to abide by the above, please do not use this service.'
      ]
    },
    {
      id: 'services',
      title: 'Description of Service',
      icon: FiMail,
      content: [
        'EmailInfra provides email infrastructure services including but not limited to email delivery, analytics, and management tools.',
        'We reserve the right to modify or discontinue the service at any time without notice.',
        'The service is provided "as is" without any warranties, express or implied.'
      ]
    },
    {
      id: 'accounts',
      title: 'User Accounts',
      icon: FiUsers,
      content: [
        'You are responsible for maintaining the confidentiality of your account and password.',
        'You agree to accept responsibility for all activities that occur under your account.',
        'You must notify us immediately of any unauthorized use of your account.'
      ]
    },
    {
      id: 'usage',
      title: 'Acceptable Use',
      icon: FiShield,
      content: [
        'You may not use our service for any illegal or unauthorized purpose.',
        'You must not transmit any worms, viruses, or any code of a destructive nature.',
        'Spam, phishing, or any form of unsolicited communication is strictly prohibited.',
        'You must comply with all applicable laws and regulations in your use of the service.'
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: FiShield,
      content: [
        'Your privacy is important to us. Please review our Privacy Policy for information on how we collect, use, and protect your data.',
        'By using our service, you consent to the collection and use of information as outlined in our Privacy Policy.'
      ]
    },
    {
      id: 'payment',
      title: 'Payment Terms',
      icon: FiClock,
      content: [
        'Subscription fees are billed in advance on a monthly or annual basis.',
        'All fees are non-refundable except as required by law.',
        'We reserve the right to change our pricing with 30 days notice.',
        'Failure to pay fees may result in suspension or termination of service.'
      ]
    },
    {
      id: 'termination',
      title: 'Termination',
      icon: FiAlertTriangle,
      content: [
        'Either party may terminate this agreement at any time with or without notice.',
        'Upon termination, your right to use the service will cease immediately.',
        'We reserve the right to terminate accounts that violate these terms.',
        'Data retention policies apply as outlined in our Privacy Policy.'
      ]
    },
    {
      id: 'liability',
      title: 'Limitation of Liability',
      icon: FiShield,
      content: [
        'EmailInfra shall not be liable for any indirect, incidental, special, consequential, or punitive damages.',
        'Our total liability shall not exceed the amount paid by you for the service in the 12 months preceding the claim.',
        'Some jurisdictions do not allow the exclusion of certain warranties or limitations of liability.'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using EmailInfra services.
            </p>
            <div className="mt-6 text-sm text-gray-500">
              Last updated: December 2024
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-8"
            >
              <div className="flex items-center mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <section.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="ml-4 text-2xl font-bold text-gray-900">
                  {section.title}
                </h2>
              </div>
              <div className="space-y-4">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-blue-50 rounded-xl p-8 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Questions About These Terms?
          </h3>
          <p className="text-gray-600 mb-6">
            If you have any questions about these Terms of Service, please contact us.
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Email: legal@emailinfra.com</p>
            <p>Address: 123 Tech Street, San Francisco, CA 94105</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
