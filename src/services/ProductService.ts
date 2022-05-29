import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductDTO } from 'src/classes/dtos/ProductDTO'
import { ProductEntity } from 'src/entities/ProductEntity'
import { ProductRepository } from 'src/repositories/ProductRepository'

@Injectable()
export class ProductService {
  constructor(@InjectRepository(ProductEntity) private readonly productRepository: ProductRepository) {}

  async createProduct(productDTO: ProductDTO): Promise<ProductEntity> {
    return this.productRepository.save(ProductEntity.constructorByDTO(productDTO))
  }

  async updateProduct(productDTO: ProductDTO): Promise<ProductEntity> {
    const productEntity = await this.productRepository.findOneOrFail({ where: { id: productDTO.id } })
    productEntity.overrideEntityWithDTO(productDTO)
    return this.productRepository.save(productEntity)
  }

  async deleteProduct(productDTO: ProductDTO): Promise<ProductEntity> {
    const productEntity = await this.productRepository.findOneOrFail({ where: { id: productDTO.id } })
    productEntity.overrideEntityWithDTO(productDTO)
    return this.productRepository.remove(productEntity)
  }
}
