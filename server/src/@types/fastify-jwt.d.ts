import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      nome: string;
      avatarUrl: string;
      sub: string;
    }
  }
}