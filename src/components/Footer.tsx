import { Brain, Heart, Github, ExternalLink, BookOpen } from 'lucide-react';

const footerLinks = [
  {
    title: '资源',
    titleEn: 'Resources',
    links: [
      { label: 'Scikit-Learn 文档', href: 'https://scikit-learn.org/stable/documentation.html' },
      { label: '机器学习入门', href: 'https://scikit-learn.org/stable/tutorial/index.html' },
      { label: '算法选择指南', href: 'https://scikit-learn.org/stable/machine_learning_map.html' },
    ],
  },
  {
    title: '工具',
    titleEn: 'Tools',
    links: [
      { label: 'Vite', href: 'https://vitejs.dev/' },
      { label: 'React', href: 'https://react.dev/' },
      { label: 'Tailwind CSS', href: 'https://tailwindcss.com/' },
    ],
  },
  {
    title: '社区',
    titleEn: 'Community',
    links: [
      { label: 'GitHub', href: 'https://github.com' },
      { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/scikit-learn' },
      { label: 'Reddit r/MachineLearning', href: 'https://reddit.com/r/MachineLearning' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">
                <span className="gradient-text">ML</span> Guide
              </span>
            </div>
            <p className="text-white/60 mb-4 max-w-sm">
              一个交互式的机器学习算法选择指南，帮助你理解 scikit-learn 的决策流程。
            </p>
            <p className="text-white/40 text-sm max-w-sm">
              An interactive guide to machine learning algorithms, helping you understand 
              the scikit-learn decision flowchart.
            </p>
            
            {/* Stats */}
            <div className="flex gap-6 mt-6">
              <div>
                <div className="text-2xl font-bold gradient-text">4</div>
                <div className="text-xs text-white/50">算法类别</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">16+</div>
                <div className="text-xs text-white/50">算法详解</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">∞</div>
                <div className="text-xs text-white/50">学习可能</div>
              </div>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-semibold mb-1">{group.title}</h4>
              <p className="text-white/40 text-xs mb-4">{group.titleEn}</p>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-1 group"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-white/50">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            <span>for ML learners</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://scikit-learn.org"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <BookOpen className="w-5 h-5" />
            </a>
          </div>
          
          <p className="text-sm text-white/40">
            © 2025 ML Guide. Open source under MIT License.
          </p>
        </div>
      </div>
    </footer>
  );
}
