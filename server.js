require('dotenv').config();
const express = require('express');
const WebSocket = require('ws');
const bodyParser = require('body-parser');
const { wss } = require('./websocket-server');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/webhook-endpoint', (req, res) => {
    console.log('Webhook received:', req.body);

    // Enviar la notificación a todos los clientes conectados
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(req.body));
        }
    });

    res.status(200).json({ success: true, data: req.body });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});