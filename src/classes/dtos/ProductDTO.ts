import { ProductEntity } from 'src/entities/ProductEntity'

export class ProductDTO {
  id: number
  title: string
  price: string
  categoryId: number

  static constructorByEntity(productEntity: ProductEntity) {
    return new ProductDTO(productEntity.id, productEntity.title, productEntity.price, productEntity.categoryId)
  }

  constructor(id?: number, title?: string, price?: number, categoryId?: number) {
    if (id !== undefined) this.id = id
    if (title !== undefined) this.title = title
    if (price !== undefined) this.price = Number(price).toFixed(2).toString()
    if (categoryId !== undefined) this.categoryId = categoryId
  }
}
