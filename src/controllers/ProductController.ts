import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query, Req, UseFilters } from '@nestjs/common'
import { ExceptionDTO } from 'src/classes/dtos/outs/ExceptionDTO'
import { ExceptionReasonDTO } from 'src/classes/dtos/outs/ExceptionReasonDTO'
import { PagedDataDTO } from 'src/classes/dtos/outs/PagedDataDTO'
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

  @Get('/list')
  async listProducts(@Req() request: any, @Query('title') title: string, @Query('categoryId') categoryId: number): Promise<ResponseDTO> {
    let productEntities: Array<ProductEntity>, count: number
    try {
      Logger.info(`Listing ${request.query.pageSize} products in page ${request.query.pageSize}`)
      ;[productEntities, count] = await this.productService.listProducts(title, categoryId, request.query.page, request.query.pageSize)
    } catch (error) {
      Logger.error('Failed to list products', error)
      throw new HttpException(ExceptionDTO.withWarning('Failed to list products'), HttpStatus.BAD_REQUEST)
    }

    Logger.info(`Listed ${request.query.pageSize} products in page ${request.query.pageSize}`)
    return new ResponseDTO(HttpStatus.OK, 'Succesfully listed products', { products: ProductDTO.constructorByEntities(productEntities), ...new PagedDataDTO(request.query.page, request.query.pageSize, count) })
  }

  @Post()
  async createProduct(@Body(ProductJoiPipe.create) body: ProductSVC): Promise<ResponseDTO> {
    let exceptionReasonDTOs: Array<ExceptionReasonDTO> = Array<ExceptionReasonDTO>()
    let productEntity: ProductEntity

    try {
      Logger.info(`Attempting to create new product called ${body.data.title}`)
      productEntity = await this.productService.createProduct(body.data)
    } catch (error) {
      Logger.error('Failed to create product', error)
      if (error?.message?.includes('products_category_id_foreign_key')) exceptionReasonDTOs.push(new ExceptionReasonDTO('Category id', 'Invalid category id informed'))
      if (error?.message?.includes('products_title_unique')) exceptionReasonDTOs.push(new ExceptionReasonDTO('Title', 'Title already being used in another product'))
      throw new HttpException(ExceptionDTO.withWarning('Failed to create product', exceptionReasonDTOs), HttpStatus.BAD_REQUEST)
    }

    Logger.info(`New product created (id: ${productEntity.id}) in category ${productEntity.categoryId}`)
    return new ResponseDTO(HttpStatus.CREATED, 'Succesfully created product', ProductDTO.constructorByEntity(productEntity))
  }

  @Put()
  async updateProduct(@Body(ProductJoiPipe.update) body: ProductSVC): Promise<ResponseDTO> {
    let exceptionReasonDTOs: Array<ExceptionReasonDTO> = Array<ExceptionReasonDTO>()
    let productEntity: ProductEntity

    try {
      Logger.info(`Attempting to update existing product (id: ${body.data.id})`)
      productEntity = await this.productService.updateProduct(body.data)
    } catch (error) {
      Logger.error('Failed to update product', error)
      if (error?.message?.includes('ProductEntity')) exceptionReasonDTOs.push(new ExceptionReasonDTO('Id', 'Invalid id informed'))
      if (error?.message?.includes('products_category_id_foreign_key')) exceptionReasonDTOs.push(new ExceptionReasonDTO('Category id', 'Invalid category id informed'))
      if (error?.message?.includes('products_title_unique')) exceptionReasonDTOs.push(new ExceptionReasonDTO('Title', 'Title already being used in another product'))
      throw new HttpException(ExceptionDTO.withWarning('Failed to update product', exceptionReasonDTOs), HttpStatus.BAD_REQUEST)
    }

    Logger.info(`Product (id: ${productEntity.id}) updated with body ${JSON.stringify(body.data, null)}`)
    return new ResponseDTO(HttpStatus.OK, 'Succesfully update product', ProductDTO.constructorByEntity(productEntity))
  }

  @Delete()
  async deleteProduct(@Body(ProductJoiPipe.delete) body: ProductSVC): Promise<ResponseDTO> {
    let exceptionReasonDTOs: Array<ExceptionReasonDTO> = Array<ExceptionReasonDTO>()

    try {
      Logger.info(`Attempting to delete product (id: ${body.data.id})`)
      await this.productService.deleteProduct(body.data)
    } catch (error) {
      Logger.error('Failed to delete product', error)
      if (error?.message?.includes('ProductEntity')) exceptionReasonDTOs.push(new ExceptionReasonDTO('Id', 'Invalid id informed'))
      throw new HttpException(ExceptionDTO.withWarning('Failed to delete product', exceptionReasonDTOs), HttpStatus.BAD_REQUEST)
    }

    Logger.info(`Product (id: ${body.data.id}) deleted`)
    return new ResponseDTO(HttpStatus.OK, 'Succesfully deleted product', { id: body.data.id })
  }
}
