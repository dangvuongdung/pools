import * as process from 'process'

require('dotenv').config()

export default {
    Auth: {
        Secret: process.env.JWT_SECRET || 'abc123',
        AccessTokenExpireIn: Number(process.env.ACCESS_TOKEN_EXPIRE_IN || 600),
        RefreshTokenExpireIn: Number(process.env.REFRESH_TOKEN_EXPIRE_IN || 86400),
        LoginValidIn: Number(process.env.LOGIN_VALID_IN_SECONDS || 60),
    },
    ChainId: Number(process.env.CHAIN_ID || 0),
    RPC: process.env.RPC_ENDPOINT || 'https://goerli-rollup.arbitrum.io/rpc',
}
