'use client';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// Dynamic import for framer-motion components
export const DynamicMotion = {
  div: dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.div })), {
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-200 rounded" />
  }),
  
  section: dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.section })), {
    ssr: false,
    loading: () => <section className="animate-pulse bg-gray-200 rounded" />
  }),
  
  h1: dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.h1 })), {
    ssr: false,
    loading: () => <h1 className="animate-pulse bg-gray-200 rounded h-8" />
  }),
  
  p: dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.p })), {
    ssr: false,
    loading: () => <p className="animate-pulse bg-gray-200 rounded h-4" />
  }),
  
  button: dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.button })), {
    ssr: false,
    loading: () => <button className="animate-pulse bg-gray-200 rounded" />
  })
};

// Dynamic AnimatePresence
export const DynamicAnimatePresence = dynamic(
  () => import('framer-motion').then(mod => ({ default: mod.AnimatePresence })),
  {
    ssr: false,
    loading: () => null
  }
);

// Higher-order component for dynamic motion wrapper
export function withDynamicMotion<T extends object>(
  Component: ComponentType<T>,
  motionProps?: any
) {
  return dynamic(
    () => import('framer-motion').then(mod => {
      const MotionComponent = mod.motion(Component);
      return { default: (props: T) => <MotionComponent {...motionProps} {...props} /> };
    }),
    {
      ssr: false,
      loading: () => <Component {...({} as T)} />
    }
  );
}