'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Navbar } from './navbar'
import { Footer } from './footer'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]"
    >
      <div className="relative z-10">
        <Navbar />
        {children}
        <Footer />
      </div>

      {/* Background gradient effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-gradient-primary opacity-5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-gradient-primary opacity-5 blur-3xl rounded-full" />
      </div>
    </motion.div>
  )
}
