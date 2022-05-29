import { Body, Controller, HttpException, HttpStatus, Post, UseFilters } from '@nestjs/common'
import { ExceptionDTO } from 'src/classes/dtos/outs/ExceptionDTO'
import { ExceptionReasonDTO } from 'src/classes/dtos/outs/ExceptionReasonDTO'
import { ResponseDTO } from 'src/classes/dtos/outs/ResponseDTO'
import { ProductSVC } from 'src/classes/svcs/ProductSVC'
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
    let createProductData
    try {
      createProductData = await this.productService.createProduct()
    } catch (error) {
      throw new HttpException(ExceptionDTO.withWarning('Failed to create product', exceptionReasonDTOs), HttpStatus.BAD_REQUEST)
    }
    return new ResponseDTO(HttpStatus.CREATED, 'Succesfully created product')
  }
}
