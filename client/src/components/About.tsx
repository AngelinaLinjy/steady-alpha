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
import { Tabs, Card, Row, Col, Typography } from 'antd';

export default function About() {
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
    <div className="flex-1 flex justify-center items-start overflow-y-auto">
      <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl card-shadow w-full animate-fade-in-up">
        <div className="text-center mb-6 sm:mb-8 relative">
          <div className="mx-auto mb-3 sm:mb-4 h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-gradient-to-br from-black/5 to-black/10 flex items-center justify-center animate-bounce-slow">
            <ChartBarIcon className="h-9 w-9 sm:h-10 sm:w-10 text-black" aria-hidden="true" />
          </div>
          <Typography.Title level={2} className="!m-0 gradient-text">
            二级市场策略分析师
          </Typography.Title>
          <Typography.Paragraph className="!mt-2 text-gray-600 text-base sm:text-lg">
            基于RAG技术的专业AI投资分析助手
          </Typography.Paragraph>
        </div>

        <Tabs
          defaultActiveKey="overview"
          items={[
            {
              key: 'overview',
              label: (
                <span className="inline-flex items-center gap-2">
                  <ClipboardDocumentListIcon className="h-5 w-5" /> 概述
                </span>
              ),
              children: (
                <div className="min-h-[400px] animate-fade-in">
                  <div className="mb-6 sm:mb-8">
                    <Typography.Title
                      level={4}
                      className="!mb-3 !mt-0 inline-flex items-center gap-2 text-gray-800"
                    >
                      <ArrowTrendingUpIcon className="h-6 w-6 text-black" /> 项目目标
                    </Typography.Title>
                    <Typography.Paragraph className="text-gray-600 !mb-0">
                      我们致力于为投资者提供专业、准确的二级市场投资分析服务。通过结合先进的AI技术和深厚的金融专业知识，帮助用户在复杂多变的金融市场中做出更明智的决策。
                    </Typography.Paragraph>
                  </div>

                  <div className="mb-6 sm:mb-8">
                    <Typography.Title
                      level={4}
                      className="!mb-3 !mt-0 inline-flex items-center gap-2 text-gray-800"
                    >
                      <LightBulbIcon className="h-6 w-6 text-black" /> 核心价值
                    </Typography.Title>
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <Card>
                          <div className="text-gray-600">
                            <span className="inline-flex items-center gap-2">
                              <ChartBarIcon className="h-5 w-5 text-gray-700" />
                              <strong className="text-gray-800">深度分析：</strong>
                            </span>
                            <span className="ml-2">基于海量金融数据和市场趋势的专业分析</span>
                          </div>
                        </Card>
                      </Col>
                      <Col span={24}>
                        <Card>
                          <div className="text-gray-600">
                            <span className="inline-flex items-center gap-2">
                              <ArrowTrendingUpIcon className="h-5 w-5 text-gray-700" />
                              <strong className="text-gray-800">精准建议：</strong>
                            </span>
                            <span className="ml-2">目标年化收益率8-10%的投资策略</span>
                          </div>
                        </Card>
                      </Col>
                      <Col span={24}>
                        <Card>
                          <div className="text-gray-600">
                            <span className="inline-flex items-center gap-2">
                              <BoltIcon className="h-5 w-5 text-gray-700" />
                              <strong className="text-gray-800">实时响应：</strong>
                            </span>
                            <span className="ml-2">快速回答您的投资相关问题</span>
                          </div>
                        </Card>
                      </Col>
                      <Col span={24}>
                        <Card>
                          <div className="text-gray-600">
                            <span className="inline-flex items-center gap-2">
                              <ShieldCheckIcon className="h-5 w-5 text-gray-700" />
                              <strong className="text-gray-800">风险控制：</strong>
                            </span>
                            <span className="ml-2">全面的风险评估和管理建议</span>
                          </div>
                        </Card>
                      </Col>
                    </Row>
                  </div>

                  <div className="mb-6 sm:mb-8">
                    <Typography.Title
                      level={4}
                      className="!mb-3 !mt-0 inline-flex items-center gap-2 text-gray-800"
                    >
                      <SparklesIcon className="h-6 w-6 text-black" /> 适用场景
                    </Typography.Title>
                    <Row gutter={[16, 16]}>
                      <Col xs={24} md={8}>
                        <Card hoverable>
                          <ChartBarIcon className="h-12 w-12 mx-auto mb-4 text-black" />
                          <Typography.Title level={4} className="!m-0 text-center">
                            市场分析
                          </Typography.Title>
                          <Typography.Paragraph className="!mt-2 !mb-0 text-center text-gray-600">
                            债券、股票市场走势分析和投资机会识别
                          </Typography.Paragraph>
                        </Card>
                      </Col>
                      <Col xs={24} md={8}>
                        <Card hoverable>
                          <BuildingLibraryIcon className="h-12 w-12 mx-auto mb-4 text-black" />
                          <Typography.Title level={4} className="!m-0 text-center">
                            政策解读
                          </Typography.Title>
                          <Typography.Paragraph className="!mt-2 !mb-0 text-center text-gray-600">
                            宏观政策和监管政策对投资的影响分析
                          </Typography.Paragraph>
                        </Card>
                      </Col>
                      <Col xs={24} md={8}>
                        <Card hoverable>
                          <BanknotesIcon className="h-12 w-12 mx-auto mb-4 text-black" />
                          <Typography.Title level={4} className="!m-0 text-center">
                            投资策略
                          </Typography.Title>
                          <Typography.Paragraph className="!mt-2 !mb-0 text-center text-gray-600">
                            个性化的投资组合配置和资产配置建议
                          </Typography.Paragraph>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                </div>
              ),
            },
            {
              key: 'features',
              label: (
                <span className="inline-flex items-center gap-2">
                  <SparklesIcon className="h-5 w-5" /> 功能特色
                </span>
              ),
              children: (
                <div className="min-h-[400px] animate-fade-in">
                  <Row gutter={[16, 16]}>
                    {features.map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <Col xs={24} md={12} key={index}>
                          <Card hoverable>
                            <Icon className="h-12 w-12 mx-auto mb-4 text-black" />
                            <Typography.Title level={4} className="!m-0 text-center">
                              {feature.title}
                            </Typography.Title>
                            <Typography.Paragraph className="!mt-2 !mb-0 text-center text-gray-600">
                              {feature.description}
                            </Typography.Paragraph>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              ),
            },
            {
              key: 'technology',
              label: (
                <span className="inline-flex items-center gap-2">
                  <CpuChipIcon className="h-5 w-5" /> 技术栈
                </span>
              ),
              children: (
                <div className="min-h-[400px] animate-fade-in">
                  <div className="text-center mb-6 sm:mb-8">
                    <Typography.Title
                      level={4}
                      className="!mb-2 inline-flex items-center gap-2 justify-center"
                    >
                      <RocketLaunchIcon className="h-6 w-6 text-black" /> 现代化技术栈
                    </Typography.Title>
                    <Typography.Paragraph className="!m-0 text-gray-600">
                      我们采用业界领先的技术栈构建系统，确保高性能、高可用性和优秀的用户体验。
                    </Typography.Paragraph>
                  </div>
                  <Row gutter={[16, 16]}>
                    {technologies.map((tech, index) => (
                      <Col xs={24} md={12} lg={8} key={index}>
                        <Card hoverable>
                          <tech.icon className="h-8 w-8 mx-auto mb-2 text-black" />
                          <Typography.Title level={5} className="!m-0 text-center">
                            {tech.name}
                          </Typography.Title>
                          <Typography.Paragraph className="!mt-2 !mb-0 text-center text-gray-600">
                            {tech.description}
                          </Typography.Paragraph>
                        </Card>
                      </Col>
                    ))}
                  </Row>

                  <Card className="mt-6 sm:mt-8" bordered>
                    <Typography.Title level={4} className="!mb-2 inline-flex items-center gap-2">
                      <BuildingLibraryIcon className="h-6 w-6 text-black" /> 系统架构
                    </Typography.Title>
                    <Typography.Paragraph className="!m-0 text-gray-600">
                      系统采用前后端分离架构，前端使用React构建现代化用户界面，后端基于Node.js提供API服务，AI模型层集成HuggingFace
                      Transformers和Ollama，实现高效的文本生成和知识检索功能。
                    </Typography.Paragraph>
                  </Card>
                </div>
              ),
            },
          ]}
        />

        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t-2 border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
          <div>
            <Typography.Title level={5} className="!mb-2 inline-flex items-center gap-2">
              <EnvelopeIcon className="h-5 w-5" /> 联系我们
            </Typography.Title>
            <Typography.Paragraph className="!my-2 text-gray-600">
              Wechat: shilling001
            </Typography.Paragraph>
            <Typography.Paragraph className="!m-0 text-gray-600">
              如有任何问题或建议，欢迎通过系统反馈功能与我们联系。
            </Typography.Paragraph>
          </div>
        </div>
        <div>
          <p className="text-gray-400 text-xs sm:text-sm m-0 text-right md:text-left">
            版本 1.0.0 | 最后更新：2025年
          </p>
        </div>
      </div>
    </div>
  );
}
