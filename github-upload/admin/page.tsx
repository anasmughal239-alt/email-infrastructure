'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiUsers, FiStar, FiLogOut, FiRefreshCw, FiMail, FiCalendar, FiSettings, FiCheck, FiX, FiClock, FiAlertTriangle } from 'react-icons/fi'

interface User {
  id: string
  email: string
  name?: string
  role: string
  subscriptionStatus: string
  createdAt: string
  updatedAt: string
}

interface SetupRequest {
  id: string
  userId: string
  emailProvider: string
  status: string
  createdAt: string
  updatedAt: string
  completedAt?: string
  user: {
    id: string
    email: string
    name?: string
  }
  domains: Array<{
    id: string
    domain: string
    status: string
    isProvided: boolean
  }>
  mailboxes: Array<{
    id: string
    address: string
    status: string
  }>
  domainsCount: number
  mailboxesCount: number
  activeDomains: number
  activeMailboxes: number
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [setupRequests, setSetupRequests] = useState<SetupRequest[]>([])
  const [activeTab, setActiveTab] = useState<'users' | 'setup-requests'>('users')
  const [loading, setLoading] = useState(true)
  const [setupRequestsLoading, setSetupRequestsLoading] = useState(false)
  const [error, setError] = useState('')
  const [setupRequestsError, setSetupRequestsError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (session && session.user.role !== 'ADMIN') {
      router.push('/dashboard')
      return
    }

    if (session && session.user.role === 'ADMIN') {
      fetchUsers()
    }
  }, [status, session, router])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/users')
      
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }

      const data = await response.json()
      setUsers(data.users)
    } catch (error) {
      setError('Failed to load users')
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSetupRequests = async () => {
    try {
      setSetupRequestsLoading(true)
      setSetupRequestsError('')
      const response = await fetch('/api/admin/setup-requests')
      
      if (!response.ok) {
        throw new Error('Failed to fetch setup requests')
      }

      const data = await response.json()
      setSetupRequests(data.setupRequests)
    } catch (error) {
      setSetupRequestsError('Failed to load setup requests')
      console.error('Error fetching setup requests:', error)
    } finally {
      setSetupRequestsLoading(false)
    }
  }

  const updateSetupRequestStatus = async (setupRequestId: string, status: string) => {
    try {
      const response = await fetch('/api/admin/setup-requests', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ setupRequestId, status }),
      })

      if (!response.ok) {
        throw new Error('Failed to update setup request')
      }

      // Refresh the setup requests list
      await fetchSetupRequests()
    } catch (error) {
      console.error('Error updating setup request:', error)
      setSetupRequestsError('Failed to update setup request')
    }
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      FREE: 'bg-gray-100 text-gray-800',
      PREMIUM: 'bg-blue-100 text-blue-800',
      ENTERPRISE: 'bg-purple-100 text-purple-800',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getRoleBadge = (role: string) => {
    const colors = {
      USER: 'bg-green-100 text-green-800',
      ADMIN: 'bg-red-100 text-red-800',
    }
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getSetupStatusBadge = (status: string) => {
    const colors = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      IN_PROGRESS: 'bg-blue-100 text-blue-800',
      COMPLETED: 'bg-green-100 text-green-800',
      FAILED: 'bg-red-100 text-red-800',
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getSetupStatusIcon = (status: string) => {
    const icons = {
      PENDING: FiClock,
      IN_PROGRESS: FiRefreshCw,
      COMPLETED: FiCheck,
      FAILED: FiX,
    }
    return icons[status as keyof typeof icons] || FiClock
  }

  const getProviderBadge = (provider: string) => {
    const colors = {
      GOOGLE_WORKSPACE: 'bg-blue-100 text-blue-800',
      MICROSOFT_OUTLOOK: 'bg-orange-100 text-orange-800',
    }
    return colors[provider as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <FiStar className="text-yellow-500 text-xl" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                User Dashboard
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">{session.user.name || session.user.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiLogOut />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <FiUsers className="text-blue-600 text-2xl mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <FiSettings className="text-purple-600 text-2xl mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Setup Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{setupRequests.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <FiCheck className="text-green-600 text-2xl mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {setupRequests.filter(req => req.status === 'COMPLETED').length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <FiClock className="text-yellow-600 text-2xl mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {setupRequests.filter(req => req.status === 'PENDING').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('users')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'users'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <FiUsers />
                    <span>Users</span>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('setup-requests')
                    if (setupRequests.length === 0) {
                      fetchSetupRequests()
                    }
                  }}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'setup-requests'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <FiSettings />
                    <span>Setup Requests</span>
                  </div>
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'users' && (
              <>
                {/* Users Table Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">All Users</h2>
                    <button
                      onClick={fetchUsers}
                      disabled={loading}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      <FiRefreshCw className={loading ? 'animate-spin' : ''} />
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="px-6 py-4 bg-red-50 border-b border-red-200">
                    <p className="text-red-600">{error}</p>
                  </div>
                )}

                {loading ? (
                  <div className="px-6 py-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-500 mt-2">Loading users...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subscription
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {user.name || 'No name'}
                                </div>
                                <div className="text-sm text-gray-500">{user.email}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadge(user.role)}`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(user.subscriptionStatus)}`}>
                                {user.subscriptionStatus}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <div className="flex items-center">
                                <FiCalendar className="mr-1" />
                                {formatDate(user.createdAt)}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {!loading && users.length === 0 && (
                  <div className="px-6 py-8 text-center">
                    <p className="text-gray-500">No users found</p>
                  </div>
                )}
              </>
            )}

            {activeTab === 'setup-requests' && (
              <>
                {/* Setup Requests Table Header */}
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Setup Requests</h2>
                    <button
                      onClick={fetchSetupRequests}
                      disabled={setupRequestsLoading}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      <FiRefreshCw className={setupRequestsLoading ? 'animate-spin' : ''} />
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>

                {setupRequestsError && (
                  <div className="px-6 py-4 bg-red-50 border-b border-red-200">
                    <p className="text-red-600">{setupRequestsError}</p>
                  </div>
                )}

                {setupRequestsLoading ? (
                  <div className="px-6 py-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-500 mt-2">Loading setup requests...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Provider
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Domains/Mailboxes
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {setupRequests.map((request) => {
                          const StatusIcon = getSetupStatusIcon(request.status)
                          return (
                            <tr key={request.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">
                                    {request.user.name || 'No name'}
                                  </div>
                                  <div className="text-sm text-gray-500">{request.user.email}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getProviderBadge(request.emailProvider)}`}>
                                  {request.emailProvider.replace('_', ' ')}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <StatusIcon className="mr-2 text-sm" />
                                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSetupStatusBadge(request.status)}`}>
                                    {request.status}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div>
                                  <div>{request.domainsCount} domains ({request.activeDomains} active)</div>
                                  <div>{request.mailboxesCount} mailboxes ({request.activeMailboxes} active)</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center">
                                  <FiCalendar className="mr-1" />
                                  {formatDate(request.createdAt)}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex space-x-2">
                                  {request.status === 'PENDING' && (
                                    <button
                                      onClick={() => updateSetupRequestStatus(request.id, 'IN_PROGRESS')}
                                      className="text-blue-600 hover:text-blue-900"
                                    >
                                      Start
                                    </button>
                                  )}
                                  {request.status === 'IN_PROGRESS' && (
                                    <>
                                      <button
                                        onClick={() => updateSetupRequestStatus(request.id, 'COMPLETED')}
                                        className="text-green-600 hover:text-green-900"
                                      >
                                        Complete
                                      </button>
                                      <button
                                        onClick={() => updateSetupRequestStatus(request.id, 'FAILED')}
                                        className="text-red-600 hover:text-red-900"
                                      >
                                        Fail
                                      </button>
                                    </>
                                  )}
                                  {(request.status === 'COMPLETED' || request.status === 'FAILED') && (
                                    <button
                                      onClick={() => updateSetupRequestStatus(request.id, 'PENDING')}
                                      className="text-yellow-600 hover:text-yellow-900"
                                    >
                                      Reset
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {!setupRequestsLoading && setupRequests.length === 0 && (
                  <div className="px-6 py-8 text-center">
                    <p className="text-gray-500">No setup requests found</p>
                  </div>
                )}
              </>
            )}
          </div>


        </div>
      </main>
    </div>
  )
}