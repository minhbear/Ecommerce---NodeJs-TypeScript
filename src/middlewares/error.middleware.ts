import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(error);
    const status: number = error.status || 500;
    const message: string = error.message || 'Internal server error';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
    res.status(status).json({
      status: "error",
      code: status,
      message,
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
