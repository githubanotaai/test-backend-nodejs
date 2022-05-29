import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'character varying', name: 'title' })
  title: number

  @Column({ type: 'numeric', precision: 255, scale: 2, name: 'price' })
  price: number

  @Column({ type: 'integer', name: 'category_id' })
  categoryId: number

  @CreateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', name: 'created_at' })
  createdAt: string

  @UpdateDateColumn({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP', update: true, name: 'updated_at' })
  updatedAt: string

  constructor(id?: number, title?: number, price?: number, categoryId?: number) {
    if (id !== undefined) this.id = id
    if (title !== undefined) this.id = title
    if (price !== undefined) this.id = price
    if (categoryId !== undefined) this.id = categoryId
  }
}
