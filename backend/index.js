const http = require('http');
const app = require('./app');
const logger = require('./utils/logger')

const server = http.createServer(app);

server.listen(3001, () => {
  logger.info(`Server running on port 3001`);
});
