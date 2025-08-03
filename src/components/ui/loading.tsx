"use client"

import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
  className?: string
}

export function LoadingSpinner({ size = "md", text, className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  }

  return (
    <div className={`flex items-center justify-center space-x-2 ${className}`}>
      <Loader2 className={`animate-spin text-blue-500 ${sizeClasses[size]}`} />
      {text && (
        <span className="text-sm text-gray-600 font-medium">{text}</span>
      )}
    </div>
  )
}

interface LoadingPageProps {
  title?: string
  description?: string
}

export function LoadingPage({ title = "加载中", description = "请稍候..." }: LoadingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="text-white/60">{description}</p>
      </div>
    </div>
  )
}

interface LoadingCardProps {
  className?: string
}

export function LoadingCard({ className = "" }: LoadingCardProps) {
  return (
    <div className={`glass-effect-dark border-white/10 rounded-xl p-6 animate-pulse ${className}`}>
      <div className="space-y-4">
        <div className="h-4 bg-white/10 rounded-md w-3/4" />
        <div className="h-3 bg-white/10 rounded-md w-1/2" />
        <div className="h-3 bg-white/10 rounded-md w-2/3" />
      </div>
    </div>
  )
}