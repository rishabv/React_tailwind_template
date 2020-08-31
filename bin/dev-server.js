// use node style for this

require('babel-polyfill');

const server = require('../server/main').default;
const project = require('../config/project.config');
const debug = require('debug')('app:bin:dev-server');

server.listen(project.server_port);
debug(`Server is now running at http://localhost:${project.server_port}.`);
