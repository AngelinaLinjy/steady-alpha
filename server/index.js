import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { askQuestion } from './bot.js';

const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);

const wss = new WebSocketServer({
  server,
  path: '/ws',
});

wss.on('connection', ws => {
  console.log('新的 WebSocket 连接已建立');

  ws.on('message', async message => {
    try {
      const data = JSON.parse(message.toString());
      console.log('data:', data);
      if (data.type === 'ask' && data.question) {
        console.log('收到问题:', data.question);

        ws.send(
          JSON.stringify({
            type: 'start',
            message: '开始分析...',
          })
        );

        try {
          const stream = await askQuestion(data.question);

          for await (const chunk of stream) {
            ws.send(
              JSON.stringify({
                type: 'chunk',
                content: chunk,
              })
            );
          }

          ws.send(
            JSON.stringify({
              type: 'done',
              message: '分析完成',
            })
          );
        } catch (error) {
          console.error('Error in streaming response:', error);
          ws.send(
            JSON.stringify({
              type: 'error',
              message: error.message,
            })
          );
        }
      }
    } catch (error) {
      console.error('WebSocket 消息处理错误:', error);
      ws.send(
        JSON.stringify({
          type: 'error',
          message: '消息格式错误',
        })
      );
    }
  });

  ws.on('close', () => {
    console.log('WebSocket 连接已关闭');
  });

  ws.on('error', error => {
    console.error('WebSocket 错误:', error);
  });

  ws.send(
    JSON.stringify({
      type: 'connected',
      message: 'WebSocket 连接已建立',
    })
  );
});

app.post('/ask', async (req, res) => {
  const { question } = req.body;
  try {
    const stream = await askQuestion(question);
    let fullAnswer = '';

    for await (const chunk of stream) {
      fullAnswer += chunk;
    }

    res.json({ answer: fullAnswer });
  } catch (error) {
    console.error('Error in HTTP ask:', error);
    res.status(500).json({ error: error.message });
  }
});

server.listen(3000, () => {
  console.log('AI Bot running at http://localhost:3000');
  console.log('WebSocket server running at ws://localhost:3000/ws');
});
