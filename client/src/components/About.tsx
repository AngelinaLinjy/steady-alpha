import { useState } from 'react';
import {
  ChartBarIcon,
  BoltIcon,
  ShieldCheckIcon,
  SparklesIcon,
  BanknotesIcon,
  BuildingLibraryIcon,
  CpuChipIcon,
  EnvelopeIcon,
  RocketLaunchIcon,
  ClipboardDocumentListIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import {
  PresentationChartLineIcon,
  LightBulbIcon,
  CircleStackIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/solid';

export default function About() {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      icon: CpuChipIcon,
      title: 'RAG技术',
      description: '基于检索增强生成技术，结合专业金融知识库提供准确分析',
    },
    {
      icon: PresentationChartLineIcon,
      title: '市场分析',
      description: '专业的债券市场、股票市场分析与投资建议',
    },
    {
      icon: BuildingLibraryIcon,
      title: '政策解读',
      description: '深入解读宏观政策和金融监管体制对投资的影响',
    },
    {
      icon: ArrowTrendingUpIcon,
      title: '精准建议',
      description: '目标年化收益率8-10%，帮助投资者做出明智决策',
    },
  ];

  const technologies = [
    { name: 'React', icon: Squares2X2Icon, description: '现代化前端框架' },
    { name: 'Node.js', icon: CircleStackIcon, description: '高性能后端运行时' },
    { name: 'HuggingFace', icon: SparklesIcon, description: '先进的AI模型平台' },
    { name: 'Ollama', icon: CpuChipIcon, description: '本地AI模型部署' },
    { name: 'TypeScript', icon: ClipboardDocumentListIcon, description: '类型安全的JavaScript' },
    { name: 'Vite', icon: BoltIcon, description: '快速构建工具' },
  ];

  return (
    <div className="flex-1 flex justify-center items-start p-8 overflow-y-auto">
      <div className="bg-white p-8 rounded-3xl card-shadow max-w-4xl w-full animate-fade-in-up">
        <div className="text-center mb-8 relative">
          <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-black/5 to-black/10 flex items-center justify-center animate-bounce-slow">
            <ChartBarIcon className="h-10 w-10 text-black" aria-hidden="true" />
          </div>
          <h1 className="text-gray-800 mb-2 text-4xl font-bold gradient-text">
            二级市场策略分析师
          </h1>
          <p className="text-gray-600 text-lg">基于RAG技术的专业AI投资分析助手</p>
        </div>

        <div className="flex justify-center mb-8 border-b-2 border-gray-100 gap-4">
          <button
            className={`bg-transparent border-none px-6 py-4 cursor-pointer text-base font-medium transition-all duration-300 rounded-t-xl ${
              activeTab === 'overview'
                ? 'text-black border-b-3 border-black bg-black/5'
                : 'text-gray-600 hover:text-black hover:bg-black/5'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="inline-flex items-center gap-2">
              <ClipboardDocumentListIcon className="h-5 w-5" /> 概述
            </span>
          </button>
          <button
            className={`bg-transparent border-none px-6 py-4 cursor-pointer text-base font-medium transition-all duration-300 rounded-t-xl ${
              activeTab === 'features'
                ? 'text-black border-b-3 border-black bg-black/5'
                : 'text-gray-600 hover:text-black hover:bg-black/5'
            }`}
            onClick={() => setActiveTab('features')}
          >
            <span className="inline-flex items-center gap-2">
              <SparklesIcon className="h-5 w-5" /> 功能特色
            </span>
          </button>
          <button
            className={`bg-transparent border-none px-6 py-4 cursor-pointer text-base font-medium transition-all duration-300 rounded-t-xl ${
              activeTab === 'technology'
                ? 'text-black border-b-3 border-black bg-black/5'
                : 'text-gray-600 hover:text-black hover:bg-black/5'
            }`}
            onClick={() => setActiveTab('technology')}
          >
            <span className="inline-flex items-center gap-2">
              <CpuChipIcon className="h-5 w-5" /> 技术栈
            </span>
          </button>
        </div>

        <div className="min-h-[400px]">
          {activeTab === 'overview' && (
            <div className="animate-fade-in">
              <div className="mb-8">
                <h3 className="text-gray-800 mb-4 text-xl font-bold flex items-center gap-2">
                  <ArrowTrendingUpIcon className="h-6 w-6 text-black" /> 项目目标
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  我们致力于为投资者提供专业、准确的二级市场投资分析服务。
                  通过结合先进的AI技术和深厚的金融专业知识，帮助用户在复杂多变的金融市场中做出更明智的决策。
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-gray-800 mb-4 text-xl font-bold flex items-center gap-2">
                  <LightBulbIcon className="h-6 w-6 text-black" /> 核心价值
                </h3>
                <ul className="list-none p-0">
                  <li className="text-gray-600 leading-relaxed mb-3 pl-6 relative">
                    <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-black to-black"></span>
                    <span className="inline-flex items-center gap-2">
                      <ChartBarIcon className="h-5 w-5 text-gray-700" />{' '}
                      <strong className="text-gray-800">深度分析：</strong>
                    </span>
                    基于海量金融数据和市场趋势的专业分析
                  </li>
                  <li className="text-gray-600 leading-relaxed mb-3 pl-6 relative">
                    <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-black to-black"></span>
                    <span className="inline-flex items-center gap-2">
                      <ArrowTrendingUpIcon className="h-5 w-5 text-gray-700" />{' '}
                      <strong className="text-gray-800">精准建议：</strong>
                    </span>
                    目标年化收益率8-10%的投资策略
                  </li>
                  <li className="text-gray-600 leading-relaxed mb-3 pl-6 relative">
                    <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-black to-black"></span>
                    <span className="inline-flex items-center gap-2">
                      <BoltIcon className="h-5 w-5 text-gray-700" />{' '}
                      <strong className="text-gray-800">实时响应：</strong>
                    </span>
                    快速回答您的投资相关问题
                  </li>
                  <li className="text-gray-600 leading-relaxed mb-3 pl-6 relative">
                    <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-black to-black"></span>
                    <span className="inline-flex items-center gap-2">
                      <ShieldCheckIcon className="h-5 w-5 text-gray-700" />{' '}
                      <strong className="text-gray-800">风险控制：</strong>
                    </span>
                    全面的风险评估和管理建议
                  </li>
                </ul>
              </div>

              <div className="mb-8 ">
                <h3 className="text-gray-800 mb-4 text-xl font-bold flex items-center gap-2">
                  <SparklesIcon className="h-6 w-6 text-black" /> 适用场景
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-gray-50 p-8 rounded-2xl text-center transition-all duration-300 border-2 border-gray-200 hover:-translate-y-1 hover:shadow-lg hover:border-black hover:bg-gradient-to-br hover:from-black/5 hover:to-black/10">
                    <ChartBarIcon className="h-12 w-12 mx-auto mb-4 text-black" />
                    <h4 className="text-gray-800 mb-4 text-xl font-semibold">市场分析</h4>
                    <p className="text-gray-600 leading-relaxed m-0">
                      债券、股票市场走势分析和投资机会识别
                    </p>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-2xl text-center transition-all duration-300 border-2 border-gray-200 hover:-translate-y-1 hover:shadow-lg hover:border-black hover:bg-gradient-to-br hover:from-black/5 hover:to-black/10">
                    <BuildingLibraryIcon className="h-12 w-12 mx-auto mb-4 text-black" />
                    <h4 className="text-gray-800 mb-4 text-xl font-semibold">政策解读</h4>
                    <p className="text-gray-600 leading-relaxed m-0">
                      宏观政策和监管政策对投资的影响分析
                    </p>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-2xl text-center transition-all duration-300 border-2 border-gray-200 hover:-translate-y-1 hover:shadow-lg hover:border-black hover:bg-gradient-to-br hover:from-black/5 hover:to-black/10">
                    <BanknotesIcon className="h-12 w-12 mx-auto mb-4 text-black" />
                    <h4 className="text-gray-800 mb-4 text-xl font-semibold">投资策略</h4>
                    <p className="text-gray-600 leading-relaxed m-0">
                      个性化的投资组合配置和资产配置建议
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="bg-gray-50 p-8 rounded-2xl text-center transition-all duration-300 border-2 border-gray-200 hover:-translate-y-1 hover:shadow-lg hover:border-black hover:bg-gradient-to-br hover:from-black/5 hover:to-black/10"
                    >
                      <Icon className="h-12 w-12 mx-auto mb-4 text-black" />
                      <h4 className="text-gray-800 mb-4 text-xl font-semibold">{feature.title}</h4>
                      <p className="text-gray-600 leading-relaxed m-0">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'technology' && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h3 className="text-gray-800 mb-4 text-xl font-bold inline-flex items-center gap-2 justify-center">
                  <RocketLaunchIcon className="h-6 w-6 text-black" /> 现代化技术栈
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  我们采用业界领先的技术栈构建系统，确保高性能、高可用性和优秀的用户体验。
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {technologies.map((tech, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl text-center transition-all duration-300 border-2 border-gray-200 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-black"
                  >
                    <tech.icon className="h-8 w-8 mx-auto mb-2 text-black" />
                    <h4 className="text-gray-800 mb-2 text-lg font-semibold">{tech.name}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed m-0">{tech.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-black/5 to-black/10 p-8 rounded-2xl border-l-4 border-black">
                <h3 className="text-gray-800 mb-4 text-xl font-bold inline-flex items-center gap-2">
                  <BuildingLibraryIcon className="h-6 w-6 text-black" /> 系统架构
                </h3>
                <p className="text-gray-600 leading-relaxed m-0">
                  系统采用前后端分离架构，前端使用React构建现代化用户界面，
                  后端基于Node.js提供API服务，AI模型层集成HuggingFace Transformers和Ollama，
                  实现高效的文本生成和知识检索功能。
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 pt-8 border-t-2 border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div>
            <h4 className="text-gray-800 mb-2 text-lg font-semibold inline-flex items-center gap-2">
              <EnvelopeIcon className="h-5 w-5" /> 联系我们
            </h4>
            <p className="text-gray-600 leading-relaxed my-2">Wechat: shilling001</p>
            <p className="text-gray-600 leading-relaxed m-0">
              如有任何问题或建议，欢迎通过系统反馈功能与我们联系。
            </p>
          </div>
        </div>
        <div>
          <p className="text-gray-400 text-sm m-0 text-right md:text-left">
            版本 1.0.0 | 最后更新：2025年
          </p>
        </div>
      </div>
    </div>
  );
}
