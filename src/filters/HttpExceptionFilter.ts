import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Response } from 'express'
import { Logger } from 'src/configurations/LoggerConfiguration'
import { ErrorDTO } from 'src/dtos/io/ErrorDTO'
import { ExceptionDTO } from 'src/dtos/io/ExceptionDTO'
import { ExceptionReasonDTO } from 'src/dtos/io/ExceptionReasonDTO'

function parserJoiErrors(exception: HttpException): Array<ExceptionReasonDTO> {
  const parsedJoiErrors = Array<ExceptionReasonDTO>()
  let errors = exception.message
    ? exception.message
        .match(/\".*\"/g)
        ?.toString()
        .replace(/\"/g, '')
        .split(',')
    : exception.message.split(',')

  for (let error of errors) {
    const parsedError = error.split(';')
    parsedJoiErrors.push(new ExceptionReasonDTO('Joi', `Failed field data validation${parsedError[1] ? ` duo to: ${parsedError[1]}` : ''}`))
  }
  return parsedJoiErrors
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>()

    const castExceptionDTO = exception.getResponse() as ExceptionDTO

    let exceptionDTO: ExceptionDTO
    if (exception.message.includes('Request validation of body') || exception.message.includes('Request validation of query') || exception.message.includes('Validation failed')) {
      const reasons = parserJoiErrors(exception)
      exceptionDTO = ExceptionDTO.withWarning('Failed joi schema validation', reasons)
      Logger.error('Request rejected by Joi', exceptionDTO)
    } else if (castExceptionDTO?.type === 'ERROR') exceptionDTO = ExceptionDTO.withError(exception.message, castExceptionDTO.reasons)
    else exceptionDTO = ExceptionDTO.withWarning(exception.message, castExceptionDTO.reasons)

    response.status(exception.getStatus()).json(new ErrorDTO(exception.getStatus(), exceptionDTO))
  }
}
