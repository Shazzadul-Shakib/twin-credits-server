import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith("/api-docs")) {
    return next();
  }

  res.status(404).json({
    success: false,
    message: "API endpoint not found",
    path: req.originalUrl,
  });
};
