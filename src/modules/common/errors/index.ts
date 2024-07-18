export enum ErrorCodes {
  VALIDATION_ERROR = 0,
  NOT_FOUND_ERROR = 1,
  DUPLICATED_ENTITY_ERROR = 2,
  GENERIC_ERROR = 3,
  UNAUTHORIZED_ERROR = 4,
  FORBID_ERROR = 5,
  LIMIT_REACHED_ERROR = 6,
  NONE_ELEMENT_ERROR = 7,
}

export interface DomainError {
  error: string
  code: ErrorCodes
  response: unknown
}
