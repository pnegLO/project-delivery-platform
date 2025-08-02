"use client"

import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Filter, X } from "lucide-react"

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
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">项目交付平台</h1>
              <p className="text-gray-600 mt-2">客户项目展示与交付管理系统</p>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">关于</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">联系</a>
            </nav>
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="搜索项目名称或描述..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-white/90"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">标签筛选:</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer hover:bg-blue-100 transition-colors"
                onClick={() => onTagToggle(tag)}
              >
                {tag}
              </Badge>
            ))}
            {selectedTags.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4 mr-1" />
                清除筛选
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}