import { useState } from 'react';

export default function About() {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      icon: '🧠',
      title: 'RAG技术',
      description: '基于检索增强生成技术，结合专业金融知识库提供准确分析'
    },
    {
      icon: '📊',
      title: '市场分析',
      description: '专业的债券市场、股票市场分析与投资建议'
    },
    {
      icon: '🏛️',
      title: '政策解读',
      description: '深入解读宏观政策和金融监管体制对投资的影响'
    },
    {
      icon: '🎯',
      title: '精准建议',
      description: '目标年化收益率8-10%，帮助投资者做出明智决策'
    }
  ];

  const technologies = [
    { name: 'React', icon: '⚛️', description: '现代化前端框架' },
    { name: 'Node.js', icon: '🟢', description: '高性能后端运行时' },
    { name: 'HuggingFace', icon: '🤗', description: '先进的AI模型平台' },
    { name: 'Ollama', icon: '🦙', description: '本地AI模型部署' },
    { name: 'TypeScript', icon: '📝', description: '类型安全的JavaScript' },
    { name: 'Vite', icon: '⚡', description: '快速构建工具' }
  ];

  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-header">
          <div className="about-icon">📈</div>
          <h1>二级市场策略分析师</h1>
          <p className="about-subtitle">基于RAG技术的专业AI投资分析助手</p>
        </div>

        <div className="about-tabs">
          <button
            className={`tab-button ${activeTab === 'overview' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📋 概述
          </button>
          <button
            className={`tab-button ${activeTab === 'features' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            ✨ 功能特色
          </button>
          <button
            className={`tab-button ${activeTab === 'technology' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('technology')}
          >
            🔧 技术栈
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="tab-panel">
              <div className="overview-section">
                <h3>🎯 项目目标</h3>
                <p>
                  我们致力于为投资者提供专业、准确的二级市场投资分析服务。
                  通过结合先进的AI技术和深厚的金融专业知识，帮助用户在复杂多变的金融市场中做出更明智的决策。
                </p>
              </div>

              <div className="overview-section">
                <h3>💡 核心价值</h3>
                <ul className="value-list">
                  <li>🔍 <strong>深度分析：</strong>基于海量金融数据和市场趋势的专业分析</li>
                  <li>🎯 <strong>精准建议：</strong>目标年化收益率8-10%的投资策略</li>
                  <li>⚡ <strong>实时响应：</strong>快速回答您的投资相关问题</li>
                  <li>🛡️ <strong>风险控制：</strong>全面的风险评估和管理建议</li>
                </ul>
              </div>

              <div className="overview-section">
                <h3>🌟 适用场景</h3>
                <div className="scenario-grid">
                  <div className="scenario-card">
                    <div className="scenario-icon">📊</div>
                    <h4>市场分析</h4>
                    <p>债券、股票市场走势分析和投资机会识别</p>
                  </div>
                  <div className="scenario-card">
                    <div className="scenario-icon">🏛️</div>
                    <h4>政策解读</h4>
                    <p>宏观政策和监管政策对投资的影响分析</p>
                  </div>
                  <div className="scenario-card">
                    <div className="scenario-icon">💰</div>
                    <h4>投资策略</h4>
                    <p>个性化的投资组合配置和资产配置建议</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="tab-panel">
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'technology' && (
            <div className="tab-panel">
              <div className="tech-intro">
                <h3>🚀 现代化技术栈</h3>
                <p>
                  我们采用业界领先的技术栈构建系统，确保高性能、高可用性和优秀的用户体验。
                </p>
              </div>

              <div className="tech-grid">
                {technologies.map((tech, index) => (
                  <div key={index} className="tech-card">
                    <div className="tech-icon">{tech.icon}</div>
                    <h4>{tech.name}</h4>
                    <p>{tech.description}</p>
                  </div>
                ))}
              </div>

              <div className="architecture-info">
                <h3>🏗️ 系统架构</h3>
                <p>
                  系统采用前后端分离架构，前端使用React构建现代化用户界面，
                  后端基于Node.js提供API服务，AI模型层集成HuggingFace Transformers和Ollama，
                  实现高效的文本生成和知识检索功能。
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="about-footer">
          <div className="contact-info">
            <h4>📧 联系我们</h4>
            <p>如有任何问题或建议，欢迎通过系统反馈功能与我们联系。</p>
          </div>
          <div className="version-info">
            <p>版本 1.0.0 | 最后更新：2025年</p>
          </div>
        </div>
      </div>
    </div>
  );
}
