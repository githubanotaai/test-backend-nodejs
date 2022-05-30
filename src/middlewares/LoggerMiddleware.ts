import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: any, response: Response, next: NextFunction) {
    if (!request.baseUrl.includes('health-check')) {
      const startTime = new Date()
      const agent = request.headers['user-agent']

      let contentLength = request.get('content-length') ? request.get('content-length').concat('b') : 'none'
      console.log(`${startTime.toISOString()} [---->] ${request.method} ${contentLength} ${agent}`)

      response.on('close', () => {
        const { statusCode } = response
        const baseUrl = request.baseUrl === '' ? '/' : request.baseUrl
        contentLength = response.get('content-length') ? response.get('content-length').concat('b') : 'none'

        const finishedTime = new Date()
        console.log(`${finishedTime.toISOString()} [<----] ${request.method} ${baseUrl} ${statusCode}`)
      })

      if (request.error) throw new HttpException(request.error, HttpStatus.BAD_REQUEST)
    }
    next()
  }
}
