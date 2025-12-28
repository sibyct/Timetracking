import { createLogger, format, transports } from "winston";
const { combine, timestamp, colorize, errors, json } = format;

// Logger instance
export const logger = createLogger({
    level: "info", // default logging level
    format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }), // <-- log full stack trace
        json()
    ),
    transports: [
        new transports.Console(), // log to console
        new transports.File({ filename: "logs/error.log", level: "error" }), // error logs
        new transports.File({ filename: "logs/combined.log" }) // all logs
    ],
    exitOnError: false, // do not exit on handled exceptions
});
