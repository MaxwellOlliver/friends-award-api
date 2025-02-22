// eslint-disable-next-line @typescript-eslint/no-unused-vars
import 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: string;
      HOST: string;
    };
  }
}
