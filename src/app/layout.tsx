import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: {
    default: 'ProjectHub - 现代项目交付平台',
    template: '%s | ProjectHub'
  },
  description: '面向客户的现代化项目展示平台，优雅呈现项目进度、技术文档和交付成果',
  keywords: ['项目管理', '项目展示', '客户交付', '进度跟踪', '技术文档'],
  authors: [{ name: 'ProjectHub Team' }],
  creator: 'ProjectHub',
  publisher: 'ProjectHub',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://project-delivery-platform.vercel.app',
    title: 'ProjectHub - 现代项目交付平台',
    description: '面向客户的现代化项目展示平台，优雅呈现项目进度、技术文档和交付成果',
    siteName: 'ProjectHub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ProjectHub - 现代项目交付平台',
    description: '面向客户的现代化项目展示平台，优雅呈现项目进度、技术文档和交付成果',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#667eea" />
        <meta name="msapplication-TileColor" content="#667eea" />
      </head>
      <body className="font-inter antialiased min-h-screen">
        <div id="app-root" className="relative">
          {children}
        </div>
        
        {/* Global Loading Overlay */}
        <div id="loading-overlay" className="fixed inset-0 z-50 hidden">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
              <p className="text-white text-lg font-medium">加载中...</p>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          id="scroll-to-top"
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg opacity-0 invisible transition-all duration-300 hover:scale-110 z-40"
          aria-label="回到顶部"
        >
          <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>

        {/* Global Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Scroll to top functionality
              const scrollButton = document.getElementById('scroll-to-top');
              
              window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                  scrollButton.style.opacity = '1';
                  scrollButton.style.visibility = 'visible';
                } else {
                  scrollButton.style.opacity = '0';
                  scrollButton.style.visibility = 'invisible';
                }
              });
              
              scrollButton.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              });

              // Smooth scrolling for anchor links
              document.addEventListener('click', (e) => {
                const target = e.target.closest('a[href^="#"]');
                if (target) {
                  e.preventDefault();
                  const id = target.getAttribute('href').slice(1);
                  const element = document.getElementById(id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              });

              // Preload critical resources
              const preloadLink = document.createElement('link');
              preloadLink.rel = 'preload';
              preloadLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
              preloadLink.as = 'style';
              document.head.appendChild(preloadLink);
            `,
          }}
        />
      </body>
    </html>
  )
}