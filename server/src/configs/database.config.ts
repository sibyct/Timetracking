import { Pool } from "pg";
import { logger } from "../utils/loggers.js";

export const pool = new Pool({
    connectionString: process.env.DB_URL,
    max: 10,                        // max number of clients in the pool
    idleTimeoutMillis: 30000,       // close idle clients after 30 seconds
});

pool.on('error', (err: Error) => {
    logger.error('Database connection error', err);
});