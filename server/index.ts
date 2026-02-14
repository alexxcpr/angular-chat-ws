import express from 'express'
import http from 'http';

const app = express();
const server = http.createServer(app);

var port = 3000;
server.listen(port, () => {
    console.log(`Server pornit, port: ${port}`)
})