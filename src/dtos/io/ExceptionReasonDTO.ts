export class ExceptionReasonDTO {
  identifier: string
  description: string

  constructor(identifier?: string, description?: string) {
    if (identifier) this.identifier = identifier
    if (description) this.description = description
  }
}
