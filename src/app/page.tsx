'use client';

import { motion } from 'framer-motion';
import { FiSettings, FiMail, FiBarChart, FiLink, FiCheck, FiArrowRight, FiStar, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useState } from 'react';

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Scale your outreach with <span className="text-primary">pre-warmed mailboxes</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Get instant access to pre-warmed Gmail and Microsoft inboxes with automated DNS setup. Start sending high-converting cold emails in minutes, not weeks.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-colors duration-300 flex items-center justify-center gap-2">
                Start Free Trial
                <FiArrowRight className="h-5 w-5" />
              </button>
              <button className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
                Watch Demo
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-2xl mx-auto">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur shadow-2xl border border-primary/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📧</div>
                    <p className="text-muted-foreground font-medium">Cold Email Dashboard</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Trust Badges Section
const TrustBadges = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold text-primary">35K+</div>
              <div className="text-muted-foreground">Trusted by businesses</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold text-primary">500K+</div>
              <div className="text-muted-foreground">Mailboxes created</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-3xl font-bold text-primary">99.9%</div>
              <div className="text-muted-foreground">Uptime guarantee</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Features Grid Section
const FeaturesGrid = () => {
  const features = [
    {
      icon: FiSettings,
      title: 'Auto DNS Setup',
      description: 'Automated SPF, DKIM, and DMARC configuration for maximum deliverability.',
      illustration: '🔧'
    },
    {
      icon: FiMail,
      title: 'Pre-warmed Mailboxes',
      description: 'Instant access to warmed Gmail and Microsoft inboxes with high reputation.',
      illustration: '📧'
    },
    {
      icon: FiBarChart,
      title: 'Deliverability Monitoring',
      description: 'Real-time insights into sender reputation and email performance.',
      illustration: '📊'
    },
    {
      icon: FiLink,
      title: 'Tool Integrations',
      description: 'Connect with 50+ outreach tools like Lemlist, Instantly, and Reply.io.',
      illustration: '🔗'
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to scale</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From setup to sending, we handle the technical complexity so you can focus on results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card hover:shadow-lg transition-all duration-300 group text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">{feature.illustration}</div>
              <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 w-fit mx-auto mb-4">
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
};

// How It Works Section
const HowItWorks = () => {
  const steps = [
    {
      step: '1',
      title: 'Connect Domain',
      description: 'Add your domain and we automatically configure SPF, DKIM, and DMARC records.',
      icon: FiSettings
    },
    {
      step: '2',
      title: 'Provision Mailboxes',
      description: 'Choose from pre-warmed Gmail or Microsoft accounts with established reputation.',
      icon: FiMail
    },
    {
      step: '3',
      title: 'Start Sending',
      description: 'Connect your favorite outreach tool and start sending high-deliverability emails.',
      icon: FiArrowRight
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes with our simple 3-step process.
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
};

// Pricing Preview Section
const PricingPreview = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small teams getting started',
      features: ['5 pre-warmed mailboxes', 'Basic DNS setup', 'Email support'],
      popular: false
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'Best for growing businesses',
      features: ['25 pre-warmed mailboxes', 'Advanced DNS setup', 'Priority support', 'Integrations'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$299',
      period: '/month',
      description: 'For large-scale operations',
      features: ['100+ pre-warmed mailboxes', 'Custom DNS setup', '24/7 support', 'All integrations'],
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your outreach needs. All plans include our core features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`card hover:shadow-xl transition-all duration-300 relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <FiCheck className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold transition-colors duration-300 ${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'}`}>
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <button className="text-primary hover:underline font-medium">
            View detailed pricing →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

// Testimonials Carousel
const TestimonialsCarousel = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      role: 'Head of Sales',
      content: 'EmailInfra helped us scale from 100 to 10,000 cold emails per day with 95% deliverability. The pre-warmed mailboxes are a game-changer.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      company: 'Growth Agency',
      role: 'Founder',
      content: 'The automated DNS setup saved us weeks of technical work. We were sending high-converting emails within hours of signing up.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      company: 'SaaS Startup',
      role: 'Marketing Director',
      content: 'Best investment we made for our outreach. The deliverability insights help us optimize our campaigns in real-time.',
      rating: 5
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by thousands of businesses</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our customers say about scaling their outreach with EmailInfra.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="card text-center p-8"
            key={currentTestimonial}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-4">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <FiStar key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-lg md:text-xl mb-6 italic">
              "{testimonials[currentTestimonial].content}"
            </blockquote>
            <div>
              <div className="font-semibold">{testimonials[currentTestimonial].name}</div>
              <div className="text-muted-foreground">
                {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ Accordion
const FAQAccordion = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How quickly can I start sending emails?',
      answer: 'You can start sending emails within 5 minutes of signing up. Our automated DNS setup and pre-warmed mailboxes mean no waiting period.'
    },
    {
      question: 'What is a pre-warmed mailbox?',
      answer: 'A pre-warmed mailbox is an email account that has been gradually conditioned to send emails, building up sender reputation over time. This ensures high deliverability from day one.'
    },
    {
      question: 'Do you support custom domains?',
      answer: 'Yes, we support custom domains and automatically configure all necessary DNS records (SPF, DKIM, DMARC) for optimal deliverability.'
    },
    {
      question: 'Which outreach tools do you integrate with?',
      answer: 'We integrate with 50+ popular tools including Lemlist, Instantly, Reply.io, Outreach, SalesLoft, and many more. Check our integrations page for the full list.'
    },
    {
      question: 'What kind of support do you offer?',
      answer: 'We offer email support for all plans, priority support for Professional plans, and 24/7 dedicated support for Enterprise customers.'
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently asked questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about EmailInfra and cold email outreach.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border-b border-border last:border-b-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full py-6 text-left flex items-center justify-between hover:text-primary transition-colors duration-300"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                {openFAQ === index ? (
                  <FiChevronUp className="h-5 w-5 text-primary" />
                ) : (
                  <FiChevronDown className="h-5 w-5" />
                )}
              </button>
              {openFAQ === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="pb-6"
                >
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main Homepage Component
export default function Home(): JSX.Element {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TrustBadges />
      <FeaturesGrid />
      <HowItWorks />
      <PricingPreview />
      <TestimonialsCarousel />
      <FAQAccordion />
    </main>
  );
}