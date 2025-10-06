'use client'

import { motion } from 'framer-motion'
import { 
  FiSearch, 
  FiCalendar, 
  FiUser, 
  FiClock, 
  FiArrowRight,
  FiTrendingUp,
  FiCode,
  FiShield,
  FiZap,
  FiMail,
  FiSettings,
  FiBookOpen
} from 'react-icons/fi'
import Link from 'next/link'
import { useState } from 'react'

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Posts', icon: FiBookOpen },
    { id: 'tutorials', name: 'Tutorials', icon: FiCode },
    { id: 'best-practices', name: 'Best Practices', icon: FiTrendingUp },
    { id: 'security', name: 'Security', icon: FiShield },
    { id: 'product-updates', name: 'Product Updates', icon: FiZap },
    { id: 'email-marketing', name: 'Email Marketing', icon: FiMail }
  ]

  const featuredPost = {
    id: 1,
    title: 'The Complete Guide to Email Deliverability in 2024',
    excerpt: 'Learn the latest strategies and best practices to ensure your emails reach the inbox, not the spam folder.',
    content: 'Email deliverability is more important than ever. With inbox providers constantly updating their algorithms...',
    author: 'Sarah Chen',
    authorRole: 'CEO & Co-Founder',
    publishDate: '2024-01-15',
    readTime: '12 min read',
    category: 'best-practices',
    image: '/api/placeholder/800/400',
    featured: true,
    tags: ['deliverability', 'best-practices', 'email-marketing']
  }

  const blogPosts = [
    {
      id: 2,
      title: 'Building Scalable Email Infrastructure with Node.js',
      excerpt: 'A deep dive into building robust email systems that can handle millions of emails per day.',
      author: 'Marcus Rodriguez',
      authorRole: 'CTO',
      publishDate: '2024-01-10',
      readTime: '8 min read',
      category: 'tutorials',
      image: '/api/placeholder/400/250',
      tags: ['nodejs', 'scalability', 'infrastructure']
    },
    {
      id: 3,
      title: 'Email Security: Protecting Your Infrastructure from Threats',
      excerpt: 'Essential security measures every email service provider should implement.',
      author: 'Emily Watson',
      authorRole: 'VP of Product',
      publishDate: '2024-01-08',
      readTime: '6 min read',
      category: 'security',
      image: '/api/placeholder/400/250',
      tags: ['security', 'encryption', 'best-practices']
    },
    {
      id: 4,
      title: 'Introducing Webhooks: Real-time Email Event Tracking',
      excerpt: 'Get instant notifications about email delivery, opens, clicks, and bounces.',
      author: 'David Kim',
      authorRole: 'VP of Engineering',
      publishDate: '2024-01-05',
      readTime: '5 min read',
      category: 'product-updates',
      image: '/api/placeholder/400/250',
      tags: ['webhooks', 'tracking', 'product-update']
    },
    {
      id: 5,
      title: 'Email Marketing Automation: Best Practices for 2024',
      excerpt: 'How to create effective automated email campaigns that drive engagement.',
      author: 'Sarah Chen',
      authorRole: 'CEO & Co-Founder',
      publishDate: '2024-01-03',
      readTime: '10 min read',
      category: 'email-marketing',
      image: '/api/placeholder/400/250',
      tags: ['automation', 'marketing', 'engagement']
    },
    {
      id: 6,
      title: 'API Rate Limiting: Managing High-Volume Email Sending',
      excerpt: 'Understanding and implementing effective rate limiting for email APIs.',
      author: 'Marcus Rodriguez',
      authorRole: 'CTO',
      publishDate: '2024-01-01',
      readTime: '7 min read',
      category: 'tutorials',
      image: '/api/placeholder/400/250',
      tags: ['api', 'rate-limiting', 'performance']
    },
    {
      id: 7,
      title: 'DKIM, SPF, and DMARC: Email Authentication Explained',
      excerpt: 'A comprehensive guide to email authentication protocols and implementation.',
      author: 'Emily Watson',
      authorRole: 'VP of Product',
      publishDate: '2023-12-28',
      readTime: '9 min read',
      category: 'security',
      image: '/api/placeholder/400/250',
      tags: ['authentication', 'dkim', 'spf', 'dmarc']
    }
  ]

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">EmailInfra Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Insights, tutorials, and best practices for email infrastructure, 
              deliverability, and developer tools.
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto">
              <div className="relative mb-6">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {category.name}
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="h-64 md:h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <FiMail className="w-24 h-24 text-white opacity-50" />
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Featured
                  </span>
                  <span className="text-gray-500 text-sm">
                    {categories.find(cat => cat.id === featuredPost.category)?.name}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <FiUser className="w-4 h-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <FiCalendar className="w-4 h-4" />
                      {formatDate(featuredPost.publishDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  <Link 
                    href={`/blog/${featuredPost.id}`}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Read More
                    <FiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <FiBookOpen className="w-12 h-12 text-gray-400" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-blue-600 text-xs font-medium">
                    {categories.find(cat => cat.id === post.category)?.name}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <FiUser className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <FiCalendar className="w-4 h-4" />
                      {formatDate(post.publishDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
                
                <Link 
                  href={`/blog/${post.id}`}
                  className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  Read Article
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <FiSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or browse different categories.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-6 opacity-90">
            Get the latest articles and insights delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}