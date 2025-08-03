"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Lock, ArrowLeft, Shield, Eye, EyeOff, Sparkles, Users, Calendar } from "lucide-react"
import projectsData from "@/data/projects.json"
import { Project } from "@/lib/types"

interface ProjectAuthPageProps {
  params: {
    slug: string
  }
}

export default function ProjectAuthPage({ params }: ProjectAuthPageProps) {
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  const project = projectsData.projects.find(p => p.slug === params.slug) as Project

  useEffect(() => {
    setIsVisible(true)
  }, [])

  if (!project) {
    router.push("/")
    return null
  }

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-emerald-600';
      case 'in_progress':
        return 'from-blue-500 to-cyan-600';
      case 'planning':
        return 'from-yellow-500 to-orange-600';
      case 'on_hold':
        return 'from-red-500 to-pink-600';
      default:
        return 'from-gray-500 to-slate-600';
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/verify-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: params.slug,
          password,
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push(`/projects/${params.slug}`)
      } else {
        setError("密码错误，请重试")
      }
    } catch (error) {
      setError("验证失败，请重试")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getStatusColor(project.status)} opacity-10`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.08),transparent_50%)]" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full animate-float blur-xl" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-blue-400/10 rounded-full animate-float animation-delay-2000 blur-xl" />
      <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-purple-400/10 rounded-full animate-float animation-delay-4000 blur-xl" />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Back Button */}
        <div className={`mb-8 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <Button 
            variant="ghost" 
            onClick={() => router.push("/")}
            className="text-white/60 hover:text-white hover:bg-white/10 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </div>

        {/* Main Card */}
        <Card className={`glass-effect-dark border-white/10 shadow-2xl transition-all duration-1200 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 animate-glow">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              项目访问验证
            </CardTitle>
            <CardDescription className="text-white/60 text-lg">
              请输入访问密码查看项目详情
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Project Preview */}
            <div className="p-6 glass-effect rounded-xl border border-white/10">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getStatusColor(project.status)} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-lg mb-2 truncate">{project.title}</h3>
                  <p className="text-white/70 text-sm mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex items-center space-x-4 text-white/50 text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{project.client}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(project.endDate).toLocaleDateString('zh-CN')}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Badge className={`bg-gradient-to-r ${getStatusColor(project.status)} text-white border-0 text-xs`}>
                      {project.status === 'completed' ? '已完成' :
                       project.status === 'in_progress' ? '进行中' :
                       project.status === 'planning' ? '规划中' : '暂停'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Password Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-white/80 text-sm font-medium">项目访问密码</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="请输入项目访问密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-blue-400 focus:ring-blue-400/20 h-12 text-lg pr-12"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-10 w-10 text-white/60 hover:text-white hover:bg-white/10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert className="border-red-500/20 bg-red-500/10 backdrop-blur-sm">
                  <Shield className="w-4 h-4 text-red-400" />
                  <AlertDescription className="text-red-300">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className={`w-full h-12 text-lg font-semibold bg-gradient-to-r ${getStatusColor(project.status)} hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
                disabled={isLoading || !password.trim()}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>验证中...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4" />
                    <span>访问项目</span>
                  </div>
                )}
              </Button>
            </form>

            {/* Info Footer */}
            <div className="pt-6 border-t border-white/10 text-center">
              <p className="text-white/40 text-sm">
                🔒 访问密码由项目负责人提供
              </p>
              <p className="text-white/30 text-xs mt-2">
                系统将验证您的访问权限，确保项目信息安全
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className={`mt-8 text-center transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <div className="glass-effect-dark rounded-xl p-4 border border-white/10">
            <div className="flex items-center justify-center space-x-2 text-white/60 text-sm">
              <Shield className="w-4 h-4" />
              <span>此平台采用加密传输，保护您的访问安全</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}