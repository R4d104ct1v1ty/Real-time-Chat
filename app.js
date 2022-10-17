const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const WebSocket = require('ws');
const path = require('path');
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({server: server});
app.use(express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 6969


 
wss.on('connection', client => {
    client.on('message', (message, isBinary) => {
        [...wss.clients].filter(pers => pers !== client).forEach(pers => pers.send(isBinary ? message.toString() : message));
    });
})

server.listen(port, () => {
    console.log('Listening to port 6969');
})