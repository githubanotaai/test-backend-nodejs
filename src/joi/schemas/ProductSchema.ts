import * as Joi from 'joi'

export class ProductSchema {
  static id = Joi.number().min(0)
  static text = Joi.string().regex(/^[ 0-9A-Za-z]+$/)
  static numeric = Joi.number().precision(100)
  static page = Joi.number().min(0).optional()
  static pageSize = Joi.number().min(1).max(200).optional()

  static errorHandler(errors: any, field: string): any {
    const required = `${field} must be informed`
    const invalid = `${field} is invalid`
    const unknown = `${field} is not a valid property`
    errors.forEach((error: any) => {
      const baseMessage = `"${error.local.label};${error.messages[error.code].rendered
        .replace(/[:? ]*{+#.*?}}/g, '')
        .replace('with ', '')
        .trim()}`
      if (error.code === 'any.required') error.message = `"${baseMessage};${required}"`
      else if (error.code === 'any.unknown') error.message = `"${baseMessage};${unknown}"`
      else error.message = `"${baseMessage};${invalid}"`
    })
    return errors
  }

  static filters = Joi.object({
    name: Joi.any().error((errors) => this.errorHandler(errors, 'id')),
    categoryId: Joi.any().error((errors) => this.errorHandler(errors, 'category id')),
  })

  static defaultObject = {
    title: this.text.required().error((errors) => this.errorHandler(errors, 'title')),
    price: this.numeric.required().error((errors) => this.errorHandler(errors, 'price')),
    categoryId: this.id.required().error((errors) => this.errorHandler(errors, 'categoryId')),
  }

  static create = Joi.object(this.defaultObject)
  static update = Joi.object({ id: this.id.required().error((errors) => this.errorHandler(errors, 'id')), ...this.defaultObject })
  static delete = Joi.object({ id: this.id.required().error((errors) => this.errorHandler(errors, 'id')) })
}
