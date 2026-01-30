import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Layers, 
  BarChart3, 
  ScatterChart, 
  Minimize2,
  ArrowRight,
  Code2,
  BookOpen,
  Calculator
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface Algorithm {
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  code: string;
  math: string;
  complexity: string;
  useCases: string[];
}

interface Category {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  algorithms: Algorithm[];
}

const categories: Category[] = [
  {
    id: 'classification',
    title: '分类',
    titleEn: 'Classification',
    description: '将数据分配到预定义的类别中，基于特征学习决策边界',
    descriptionEn: 'Assign data to predefined categories based on learned decision boundaries',
    icon: <Layers className="w-8 h-8" />,
    color: '#22c55e',
    gradient: 'from-green-500/20 to-emerald-500/20',
    algorithms: [
      {
        name: '支持向量机',
        nameEn: 'SVM (Support Vector Machine)',
        description: '通过寻找最优超平面来最大化类别间隔，支持核技巧处理非线性问题',
        descriptionEn: 'Finds optimal hyperplane to maximize class margin, supports kernel tricks',
        code: `from sklearn.svm import SVC

# 创建分类器
clf = SVC(kernel='rbf', C=1.0, gamma='scale')

# 训练模型
clf.fit(X_train, y_train)

# 预测
predictions = clf.predict(X_test)`,
        math: '$$\\min_{w,b} \\frac{1}{2}||w||^2 + C\\sum_{i=1}^n \\xi_i$$',
        complexity: 'O(n²) ~ O(n³)',
        useCases: ['图像分类', '文本分类', '生物信息学', '人脸识别']
      },
      {
        name: '朴素贝叶斯',
        nameEn: 'Naive Bayes',
        description: '基于贝叶斯定理的概率分类器，假设特征之间相互独立',
        descriptionEn: 'Probabilistic classifier based on Bayes theorem with feature independence assumption',
        code: `from sklearn.naive_bayes import GaussianNB

# 创建分类器
clf = GaussianNB()

# 训练模型
clf.fit(X_train, y_train)

# 预测概率
proba = clf.predict_proba(X_test)`,
        math: '$$P(y|x) = \\frac{P(x|y)P(y)}{P(x)}$$',
        complexity: 'O(n)',
        useCases: ['垃圾邮件过滤', '情感分析', '文档分类', '推荐系统']
      },
      {
        name: 'K近邻',
        nameEn: 'K-Nearest Neighbors',
        description: '基于实例的学习，通过查找最近的K个邻居进行投票决策',
        descriptionEn: 'Instance-based learning using k nearest neighbors voting',
        code: `from sklearn.neighbors import KNeighborsClassifier

# 创建分类器
clf = KNeighborsClassifier(n_neighbors=5)

# 训练模型
clf.fit(X_train, y_train)

# 预测
predictions = clf.predict(X_test)`,
        math: '$$\\hat{y} = \\arg\\max_y \\sum_{x_i \\in N_k(x)} \\mathbb{I}(y_i = y)$$',
        complexity: 'O(n) 查询',
        useCases: ['推荐系统', '图像识别', '异常检测', '模式识别']
      },
      {
        name: '随机森林',
        nameEn: 'Random Forest',
        description: '集成学习方法，构建多棵决策树并投票决定最终分类',
        descriptionEn: 'Ensemble method building multiple decision trees with voting',
        code: `from sklearn.ensemble import RandomForestClassifier

# 创建分类器
clf = RandomForestClassifier(
    n_estimators=100,
    max_depth=10
)

# 训练模型
clf.fit(X_train, y_train)

# 特征重要性
importance = clf.feature_importances_`,
        math: '$$\\hat{y} = \\arg\\max_y \\sum_{t=1}^T \\mathbb{I}(h_t(x) = y)$$',
        complexity: 'O(T·n·log(n))',
        useCases: ['金融风控', '医疗诊断', '客户流失预测', '特征选择']
      }
    ]
  },
  {
    id: 'regression',
    title: '回归',
    titleEn: 'Regression',
    description: '预测连续数值输出，建立输入特征与目标变量的映射关系',
    descriptionEn: 'Predict continuous numerical outputs mapping features to target variables',
    icon: <BarChart3 className="w-8 h-8" />,
    color: '#3b82f6',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    algorithms: [
      {
        name: '线性回归',
        nameEn: 'Linear Regression',
        description: '建立特征与目标变量的线性关系，最小化预测误差平方和',
        descriptionEn: 'Models linear relationship minimizing sum of squared errors',
        code: `from sklearn.linear_model import LinearRegression

# 创建回归器
reg = LinearRegression()

# 训练模型
reg.fit(X_train, y_train)

# 系数和截距
coef = reg.coef_
intercept = reg.intercept_`,
        math: '$$\\min_\\beta ||y - X\\beta||^2 = \\sum_{i=1}^n (y_i - \\hat{y}_i)^2$$',
        complexity: 'O(n·p²)',
        useCases: ['房价预测', '销售预测', '趋势分析', '风险评估']
      },
      {
        name: '岭回归',
        nameEn: 'Ridge Regression',
        description: 'L2正则化的线性回归，防止过拟合，处理多重共线性',
        descriptionEn: 'L2 regularized regression preventing overfitting and multicollinearity',
        code: `from sklearn.linear_model import Ridge

# 创建回归器
reg = Ridge(alpha=1.0)

# 训练模型
reg.fit(X_train, y_train)

# 预测
predictions = reg.predict(X_test)`,
        math: '$$\\min_\\beta ||y - X\\beta||^2 + \\alpha||\\beta||^2$$',
        complexity: 'O(n·p²)',
        useCases: ['特征共线性处理', '噪声数据', '高维数据', '稳定预测']
      },
      {
        name: 'Lasso回归',
        nameEn: 'Lasso Regression',
        description: 'L1正则化的线性回归，自动进行特征选择，产生稀疏解',
        descriptionEn: 'L1 regularized regression with automatic feature selection',
        code: `from sklearn.linear_model import Lasso

# 创建回归器
reg = Lasso(alpha=0.1)

# 训练模型
reg.fit(X_train, y_train)

# 非零系数（被选中的特征）
selected_features = reg.coef_ != 0`,
        math: '$$\\min_\\beta \\frac{1}{2n}||y - X\\beta||^2 + \\alpha||\\beta||_1$$',
        complexity: 'O(n·p)',
        useCases: ['特征选择', '高维数据', '模型解释', '稀疏模型']
      },
      {
        name: '支持向量回归',
        nameEn: 'Support Vector Regression',
        description: 'SVM的回归版本，使用ε-不敏感损失函数',
        descriptionEn: 'SVM variant for regression with ε-insensitive loss',
        code: `from sklearn.svm import SVR

# 创建回归器
reg = SVR(kernel='rbf', C=1.0, epsilon=0.1)

# 训练模型
reg.fit(X_train, y_train)

# 预测
predictions = reg.predict(X_test)`,
        math: '$$\\min_{w,b} \\frac{1}{2}||w||^2 + C\\sum_{i=1}^n L_\\epsilon(y_i, \\hat{y}_i)$$',
        complexity: 'O(n²) ~ O(n³)',
        useCases: ['非线性回归', '时间序列', '金融预测', '信号处理']
      }
    ]
  },
  {
    id: 'clustering',
    title: '聚类',
    titleEn: 'Clustering',
    description: '发现数据中的自然分组结构，无需标签信息',
    descriptionEn: 'Discover natural groupings in data without label information',
    icon: <ScatterChart className="w-8 h-8" />,
    color: '#f59e0b',
    gradient: 'from-amber-500/20 to-orange-500/20',
    algorithms: [
      {
        name: 'K-Means',
        nameEn: 'K-Means Clustering',
        description: '基于质心的迭代算法，最小化簇内平方和',
        descriptionEn: 'Centroid-based iterative algorithm minimizing within-cluster sum of squares',
        code: `from sklearn.cluster import KMeans

# 创建聚类器
kmeans = KMeans(n_clusters=3, random_state=42)

# 拟合数据
kmeans.fit(X)

# 获取标签和质心
labels = kmeans.labels_
centroids = kmeans.cluster_centers_`,
        math: '$$\\min_\\mu \\sum_{i=1}^n \\min_{\\mu_j \\in C} ||x_i - \\mu_j||^2$$',
        complexity: 'O(n·k·i·d)',
        useCases: ['客户细分', '图像分割', '文档聚类', '异常检测']
      },
      {
        name: '层次聚类',
        nameEn: 'Hierarchical Clustering',
        description: '构建树状聚类结构，支持自底向上或自顶向下',
        descriptionEn: 'Builds tree-like cluster structure bottom-up or top-down',
        code: `from sklearn.cluster import AgglomerativeClustering

# 创建聚类器
hc = AgglomerativeClustering(
    n_clusters=3,
    linkage='ward'
)

# 拟合数据
labels = hc.fit_predict(X)`,
        math: '$$d(A,B) = \\min_{a \\in A, b \\in B} d(a,b)$$',
        complexity: 'O(n²) ~ O(n³)',
        useCases: ['基因分析', '社交网络', '文档分类', '市场细分']
      },
      {
        name: 'DBSCAN',
        nameEn: 'DBSCAN',
        description: '基于密度的聚类，能发现任意形状簇并识别噪声',
        descriptionEn: 'Density-based clustering finding arbitrary shapes and noise',
        code: `from sklearn.cluster import DBSCAN

# 创建聚类器
dbscan = DBSCAN(eps=0.5, min_samples=5)

# 拟合数据
labels = dbscan.fit_predict(X)

# 噪声点标记为-1
noise_points = labels == -1`,
        math: '$$N_\\epsilon(p) = \\{q \\in D | dist(p,q) \\leq \\epsilon\\}$$',
        complexity: 'O(n·log(n))',
        useCases: ['空间数据', '异常检测', '图像分析', '地理数据']
      },
      {
        name: '高斯混合模型',
        nameEn: 'Gaussian Mixture Model',
        description: '概率模型，假设数据来自多个高斯分布的混合',
        descriptionEn: 'Probabilistic model assuming data from mixture of Gaussians',
        code: `from sklearn.mixture import GaussianMixture

# 创建模型
gmm = GaussianMixture(n_components=3)

# 拟合数据
gmm.fit(X)

# 预测概率
proba = gmm.predict_proba(X)`,
        math: '$$p(x) = \\sum_{k=1}^K \\pi_k \\mathcal{N}(x|\\mu_k, \\Sigma_k)$$',
        complexity: 'O(n·k·i)',
        useCases: ['密度估计', '软聚类', '图像分割', '特征学习']
      }
    ]
  },
  {
    id: 'dimensionality',
    title: '降维',
    titleEn: 'Dimensionality Reduction',
    description: '减少特征维度同时保留重要信息，解决维度灾难',
    descriptionEn: 'Reduce feature dimensions while preserving important information',
    icon: <Minimize2 className="w-8 h-8" />,
    color: '#a855f7',
    gradient: 'from-purple-500/20 to-pink-500/20',
    algorithms: [
      {
        name: '主成分分析',
        nameEn: 'PCA (Principal Component Analysis)',
        description: '线性降维，找到数据方差最大的投影方向',
        descriptionEn: 'Linear dimensionality reduction maximizing variance projection',
        code: `from sklearn.decomposition import PCA

# 创建PCA
pca = PCA(n_components=2)

# 拟合变换
X_pca = pca.fit_transform(X)

# 解释方差比
explained_variance = pca.explained_variance_ratio_`,
        math: '$$\\max_{W} Tr(W^T X^T X W) \\text{ s.t. } W^T W = I$$',
        complexity: 'O(n·p² + p³)',
        useCases: ['数据可视化', '噪声消除', '特征提取', '压缩']
      },
      {
        name: 't-SNE',
        nameEn: 't-SNE',
        description: '非线性降维，保持局部结构，适合可视化高维数据',
        descriptionEn: 'Non-linear reduction preserving local structure for visualization',
        code: `from sklearn.manifold import TSNE

# 创建t-SNE
tsne = TSNE(n_components=2, perplexity=30)

# 拟合变换
X_tsne = tsne.fit_transform(X)`,
        math: '$$KL(P||Q) = \\sum_{i \\neq j} p_{ij} \\log \\frac{p_{ij}}{q_{ij}}$$',
        complexity: 'O(n²)',
        useCases: ['数据可视化', '聚类验证', '特征探索', '模式发现']
      },
      {
        name: 'UMAP',
        nameEn: 'UMAP',
        description: '统一流形逼近，保持全局和局部结构',
        descriptionEn: 'Uniform Manifold Approximation preserving global and local structure',
        code: `import umap

# 创建UMAP
reducer = umap.UMAP(n_components=2)

# 拟合变换
X_umap = reducer.fit_transform(X)`,
        math: '$$\\min_{\\phi} \\sum_{i \\neq j} w_{ij} ||\\phi(x_i) - \\phi(x_j)||^2$$',
        complexity: 'O(n)',
        useCases: ['大规模可视化', '聚类分析', '异常检测', '特征学习']
      },
      {
        name: '自编码器',
        nameEn: 'Autoencoder',
        description: '神经网络学习数据的压缩表示，非线性降维',
        descriptionEn: 'Neural network learning compressed representation',
        code: `from sklearn.neural_network import MLPRegressor

# 创建自编码器（对称结构）
autoencoder = MLPRegressor(
    hidden_layer_sizes=[64, 32, 64],
    max_iter=500
)

# 训练（输入=输出）
autoencoder.fit(X, X)

# 提取编码层表示
encoder = autoencoder.coefs_[0]`,
        math: '$$\\min_\\theta \\sum_{i=1}^n ||x_i - g_\\theta(f_\\theta(x_i))||^2$$',
        complexity: 'O(n·e·p)',
        useCases: ['特征学习', '去噪', '异常检测', '生成模型']
      }
    ]
  }
];

