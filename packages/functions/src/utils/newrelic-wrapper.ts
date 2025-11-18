/**
 * New Relic Lambda Handler Wrapper
 *
 * Provides a reusable wrapper for Lambda functions that automatically:
 * - Wraps handlers with New Relic APM instrumentation
 * - Adds custom attributes for dashboard filtering
 * - Ensures consistent telemetry across all Lambda functions
 *
 * Usage:
 *   import { wrapWithNewRelic } from "./utils/newrelic-wrapper";
 *
 *   const myHandler: APIGatewayProxyHandlerV2 = async (event) => {
 *     // handler logic
 *   };
 *
 *   export const handler = wrapWithNewRelic(myHandler, "/v1/my-endpoint");
 */

import newrelic from "newrelic";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";

/**
 * Wrap a Lambda handler with New Relic APM instrumentation and custom attributes
 *
 * @param handler - The Lambda handler function to wrap
 * @param endpoint - The API endpoint path (e.g., "/v1/contact")
 * @returns Wrapped handler with New Relic instrumentation
 */
export function wrapWithNewRelic(
  handler: APIGatewayProxyHandlerV2,
  endpoint: string,
): APIGatewayProxyHandlerV2 {
  // Add custom attributes for dashboard filtering
  const STAGE = process.env.STAGE || "dev";

  newrelic.addCustomAttribute("environment", STAGE);
  newrelic.addCustomAttribute("endpoint", endpoint);

  // Wrap and return the handler with New Relic instrumentation
  return newrelic.setLambdaHandler(handler);
}
