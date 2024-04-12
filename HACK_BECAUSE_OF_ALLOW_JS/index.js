import express from 'express';
import http from 'http';
import cors from 'cors';
import route from './routes';
const app = express();
app.use(express.json());
app.use(cors());
app.use(route);
const server = http.createServer(app);
const port = 8000;
server.listen(port, () => {
    console.log('Server running successfully');
});
