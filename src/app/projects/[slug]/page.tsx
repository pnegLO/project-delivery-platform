"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Project } from "@/lib/types"
import { 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle, 
  Circle, 
  PlayCircle,
  Download,
  ExternalLink,
  ArrowLeft,
  FileText,
  Video,
  Code
} from "lucide-react"
import projectsData from "@/data/projects.json"
import { useRouter } from "next/navigation"

interface ProjectDetailPageProps {
  params: {
    slug: string
  }
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const router = useRouter()
  const project = projectsData.projects.find(p => p.slug === params.slug) as Project

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">项目不存在</h1>
          <Button onClick={() => router.push("/")} className="mt-4">
            返回首页
          </Button>
        </div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'in_progress':
        return <PlayCircle className="w-5 h-5 text-blue-500" />
      default:
        return <Circle className="w-5 h-5 text-gray-400" />
    }
  }

  const getDownloadIcon = (icon: string) => {
    switch (icon) {
      case 'code':
        return <Code className="w-5 h-5" />
      case 'server':
        return <Download className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <Button 
            variant="ghost" 
            onClick={() => router.push("/")}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600">
                      {project.description}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {project.status === 'completed' ? '已完成' : 
                     project.status === 'in_progress' ? '进行中' : 
                     project.status === 'planning' ? '规划中' : '暂停'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">客户</div>
                      <div className="font-medium">{project.client}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">交付日期</div>
                      <div className="font-medium">
                        {new Date(project.endDate).toLocaleDateString('zh-CN')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">项目进度</div>
                      <div className="font-medium">{project.progress}%</div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>整体进度</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-3" />
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <CardHeader>
                <CardTitle>项目概述</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">项目背景</h4>
                  <p className="text-gray-600">{project.overview.background}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">项目目标</h4>
                  <ul className="space-y-1">
                    {project.overview.objectives.map((objective, index) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">交付成果</h4>
                  <ul className="space-y-1">
                    {project.overview.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-600">
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <CardHeader>
                <CardTitle>项目里程碑</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50/80">
                      {getStatusIcon(milestone.status)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{milestone.name}</h4>
                          <div className="text-sm text-gray-500">
                            {milestone.completedDate 
                              ? `完成于 ${new Date(milestone.completedDate).toLocaleDateString('zh-CN')}`
                              : `计划 ${new Date(milestone.dueDate).toLocaleDateString('zh-CN')}`
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {project.demos.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
                <CardHeader>
                  <CardTitle>项目演示</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.demos.map((demo, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{demo.title}</h4>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{demo.description}</p>
                      {demo.type === 'iframe' ? (
                        <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                          <iframe 
                            src={demo.url} 
                            className="w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                          />
                        </div>
                      ) : demo.type === 'video' ? (
                        <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                          <iframe 
                            src={demo.url} 
                            className="w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <Button variant="outline" asChild>
                          <a href={demo.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            访问演示
                          </a>
                        </Button>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
              <CardHeader>
                <CardTitle>技术栈</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <Badge key={index} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {project.documents.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
                <CardHeader>
                  <CardTitle>项目文档</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.documents.map((doc, index) => (
                    <Button key={index} variant="outline" className="w-full justify-start" asChild>
                      <a href={doc.file} target="_blank" rel="noopener noreferrer">
                        <FileText className="w-4 h-4 mr-2" />
                        {doc.title}
                      </a>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            )}

            {project.downloads.length > 0 && (
              <Card className="bg-white/80 backdrop-blur-sm shadow-lg border-0">
                <CardHeader>
                  <CardTitle>文件下载</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.downloads.map((download, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getDownloadIcon(download.icon)}
                          <div>
                            <div className="font-medium text-sm">{download.name}</div>
                            <div className="text-xs text-gray-500">{download.description}</div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">{download.size}</div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                        <a href={download.url} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 mr-2" />
                          下载
                        </a>
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}