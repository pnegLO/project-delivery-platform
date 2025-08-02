import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import projectsData from '@/data/projects.json'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/projects/')) {
    const slug = pathname.split('/')[2]
    
    if (!slug) {
      return NextResponse.next()
    }

    const project = projectsData.projects.find(p => p.slug === slug)
    
    if (!project) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    const accessToken = request.cookies.get(`project-access-${slug}`)
    
    if (!accessToken || accessToken.value !== project.accessKey) {
      const loginUrl = new URL(`/auth/project/${slug}`, request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/projects/:path*']
}