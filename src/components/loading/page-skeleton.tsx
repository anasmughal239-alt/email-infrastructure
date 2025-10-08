"use client"

import { Skeleton } from "@/components/ui/skeleton"

interface PageSkeletonProps {
  type?: 'default' | 'dashboard' | 'tools' | 'pricing' | 'blog'
}

export function PageSkeleton({ type = 'default' }: PageSkeletonProps) {
  switch (type) {
    case 'dashboard':
      return <DashboardSkeleton />
    case 'tools':
      return <ToolsSkeleton />
    case 'pricing':
      return <PricingSkeleton />
    case 'blog':
      return <BlogSkeleton />
    default:
      return <DefaultSkeleton />
  }
}

function DefaultSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section Skeleton */}
      <div className="text-center mb-16">
        <Skeleton className="h-12 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
        <div className="flex justify-center gap-4">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
      
      {/* Content Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-6 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-8 w-12" />
              </div>
              <Skeleton className="h-12 w-12 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Skeleton className="h-96 w-full rounded-lg" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>
      </div>
    </div>
  )
}

function ToolsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <Skeleton className="h-10 w-96 mx-auto mb-4" />
        <Skeleton className="h-6 w-2/3 mx-auto" />
      </div>
      
      {/* Tool Form */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="bg-card rounded-lg border p-8">
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-12 w-32" />
        </div>
      </div>
      
      {/* Results Area */}
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    </div>
  )
}

function PricingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-16">
        <Skeleton className="h-12 w-64 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>
      
      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-8">
            <Skeleton className="h-6 w-24 mb-4" />
            <Skeleton className="h-12 w-32 mb-6" />
            <div className="space-y-3 mb-8">
              {Array.from({ length: 5 }).map((_, j) => (
                <Skeleton key={j} className="h-4 w-full" />
              ))}
            </div>
            <Skeleton className="h-12 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

function BlogSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <Skeleton className="h-10 w-48 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>
      
      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
