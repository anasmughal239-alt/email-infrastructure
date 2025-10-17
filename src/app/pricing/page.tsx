"use client";

import { motion } from "framer-motion";
import { FiCheck, FiMail, FiServer, FiShield } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl font-bold mb-6">
            <span className="text-foreground">💰 Simple, Transparent </span>
            <span className="text-primary">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              Power your transactional and lead emails with enterprise-grade deliverability — managed end to end by SendingOps.
            </p>
            <p className="text-lg text-muted-foreground">
              No hidden costs. No overages. Just consistent, inbox-ready performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-card rounded-2xl shadow-lg overflow-hidden border-2 ${
                  plan.isPopular ? 'border-primary scale-105 relative' : 'border-border'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="p-8">
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      {plan.icon}
                      <h2 className="text-2xl font-bold">{plan.name}</h2>
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {plan.description}
                    </p>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <FiCheck className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full"
                    variant={plan.isPopular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8">💡 Why Clients Choose SendingOps</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {whyChooseUs.map((reason, index) => (
                <div key={index} className="bg-card p-6 rounded-lg">
                  <p className="text-muted-foreground">{reason}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Custom Setup Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">📞 Need a Custom Setup?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We'll tailor your infrastructure to your sending volume, audience type, or compliance needs.
            </p>
            <Button size="lg" variant="outline">
              Book a Consultation
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Terms Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8">⚙️ Billing & Terms</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {terms.map((term, index) => (
                <div key={index} className="bg-card p-6 rounded-lg">
                  <p className="text-muted-foreground">{term}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

const plans = [
  {
    name: "Starter",
    price: 999,
    description: "Perfect for small businesses starting with email marketing",
    icon: <FiMail className="w-6 h-6 text-primary" />,
    features: [
      "100 Custom Email Inboxes",
      "150,000 Verified Leads",
      "150,000 Email Verifications",
      "Shared SMTP Infrastructure",
      "Basic Deliverability Monitoring",
      "Standard Support (9/5)",
      "Basic Analytics Dashboard"
    ]
  },
  {
    name: "Growth",
    price: 2500,
    description: "For businesses sending up to 20,000 emails per day",
    icon: <FiServer className="w-6 h-6 text-primary" />,
    isPopular: true,
    features: [
      "400 Custom Email Inboxes",
      "600,000 Verified Leads",
      "600,000 Email Verifications",
      "Fully Managed SMTP + PowerMTA",
      "Advanced Deliverability Optimization",
      "24/7 Dedicated Support",
      "Advanced Analytics & Reporting"
    ]
  },
  {
    name: "Pro",
    price: 4999,
    description: "Enterprise-grade solution for high-volume senders",
    icon: <FiShield className="w-6 h-6 text-primary" />,
    features: [
      "1000 Custom Email Inboxes",
      "1,500,000 Verified Leads",
      "1,500,000 Email Verifications",
      "Dedicated PowerMTA Infrastructure",
      "Premium Deliverability Suite",
      "24/7 Priority Support",
      "Custom Analytics & API Access"
    ]
  }
];

const whyChooseUs = [
  "No tech headaches: We manage PowerMTA, DNS, IPs, and warm-up.",
  "No deliverability risks: Every campaign monitored in real time.",
  "No data worries: Clean, verified, and compliant email lists."
];

const terms = [
  "Monthly contracts (cancel anytime with 15-day notice)",
  "99.9% uptime SLA",
  "Secure, compliant data processing"
];
