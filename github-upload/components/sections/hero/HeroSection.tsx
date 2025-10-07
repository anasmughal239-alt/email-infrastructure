'use client';

import { motion } from 'framer-motion';
import Button from '@/components/shared/Button';

const HeroSection = (): JSX.Element => {
  return (
    <section className="relative py-20 overflow-hidden">
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
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Simplify Your Email Infrastructure
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Build, deploy, and scale your email services with our powerful infrastructure platform. Get started in minutes.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button size="lg">
                Get Started Free
              </Button>
              <Button variant="outline" size="lg">
                View Demo
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