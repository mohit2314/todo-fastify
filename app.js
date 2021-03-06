const fastify = require("fastify")({ logger: true });
fastify.register(require("fastify-swagger"), {
  exposeRoute: true,
  routePrefix: "/docs",
  swagger: {
    info: { title: "ToDo-api" },
  },
});
fastify.register(require('./plugin/mongo'))

fastify.register(require("./plugin/routes"), { prefix: "/post" });
fastify.get("/", (req, reply) => {
  reply.send({ hello: "world" });
});

fastify.listen(3000, (err, address) => {
  if (err) {
    fastify.log.error(err);
    fastify.exit(1);
  }
});
