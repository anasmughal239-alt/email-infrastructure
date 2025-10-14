'use client';

export const dynamic = 'force-dynamic'

import { motion } from 'framer-motion';
import { 
  FiMail,
  FiUsers,
  FiHome,
  FiCheck
} from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useSupabase } from '@/components/providers/supabase-provider';
import { useRouter } from 'next/navigation';

interface Domain {
  id: string;
  domain: string;
  status: 'PENDING' | 'VERIFIED' | 'ACTIVE' | 'FAILED';
  isProvided: boolean;
  createdAt: string;
  updatedAt: string;
}

const statusConfig = {
  PENDING: {
    label: 'Pending',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-900/20',
    icon: FiHome
  },
  VERIFIED: {
    label: 'Verified',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900/20',
    icon: FiCheck
  },
  ACTIVE: {
    label: 'Active',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900/20',
    icon: FiCheck
  },
  FAILED: {
    label: 'Failed',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-100 dark:bg-red-900/20',
    icon: FiMail
  }
};

export default function DomainsPage() {
  const { session } = useSupabase();
  const router = useRouter();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [newDomain, setNewDomain] = useState('');
  const [addingDomain, setAddingDomain] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!session) {
      router.push('/auth/signin');
    }
  }, [session, router]);

  // Fetch domains data
  useEffect(() => {
    if (session?.user?.email) {
      fetchDomains();
    }
  }, [session]);

  const fetchDomains = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/domains');
      
      if (!response.ok) {
        throw new Error('Failed to fetch domains');
      }
      
      const data = await response.json();
      setDomains(data.domains || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load domains');
    } finally {
      setLoading(false);
    }
  };

  const handleAddDomain = async () => {
    if (!newDomain.trim()) return;
    
    try {
      setAddingDomain(true);
      const response = await fetch('/api/domains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain: newDomain.trim(),
          isProvided: false
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add domain');
      }

      await fetchDomains(); // Refresh the list
      setNewDomain('');
      setShowAddModal(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add domain');
    } finally {
      setAddingDomain(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <FiUsers className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <FiMail className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Error Loading Domains</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <button
          onClick={fetchDomains}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const verifiedCount = domains.filter(d => d.status === 'VERIFIED' || d.status === 'ACTIVE').length;
  const pendingCount = domains.filter(d => d.status === 'PENDING').length;
  const failedCount = domains.filter(d => d.status === 'FAILED').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Domains</h1>
          <p className="text-muted-foreground mt-2">
            Manage your connected domains and their verification status.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <FiHome className="w-4 h-4" />
          Add Domain
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
              <p className="text-sm font-medium text-muted-foreground">Total Domains</p>
              <p className="text-3xl font-bold text-foreground">{domains.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <FiHome className="w-6 h-6 text-white" />
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
              <p className="text-sm font-medium text-muted-foreground">Verified</p>
              <p className="text-3xl font-bold text-foreground">{verifiedCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <FiCheck className="w-6 h-6 text-white" />
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
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <p className="text-3xl font-bold text-foreground">{pendingCount}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <FiHome className="w-6 h-6 text-white" />
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
              <p className="text-sm font-medium text-muted-foreground">Failed</p>
              <p className="text-3xl font-bold text-foreground">{failedCount}</p>
            </div>
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <FiMail className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Domains List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-card rounded-lg border border-border"
      >
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Your Domains</h2>
        </div>
        
        {domains.length === 0 ? (
          <div className="p-12 text-center">
            <FiHome className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No domains yet</h3>
            <p className="text-muted-foreground mb-6">
              Add your first domain to get started with email infrastructure.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto"
            >
              <FiUsers className="w-4 h-4" />
              Add Domain
            </button>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {domains.map((domain, index) => {
              const config = statusConfig[domain.status];
              const StatusIcon = config.icon;
              
              return (
                <motion.div
                  key={domain.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="p-6 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <FiHome className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-foreground text-lg">{domain.domain}</h3>
                          {domain.isProvided && (
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">
                              Provided
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-2">
                            <StatusIcon className={`w-4 h-4 ${config.color}`} />
                            <span className={`text-sm font-medium ${config.color}`}>
                              {config.label}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Added {new Date(domain.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button 
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                        onClick={() => fetchDomains()}
                        title="Refresh status"
                      >
                        <FiCheck className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                        <FiHome className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                        onClick={() => setSelectedDomain(selectedDomain === domain.id ? null : domain.id)}
                      >
                        <FiUsers className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {selectedDomain === domain.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-border"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-foreground mb-3">Domain Information</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Status:</span>
                              <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Type:</span>
                              <span className="text-sm text-foreground">
                                {domain.isProvided ? 'Provided by us' : 'Your domain'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Created:</span>
                              <span className="text-sm text-foreground">
                                {new Date(domain.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Last Updated:</span>
                              <span className="text-sm text-foreground">
                                {new Date(domain.updatedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-3">Quick Actions</h4>
                          <div className="space-y-2">
                            <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-muted rounded border border-border transition-colors">
                              <FiMail className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-foreground">Copy Domain</span>
                            </button>
                            <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-muted rounded border border-border transition-colors">
                              <FiUsers className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm text-foreground">View Setup Guide</span>
                            </button>
                            <button className="w-full flex items-center space-x-2 p-2 text-left hover:bg-red-50 dark:hover:bg-red-900/20 rounded border border-border transition-colors text-red-600">
                              <FiHome className="w-4 h-4" />
                              <span className="text-sm">Remove Domain</span>
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
        )}
      </motion.div>

      {/* Add Domain Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card rounded-lg border border-border p-6 w-full max-w-md mx-4"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">Add New Domain</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Domain Name
                </label>
                <input
                  type="text"
                  placeholder="example.com"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddDomain()}
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setNewDomain('');
                  }}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={addingDomain}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddDomain}
                  disabled={addingDomain || !newDomain.trim()}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {addingDomain && <FiCheck className="w-4 h-4 animate-spin" />}
                  Add Domain
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}