import { ErrorRequestHandler, Response } from 'express';
import { ZodError } from 'zod';
import { HttpStatus } from '../configs/http.config';
import { AppError } from '../utils/exceptions.utils';
import { logger } from '../utils/logger.utils';
import { ErrorCode } from '../enums/error.enum';

const formatZodError = (res: Response, error: ZodError) => {
  const errors = error.issues.map((issue) => ({
    field: issue.path.join('.'),
    message: issue.message,
  }));

  return res.status(HttpStatus.BAD_REQUEST).json({
    message: 'Validation failed',
    errorCode: ErrorCode.VALIDATION_ERROR,
    errors,
  });
};

export const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  logger.error(`Error occurred on ${req.method} ${req.path}`, {
    params: req.params,
    body: req.body,
    error,
  });

  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      message: 'Invalid JSON format in request body',
      errorCode: ErrorCode.INVALID_INPUT,
    });
  }

  if (error instanceof ZodError) {
    return formatZodError(res, error);
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    message: 'Internal server error',
    error: error?.message || 'Unknown error',
    errorCode: ErrorCode.INTERNAL_SERVER_ERROR,
  });
};
