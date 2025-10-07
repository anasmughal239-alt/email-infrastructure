'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiPlus, 
  FiSearch, 
  FiMoreVertical, 
  FiEdit, 
  FiTrash2, 
  FiCopy,
  FiCheck,
  FiX,
  FiActivity,
  FiClock,
  FiCheckCircle,
  FiAlertTriangle,
  FiSettings,
  FiPause,
  FiPlay,
  FiLoader
} from 'react-icons/fi';

interface Mailbox {
  id: string;
  email: string;
  domain: string;
  status: string;
  statusColor: string;
  statusBg: string;
  warmupProgress: number;
  warmupDays: number;
  created: string;
  lastActivity: string;
  dailyLimit: number;
  sentToday: number;
  reputation: string;
  reputationScore: number;
}

const statusIcons = {
  'Active': FiCheckCircle,
  'Warming': FiClock,
  'Paused': FiPause,
  'Issues': FiAlertTriangle
};

export default function MailboxesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [mailboxes, setMailboxes] = useState<Mailbox[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMailbox, setSelectedMailbox] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('All');

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Fetch mailboxes data
  useEffect(() => {
    const fetchMailboxes = async () => {
      if (status !== 'authenticated') return;
      
      try {
        setLoading(true);
        const response = await fetch('/api/mailboxes');
        
        if (!response.ok) {
          throw new Error('Failed to fetch mailboxes');
        }
        
        const data = await response.json();
        setMailboxes(data.mailboxes || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMailboxes();
  }, [status]);

  const filteredMailboxes = mailboxes.filter(mailbox => {
    const matchesSearch = mailbox.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mailbox.domain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || mailbox.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: mailboxes.length,
    active: mailboxes.filter(m => m.status === 'Active').length,
    warming: mailboxes.filter(m => m.status === 'Warming').length,
    totalSentToday: mailboxes.reduce((sum, m) => sum + m.sentToday, 0)
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <FiLoader className="w-6 h-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading mailboxes...</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <FiAlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">Error Loading Mailboxes</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mailboxes</h1>
          <p className="text-muted-foreground mt-2">
            Manage your email accounts and monitor their warming progress.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" />
          Add Mailbox
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-lg border border-border p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Mailboxes</p>
              <p className="text-3xl font-bold text-foreground">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <FiMail className="w-6 h-6 text-white" />
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
              <p className="text-sm font-medium text-muted-foreground">Active</p>
              <p className="text-3xl font-bold text-foreground">{stats.active}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <FiCheckCircle className="w-6 h-6 text-white" />
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
              <p className="text-sm font-medium text-muted-foreground">Warming</p>
              <p className="text-3xl font-bold text-foreground">{stats.warming}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <FiClock className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-card rounded-lg border border-border p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Sent Today</p>
              <p className="text-3xl font-bold text-foreground">{stats.totalSentToday}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <FiActivity className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search mailboxes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary w-64"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {['All', 'Active', 'Warming', 'Paused', 'Issues'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                filterStatus === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Mailboxes List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-card rounded-lg border border-border"
      >
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Your Mailboxes</h2>
        </div>
        <div className="divide-y divide-border">
          {filteredMailboxes.map((mailbox, index) => {
            const StatusIcon = statusIcons[mailbox.status as keyof typeof statusIcons];
            return (
              <motion.div
                key={mailbox.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="p-6 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <FiMail className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{mailbox.email}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <div className="flex items-center space-x-2">
                          <StatusIcon className={`w-4 h-4 ${mailbox.statusColor}`} />
                          <span className={`text-sm font-medium ${mailbox.statusColor}`}>
                            {mailbox.status}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {mailbox.domain}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Added {mailbox.created}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    {/* Warmup Progress */}
                    {mailbox.status === 'Warming' && (
                      <div className="text-center">
                        <div className="w-16 h-16 relative">
                          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className="text-muted"
                            />
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeDasharray={`${mailbox.warmupProgress}, 100`}
                              className="text-blue-500"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-medium text-foreground">
                              {mailbox.warmupProgress}%
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Day {mailbox.warmupDays}/30
                        </p>
                      </div>
                    )}

                    {/* Daily Stats */}
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Today</p>
                      <p className="text-lg font-semibold text-foreground">
                        {mailbox.sentToday}/{mailbox.dailyLimit}
                      </p>
                      <div className="w-20 bg-muted rounded-full h-1 mt-1">
                        <div 
                          className="bg-primary h-1 rounded-full transition-all duration-500"
                          style={{ width: `${(mailbox.sentToday / mailbox.dailyLimit) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Reputation */}
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Reputation</p>
                      <p className="text-sm font-medium text-foreground">{mailbox.reputation}</p>
                      <p className="text-xs text-muted-foreground">{mailbox.reputationScore}/100</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                        <FiSettings className="w-4 h-4" />
                      </button>
                      {mailbox.status === 'Paused' ? (
                        <button className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                          <FiPlay className="w-4 h-4" />
                        </button>
                      ) : (
                        <button className="p-2 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-lg transition-colors">
                          <FiPause className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                        onClick={() => setSelectedMailbox(selectedMailbox === mailbox.id ? null : mailbox.id)}
                      >
                        <FiMoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedMailbox === mailbox.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-border"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Account Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Email:</span>
                            <span className="text-foreground">{mailbox.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Domain:</span>
                            <span className="text-foreground">{mailbox.domain}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Created:</span>
                            <span className="text-foreground">{mailbox.created}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Last Activity:</span>
                            <span className="text-foreground">{mailbox.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Sending Limits</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Daily Limit:</span>
                            <span className="text-foreground">{mailbox.dailyLimit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Sent Today:</span>
                            <span className="text-foreground">{mailbox.sentToday}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Remaining:</span>
                            <span className="text-foreground">{mailbox.dailyLimit - mailbox.sentToday}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground mb-3">Quick Actions</h4>
                        <div className="space-y-2">
                          <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-muted rounded border border-border transition-colors">
                            <FiCopy className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">Copy Email</span>
                          </button>
                          <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-muted rounded border border-border transition-colors">
                            <FiEdit className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-foreground">Edit Settings</span>
                          </button>
                          <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-border transition-colors text-red-600">
                            <FiTrash2 className="w-4 h-4" />
                            <span className="text-sm">Remove Mailbox</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Add Mailbox Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-lg border border-border p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Add New Mailbox</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Domain
                </label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>example.com</option>
                  <option>mycompany.io</option>
                  <option>startup.co</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Daily Sending Limit
                </label>
                <input
                  type="number"
                  placeholder="50"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Add Mailbox
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}