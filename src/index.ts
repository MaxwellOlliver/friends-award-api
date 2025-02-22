import Fastify, { FastifyBaseLogger } from 'fastify';
import { config } from 'dotenv';
import { configureEnv } from './env';
import autoload from '@fastify/autoload';
import path from 'path';
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
      dir: path.join(__dirname, 'http/plugins'),
    });

    await server.listen({
      port: parseInt(server.config.PORT, 10),
      host: server.config.HOST,
    });
    server.log.info(
      `Server started on ${server.config.HOST}:${server.config.PORT}`,
    );
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
