import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Target, 
  TrendingUp, 
  Zap, 
  Brain,
  Lightbulb,
  Sigma,
  FunctionSquare,
  Minimize2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Principle {
  title: string;
  titleEn: string;
  icon: React.ReactNode;
  concepts: {
    name: string;
    nameEn: string;
    description: string;
    descriptionEn: string;
    intuition: string;
    intuitionEn: string;
    formula?: string;
  }[];
}

const principles: Principle[] = [
  {
    title: '优化理论',
    titleEn: 'Optimization Theory',
    icon: <Target className="w-6 h-6" />,
    concepts: [
      {
        name: '梯度下降',
        nameEn: 'Gradient Descent',
        description: '沿着损失函数梯度的反方向迭代更新参数，逐步逼近最优解',
        descriptionEn: 'Iteratively update parameters along the negative gradient direction',
        intuition: '想象一个盲人在山坡上寻找最低点，他通过感受脚下的坡度来决定下一步走向',
        intuitionEn: 'Imagine a blind person finding the lowest point by feeling the slope',
        formula: '$$\\theta_{t+1} = \\theta_t - \\eta \\nabla_\\theta J(\\theta)$$',
      },
      {
        name: '凸优化',
        nameEn: 'Convex Optimization',
        description: '当损失函数是凸函数时，任何局部最优都是全局最优',
        descriptionEn: 'For convex loss functions, any local optimum is global optimum',
        intuition: '像一个光滑的碗，无论从哪开始，最终都会滑到碗底',
        intuitionEn: 'Like a smooth bowl - you will always slide to the bottom',
      },
      {
        name: '拉格朗日乘数',
        nameEn: 'Lagrange Multipliers',
        description: '将有约束优化问题转化为无约束问题求解',
        descriptionEn: 'Convert constrained optimization to unconstrained',
        intuition: '在约束边界上寻找最优解，就像沿着围墙寻找最高点',
        intuitionEn: 'Find optimum along constraint boundary like walking along a wall',
      },
    ],
  },
  {
    title: '泛化理论',
    titleEn: 'Generalization Theory',
    icon: <TrendingUp className="w-6 h-6" />,
    concepts: [
      {
        name: '偏差-方差权衡',
        nameEn: 'Bias-Variance Tradeoff',
        description: '模型复杂度增加会降低偏差但增加方差，需要找到平衡点',
        descriptionEn: 'Increasing complexity reduces bias but increases variance',
        intuition: '简单的模型可能欠拟合（偏差大），复杂的模型可能过拟合（方差大）',
        intuitionEn: 'Simple models underfit (high bias), complex models overfit (high variance)',
      },
      {
        name: 'VC维',
        nameEn: 'VC Dimension',
        description: '衡量模型复杂度的理论指标，决定模型的表达能力',
        descriptionEn: 'Theoretical measure of model complexity and capacity',
        intuition: 'VC维越高，模型能记住的样本组合越多，但也越容易过拟合',
        intuitionEn: 'Higher VC dim means more memorization but more overfitting',
      },
      {
        name: '正则化',
        nameEn: 'Regularization',
        description: '通过惩罚大参数值来防止过拟合，提高泛化能力',
        descriptionEn: 'Prevent overfitting by penalizing large parameter values',
        intuition: '像给模型戴上"手铐"，限制它的自由度，强迫它学习更简单的规律',
        intuitionEn: 'Like handcuffs restricting freedom, forcing simpler patterns',
      },
    ],
  },
  {
    title: '概率视角',
    titleEn: 'Probabilistic View',
    icon: <FunctionSquare className="w-6 h-6" />,
    concepts: [
      {
        name: '最大似然估计',
        nameEn: 'Maximum Likelihood',
        description: '选择使观测数据出现概率最大的模型参数',
        descriptionEn: 'Choose parameters that maximize probability of observed data',
        intuition: '如果抛硬币10次出现8次正面，我们倾向于认为硬币是有偏的',
        intuitionEn: 'If 8 heads in 10 flips, we believe the coin is biased',
        formula: '$$\\hat{\\theta} = \\arg\\max_\\theta P(D|\\theta)$$',
      },
      {
        name: '贝叶斯推断',
        nameEn: 'Bayesian Inference',
        description: '结合先验知识和观测数据，得到后验分布',
        descriptionEn: 'Combine prior knowledge with observed data for posterior',
        intuition: '像不断更新的信念系统，新证据会调整我们对事物的认知',
        intuitionEn: 'Like updating beliefs - new evidence adjusts our understanding',
        formula: '$$P(\\theta|D) = \\frac{P(D|\\theta)P(\\theta)}{P(D)}$$',
      },
      {
        name: '期望最大化',
        nameEn: 'EM Algorithm',
        description: '迭代算法，在缺失数据情况下进行参数估计',
        descriptionEn: 'Iterative algorithm for parameter estimation with missing data',
        intuition: '像猜谜游戏，先猜测隐藏变量，再用猜测结果改进参数估计',
        intuitionEn: 'Like a guessing game - guess hidden vars, then improve estimates',
      },
    ],
  },
  {
    title: '核方法与特征',
    titleEn: 'Kernel Methods & Features',
    icon: <Zap className="w-6 h-6" />,
    concepts: [
      {
        name: '核技巧',
        nameEn: 'Kernel Trick',
        description: '通过核函数隐式地将数据映射到高维空间，无需显式计算',
        descriptionEn: 'Implicitly map data to high-dimensional space via kernel function',
        intuition: '在低维空间线性不可分的数据，在高维空间可能变得线性可分',
        intuitionEn: 'Data not linearly separable in low dim may be in high dim',
      },
      {
        name: '特征工程',
        nameEn: 'Feature Engineering',
        description: '通过领域知识创建更有意义的特征表示',
        descriptionEn: 'Create more meaningful feature representations using domain knowledge',
        intuition: '好的特征让简单模型也能表现出色，就像给盲人一副好的拐杖',
        intuitionEn: 'Good features make simple models shine, like a good cane for the blind',
      },
      {
        name: '流形学习',
        nameEn: 'Manifold Learning',
        description: '假设高维数据实际分布在低维流形上',
        descriptionEn: 'Assume high-dimensional data lies on low-dimensional manifold',
        intuition: '像一张揉皱的纸，虽然占据3D空间，但实际是2D的',
        intuitionEn: 'Like crumpled paper - occupies 3D but is actually 2D',
      },
    ],
  },
];

