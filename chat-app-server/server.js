import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('WebSocket server running');
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (msg) => {
    const text = msg.toString();
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(text);
      }
    });
  });

  ws.on('close', () => console.log('Client disconnected'));
});

server.listen(8080, () => console.log('Server running on http://localhost:8080'));
