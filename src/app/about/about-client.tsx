'use client';

import { motion } from 'framer-motion';
import { 
  FiMail, 
  FiUsers, 
  FiHome, 
  FiCheck
} from 'react-icons/fi';

export default function AboutClient() {
  const stats = [
    { label: 'Emails Delivered', value: '10B+', icon: FiMail },
    { label: 'Happy Customers', value: '50K+', icon: FiUsers },
    { label: 'Countries Served', value: '150+', icon: FiHome },
    { label: 'Uptime', value: '99.9%', icon: FiMail }
  ];

  const values = [
    {
      icon: FiCheck,
      title: 'Customer First',
      description: 'Every decision we make is guided by what\'s best for our customers and their success.'
    },
    {
      icon: FiCheck,
      title: 'Security & Privacy',
      description: 'We prioritize the security and privacy of your data with enterprise-grade protection.'
    },
    {
      icon: FiMail,
      title: 'Innovation',
      description: 'We continuously push the boundaries of email infrastructure technology.'
    },
    {
      icon: FiUsers,
      title: 'Reliability',
      description: 'Our platform is built for scale and reliability, ensuring your emails always reach their destination.'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-Founder',
      bio: 'Former VP of Engineering at SendGrid. 15+ years in email infrastructure.',
      image: '/api/placeholder/150/150',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO & Co-Founder',
      bio: 'Ex-Principal Engineer at Mailgun. Expert in distributed systems and email protocols.',
      image: '/api/placeholder/150/150',
      social: {
        linkedin: '#',
        github: '#'
      }
    },
    {
      name: 'Emily Watson',
      role: 'VP of Product',
      bio: 'Product leader with 10+ years at Twilio and Stripe. Passionate about developer experience.',
      image: '/api/placeholder/150/150',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'David Kim',
      role: 'VP of Engineering',
      bio: 'Infrastructure expert who scaled email systems at Uber and Airbnb.',
      image: '/api/placeholder/150/150',
      social: {
        linkedin: '#',
        github: '#'
      }
    }
  ];

  const timeline = [
    {
      year: '2019',
      title: 'Company Founded',
      description: 'Started with a vision to simplify email infrastructure for developers.'
    },
    {
      year: '2020',
      title: 'Series A Funding',
      description: 'Raised $15M to expand our platform and team.'
    },
    {
      year: '2021',
      title: 'Global Expansion',
      description: 'Launched in Europe and Asia, serving customers worldwide.'
    },
    {
      year: '2022',
      title: '1B Emails Milestone',
      description: 'Delivered our billionth email, proving our scale and reliability.'
    },
    {
      year: '2023',
      title: 'Enterprise Features',
      description: 'Launched advanced analytics, webhooks, and enterprise security features.'
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Introduced AI-powered deliverability optimization and content suggestions.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              About EmailInfra
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're on a mission to make email infrastructure simple, reliable, and accessible 
              for developers and businesses of all sizes. Since 2019, we've been building the 
              tools that power billions of emails worldwide.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <Icon className="w-8 h-8 mx-auto mb-4 opacity-80" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Email is the backbone of digital communication, yet building reliable email infrastructure 
            remains complex and time-consuming. We believe developers should focus on building great 
            products, not wrestling with email delivery. That's why we've created a platform that 
            handles the complexity of email infrastructure, so you don't have to.
          </p>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">The people behind EmailInfra</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center"
              >
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FiUsers className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center gap-3">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                      <FiMail className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                      <FiUsers className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} className="text-gray-400 hover:text-gray-900 transition-colors">
                      <FiHome className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600">Key milestones in our company's growth</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <div className="text-blue-600 font-bold text-lg mb-2">{item.year}</div>
                      <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-xl mb-6 opacity-90">
            We're always looking for talented people who share our passion for building great products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/careers" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              View Open Positions
            </a>
            <a 
              href="/contact" 
              className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors font-medium"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
