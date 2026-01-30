import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ParticleBackground from './components/ParticleBackground';
import Navigation from './components/Navigation';
import Hero from './components/sections/Hero';
import FlowchartExplorer from './components/sections/FlowchartExplorer';
import AlgorithmMatrix from './components/sections/AlgorithmMatrix';
import AlgorithmPrinciples from './components/sections/AlgorithmPrinciples';
import PerformanceBoundaries from './components/sections/PerformanceBoundaries';
import GitHubDeploy from './components/sections/GitHubDeploy';
import Footer from './components/Footer';

import './App.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative z-10">
        <div id="hero">
          <Hero />
        </div>
        <FlowchartExplorer />
        <AlgorithmMatrix />
        <AlgorithmPrinciples />
        <PerformanceBoundaries />
        <GitHubDeploy />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
