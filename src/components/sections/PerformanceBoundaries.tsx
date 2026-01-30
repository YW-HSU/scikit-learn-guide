import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Gauge, 
  Timer, 
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  HardDrive,
  Zap,
  BarChart3,
  Layers,
  Settings
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

gsap.registerPlugin(ScrollTrigger);

interface PerformanceMetric {
  name: string;
  nameEn: string;
  value: number;
  maxValue: number;
  unit: string;
  description: string;
  descriptionEn: string;
  color: string;
}

interface AlgorithmBenchmark {
  name: string;
  training: number;
  prediction: number;
  memory: number;
  scalability: number;
  bestFor: string[];
  limitations: string[];
}

const performanceMetrics: PerformanceMetric[] = [
  {
    name: '训练时间',
    nameEn: 'Training Time',
    value: 85,
    maxValue: 100,
    unit: 'ms',
    description: '模型在标准数据集上的训练耗时',
    descriptionEn: 'Time to train on standard dataset',
    color: '#22c55e',
  },
  {
    name: '预测延迟',
    nameEn: 'Prediction Latency',
    value: 45,
    maxValue: 100,
    unit: 'μs',
    description: '单次预测的响应时间',
    descriptionEn: 'Response time for single prediction',
    color: '#3b82f6',
  },
  {
    name: '内存占用',
    nameEn: 'Memory Usage',
    value: 60,
    maxValue: 100,
    unit: 'MB',
    description: '模型存储和运行时内存消耗',
    descriptionEn: 'Model storage and runtime memory',
    color: '#f59e0b',
  },
  {
    name: '可扩展性',
    nameEn: 'Scalability',
    value: 75,
    maxValue: 100,
    unit: 'score',
    description: '处理大规模数据的能力',
    descriptionEn: 'Ability to handle large-scale data',
    color: '#a855f7',
  },
];

const benchmarks: AlgorithmBenchmark[] = [
  {
    name: 'KNN',
    training: 95,
    prediction: 30,
    memory: 40,
    scalability: 25,
    bestFor: ['小数据集', '非线性边界', '解释性强'],
    limitations: ['大数据集慢', '高维数据差', '内存占用大'],
  },
  {
    name: 'SVM',
    training: 50,
    prediction: 85,
    memory: 60,
    scalability: 45,
    bestFor: ['高维数据', '边界清晰', '中小数据集'],
    limitations: ['大数据集慢', '核函数选择难', '多分类复杂'],
  },
  {
    name: 'Random Forest',
    training: 70,
    prediction: 80,
    memory: 55,
    scalability: 75,
    bestFor: ['特征重要度', '抗过拟合', '并行训练'],
    limitations: ['预测较慢', '内存占用大', '黑盒模型'],
  },
  {
    name: 'Gradient Boosting',
    training: 40,
    prediction: 85,
    memory: 50,
    scalability: 60,
    bestFor: ['准确率优先', '异构特征', '竞赛场景'],
    limitations: ['容易过拟合', '训练较慢', '调参复杂'],
  },
  {
    name: 'Neural Network',
    training: 20,
    prediction: 90,
    memory: 70,
    scalability: 85,
    bestFor: ['大数据集', '复杂模式', '表示学习'],
    limitations: ['需要大数据', '训练成本高', '解释性差'],
  },
  {
    name: 'Naive Bayes',
    training: 95,
    prediction: 95,
    memory: 90,
    scalability: 95,
    bestFor: ['文本分类', '实时应用', '基线模型'],
    limitations: ['特征独立假设', '概率校准差', '复杂关系'],
  },
];

const engineeringPractices = [
  {
    title: '特征工程',
    titleEn: 'Feature Engineering',
    icon: <Layers className="w-5 h-5" />,
    tips: [
      { zh: '处理缺失值（均值/中位数/众数填充）', en: 'Handle missing values (mean/median/mode imputation)' },
      { zh: '特征缩放（标准化/归一化）', en: 'Feature scaling (standardization/normalization)' },
      { zh: '类别编码（One-Hot/Label Encoding）', en: 'Categorical encoding (One-Hot/Label)' },
      { zh: '特征选择（过滤法/包装法/嵌入法）', en: 'Feature selection (filter/wrapper/embedded)' },
    ],
  },
  {
    title: '模型验证',
    titleEn: 'Model Validation',
    icon: <CheckCircle2 className="w-5 h-5" />,
    tips: [
      { zh: '交叉验证（K-Fold/Stratified）', en: 'Cross-validation (K-Fold/Stratified)' },
      { zh: '训练/验证/测试集划分', en: 'Train/validation/test split' },
      { zh: '时间序列分割', en: 'Time series split' },
      { zh: '避免数据泄露', en: 'Prevent data leakage' },
    ],
  },
  {
    title: '超参数调优',
    titleEn: 'Hyperparameter Tuning',
    icon: <Settings className="w-5 h-5" />,
    tips: [
      { zh: '网格搜索（Grid Search）', en: 'Grid Search' },
      { zh: '随机搜索（Random Search）', en: 'Random Search' },
      { zh: '贝叶斯优化', en: 'Bayesian Optimization' },
      { zh: '早停策略', en: 'Early stopping' },
    ],
  },
  {
    title: '性能优化',
    titleEn: 'Performance Optimization',
    icon: <Zap className="w-5 h-5" />,
    tips: [
      { zh: '模型并行化训练', en: 'Parallel model training' },
      { zh: '特征缓存', en: 'Feature caching' },
      { zh: '模型量化/剪枝', en: 'Model quantization/pruning' },
      { zh: '批处理预测', en: 'Batch prediction' },
    ],
  },
];

