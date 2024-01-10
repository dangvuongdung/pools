import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
    @Get('current-time')
    async currentTime() {
        return Date.now()
    }
}
