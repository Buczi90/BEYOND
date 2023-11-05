import express, { Express } from 'express';
import dotenv from 'dotenv';
import http from 'http';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import Logger from './utils/Logger/logger';
import { invalidPathHandler, errorResponder, requestLogger } from './middlewares/request.middleware';
import { errorLogger } from './middlewares/logger.middleware';

import appRouter from './routes/app.router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

let server = http.createServer(app); // HTTP

app.use(express.json({ limit: '50mb' }));

app.use(helmet());

app.use(bodyParser.json());

app.use(requestLogger);

app.use('/api', appRouter);

app.use(invalidPathHandler);
app.use(errorLogger);
app.use(errorResponder);

server
  .listen(port, () => {
    Logger.info(`Server is up on port ${port}`);
  })
  .on('error', (e) => {
    Logger.error(e.message);
  });
