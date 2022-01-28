const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
require('express-async-errors')
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const helmet = require('helmet')

const postsRouter = require('./controllers/posts');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const app = express();

logger.info(`connecting to mongoDB ${config.MONGODB_URI}`)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MONGODB')
  })
  .catch((error) => {
    logger.error('error connecting to MONGODB', error)
  })

app.use(helmet());
app.use(express.static('build'))
app.use(middleware.tokenExtractor);
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname+'/build/','index.html'));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;