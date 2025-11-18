/**
 * New Relic Lambda Wrapper for API Handlers
 *
 * This wrapper initializes the New Relic APM agent and wraps Lambda handlers.
 * The newrelic package is provided by the New Relic Lambda layer at runtime.
 *
 * This wrapper can be reused for any Lambda function in the API by importing
 * the appropriate handler and wrapping it with newrelic.setLambdaHandler().
 */

import type { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { createLogger } from "./utils/logger";

// Import the API handler (contact form endpoint)
import { handler as apiHandler } from "./contact";

// Create logger with context for debugging
const logger = createLogger("NewRelicWrapper");

/**
 * New Relic module interface (minimal type definition)
 */
interface NewRelicModule {
  setLambdaHandler: (
    handler: APIGatewayProxyHandlerV2,
  ) => APIGatewayProxyHandlerV2;
}

/**
 * Dynamically import newrelic from Lambda layer at module load time
 */
async function initializeNewRelic(): Promise<NewRelicModule> {
  logger.info("Starting wrapper initialization");
  logger.info("Attempting to import newrelic module");

  try {
    // Dynamic import from Lambda layer (marked as external in build config)
    // @ts-expect-error - newrelic module is provided by Lambda layer
    const newrelic = (await import("newrelic")) as NewRelicModule;
    logger.info("Successfully imported newrelic module");
    return newrelic;
  } catch (error) {
    logger.error(
      "Failed to import newrelic module",
      error instanceof Error ? error : new Error(String(error)),
    );
    throw error;
  }
}

// Initialize New Relic wrapper
const newRelicPromise = initializeNewRelic();

logger.info("Creating wrapped handler");

/**
 * Wrapped handler with New Relic APM instrumentation
 */
export const handler = async (
  event: Parameters<APIGatewayProxyHandlerV2>[0],
  context: Parameters<APIGatewayProxyHandlerV2>[1],
  callback: Parameters<APIGatewayProxyHandlerV2>[2],
) => {
  const newrelic = await newRelicPromise;
  const wrappedHandler = newrelic.setLambdaHandler(apiHandler);
  logger.info("Wrapper initialization complete");
  return wrappedHandler(event, context, callback);
};
