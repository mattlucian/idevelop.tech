/**
 * Centralized logging utility
 *
 * Provides consistent logging patterns across the application with
 * environment-aware behavior (dev vs production).
 *
 * In development: Logs to console
 * In production: Can be extended to send to monitoring service
 */

type LogLevel = "log" | "warn" | "error";

interface LogContext {
  component?: string;
  action?: string;
  [key: string]: unknown;
}

/**
 * Core logging function
 */
function logMessage(
  level: LogLevel,
  message: string,
  context?: LogContext,
): void {
  // Only log in development mode
  if (!import.meta.env.DEV) {
    // TODO: In production, send to monitoring service (e.g., Sentry, DataDog)
    return;
  }

  // Format message with context
  const formattedMessage = context
    ? `${message} ${JSON.stringify(context, null, 2)}`
    : message;

  // Log to console based on level
  switch (level) {
    case "error":
      console.error(`❌ ${formattedMessage}`);
      break;
    case "warn":
      console.warn(`⚠️ ${formattedMessage}`);
      break;
    case "log":
      console.log(`ℹ️ ${formattedMessage}`);
      break;
  }
}

/**
 * Logger instance
 */
export const logger = {
  /**
   * Log informational message
   * @param message - The message to log
   * @param context - Optional context object with additional details
   */
  log(message: string, context?: LogContext): void {
    logMessage("log", message, context);
  },

  /**
   * Log warning message
   * @param message - The warning message
   * @param context - Optional context object with additional details
   */
  warn(message: string, context?: LogContext): void {
    logMessage("warn", message, context);
  },

  /**
   * Log error message
   * @param message - The error message
   * @param error - Optional error object
   * @param context - Optional context object with additional details
   */
  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorContext: LogContext = {
      ...context,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    };
    logMessage("error", message, errorContext);
  },

  /**
   * Log component-specific message
   * @param component - Component name
   * @param message - The message to log
   * @param context - Optional additional context
   */
  component(component: string, message: string, context?: LogContext): void {
    logMessage("log", message, { component, ...context });
  },

  /**
   * Log component-specific warning
   * @param component - Component name
   * @param message - The warning message
   * @param context - Optional additional context
   */
  componentWarn(
    component: string,
    message: string,
    context?: LogContext,
  ): void {
    logMessage("warn", message, { component, ...context });
  },

  /**
   * Log component-specific error
   * @param component - Component name
   * @param message - The error message
   * @param error - Optional error object
   * @param context - Optional additional context
   */
  componentError(
    component: string,
    message: string,
    error?: Error | unknown,
    context?: LogContext,
  ): void {
    const errorContext: LogContext = {
      component,
      ...context,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    };
    logMessage("error", message, errorContext);
  },
};
