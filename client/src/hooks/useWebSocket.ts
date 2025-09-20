import { useState, useEffect, useRef, useCallback } from 'react';

export interface WebSocketMessage {
  type: 'connected' | 'start' | 'chunk' | 'done' | 'error' | 'ask';
  content?: string;
  message?: string;
  question?: string;
}

export interface UseWebSocketOptions {
  url: string;
  onMessage?: (message: WebSocketMessage) => void;
  onError?: (error: Event) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface UseWebSocketReturn {
  isConnected: boolean;
  isTyping: boolean;
  sendMessage: (message: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useWebSocket = ({
  url,
  onMessage,
  onError,
  onOpen,
  onClose,
}: UseWebSocketOptions): UseWebSocketReturn => {
  const [isConnected, setIsConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const currentBotMessageIdRef = useRef<string | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectDelay = 3000;

  const connect = useCallback(() => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      return;
    }

    const websocket = new WebSocket(url);

    websocket.onopen = () => {
      console.log('WebSocket 连接已建立');
      setIsConnected(true);
      reconnectAttemptsRef.current = 0;
      onOpen?.();
    };

    websocket.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);

        switch (data.type) {
          case 'connected':
            console.log('WebSocket 连接确认');
            break;

          case 'start':
            setIsTyping(true);
            currentBotMessageIdRef.current = Date.now().toString();
            break;

          case 'chunk':
            // 处理流式消息
            break;

          case 'done':
            setIsLoading(false);
            setIsTyping(false);
            currentBotMessageIdRef.current = null;
            break;

          case 'error':
            setIsLoading(false);
            setIsTyping(false);
            currentBotMessageIdRef.current = null;
            break;
        }

        onMessage?.(data);
      } catch (error) {
        console.error('解析 WebSocket 消息失败:', error);
      }
    };

    websocket.onclose = (event) => {
      console.log('WebSocket 连接已关闭', event.code, event.reason);
      setIsConnected(false);
      setIsTyping(false);
      setIsLoading(false);
      currentBotMessageIdRef.current = null;
      
      if (event.code !== 1000 && reconnectAttemptsRef.current < maxReconnectAttempts) {
        reconnectAttemptsRef.current++;
        console.log(`尝试重连 (${reconnectAttemptsRef.current}/${maxReconnectAttempts})`);
        
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, reconnectDelay);
      } else if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
        console.log('已达到最大重连次数，停止重连');
      }
      
      onClose?.();
    };

    websocket.onerror = (error) => {
      console.error('WebSocket 错误:', error);
      onError?.(error);
    };

    ws.current = websocket;
  }, [url, onMessage, onError, onOpen, onClose]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    if (ws.current) {
      ws.current.close(1000, '正常关闭');
      ws.current = null;
    }
    setIsConnected(false);
    setIsTyping(false);
    setIsLoading(false);
    reconnectAttemptsRef.current = 0;
  }, []);

  const sendMessage = useCallback((message: string) => {
    if (!isConnected || !ws.current || ws.current.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket 未连接，无法发送消息');
      return;
    }

    ws.current.send(
      JSON.stringify({
        type: 'ask',
        question: message,
      })
    );
    setIsLoading(true);
  }, [isConnected]);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  return {
    isConnected,
    isTyping,
    sendMessage,
    isLoading,
    setIsLoading,
  };
};
