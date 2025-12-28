import app from './app.js';
import http from 'http';

const PORT = process.env.PORT || 3000;
import { logger } from "./utils/loggers.js";


if (!process.env.DB_URL) {
    logger.error('Missing DB_URL environment variable');
    process.exit(1);
}

const server: http.Server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});


// Listen for server errors (failure)
server.on('error', (err: NodeJS.ErrnoException) => {
    switch (err.code) {
        case 'EADDRINUSE':
            logger.error(`Port ${PORT} is already in use.`);
            break;
        case 'EACCES':
            logger.error(`Permission denied to use port ${PORT}.`);
            break;
        default:
            logger.error(`Server failed to start:`, err);
            break;
    }
});

process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Rejection:', reason);
    process.exit(1);
});

process.on('SIGINT', () => {
    logger.info('Server shutting down...');
    server.close(() => process.exit(0));
});