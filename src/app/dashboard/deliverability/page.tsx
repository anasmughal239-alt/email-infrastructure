'use client';

import { motion } from 'framer-motion';
import { FiAlertTriangle, FiCheckCircle, FiMail } from 'react-icons/fi';

export default function DeliverabilityPage() {
  const deliverabilityScore = 87;
  const inboxPlacement = 82;
  const spamRate = 3.2;
  const bounceRate = 1.8;

  const placementData = [
    { provider: 'Gmail', inbox: 85, spam: 12, missing: 3 },
    { provider: 'Outlook', inbox: 78, spam: 18, missing: 4 },
    { provider: 'Yahoo', inbox: 82, spam: 15, missing: 3 },
    { provider: 'Apple Mail', inbox: 88, spam: 10, missing: 2 },
  ];

  const recentTests = [
    { id: 1, date: '2024-01-15', score: 89, status: 'Good' },
    { id: 2, date: '2024-01-14', score: 85, status: 'Good' },
    { id: 3, date: '2024-01-13', score: 91, status: 'Excellent' },
    { id: 4, date: '2024-01-12', score: 83, status: 'Good' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Deliverability</h1>
        <p className="text-muted-foreground mt-2">
          Monitor your email deliverability performance and inbox placement rates
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-lg border border-border p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Deliverability Score</p>
              <p className="text-3xl font-bold text-foreground">{deliverabilityScore}%</p>
            </div>
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <FiMail className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${deliverabilityScore}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card rounded-lg border border-border p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Inbox Placement</p>
              <p className="text-3xl font-bold text-foreground">{inboxPlacement}%</p>
            </div>
            <FiMail className="w-12 h-12 text-gray-600 dark:text-gray-400" />
          </div>
          <div className="mt-4">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${inboxPlacement}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card rounded-lg border border-border p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Spam Rate</p>
              <p className="text-3xl font-bold text-foreground">{spamRate}%</p>
            </div>
            <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
              <FiAlertTriangle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {spamRate < 5 ? 'Good' : 'Needs attention'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card rounded-lg border border-border p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Bounce Rate</p>
              <p className="text-3xl font-bold text-foreground">{bounceRate}%</p>
            </div>
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <FiMail className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {bounceRate < 3 ? 'Excellent' : 'Good'}
          </p>
        </motion.div>
      </div>

      {/* Inbox Placement by Provider */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-card rounded-lg border border-border p-6"
      >
        <h2 className="text-xl font-semibold text-foreground mb-6">Inbox Placement by Provider</h2>
        <div className="space-y-4">
          {placementData.map((provider, index) => (
            <div key={provider.provider} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground">{provider.provider}</span>
                <span className="text-sm text-muted-foreground">{provider.inbox}% inbox</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3 flex overflow-hidden">
                <div 
                  className="bg-green-500 transition-all duration-500"
                  style={{ width: `${provider.inbox}%` }}
                ></div>
                <div 
                  className="bg-red-500 transition-all duration-500"
                  style={{ width: `${provider.spam}%` }}
                ></div>
                <div 
                  className="bg-gray-400 transition-all duration-500"
                  style={{ width: `${provider.missing}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Inbox: {provider.inbox}%</span>
                <span>Spam: {provider.spam}%</span>
                <span>Missing: {provider.missing}%</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Tests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-card rounded-lg border border-border p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-foreground">Recent Deliverability Tests</h2>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            Run New Test
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Score</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentTests.map((test) => (
                <tr key={test.id} className="border-b border-border">
                  <td className="py-3 px-4 text-foreground">{test.date}</td>
                  <td className="py-3 px-4 text-foreground font-medium">{test.score}%</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      test.status === 'Excellent' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                    }`}>
                      {test.status === 'Excellent' ? (
                        <FiCheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <FiMail className="w-3 h-3 mr-1" />
                      )}
                      {test.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
