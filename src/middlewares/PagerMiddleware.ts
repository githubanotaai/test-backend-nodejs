import { HttpException, HttpStatus, Injectable, NestMiddleware, UseFilters } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { ExceptionDTO } from 'src/classes/dtos/outs/ExceptionDTO'
import { ExceptionReasonDTO } from 'src/classes/dtos/outs/ExceptionReasonDTO'
import { Logger } from 'src/configurations/LoggerConfiguration'
import { HttpExceptionFilter } from '../filters/HttpExceptionFilter'

@Injectable()
@UseFilters(new HttpExceptionFilter())
export class PagerMiddleware implements NestMiddleware {
  use(request: Request, _response: Response, next: NextFunction) {
    try {
      const page = request.query.page ? Number(request.query.page) : 1
      const pageSize = request.query.pageSize ? Number(request.query.pageSize) : 20

      if (Number.isNaN(page) || Number.isNaN(pageSize)) throw Error('Paging parameters should be numeric')
      if (page <= 0 || pageSize <= 0) throw Error('Invalid paging parameters')

      request.query.page = ((page - 1) * pageSize).toString()
      request.query.pageSize = pageSize.toString()
      next()
    } catch (error) {
      Logger.error(`Invalid page values ${error}`, error)
      throw new HttpException(ExceptionDTO.withWarning('Error filtering data', [new ExceptionReasonDTO('Page', 'Invalid page and pageSize values')]), HttpStatus.BAD_REQUEST)
    }
  }
}
