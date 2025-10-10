'use client'

export const dynamic = 'force-dynamic'

import { motion } from 'framer-motion'
import { 
  FiShield, 
  FiDatabase, 
  FiLock, 
  FiEye, 
  FiUserCheck, 
  FiHome, 
  FiMail, 
  FiSettings,
  FiTrash2,
  FiDownload
} from 'react-icons/fi'

export default function PrivacyPage() {
  const sections = [
    {
      id: 'overview',
      title: 'Privacy Overview',
      icon: FiShield,
      content: [
        'At EmailInfra, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our email infrastructure services.',
        'We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy or our practices with regard to your personal information, please contact us.'
      ]
    },
    {
      id: 'collection',
      title: 'Information We Collect',
      icon: FiDatabase,
      content: [
        'Personal Information: Name, email address, phone number, billing address, and payment information.',
        'Usage Data: Information about how you use our service, including API calls, email metrics, and feature usage.',
        'Technical Data: IP addresses, browser type, device information, and log files.',
        'Communication Data: Records of your communications with our support team.'
      ]
    },
    {
      id: 'usage',
      title: 'How We Use Your Information',
      icon: FiSettings,
      content: [
        'To provide, operate, and maintain our email infrastructure services.',
        'To process transactions and send you related information, including confirmations and invoices.',
        'To communicate with you, including for customer service, updates, and marketing purposes.',
        'To improve our services and develop new features.',
        'To monitor and analyze usage patterns and trends.',
        'To detect, prevent, and address technical issues and security vulnerabilities.'
      ]
    },
    {
      id: 'sharing',
      title: 'Information Sharing',
      icon: FiUserCheck,
      content: [
        'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.',
        'Service Providers: We may share information with trusted third-party service providers who assist us in operating our business.',
        'Legal Requirements: We may disclose information if required by law or to protect our rights and safety.',
        'Business Transfers: Information may be transferred in connection with a merger, acquisition, or sale of assets.'
      ]
    },
    {
      id: 'security',
      title: 'Data Security',
      icon: FiLock,
      content: [
        'We implement appropriate technical and organizational security measures to protect your personal information.',
        'All data transmission is encrypted using industry-standard SSL/TLS protocols.',
        'Access to personal information is restricted to authorized personnel only.',
        'We regularly review and update our security practices to ensure ongoing protection.',
        'Despite our efforts, no method of transmission over the internet is 100% secure.'
      ]
    },
    {
      id: 'retention',
      title: 'Data Retention',
      icon: FiDatabase,
      content: [
        'We retain personal information only for as long as necessary to fulfill the purposes outlined in this policy.',
        'Account information is retained for the duration of your account and for a reasonable period thereafter.',
        'Email delivery logs are retained for up to 30 days for operational purposes.',
        'Billing information is retained as required by law and for tax purposes.',
        'You may request deletion of your personal information, subject to certain legal obligations.'
      ]
    },
    {
      id: 'rights',
      title: 'Your Privacy Rights',
      icon: FiEye,
      content: [
        'Access: You have the right to request access to your personal information.',
        'Correction: You can request correction of inaccurate or incomplete information.',
        'Deletion: You may request deletion of your personal information in certain circumstances.',
        'Portability: You have the right to receive your data in a portable format.',
        'Objection: You may object to certain processing of your personal information.',
        'Withdrawal: You can withdraw consent for processing based on consent at any time.'
      ]
    },
    {
      id: 'international',
      title: 'International Transfers',
      icon: FiHome,
      content: [
        'Your information may be transferred to and processed in countries other than your own.',
        'We ensure appropriate safeguards are in place for international data transfers.',
        'We comply with applicable data protection laws, including GDPR and CCPA.',
        'Standard contractual clauses and adequacy decisions are used where appropriate.'
      ]
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      icon: FiSettings,
      content: [
        'We use cookies and similar technologies to enhance your experience and analyze usage.',
        'Essential cookies are necessary for the operation of our service.',
        'Analytics cookies help us understand how you use our service.',
        'You can control cookie preferences through your browser settings.',
        'Please refer to our Cookie Policy for detailed information.'
      ]
    }
  ]

  const contactMethods = [
    {
      title: 'Data Protection Officer',
      icon: FiMail,
      details: ['Email: dpo@emailinfra.com', 'Response time: 48 hours']
    },
    {
      title: 'Privacy Requests',
      icon: FiDownload,
      details: ['Email: privacy@emailinfra.com', 'Include: Account details and request type']
    },
    {
      title: 'Data Deletion',
      icon: FiTrash2,
      details: ['Email: deletion@emailinfra.com', 'Processing time: 30 days']
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
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
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

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Privacy Contact Information
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <method.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  {method.title}
                </h4>
                <div className="space-y-1 text-sm text-gray-600">
                  {method.details.map((detail, dIndex) => (
                    <p key={dIndex}>{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16 bg-blue-50 rounded-xl p-8 text-center"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Questions About This Policy?
          </h3>
          <p className="text-gray-600 mb-6">
            If you have any questions about this Privacy Policy, please don't hesitate to contact us.
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Email: privacy@emailinfra.com</p>
            <p>Address: 123 Tech Street, San Francisco, CA 94105</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
