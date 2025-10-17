"use client";

import { motion } from "framer-motion";
import { 
  FiMail,
  FiUsers,
  FiTrendingUp,
  FiGlobe,
  FiShoppingBag,
  FiMessageSquare,
  FiBell,
  FiSend,
  FiShield
} from "react-icons/fi";

export function UseCases() {
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
          <h2 className="text-4xl font-bold mb-4">Ideal Use Cases</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Perfect for businesses that require robust email infrastructure
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <div className="text-primary mb-4 text-2xl">
              <FiMail />
            </div>
            <h3 className="text-xl font-semibold mb-2">High-volume Campaigns</h3>
            <p className="text-muted-foreground">
              Scalable infrastructure for large email campaigns with optimal delivery rates
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <div className="text-primary mb-4 text-2xl">
              <FiBell />
            </div>
            <h3 className="text-xl font-semibold mb-2">Transactional Reliability</h3>
            <p className="text-muted-foreground">
              Guaranteed delivery for critical system notifications and updates
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <div className="text-primary mb-4 text-2xl">
              <FiSend />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lead Generation</h3>
            <p className="text-muted-foreground">
              Optimized infrastructure for successful outreach and lead nurturing
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-card p-6 rounded-lg shadow-lg"
          >
            <div className="text-primary mb-4 text-2xl">
              <FiShield />
            </div>
            <h3 className="text-xl font-semibold mb-2">Compliance Focus</h3>
            <p className="text-muted-foreground">
              Full regulatory compliance with all email sending requirements
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}