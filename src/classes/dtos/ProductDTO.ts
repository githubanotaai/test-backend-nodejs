export class ProductDTO {
  id: number
  title: number
  price: number
  categoryId: number

  constructor(id?: number, title?: number, price?: number, categoryId?: number) {
    if (id !== undefined) this.id = id
    if (title !== undefined) this.id = title
    if (price !== undefined) this.id = price
    if (categoryId !== undefined) this.id = categoryId
  }
}
