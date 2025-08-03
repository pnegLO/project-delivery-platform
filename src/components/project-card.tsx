"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Project } from "@/lib/types"
import { 
  Calendar, 
  Clock, 
  Users, 
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Star
} from "lucide-react"
import { useState } from "react"

interface ProjectCardProps {
  project: Project;
  onPasswordPrompt: (projectSlug: string) => void;
  index: number;
}

export function ProjectCard({ project, onPasswordPrompt, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

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
  };

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'in_progress':
        return '进行中';
      case 'planning':
        return '规划中';
      case 'on_hold':
        return '暂停';
      default:
        return '未知';
    }
  };

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return <Star className="w-4 h-4" />;
      case 'in_progress':
        return <Zap className="w-4 h-4" />;
      case 'planning':
        return <TrendingUp className="w-4 h-4" />;
      default:
        return <Shield className="w-4 h-4" />;
    }
  };

  return (
    <div 
      className={`group transition-all duration-500 hover:-translate-y-2 animate-fade-in`}
      style={{ animationDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="relative overflow-hidden border-0 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getStatusColor(project.status)} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
        
        {/* Header with cover */}
        <div className="relative h-48 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${getStatusColor(project.status)} opacity-90`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Floating elements */}
          <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full animate-float blur-sm" />
          <div className="absolute bottom-8 left-6 w-8 h-8 bg-white/30 rounded-full animate-float animation-delay-2000 blur-sm" />
          
          {/* Status badge */}
          <div className="absolute top-4 left-4">
            <Badge className={`bg-gradient-to-r ${getStatusColor(project.status)} text-white border-0 shadow-lg`}>
              {getStatusIcon(project.status)}
              <span className="ml-1">{getStatusText(project.status)}</span>
            </Badge>
          </div>

          {/* Project title overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white text-xl font-bold mb-1 line-clamp-2 group-hover:scale-105 transition-transform duration-300">
              {project.title}
            </h3>
            <div className="flex items-center space-x-2 text-white/80 text-sm">
              <Users className="w-4 h-4" />
              <span>{project.client}</span>
            </div>
          </div>
        </div>

        <CardHeader className="pb-3">
          <CardDescription className="text-gray-600 line-clamp-2 leading-relaxed">
            {project.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-4">
          <div className="space-y-4">
            {/* Progress Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">项目进度</span>
                <span className="font-semibold text-gray-800">{project.progress}%</span>
              </div>
              <Progress 
                value={project.progress} 
                className={`h-2 transition-all duration-500 ${isHovered ? 'scale-105' : ''}`}
              />
            </div>

            {/* Project Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2 text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>{new Date(project.endDate).toLocaleDateString('zh-CN')}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-500">
                <Clock className="w-4 h-4" />
                <span>
                  {Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}天
                </span>
              </div>
            </div>

            {/* Tech Stack Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((tag, tagIndex) => (
                <Badge 
                  key={tagIndex} 
                  variant="outline" 
                  className="text-xs border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                >
                  {tag}
                </Badge>
              ))}
              {project.tags.length > 3 && (
                <Badge variant="outline" className="text-xs border-gray-300 text-gray-500">
                  +{project.tags.length - 3} 更多
                </Badge>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-2">
          <Button 
            className={`w-full group-hover:bg-gradient-to-r ${getStatusColor(project.status)} transition-all duration-300 hover:scale-105 hover:shadow-lg font-semibold`}
            onClick={() => onPasswordPrompt(project.slug)}
          >
            <span>查看项目详情</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </CardFooter>

        {/* Hover glow effect */}
        <div className={`absolute inset-0 rounded-lg transition-all duration-500 pointer-events-none ${
          isHovered ? `shadow-2xl shadow-blue-500/20` : ''
        }`} />
      </Card>
    </div>
  );
}