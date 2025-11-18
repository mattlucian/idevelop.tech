/**
 * New Relic Lambda Wrapper for API Handlers
 *
 * This wrapper initializes the New Relic APM agent and wraps Lambda handlers.
 * The newrelic package is provided by the New Relic Lambda layer at runtime.
 *
 * This wrapper can be reused for any Lambda function in the API by importing
 * the appropriate handler and wrapping it with newrelic.setLambdaHandler().
 */

// Import newrelic from the Lambda layer (marked as external in build config)
// @ts-expect-error - newrelic is provided by Lambda layer, not bundled
import newrelic from "newrelic";

// Import the API handler (contact form endpoint)
import { handler as apiHandler } from "./contact";

/**
 * Wrapped handler with New Relic APM instrumentation
 */
export const handler = newrelic.setLambdaHandler(apiHandler);
