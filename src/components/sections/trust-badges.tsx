"use client";

import { motion } from "framer-motion";

export function TrustBadges() {
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
}