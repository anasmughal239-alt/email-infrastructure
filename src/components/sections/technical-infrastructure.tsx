"use client";

import { motion } from "framer-motion";
import { 
  FiServer, 
  FiShield, 
  FiRefreshCw, 
  FiCpu,
  FiDatabase,
  FiTrendingUp
} from "react-icons/fi";

export function TechnicalInfrastructure() {
  const features = [
    {
      title: "PowerMTA Architecture",
      description: "Advanced routing and delivery optimization for maximum inbox placement",
      icon: FiServer
    },
    {
      title: "Dedicated SMTP Nodes",
      description: "Exclusive infrastructure per client for optimal performance",
      icon: FiShield
    },
    {
      title: "Automated IP Warm-up",
      description: "Gradual ramp-up process for optimal sender reputation",
      icon: FiTrendingUp
    },
    {
      title: "Real-time Monitoring",
      description: "Continuous tracking of all critical deliverability metrics",
      icon: FiRefreshCw
    },
    {
      title: "Custom Dashboard",
      description: "Access detailed performance insights and analytics anytime",
      icon: FiDatabase
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Infrastructure</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enterprise-grade email delivery infrastructure powered by PowerMTA and advanced monitoring systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg bg-background shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4">
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