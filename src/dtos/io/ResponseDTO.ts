import { HttpStatus } from '@nestjs/common'

export class ResponseDTO {
  public statusCode: HttpStatus
  public message: string
  public data: any

  constructor(statusCode: HttpStatus, message: string, data?: any) {
    this.statusCode = statusCode
    this.message = message
    if (data) this.data = data
  }
}
