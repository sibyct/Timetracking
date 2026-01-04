import { Injectable, isDevMode } from '@angular/core';

export enum LogLevel {
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  // Default level: In Dev show everything, in Prod only Errors
  private level: LogLevel = isDevMode() ? LogLevel.Debug : LogLevel.Error;

  debug(msg: string, ...optionalParams: any[]) {
    this.logWith(LogLevel.Debug, msg, optionalParams);
  }

  info(msg: string, ...optionalParams: any[]) {
    this.logWith(LogLevel.Info, msg, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    this.logWith(LogLevel.Warn, msg, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.logWith(LogLevel.Error, msg, optionalParams);
  }

  /**
   * Logs a message with the specified log level.
   * @param level The log level.
   * @param msg The message to log.
   * @param params Optional parameters to include in the log message.
   */
  private logWith(level: LogLevel, msg: string, params: any[]) {
    if (level >= this.level) {
      const timestamp = new Date().toISOString();
      const message = `[${timestamp}] [${LogLevel[level].toUpperCase()}]: ${msg}`;

      switch (level) {
        case LogLevel.Debug:
        case LogLevel.Info:
          console.info(message, ...params);
          break;
        case LogLevel.Warn:
          console.warn(message, ...params);
          break;
        case LogLevel.Error:
          console.error(message, ...params);
          this.sendToExternalProvider(message, params);
          break;
      }
      return;
    }

    this.sendToExternalProvider(msg, params);
  }

  /**
   * Sends a log message to an external provider.
   * @param msg The message to send.
   * @param params Optional parameters to include in the log message.
   */
  private sendToExternalProvider(msg: string, params: any[]) {
    // ARCHITECT NOTE: This is where you'd call an external API
    // this.sendToExternalProvider(msg, params);
  }
}
