import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppDataSource } from '@configs/data-source'
import { PoolModule } from '@modules/pool/pool.module'
import { ScheduleModule } from '@nestjs/schedule'

@Module({
    imports: [ScheduleModule.forRoot(), TypeOrmModule.forRoot(AppDataSource), PoolModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
