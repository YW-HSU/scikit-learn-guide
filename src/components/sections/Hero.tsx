import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ChevronDown, Brain, Cpu, GitBranch, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'expo.out', delay: 0.2 }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.5 }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { scale: 1.1, opacity: 0, filter: 'blur(10px)' },
        { 
          scale: 1, 
          opacity: 1, 
          filter: 'blur(0px)',
          duration: 1.5, 
          ease: 'expo.out', 
          delay: 0.3 
        }
      );

      // Floating icons animation
      gsap.to('.floating-icon', {
        y: -15,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToContent = () => {
    const element = document.getElementById('flowchart-explorer');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden"
    >
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />

      {/* Floating Icons */}
      <div className="absolute top-20 left-10 floating-icon">
        <div className="glass-card p-3">
          <Brain className="w-6 h-6 text-indigo-400" />
        </div>
      </div>
      <div className="absolute top-32 right-16 floating-icon">
        <div className="glass-card p-3">
          <Cpu className="w-6 h-6 text-purple-400" />
        </div>
      </div>
      <div className="absolute bottom-40 left-20 floating-icon">
        <div className="glass-card p-3">
          <GitBranch className="w-6 h-6 text-cyan-400" />
        </div>
      </div>
      <div className="absolute bottom-32 right-24 floating-icon">
        <div className="glass-card p-3">
          <Sparkles className="w-6 h-6 text-green-400" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-white/70">Scikit-Learn Algorithm Cheat Sheet</span>
        </div>

        {/* Title */}
        <h1 
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0"
        >
          <span className="gradient-text text-glow">Machine Learning</span>
          <br />
          <span className="text-white">Algorithm Guide</span>
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-8 opacity-0"
        >
          掌握 scikit-learn 决策流程图 | Master the scikit-learn decision flowchart
          <br />
          <span className="text-sm text-white/40">
            从基础流程到算法原理、数学直觉与工程实践
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button 
            size="lg"
            onClick={scrollToContent}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25"
          >
            开始探索 | Start Exploring
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => document.getElementById('github-deploy')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
          >
            GitHub 部署指南
          </Button>
        </div>

        {/* Flowchart Image */}
        <div 
          ref={imageRef}
          className="relative max-w-4xl mx-auto opacity-0"
        >
          <div className="glass-card-strong p-2 rounded-2xl overflow-hidden">
            <div className="relative aspect-video">
              <img 
                src="/flowchart.png" 
                alt="Scikit-Learn Algorithm Flowchart"
                className={`w-full h-full object-contain rounded-xl transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>
          
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-2xl -z-10" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToContent}
      >
        <div className="flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors">
          <span className="text-sm">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
