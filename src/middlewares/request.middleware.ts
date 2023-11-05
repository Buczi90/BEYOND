import { Request, Response, NextFunction } from 'express';

import { HttpStatusCode } from '../enum/server/status.codes.enum';
import { AppError } from '../utils/Error/AppError';
import Logger from '../utils/Logger/logger';

export const requestLogger = (request: Request, response: Response, next: NextFunction) => {
  Logger.http(`\x1b[33m${request.method}\x1b[0m \x1b[36murl: ${request.url}`);
  next();
};

export const invalidPathHandler = (request: Request, response: Response, next: NextFunction) => {
  const error: AppError = new AppError(HttpStatusCode.NotFound, `Invalid path`);
  throw error;
};

export const errorResponder = (error: AppError, request: Request, response: Response, next: NextFunction) => {
  response.header('Content-Type', 'application/json');

  const status = error.statusCode || HttpStatusCode.BadRequest;
  response.status(status).send(error.message);
};
