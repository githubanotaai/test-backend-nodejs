import { HttpStatus } from '@nestjs/common'
import { ExceptionDTO } from './ExceptionDTO'
import { ExceptionReasonDTO } from './ExceptionReasonDTO'

export class ErrorDTO {
  public statusCode: HttpStatus
  private message: string
  private reasons?: Array<ExceptionReasonDTO>

  constructor(statusCode: HttpStatus, exceptionDTO: ExceptionDTO) {
    this.statusCode = statusCode
    this.message = exceptionDTO.message
    if (exceptionDTO.reasons) this.reasons = exceptionDTO.reasons
  }
}
