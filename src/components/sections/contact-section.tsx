"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FiMail, FiMessageSquare, FiCalendar } from "react-icons/fi";

export function ContactSection() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Optimize Your Email Infrastructure?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's discuss how SendingOps can help you achieve superior email deliverability with our managed PowerMTA service.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <motion.div
            className="bg-card rounded-lg p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCalendar className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Schedule a Demo</h3>
            <p className="text-muted-foreground mb-4">
              See SendingOps in action with a personalized demo of our platform.
            </p>
            <Button className="w-full">
              Book Demo
            </Button>
          </motion.div>

          <motion.div
            className="bg-card rounded-lg p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Chat with Sales</h3>
            <p className="text-muted-foreground mb-4">
              Get instant answers about our services and pricing options.
            </p>
            <Button variant="outline" className="w-full">
              Start Chat
            </Button>
          </motion.div>

          <motion.div
            className="bg-card rounded-lg p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Support</h3>
            <p className="text-muted-foreground mb-4">
              Technical questions? Our support team is here to help.
            </p>
            <Button variant="outline" className="w-full">
              Contact Support
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground">
            Already a customer? <a href="/login" className="text-primary hover:underline">Sign in to your dashboard</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}