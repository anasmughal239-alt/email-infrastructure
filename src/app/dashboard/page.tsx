'use client';

export const dynamic = 'force-dynamic';

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiHome, 
  FiArrowUp,
  FiArrowDown,
  FiMoreVertical,
  FiPlus,
  FiCheckCircle,
  FiClock,
  FiAlertTriangle
} from 'react-icons/fi';
import Link from 'next/link';

const stats = [
  {
    name: 'Active Domains',
    value: '5',
    change: '+2 this month',
    changeType: 'increase',
    icon: FiHome,
    color: 'bg-blue-500',
  },
  {
    name: 'Total Mailboxes',
    value: '24',
    change: '+6 this week',
    changeType: 'increase',
    icon: FiMail,
    color: 'bg-green-500',
  },
  {
    name: 'Deliverability Score',
    value: '87%',
    change: '+3% this week',
    changeType: 'increase',
    icon: FiMail,
    color: 'bg-purple-500',
  },
  {
    name: 'Emails Sent Today',
    value: '1,247',
    change: '+12% vs yesterday',
    changeType: 'increase',
    icon: FiMail,
    color: 'bg-orange-500',
  },
];

const recentDomains = [
  { name: 'example.com', status: 'Verified', lastCheck: '2 hours ago', statusColor: 'text-green-600' },
  { name: 'mycompany.io', status: 'Verified', lastCheck: '4 hours ago', statusColor: 'text-green-600' },
  { name: 'startup.co', status: 'Pending', lastCheck: '1 day ago', statusColor: 'text-orange-600' },
];

const recentMailboxes = [
  { email: 'john@example.com', status: 'Active', warmupProgress: 100, statusColor: 'text-green-600' },
  { email: 'sarah@mycompany.io', status: 'Warming', warmupProgress: 75, statusColor: 'text-blue-600' },
  { email: 'mike@startup.co', status: 'Warming', warmupProgress: 45, statusColor: 'text-blue-600' },
];

export default function DashboardPage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's an overview of your cold email infrastructure.
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/dashboard/domains"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <FiPlus className="w-4 h-4" />
            Add Domain
          </Link>
          <Link
            href="/dashboard/mailboxes"
            className="border border-border text-foreground px-4 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
          >
            <FiPlus className="w-4 h-4" />
            Add Mailbox
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-card rounded-lg border border-border p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.changeType === 'increase' ? (
                <FiArrowUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <FiArrowDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Domains */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-card rounded-lg border border-border p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">Recent Domains</h2>
            <Link 
              href="/dashboard/domains"
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentDomains.map((domain, index) => (
              <div key={domain.name} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <FiHome className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{domain.name}</p>
                    <p className="text-sm text-muted-foreground">Last check: {domain.lastCheck}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {domain.status === 'Verified' ? (
                    <FiCheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <FiClock className="w-4 h-4 text-orange-500" />
                  )}
                  <span className={`text-sm font-medium ${domain.statusColor}`}>
                    {domain.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Mailboxes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-card rounded-lg border border-border p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-foreground">Recent Mailboxes</h2>
            <Link 
              href="/dashboard/mailboxes"
              className="text-primary hover:text-primary/80 text-sm font-medium"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentMailboxes.map((mailbox, index) => (
              <div key={mailbox.email} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <FiMail className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{mailbox.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-sm font-medium ${mailbox.statusColor}`}>
                        {mailbox.status}
                      </span>
                      {mailbox.status === 'Warming' && (
                        <span className="text-xs text-muted-foreground">
                          ({mailbox.warmupProgress}% complete)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {mailbox.status === 'Warming' && (
                  <div className="w-16">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${mailbox.warmupProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Deliverability Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="bg-card rounded-lg border border-border p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-foreground">Deliverability Overview</h2>
          <Link 
            href="/dashboard/deliverability"
            className="text-primary hover:text-primary/80 text-sm font-medium"
          >
            View details
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <FiMail className="w-20 h-20 mx-auto text-gray-600 dark:text-gray-400 mb-3" />
            <p className="text-2xl font-bold text-foreground">87%</p>
            <p className="text-sm text-muted-foreground">Overall Score</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-3">
              <FiMail className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-2xl font-bold text-foreground">82%</p>
            <p className="text-sm text-muted-foreground">Inbox Placement</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mb-3">
              <FiAlertTriangle className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <p className="text-2xl font-bold text-foreground">3.2%</p>
            <p className="text-sm text-muted-foreground">Spam Rate</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}