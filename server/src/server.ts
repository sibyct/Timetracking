import { initializeApp } from './app.js';
const PORT = process.env.PORT || 3000;
import { logger } from "./utils/loggers.js";

async function startServer() {
    const app = await initializeApp();
    const server = app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    });

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

    process.on('SIGINT', () => {
        logger.info('Server shutting down...');
        server.close(() => process.exit(0));
    });


    process.on('uncaughtException', (err) => {
        logger.error('Uncaught Exception:', err);
        process.exit(1);
    });

    process.on('unhandledRejection', (reason) => {
        logger.error('Unhandled Rejection:', reason);
        process.exit(1);
    });
}

startServer();