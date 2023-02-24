const WebSocket = require('ws');
const server = new WebSocket.Server({ port: '9386' });

server.on('connection', socket => {
    console.log("Client Connected");
    socket.on('message', message => {
        console.log("Client sent message: " + message);
        server.clients.forEach(client => {
            if(client != socket && client.readyState === WebSocket.OPEN){
                client.send(message);
            }
        });
    });

    socket.on('close', () => { console.log("Client Disconnected"); });
});
