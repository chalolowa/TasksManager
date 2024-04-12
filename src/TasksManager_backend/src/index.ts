import express from 'express';
import route from './routes';
import { Server } from 'azle';

export default Server(() => {
    const app = express();

    app.use(express.json());

    app.use(route);

    return app.listen();
});

