import fastifyEnv from '@fastify/env';
import { FastifyInstance } from 'fastify';

const schema = {
  type: 'object',
  required: ['PORT', 'HOST', 'DATABASE_URL'],
  properties: {
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
  },
} as const;

const envOptions = {
  confKey: 'config',
  schema: schema,
  dotenv: true,
};

export function configureEnv(server: FastifyInstance) {
  server.register(fastifyEnv, envOptions);
}
