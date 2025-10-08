'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMail,
  FiUsers,
  FiHome,
  FiCheck
} from 'react-icons/fi';

const currentPlan = {
  name: 'Professional',
  price: 49,
  billingCycle: 'monthly',
  nextBillingDate: '2024-02-15',
  features: [
    'Up to 10 domains',
    '50 mailboxes',
    '10,000 emails/month',
    'Advanced deliverability',
    'Priority support',
    'API access'
  ],
  usage: {
    domains: { used: 7, limit: 10 },
    mailboxes: { used: 32, limit: 50 },
    emails: { used: 6420, limit: 10000 }
  }
};

const plans = [
  {
    name: 'Starter',
    price: 19,
    billingCycle: 'monthly',
    description: 'Perfect for small businesses getting started',
    features: [
      'Up to 3 domains',
      '10 mailboxes',
      '2,500 emails/month',
      'Basic deliverability',
      'Email support',
      'Dashboard access'
    ],
    popular: false,
    current: false
  },
  {
    name: 'Professional',
    price: 49,
    billingCycle: 'monthly',
    description: 'Ideal for growing businesses',
    features: [
      'Up to 10 domains',
      '50 mailboxes',
      '10,000 emails/month',
      'Advanced deliverability',
      'Priority support',
      'API access'
    ],
    popular: true,
    current: true
  },
  {
    name: 'Enterprise',
    price: 149,
    billingCycle: 'monthly',
    description: 'For large teams and high-volume sending',
    features: [
      'Unlimited domains',
      '200 mailboxes',
      '50,000 emails/month',
      'Premium deliverability',
      'Dedicated support',
      'Custom integrations'
    ],
    popular: false,
    current: false
  }
];

const invoices = [
  {
    id: 'INV-2024-001',
    date: '2024-01-15',
    amount: 49.00,
    status: 'paid',
    plan: 'Professional',
    period: 'Jan 15 - Feb 14, 2024'
  },
  {
    id: 'INV-2023-012',
    date: '2023-12-15',
    amount: 49.00,
    status: 'paid',
    plan: 'Professional',
    period: 'Dec 15, 2023 - Jan 14, 2024'
  },
  {
    id: 'INV-2023-011',
    date: '2023-11-15',
    amount: 49.00,
    status: 'paid',
    plan: 'Professional',
    period: 'Nov 15 - Dec 14, 2023'
  },
  {
    id: 'INV-2023-010',
    date: '2023-10-15',
    amount: 19.00,
    status: 'paid',
    plan: 'Starter',
    period: 'Oct 15 - Nov 14, 2023'
  }
];

