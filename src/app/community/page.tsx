'use client'

import { motion } from 'framer-motion'
import { 
  FiUsers, 
  FiMessageSquare,
  FiCalendar,
  FiCode,
  FiStar,
  FiTrendingUp,
  FiHeart,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiSlack,
  FiDiscord,
  FiExternalLink,
  FiArrowRight,
  FiClock,
  FiMapPin,
  FiMic,
  FiVideo,
  FiBookOpen,
  FiAward,
  FiZap,
  FiGlobe
} from 'react-icons/fi'
import Link from 'next/link'
import { useState } from 'react'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('discussions')

  const stats = [
    { label: 'Community Members', value: '25,000+', icon: FiUsers },
    { label: 'Monthly Discussions', value: '1,200+', icon: FiMessageSquare },
    { label: 'Code Contributions', value: '500+', icon: FiCode },
    { label: 'Events This Year', value: '48', icon: FiCalendar }
  ]

  const forumCategories = [
    {
      title: 'General Discussion',
      description: 'General questions and discussions about email infrastructure',
      posts: 1247,
      members: 8934,
      color: 'blue',
      icon: FiMessageSquare
    },
    {
      title: 'API & Development',
      description: 'Technical discussions about our APIs and SDKs',
      posts: 892,
      members: 5621,
      color: 'green',
      icon: FiCode
    },
    {
      title: 'Deliverability',
      description: 'Best practices for email deliverability and reputation',
      posts: 634,
      members: 4312,
      color: 'purple',
      icon: FiTrendingUp
    },
    {
      title: 'Feature Requests',
      description: 'Suggest new features and vote on existing requests',
      posts: 423,
      members: 3789,
      color: 'orange',
      icon: FiStar
    },
    {
      title: 'Showcase',
      description: 'Show off your projects and implementations',
      posts: 298,
      members: 2156,
      color: 'pink',
      icon: FiHeart
    },
    {
      title: 'Announcements',
      description: 'Official updates and announcements from our team',
      posts: 156,
      members: 12453,
      color: 'indigo',
      icon: FiZap
    }
  ]

  const recentDiscussions = [
    {
      title: 'Best practices for handling email bounces',
      author: 'Sarah Chen',
      avatar: 'SC',
      category: 'Deliverability',
      replies: 23,
      likes: 45,
      timeAgo: '2 hours ago',
      isHot: true
    },
    {
      title: 'New webhook events for better tracking',
      author: 'Mike Rodriguez',
      avatar: 'MR',
      category: 'API & Development',
      replies: 18,
      likes: 32,
      timeAgo: '4 hours ago',
      isHot: false
    },
    {
      title: 'Email template optimization tips',
      author: 'Emma Thompson',
      avatar: 'ET',
      category: 'General Discussion',
      replies: 31,
      likes: 67,
      timeAgo: '6 hours ago',
      isHot: true
    },
    {
      title: 'Integration with popular CRM platforms',
      author: 'David Kim',
      avatar: 'DK',
      category: 'Feature Requests',
      replies: 15,
      likes: 28,
      timeAgo: '8 hours ago',
      isHot: false
    },
    {
      title: 'My email automation workflow',
      author: 'Lisa Wang',
      avatar: 'LW',
      category: 'Showcase',
      replies: 12,
      likes: 41,
      timeAgo: '1 day ago',
      isHot: false
    }
  ]

  const upcomingEvents = [
    {
      title: 'Email Infrastructure Masterclass',
      type: 'Webinar',
      date: '2024-02-15',
      time: '2:00 PM EST',
      attendees: 234,
      description: 'Deep dive into scaling email infrastructure for high-volume senders'
    },
    {
      title: 'Community Office Hours',
      type: 'Q&A Session',
      date: '2024-02-20',
      time: '11:00 AM PST',
      attendees: 89,
      description: 'Ask questions and get answers from our engineering team'
    },
    {
      title: 'Developer Meetup - San Francisco',
      type: 'In-Person',
      date: '2024-02-25',
      time: '6:00 PM PST',
      attendees: 45,
      description: 'Network with other developers and learn about new features'
    },
    {
      title: 'Email Deliverability Workshop',
      type: 'Workshop',
      date: '2024-03-05',
      time: '1:00 PM EST',
      attendees: 156,
      description: 'Hands-on workshop to improve your email delivery rates'
    }
  ]

  const contributors = [
    {
      name: 'Alex Johnson',
      avatar: 'AJ',
      contributions: 127,
      badge: 'Top Contributor',
      badgeColor: 'gold'
    },
    {
      name: 'Maria Garcia',
      avatar: 'MG',
      contributions: 89,
      badge: 'Helper',
      badgeColor: 'blue'
    },
    {
      name: 'James Wilson',
      avatar: 'JW',
      contributions: 76,
      badge: 'Expert',
      badgeColor: 'purple'
    },
    {
      name: 'Sophie Brown',
      avatar: 'SB',
      contributions: 64,
      badge: 'Mentor',
      badgeColor: 'green'
    }
  ]

  const socialChannels = [
    {
      name: 'Discord',
      icon: FiDiscord,
      members: '12.5k',
      description: 'Real-time chat and support',
      color: 'indigo'
    },
    {
      name: 'Slack',
      icon: FiSlack,
      members: '8.2k',
      description: 'Professional discussions',
      color: 'purple'
    },
    {
      name: 'GitHub',
      icon: FiGithub,
      members: '15.3k',
      description: 'Code contributions and issues',
      color: 'gray'
    },
    {
      name: 'Twitter',
      icon: FiTwitter,
      members: '25.1k',
      description: 'Updates and announcements',
      color: 'blue'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      pink: 'bg-pink-100 text-pink-600 border-pink-200',
      indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200',
      gray: 'bg-gray-100 text-gray-600 border-gray-200',
      gold: 'bg-yellow-100 text-yellow-600 border-yellow-200'
    }
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-600 border-gray-200'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">
              Join Our Community
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Connect with developers, share knowledge, and build amazing email experiences together. 
              Our community is here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
                Join Discord
              </button>
              <button className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors font-medium">
                Browse Forums
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200">
          {[
            { id: 'discussions', label: 'Discussions', icon: FiMessageSquare },
            { id: 'events', label: 'Events', icon: FiCalendar },
            { id: 'contributors', label: 'Contributors', icon: FiAward },
            { id: 'channels', label: 'Social Channels', icon: FiGlobe }
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Forum Categories */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Forum Categories</h2>
              <div className="space-y-4">
                {forumCategories.map((category, index) => {
                  const Icon = category.icon
                  return (
                    <motion.div
                      key={category.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(category.color)}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{category.title}</h3>
                          <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{category.posts.toLocaleString()} posts</span>
                            <span>{category.members.toLocaleString()} members</span>
                          </div>
                        </div>
                        <FiArrowRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Recent Discussions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Discussions</h2>
              <div className="space-y-4">
                {recentDiscussions.map((discussion, index) => (
                  <motion.div
                    key={discussion.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-medium">
                        {discussion.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 text-sm truncate">{discussion.title}</h3>
                          {discussion.isHot && (
                            <span className="bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded">Hot</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mb-2">by {discussion.author}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="bg-gray-100 px-2 py-1 rounded">{discussion.category}</span>
                          <span>{discussion.replies} replies</span>
                          <span>{discussion.likes} likes</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{discussion.timeAgo}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{event.title}</h3>
                      <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">{event.type}</span>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <div className="flex items-center gap-1 mb-1">
                        <FiCalendar className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <FiClock className="w-4 h-4" />
                        {event.time}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <FiUsers className="w-4 h-4" />
                      {event.attendees} attending
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Register
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Contributors Tab */}
        {activeTab === 'contributors' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Contributors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contributors.map((contributor, index) => (
                <motion.div
                  key={contributor.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 text-lg font-medium">
                    {contributor.avatar}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{contributor.name}</h3>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-3 ${getColorClasses(contributor.badgeColor)}`}>
                    {contributor.badge}
                  </span>
                  <p className="text-sm text-gray-600">{contributor.contributions} contributions</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Social Channels Tab */}
        {activeTab === 'channels' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Connect With Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialChannels.map((channel, index) => {
                const Icon = channel.icon
                return (
                  <motion.div
                    key={channel.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(channel.color)}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{channel.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{channel.description}</p>
                        <p className="text-sm text-gray-500">{channel.members} members</p>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                        Join
                        <FiExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white"
        >
          <FiUsers className="w-16 h-16 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-xl mb-6 opacity-90">
            Become part of our growing community and help shape the future of email infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Create Account
            </button>
            <Link 
              href="/docs" 
              className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors font-medium"
            >
              View Documentation
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}