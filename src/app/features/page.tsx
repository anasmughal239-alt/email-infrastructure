"use client";

import { motion } from "framer-motion";
import { FiMail, FiServer, FiShield, FiBarChart, FiLock, FiCode, FiHeadphones } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export default function FeaturesPage() {
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
            <h1 className="text-5xl font-bold mb-6">🚀 SendingOps Features</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Built for high-volume, high-deliverability transactional email sending.
            </p>
            <p className="text-lg text-muted-foreground">
              Deliver every message with precision. SendingOps gives you a full-stack email infrastructure — optimized, managed, and monitored for flawless delivery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card p-6 rounded-lg shadow-lg"
              >
                <div className="text-primary mb-4 text-2xl">
                  <feature.icon />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.items.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      • {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">🧩 Everything You Need — Managed For You</h2>
            <p className="text-lg text-muted-foreground mb-8">
              SendingOps isn't another email tool. It's your complete email operations partner — from setup to inbox.
              We make email delivery predictable, reliable, and profitable.
            </p>
            <Button size="lg" variant="default">
              Start Now
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

const features = [
  {
    icon: FiServer,
    title: "⚡ Smart SMTP Infrastructure",
    description: "Power your campaigns with enterprise-grade SMTP servers configured for maximum deliverability.",
    items: [
      "Dedicated & shared IP options",
      "Automatic throttling & retries",
      "Real-time performance monitoring"
    ]
  },
  {
    icon: FiMail,
    title: "📤 Managed Sending Service",
    description: "Don't worry about servers or sending limits — we handle everything.",
    items: [
      "Transactional emails",
      "Customer sign-ups",
      "Verification or onboarding messages"
    ]
  },
  {
    icon: FiBarChart,
    title: "📈 Deliverability Optimization",
    description: "Your reputation matters. We continuously analyze sender scores, engagement metrics, and feedback loops.",
    items: [
      "Bounce & complaint handling",
      "IP health and warming",
      "Reputation and blacklisting prevention"
    ]
  },
  {
    icon: FiShield,
    title: "🧠 AI-Powered Insights",
    description: "Understand your audience and performance in real time with our analytics dashboard.",
    items: [
      "Open & click tracking",
      "Deliverability reports",
      "Engagement patterns"
    ]
  },
  {
    icon: FiLock,
    title: "🔒 Security & Compliance",
    description: "SendingOps follows all major compliance standards to keep your brand safe.",
    items: [
      "Encrypted data handling",
      "Role-based access",
      "Spam trap monitoring"
    ]
  },
  {
    icon: FiCode,
    title: "⚙️ Seamless Integration",
    description: "Connect your app or CRM effortlessly with our developer-friendly API.",
    items: [
      "REST API",
      "Webhooks",
      "JSON payloads"
    ]
  },
  {
    icon: FiHeadphones,
    title: "💬 Dedicated Support",
    description: "We don't just give you a tool — we give you a team of deliverability experts.",
    items: [
      "24/7 technical support",
      "Inbox placement testing",
      "IP reputation management"
    ]
  }
];
