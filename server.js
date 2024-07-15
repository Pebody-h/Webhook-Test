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
      if(notification.value != undefined){
        await appwriteManagerInstance.createNotification(notification.value, "v" + notification.value);
        res.send('Success');
      } else {
        res.send('values duplicated');
    }
    } catch (error) {    
        res.send(error);
    }
});

appwriteManagerInstance.config()
.then(() => {
    server.listen(process.env.PORT || 3000, () => {
        console.log(`Server running at ${process.env.PORT || 3000}`);
    });
})
.catch((error) => {
    console.error('Failed to configure Appwrite:', error);
});