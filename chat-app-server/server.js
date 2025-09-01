// server.js (ESM)
import { WebSocketServer, WebSocket } from 'ws';
import http from 'http';

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    const text = message.toString();

    // Broadcast to ALL clients EXCEPT the sender
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(text);
      }
    });
  });

  ws.on('close', () => console.log('Client disconnected'));
});

server.listen(8080, () => console.log('Server running on ws://localhost:8080'));
