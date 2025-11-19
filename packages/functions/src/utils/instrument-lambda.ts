import newrelic from "newrelic";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";

/**
 * Wraps a Lambda handler with New Relic instrumentation and automatically
 * adds custom attributes for environment and endpoint.
 *
 * This ensures consistent telemetry tagging across all Lambda functions
 * without requiring manual attribute setup in each handler.
 *
 * @param handler - The Lambda handler function to instrument
 * @returns Instrumented handler wrapped with New Relic APM
 *
 * @example
 * ```typescript
 * const myHandler: APIGatewayProxyHandlerV2 = async (event) => {
 *   // Handler logic
 * };
 *
 * export const handler = instrumentLambda(myHandler);
 * ```
 */
export function instrumentLambda(
  handler: APIGatewayProxyHandlerV2,
): APIGatewayProxyHandlerV2 {
  const instrumented: APIGatewayProxyHandlerV2 = async (event, context) => {
    // Add custom attributes for filtering in New Relic
    newrelic.addCustomAttribute("environment", process.env.STAGE || "dev");
    newrelic.addCustomAttribute(
      "endpoint",
      event.requestContext?.http?.path || "unknown",
    );

    // Call original handler
    return handler(event, context);
  };

  // Wrap with New Relic's setLambdaHandler for APM instrumentation
  return newrelic.setLambdaHandler(instrumented);
}
