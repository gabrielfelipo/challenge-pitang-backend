import { DomainError, ErrorCodes } from '.'

export class NoneElementError implements DomainError {
  error = 'NoneElement Error'
  code = ErrorCodes.NONE_ELEMENT_ERROR
  response: unknown

  constructor(message: string) {
    this.response = { message }
  }
}
