import fastifyEnv from '@fastify/env';
import { FastifyInstance } from 'fastify';

const schema = {
  type: 'object',
  required: ['PORT', 'HOST', 'DATABASE_URL'],
  properties: {
    NODE_ENV: {
      type: 'string',
      default: 'development',
    },
    PORT: {
      type: 'string',
      default: '3000',
    },
    HOST: {
      type: 'string',
      default: 'localhost',
    },
    POSTGRES_USER: {
      type: 'string',
      default: 'postgres',
    },
    POSTGRES_PASSWORD: {
      type: 'string',
      default: 'postgres',
    },
    POSTGRES_DB: {
      type: 'string',
      default: 'fastify_db',
    },
    DATABASE_URL: {
      type: 'string',
    },
    JWT_SECRET: {
      type: 'string',
    },
    JWT_EXPIRATION_TIME: {
      type: 'string',
    },
    JWT_REFRESH_EXPIRATION_TIME: {
      type: 'string',
    },
    JWT_COOKIE_SECRET: {
      type: 'string',
    },
  },
} as const;

const envOptions = {
  confKey: 'config',
  schema: schema,
  dotenv: true,
};

export async function configureEnv(server: FastifyInstance) {
  await server.register(fastifyEnv, envOptions);
}
