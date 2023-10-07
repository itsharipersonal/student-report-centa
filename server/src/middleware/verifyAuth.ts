// customMiddleware.js
import { NotAuthorizedError } from "@hkticket/common";
import { NextFunction, Request, Response } from "express";

export const checkSession = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.user) {
    throw new NotAuthorizedError();
  }
  next(); // Continue to the next middleware or route handler
};
