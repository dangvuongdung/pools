import { DateHelper } from '@helpers/date.helper'
import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
    @Get('current-time')
    async currentTime() {
        return DateHelper.now()
    }
}