export default function BillingPage() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const getUsagePercentage = (used: number, limit: number) => {
    return Math.min((used / limit) * 100, 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-500';
    if (percentage >= 75) return 'text-orange-500';
    return 'text-green-500';
  };

  const getUsageBgColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Billing & Plans</h1>
          <p className="text-muted-foreground mt-2">
            Manage your subscription, view invoices, and upgrade your plan.
          </p>
        </div>
        <button
          onClick={() => setShowUpgradeModal(true)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <FiMail className="w-4 h-4" />
          Upgrade Plan
        </button>
      </div>

      {/* Current Plan & Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-lg border border-border p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Current Plan</h2>
              <p className="text-muted-foreground">Your active subscription</p>
            </div>
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <FiUsers className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-foreground">{currentPlan.name}</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-foreground">${currentPlan.price}</span>
                <span className="text-muted-foreground">/{currentPlan.billingCycle}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <FiHome className="w-4 h-4" />
              <span>Next billing: {currentPlan.nextBillingDate}</span>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium text-foreground">Plan Features</h4>
              <div className="grid grid-cols-1 gap-2">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <FiCheck className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Usage Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-card rounded-lg border border-border p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Usage Overview</h2>
              <p className="text-muted-foreground">Current month usage</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <FiMail className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="space-y-6">
            {/* Domains Usage */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Domains</span>
                <span className="text-sm text-muted-foreground">
                  {currentPlan.usage.domains.used} / {currentPlan.usage.domains.limit}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getUsageBgColor(getUsagePercentage(currentPlan.usage.domains.used, currentPlan.usage.domains.limit))}`}
                  style={{ width: `${getUsagePercentage(currentPlan.usage.domains.used, currentPlan.usage.domains.limit)}%` }}
                ></div>
              </div>
            </div>

            {/* Mailboxes Usage */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Mailboxes</span>
                <span className="text-sm text-muted-foreground">
                  {currentPlan.usage.mailboxes.used} / {currentPlan.usage.mailboxes.limit}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getUsageBgColor(getUsagePercentage(currentPlan.usage.mailboxes.used, currentPlan.usage.mailboxes.limit))}`}
                  style={{ width: `${getUsagePercentage(currentPlan.usage.mailboxes.used, currentPlan.usage.mailboxes.limit)}%` }}
                ></div>
              </div>
            </div>

            {/* Emails Usage */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-foreground">Monthly Emails</span>
                <span className="text-sm text-muted-foreground">
                  {currentPlan.usage.emails.used.toLocaleString()} / {currentPlan.usage.emails.limit.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getUsageBgColor(getUsagePercentage(currentPlan.usage.emails.used, currentPlan.usage.emails.limit))}`}
                  style={{ width: `${getUsagePercentage(currentPlan.usage.emails.used, currentPlan.usage.emails.limit)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Available Plans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card rounded-lg border border-border p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Available Plans</h2>
            <p className="text-muted-foreground">Choose the plan that fits your needs</p>
          </div>
          <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                billingCycle === 'monthly'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                billingCycle === 'yearly'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className={`relative rounded-lg border p-6 transition-all duration-200 ${
                plan.current
                  ? 'border-primary bg-primary/5'
                  : plan.popular
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {plan.popular && !plan.current && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              {plan.current && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-3 py-1 text-xs font-medium rounded-full">
                    Current Plan
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-foreground">
                    ${billingCycle === 'yearly' ? Math.floor(plan.price * 0.8) : plan.price}
                  </span>
                  <span className="text-muted-foreground">/{billingCycle === 'yearly' ? 'year' : 'month'}</span>
                  {billingCycle === 'yearly' && (
                    <div className="text-sm text-green-600 font-medium">Save 20%</div>
                  )}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <FiCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => plan.current ? null : setShowUpgradeModal(true)}
                disabled={plan.current}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  plan.current
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : plan.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-background border border-border text-foreground hover:bg-muted'
                }`}
              >
                {plan.current ? 'Current Plan' : 'Upgrade'}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Invoice History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-card rounded-lg border border-border"
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Invoice History</h2>
              <p className="text-muted-foreground">Download and view your past invoices</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <FiMail className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-border">
          {invoices.map((invoice, index) => (
            <motion.div
              key={invoice.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="p-6 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <FiMail className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{invoice.id}</h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                      <span>{invoice.date}</span>
                      <span>•</span>
                      <span>{invoice.plan} Plan</span>
                      <span>•</span>
                      <span>{invoice.period}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${invoice.amount.toFixed(2)}</p>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600 capitalize">{invoice.status}</span>
                    </div>
                  </div>
                  
                  <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                    <FiCheck className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                    <FiHome className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-lg border border-border p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Upgrade Your Plan</h3>
            <p className="text-muted-foreground mb-6">
              Contact our sales team to upgrade your plan or discuss custom pricing for your needs.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <FiMail className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Email Sales</p>
                  <p className="text-sm text-muted-foreground">sales@emailinfra.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <FiUsers className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Schedule a Call</p>
                  <p className="text-sm text-muted-foreground">Book a demo with our team</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-6">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                Contact Sales
                <FiUsers className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
