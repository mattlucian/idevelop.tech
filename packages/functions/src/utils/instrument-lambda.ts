import newrelic from "newrelic";
import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyHandlerV2,
  APIGatewayProxyResultV2,
  Context,
} from "aws-lambda";

/**
 * Async API Gateway handler. Narrower than APIGatewayProxyHandlerV2, which also
 * allows callback-style handlers that return void.
 */
export type AsyncApiHandler = (
  event: APIGatewayProxyEventV2,
  context: Context,
) => Promise<APIGatewayProxyResultV2>;

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
 * const myHandler: AsyncApiHandler = async (event) => {
 *   // Handler logic
 * };
 *
 * export const handler = instrumentLambda(myHandler);
 * ```
 */
export function instrumentLambda(
  handler: AsyncApiHandler,
): APIGatewayProxyHandlerV2 {
  const instrumented: AsyncApiHandler = async (event, context) => {
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
