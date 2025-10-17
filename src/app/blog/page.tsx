'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiCalendar, FiUser, FiTag, FiArrowRight } from 'react-icons/fi';

const categories = [
  'Email Infrastructure',
  'Best Practices',
  'Deliverability',
  'Security',
  'Scalability',
  'Tutorials',
];

const blogPosts = [
  {
    id: 1,
    title: 'Maximizing Email Deliverability: Best Practices for 2024',
    excerpt: 'Learn the latest techniques and strategies to ensure your emails reach the inbox consistently.',
    category: 'Deliverability',
    author: 'Sarah Chen',
    date: 'March 15, 2024',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 2,
    title: 'Understanding SPF, DKIM, and DMARC: A Complete Guide',
    excerpt: 'A comprehensive guide to email authentication protocols and how they protect your domain.',
    category: 'Security',
    author: 'Michael Rodriguez',
    date: 'March 12, 2024',
    readTime: '10 min read',
    featured: true,
  },
  {
    id: 3,
    title: 'Scaling Your Email Infrastructure: From Startup to Enterprise',
    excerpt: 'Key considerations and strategies for growing your email sending capabilities.',
    category: 'Scalability',
    author: 'Emma Thompson',
    date: 'March 10, 2024',
    readTime: '12 min read',
    featured: false,
  },
  {
    id: 4,
    title: 'Email Template Design Tips for Better Engagement',
    excerpt: 'Design principles and examples to create engaging email templates that convert.',
    category: 'Best Practices',
    author: 'Alex Wong',
    date: 'March 8, 2024',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: 5,
    title: 'Implementing Rate Limiting in Your Email Service',
    excerpt: 'Technical guide on implementing smart rate limiting for optimal email delivery.',
    category: 'Tutorials',
    author: 'David Kumar',
    date: 'March 5, 2024',
    readTime: '15 min read',
    featured: false,
  },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-bold mb-6">
            <span className="text-foreground">SendingOps </span>
            <span className="text-primary">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Insights, updates, and best practices for email infrastructure and deliverability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedCategory('')}
              className={
              `${'px-4 py-2 rounded-full text-sm font-medium transition-colors'} ` +
              (!selectedCategory
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600')
            }
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={
                `${'px-4 py-2 rounded-full text-sm font-medium transition-colors'} ` +
                (selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600')
              }
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Featured Articles</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 mb-3">
                      <FiTag className="w-4 h-4" />
                      <span>{post.category}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-300 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <FiUser className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiCalendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <button className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                      Read more <FiArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Latest Articles</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 mb-3">
                    <FiTag className="w-4 h-4" />
                    <span>{post.category}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <FiUser className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <button className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    Read more <FiArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
