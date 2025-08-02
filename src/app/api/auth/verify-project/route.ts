import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import projectsData from '@/data/projects.json'

export async function POST(request: NextRequest) {
  try {
    const { slug, password } = await request.json()

    if (!slug || !password) {
      return NextResponse.json(
        { success: false, message: '缺少必要参数' },
        { status: 400 }
      )
    }

    const project = projectsData.projects.find(p => p.slug === slug)

    if (!project) {
      return NextResponse.json(
        { success: false, message: '项目不存在' },
        { status: 404 }
      )
    }

    if (password !== project.accessKey) {
      return NextResponse.json(
        { success: false, message: '密码错误' },
        { status: 401 }
      )
    }

    const cookieStore = cookies()
    
    const response = NextResponse.json({ success: true })
    
    response.cookies.set(`project-access-${slug}`, project.accessKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { success: false, message: '服务器错误' },
      { status: 500 }
    )
  }
}