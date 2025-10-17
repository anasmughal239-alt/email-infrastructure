"use client";

import { motion } from "framer-motion";
import { 
  FiUpload,
  FiServer,
  FiCheckCircle,
  FiMail,
  FiSettings,
  FiPlay,
  FiArrowRight
} from "react-icons/fi";

const steps = [
  {
    step: 1,
    icon: FiUpload,
    title: "Submit Your Campaign",
    description: "Upload your campaign details and recipient list through our secure dashboard."
  },
  {
    step: 2,
    icon: FiSettings,
    title: "SMTP & IP Optimization",
    description: "We configure optimal sending parameters and warm up IPs for your campaign."
  },
  {
    step: 3,
    icon: FiCheckCircle,
    title: "Verification & Scheduling",
    description: "Your campaign is verified for compliance and scheduled for optimal delivery times."
  },
  {
    step: 4,
    icon: FiPlay,
    title: "Managed Sending & Monitoring",
    description: "We handle the sending process with real-time monitoring and adjustments."
  },
  {
    step: 5,
    icon: FiArrowRight,
    title: "Weekly Performance Reports",
    description: "Receive detailed analytics and optimization recommendations weekly."
  }
];

export function HowItWorks() {
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
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A streamlined 5-step process ensures flawless email delivery
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mx-auto">
                  <step.icon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}