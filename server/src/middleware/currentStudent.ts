import { Request, Response, NextFunction } from "express";

interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentStudent?: UserPayload;
    }
  }
}

export const currentStudent = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.user) {
    return next();
  }

  try {
    const payload = { id: "id", email: req.session!.user } as UserPayload;
    req.currentStudent = payload;
  } catch (err) {}

  next();
};
