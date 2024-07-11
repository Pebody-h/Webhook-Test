const WebSocket = require('ws');

const WebSocketPort = process.env.WEBSOCKET_PORT || 8080;

const wss = new WebSocket.Server({ port: WebSocketPort });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        console.log('Received message:', message);
        // Aquí puedes emitir eventos a todos los clientes conectados
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

module.exports = { wss };