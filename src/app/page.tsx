"use client"

import { useState, useMemo } from "react"
import { ProjectCard } from "@/components/project-card"
import { PageHeader } from "@/components/page-header"
import { Project } from "@/lib/types"
import projectsData from "@/data/projects.json"

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [passwordProject, setPasswordProject] = useState<string | null>(null)

  const projects = projectsData.projects as Project[]

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
        project.client.toLowerCase().includes(searchTerm.toLowerCase())
      
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
    setPasswordProject(projectSlug)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <PageHeader
        searchTerm={searchTerm}
        selectedTags={selectedTags}
        availableTags={availableTags}
        onSearchChange={setSearchTerm}
        onTagToggle={handleTagToggle}
        onClearFilters={handleClearFilters}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              项目列表
              <span className="ml-2 text-lg text-gray-500">({filteredProjects.length})</span>
            </h2>
            <div className="text-sm text-gray-500">
              {selectedTags.length > 0 && `已选择 ${selectedTags.length} 个标签`}
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">未找到匹配的项目</h3>
            <p className="text-gray-500">请尝试调整搜索条件或清除筛选器</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onPasswordPrompt={handlePasswordPrompt}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2023 项目交付平台. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}