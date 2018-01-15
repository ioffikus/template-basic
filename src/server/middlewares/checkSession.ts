import { NextFunction, Request, Response } from 'express';
import AppError from 'src/helpers/error';

const checkSession = (req: Request, res: Response, next: NextFunction) => {
  if (req.session) {
    return next();
  }

  const error = AppError('Error in redis session.', 'REDIS', true);
  return next(error);
};

export default checkSession;
