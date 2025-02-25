export enum HttpErrorCodes {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  UNAUTHORIZED = 401,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
  CONFLICT = 409,
}

export class HttpError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
    public details?: Record<string, unknown>,
    public success = false,
  ) {
    super(message);
  }
}

export class NotFound extends HttpError {
  constructor(
    message: string,
    code?: string,
    details?: Record<string, unknown>,
  ) {
    super(HttpErrorCodes.NOT_FOUND, message, code, details);
  }
}

export class BadRequest extends HttpError {
  constructor(
    message: string,
    code?: string,
    details?: Record<string, unknown>,
  ) {
    super(HttpErrorCodes.BAD_REQUEST, message, code, details);
  }
}

export class Forbidden extends HttpError {
  constructor(
    message: string,
    code?: string,
    details?: Record<string, unknown>,
  ) {
    super(HttpErrorCodes.FORBIDDEN, message, code, details);
  }
}

export class Unauthorized extends HttpError {
  constructor(
    message: string,
    code?: string,
    details?: Record<string, unknown>,
  ) {
    super(HttpErrorCodes.UNAUTHORIZED, message, code, details);
  }
}

export class InternalServerError extends HttpError {
  constructor(
    message: string,
    code?: string,
    details?: Record<string, unknown>,
  ) {
    super(HttpErrorCodes.INTERNAL_SERVER_ERROR, message, code, details);
  }
}

export class ServiceUnavailable extends HttpError {
  constructor(
    message: string,
    code?: string,
    details?: Record<string, unknown>,
  ) {
    super(HttpErrorCodes.SERVICE_UNAVAILABLE, message, code, details);
  }
}

export class Conflict extends HttpError {
  constructor(
    message: string,
    code?: string,
    details?: Record<string, unknown>,
  ) {
    super(HttpErrorCodes.CONFLICT, message, code, details);
  }
}
