import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Play, 
  HelpCircle, 
  Database, 
  Tags, 
  BarChart3, 
  Layers, 
  ArrowRight,
  CheckCircle2,
  XCircle
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FlowNode {
  id: string;
  type: 'start' | 'decision' | 'category' | 'algorithm';
  label: string;
  labelEn: string;
  description: string;
  descriptionEn: string;
  icon: React.ReactNode;
  yes?: string;
  no?: string;
  color: string;
}

const flowData: Record<string, FlowNode> = {
  start: {
    id: 'start',
    type: 'start',
    label: '开始',
    labelEn: 'START',
    description: '机器学习算法选择起点',
    descriptionEn: 'Starting point for ML algorithm selection',
    icon: <Play className="w-5 h-5" />,
    color: '#eab308',
  },
  sample_size: {
    id: 'sample_size',
    type: 'decision',
    label: '> 50 样本？',
    labelEn: '> 50 samples?',
    description: '检查数据集大小是否足够',
    descriptionEn: 'Check if dataset is large enough',
    icon: <Database className="w-5 h-5" />,
    yes: 'predict_category',
    no: 'more_data',
    color: '#6366f1',
  },
  more_data: {
    id: 'more_data',
    type: 'algorithm',
    label: '获取更多数据',
    labelEn: 'Get More Data',
    description: '样本量太小，需要收集更多数据',
    descriptionEn: 'Sample size too small, collect more data',
    icon: <XCircle className="w-5 h-5" />,
    color: '#ef4444',
  },
  predict_category: {
    id: 'predict_category',
    type: 'decision',
    label: '预测类别？',
    labelEn: 'Predicting Category?',
    description: '确定是分类问题还是其他类型',
    descriptionEn: 'Determine if it\'s a classification problem',
    icon: <HelpCircle className="w-5 h-5" />,
    yes: 'labeled_data',
    no: 'predict_quantity',
    color: '#6366f1',
  },
  predict_quantity: {
    id: 'predict_quantity',
    type: 'decision',
    label: '预测数值？',
    labelEn: 'Predicting Quantity?',
    description: '确定是回归问题',
    descriptionEn: 'Determine if it\'s a regression problem',
    icon: <BarChart3 className="w-5 h-5" />,
    yes: 'regression',
    no: 'just_looking',
    color: '#6366f1',
  },
  labeled_data: {
    id: 'labeled_data',
    type: 'decision',
    label: '有标签数据？',
    labelEn: 'Labeled Data?',
    description: '检查数据是否有标签',
    descriptionEn: 'Check if data has labels',
    icon: <Tags className="w-5 h-5" />,
    yes: 'classification',
    no: 'clustering',
    color: '#6366f1',
  },
  classification: {
    id: 'classification',
    type: 'category',
    label: '分类',
    labelEn: 'Classification',
    description: '将数据分到预定义类别中',
    descriptionEn: 'Assign data to predefined categories',
    icon: <Layers className="w-5 h-5" />,
    color: '#22c55e',
  },
  regression: {
    id: 'regression',
    type: 'category',
    label: '回归',
    labelEn: 'Regression',
    description: '预测连续数值输出',
    descriptionEn: 'Predict continuous numerical output',
    icon: <BarChart3 className="w-5 h-5" />,
    color: '#22c55e',
  },
  clustering: {
    id: 'clustering',
    type: 'category',
    label: '聚类',
    labelEn: 'Clustering',
    description: '发现数据中的自然分组',
    descriptionEn: 'Discover natural groupings in data',
    icon: <Layers className="w-5 h-5" />,
    color: '#22c55e',
  },
  just_looking: {
    id: 'just_looking',
    type: 'decision',
    label: '只是探索？',
    labelEn: 'Just Looking?',
    description: '无监督探索性分析',
    descriptionEn: 'Unsupervised exploratory analysis',
    icon: <HelpCircle className="w-5 h-5" />,
    yes: 'dimensionality_reduction',
    no: 'tough_luck',
    color: '#6366f1',
  },
  dimensionality_reduction: {
    id: 'dimensionality_reduction',
    type: 'category',
    label: '降维',
    labelEn: 'Dimensionality Reduction',
    description: '减少特征数量同时保留信息',
    descriptionEn: 'Reduce feature count while preserving information',
    icon: <Layers className="w-5 h-5" />,
    color: '#22c55e',
  },
  tough_luck: {
    id: 'tough_luck',
    type: 'algorithm',
    label: '运气不好',
    labelEn: 'Tough Luck',
    description: '可能需要重新思考问题',
    descriptionEn: 'May need to reconsider the problem',
    icon: <XCircle className="w-5 h-5" />,
    color: '#ef4444',
  },
};

