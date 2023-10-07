import { NotAuthorizedError } from "@hkticket/common";
import { Request, Response, NextFunction } from "express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  if (!req.session) {
    throw new NotAuthorizedError();
  }

  next();
};
