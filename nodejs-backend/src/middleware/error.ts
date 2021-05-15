import ErrorResponse from '../utils/errorResponse';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  let error = { ...err };
  console.error(error);
  // copying the message
  error.message = err.message;

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

export default errorHandler;
