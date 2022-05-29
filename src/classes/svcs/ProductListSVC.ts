import Joi from 'joi'
import { JoiSchema, JoiSchemaOptions } from 'nestjs-joi'
import { ProductJoiGroup } from 'src/joi/groups/ProductJoiGroup'
import { ProductSchema } from 'src/joi/schemas/ProductSchema'
import { FilterDTO } from '../dtos/FilterDTO'

@JoiSchemaOptions({ allowUnknown: false })
export class ProductListSVC {
  @JoiSchema([ProductJoiGroup.list], ProductSchema.filters.optional())
  @JoiSchema(Joi.allow())
  filters?: FilterDTO

  @JoiSchema(ProductSchema.page.optional())
  page?: number

  @JoiSchema(ProductSchema.pageSize.optional())
  pageSize?: number
}
