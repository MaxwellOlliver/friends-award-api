// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Fastify from 'fastify';

declare module 'fastify' {
  export interface FastifyInstance {
    config: {
      PORT: string;
      HOST: string;
    };
  }
}
