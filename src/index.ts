import Fastify from 'fastify';
import { config } from 'dotenv';
import { configureEnv } from './env';
import autoload from '@fastify/autoload';
import path from 'path';

config();

const server = Fastify({
  logger: true,
});

server.register(autoload, {
  dir: path.join(__dirname, 'http/plugins'),
});

const start = async () => {
  try {
    configureEnv(server);

    await server.listen({
      port: parseInt(server.config.PORT, 10),
      host: server.config.HOST,
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
