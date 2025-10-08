"use client"

import { forwardRef } from "react"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-card border border-gray-200 dark:border-gray-700 ${
          hover ? "transition-all duration-200 hover:shadow-lg" : ""
        } ${className || ""}`}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`p-6 border-b border-gray-200 dark:border-gray-700 ${className || ""}`}
        {...props}
      />
    )
  }
)
CardHeader.displayName = "CardHeader"

const CardTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={`text-lg font-semibold text-gray-900 dark:text-white ${className || ""}`}
        {...props}
      />
    )
  }
)
CardTitle.displayName = "CardTitle"

const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={`text-sm text-gray-500 dark:text-gray-400 ${className || ""}`}
        {...props}
      />
    )
  }
)
CardDescription.displayName = "CardDescription"

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`p-6 ${className || ""}`}
        {...props}
      />
    )
  }
)
CardContent.displayName = "CardContent"

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`p-6 border-t border-gray-200 dark:border-gray-700 ${className || ""}`}
        {...props}
      />
    )
  }
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
