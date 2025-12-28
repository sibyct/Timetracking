import express from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { logger } from "./utils/loggers.js";

export async function initializeApp() {
    // Load environment variables from .env file
    dotenv.config();

    if (!process.env.DB_URL) {
        throw new Error("DB_URL environment variable is not set");
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET environment variable is not set");
    }

    const app = express();

    app.use(express.json());

    app.use(helmet());

    app.use(cors());

    app.use(morgan("combined", {
        stream: {
            write: (message: string) => logger.info(message)
        }
    }));

    app.use(rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        //TODO: make this configurable
        max: process.env.NODE_ENV === "production" ? 100 : 1000,
        standardHeaders: true,
        legacyHeaders: false,
    }));

    app.use('/api/auth', authRoutes);

    // Error handling middleware
    app.use(errorMiddleware);

    return app;
}