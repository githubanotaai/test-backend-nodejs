import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseConnection } from 'src/configurations/DatabaseConfiguration'
import { BaseController } from 'src/controllers/BaseController'

@Module({ imports: [DatabaseConnection, TypeOrmModule.forFeature([])], controllers: [BaseController] })
export class AppModule {}