export default function FlowchartExplorer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<string>('start');
  const [path, setPath] = useState<string[]>(['start']);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.flowchart-title',
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
        '.flow-node',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          stagger: 0.05,
          scrollTrigger: {
            trigger: '.flowchart-container',
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleNodeClick = (nodeId: string) => {
    setActiveNode(nodeId);
    
    if (!path.includes(nodeId)) {
      setPath([...path, nodeId]);
    }
    
    setShowDetails(true);
  };

  const getNodeStyle = (_type: string, isActive: boolean) => {
    const base = 'flow-node relative flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105';
    
    if (isActive) {
      return `${base} shadow-lg`;
    }
    
    return base;
  };

  const renderNode = (nodeId: string) => {
    const node = flowData[nodeId];
    const isActive = activeNode === nodeId;
    const isInPath = path.includes(nodeId);

    return (
      <div
        key={nodeId}
        className={getNodeStyle(node.type, isActive)}
        style={{
          borderColor: node.color,
          backgroundColor: isActive ? `${node.color}30` : `${node.color}10`,
          boxShadow: isActive ? `0 0 30px ${node.color}40` : 'none',
        }}
        onClick={() => handleNodeClick(nodeId)}
      >
        <div 
          className="p-2 rounded-lg mb-2"
          style={{ backgroundColor: `${node.color}30` }}
        >
          {node.icon}
        </div>
        <span className="text-sm font-medium text-white text-center">{node.label}</span>
        <span className="text-xs text-white/50 text-center">{node.labelEn}</span>
        
        {isInPath && (
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-3 h-3 text-white" />
          </div>
        )}
      </div>
    );
  };

  return (
    <section 
      id="flowchart-explorer"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flowchart-title text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">决策流程探索器</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Decision Flow Explorer | 点击节点探索算法选择路径
          </p>
        </div>

        {/* Flowchart Container */}
        <div className="flowchart-container grid lg:grid-cols-2 gap-8">
          {/* Left: Interactive Flowchart */}
          <div className="glass-card-strong p-6 rounded-2xl">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              交互式流程图 | Interactive Flowchart
            </h3>
            
            <div className="space-y-6">
              {/* Start Node */}
              <div className="flex justify-center">
                {renderNode('start')}
              </div>
              
              {/* First Decision */}
              <div className="flex justify-center">
                {renderNode('sample_size')}
              </div>
              
              {/* Branching */}
              <div className="grid grid-cols-2 gap-8">
                {/* Yes Branch */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-400 text-sm justify-center">
                    <span className="px-2 py-1 bg-green-500/20 rounded">Yes</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  {renderNode('predict_category')}
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
                        <span className="px-2 py-1 bg-green-500/20 rounded text-xs">Yes</span>
                      </div>
                      {renderNode('labeled_data')}
                      <div className="mt-4">
                        {renderNode('classification')}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
                        <span className="px-2 py-1 bg-red-500/20 rounded text-xs">No</span>
                      </div>
                      {renderNode('clustering')}
                    </div>
                  </div>
                </div>
                
                {/* No Branch */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-red-400 text-sm justify-center">
                    <span className="px-2 py-1 bg-red-500/20 rounded">No</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  {renderNode('more_data')}
                </div>
              </div>
              
              {/* Second Level Branching */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
                    <span className="px-2 py-1 bg-red-500/20 rounded text-xs">No</span>
                  </div>
                  {renderNode('predict_quantity')}
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
                      <span className="px-2 py-1 bg-green-500/20 rounded text-xs">Yes</span>
                    </div>
                    {renderNode('regression')}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-red-400 text-sm mb-2">
                    <span className="px-2 py-1 bg-red-500/20 rounded text-xs">No</span>
                  </div>
                  {renderNode('just_looking')}
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
                      <span className="px-2 py-1 bg-green-500/20 rounded text-xs">Yes</span>
                    </div>
                    {renderNode('dimensionality_reduction')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Node Details */}
          <div className="space-y-6">
            <div className="glass-card-strong p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" />
                节点详情 | Node Details
              </h3>
              
              {showDetails && activeNode && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div 
                    className="p-4 rounded-xl border-2"
                    style={{ 
                      borderColor: flowData[activeNode].color,
                      backgroundColor: `${flowData[activeNode].color}10`
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: `${flowData[activeNode].color}30` }}
                      >
                        {flowData[activeNode].icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold">{flowData[activeNode].label}</h4>
                        <p className="text-sm text-white/50">{flowData[activeNode].labelEn}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs text-white/40 uppercase tracking-wider">描述 | Description</span>
                        <p className="text-white/80 mt-1">{flowData[activeNode].description}</p>
                        <p className="text-white/50 text-sm mt-1">{flowData[activeNode].descriptionEn}</p>
                      </div>
                      
                      <div>
                        <span className="text-xs text-white/40 uppercase tracking-wider">类型 | Type</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span 
                            className="px-3 py-1 rounded-full text-sm"
                            style={{ 
                              backgroundColor: `${flowData[activeNode].color}30`,
                              color: flowData[activeNode].color
                            }}
                          >
                            {flowData[activeNode].type === 'start' && '起点 | Start'}
                            {flowData[activeNode].type === 'decision' && '决策 | Decision'}
                            {flowData[activeNode].type === 'category' && '类别 | Category'}
                            {flowData[activeNode].type === 'algorithm' && '算法 | Algorithm'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {!showDetails && (
                <div className="text-center py-12 text-white/40">
                  <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>点击左侧节点查看详情</p>
                  <p className="text-sm">Click a node to view details</p>
                </div>
              )}
            </div>

            {/* Path History */}
            <div className="glass-card-strong p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ArrowRight className="w-5 h-5 text-cyan-400" />
                探索路径 | Exploration Path
              </h3>
              
              <div className="flex flex-wrap items-center gap-2">
                {path.map((nodeId, index) => (
                  <div key={nodeId} className="flex items-center gap-2">
                    <span 
                      className="px-3 py-1 rounded-lg text-sm"
                      style={{ 
                        backgroundColor: `${flowData[nodeId].color}20`,
                        color: flowData[nodeId].color
                      }}
                    >
                      {flowData[nodeId].label}
                    </span>
                    {index < path.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-white/30" />
                    )}
                  </div>
                ))}
              </div>
              
              <button
                onClick={() => {
                  setPath(['start']);
                  setActiveNode('start');
                  setShowDetails(false);
                }}
                className="mt-4 text-sm text-white/50 hover:text-white transition-colors"
              >
                重置路径 | Reset Path
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
