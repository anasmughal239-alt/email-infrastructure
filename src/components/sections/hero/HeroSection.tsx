'use client';

import { motion } from 'framer-motion';
import { FiPlay, FiDollarSign } from 'react-icons/fi';
import Button from '@/components/shared/Button';

const HeroSection = (): JSX.Element => {
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Hero Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <>Send 20,000 Emails Per Day — <span className="text-primary">Done For You.</span></>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Focus on your business while we handle all setup, sending, and deliverability. Enterprise-grade email infrastructure, fully managed by experts.
            </motion.p>
            <motion.p
              className="text-lg text-gray-500 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Trusted by IPTV, SaaS, and eCommerce businesses worldwide
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button size="lg" className="flex items-center gap-2">
                <FiPlay className="w-5 h-5" />
                Book a Demo
              </Button>
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <FiDollarSign className="w-5 h-5" />
                View Pricing
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-2xl mx-auto">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur shadow-2xl">
                {/* Placeholder for actual dashboard screenshot or illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">Dashboard Preview</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 blur-3xl animate-slow-spin" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
