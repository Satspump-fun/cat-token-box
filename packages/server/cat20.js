const { bootstrap } = require('../cli/dist/main')
const env = require('./config.json')

function clean_argv() {
    process.argv = process.argv.slice(0, 2)
}

module.exports = {
    async wallet_create(name) {
        clean_argv()
        process.argv.push('wallet')
        process.argv.push('create')
        process.argv.push(`--name=${name}`)
        return await bootstrap()
    },
    async wallet_address(name) {
        clean_argv()
        process.argv.push('wallet')
        process.argv.push('address')
        process.argv.push(`--name=${name}`)
        return await bootstrap()
    },
    async check_wallet_used(name) {
        const base = `${env.dataDir}/keys/${name}.json`
        return require('fs').existsSync(base)
    },
    async wallet_get(name) {
        try {
            const base = `${env.dataDir}/keys/${name}.json`
            const v =  require(base)
            const { address, addressType } = v
            return { 
                address, 
                address_type: addressType 
            }
        } catch (e) {
            return null
        }
    },
    async wallet_get_private(name) {
        try {
            const base = `${env.dataDir}/keys/${name}.json`
            const v =  require(base)
            const { address, addressType, wif } = v
            return {
                address, 
                address_type: addressType,
                wif
            }
        } catch (e) {
            return null
        }
    },
    async deploy(opt) {
        clean_argv()
        // const base = `${env.dataDir}/tokens/${opt.name}.json`
        // require('fs').writeFileSync(base, JSON.stringify(opt))
        process.argv.push(`deploy`)
        process.argv.push(`--wallet=${opt.wallet}`)
        process.argv.push(`--name=${opt.name}`)
        process.argv.push(`--symbol=${opt.symbol}`)
        process.argv.push(`--decimals=${opt.decimals}`)
        process.argv.push(`--max=${opt.max}`)
        process.argv.push(`--premine=${opt.premine || opt.max}`)
        process.argv.push(`--limit=${opt.limit || 0}`)
        return await bootstrap()
    },
    async transfer(opt) {
        clean_argv()
        process.argv.push(`send`)
        process.argv.push(`-i`)
        process.argv.push(`${opt.token_id} ${opt.to} ${opt.amount}`)
        // process.argv.push(``)
        // process.argv.push(``)
        process.argv.push(`--wallet=${opt.name}`)
        return await bootstrap()
    },
    async token_info(name) {
        try {
            const base = `${env.dataDir}/tokens/${name}.json`
            return require(base)
        } catch (e) {
            return null
        }
    },
    async cat20_balance() {
        clean_argv()
        process.argv.push(`wallet balance`)
        return await bootstrap()
    }
}