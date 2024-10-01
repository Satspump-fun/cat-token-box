const cat20 = require('./cat20')

function succ(data) {
    return {
        code: 0,
        message: 'ok',
        data: data||{}
    }
}

function fail(code, message) {
    return {
        code,
        message
    }
}

module.exports = {
    "/wallet/info": async (ctx) => {
        const { name } = ctx.request.body 
        const wallet = await cat20.wallet_get(name)
        ctx.body = succ(wallet||{})
    },
    "/wallet/create": async (ctx) => {
        const { name } = ctx.request.body
        // await cat20.wallet_create(name)
        const v = await cat20.check_wallet_used(name)
        if( v ) {
            ctx.body = fail( 1001, `Wallet ${name} already exists.`)
            return 
        }

        await cat20.wallet_create(name)
        await cat20.wallet_address(name)

        const wallet = await cat20.wallet_get(name)

        ctx.body = succ(wallet)
    },
    /**
     * 
     * @param {*} ctx 
     * {
            "name": "cat",
            "symbol": "CAT",
            "decimals": 2,
            "max": "21000000",
            "limit": "5",
            "premine": "0"
        }
     */
    "/cat20/deploy": async (ctx) => {
        const { name } = ctx.request.body
        const wallet = await cat20.wallet_get(name)
        if( !wallet ) {
            ctx.body = fail( 1002, `Wallet ${name} not found.`)
            return 
        }

        await cat20.deploy( ctx.request.body )

        const token = await cat20.token_info(name)

        if( token ) ctx.body = succ(token) 
            else ctx.body = fail( 1003, `Token ${name} deploy failed.`)
    }
}