'use client'

import { motion } from 'framer-motion'
import { 
  FiCheck, 
  FiAlertTriangle,
  FiX,
  FiClock,
  FiTrendingUp,
  FiActivity,
  FiServer,
  FiGlobe,
  FiMail,
  FiShield,
  FiDatabase,
  FiWifi,
  FiCalendar,
  FiExternalLink,
  FiRefreshCw,
  FiInfo,
  FiAlertCircle,
  FiCheckCircle
} from 'react-icons/fi'
import { useState } from 'react'

export default function StatusPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')

  const overallStatus = {
    status: 'operational',
    message: 'All systems operational',
    lastUpdated: '2024-01-15T10:30:00Z'
  }

  const services = [
    {
      name: 'Email API',
      status: 'operational',
      uptime: '99.98%',
      responseTime: '145ms',
      description: 'Core email sending and receiving API'
    },
    {
      name: 'SMTP Service',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '89ms',
      description: 'SMTP relay service for email delivery'
    },
    {
      name: 'Webhook Delivery',
      status: 'operational',
      uptime: '99.95%',
      responseTime: '234ms',
      description: 'Real-time webhook notifications'
    },
    {
      name: 'Dashboard',
      status: 'operational',
      uptime: '99.97%',
      responseTime: '312ms',
      description: 'Web dashboard and analytics'
    },
    {
      name: 'Authentication',
      status: 'operational',
      uptime: '99.99%',
      responseTime: '67ms',
      description: 'API key and user authentication'
    },
    {
      name: 'Analytics Engine',
      status: 'degraded',
      uptime: '99.89%',
      responseTime: '1.2s',
      description: 'Email analytics and reporting'
    }
  ]

  const metrics = [
    {
      name: 'API Requests',
      value: '2.4M',
      change: '+12%',
      trend: 'up',
      period: 'last 24h'
    },
    {
      name: 'Emails Delivered',
      value: '1.8M',
      change: '+8%',
      trend: 'up',
      period: 'last 24h'
    },
    {
      name: 'Average Response Time',
      value: '156ms',
      change: '-5%',
      trend: 'down',
      period: 'last 24h'
    },
    {
      name: 'Success Rate',
      value: '99.94%',
      change: '+0.02%',
      trend: 'up',
      period: 'last 24h'
    }
  ]

  const incidents = [
    {
      id: 1,
      title: 'Analytics Engine Performance Degradation',
      status: 'investigating',
      severity: 'minor',
      startTime: '2024-01-15T08:45:00Z',
      description: 'We are investigating reports of slower response times in our analytics engine.',
      updates: [
        {
          time: '2024-01-15T10:15:00Z',
          message: 'We have identified the root cause and are implementing a fix.',
          status: 'update'
        },
        {
          time: '2024-01-15T08:45:00Z',
          message: 'We are investigating reports of performance issues with the analytics engine.',
          status: 'investigating'
        }
      ]
    },
    {
      id: 2,
      title: 'Scheduled Maintenance - Database Optimization',
      status: 'completed',
      severity: 'maintenance',
      startTime: '2024-01-14T02:00:00Z',
      endTime: '2024-01-14T04:30:00Z',
      description: 'Scheduled maintenance to optimize database performance.',
      updates: [
        {
          time: '2024-01-14T04:30:00Z',
          message: 'Maintenance completed successfully. All services are fully operational.',
          status: 'resolved'
        },
        {
          time: '2024-01-14T02:00:00Z',
          message: 'Maintenance window started. Some services may experience brief interruptions.',
          status: 'maintenance'
        }
      ]
    },
    {
      id: 3,
      title: 'Brief API Outage - US East Region',
      status: 'resolved',
      severity: 'major',
      startTime: '2024-01-12T14:20:00Z',
      endTime: '2024-01-12T14:47:00Z',
      description: 'API requests in the US East region experienced failures due to a network issue.',
      updates: [
        {
          time: '2024-01-12T14:47:00Z',
          message: 'Issue resolved. All services are operating normally.',
          status: 'resolved'
        },
        {
          time: '2024-01-12T14:35:00Z',
          message: 'We have implemented a fix and are monitoring the situation.',
          status: 'monitoring'
        },
        {
          time: '2024-01-12T14:20:00Z',
          message: 'We are investigating reports of API failures in the US East region.',
          status: 'investigating'
        }
      ]
    }
  ]

  const uptimeData = [
    { date: '2024-01-09', uptime: 100 },
    { date: '2024-01-10', uptime: 99.95 },
    { date: '2024-01-11', uptime: 100 },
    { date: '2024-01-12', uptime: 99.89 },
    { date: '2024-01-13', uptime: 100 },
    { date: '2024-01-14', uptime: 99.92 },
    { date: '2024-01-15', uptime: 99.98 }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <FiCheck className="w-5 h-5 text-green-600" />
      case 'degraded':
        return <FiAlertTriangle className="w-5 h-5 text-yellow-600" />
      case 'outage':
        return <FiX className="w-5 h-5 text-red-600" />
      default:
        return <FiCheck className="w-5 h-5 text-green-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-600 bg-green-100'
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100'
      case 'outage':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-green-600 bg-green-100'
    }
  }

  const getIncidentSeverityColor = (severity: string) => {
    switch (severity) {
      case 'minor':
        return 'bg-yellow-100 text-yellow-800'
      case 'major':
        return 'bg-red-100 text-red-800'
      case 'critical':
        return 'bg-red-200 text-red-900'
      case 'maintenance':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getIncidentStatusIcon = (status: string) => {
    switch (status) {
      case 'investigating':
        return <FiAlertCircle className="w-4 h-4 text-yellow-600" />
      case 'resolved':
        return <FiCheckCircle className="w-4 h-4 text-green-600" />
      case 'monitoring':
        return <FiActivity className="w-4 h-4 text-blue-600" />
      case 'completed':
        return <FiCheckCircle className="w-4 h-4 text-green-600" />
      default:
        return <FiInfo className="w-4 h-4 text-gray-600" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDuration = (start: string, end?: string) => {
    const startTime = new Date(start)
    const endTime = end ? new Date(end) : new Date()
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60))
    
    if (duration < 60) {
      return `${duration}m`
    } else {
      const hours = Math.floor(duration / 60)
      const minutes = duration % 60
      return `${hours}h ${minutes}m`
    }
  }

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
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">System Status</h1>
                <p className="text-gray-600 mt-2">Current status of all Email Infrastructure services</p>
              </div>
              <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                <FiRefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>

            {/* Overall Status */}
            <div className={`flex items-center gap-3 p-4 rounded-lg ${getStatusColor(overallStatus.status)}`}>
              {getStatusIcon(overallStatus.status)}
              <div>
                <div className="font-semibold">{overallStatus.message}</div>
                <div className="text-sm opacity-75">
                  Last updated: {formatDate(overallStatus.lastUpdated)}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">{metric.name}</h3>
                  <FiTrendingUp className={`w-4 h-4 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                <div className="flex items-center gap-2 text-sm">
                  <span className={`${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                  <span className="text-gray-500">{metric.period}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Services</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 ${index !== services.length - 1 ? 'border-b border-gray-200' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(service.status)}
                    <div>
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="text-gray-500">Uptime</div>
                      <div className="font-semibold text-gray-900">{service.uptime}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-gray-500">Response</div>
                      <div className="font-semibold text-gray-900">{service.responseTime}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                      {service.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Uptime Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Uptime History</h2>
            <div className="flex gap-2">
              {['7d', '30d', '90d'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedTimeframe(period)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    selectedTimeframe === period
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-end gap-2 h-32">
              {uptimeData.map((day, index) => (
                <div key={day.date} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-full rounded-t ${
                      day.uptime >= 99.9 ? 'bg-green-500' : day.uptime >= 99.5 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ height: `${day.uptime}%` }}
                  />
                  <div className="text-xs text-gray-500 mt-2">
                    {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
              <span>7-day average: 99.96%</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>99.9%+</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                  <span>99.5-99.9%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded"></div>
                  <span>&lt;99.5%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Incidents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Incidents</h2>
          <div className="space-y-6">
            {incidents.map((incident, index) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    {getIncidentStatusIcon(incident.status)}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{incident.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{incident.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getIncidentSeverityColor(incident.severity)}`}>
                          {incident.severity}
                        </span>
                        <div className="flex items-center gap-1">
                          <FiClock className="w-4 h-4" />
                          {formatDate(incident.startTime)}
                          {incident.endTime && ` - ${formatDate(incident.endTime)}`}
                        </div>
                        <span>Duration: {formatDuration(incident.startTime, incident.endTime)}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    incident.status === 'resolved' || incident.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : incident.status === 'investigating'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {incident.status}
                  </span>
                </div>

                {/* Updates */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Updates</h4>
                  <div className="space-y-3">
                    {incident.updates.map((update, updateIndex) => (
                      <div key={updateIndex} className="flex gap-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div>
                          <div className="text-sm text-gray-600 mb-1">{formatDate(update.time)}</div>
                          <div className="text-sm text-gray-900">{update.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Subscribe to Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white"
        >
          <FiActivity className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-6 opacity-90">
            Subscribe to status updates and get notified about incidents and maintenance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Subscribe
            </button>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm opacity-75">
            <a href="#" className="flex items-center gap-1 hover:opacity-100 transition-opacity">
              <FiExternalLink className="w-4 h-4" />
              RSS Feed
            </a>
            <a href="#" className="flex items-center gap-1 hover:opacity-100 transition-opacity">
              <FiCalendar className="w-4 h-4" />
              Status Calendar
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}