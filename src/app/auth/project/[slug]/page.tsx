"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, ArrowLeft } from "lucide-react"
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
  const router = useRouter()

  const project = projectsData.projects.find(p => p.slug === params.slug) as Project

  if (!project) {
    router.push("/")
    return null
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/")}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </div>

        <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              项目访问验证
            </CardTitle>
            <CardDescription className="text-gray-600">
              请输入访问密码查看项目详情
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-1">{project.title}</h3>
              <p className="text-sm text-blue-700">{project.description}</p>
              <div className="mt-2 text-xs text-blue-600">
                客户: {project.client}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="请输入项目访问密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-center"
                  autoFocus
                />
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !password.trim()}
              >
                {isLoading ? "验证中..." : "访问项目"}
              </Button>
            </form>

            <div className="mt-6 text-center text-xs text-gray-500">
              访问密码由项目负责人提供
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}