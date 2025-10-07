'use client'

import { motion } from 'framer-motion'
import { 
  FiUser, 
  FiKey, 
  FiUsers, 
  FiSave, 
  FiCopy, 
  FiRefreshCw, 
  FiEye, 
  FiEyeOff,
  FiPlus,
  FiTrash2,
  FiEdit3,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBuilding
} from 'react-icons/fi'
import { useState } from 'react'

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'api', label: 'API Keys', icon: FiKey },
    { id: 'team', label: 'Team', icon: FiUsers }
  ]

  const teamMembers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@company.com',
      role: 'Admin',
      avatar: 'JD',
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah@company.com',
      role: 'Member',
      avatar: 'SW',
      lastActive: '1 day ago'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@company.com',
      role: 'Member',
      avatar: 'MJ',
      lastActive: '3 days ago'
    }
  ]

  const apiKeys = [
    {
      id: 1,
      name: 'Production API Key',
      key: 'sk_live_1234567890abcdef',
      created: '2024-01-15',
      lastUsed: '2 hours ago',
      permissions: ['read', 'write']
    },
    {
      id: 2,
      name: 'Development API Key',
      key: 'sk_test_abcdef1234567890',
      created: '2024-01-10',
      lastUsed: '1 day ago',
      permissions: ['read']
    }
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiUser className="inline w-4 h-4 mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiMail className="inline w-4 h-4 mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="john@company.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiPhone className="inline w-4 h-4 mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiBuilding className="inline w-4 h-4 mr-1" />
                    Company
                  </label>
                  <input
                    type="text"
                    defaultValue="Acme Corp"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FiMapPin className="inline w-4 h-4 mr-1" />
                    Address
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="123 Main St, Suite 100&#10;San Francisco, CA 94105&#10;United States"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
                  <FiSave className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* API Keys Tab */}
        {activeTab === 'api' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">API Keys</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
                  <FiPlus className="w-4 h-4" />
                  Create New Key
                </button>
              </div>

              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{apiKey.name}</h3>
                        <p className="text-sm text-gray-500">Created on {apiKey.created}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <FiEdit3 className="w-4 h-4" />
                        </button>
                        <button className="text-red-400 hover:text-red-600">
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex-1 bg-gray-50 px-3 py-2 rounded border font-mono text-sm">
                        {showApiKey ? apiKey.key : '••••••••••••••••••••••••••••••••'}
                      </div>
                      <button
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        {showApiKey ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => copyToClipboard(apiKey.key)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <FiCopy className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Last used: {apiKey.lastUsed}</span>
                      <div className="flex gap-1">
                        {apiKey.permissions.map((permission) => (
                          <span
                            key={permission}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
                  <FiPlus className="w-4 h-4" />
                  Invite Member
                </button>
              </div>

              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-medium">
                        {member.avatar}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          member.role === 'Admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {member.role}
                        </span>
                        <p className="text-sm text-gray-500 mt-1">Last active: {member.lastActive}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="text-gray-400 hover:text-gray-600">
                          <FiEdit3 className="w-4 h-4" />
                        </button>
                        {member.role !== 'Admin' && (
                          <button className="text-red-400 hover:text-red-600">
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Workspace Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Workspace Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workspace Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Acme Corp Workspace"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workspace URL
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      https://app.emailinfra.com/
                    </span>
                    <input
                      type="text"
                      defaultValue="acme-corp"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2">
                    <FiSave className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}