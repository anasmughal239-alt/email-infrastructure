'use client'

import { motion } from 'framer-motion'
import { 
  FiCode, 
  FiKey, 
  FiSend, 
  FiMail, 
  FiUsers, 
  FiSettings,
  FiCopy,
  FiExternalLink,
  FiBook,
  FiZap,
  FiShield
} from 'react-icons/fi'
import { useState } from 'react'

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('getting-started')
  const [copiedCode, setCopiedCode] = useState('')

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: FiZap },
    { id: 'authentication', title: 'Authentication', icon: FiKey },
    { id: 'sending-emails', title: 'Sending Emails', icon: FiSend },
    { id: 'managing-domains', title: 'Managing Domains', icon: FiSettings },
    { id: 'webhooks', title: 'Webhooks', icon: FiCode },
    { id: 'rate-limits', title: 'Rate Limits', icon: FiShield }
  ]

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(''), 2000)
  }

  const CodeBlock = ({ code, language, id }: { code: string, language: string, id: string }) => (
    <div className="relative bg-gray-900 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-400 text-sm">{language}</span>
        <button
          onClick={() => copyToClipboard(code, id)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {copiedCode === id ? (
            <span className="text-green-400 text-sm">Copied!</span>
          ) : (
            <FiCopy className="w-4 h-4" />
          )}
        </button>
      </div>
      <pre className="text-gray-100 text-sm overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <FiBook className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900">API Documentation</h1>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl">
              Complete guide to integrating with EmailInfra's powerful email infrastructure API. 
              Send emails, manage domains, and track deliverability with ease.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-64 flex-shrink-0"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Documentation</h3>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {section.title}
                    </button>
                  )
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              
              {/* Getting Started */}
              {activeSection === 'getting-started' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Getting Started</h2>
                  
                  <div className="prose max-w-none">
                    <p className="text-lg text-gray-600 mb-6">
                      Welcome to EmailInfra API! This guide will help you get started with sending emails, 
                      managing domains, and tracking deliverability through our RESTful API.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Base URL</h3>
                    <CodeBlock 
                      code="https://api.emailinfra.com/v1" 
                      language="URL" 
                      id="base-url"
                    />

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Start</h3>
                    <p className="text-gray-600 mb-4">
                      Here's a simple example to send your first email:
                    </p>
                    
                    <CodeBlock 
                      code={`curl -X POST https://api.emailinfra.com/v1/emails \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": "hello@yourdomain.com",
    "to": ["recipient@example.com"],
    "subject": "Hello from EmailInfra!",
    "html": "<h1>Welcome!</h1><p>This is your first email.</p>"
  }'`}
                      language="bash"
                      id="quick-start"
                    />

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <FiZap className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-900 mb-1">Pro Tip</h4>
                          <p className="text-blue-800 text-sm">
                            Make sure to verify your domain before sending emails to ensure optimal deliverability.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Authentication */}
              {activeSection === 'authentication' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Authentication</h2>
                  
                  <div className="prose max-w-none">
                    <p className="text-lg text-gray-600 mb-6">
                      EmailInfra uses API keys to authenticate requests. You can manage your API keys in your dashboard.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">API Key Authentication</h3>
                    <p className="text-gray-600 mb-4">
                      Include your API key in the Authorization header:
                    </p>
                    
                    <CodeBlock 
                      code="Authorization: Bearer sk_live_1234567890abcdef" 
                      language="HTTP Header" 
                      id="auth-header"
                    />

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Example Request</h3>
                    <CodeBlock 
                      code={`const response = await fetch('https://api.emailinfra.com/v1/emails', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_1234567890abcdef',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    from: 'hello@yourdomain.com',
    to: ['recipient@example.com'],
    subject: 'Test Email',
    html: '<p>Hello World!</p>'
  })
});`}
                      language="JavaScript"
                      id="auth-example"
                    />

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <FiShield className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-red-900 mb-1">Security Note</h4>
                          <p className="text-red-800 text-sm">
                            Never expose your API keys in client-side code. Always use them on your server.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sending Emails */}
              {activeSection === 'sending-emails' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Sending Emails</h2>
                  
                  <div className="prose max-w-none">
                    <p className="text-lg text-gray-600 mb-6">
                      Send transactional and marketing emails with our powerful email API.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Send Email Endpoint</h3>
                    <CodeBlock 
                      code="POST /v1/emails" 
                      language="HTTP" 
                      id="send-endpoint"
                    />

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Request Body</h3>
                    <CodeBlock 
                      code={`{
  "from": "sender@yourdomain.com",
  "to": ["recipient1@example.com", "recipient2@example.com"],
  "cc": ["cc@example.com"],
  "bcc": ["bcc@example.com"],
  "subject": "Your email subject",
  "text": "Plain text version of your email",
  "html": "<h1>HTML version</h1><p>Your email content</p>",
  "attachments": [
    {
      "filename": "document.pdf",
      "content": "base64-encoded-content",
      "contentType": "application/pdf"
    }
  ],
  "tags": ["newsletter", "marketing"],
  "metadata": {
    "campaign_id": "camp_123",
    "user_id": "user_456"
  }
}`}
                      language="JSON"
                      id="send-body"
                    />

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Response</h3>
                    <CodeBlock 
                      code={`{
  "id": "email_1234567890",
  "status": "queued",
  "message": "Email queued for delivery",
  "created_at": "2024-01-15T10:30:00Z"
}`}
                      language="JSON"
                      id="send-response"
                    />
                  </div>
                </div>
              )}

              {/* Managing Domains */}
              {activeSection === 'managing-domains' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Managing Domains</h2>
                  
                  <div className="prose max-w-none">
                    <p className="text-lg text-gray-600 mb-6">
                      Manage your sending domains and verify them for optimal deliverability.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Add Domain</h3>
                    <CodeBlock 
                      code={`POST /v1/domains

{
  "domain": "yourdomain.com",
  "dkim_enabled": true,
  "tracking_enabled": true
}`}
                      language="HTTP"
                      id="add-domain"
                    />

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Verify Domain</h3>
                    <CodeBlock 
                      code="POST /v1/domains/yourdomain.com/verify" 
                      language="HTTP" 
                      id="verify-domain"
                    />

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">List Domains</h3>
                    <CodeBlock 
                      code={`GET /v1/domains

Response:
{
  "domains": [
    {
      "domain": "yourdomain.com",
      "status": "verified",
      "dkim_verified": true,
      "spf_verified": true,
      "dmarc_verified": true,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}`}
                      language="HTTP"
                      id="list-domains"
                    />
                  </div>
                </div>
              )}

              {/* Webhooks */}
              {activeSection === 'webhooks' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Webhooks</h2>
                  
                  <div className="prose max-w-none">
                    <p className="text-lg text-gray-600 mb-6">
                      Receive real-time notifications about email events like deliveries, opens, clicks, and bounces.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Webhook Events</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {[
                        { event: 'email.delivered', description: 'Email was successfully delivered' },
                        { event: 'email.opened', description: 'Recipient opened the email' },
                        { event: 'email.clicked', description: 'Recipient clicked a link' },
                        { event: 'email.bounced', description: 'Email bounced' },
                        { event: 'email.complained', description: 'Recipient marked as spam' },
                        { event: 'email.unsubscribed', description: 'Recipient unsubscribed' }
                      ].map((item) => (
                        <div key={item.event} className="bg-gray-50 p-4 rounded-lg">
                          <code className="text-blue-600 font-medium">{item.event}</code>
                          <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Webhook Payload Example</h3>
                    <CodeBlock 
                      code={`{
  "event": "email.delivered",
  "timestamp": "2024-01-15T10:30:00Z",
  "email_id": "email_1234567890",
  "recipient": "recipient@example.com",
  "data": {
    "subject": "Your email subject",
    "tags": ["newsletter"],
    "metadata": {
      "campaign_id": "camp_123"
    }
  }
}`}
                      language="JSON"
                      id="webhook-payload"
                    />
                  </div>
                </div>
              )}

              {/* Rate Limits */}
              {activeSection === 'rate-limits' && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Rate Limits</h2>
                  
                  <div className="prose max-w-none">
                    <p className="text-lg text-gray-600 mb-6">
                      Understanding API rate limits and best practices for high-volume sending.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Rate Limit Headers</h3>
                    <CodeBlock 
                      code={`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642248000`}
                      language="HTTP Headers"
                      id="rate-headers"
                    />

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Rate Limits by Plan</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 mb-6">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requests/Hour</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Emails/Day</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Starter</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1,000</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10,000</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Professional</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5,000</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">100,000</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Enterprise</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Unlimited</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Unlimited</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <FiZap className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-900 mb-1">Best Practice</h4>
                          <p className="text-yellow-800 text-sm">
                            Implement exponential backoff when you receive rate limit errors (HTTP 429).
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}