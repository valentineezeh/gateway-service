import express from 'express';
import parser from 'body-parser';
import expressValidator from 'express-validator';
import cors from 'cors';
import router from './routes/index';
import config from './config/config';
// service locator via dependency injection
import serviceLocate from './config/di';

const app = express();
// Set app to use cors
app.use(cors());

const { server } = config;
const { port } = server;

app.use(parser.json());
app.use(parser.json({ type: 'application/json' }));
app.use(parser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use('/', router);
app.get('/', (req, res) => {
  res.send(`Welcome to ${config.appName}!`);
});

// Connect to mongodb
serviceLocate.get('mongo');

// Connect to logger
const logger = serviceLocate.get('logger');

app.listen(port, () => {
  logger.info(`${config.appName} is listening on port: ${port}`);
});

export default app;
