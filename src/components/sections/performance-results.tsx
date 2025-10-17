"use client";

import { motion } from "framer-motion";
import { 
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiMail
} from "react-icons/fi";

export function PerformanceResults() {
  const metrics = [
    {
      value: "99.9%",
      label: "Delivery Rate",
      description: "Average inbox placement across major providers",
      icon: FiCheckCircle
    },
    {
      value: "<1s",
      label: "Processing Time",
      description: "Average email processing and routing time",
      icon: FiClock
    },
    {
      value: "10M+",
      label: "Daily Volume",
      description: "Emails delivered successfully per day",
      icon: FiMail
    },
    {
      value: "45%",
      label: "Open Rate",
      description: "Average open rate across all campaigns",
      icon: FiTrendingUp
    }
  ];

  const testimonial = {
    quote: "SendingOps helped us achieve a 99.8% delivery rate for our cold email campaigns, resulting in 3x more responses and meetings booked.",
    author: "Sarah Chen",
    role: "Head of Growth",
    company: "TechScale.io"
  };

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Performance & Results</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Industry-leading email delivery metrics that drive business results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-lg bg-background shadow-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mx-auto mb-4">
                <metric.icon className="h-6 w-6" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{metric.value}</div>
              <div className="font-semibold mb-2">{metric.label}</div>
              <p className="text-sm text-muted-foreground">{metric.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="max-w-3xl mx-auto text-center bg-background rounded-lg p-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-xl md:text-2xl italic mb-6">"{testimonial.quote}"</div>
          <div className="font-semibold">{testimonial.author}</div>
          <div className="text-muted-foreground">
            {testimonial.role}, {testimonial.company}
          </div>
        </motion.div>
      </div>
    </section>
  );
}