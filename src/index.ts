import Fastify, { FastifyBaseLogger } from 'fastify';
import { config } from 'dotenv';
import { configureEnv } from './env';
import autoload from '@fastify/autoload';
import path, { join } from 'path';
import { logger, setupLogger } from './logger';

config();

const server = Fastify({
  loggerInstance: logger as FastifyBaseLogger,
  disableRequestLogging: true,
});

const start = async () => {
  try {
    await configureEnv(server);

    setupLogger(server);

    await server.register(autoload, {
      dir: path.join(__dirname, 'infra', 'plugins'),
    });

    await server.register(autoload, {
      dir: join(__dirname, 'infra', 'routes'),
      dirNameRoutePrefix: false,
      indexPattern: /\.route(\.js|\.cjs|\.ts)$/i,
      options: {
        prefix: '/api',
      },
    });

    if (server.config.NODE_ENV === 'development') {
      console.log(server.printPlugins());
      console.log(server.printRoutes());
    }

    await server.listen({
      port: parseInt(server.config.PORT, 10),
      host: server.config.HOST,
    });
    server.log.info(
      `Server started on ${server.config.HOST}:${server.config.PORT}`,
    );
  } catch (err) {
    console.log(err);
    server.log.error(err);
    process.exit(1);
  }
};

start();
