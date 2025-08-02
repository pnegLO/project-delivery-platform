# 项目交付平台

一个面向客户的项目展示和交付平台，使用 Next.js 14 + Tailwind CSS + ShadCN/UI 构建。

## 功能特性

- 🎯 **项目展示首页** - 卡片式项目列表，支持搜索和标签筛选
- 🔒 **密码保护** - 每个项目需要访问密码验证
- 📊 **项目详情页** - 包含项目概述、进度、里程碑、文档和下载
- 📱 **响应式设计** - 适配桌面端和移动端
- 🎨 **现代化UI** - 使用 ShadCN/UI 组件库

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页
│   ├── layout.tsx         # 根布局
│   ├── globals.css        # 全局样式
│   ├── projects/[slug]/   # 项目详情页
│   ├── auth/project/[slug]/ # 项目认证页
│   └── api/auth/          # API 路由
├── components/            # React 组件
│   ├── ui/               # ShadCN/UI 基础组件
│   ├── project-card.tsx  # 项目卡片组件
│   └── page-header.tsx   # 页面头部组件
├── data/                 # 数据文件
│   └── projects.json     # 项目配置数据
└── lib/                  # 工具函数和类型定义
    ├── utils.ts          # 工具函数
    └── types.ts          # TypeScript 类型定义
```

## 快速开始

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 项目配置

编辑 `src/data/projects.json` 文件来配置项目信息：

- `accessKey`: 项目访问密码
- `status`: 项目状态 (planning/in_progress/completed/on_hold)
- `progress`: 项目进度百分比
- `milestones`: 项目里程碑
- `documents`: 项目文档链接
- `downloads`: 下载文件配置
- `demos`: 演示链接配置

## 示例访问密码

- 智能客服聊天机器人: `chatbot2023`
- 电商移动应用: `mobile2023`
- 数据分析仪表板: `dashboard2023`

## 部署

### 构建生产版本

```bash
npm run build
npm start
```

### 本地部署建议

1. 使用 PM2 进行进程管理
2. 配置 Nginx 反向代理
3. 设置 SSL 证书

## 技术栈

- **前端**: Next.js 14 (App Router), React 18, TypeScript
- **样式**: Tailwind CSS, ShadCN/UI
- **图标**: Lucide React
- **部署**: 支持 Vercel, Netlify 等平台

## 开发规范

- 使用 TypeScript 进行类型安全
- 遵循 ESLint 代码规范
- 组件采用 Composition Pattern
- 响应式设计优先