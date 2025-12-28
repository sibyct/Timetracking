import express from 'express';
import authRoutes from './modules/auth/auth.routes.js';
import { errorMiddleware } from './middleware/error.middleware.js';
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));

app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorMiddleware);

export default app;