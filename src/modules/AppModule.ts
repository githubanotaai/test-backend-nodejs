import { MiddlewareConsumer, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseConnection } from 'src/configurations/DatabaseConfiguration'
import { BaseController } from 'src/controllers/BaseController'
import { LoggerMiddleware } from 'src/middlewares/LoggerMiddleware'
import { PagerMiddleware } from 'src/middlewares/PagerMiddleware'

@Module({ imports: [DatabaseConnection, TypeOrmModule.forFeature([])], controllers: [BaseController] })
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PagerMiddleware).forRoutes()
    consumer.apply(LoggerMiddleware).forRoutes(BaseController)
  }
}
