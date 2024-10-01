const Koa = require('koa')
const { koaBody } = require('koa-body')
const env = require('./config.json')

const actions = require('./action')

console.log( actions )

const app = module.exports = new Koa()

app.use(koaBody())

app.use( async (ctx) => {
    try{
        const { method, url } = ctx.request
        if( method === 'GET' ) {
            ctx.body = "x"
        }

        if( method === 'POST') {
            console.log(`${method} ${url} `, JSON.stringify(ctx.request.body) )
            if( actions[url] ) {
                await actions[url](ctx)
            } else {
                ctx.body = `Not found. ${url}`
            }
        }
    }catch(e) {
        console.log(e)
        ctx.body = {
            code: 2010,
            message: `Internal Server Error: ${e.message}`
        }
    }
})

console.log(`Start cat20 server at ${env.port}`)
app.listen(env.port)