import { FastifyInstance } from 'fastify';
import pino from 'pino';
import pinoElastic from 'pino-elasticsearch';

const stream = pinoElastic({
  index: 'fws-api-logs',
  node: 'http://localhost:9200',
  esVersion: 8,
});

export const logger = pino(
  {
    serializers: {
      res: (res) => {
        return {
          statusCode: res.statusCode,
          url: res.url,
          method: res.method,
          path: res.path,
          body: res.body,
        };
      },
      req: (req) => {
        return {
          method: req.method,
          url: req.url,
          body: req.body,
          query: req.query,
          params: req.params,
          ip: req.ip,
          userAgent: req.userAgent,
          referer: req.referer,
        };
      },
      err: (err) => {
        return {
          message: err.message,
          stack: err.stack,
          msg: `ERROR: ${err.message}`,
        };
      },
    },
  },
  stream,
);

export const setupLogger = (server: FastifyInstance) => {
  server.addHook('preHandler', (request, response, done) => {
    const traceId = request.headers['x-trace-id'];

    request.log.info({
      msg: `REQUEST: ${request.method} ${request.url}`,
      req: request,
      res: response,
      trace: {
        id: traceId,
      },
    });

    done();
  });

  server.addHook('onResponse', (request, response, done) => {
    request.log.info({
      msg: `RESPONSE: ${request.method} ${request.url}`,
      req: request,
      res: response,
      responseTime: response.elapsedTime,
      trace: {
        id: request.headers['x-trace-id'],
      },
    });

    done();
  });
};
