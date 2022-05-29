import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductDTO } from 'src/classes/dtos/ProductDTO'
import { ProductEntity } from 'src/entities/ProductEntity'
import { ProductRepository } from 'src/repositories/ProductRepository'
import { ILike } from 'typeorm'

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

  async listProducts(title: string, categoryId: number, page: number, pageSize: number): Promise<[Array<ProductEntity>, number]> {
    let where = { categoryId: categoryId, title: title ? ILike(`%${title}%`) : title }
    if (where.title === undefined) delete where.title
    if (where.categoryId === undefined) delete where.categoryId
    return this.productRepository.findAndCount({ where: where, skip: page, take: pageSize, order: { id: 'DESC' } })
  }
}
