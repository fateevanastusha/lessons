const http = require('http');
const EventEmitter = require('events');

module.exports = class Application {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middlewares = [];
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          const handler = endpoint[method];
          handler(req, res);
        });
      });
    });
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }

  _createServer() {
    return http.createServer((req, res) => {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', () => {
        if (body) {
          req.body = JSON.parse(body);
          this.middlewares.forEach((middleware) => middleware(req, res));
          const emmited = this.emitter.emit(this._getRouteMask(req.pathname, req.method), req, res);
          if (!emmited) {
            res.end('SERVER');
          }
        }
      });
    });
  }
  listen(port, callback) {
    this.server.listen(port, callback);
  }
};
