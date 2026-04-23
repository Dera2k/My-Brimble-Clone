type LogLevel = 'info' | 'warn' | 'error' | 'debug';

class Logger {
  private prefix: string;

  constructor(prefix: string = '') {
    this.prefix = prefix;
  }

  private log(level: LogLevel, message: string, ...args: any[]) {
    const timestamp = new Date().toISOString();
    const prefixStr = this.prefix ? `[${this.prefix}]` : '';
    console[level === 'debug' ? 'log' : level](
      `${timestamp} ${level.toUpperCase()} ${prefixStr}`,
      message,
      ...args
    );
  }

  info(message: string, ...args: any[]) {
    this.log('info', message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this.log('warn', message, ...args);
  }

  error(message: string, ...args: any[]) {
    this.log('error', message, ...args);
  }

  debug(message: string, ...args: any[]) {
    // only log debug in dev
    if (process.env.NODE_ENV !== 'production') {
      this.log('debug', message, ...args);
    }
  }
}

//xxport a default logger
export const logger = new Logger();
//xxport factory for creating scoped loggers
export const createLogger = (prefix: string) => new Logger(prefix);