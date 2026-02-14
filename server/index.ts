import express from 'express'
import http from 'http';
import { Socket } from 'socket.io';
import { Server } from 'socket.io';
import type { ChatMessage } from './models/chat-message.model';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST']
    }
});

type IncomingChatPayload = {
    username: string;
    text: string;
};

io.on('connection', (socket: Socket) => {
    console.log(`utilizatorul ${socket.id} s-a conectat`);
    socket.on('disconnect', () => {
        console.log(`utilizatorul ${socket.id} s-a deconectat`)
    })
    socket.on('chat_message', (msg: IncomingChatPayload) => {
        console.log(`mesaj primit din client de la ${msg.username}: ${msg.text}`)
        io.emit('chat_message', createAndReturnMessageObject(msg, socket))
        console.log(`obiect trimis server->client`)
    })
})

function createAndReturnMessageObject (msg: IncomingChatPayload, socket: Socket): ChatMessage {
    return {
        'id': socket.id + new Date().toISOString(),
        'username': msg.username,
        'text': msg.text,
        'sentAt': new Date().toISOString()
    }
}


var port = 3000;
server.listen(port, () => {
    console.log(`Server pornit, port: ${port}`)
})