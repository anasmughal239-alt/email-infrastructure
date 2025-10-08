'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiArrowRight, FiCheckCircle, FiMail, FiPlay, FiSettings } from 'react-icons/fi';

export default function DemoClient() {
  const [activeDemo, setActiveDemo] = useState('setup');

  const demoSections = [
    {
      id: 'setup',
      title: 'Domain Setup',
      description: 'See how easy it is to configure your domain with automated DNS setup',
      icon: FiSettings,
      color: 'blue'
    },
    {
      id: 'mailboxes',
      title: 'Mailbox Management',
      description: 'Manage your email accounts and pre-warmed inboxes',
      icon: FiMail,
      color: 'green'
    },
    {
      id: 'analytics',
      title: 'Deliverability Analytics',
      description: 'Track your email performance with real-time insights',
      icon: FiMail,
      color: 'purple'
    }
  ];

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
            Experience <span className="text-primary">EmailInfra</span> Live
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Take a guided tour through our platform and see how easy it is to set up and manage your email infrastructure.
          </p>
          <motion.button 
            className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlay className="h-5 w-5" />
            Start Interactive Demo
          </motion.button>
        </motion.div>

        {/* Demo Navigation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {demoSections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveDemo(section.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  activeDemo === section.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <Icon className="h-6 w-6 mx-auto mb-2" />
                <div className="font-semibold text-sm">{section.title}</div>
              </button>
            );
          })}
        </motion.div>

        {/* Demo Content */}
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {activeDemo === 'setup' && (
            <div className="card p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FiSettings className="h-6 w-6 text-blue-500" />
                Automated Domain Setup
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Step-by-Step Process</h3>
                  <div className="space-y-4">
                    {[
                      'Enter your domain name',
                      'Automatic DNS record generation',
                      'One-click SPF, DKIM, DMARC setup',
                      'Real-time verification'
                    ].map((step, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <FiCheckCircle className="h-5 w-5 text-green-500" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <div className="text-sm text-muted-foreground mb-2">Demo Interface</div>
                  <div className="bg-white dark:bg-gray-900 rounded border p-4">
                    <div className="text-sm font-medium mb-2">Domain Configuration</div>
                    <div className="text-xs text-muted-foreground">yourdomain.com</div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>SPF Record</span>
                        <span className="text-green-500">✓ Configured</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>DKIM Signing</span>
                        <span className="text-green-500">✓ Active</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>DMARC Policy</span>
                        <span className="text-green-500">✓ Enabled</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeDemo === 'mailboxes' && (
            <div className="card p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FiMail className="h-6 w-6 text-green-500" />
                Mailbox Management
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Features</h3>
                  <div className="space-y-4">
                    {[
                      'Pre-warmed Google & Microsoft accounts',
                      'Instant mailbox provisioning',
                      'Reputation monitoring',
                      'Automated warmup sequences'
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <FiCheckCircle className="h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <div className="text-sm text-muted-foreground mb-2">Mailbox Dashboard</div>
                  <div className="space-y-3">
                    {[
                      { email: 'sales@yourdomain.com', status: 'Active', reputation: '98%' },
                      { email: 'support@yourdomain.com', status: 'Warming', reputation: '85%' },
                      { email: 'marketing@yourdomain.com', status: 'Ready', reputation: '92%' }
                    ].map((mailbox, index) => (
                      <div key={index} className="bg-white dark:bg-gray-900 rounded border p-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-medium">{mailbox.email}</span>
                          <span className={`px-2 py-1 rounded ${
                            mailbox.status === 'Active' ? 'bg-green-100 text-green-800' :
                            mailbox.status === 'Warming' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {mailbox.status}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Reputation: {mailbox.reputation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeDemo === 'analytics' && (
            <div className="card p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FiMail className="h-6 w-6 text-purple-500" />
                Deliverability Analytics
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Real-time Insights</h3>
                  <div className="space-y-4">
                    {[
                      'Delivery rate monitoring',
                      'Spam folder detection',
                      'Bounce rate analysis',
                      'Sender reputation tracking'
                    ].map((insight, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <FiCheckCircle className="h-5 w-5 text-green-500" />
                        <span>{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <div className="text-sm text-muted-foreground mb-2">Analytics Dashboard</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-900 rounded border p-3 text-center">
                      <div className="text-2xl font-bold text-green-500">98.5%</div>
                      <div className="text-xs text-muted-foreground">Delivery Rate</div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded border p-3 text-center">
                      <div className="text-2xl font-bold text-blue-500">1.2%</div>
                      <div className="text-xs text-muted-foreground">Bounce Rate</div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded border p-3 text-center">
                      <div className="text-2xl font-bold text-purple-500">95</div>
                      <div className="text-xs text-muted-foreground">Sender Score</div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded border p-3 text-center">
                      <div className="text-2xl font-bold text-orange-500">0.1%</div>
                      <div className="text-xs text-muted-foreground">Spam Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the full power of our platform with a free trial. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a 
              href="/auth/signup"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
              <FiArrowRight className="h-5 w-5" />
            </motion.a>
            <motion.a 
              href="/contact"
              className="btn-secondary text-lg px-8 py-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Demo Call
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
