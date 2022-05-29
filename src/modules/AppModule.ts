import { MiddlewareConsumer, Module } from '@nestjs/common'
import { BaseController } from 'src/controllers/BaseController'
import { LoggerMiddleware } from 'src/middlewares/LoggerMiddleware'
import { PagerMiddleware } from 'src/middlewares/PagerMiddleware'
import { ProductModule } from './ProductModule'

@Module({ imports: [ProductModule], controllers: [BaseController] })
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PagerMiddleware).forRoutes(BaseController)
    consumer.apply(LoggerMiddleware).forRoutes(BaseController)
  }
}
