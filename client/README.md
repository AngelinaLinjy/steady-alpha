# 二级市场策略分析师 - 前端应用

这是一个基于React + TypeScript + Vite构建的现代化聊天界面，用于与AI二级市场策略分析师进行交互。

## 功能特性

- 🤖 **智能聊天界面**: 现代化的聊天UI，支持实时消息显示
- 💬 **实时通信**: 与后端AI服务实时交互
- 📱 **响应式设计**: 支持桌面和移动设备
- ⚡ **快速响应**: 基于Vite的快速开发体验
- 🎨 **美观界面**: 渐变色彩和流畅动画效果

## 技术栈

- **前端框架**: React 19.1.1
- **开发语言**: TypeScript
- **构建工具**: Vite 7.1.2
- **路由**: React Router DOM 7.8.2
- **样式**: CSS3 (原生样式，无额外依赖)

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 项目结构

```
src/
├── components/          # 组件目录
│   ├── Chat.tsx        # 聊天界面组件
│   ├── Header.tsx      # 导航头部组件
│   └── About.tsx       # 关于页面组件
├── pages/              # 页面目录
│   └── Home.tsx        # 首页组件
├── App.tsx             # 主应用组件
├── App.css             # 全局样式
├── main.tsx            # 应用入口
└── vite-env.d.ts       # Vite类型定义
```

## 主要组件说明

### Chat.tsx
- 聊天界面的核心组件
- 处理消息发送和接收
- 管理聊天状态和UI交互
- 支持打字指示器和错误处理

### Header.tsx
- 应用导航栏
- 提供页面间导航功能

### About.tsx
- 关于页面，介绍应用功能和技术栈

## API集成

应用通过HTTP POST请求与后端服务通信：

```typescript
const response = await fetch('http://localhost:3000/ask', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ question: inputValue }),
});
```

## 样式特性

- **现代化设计**: 使用渐变背景和圆角设计
- **响应式布局**: 适配不同屏幕尺寸
- **流畅动画**: 消息淡入效果和打字指示器
- **用户友好**: 清晰的视觉层次和交互反馈

## 开发说明

1. 确保后端服务运行在 `http://localhost:3000`
2. 前端开发服务器运行在 `http://localhost:5173`
3. 支持热重载，修改代码后自动刷新
4. 使用TypeScript提供类型安全

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT License