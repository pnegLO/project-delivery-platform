"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Project } from "@/lib/types"
import { Calendar, Clock, Users } from "lucide-react"
import Image from "next/image"

interface ProjectCardProps {
  project: Project;
  onPasswordPrompt: (projectSlug: string) => void;
}

export function ProjectCard({ project, onPasswordPrompt }: ProjectCardProps) {
  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-blue-500';
      case 'planning':
        return 'bg-yellow-500';
      case 'on_hold':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
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

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white/80 backdrop-blur-sm">
      <div className="relative overflow-hidden rounded-t-lg">
        {project.coverImage ? (
          <div className="relative h-48 w-full bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-white/90 text-gray-700">
                {getStatusText(project.status)}
              </Badge>
            </div>
          </div>
        ) : (
          <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="text-4xl font-bold text-blue-200">{project.title.charAt(0)}</div>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {project.title}
          </CardTitle>
          <div className="flex items-center ml-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
          </div>
        </div>
        <CardDescription className="text-gray-600 line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{project.client}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(project.endDate).toLocaleDateString('zh-CN')}</span>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <div className="text-xs text-gray-500">
            进度: {project.progress}%
          </div>

          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{project.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          className="w-full group-hover:bg-blue-600 transition-colors" 
          onClick={() => onPasswordPrompt(project.slug)}
        >
          输入密码查看项目
        </Button>
      </CardFooter>
    </Card>
  );
}