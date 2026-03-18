import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email?: string;
    iat?: number;
    exp?: number;
  };
}

const SECRET = process.env.SECRET;
if (!SECRET) {
  throw new Error("JWT SECRET environment variable is not set");
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Authentication token is required" });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    req.user = decoded as AuthenticatedRequest["user"];
    next();
  });
};

export const requireOwnUserIdFromParams = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authenticatedUserId = req.user?.userId;
  const requestedUserId = req.params.userId;

  if (!authenticatedUserId) {
    return res.status(401).json({ error: "Authentication token is required" });
  }

  if (authenticatedUserId !== requestedUserId) {
    return res.status(403).json({ error: "Access denied for requested user" });
  }

  next();
};

export const requireOwnUserIdFromBody = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authenticatedUserId = req.user?.userId;
  const requestedUserId = req.body?.userId;

  if (!authenticatedUserId) {
    return res.status(401).json({ error: "Authentication token is required" });
  }

  if (!requestedUserId || authenticatedUserId !== requestedUserId) {
    return res.status(403).json({ error: "Access denied for requested user" });
  }

  next();
};