export default function AlgorithmMatrix() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [, setSelectedAlgo] = useState<Algorithm | null>(null);
  const [activeTab, setActiveTab] = useState<'theory' | 'code' | 'math'>('theory');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.matrix-title',
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
        '.category-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.matrix-grid',
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="algorithm-matrix"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="matrix-title text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">算法矩阵</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Algorithm Matrix | 四大机器学习类别深度解析
          </p>
        </div>

        {/* Category Grid */}
        <div className="matrix-grid grid md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card glass-card-strong rounded-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-500"
            >
              {/* Card Header */}
              <div className={`p-6 bg-gradient-to-br ${category.gradient} border-b border-white/10`}>
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: `${category.color}30` }}
                  >
                    <div style={{ color: category.color }}>
                      {category.icon}
                    </div>
                  </div>
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                  >
                    {category.algorithms.length} 算法
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-1">{category.title}</h3>
                <p className="text-white/50 text-sm">{category.titleEn}</p>
                <p className="text-white/70 mt-3 text-sm">{category.description}</p>
                <p className="text-white/40 text-xs mt-1">{category.descriptionEn}</p>
              </div>

              {/* Algorithm List */}
              <div className="p-4 space-y-2">
                {category.algorithms.map((algo) => (
                  <Dialog key={algo.name}>
                    <DialogTrigger asChild>
                      <button
                        onClick={() => {
                          setSelectedAlgo(algo);
                          setActiveTab('theory');
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group/item"
                      >
                        <div className="text-left">
                          <span className="text-sm font-medium text-white group-hover/item:text-white transition-colors">
                            {algo.name}
                          </span>
                          <span className="text-xs text-white/40 block">{algo.nameEn}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-white/30 group-hover/item:text-white group-hover/item:translate-x-1 transition-all" />
                      </button>
                    </DialogTrigger>
                    
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-black/95 border-white/10 backdrop-blur-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">
                          {algo.name}
                          <span className="text-white/50 text-lg block mt-1">{algo.nameEn}</span>
                        </DialogTitle>
                      </DialogHeader>

                      {/* Tabs */}
                      <div className="flex gap-2 mt-6 mb-4">
                        {[
                          { id: 'theory', label: '理论', labelEn: 'Theory', icon: BookOpen },
                          { id: 'code', label: '代码', labelEn: 'Code', icon: Code2 },
                          { id: 'math', label: '数学', labelEn: 'Math', icon: Calculator },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as typeof activeTab)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                              activeTab === tab.id
                                ? 'bg-indigo-500 text-white'
                                : 'bg-white/5 text-white/60 hover:bg-white/10'
                            }`}
                          >
                            <tab.icon className="w-4 h-4" />
                            <span>{tab.label}</span>
                            <span className="text-xs opacity-60">{tab.labelEn}</span>
                          </button>
                        ))}
                      </div>

                      {/* Tab Content */}
                      <div className="space-y-6">
                        {activeTab === 'theory' && (
                          <div className="animate-in fade-in duration-300">
                            <div className="glass-card p-4 rounded-xl mb-4">
                              <h4 className="text-sm text-white/40 uppercase tracking-wider mb-2">描述 | Description</h4>
                              <p className="text-white/80">{algo.description}</p>
                              <p className="text-white/50 text-sm mt-2">{algo.descriptionEn}</p>
                            </div>
                            
                            <div className="glass-card p-4 rounded-xl">
                              <h4 className="text-sm text-white/40 uppercase tracking-wider mb-2">应用场景 | Use Cases</h4>
                              <div className="flex flex-wrap gap-2">
                                {algo.useCases.map((useCase) => (
                                  <span
                                    key={useCase}
                                    className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm"
                                  >
                                    {useCase}
                                  </span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="glass-card p-4 rounded-xl mt-4">
                              <h4 className="text-sm text-white/40 uppercase tracking-wider mb-2">时间复杂度 | Time Complexity</h4>
                              <code className="text-cyan-400 font-mono">{algo.complexity}</code>
                            </div>
                          </div>
                        )}

                        {activeTab === 'code' && (
                          <div className="animate-in fade-in duration-300">
                            <div className="code-block">
                              <pre>{algo.code}</pre>
                            </div>
                          </div>
                        )}

                        {activeTab === 'math' && (
                          <div className="animate-in fade-in duration-300">
                            <div className="glass-card p-6 rounded-xl text-center">
                              <div 
                                className="math-formula text-xl"
                                dangerouslySetInnerHTML={{ 
                                  __html: algo.math.replace(/\$\$(.*?)\$\$/g, '<div class="my-4">$1</div>')
                                }}
                              />
                            </div>
                            <p className="text-white/50 text-sm mt-4 text-center">
                              目标函数 | Objective Function
                            </p>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
