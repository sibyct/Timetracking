import { initializeApp } from './app';
const PORT = process.env.PORT || 3000;
import { logger } from "./utils/loggers";
import http from 'http';

// Register process events
function registerProcessEvents(server: http.Server) {

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

function appStarted() {
    logger.info(`Server running on port ${PORT}`);
}

// Start server
async function startServer() {
    try {
        const app = await initializeApp();
        const server = app.listen(PORT, appStarted);
        registerProcessEvents(server);

    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();