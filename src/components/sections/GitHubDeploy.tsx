import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Github, 
  Globe, 
  Copy, 
  Check,
  Terminal,
  FileCode,
  Rocket,
  Settings,
  ExternalLink,
  AlertCircle
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DeployStep {
  step: number;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  commands?: string[];
  code?: string;
  tips?: { zh: string; en: string }[];
}

const deploySteps: DeployStep[] = [
  {
    step: 1,
    title: '创建 GitHub 仓库',
    titleEn: 'Create GitHub Repository',
    description: '在 GitHub 上创建一个新的仓库来托管你的网站代码',
    descriptionEn: 'Create a new repository on GitHub to host your website code',
    commands: [
      '# 访问 GitHub 并创建新仓库',
      '# 仓库名建议: scikit-learn-guide',
      '# 选择 Public 可见性',
    ],
    tips: [
      { zh: '仓库名建议使用小写字母和连字符', en: 'Use lowercase letters and hyphens for repo name' },
      { zh: '添加 README.md 和 .gitignore', en: 'Add README.md and .gitignore' },
    ],
  },
  {
    step: 2,
    title: '初始化本地项目',
    titleEn: 'Initialize Local Project',
    description: '使用 Vite + React + TypeScript 创建项目',
    descriptionEn: 'Create project with Vite + React + TypeScript',
    commands: [
      '# 创建 Vite 项目',
      'npm create vite@latest scikit-learn-guide -- --template react-ts',
      '',
      '# 进入项目目录',
      'cd scikit-learn-guide',
      '',
      '# 安装依赖',
      'npm install',
      '',
      '# 安装 UI 库和动画库',
      'npm install tailwindcss @radix-ui/react-dialog lucide-react',
      'npm install gsap @gsap/react three @react-three/fiber @react-three/drei',
    ],
  },
  {
    step: 3,
    title: '配置 GitHub Pages',
    titleEn: 'Configure GitHub Pages',
    description: '修改 vite.config.ts 配置基础路径',
    descriptionEn: 'Modify vite.config.ts to set base path',
    code: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/scikit-learn-guide/', // 你的仓库名
  build: {
    outDir: 'dist',
  },
})`,
  },
  {
    step: 4,
    title: '创建 GitHub Actions',
    titleEn: 'Create GitHub Actions',
    description: '设置自动部署工作流',
    descriptionEn: 'Set up automated deployment workflow',
    code: `# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: \\\${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`,
  },
  {
    step: 5,
    title: '推送代码并部署',
    titleEn: 'Push Code & Deploy',
    description: '将代码推送到 GitHub，自动触发部署',
    descriptionEn: 'Push code to GitHub to trigger automatic deployment',
    commands: [
      '# 初始化 Git 仓库',
      'git init',
      '',
      '# 添加远程仓库',
      'git remote add origin https://github.com/你的用户名/scikit-learn-guide.git',
      '',
      '# 添加所有文件',
      'git add .',
      '',
      '# 提交更改',
      'git commit -m "Initial commit"',
      '',
      '# 推送到 main 分支',
      'git branch -M main',
      'git push -u origin main',
    ],
    tips: [
      { zh: '确保所有依赖都已安装', en: 'Make sure all dependencies are installed' },
      { zh: '检查构建是否成功: npm run build', en: 'Check build success: npm run build' },
      { zh: '部署完成后访问: https://你的用户名.github.io/scikit-learn-guide/', en: 'Visit after deploy: https://username.github.io/repo-name/' },
    ],
  },
];

const fileStructure = [
  { name: 'public/', type: 'folder', desc: '静态资源' },
  { name: '  flowchart.png', type: 'file', desc: '流程图图片' },
  { name: 'src/', type: 'folder', desc: '源代码' },
  { name: '  components/', type: 'folder', desc: 'React 组件' },
  { name: '    sections/', type: 'folder', desc: '页面区块' },
  { name: '      Hero.tsx', type: 'file', desc: '英雄区域' },
  { name: '      FlowchartExplorer.tsx', type: 'file', desc: '流程图探索器' },
  { name: '      AlgorithmMatrix.tsx', type: 'file', desc: '算法矩阵' },
  { name: '      AlgorithmPrinciples.tsx', type: 'file', desc: '算法原理' },
  { name: '      PerformanceBoundaries.tsx', type: 'file', desc: '性能边界' },
  { name: '      GitHubDeploy.tsx', type: 'file', desc: '部署指南' },
  { name: '    ParticleBackground.tsx', type: 'file', desc: '粒子背景' },
  { name: '  App.tsx', type: 'file', desc: '主应用' },
  { name: '  index.css', type: 'file', desc: '全局样式' },
  { name: '  main.tsx', type: 'file', desc: '入口文件' },
  { name: 'index.html', type: 'file', desc: 'HTML 模板' },
  { name: 'package.json', type: 'file', desc: '依赖配置' },
  { name: 'vite.config.ts', type: 'file', desc: 'Vite 配置' },
  { name: 'tailwind.config.js', type: 'file', desc: 'Tailwind 配置' },
  { name: 'tsconfig.json', type: 'file', desc: 'TypeScript 配置' },
];

