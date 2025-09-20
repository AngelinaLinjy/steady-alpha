import { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { Card, Typography, Button, List, Avatar, Input, Space, Spin } from 'antd';
import {
  DeleteOutlined,
  BarChartOutlined,
  RiseOutlined,
  FallOutlined,
  BankOutlined,
  UserOutlined,
  RobotOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { useWebSocket, type WebSocketMessage } from '../hooks/useWebSocket';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content:
        '你好！我是二级市场策略分析师，精通债券市场、股票市场、宏观政策和金融监管体制。有什么问题可以问我！',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentBotMessageIdRef = useRef<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleWebSocketMessage = (data: WebSocketMessage) => {
    switch (data.type) {
      case 'start':
        const botMessageId = Date.now().toString();
        currentBotMessageIdRef.current = botMessageId;
        setMessages(prev => [
          ...prev,
          {
            id: botMessageId,
            content: '',
            isUser: false,
            timestamp: new Date(),
          },
        ]);
        break;

      case 'chunk':
        if (data.content) {
          setMessages(prev =>
            prev.map(msg =>
              msg.id === currentBotMessageIdRef.current
                ? { ...msg, content: msg.content + data.content }
                : msg
            )
          );
        }
        break;

      case 'done':
        currentBotMessageIdRef.current = null;
        break;

      case 'error':
        currentBotMessageIdRef.current = null;
        setMessages(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            content: `错误: ${data.message}`,
            isUser: false,
            timestamp: new Date(),
          },
        ]);
        break;
    }
  };

  const { isConnected, isTyping, sendMessage: sendWebSocketMessage, isLoading, setIsLoading } = useWebSocket({
    url: 'ws://localhost:3000/ws',
    onMessage: handleWebSocketMessage,
  });

  const sendMessage = () => {
    if (!inputValue.trim() || isLoading || !isConnected) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    sendWebSocketMessage(userMessage.content);
  };

  const handlePressEnter = (e: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        content:
          '你好！我是二级市场策略分析师，精通债券市场、股票市场、宏观政策和金融监管体制。有什么问题可以问我！',
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  };

  const formatMessage = (content: string) => {
    return content.split('\n').map((paragraph, index) => (
      <Typography.Paragraph key={index} style={{ marginBottom: 8 }}>
        {paragraph}
      </Typography.Paragraph>
    ));
  };

  return (
    <Card
      style={{ width: '100%', height: '78vh', display: 'flex', flexDirection: 'column' }}
      bodyStyle={{
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'hidden',
      }}
      title={
        <div>
          <Typography.Title level={4} style={{ marginBottom: 0 }}>
            二级市场策略分析师
          </Typography.Title>
          <Typography.Text type="secondary">专业的债券、股票市场分析与投资建议</Typography.Text>
        </div>
      }
      extra={
        <Button
          type="text"
          aria-label="清空聊天记录"
          onClick={clearChat}
          icon={<DeleteOutlined />}
        />
      }
    >
      <div style={{ flex: 1, overflowY: 'auto', padding: 16 }}>
        {messages.length === 1 && (
          <Card style={{ textAlign: 'center', marginBottom: 16 }}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <BarChartOutlined style={{ fontSize: 28 }} />
              <Typography.Title level={4} style={{ margin: 0 }}>
                欢迎来到策略分析师
              </Typography.Title>
              <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
                我可以帮您分析债券市场、股票市场、宏观政策和金融监管体制相关问题。
              </Typography.Paragraph>
              <div>
                <Typography.Text strong>您可以尝试问：</Typography.Text>
                <div style={{ marginTop: 8 }}>
                  <Space wrap>
                    <Button
                      size="small"
                      onClick={() => setInputValue('当前债券市场的主要投资机会是什么？')}
                      icon={<RiseOutlined />}
                    >
                      债券投资机会
                    </Button>
                    <Button
                      size="small"
                      onClick={() => setInputValue('股票市场的近期走势如何分析？')}
                      icon={<FallOutlined />}
                    >
                      股市走势分析
                    </Button>
                    <Button
                      size="small"
                      onClick={() => setInputValue('宏观经济政策对投资有什么影响？')}
                      icon={<BankOutlined />}
                    >
                      宏观政策影响
                    </Button>
                  </Space>
                </div>
              </div>
            </Space>
          </Card>
        )}

        <List
          dataSource={messages}
          renderItem={message => (
            <List.Item style={{ borderBlockEnd: 'none', padding: '8px 0' }}>
              <Space
                align="start"
                style={{
                  width: '100%',
                  justifyContent: message.isUser ? 'flex-end' : 'flex-start',
                }}
              >
                {!message.isUser && <Avatar icon={<RobotOutlined />} />}
                <Card
                  size="small"
                  style={{ maxWidth: '80%', background: message.isUser ? '#e6f4ff' : '#fafafa' }}
                  bodyStyle={{ padding: 12 }}
                >
                  {formatMessage(message.content)}
                  <div style={{ textAlign: message.isUser ? 'right' : 'left' }}>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Typography.Text>
                  </div>
                </Card>
                {message.isUser && (
                  <Avatar style={{ backgroundColor: '#1677ff' }} icon={<UserOutlined />} />
                )}
              </Space>
            </List.Item>
          )}
        />

        {isTyping && (
          <div style={{ padding: '8px 0' }}>
            <Space align="center">
              <Avatar icon={<RobotOutlined />} />
              <Space>
                <Spin size="small" />
                <Typography.Text type="secondary">正在思考中...</Typography.Text>
              </Space>
            </Space>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div style={{ padding: 16, borderTop: '1px solid #f0f0f0' }}>
        <Space.Compact style={{ width: '100%' }}>
          <Input.TextArea
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onPressEnter={handlePressEnter}
            placeholder="请输入您的问题..."
            disabled={isLoading}
            autoSize={{ minRows: 1, maxRows: 4 }}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading || !isConnected}
          >
            {isLoading ? '发送中' : '发送'}
          </Button>
        </Space.Compact>
      </div>
    </Card>
  );
}
