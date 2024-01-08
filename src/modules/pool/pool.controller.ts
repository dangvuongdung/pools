import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common'
import { PoolService } from './pool.service'
import { ApiTags } from '@nestjs/swagger'
import { ParamId } from './domain/params/nft.dtos'

@ApiTags('pools')
@Controller('pools')
export class PoolController {
    constructor(private readonly service: PoolService) {}

    @Get(':id')
    checkExpire(@Request() req, @Param() param: ParamId) {
        return
    }
}
