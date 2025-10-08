'use client'

import { motion } from 'framer-motion'
import { 
  FiMail, 
  FiUsers, 
  FiHome, 
  FiCheck
} from 'react-icons/fi'
import Link from 'next/link'
import { useState } from 'react'

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'engineering', name: 'Engineering' },
    { id: 'product', name: 'Product' },
    { id: 'design', name: 'Design' },
    { id: 'sales', name: 'Sales' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'customer-success', name: 'Customer Success' }
  ]

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'remote', name: 'Remote' },
    { id: 'san-francisco', name: 'San Francisco, CA' },
    { id: 'new-york', name: 'New York, NY' },
    { id: 'london', name: 'London, UK' },
    { id: 'toronto', name: 'Toronto, CA' }
  ]

  const benefits = [
    {
      icon: FiCheck,
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision insurance for you and your family'
    },
    {
      icon: FiHome,
      title: 'Remote-First',
      description: 'Work from anywhere with flexible hours and home office stipend'
    },
    {
      icon: FiMail,
      title: 'Growth & Learning',
      description: '$2,000 annual learning budget and conference attendance'
    },
    {
      icon: FiUsers,
      title: 'Time Off',
      description: 'Unlimited PTO and company-wide mental health days'
    },
    {
      icon: FiMail,
      title: 'Equity & Salary',
      description: 'Competitive salary with equity participation in company success'
    },
    {
      icon: FiHome,
      title: 'Perks & More',
      description: 'Catered meals, team retreats, and top-tier equipment'
    }
  ]

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Software Engineer - Infrastructure',
      department: 'engineering',
      location: 'remote',
      type: 'Full-time',
      salary: '$150k - $200k',
      description: 'Build and scale our email infrastructure to handle billions of emails per day.',
      requirements: ['5+ years of backend development', 'Experience with distributed systems', 'Go or Node.js expertise'],
      posted: '2024-01-15'
    },
    {
      id: 2,
      title: 'Product Manager - Developer Experience',
      department: 'product',
      location: 'san-francisco',
      type: 'Full-time',
      salary: '$140k - $180k',
      description: 'Lead product strategy for our developer-facing APIs and tools.',
      requirements: ['3+ years of product management', 'Developer tools experience', 'Technical background'],
      posted: '2024-01-12'
    },
    {
      id: 3,
      title: 'Senior Frontend Engineer',
      department: 'engineering',
      location: 'remote',
      type: 'Full-time',
      salary: '$130k - $170k',
      description: 'Build beautiful and intuitive user interfaces for our dashboard and tools.',
      requirements: ['4+ years of React/TypeScript', 'Design system experience', 'Performance optimization'],
      posted: '2024-01-10'
    },
    {
      id: 4,
      title: 'UX/UI Designer',
      department: 'design',
      location: 'new-york',
      type: 'Full-time',
      salary: '$120k - $150k',
      description: 'Design user experiences that make complex email infrastructure simple.',
      requirements: ['3+ years of UX/UI design', 'Figma expertise', 'B2B SaaS experience'],
      posted: '2024-01-08'
    },
    {
      id: 5,
      title: 'Enterprise Sales Manager',
      department: 'sales',
      location: 'remote',
      type: 'Full-time',
      salary: '$120k - $160k + commission',
      description: 'Drive enterprise sales and build relationships with large customers.',
      requirements: ['5+ years of enterprise sales', 'SaaS/API sales experience', 'Proven track record'],
      posted: '2024-01-05'
    },
    {
      id: 6,
      title: 'DevOps Engineer',
      department: 'engineering',
      location: 'london',
      type: 'Full-time',
      salary: '£80k - £110k',
      description: 'Manage and scale our cloud infrastructure across multiple regions.',
      requirements: ['4+ years of DevOps/SRE', 'Kubernetes experience', 'AWS/GCP expertise'],
      posted: '2024-01-03'
    },
    {
      id: 7,
      title: 'Customer Success Manager',
      department: 'customer-success',
      location: 'toronto',
      type: 'Full-time',
      salary: 'CAD $90k - $120k',
      description: 'Help our customers succeed with email infrastructure and drive expansion.',
      requirements: ['3+ years of customer success', 'Technical aptitude', 'SaaS experience'],
      posted: '2024-01-01'
    },
    {
      id: 8,
      title: 'Content Marketing Manager',
      department: 'marketing',
      location: 'remote',
      type: 'Full-time',
      salary: '$100k - $130k',
      description: 'Create compelling content that educates developers about email infrastructure.',
      requirements: ['4+ years of content marketing', 'Developer audience experience', 'Technical writing'],
      posted: '2023-12-28'
    }
  ]

  const filteredJobs = jobOpenings.filter(job => {
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation
    return matchesDepartment && matchesLocation
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

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
              Join Our Mission
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Help us build the future of email infrastructure. We're looking for passionate 
              people who want to solve complex problems and make email delivery simple for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#openings" 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center"
              >
                View Open Positions
                <FiMail className="w-5 h-5" />
              </a>
              <a 
                href="#culture" 
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Learn About Our Culture
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold mb-2">150+</div>
              <div className="text-blue-100">Team Members</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-blue-100">Countries</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold mb-2">4.9/5</div>
              <div className="text-blue-100">Glassdoor Rating</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Employee Satisfaction</div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
          id="culture"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work With Us</h2>
            <p className="text-lg text-gray-600">We believe in taking care of our team</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Job Openings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          id="openings"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-lg text-gray-600">Find your next opportunity with us</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-4 mb-4">
              <FiCheck className="w-5 h-5 text-gray-400" />
              <span className="font-medium text-gray-900">Filter Positions</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {departments.find(d => d.id === job.department)?.name}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <FiHome className="w-4 h-4" />
                        {locations.find(l => l.id === job.location)?.name}
                      </div>
                      <div className="flex items-center gap-1">
                        <FiCheck className="w-4 h-4" />
                        {job.type}
                      </div>
                      <div className="flex items-center gap-1">
                        <FiMail className="w-4 h-4" />
                        {job.salary}
                      </div>
                      <div className="flex items-center gap-1">
                        <FiUsers className="w-4 h-4" />
                        Posted {formatDate(job.posted)}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, reqIndex) => (
                        <span
                          key={reqIndex}
                          className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                        >
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <button className="w-full lg:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 justify-center">
                      Apply Now
                      <FiMail className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <FiUsers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No positions found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or check back later for new opportunities.
              </p>
              <button
                onClick={() => {
                  setSelectedDepartment('all')
                  setSelectedLocation('all')
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Don't See the Right Role?</h2>
          <p className="text-xl mb-6 opacity-90">
            We're always looking for exceptional talent. Send us your resume and let's talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:careers@emailinfra.com" 
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Send Resume
            </a>
            <Link 
              href="/contact" 
              className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors font-medium"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
