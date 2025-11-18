/**
 * New Relic Lambda Wrapper for API Handlers
 *
 * This wrapper initializes the New Relic APM agent and wraps Lambda handlers.
 * The newrelic package is provided by the New Relic Lambda layer at runtime.
 *
 * This wrapper can be reused for any Lambda function in the API by importing
 * the appropriate handler and wrapping it with newrelic.setLambdaHandler().
 */

console.log("NEW_RELIC_WRAPPER: Starting wrapper initialization");

// Import newrelic from the Lambda layer (marked as external in build config)
let newrelic: any;
try {
  console.log("NEW_RELIC_WRAPPER: Attempting to import newrelic module");
  // @ts-expect-error - newrelic is provided by Lambda layer, not bundled
  newrelic = require("newrelic");
  console.log("NEW_RELIC_WRAPPER: Successfully imported newrelic module");
} catch (error) {
  console.error("NEW_RELIC_WRAPPER: Failed to import newrelic module:", error);
  throw error;
}

// Import the API handler (contact form endpoint)
import { handler as apiHandler } from "./contact";

console.log("NEW_RELIC_WRAPPER: Creating wrapped handler");

/**
 * Wrapped handler with New Relic APM instrumentation
 */
export const handler = newrelic.setLambdaHandler(apiHandler);

console.log("NEW_RELIC_WRAPPER: Wrapper initialization complete");
