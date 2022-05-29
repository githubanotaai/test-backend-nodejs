import { Body, Controller, Delete, HttpException, HttpStatus, Post, Put, UseFilters } from '@nestjs/common'
import { ExceptionDTO } from 'src/classes/dtos/outs/ExceptionDTO'
import { ExceptionReasonDTO } from 'src/classes/dtos/outs/ExceptionReasonDTO'
import { ResponseDTO } from 'src/classes/dtos/outs/ResponseDTO'
import { ProductDTO } from 'src/classes/dtos/ProductDTO'
import { ProductSVC } from 'src/classes/svcs/ProductSVC'
import { Logger } from 'src/configurations/LoggerConfiguration'
import { ProductEntity } from 'src/entities/ProductEntity'
import { HttpExceptionFilter } from 'src/filters/HttpExceptionFilter'
import { ProductJoiPipe } from 'src/joi/pipes/ProductJoiPipe'
import { ProductService } from 'src/services/ProductService'

@Controller('/products')
@UseFilters(new HttpExceptionFilter())
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body(ProductJoiPipe.create) body: ProductSVC): Promise<ResponseDTO> {
    let exceptionReasonDTOs: Array<ExceptionReasonDTO> = Array<ExceptionReasonDTO>()
    let productEntity: ProductEntity

    try {
      productEntity = await this.productService.createProduct(body.data)
    } catch (error) {
      Logger.error('Failed to create product', error)
      if (error?.message?.includes('products_category_id_foreign_key')) exceptionReasonDTOs.push(new ExceptionReasonDTO('Category id', 'Invalid category id informed'))
      if (error?.message?.includes('products_title_unique')) exceptionReasonDTOs.push(new ExceptionReasonDTO('Title', 'Title already being used in another product'))
      throw new HttpException(ExceptionDTO.withWarning('Failed to create product', exceptionReasonDTOs), HttpStatus.BAD_REQUEST)
    }

    return new ResponseDTO(HttpStatus.CREATED, 'Succesfully created product', ProductDTO.constructorByEntity(productEntity))
  }

  @Put()
  async updateProduct(@Body(ProductJoiPipe.update) body: ProductSVC): Promise<ResponseDTO> {
    let exceptionReasonDTOs: Array<ExceptionReasonDTO> = Array<ExceptionReasonDTO>()
    let productEntity: ProductEntity

    try {
      productEntity = await this.productService.updateProduct(body.data)
    } catch (error) {
      Logger.error('Failed to update product', error)
      if (error?.message?.includes('ProductEntity')) exceptionReasonDTOs.push(new ExceptionReasonDTO('Id', 'Invalid id informed'))
      if (error?.message?.includes('products_category_id_foreign_key')) exceptionReasonDTOs.push(new ExceptionReasonDTO('Category id', 'Invalid category id informed'))
      if (error?.message?.includes('products_title_unique')) exceptionReasonDTOs.push(new ExceptionReasonDTO('Title', 'Title already being used in another product'))
      throw new HttpException(ExceptionDTO.withWarning('Failed to update product', exceptionReasonDTOs), HttpStatus.BAD_REQUEST)
    }

    return new ResponseDTO(HttpStatus.OK, 'Succesfully update product', ProductDTO.constructorByEntity(productEntity))
  }

  @Delete()
  async deleteProduct(@Body(ProductJoiPipe.delete) body: ProductSVC): Promise<ResponseDTO> {
    let exceptionReasonDTOs: Array<ExceptionReasonDTO> = Array<ExceptionReasonDTO>()

    try {
      await this.productService.deleteProduct(body.data)
    } catch (error) {
      Logger.error('Failed to delete product', error)
      if (error?.message?.includes('ProductEntity')) exceptionReasonDTOs.push(new ExceptionReasonDTO('Id', 'Invalid id informed'))
      throw new HttpException(ExceptionDTO.withWarning('Failed to delete product', exceptionReasonDTOs), HttpStatus.BAD_REQUEST)
    }

    return new ResponseDTO(HttpStatus.OK, 'Succesfully deleted product', { id: body.data.id })
  }
}
