"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FiCheck } from "react-icons/fi";

export function PricingPreview() {
  const plans = [
    {
      name: "Startup",
      price: "$499",
      period: "/month",
      description: "Perfect for growing businesses sending up to 100k emails/month",
      features: [
        "Dedicated PowerMTA instance",
        "2 Warmed-up IPs",
        "SPF, DKIM & DMARC setup",
        "Basic bounce management",
        "Email authentication",
        "24/7 monitoring",
        "Standard support"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      price: "$999",
      period: "/month",
      description: "Ideal for businesses sending up to 500k emails/month",
      features: [
        "Everything in Startup, plus:",
        "5 Warmed-up IPs",
        "Advanced bounce handling",
        "Custom routing rules",
        "Dedicated IP warmup",
        "Real-time analytics",
        "Priority support"
      ],
      cta: "Talk to Sales",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For high-volume senders with custom requirements",
      features: [
        "Everything in Professional, plus:",
        "10+ Warmed-up IPs",
        "Custom PowerMTA config",
        "Advanced IP rotation",
        "Custom suppression lists",
        "Dedicated account manager",
        "24/7 premium support"
      ],
      cta: "Contact Us",
      popular: false
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your email infrastructure needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`p-8 rounded-lg ${
                plan.popular 
                  ? "bg-primary text-primary-foreground shadow-lg relative" 
                  : "bg-background shadow-lg"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-background text-sm font-semibold text-primary px-3 py-1 rounded-full shadow-sm">
                    Most Popular
                  </div>
                </div>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className={`ml-1 ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-sm ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <FiCheck className={`w-5 h-5 mr-3 flex-shrink-0 ${
                      plan.popular ? "text-primary-foreground" : "text-primary"
                    }`} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  plan.popular 
                    ? "bg-background text-primary hover:bg-background/90" 
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}