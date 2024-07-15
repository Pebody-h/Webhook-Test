require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const { appwriteManagerInstance } = require('./appwriteNotifications');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/webhook-endpoint', async (req, res) => {
    console.log('Webhook received:', req.body);
    try {
      const notification = req.body;
      console.log("notification.value", notification.value);
      console.log("notification.value", "v" + notification.value);
      await appwriteManagerInstance.createNotification('827364823', "v" + notification.value);
      res.send('Success');
    } catch (error) {    
        res.send(error);
    }
});

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server running at ${process.env.PORT || 3000}`);
});