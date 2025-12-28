import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createError } from "./error.middleware.js";
import { ERROR_MESSAGES } from "../constants/messages.js";
import { STATUS_CODES } from "../constants/statuscodes.js";

interface AuthRequest extends Request {
    user?: string | JwtPayload; // optional property added to req
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(createError(ERROR_MESSAGES.AUTHORIZATION_TOKEN_MISSING, STATUS_CODES.UNAUTHORIZED));
        }

        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET as string;

        if (!secret) {
            throw new Error(ERROR_MESSAGES.JWT_SECRET_NOT_FOUND);
        }

        // Verify token
        const decoded = jwt.verify(token, secret);
        req.user = decoded; // attach payload to req.user
        next();
    } catch (err) {
        return next(createError(ERROR_MESSAGES.INVALID_OR_EXPIRED_TOKEN, STATUS_CODES.UNAUTHORIZED));
    }
};