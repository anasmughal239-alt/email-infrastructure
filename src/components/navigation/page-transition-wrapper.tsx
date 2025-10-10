"use client"

import { useEffect, useState, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { PageSkeleton } from '@/components/loading/page-skeleton'

interface PageTransitionWrapperProps {
  children: React.ReactNode
}

function PageTransitionContent({ children }: PageTransitionWrapperProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [pageType, setPageType] = useState('default')
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const getPageType = (path: string) => {
    if (path.startsWith('/dashboard')) return 'dashboard'
    if (path.startsWith('/tools')) return 'tools'
    if (path.startsWith('/pricing')) return 'pricing'
    if (path.startsWith('/blog')) return 'blog'
    return 'default'
  }

  useEffect(() => {
    const newPageType = getPageType(pathname)
    setPageType(newPageType)
    
    // Show loading for a brief moment to demonstrate the skeleton
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800) // Longer duration to see the skeleton effect

    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="min-h-screen"
        >
          <PageSkeleton type={pageType as any} />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function PageTransitionWrapper({ children }: PageTransitionWrapperProps) {
  return (
    <Suspense fallback={<PageSkeleton type="default" />}>
      <PageTransitionContent>{children}</PageTransitionContent>
    </Suspense>
  )
}
