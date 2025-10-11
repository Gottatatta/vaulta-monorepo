import { ErrorCode, ErrorCodeType } from '../enums/error.enum';
import { HttpStatus, HttpStatusCode } from '../configs/http.config';

export class AppError extends Error {
  public statusCode: HttpStatusCode;
  public errorCode?: ErrorCodeType;

  constructor(
    message: string,
    statusCode: HttpStatusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode?: ErrorCodeType,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class HttpException extends AppError {
  constructor(
    message = 'Http Exception Error',
    statusCode: HttpStatusCode,
    errorCode?: ErrorCodeType,
  ) {
    super(message, statusCode, errorCode);
  }
}

export class InternalServerException extends AppError {
  constructor(message = 'Internal Server Error', errorCode?: ErrorCodeType) {
    super(
      message,
      HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode || ErrorCode.INTERNAL_SERVER_ERROR,
    );
  }
}

export class NotFoundException extends AppError {
  constructor(message = 'Resource not found', errorCode?: ErrorCodeType) {
    super(message, HttpStatus.NOT_FOUND, errorCode || ErrorCode.RESOURCE_NOT_FOUND);
  }
}

export class BadRequestException extends AppError {
  constructor(message = 'Bad Request', errorCode?: ErrorCodeType) {
    super(message, HttpStatus.BAD_REQUEST, errorCode || ErrorCode.VALIDATION_ERROR);
  }
}

export class UnauthorizedException extends AppError {
  constructor(message = 'Unauthorized Access', errorCode?: ErrorCodeType) {
    super(message, HttpStatus.UNAUTHORIZED, errorCode || ErrorCode.ACCESS_UNAUTHORIZED);
  }
}
