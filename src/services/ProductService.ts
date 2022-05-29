import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductDTO } from 'src/classes/dtos/ProductDTO'
import { ProductEntity } from 'src/entities/ProductEntity'
import { ProductRepository } from 'src/repositories/ProductRepository'

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity) private readonly productRepository: ProductRepository) {}

  async createProduct(product: ProductDTO): Promise<ProductEntity> {
    return this.productRepository.save(ProductEntity.constructorByDTO(product))
  }

  async updateProduct(product: ProductDTO): Promise<ProductEntity> {
    return this.productRepository.save(ProductEntity.constructorByDTO(product))
  }
}
