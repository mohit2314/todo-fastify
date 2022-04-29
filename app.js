const fastify = require('fastify')({logger:true})

fastify.get('/',(req,reply)=>{
    reply.send({hello:world})
})


fastify.listen(3000,(err,address)=>{
    if(err){
        fastify.log.error(err)
        fastify.exit(1)
    }
})