export default function GitHubDeploy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.deploy-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.deploy-step',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.deploy-steps',
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section 
      id="github-deploy"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="deploy-title text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6">
            <Github className="w-5 h-5 text-white" />
            <span className="text-sm text-white/70">GitHub Pages Deployment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">GitHub 部署指南</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            将你的机器学习算法指南网站部署到 GitHub Pages
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Deploy Steps */}
          <div className="lg:col-span-2 space-y-6">
            <div className="deploy-steps space-y-6">
              {deploySteps.map((step, index) => (
                <div
                  key={step.step}
                  className="deploy-step glass-card-strong rounded-2xl overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">{step.title}</h3>
                        <p className="text-white/50 text-sm mb-2">{step.titleEn}</p>
                        <p className="text-white/70">{step.description}</p>
                        <p className="text-white/40 text-sm">{step.descriptionEn}</p>
                      </div>
                    </div>

                    {/* Commands */}
                    {step.commands && (
                      <div className="mt-4 relative">
                        <div className="code-block">
                          <pre className="text-sm">{step.commands.join('\n')}</pre>
                        </div>
                        <button
                          onClick={() => copyToClipboard(step.commands!.join('\n'), index)}
                          className="absolute top-2 right-2 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                        >
                          {copiedIndex === index ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    )}

                    {/* Code Block */}
                    {step.code && (
                      <div className="mt-4 relative">
                        <div className="code-block">
                          <pre className="text-sm">{step.code}</pre>
                        </div>
                        <button
                          onClick={() => copyToClipboard(step.code!, index)}
                          className="absolute top-2 right-2 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                        >
                          {copiedIndex === index ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    )}

                    {/* Tips */}
                    {step.tips && (
                      <div className="mt-4 space-y-2">
                        {step.tips.map((tip, tipIndex) => (
                          <div key={tipIndex} className="flex items-start gap-2 text-sm">
                            <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="text-white/70">{tip.zh}</span>
                              <span className="text-white/40 text-xs block">{tip.en}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: File Structure & Quick Links */}
          <div className="space-y-6">
            {/* File Structure */}
            <div className="glass-card-strong p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FileCode className="w-5 h-5 text-indigo-400" />
                项目结构 | Project Structure
              </h3>
              <div className="space-y-1 text-sm">
                {fileStructure.map((file, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 ${
                      file.type === 'folder' ? 'text-indigo-400' : 'text-white/70'
                    }`}
                    style={{ paddingLeft: file.name.startsWith('  ') ? '1rem' : '0' }}
                  >
                    {file.type === 'folder' ? (
                      <span className="text-amber-400">📁</span>
                    ) : (
                      <span className="text-cyan-400">📄</span>
                    )}
                    <span className={file.type === 'folder' ? 'font-medium' : ''}>
                      {file.name.trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="glass-card-strong p-6 rounded-2xl">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-cyan-400" />
                快速链接 | Quick Links
              </h3>
              <div className="space-y-3">
                <a
                  href="https://github.com/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <div>
                    <p className="font-medium">创建新仓库</p>
                    <p className="text-xs text-white/50">Create New Repository</p>
                  </div>
                </a>
                <a
                  href="https://vitejs.dev/guide/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Rocket className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="font-medium">Vite 文档</p>
                    <p className="text-xs text-white/50">Vite Documentation</p>
                  </div>
                </a>
                <a
                  href="https://pages.github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Globe className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-medium">GitHub Pages</p>
                    <p className="text-xs text-white/50">GitHub Pages Guide</p>
                  </div>
                </a>
                <a
                  href="https://tailwindcss.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Settings className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="font-medium">Tailwind CSS</p>
                    <p className="text-xs text-white/50">Tailwind Documentation</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Live Demo */}
            <div className="glass-card-strong p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Globe className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold">在线预览</h3>
                  <p className="text-xs text-white/50">Live Preview</p>
                </div>
              </div>
              <p className="text-sm text-white/70 mb-4">
                部署完成后，你的网站将可以通过以下链接访问：
              </p>
              <div className="code-block py-2 px-3 text-sm">
                https://你的用户名.github.io/仓库名/
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-12 glass-card-strong p-8 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-xl">
              <Terminal className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">部署完成！| Deployment Complete!</h3>
              <p className="text-white/70 leading-relaxed">
                恭喜你！你的网站现在已经部署到 GitHub Pages。每次推送代码到 main 分支时，
                GitHub Actions 会自动重新构建和部署。记得在仓库设置的 Pages 选项中选择 
                "GitHub Actions" 作为部署源。
              </p>
              <p className="text-white/50 text-sm mt-3 leading-relaxed">
                Congratulations! Your site is now deployed to GitHub Pages. 
                GitHub Actions will automatically rebuild and deploy on every push to main. 
                Remember to select "GitHub Actions" as the deployment source in your repository settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
