"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, RefreshCw, Frown } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.08),transparent_50%)]" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full animate-float blur-xl" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-blue-400/10 rounded-full animate-float animation-delay-2000 blur-xl" />
      <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-purple-400/10 rounded-full animate-float animation-delay-4000 blur-xl" />

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <div className="mb-8 animate-fade-in">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center animate-glow">
            <Frown className="w-16 h-16 text-white" />
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-3xl font-bold text-white/90 mb-4">页面未找到</h2>
          <p className="text-xl text-white/60 mb-8 max-w-lg mx-auto leading-relaxed">
            抱歉，您访问的页面不存在。可能是链接已失效或页面已被移动。
          </p>
        </div>

        <div className="space-y-4 animate-slide-up">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => router.push("/")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 h-12 px-8 font-semibold transition-all duration-300 hover:scale-105"
            >
              <Home className="w-5 h-5 mr-2" />
              返回首页
            </Button>
            
            <Button 
              onClick={() => router.back()}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm h-12 px-8 font-semibold"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              返回上页
            </Button>
            
            <Button 
              onClick={() => window.location.reload()}
              variant="ghost"
              className="text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm h-12 px-8 font-semibold"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              刷新页面
            </Button>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-12 p-6 glass-effect-dark rounded-xl border border-white/10 animate-fade-in animation-delay-1000">
          <h3 className="text-lg font-semibold text-white mb-3">需要帮助？</h3>
          <p className="text-white/60 text-sm mb-4">
            如果您认为这是一个错误，请联系我们的技术支持团队。
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-xs bg-white/10 text-white/70 px-2 py-1 rounded-md">错误代码: 404</span>
            <span className="text-xs bg-white/10 text-white/70 px-2 py-1 rounded-md">页面不存在</span>
          </div>
        </div>
      </div>
    </div>
  )
}