import { Request, Response, NextFunction } from 'express';

import Logger from '../utils/Logger/logger';

export const errorLogger = (error: Error, request: Request, response: Response, next: NextFunction) => {
  Logger.error(`${error.message}`);
  next(error);
};
