import { ExceptionType } from 'src/helpers/Types'
import { ExceptionReasonDTO } from './ExceptionReasonDTO'

export class ExceptionDTO extends Error {
  public reasons: Array<ExceptionReasonDTO>
  public type: ExceptionType
  public details: string

  private constructor(type: ExceptionType, message: string, reasons?: Array<ExceptionReasonDTO>) {
    super(message)
    this.type = type
    this.details = message
    if (reasons) this.reasons = reasons
  }

  static withError(message: string, reasons?: Array<ExceptionReasonDTO>) {
    return new ExceptionDTO('ERROR', message, reasons)
  }

  static withWarning(message: string, reasons?: Array<ExceptionReasonDTO>) {
    return new ExceptionDTO('WARN', message, reasons)
  }
}
