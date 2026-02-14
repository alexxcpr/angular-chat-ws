import express from 'express'
import http from 'http';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import type { ChatMessage } from './models/chat-message.model';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket: Socket) => {
    console.log(`utilizatorul ${socket.id} s-a conectat`);
    socket.on('disconnect', () => {
        console.log(`utilizatorul ${socket.id} s-a deconectat`)
    })
    socket.on('chat_message', (msg: string) => {
        io.emit('chat_message', createAndReturnMessageObject(msg, socket))
    })
})

function createAndReturnMessageObject (msg: string, socket: Socket): ChatMessage {
    return {
        'id': socket.id + new Date().toISOString(),
        'senderId': socket.id,
        'text': msg,
        'sentAt': new Date().toISOString()
    }
}


var port = 3000;
server.listen(port, () => {
    console.log(`Server pornit, port: ${port}`)
})