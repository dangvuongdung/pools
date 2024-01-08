import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Pool } from './domain/pool.entity'
import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import axios from 'axios'

let isRunning = false

@Injectable()
export class PoolService {
    private readonly logger = new Logger('PoolService')

    constructor(@InjectRepository(Pool) private pool: Repository<Pool>) {}

    @Cron('* * * * * *')
    async checkAndProcessFriendTechFollower() {
        if (isRunning) return
        isRunning = true

        try {
            this.logger.verbose('------Service START-------')
            const poolRequest = await axios.get(process.env.THALA_URL)
            const pools = poolRequest?.data?.data || []

            for (let i = 0; i < pools.length; i++) {
                const { poolType, tvl, apr } = pools[i]
                
                if (tvl < 100000) continue

                const APR = apr.reduce((acc, obj) => {
                    return acc + obj.apr
                }, 0)

                await this.pool
                    .createQueryBuilder()
                    .insert()
                    .into(Pool)
                    .values({ tvl, type: poolType, apr: APR, extra_apr: 0 })
                    .orUpdate(['tvl', 'apr', 'extra_apr'], ['type'])
                    .execute()
            }
            this.logger.verbose('------Service END-------')
        } catch (error) {
            isRunning = false
            this.logger.error(error.stack)
        } finally {
            isRunning = false
        }
    }
}
