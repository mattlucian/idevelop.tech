/**
 * Logger utility for Lambda functions
 *
 * Provides structured logging with proper context for AWS Lambda.
 * Logs are sent to CloudWatch Logs and can be forwarded to observability platforms.
 */

/**
 * Log level enum
 */
export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
}

/**
 * Structured log entry
 */
interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  data?: Record<string, unknown>;
  error?: Error;
}

/**
 * Format log entry for CloudWatch
 */
function formatLogEntry(entry: LogEntry): string {
  const parts = [
    `[${entry.level}]`,
    entry.context ? `[${entry.context}]` : "",
    entry.message,
  ];

  if (entry.data) {
    parts.push(JSON.stringify(entry.data));
  }

  if (entry.error) {
    parts.push(`Error: ${entry.error.message}`);
    if (entry.error.stack) {
      parts.push(`\nStack: ${entry.error.stack}`);
    }
  }

  return parts.filter(Boolean).join(" ");
}

/**
 * Logger class
 */
class Logger {
  constructor(private context?: string) {}

  /**
   * Log debug message
   */
  debug(message: string, data?: Record<string, unknown>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.DEBUG,
      message,
      context: this.context,
      data,
    };
    console.log(formatLogEntry(entry));
  }

  /**
   * Log info message
   */
  info(message: string, data?: Record<string, unknown>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.INFO,
      message,
      context: this.context,
      data,
    };
    console.log(formatLogEntry(entry));
  }

  /**
   * Log warning message
   */
  warn(message: string, data?: Record<string, unknown>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.WARN,
      message,
      context: this.context,
      data,
    };
    console.warn(formatLogEntry(entry));
  }

  /**
   * Log error message
   */
  error(message: string, error?: Error, data?: Record<string, unknown>): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: LogLevel.ERROR,
      message,
      context: this.context,
      error,
      data,
    };
    console.error(formatLogEntry(entry));
  }
}

/**
 * Create a logger instance with optional context
 */
export function createLogger(context?: string): Logger {
  return new Logger(context);
}

/**
 * Default logger instance
 */
export const logger = createLogger();
