import { MiddlewareConsumer, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseConnection } from 'src/configurations/DatabaseConfiguration'
import { ProductController } from 'src/controllers/ProductController'
import { ProductEntity } from 'src/entities/ProductEntity'
import { LoggerMiddleware } from 'src/middlewares/LoggerMiddleware'
import { PagerMiddleware } from 'src/middlewares/PagerMiddleware'
import { ProductService } from 'src/services/ProductService'

@Module({ imports: [DatabaseConnection, TypeOrmModule.forFeature([ProductEntity])], controllers: [ProductController], providers: [ProductService] })
export class ProductModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PagerMiddleware).forRoutes(ProductController)
    consumer.apply(LoggerMiddleware).forRoutes(ProductController)
  }
}
