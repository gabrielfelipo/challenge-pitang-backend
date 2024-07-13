import { unknown } from "zod";
import { DomainError, ErrorCodes } from ".";

export class LimitReachedError implements DomainError {
    error = "LimitReached Error"
    code = ErrorCodes.LIMIT_REACHED
    response: unknown

    constructor(message: string) {
        this.response = {message}
    }
}
