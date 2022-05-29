import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BaseController } from 'src/controllers/BaseController'

@Module({ imports: [TypeOrmModule.forFeature([])], controllers: [BaseController] })
export class AppModule {}
