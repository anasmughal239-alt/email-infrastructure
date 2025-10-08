"use client";

import { motion } from "framer-motion";
import { FiMail, FiUsers, FiHome, FiCheck } from "react-icons/fi";

const features = [
  {
    icon: <FiMail size={24} />,
    name: "Modern Stack",
    description: "Built with Next.js, TypeScript, and TailwindCSS for modern web development.",
  },
  {
    icon: <FiUsers size={24} />,
    name: "User Management",
    description: "Complete user authentication and profile management system.",
  },
  {
    icon: <FiCheck size={24} />,
    name: "Data Storage",
    description: "Secure and scalable data storage solutions for your application.",
  },
  {
    icon: <FiHome size={24} />,
    name: "Global CDN",
    description: "Lightning-fast content delivery network for global reach.",
  },
  {
    icon: <FiMail size={24} />,
    name: "Security",
    description: "Enterprise-grade security with encryption and compliance.",
  },
  {
    icon: <FiUsers size={24} />,
    name: "API Integration",
    description: "Easy integration with third-party services and APIs.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to build and scale your SaaS application
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-primary-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}