const fastifyMongodb = require("fastify-mongodb");

const getOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          status: { type: "string" },
          created_at: { type: "string" },
          updated_at: { type: "string" },
        },
      },
    },
  },
};

const getOption = {
  schema: {
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            status: { type: "string" },
            created_at: { type: "string" },
            updated_at: { type: "string" },
          },
        },
      },
    },
  },
};

const putOption = {
  schema: {},
};

const postOption = {
  scehma: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        status: { type: "string" },
      },
    },
  response: {
    200: {
      type: "object",
      properties: {
        _id: { type: "string" },
        name: { type: "string" },
        status: { type: "string" },
        created_at: { type: "string" },
        updated_at: { type: "string" },
      },
    },
  },
},
};

const deleteOption = {
  scehma: {
    queryString: {
      id: { type: "string" },
    },
    response: {
      200: {
        type: "object",
        properties:{
            status:{type:'boolean'}
        }
      },
    },
  },
};

// =============================

function routes(fastify, options, done) {
    const todoCollection = fastify.mongo.db.collection("todo");

    // fastify.decorate('auth',(request)=> request.headers.auth === 'secret')

    // fastify.addHook('preHandler',async (request,reply)=>{
    //     if(fastify.auth(request)){
    //         const err = new Error()
    //         err.statusCode = 401
    //         err.message='Not Authorized'
    //         throw err
    //     }
    // })
  fastify.get("/todos", getOptions, async (req, reply) => {
    const todos = await todoCollection.find().toArray();
    return todos;
  });

  fastify.get("/todo/:id", getOption, async (req, reply) => {});
  fastify.post("/", postOption, async (req, reply) => {
    const todo = req.body;
    todo.created_at = new Date();
    todo.updated_at = new Date();
    const result = await todoCollection.insert(todo);
    const insertedTodo = result.ops[0];
    return insertedTodo;
  });

  fastify.put("/", putOption, async (req, reply) => {
    let { _id, status } = req.body;
    _id = fastify.mongo.ObjectId(_id);
    const result = await todoCollection.findOneAndUpdate({ _id }, { $set: { status, updated_at: new Date() } }, { retunrOrignal: false });
    return result.value;
  });

  fastify.delete("/:id", deleteOption, async (req, reply) => {
    const { id } = req.params;
    const _id = fastify.mongo.ObjectId(id);
    await todoCollection.deleteOne({ _id });
    return { status: true };
  });
}
