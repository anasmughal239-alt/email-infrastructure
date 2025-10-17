"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "What is PowerMTA and why do I need it?",
      answer: "PowerMTA is an enterprise-grade Mail Transfer Agent (MTA) that provides advanced email delivery capabilities. It offers superior deliverability, detailed analytics, and powerful routing features that help ensure your emails reach the inbox. Our managed PowerMTA service handles all the complex setup, maintenance, and optimization for you."
    },
    {
      question: "How do you handle email authentication?",
      answer: "We automatically configure and maintain SPF, DKIM, and DMARC records for your domain. Our team ensures proper DNS setup, monitors authentication status, and makes necessary adjustments to maintain high deliverability rates. We also provide detailed authentication reports and alerts."
    },
    {
      question: "What's included in your bounce management?",
      answer: "Our bounce management system automatically processes hard and soft bounces, maintains suppression lists, and provides detailed bounce analytics. We categorize bounces, track trends, and automatically adjust sending patterns to optimize delivery. The system also helps maintain your sender reputation by quickly reacting to delivery issues."
    },
    {
      question: "How do you warm up IP addresses?",
      answer: "We use a proven IP warmup process that gradually increases sending volume while monitoring delivery metrics. Our system automatically adjusts sending patterns based on recipient server responses, ensuring optimal inbox placement. We also provide pre-warmed IPs with established reputations for immediate high-volume sending."
    },
    {
      question: "Can I use my existing email service provider?",
      answer: "Yes, SendingOps can integrate with most email service providers and marketing automation platforms. We handle the infrastructure and delivery while you continue using your preferred tools for composing and triggering emails. Our API and SMTP endpoints make integration straightforward."
    },
    {
      question: "What kind of support do you provide?",
      answer: "All plans include 24/7 infrastructure monitoring and technical support. Professional plans get priority support with faster response times, while Enterprise plans include a dedicated account manager and 24/7 premium support with custom SLAs. We also provide detailed documentation and integration guides."
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our managed email infrastructure service.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}