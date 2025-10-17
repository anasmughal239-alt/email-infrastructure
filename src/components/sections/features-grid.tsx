"use client";

import { motion } from "framer-motion";
import { FiSettings, FiMail, FiLink, FiShield } from "react-icons/fi";

export function FeaturesGrid() {
  const features = [
    {
      icon: FiSettings,
      title: 'PowerMTA Management',
      description: 'Expert setup and optimization of your PowerMTA infrastructure for maximum performance.',
      illustration: '⚡'
    },
    {
      icon: FiShield,
      title: 'Authentication Suite',
      description: 'Complete SPF, DKIM, and DMARC implementation with ongoing monitoring.',
      illustration: '🛡️'
    },
    {
      icon: FiMail,
      title: 'Bounce Processing',
      description: 'Intelligent bounce handling and automated suppression list management.',
      illustration: '📨'
    },
    {
      icon: FiLink,
      title: 'ESP Integration',
      description: 'Seamless connection with your existing email service providers and tools.',
      illustration: '🔗'
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Email Infrastructure</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade email delivery infrastructure, fully managed by our team of experts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card hover:shadow-lg transition-all duration-300 group text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">{feature.illustration}</div>
              <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 w-fit mx-auto mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}