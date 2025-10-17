'use client';

import { motion } from 'framer-motion';
import { FiAward, FiClock, FiGlobe, FiShield, FiActivity, FiServer, FiDollarSign, FiMail } from 'react-icons/fi';

export function WhyChooseUs() {
  const advantages = [
    {
      icon: <FiAward />,
      title: "Deliverability Experts",
      description: "Managed by industry specialists with proven track record"
    },
    {
      icon: <FiClock />,
      title: "99% Uptime & Consistency",
      description: "Reliable performance you can count on"
    },
    {
      icon: <FiGlobe />,
      title: "Dedicated IPs & Domains",
      description: "Enhanced sender reputation for better deliverability"
    },
    {
      icon: <FiActivity />,
      title: "Proactive Monitoring",
      description: "Daily checks for bounces, blacklists, and spam traps"
    },
    {
      icon: <FiShield />,
      title: "Full Compliance",
      description: "SPF, DKIM, and DMARC fully aligned"
    },
    {
      icon: <FiServer />,
      title: "Massive Scalability",
      description: "Support for millions of emails monthly"
    },
    {
      icon: <FiDollarSign />,
      title: "Transparent Pricing",
      description: "Fixed costs with no volume penalties"
    },
    {
      icon: <FiMail />,
      title: "All Email Types",
      description: "Optimized for transactional and lead-generation"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">Why Choose SendingOps</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Key advantages that set us apart in email infrastructure management
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-6 rounded-lg shadow-lg"
            >
              <div className="text-primary mb-4 text-2xl">
                {advantage.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
              <p className="text-muted-foreground">{advantage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}