"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Settings, 
  BarChart3, 
  Users,
  FolderOpen,
  Clock,
  Star,
  Zap,
  TrendingUp
} from "lucide-react"
import projectsData from "@/data/projects.json"
import { Project } from "@/lib/types"

export default function AdminPage() {
  const [projects, setProjects] = useState<Project[]>(projectsData.projects as Project[])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return <Star className="w-4 h-4 text-green-500" />
      case 'in_progress':
        return <Zap className="w-4 h-4 text-blue-500" />
      case 'planning':
        return <TrendingUp className="w-4 h-4 text-yellow-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-emerald-600'
      case 'in_progress':
        return 'from-blue-500 to-cyan-600'
      case 'planning':
        return 'from-yellow-500 to-orange-600'
      case 'on_hold':
        return 'from-red-500 to-pink-600'
      default:
        return 'from-gray-500 to-slate-600'
    }
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setIsCreating(false)
  }

  const handleDelete = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId))
  }

  const handleSave = (project: Project) => {
    if (isCreating) {
      setProjects([...projects, { ...project, id: Date.now().toString() }])
    } else {
      setProjects(projects.map(p => p.id === project.id ? project : p))
    }
    setEditingProject(null)
    setIsCreating(false)
  }

  const handleCreateNew = () => {
    const newProject: Project = {
      id: '',
      slug: '',
      title: '',
      description: '',
      coverImage: '',
      tags: [],
      accessKey: '',
      status: 'planning',
      progress: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      techStack: [],
      client: '',
      overview: {
        background: '',
        objectives: [],
        deliverables: []
      },
      milestones: [],
      documents: [],
      downloads: [],
      demos: []
    }
    setEditingProject(newProject)
    setIsCreating(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative z-10 container mx-auto px-6 py-12">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                  <Settings className="w-8 h-8 mr-3 text-blue-400" />
                  项目管理面板
                </h1>
                <p className="text-white/60 text-lg">管理和编辑项目信息</p>
              </div>
              <Button 
                onClick={handleCreateNew}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                新建项目
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="glass-effect-dark border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm">总项目数</p>
                      <p className="text-2xl font-bold text-white">{projects.length}</p>
                    </div>
                    <FolderOpen className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-effect-dark border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm">进行中</p>
                      <p className="text-2xl font-bold text-white">
                        {projects.filter(p => p.status === 'in_progress').length}
                      </p>
                    </div>
                    <Zap className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-effect-dark border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm">已完成</p>
                      <p className="text-2xl font-bold text-white">
                        {projects.filter(p => p.status === 'completed').length}
                      </p>
                    </div>
                    <Star className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-effect-dark border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/60 text-sm">平均进度</p>
                      <p className="text-2xl font-bold text-white">
                        {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length || 0)}%
                      </p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Projects Grid */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {projects.map((project, index) => (
                <Card key={project.id} className={`glass-effect-dark border-white/10 hover:border-white/20 transition-all duration-300 animate-fade-in`} style={{ animationDelay: `${index * 100}ms` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`w-12 h-12 bg-gradient-to-r ${getStatusColor(project.status)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          {getStatusIcon(project.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-white text-lg mb-1 truncate">{project.title}</h3>
                          <p className="text-white/60 text-sm mb-2 line-clamp-2">{project.description}</p>
                          <div className="flex items-center space-x-4 text-white/50 text-sm mb-3">
                            <div className="flex items-center space-x-1">
                              <Users className="w-4 h-4" />
                              <span>{project.client}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{project.progress}%</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {project.tags.slice(0, 3).map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs border-white/30 text-white/70">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(project)}
                          className="text-white/60 hover:text-white hover:bg-white/10"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(project.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Edit Panel */}
          <div className="lg:col-span-1">
            {editingProject ? (
              <Card className="glass-effect-dark border-white/10 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    {isCreating ? '新建项目' : '编辑项目'}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingProject(null)}
                      className="text-white/60 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
                  <div>
                    <label className="text-white/80 text-sm font-medium">项目标题</label>
                    <Input
                      value={editingProject.title}
                      onChange={(e) => setEditingProject({...editingProject, title: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="text-white/80 text-sm font-medium">项目描述</label>
                    <Textarea
                      value={editingProject.description}
                      onChange={(e) => setEditingProject({...editingProject, description: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="text-white/80 text-sm font-medium">客户名称</label>
                    <Input
                      value={editingProject.client}
                      onChange={(e) => setEditingProject({...editingProject, client: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="text-white/80 text-sm font-medium">项目状态</label>
                    <Select
                      value={editingProject.status}
                      onValueChange={(value: Project['status']) => setEditingProject({...editingProject, status: value})}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">规划中</SelectItem>
                        <SelectItem value="in_progress">进行中</SelectItem>
                        <SelectItem value="completed">已完成</SelectItem>
                        <SelectItem value="on_hold">暂停</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-white/80 text-sm font-medium">项目进度 (%)</label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={editingProject.progress}
                      onChange={(e) => setEditingProject({...editingProject, progress: parseInt(e.target.value) || 0})}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="text-white/80 text-sm font-medium">访问密码</label>
                    <Input
                      value={editingProject.accessKey}
                      onChange={(e) => setEditingProject({...editingProject, accessKey: e.target.value})}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  
                  <Button
                    onClick={() => handleSave(editingProject)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    保存项目
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="glass-effect-dark border-white/10">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                    <Edit className="w-8 h-8 text-white/60" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">选择项目进行编辑</h3>
                  <p className="text-white/60 text-sm">点击项目列表中的编辑按钮开始编辑项目信息</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}