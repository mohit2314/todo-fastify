const fastifyPlugin = require('fastify-plugin')

function dbConnector (fastify,options,done){


    fastify.register(require('fastify-mongodb'),{
        url:'mongodb://localhost:27018/test_db'
    })
done()
}

module.exports= fastifyPlugin(dbConnector)