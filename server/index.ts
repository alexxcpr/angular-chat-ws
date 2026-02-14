import { Socket } from 'socket.io';
import express from 'express'
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket: Socket) => {
    console.log(`utilizatorul ${socket.id} s-a conectat`);
    socket.on('disconnect', () => {
        console.log(`utilizatorul ${socket.id} s-a deconectat`)
    })
})


var port = 3000;
server.listen(port, () => {
    console.log(`Server pornit, port: ${port}`)
})