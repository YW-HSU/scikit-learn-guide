import { useState, useEffect } from 'react';
import { Menu, X, Brain, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: '首页', labelEn: 'Home', href: '#hero' },
  { label: '流程图', labelEn: 'Flowchart', href: '#flowchart-explorer' },
  { label: '算法矩阵', labelEn: 'Algorithms', href: '#algorithm-matrix' },
  { label: '原理', labelEn: 'Principles', href: '#algorithm-principles' },
  { label: '性能', labelEn: 'Performance', href: '#performance-boundaries' },
  { label: '部署', labelEn: 'Deploy', href: '#github-deploy' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="flex items-center gap-2 group"
            >
              <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg hidden sm:block">
                <span className="gradient-text">ML</span> Guide
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  <span>{item.label}</span>
                  <span className="text-white/40 text-xs ml-1">{item.labelEn}</span>
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute top-16 left-0 right-0 bg-black/95 border-b border-white/10 p-4 transition-transform duration-500 ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="w-full flex items-center justify-between p-3 text-left text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-white/40 text-sm">{item.labelEn}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
