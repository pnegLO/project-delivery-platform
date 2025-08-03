"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Filter, X, Sparkles, ArrowRight } from "lucide-react"

interface PageHeaderProps {
  searchTerm: string;
  selectedTags: string[];
  availableTags: string[];
  onSearchChange: (value: string) => void;
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
}

export function PageHeader({ 
  searchTerm, 
  selectedTags, 
  availableTags, 
  onSearchChange, 
  onTagToggle, 
  onClearFilters 
}: PageHeaderProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="relative">
      {/* Hero Background with animated gradient */}
      <div className="absolute inset-0 gradient-mesh opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float blur-xl" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-blue-400/20 rounded-full animate-float animation-delay-2000 blur-xl" />
      <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-purple-400/20 rounded-full animate-float animation-delay-4000 blur-xl" />

      <header className="relative z-10 glass-effect-dark border-b border-white/10">
        <div className="container mx-auto px-6 py-12">
          {/* Navigation */}
          <nav className={`flex items-center justify-between mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">ProjectHub</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white/80 hover:text-white transition-colors duration-300 font-medium">关于</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors duration-300 font-medium">联系</a>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm">
                登录
              </Button>
            </div>
          </nav>

          {/* Hero Section */}
          <div className={`text-center mb-16 transition-all duration-1200 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              项目交付
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-glow">
                展示平台
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              为客户打造的现代化项目展示平台，优雅呈现项目进度、技术文档和交付成果
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2 text-white/60">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm">实时更新</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse animation-delay-1000" />
                <span className="text-sm">安全访问</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-2000" />
                <span className="text-sm">现代设计</span>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className={`max-w-4xl mx-auto transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="glass-effect rounded-2xl p-8 border border-white/20">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <Input
                    placeholder="搜索项目名称、技术栈或客户..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-blue-400/20 h-12 text-lg"
                  />
                </div>
                
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 h-12 px-8 font-semibold transition-all duration-300 hover:scale-105">
                  <ArrowRight className="w-5 h-5 ml-2" />
                  搜索项目
                </Button>
              </div>

              {/* Tags Filter */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center space-x-3 mb-4">
                  <Filter className="w-5 h-5 text-white/60" />
                  <span className="text-white/80 font-medium">技术标签筛选:</span>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {availableTags.map((tag, index) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                        selectedTags.includes(tag)
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 animate-glow"
                          : "border-white/30 text-white/80 hover:bg-white/10 hover:border-white/50"
                      }`}
                      onClick={() => onTagToggle(tag)}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {tag}
                    </Badge>
                  ))}
                  {selectedTags.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClearFilters}
                      className="text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                    >
                      <X className="w-4 h-4 mr-1" />
                      清除筛选
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}