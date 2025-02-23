// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PrismaClient } from '@prisma/client';
import 'fastify';

interface JwtPayload {
  sub: string;
}

interface Env {
  PORT: string;
  HOST: string;
  NODE_ENV: string;
  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: string;
  JWT_REFRESH_EXPIRATION_TIME: string;
  JWT_COOKIE_SECRET: string;
}

declare module 'fastify' {
  interface FastifyRequest {
    jwtVerify<Decoded extends fastifyJwt.VerifyPayloadType>(
      options?: fastifyJwt.FastifyJwtVerifyOptions,
    ): Promise<Decoded>;
    jwtVerify<Decoded extends fastifyJwt.VerifyPayloadType>(
      options?: Partial<fastifyJwt.VerifyOptions>,
    ): Promise<Decoded>;
    jwtDecode<Decoded extends fastifyJwt.DecodePayloadType>(
      options?: fastifyJwt.FastifyJwtDecodeOptions,
    ): Promise<Decoded>;
    jwtDecode<Decoded extends fastifyJwt.DecodePayloadType>(
      callback: fastifyJwt.DecodeCallback<Decoded>,
    ): void;
    jwtDecode<Decoded extends fastifyJwt.DecodePayloadType>(
      options: fastifyJwt.FastifyJwtDecodeOptions,
      callback: fastifyJwt.DecodeCallback<Decoded>,
    ): void;
    user: JwtPayload;
  }

  interface FastifyInstance {
    config: Env;
    prisma: PrismaClient;
    auth: (
      request: FastifyRequest<{
        Body: never;
        Params: never;
        Querystring: never;
        Headers: never;
      }>,
      reply: FastifyReply,
    ) => Promise<void>;
    generateToken: (payload: { sub: string }) => string;
  }
}
