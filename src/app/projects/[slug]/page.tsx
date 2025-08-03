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
  Code,
  Star,
  Zap,
  TrendingUp,
  Shield,
  Globe,
  Github,
  Eye,
  ChevronRight
} from "lucide-react"
import projectsData from "@/data/projects.json"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface ProjectDetailPageProps {
  params: {
    slug: string
  }
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const router = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const project = projectsData.projects.find(p => p.slug === params.slug) as Project

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
            <Circle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">项目不存在</h1>
          <p className="text-gray-400 mb-6">请检查项目链接是否正确</p>
          <Button onClick={() => router.push("/")} className="bg-gradient-to-r from-blue-500 to-purple-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回首页
          </Button>
        </div>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case 'in_progress':
        return <PlayCircle className="w-6 h-6 text-blue-500" />
      default:
        return <Circle className="w-6 h-6 text-gray-400" />
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Hero Header */}
      <div className="relative">
        <div className={`absolute inset-0 bg-gradient-to-br ${getStatusColor(project.status)} opacity-20`} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full animate-float blur-xl" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-blue-400/10 rounded-full animate-float animation-delay-2000 blur-xl" />
        
        <div className="relative z-10 container mx-auto px-6 py-8">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button 
              variant="ghost" 
              onClick={() => router.push("/")}
              className="text-white/80 hover:text-white hover:bg-white/10 backdrop-blur-sm mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回项目列表
            </Button>

            <div className="flex flex-col lg:flex-row lg:items-center gap-8 mb-12">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <Badge className={`bg-gradient-to-r ${getStatusColor(project.status)} text-white border-0 shadow-lg`}>
                    {project.status === 'completed' ? <Star className="w-4 h-4 mr-1" /> :
                     project.status === 'in_progress' ? <Zap className="w-4 h-4 mr-1" /> :
                     <TrendingUp className="w-4 h-4 mr-1" />}
                    {project.status === 'completed' ? '已完成' :
                     project.status === 'in_progress' ? '进行中' :
                     project.status === 'planning' ? '规划中' : '暂停'}
                  </Badge>
                  <div className="flex items-center space-x-2 text-white/60">
                    <Users className="w-4 h-4" />
                    <span>{project.client}</span>
                  </div>
                </div>
                
                <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
                  {project.title}
                </h1>
                <p className="text-xl text-white/80 max-w-3xl leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex items-center space-x-6 mt-6">
                  <div className="flex items-center space-x-2 text-white/60">
                    <Calendar className="w-5 h-5" />
                    <span>交付: {new Date(project.endDate).toLocaleDateString('zh-CN')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/60">
                    <Clock className="w-5 h-5" />
                    <span>进度: {project.progress}%</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-80">
                <div className="glass-effect-dark rounded-2xl p-6 border border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white/80 font-medium">项目进度</span>
                    <span className="text-2xl font-bold text-white">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-3 mb-4" />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{project.milestones.filter(m => m.status === 'completed').length}</div>
                      <div className="text-white/60">已完成里程碑</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{project.milestones.length}</div>
                      <div className="text-white/60">总里程碑</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Overview */}
            <Card className={`glass-effect-dark border-white/10 shadow-2xl transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Eye className="w-6 h-6 mr-3 text-blue-400" />
                  项目概述
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-white/80">
                <div>
                  <h4 className="font-semibold text-white mb-3 flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                    项目背景
                  </h4>
                  <p className="leading-relaxed">{project.overview.background}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3 flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                    项目目标
                  </h4>
                  <ul className="space-y-2">
                    {project.overview.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3 flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2" />
                    交付成果
                  </h4>
                  <ul className="space-y-2">
                    {project.overview.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Star className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Project Milestones */}
            <Card className={`glass-effect-dark border-white/10 shadow-2xl transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-green-400" />
                  项目里程碑
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.milestones.map((milestone, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300">
                        {getStatusIcon(milestone.status)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-white">{milestone.name}</h4>
                            <ChevronRight className="w-4 h-4 text-white/40" />
                          </div>
                          <div className="text-sm text-white/60">
                            {milestone.completedDate 
                              ? `完成于 ${new Date(milestone.completedDate).toLocaleDateString('zh-CN')}`
                              : `计划 ${new Date(milestone.dueDate).toLocaleDateString('zh-CN')}`
                            }
                          </div>
                        </div>
                      </div>
                      {index < project.milestones.length - 1 && (
                        <div className="w-px h-4 bg-white/20 ml-7 mt-2" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Demos */}
            {project.demos.length > 0 && (
              <Card className={`glass-effect-dark border-white/10 shadow-2xl transition-all duration-1000 delay-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Video className="w-6 h-6 mr-3 text-pink-400" />
                    项目演示
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {project.demos.map((demo, index) => (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-white flex items-center">
                          <Globe className="w-5 h-5 mr-2 text-pink-400" />
                          {demo.title}
                        </h4>
                        <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
                      </div>
                      <p className="text-white/60 text-sm mb-4">{demo.description}</p>
                      {demo.type === 'iframe' || demo.type === 'video' ? (
                        <div className="aspect-video rounded-xl overflow-hidden bg-black/20 border border-white/10">
                          <iframe 
                            src={demo.url} 
                            className="w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
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

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <Card className={`glass-effect-dark border-white/10 shadow-2xl transition-all duration-1000 delay-400 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <Code className="w-5 h-5 mr-2 text-blue-400" />
                  技术栈
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, index) => (
                    <Badge key={index} className="bg-white/10 text-white border-white/20 hover:bg-white/20 transition-colors">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project Documents */}
            {project.documents.length > 0 && (
              <Card className={`glass-effect-dark border-white/10 shadow-2xl transition-all duration-1000 delay-600 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-green-400" />
                    项目文档
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {project.documents.map((doc, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="w-full justify-start border-white/20 text-white hover:bg-white/10 group" 
                      asChild
                    >
                      <a href={doc.file} target="_blank" rel="noopener noreferrer">
                        <FileText className="w-4 h-4 mr-3 text-green-400" />
                        <span className="flex-1 text-left">{doc.title}</span>
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Downloads */}
            {project.downloads.length > 0 && (
              <Card className={`glass-effect-dark border-white/10 shadow-2xl transition-all duration-1000 delay-800 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <Download className="w-5 h-5 mr-2 text-purple-400" />
                    文件下载
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {project.downloads.map((download, index) => (
                    <div key={index} className="group p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getDownloadIcon(download.icon)}
                          <div>
                            <div className="font-medium text-white text-sm">{download.name}</div>
                            <div className="text-xs text-white/60">{download.description}</div>
                          </div>
                        </div>
                        <div className="text-xs text-white/40">{download.size}</div>
                      </div>
                      <Button 
                        size="sm" 
                        className={`w-full bg-gradient-to-r ${getStatusColor(project.status)} hover:opacity-90 transition-opacity`}
                        asChild
                      >
                        <a href={download.url} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 mr-2" />
                          下载文件
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