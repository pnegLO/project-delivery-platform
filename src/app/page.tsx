"use client"

import { useState, useMemo, useEffect } from "react"
import { ProjectCard } from "@/components/project-card"
import { PageHeader } from "@/components/page-header"
import { Project } from "@/lib/types"
import projectsData from "@/data/projects.json"
import { Grid3X3, List, LayoutGrid } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoaded, setIsLoaded] = useState(false)

  const projects = projectsData.projects as Project[]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const availableTags = useMemo(() => {
    const tags = new Set<string>()
    projects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [projects])

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = searchTerm === "" || 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => project.tags.includes(tag))
      
      return matchesSearch && matchesTags
    })
  }, [projects, searchTerm, selectedTags])

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setSelectedTags([])
  }

  const handlePasswordPrompt = (projectSlug: string) => {
    window.location.href = `/auth/project/${projectSlug}`
  }

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <PageHeader
        searchTerm={searchTerm}
        selectedTags={selectedTags}
        availableTags={availableTags}
        onSearchChange={setSearchTerm}
        onTagToggle={handleTagToggle}
        onClearFilters={handleClearFilters}
      />

      {/* Main Content */}
      <main className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-blue-50/30 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.08),transparent_70%)]" />
        
        <div className="relative container mx-auto px-6 py-16">
          {/* Section Header */}
          <div className={`mb-12 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-3">
                  精选项目
                  <span className="ml-3 text-lg text-gray-500 font-normal">
                    ({filteredProjects.length} 个项目)
                  </span>
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl">
                  探索我们为客户精心打造的项目案例，每个项目都代表着技术创新与设计美学的完美结合
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-lg p-1 border border-gray-200/50 shadow-sm">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="transition-all duration-200"
                  >
                    <LayoutGrid className="w-4 h-4 mr-2" />
                    网格
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="transition-all duration-200"
                  >
                    <List className="w-4 h-4 mr-2" />
                    列表
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedTags.length > 0 || searchTerm) && (
              <div className="mt-6 p-4 bg-blue-50/80 backdrop-blur-sm rounded-xl border border-blue-200/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-blue-800">
                    <span className="font-medium">当前筛选:</span>
                    {searchTerm && (
                      <span className="text-sm bg-blue-100 px-2 py-1 rounded-md">
                        搜索: "{searchTerm}"
                      </span>
                    )}
                    {selectedTags.map(tag => (
                      <span key={tag} className="text-sm bg-blue-100 px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    清除所有筛选
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Projects Grid/List */}
          {filteredProjects.length === 0 ? (
            <div className={`text-center py-20 transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <Grid3X3 className="w-12 h-12 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">暂无匹配项目</h3>
                <p className="text-gray-600 mb-6">
                  尝试调整搜索关键词或选择不同的技术标签来发现更多项目
                </p>
                <Button 
                  onClick={handleClearFilters}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  重置筛选条件
                </Button>
              </div>
            </div>
          ) : (
            <div className={`transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onPasswordPrompt={handlePasswordPrompt}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredProjects.map((project, index) => (
                    <div key={project.id} className="w-full max-w-4xl mx-auto">
                      <ProjectCard
                        project={project}
                        onPasswordPrompt={handlePasswordPrompt}
                        index={index}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Grid3X3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">ProjectHub</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              专业的项目交付平台，为客户提供透明、高效、美观的项目展示体验
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <span>&copy; 2024 ProjectHub</span>
              <span>•</span>
              <span>保留所有权利</span>
              <span>•</span>
              <span>由 ❤️ 精心打造</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}