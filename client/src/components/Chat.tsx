import { useState, useRef, useEffect } from 'react';

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
      content: '你好！我是二级市场策略分析师，精通债券市场、股票市场、宏观政策和金融监管体制。有什么问题可以问我！',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputValue]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:3000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: inputValue }),
      });

      if (!response.ok) {
        throw new Error('网络请求失败');
      }

      const data = await response.json();
      
      // Simulate typing delay for better UX
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.answer,
          isUser: false,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        setIsTyping(false);
      }, 1000);
      
    } catch (error) {
      setTimeout(() => {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: '抱歉，发生了错误。请检查网络连接或稍后重试。',
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsLoading(false);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        content: '你好！我是二级市场策略分析师，精通债券市场、股票市场、宏观政策和金融监管体制。有什么问题可以问我！',
        isUser: false,
        timestamp: new Date()
      }
    ]);
  };

  const formatMessage = (content: string) => {
    // Simple formatting for better readability
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="message-paragraph">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-header-content">
          <div className="chat-title">
            <h2>二级市场策略分析师</h2>
            <p>专业的债券、股票市场分析与投资建议</p>
          </div>
          <button 
            onClick={clearChat}
            className="clear-chat-btn"
            title="清空聊天记录"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="messages-container">
        {messages.length === 1 && (
          <div className="welcome-message">
            <div className="welcome-icon">📊</div>
            <h3>欢迎来到策略分析师</h3>
            <p>我可以帮您分析债券市场、股票市场、宏观政策和金融监管体制相关问题。</p>
            <div className="suggested-questions">
              <p className="suggested-title">您可以尝试问：</p>
              <div className="question-chips">
                <span onClick={() => setInputValue('当前债券市场的主要投资机会是什么？')}>
                  📈 债券投资机会
                </span>
                <span onClick={() => setInputValue('股票市场的近期走势如何分析？')}>
                  📉 股市走势分析
                </span>
                <span onClick={() => setInputValue('宏观经济政策对投资有什么影响？')}>
                  🏛️ 宏观政策影响
                </span>
              </div>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-avatar">
              {message.isUser ? '👤' : '🤖'}
            </div>
            <div className="message-wrapper">
              <div className="message-content">
                {formatMessage(message.content)}
              </div>
              <div className="message-time">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message bot-message">
            <div className="message-avatar">🤖</div>
            <div className="message-wrapper">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="typing-text">正在思考中...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="请输入您的问题..."
          disabled={isLoading}
          rows={1}
        />
        <button
          onClick={sendMessage}
          disabled={!inputValue.trim() || isLoading}
          className="send-button"
        >
          {isLoading ? '发送中...' : '发送'}
        </button>
      </div>
    </div>
  );
}
