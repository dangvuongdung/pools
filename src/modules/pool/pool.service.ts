import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Pool } from './domain/pool.entity'
import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import axios from 'axios'
import puppeteer from 'puppeteer'

let isRunning = false

@Injectable()
export class PoolService {
    private readonly logger = new Logger('PoolService')

    constructor(@InjectRepository(Pool) private pool: Repository<Pool>) {}

    @Cron('* * * * * *')
    async thalaPool() {
        if (isRunning) return
        isRunning = true

        try {
            this.logger.verbose('------THALA Service START-------')
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
                    .values({ tvl, type: poolType, apr: APR, extra_apr: 0, app: 'THALA' })
                    .orUpdate(['tvl', 'apr', 'extra_apr', 'app'], ['type', 'app'])
                    .execute()
            }

            this.logger.verbose('------THALA Service END-------')
        } catch (error) {
            isRunning = false
            this.logger.error(error.stack)
        } finally {
            isRunning = false
        }
    }

    @Cron('* * * * * *')
    async sushiPool() {
        if (isRunning) return
        isRunning = true

        try {
            this.logger.verbose('------SUSHI Service START-------')

            const browser = await puppeteer.launch({ headless: 'new' })
            const page = await browser.newPage()
            await page.goto(process.env.SHISHI_URL, { waitUntil: 'networkidle0' })

            await page.waitForSelector('.w-fulls', {
                visible: true,
            })

            const pools = await page.evaluate(() => {

                const parseTvl = (tvl: string) => {
                    const amount = tvl.substring(0, tvl.length - 1)
                    if (tvl.includes('k')) return Number(amount) * 100000
                    if (tvl.includes('m')) return Number(amount) * 1000000
                    return 0
                }

                const data = []

                for (let i = 0; i < 100; i++) {
                    const pool = document.querySelector(`td[testdata-id='pools-${i}-0-td']`)
                    if (!pool) continue
                    const html = pool?.innerHTML
                    const typePool = html.substring(
                        html.indexOf(`/pool/`) + 6,
                        html.lastIndexOf(`"><div class="flex items-center gap-1">`)
                    )

                    const tvlSelector = document.querySelector(`td[testdata-id='pools-${i}-1-td']`)
                    if (!tvlSelector) continue
                    const tvlHtml = tvlSelector?.innerHTML
                    const tvl = tvlHtml.substring(tvlHtml.indexOf(`$`) + 1, tvlHtml.lastIndexOf(`</span>`))

                    const aprSelector = document.querySelector(`td[testdata-id='pools-${i}-2-td']`)
                    if (!aprSelector) continue
                    const aprHtml = aprSelector?.innerHTML
                    const apr = aprHtml.substring(
                        aprHtml.indexOf(`<div class="flex items-center gap-1">`) + 37,
                        aprHtml.lastIndexOf(`%`)
                    )

                    if (tvl.includes('k') || tvl.includes('m')) {
                        data.push({ type: typePool, tvl: parseTvl(tvl), apr })
                    }
                }
                return data
            })

            // insert or update pools
            for (let i = 0; i < pools.length; i++) {
                const { type, apr, tvl } = pools[i]
                await this.pool
                    .createQueryBuilder()
                    .insert()
                    .into(Pool)
                    .values({ tvl, type, apr, extra_apr: 0, app: 'SUSHI' })
                    .orUpdate(['tvl', 'apr', 'extra_apr', 'app'], ['type', 'app'])
                    .execute()
            }

            this.logger.verbose('------SUSHI Service END-------')
        } catch (error) {
            isRunning = false
            this.logger.error(error.stack)
        } finally {
            isRunning = false
        }
    }
}