export default function PerformanceBoundaries() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedAlgo, setSelectedAlgo] = useState<string>('KNN');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.performance-title',
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
        '.metric-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.metrics-grid',
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.benchmark-row',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.benchmark-table',
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const selectedBenchmark = benchmarks.find(b => b.name === selectedAlgo);

  return (
    <section 
      id="performance-boundaries"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="performance-title text-center mb-16">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-6">
            <Gauge className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-white/70">Performance & Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">性能边界与工程实践</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Performance Boundaries & Engineering Practices | 算法选择的工程视角
          </p>
        </div>

        {/* Performance Metrics */}
        <div className="metrics-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {performanceMetrics.map((metric) => (
            <div
              key={metric.name}
              className="metric-card glass-card-strong p-5 rounded-xl"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold">{metric.name}</h4>
                  <p className="text-xs text-white/50">{metric.nameEn}</p>
                </div>
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${metric.color}20` }}
                >
                  {metric.name === '训练时间' && <Timer className="w-4 h-4" style={{ color: metric.color }} />}
                  {metric.name === '预测延迟' && <Zap className="w-4 h-4" style={{ color: metric.color }} />}
                  {metric.name === '内存占用' && <HardDrive className="w-4 h-4" style={{ color: metric.color }} />}
                  {metric.name === '可扩展性' && <TrendingUp className="w-4 h-4" style={{ color: metric.color }} />}
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold" style={{ color: metric.color }}>
                    {metric.value}
                  </span>
                  <span className="text-sm text-white/50 mb-1">{metric.unit}</span>
                </div>
              </div>
              
              <Progress 
                value={metric.value} 
                className="h-2 mb-3"
                style={{ 
                  backgroundColor: `${metric.color}20`,
                }}
              />
              
              <p className="text-xs text-white/50">{metric.description}</p>
              <p className="text-xs text-white/30">{metric.descriptionEn}</p>
            </div>
          ))}
        </div>

        {/* Algorithm Benchmarks */}
        <div className="benchmark-table glass-card-strong rounded-2xl overflow-hidden mb-12">
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              算法性能对比 | Algorithm Benchmarks
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-4 py-3 text-left text-sm font-medium text-white/60">算法</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-white/60">训练速度</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-white/60">预测速度</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-white/60">内存效率</th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-white/60">可扩展性</th>
                </tr>
              </thead>
              <tbody>
                {benchmarks.map((algo) => (
                  <tr
                    key={algo.name}
                    className={`benchmark-row border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                      selectedAlgo === algo.name ? 'bg-indigo-500/10' : ''
                    }`}
                    onClick={() => setSelectedAlgo(algo.name)}
                  >
                    <td className="px-4 py-3 font-medium">{algo.name}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full transition-all"
                            style={{ width: `${algo.training}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/50 w-8">{algo.training}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full transition-all"
                            style={{ width: `${algo.prediction}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/50 w-8">{algo.prediction}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-500 rounded-full transition-all"
                            style={{ width: `${algo.memory}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/50 w-8">{algo.memory}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-purple-500 rounded-full transition-all"
                            style={{ width: `${algo.scalability}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/50 w-8">{algo.scalability}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Selected Algorithm Details */}
          {selectedBenchmark && (
            <div className="p-6 border-t border-white/10 bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm text-white/40 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    最佳场景 | Best For
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBenchmark.bestFor.map((item) => (
                      <span key={item} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm text-white/40 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    局限性 | Limitations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBenchmark.limitations.map((item) => (
                      <span key={item} className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Engineering Practices */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {engineeringPractices.map((practice) => (
            <div
              key={practice.title}
              className="glass-card-strong p-5 rounded-xl hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                  {practice.icon}
                </div>
                <div>
                  <h4 className="font-semibold">{practice.title}</h4>
                  <p className="text-xs text-white/50">{practice.titleEn}</p>
                </div>
              </div>
              
              <ul className="space-y-2">
                {practice.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0" />
                    <div>
                      <span className="text-white/70">{tip.zh}</span>
                      <span className="text-white/40 text-xs block">{tip.en}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Performance Tips */}
        <div className="mt-12 glass-card-strong p-6 rounded-2xl">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl">
              <Cpu className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">性能优化黄金法则 | Performance Golden Rules</h3>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    <div>
                      <p className="text-white/80">先从简单模型开始（如逻辑回归、朴素贝叶斯）</p>
                      <p className="text-white/50 text-sm">Start simple (Logistic Regression, Naive Bayes)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    <div>
                      <p className="text-white/80">特征工程往往比调参更重要</p>
                      <p className="text-white/50 text-sm">Feature engineering beats hyperparameter tuning</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    <div>
                      <p className="text-white/80">使用交叉验证避免过拟合</p>
                      <p className="text-white/50 text-sm">Use cross-validation to avoid overfitting</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                    <div>
                      <p className="text-white/80">监控训练/验证损失曲线</p>
                      <p className="text-white/50 text-sm">Monitor train/validation loss curves</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">5</span>
                    <div>
                      <p className="text-white/80">大数据集考虑随机梯度下降或在线学习</p>
                      <p className="text-white/50 text-sm">Consider SGD or online learning for large data</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">6</span>
                    <div>
                      <p className="text-white/80">生产环境关注预测延迟和内存占用</p>
                      <p className="text-white/50 text-sm">Production: focus on latency and memory</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
