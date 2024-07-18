import { DomainError, ErrorCodes } from '.'

export class UnauthorizedError implements DomainError {
  error = 'Unauthorized Error'
  code = ErrorCodes.UNAUTHORIZED_ERROR
  response: unknown

  constructor(message?: string) {
    this.response = { message: message ?? 'Unauthorized access' }
  }
}
