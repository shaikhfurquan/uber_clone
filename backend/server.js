import path from 'path'
import { app } from './app.js'
import http from 'http'


const server = http.createServer(app)
const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`Starting server on port ${PORT}`);
});