import { ProductDTO } from 'src/classes/dtos/ProductDTO'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'character varying', name: 'title' })
  title: string

  @Column({ type: 'numeric', precision: 255, scale: 2, name: 'price' })
  price: number

  @Column({ type: 'integer', name: 'category_id' })
  categoryId: number

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: string

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', update: true, name: 'updated_at' })
  updatedAt: string

  overrideEntityWithDTO(productDTO: ProductDTO) {
    if (productDTO.categoryId !== undefined) this.categoryId = productDTO.categoryId
    if (productDTO.id !== undefined) this.id = productDTO.id
    if (productDTO.price !== undefined) this.price = Number(productDTO.price)
    if (productDTO.title !== undefined) this.title = productDTO.title
  }

  static constructorByDTO(productDTO: ProductDTO) {
    return new ProductEntity(productDTO.title, Number(productDTO.price), productDTO.categoryId, productDTO.id)
  }

  constructor(title?: string, price?: number, categoryId?: number, id?: number) {
    if (id !== undefined) this.id = id
    if (title !== undefined) this.title = title
    if (price !== undefined) this.price = price
    if (categoryId !== undefined) this.categoryId = categoryId
  }
}
