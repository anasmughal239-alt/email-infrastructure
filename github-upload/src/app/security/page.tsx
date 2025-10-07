'use client'

import { motion } from 'framer-motion'
import { 
  FiShield, 
  FiLock,
  FiKey,
  FiEye,
  FiServer,
  FiDatabase,
  FiGlobe,
  FiUsers,
  FiCheckCircle,
  FiAlertTriangle,
  FiFileText,
  FiDownload,
  FiExternalLink,
  FiClock,
  FiActivity,
  FiZap,
  FiHeart,
  FiAward,
  FiTrendingUp,
  FiMonitor,
  FiWifi
} from 'react-icons/fi'
import Link from 'next/link'

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: FiLock,
      title: 'End-to-End Encryption',
      description: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption.',
      details: ['TLS 1.3 for data in transit', 'AES-256 encryption at rest', 'Perfect Forward Secrecy']
    },
    {
      icon: FiKey,
      title: 'API Key Management',
      description: 'Secure API key generation, rotation, and access control with granular permissions.',
      details: ['Automatic key rotation', 'Granular permissions', 'Rate limiting per key']
    },
    {
      icon: FiEye,
      title: 'Access Monitoring',
      description: 'Comprehensive logging and monitoring of all access attempts and API usage.',
      details: ['Real-time monitoring', 'Audit logs', 'Anomaly detection']
    },
    {
      icon: FiServer,
      title: 'Infrastructure Security',
      description: 'Multi-layered security with firewalls, intrusion detection, and regular security audits.',
      details: ['WAF protection', 'DDoS mitigation', 'Regular penetration testing']
    },
    {
      icon: FiDatabase,
      title: 'Data Protection',
      description: 'Advanced data protection with backup encryption, data residency controls, and GDPR compliance.',
      details: ['Encrypted backups', 'Data residency options', 'Right to be forgotten']
    },
    {
      icon: FiUsers,
      title: 'Identity & Access',
      description: 'Multi-factor authentication, SSO integration, and role-based access control.',
      details: ['MFA support', 'SSO integration', 'RBAC permissions']
    }
  ]

  const certifications = [
    {
      name: 'SOC 2 Type II',
      description: 'Security, availability, and confidentiality controls',
      status: 'certified',
      validUntil: '2024-12-31',
      logo: '🏆'
    },
    {
      name: 'ISO 27001',
      description: 'Information security management system',
      status: 'certified',
      validUntil: '2024-11-15',
      logo: '🔒'
    },
    {
      name: 'GDPR Compliant',
      description: 'European data protection regulation compliance',
      status: 'compliant',
      validUntil: 'ongoing',
      logo: '🇪🇺'
    },
    {
      name: 'CCPA Compliant',
      description: 'California Consumer Privacy Act compliance',
      status: 'compliant',
      validUntil: 'ongoing',
      logo: '🇺🇸'
    },
    {
      name: 'HIPAA Ready',
      description: 'Healthcare data protection standards',
      status: 'ready',
      validUntil: 'ongoing',
      logo: '🏥'
    },
    {
      name: 'PCI DSS',
      description: 'Payment card industry data security',
      status: 'in-progress',
      validUntil: '2024-06-30',
      logo: '💳'
    }
  ]

  const securityPractices = [
    {
      category: 'Development Security',
      practices: [
        'Secure code review process',
        'Automated security testing',
        'Dependency vulnerability scanning',
        'Static and dynamic analysis',
        'Security-focused development training'
      ]
    },
    {
      category: 'Infrastructure Security',
      practices: [
        'Zero-trust network architecture',
        'Regular security patches',
        'Intrusion detection systems',
        'Network segmentation',
        'Continuous vulnerability assessment'
      ]
    },
    {
      category: 'Data Security',
      practices: [
        'Data classification and labeling',
        'Encryption key management',
        'Secure data disposal',
        'Data loss prevention',
        'Regular backup testing'
      ]
    },
    {
      category: 'Operational Security',
      practices: [
        'Incident response procedures',
        'Security awareness training',
        'Background checks for staff',
        'Privileged access management',
        '24/7 security monitoring'
      ]
    }
  ]

  const securityMetrics = [
    {
      metric: 'Security Incidents',
      value: '0',
      period: 'Last 12 months',
      trend: 'stable',
      icon: FiShield
    },
    {
      metric: 'Uptime',
      value: '99.99%',
      period: 'Last 12 months',
      trend: 'up',
      icon: FiActivity
    },
    {
      metric: 'Response Time',
      value: '<1 hour',
      period: 'Security incidents',
      trend: 'stable',
      icon: FiClock
    },
    {
      metric: 'Compliance Score',
      value: '98%',
      period: 'Latest audit',
      trend: 'up',
      icon: FiAward
    }
  ]

  const securityResources = [
    {
      title: 'Security Whitepaper',
      description: 'Comprehensive overview of our security architecture and practices',
      type: 'PDF',
      size: '2.4 MB',
      icon: FiFileText
    },
    {
      title: 'SOC 2 Report',
      description: 'Latest SOC 2 Type II audit report',
      type: 'PDF',
      size: '1.8 MB',
      icon: FiFileText
    },
    {
      title: 'Penetration Test Results',
      description: 'Summary of latest third-party security assessment',
      type: 'PDF',
      size: '956 KB',
      icon: FiFileText
    },
    {
      title: 'Security Best Practices',
      description: 'Guide for implementing security best practices with our API',
      type: 'PDF',
      size: '1.2 MB',
      icon: FiFileText
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'certified':
      case 'compliant':
        return 'bg-green-100 text-green-800'
      case 'ready':
        return 'bg-blue-100 text-blue-800'
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
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
            <FiShield className="w-20 h-20 mx-auto mb-6 opacity-90" />
            <h1 className="text-5xl font-bold mb-6">
              Security & Compliance
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Your data security is our top priority. We implement industry-leading security practices 
              and maintain the highest compliance standards to protect your information.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                Download Security Overview
              </button>
              <Link 
                href="/contact" 
                className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors font-medium"
              >
                Contact Security Team
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Security Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Security at a Glance</h2>
            <p className="text-lg text-gray-600">Key security metrics and achievements</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityMetrics.map((metric, index) => {
              const Icon = metric.icon
              return (
                <motion.div
                  key={metric.metric}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                  <div className="text-sm font-medium text-gray-900 mb-1">{metric.metric}</div>
                  <div className="text-xs text-gray-500">{metric.period}</div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Security Features</h2>
            <p className="text-lg text-gray-600">Comprehensive protection for your data and communications</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{feature.description}</p>
                  <ul className="space-y-1">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <FiCheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Certifications & Compliance</h2>
            <p className="text-lg text-gray-600">Industry-recognized security and compliance standards</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{cert.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(cert.status)}`}>
                        {cert.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{cert.description}</p>
                    <p className="text-xs text-gray-500">Valid until: {cert.validUntil}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Practices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Security Practices</h2>
            <p className="text-lg text-gray-600">Our comprehensive approach to security</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {securityPractices.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-4">{category.category}</h3>
                <ul className="space-y-3">
                  {category.practices.map((practice, practiceIndex) => (
                    <li key={practiceIndex} className="flex items-start gap-3">
                      <FiCheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{practice}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Security Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Security Resources</h2>
            <p className="text-lg text-gray-600">Download our security documentation and reports</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityResources.map((resource, index) => {
              const Icon = resource.icon
              return (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{resource.type}</span>
                          <span>•</span>
                          <span>{resource.size}</span>
                        </div>
                        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                          <FiDownload className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Security Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white"
        >
          <FiAlertTriangle className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">Report a Security Issue</h2>
          <p className="text-xl mb-6 opacity-90">
            Found a security vulnerability? We take security seriously and appreciate responsible disclosure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:security@emailinfra.com" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Report Vulnerability
            </a>
            <Link 
              href="/help" 
              className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors font-medium"
            >
              Security FAQ
            </Link>
          </div>
          <div className="mt-6 text-sm opacity-75">
            <p>For general inquiries: <a href="mailto:security@emailinfra.com" className="underline">security@emailinfra.com</a></p>
            <p>PGP Key: <a href="#" className="underline">Download Public Key</a></p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}