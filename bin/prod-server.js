// use node style for this

require('babel-polyfill');

const project = require('../config/project.config');
const server = require('../dist-server/main').default;
const debug = require('debug')('app:bin:dev-server');

server.listen(project.server_port);
debug(`Server is now running at http://localhost:${project.server_port}.`);
