import { NextFunction, Request, Response } from "express";

export const apiLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = process.hrtime();
  res.on(`finish`, () => {
    const end = process.hrtime(start);
    const responseTime = (end[0] * 1e3 + end[1] * 1e-6).toFixed(2);
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${responseTime} ms`
    );
  });
  next();
};