export default function AlgorithmPrinciples() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.principles-title',
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
        '.principle-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.principles-grid',
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="algorithm-principles"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="principles-title text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6">
            <Brain className="w-5 h-5 text-indigo-400" />
            <span className="text-sm text-white/70">Deep Dive</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">算法原理与数学直觉</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Algorithm Principles & Mathematical Intuition | 从理论到直觉的深度理解
          </p>
        </div>

        {/* Principles Grid */}
        <div className="principles-grid grid lg:grid-cols-2 gap-8">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="principle-card glass-card-strong rounded-2xl overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                    {principle.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{principle.title}</h3>
                    <p className="text-white/50 text-sm">{principle.titleEn}</p>
                  </div>
                </div>
              </div>

              {/* Concepts */}
              <div className="p-6 space-y-6">
                {principle.concepts.map((concept) => (
                  <div
                    key={concept.name}
                    className="relative pl-6 border-l-2 border-indigo-500/30 hover:border-indigo-500 transition-colors"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-indigo-500 rounded-full border-4 border-black" />
                    
                    <h4 className="text-lg font-semibold mb-1">{concept.name}</h4>
                    <p className="text-white/50 text-sm mb-2">{concept.nameEn}</p>
                    
                    <p className="text-white/70 text-sm mb-3">{concept.description}</p>
                    <p className="text-white/40 text-xs mb-3">{concept.descriptionEn}</p>
                    
                    {/* Intuition Box */}
                    <div className="glass-card p-3 rounded-lg mb-3">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-white/80">{concept.intuition}</p>
                          <p className="text-xs text-white/40 mt-1">{concept.intuitionEn}</p>
                        </div>
                      </div>
                    </div>

                    {/* Formula */}
                    {concept.formula && (
                      <div className="code-block py-2 px-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Sigma className="w-3 h-3 text-cyan-400" />
                          <span className="text-xs text-white/40">Formula</span>
                        </div>
                        <span className="text-cyan-300 text-sm">{concept.formula}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Box */}
        <div className="mt-12 glass-card-strong p-8 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl">
              <Minimize2 className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">核心洞察 | Core Insight</h3>
              <p className="text-white/70 leading-relaxed">
                机器学习算法的本质是在<strong className="text-indigo-400">偏差与方差</strong>之间寻找平衡，
                在<strong className="text-purple-400">模型复杂度</strong>与<strong className="text-cyan-400">数据量</strong>之间找到最优解。
                理解这些数学原理，能够帮助我们在面对实际问题时做出更明智的算法选择。
              </p>
              <p className="text-white/50 text-sm mt-3 leading-relaxed">
                The essence of ML algorithms is balancing bias and variance, finding the optimal point 
                between model complexity and data volume. Understanding these mathematical principles 
                helps us make wiser algorithm choices for real-world problems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
