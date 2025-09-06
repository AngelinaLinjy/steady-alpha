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
    <div className="w-full max-w-4xl h-[80vh] bg-white rounded-3xl card-shadow flex flex-col overflow-hidden">
      <div className="gradient-bg text-white p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        <div className="flex justify-between items-center relative z-10">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">二级市场策略分析师</h2>
            <p className="opacity-90 text-sm">专业的债券、股票市场分析与投资建议</p>
          </div>
          <button 
            onClick={clearChat}
            className="bg-white/20 border-none text-white w-10 h-10 rounded-full cursor-pointer text-xl transition-all duration-300 flex items-center justify-center hover:bg-white/30 hover:scale-110"
            title="清空聊天记录"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        {messages.length === 1 && (
          <div className="text-center p-8 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl mx-4 animate-fade-in-up">
            <div className="text-6xl mb-4 animate-bounce-slow">📊</div>
            <h3 className="text-gray-800 text-2xl font-bold mb-4">欢迎来到策略分析师</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">我可以帮您分析债券市场、股票市场、宏观政策和金融监管体制相关问题。</p>
            <div className="text-left">
              <p className="text-gray-700 font-semibold mb-4 text-center">您可以尝试问：</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span 
                  onClick={() => setInputValue('当前债券市场的主要投资机会是什么？')}
                  className="bg-white text-primary-500 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 border-2 border-primary-100 text-sm whitespace-nowrap hover:bg-primary-500 hover:text-white hover:-translate-y-0.5 hover:shadow-lg"
                >
                  📈 债券投资机会
                </span>
                <span 
                  onClick={() => setInputValue('股票市场的近期走势如何分析？')}
                  className="bg-white text-primary-500 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 border-2 border-primary-100 text-sm whitespace-nowrap hover:bg-primary-500 hover:text-white hover:-translate-y-0.5 hover:shadow-lg"
                >
                  📉 股市走势分析
                </span>
                <span 
                  onClick={() => setInputValue('宏观经济政策对投资有什么影响？')}
                  className="bg-white text-primary-500 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 border-2 border-primary-100 text-sm whitespace-nowrap hover:bg-primary-500 hover:text-white hover:-translate-y-0.5 hover:shadow-lg"
                >
                  🏛️ 宏观政策影响
                </span>
              </div>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 animate-fade-in-up ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${
              message.isUser 
                ? 'bg-gradient-to-br from-primary-500 to-secondary-500' 
                : 'bg-gradient-to-br from-gray-100 to-gray-200'
            }`}>
              {message.isUser ? '👤' : '🤖'}
            </div>
            <div className={`flex-1 max-w-[calc(100%-50px)] ${message.isUser ? 'text-right' : 'text-left'}`}>
              <div className={`message-bubble ${
                message.isUser ? 'user-message' : 'bot-message'
              }`}>
                {formatMessage(message.content)}
              </div>
              <div className={`text-xs text-gray-500 mt-1 px-2 ${
                message.isUser ? 'text-right' : 'text-left'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start gap-3 animate-fade-in-up">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-lg flex-shrink-0">
              🤖
            </div>
            <div className="flex-1 max-w-[calc(100%-50px)]">
              <div className="message-bubble bot-message">
                <div className="flex gap-1 mb-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing" style={{animationDelay: '0.2s'}}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-typing" style={{animationDelay: '0.4s'}}></span>
                </div>
                <span className="text-gray-500 text-sm italic">正在思考中...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-200 flex gap-4 items-end relative">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="请输入您的问题..."
          disabled={isLoading}
          rows={1}
          className="input-field min-h-[50px] max-h-[120px]"
        />
        <button
          onClick={sendMessage}
          disabled={!inputValue.trim() || isLoading}
          className="btn-primary min-w-[80px]"
        >
          {isLoading ? '发送中...' : '发送'}
        </button>
      </div>
    </div>
  );
}
