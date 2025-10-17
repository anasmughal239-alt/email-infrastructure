'use client';

import { motion } from 'framer-motion';
import { FiMail, FiServer, FiShield, FiCheckCircle, FiSettings, FiRefreshCw } from 'react-icons/fi';

const features = [
  {
    icon: FiServer,
    title: 'Managed PowerMTA Setup',
    description: 'We handle the complete configuration of your PowerMTA and SMTP infrastructure, optimized for maximum deliverability.'
  },
  {
    icon: FiShield,
    title: 'Full Authentication',
    description: 'Comprehensive domain authentication with SPF, DKIM, and DMARC setup and monitoring for optimal sender reputation.'
  },
  {
    icon: FiMail,
    title: 'Bounce Management',
    description: 'Automated handling of bounces, complaints, and feedback loops to maintain clean sending practices.'
  },
  {
    icon: FiCheckCircle,
    title: 'Expert Management',
    description: 'Focus on your growth while our team handles the technical complexities of email delivery infrastructure.'
  }
];

export function WhatWeDo() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">What We Do</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            SendingOps expertly manages the entire email delivery lifecycle—from server configuration to inbox optimization. Our comprehensive approach ensures maximum deliverability while you focus on business growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <div className="text-primary mb-4 text-2xl">
              <FiServer />
            </div>
            <h3 className="text-xl font-semibold mb-2">PowerMTA Deployment</h3>
            <p className="text-muted-foreground">High-performance email delivery infrastructure for optimal sending capabilities.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <div className="text-primary mb-4 text-2xl">
              <FiSettings />
            </div>
            <h3 className="text-xl font-semibold mb-2">SMTP Configuration</h3>
            <p className="text-muted-foreground">Customized setup and optimization for maximum email throughput and delivery.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <div className="text-primary mb-4 text-2xl">
              <FiShield />
            </div>
            <h3 className="text-xl font-semibold mb-2">Domain Authentication</h3>
            <p className="text-muted-foreground">Complete SPF, DKIM, and DMARC implementation for enhanced sender credibility.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <div className="text-primary mb-4 text-2xl">
              <FiRefreshCw />
            </div>
            <h3 className="text-xl font-semibold mb-2">Bounce Handling</h3>
            <p className="text-muted-foreground">Intelligent processing and management to maintain list hygiene and delivery rates.</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlike DIY tools, our fully managed service handles all technical complexities of email sending, allowing you to concentrate on growing your business.
          </p>
        </motion.div>
      </div>
    </section>
  );
}