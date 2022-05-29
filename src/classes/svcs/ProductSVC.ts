import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'
import { ProductJoiGroup } from 'src/joi/groups/ProductJoiGroup'
import { ProductSchema } from 'src/joi/schemas/ProductSchema'
import { ProductDTO } from '../dtos/ProductDTO'

@JoiSchemaOptions({ allowUnknown: false })
export class ProductSVC {
  @JoiSchema([ProductJoiGroup.create], ProductSchema.create.required())
  data: ProductDTO
}
