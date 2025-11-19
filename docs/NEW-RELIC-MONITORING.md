# New Relic Monitoring for Lambda Functions

Complete guide for New Relic APM and observability integration with AWS Lambda functions.

## Overview

This project uses **New Relic Lambda Extension + APM Agent** for comprehensive monitoring of Lambda functions:

- **APM Agent**: Code-level instrumentation and distributed tracing
- **Lambda Extension**: Telemetry collection and transmission
- **Event Types**: AwsLambdaInvocation, Span, and Log events
- **Custom Instrumentation**: Automatic environment tagging via `instrumentLambda()` utility

## Architecture

### Components

**Lambda Layer**: `arn:aws:lambda:us-east-1:451483290750:layer:NewRelicNodeJS20XARM64:95`
- New Relic APM Agent for Node.js 20 (ARM64)
- New Relic Lambda Extension v2.3.24
- Provides `newrelic` package at runtime

**Handler Wrapper**: `instrumentLambda()` utility
- Wraps Lambda handlers with APM instrumentation
- Automatically adds custom attributes (environment, endpoint)
- Captures transactions, spans, and errors
- Enables distributed tracing

**Extension**: Asynchronous telemetry sender
- Sends traces, logs, and metrics to New Relic
- Runs independently of Lambda execution
- Configurable timeout for data collection

## Configuration

### Environment Variables

```typescript
// sst.config.ts
environment: {
  // New Relic APM Agent
  NEW_RELIC_LICENSE_KEY: newRelicLicenseKey.value,
  NEW_RELIC_ACCOUNT_ID: "7377610",
  NEW_RELIC_APP_NAME: isProduction
    ? "api-idevelop-tech"
    : "dev-api-idevelop-tech",
  NEW_RELIC_LOG_LEVEL: "info",
  NR_TAGS: isProduction
    ? "environment:production"
    : "environment:dev",  // Creates "environment" field on Log events

  // New Relic Lambda Extension
  NEW_RELIC_EXTENSION_SEND_FUNCTION_LOGS: "true",
  NEW_RELIC_LAMBDA_EXTENSION_ENABLED: "true",
  NEW_RELIC_DATA_COLLECTION_TIMEOUT: "20s",  // Increased for network latency
  NEW_RELIC_EXTENSION_LOG_LEVEL: "INFO",
}
```

### Handler Implementation

Use the `instrumentLambda()` utility for automatic environment tagging:

```typescript
// packages/functions/src/contact.ts
import { instrumentLambda } from "./utils/instrument-lambda";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";

const contactHandler: APIGatewayProxyHandlerV2 = async (event) => {
  // Handler logic
};

// Export wrapped handler with automatic custom attributes
export const handler = instrumentLambda(contactHandler);
```

**What `instrumentLambda()` does:**
- Wraps handler with `newrelic.setLambdaHandler()` for APM instrumentation
- Adds `environment` custom attribute (from `STAGE` env var) to AwsLambdaInvocation events
- Adds `endpoint` custom attribute (from request path) for filtering by API endpoint
- No need to manually add attributes in each handler

### Build Configuration

```typescript
// sst.config.ts
nodejs: {
  esbuild: {
    external: ["newrelic"],  // Provided by Lambda layer
  },
}
```

## Environment Filtering Strategy

Different event types require different filtering approaches:

### Log Events
`NR_TAGS` environment variable creates a top-level `environment` field:
```sql
WHERE environment = 'dev'
```

### AwsLambdaInvocation Events
`instrumentLambda()` utility adds custom `environment` attribute:
```sql
WHERE environment = 'dev'
```

### Span Events
Use JOIN to correlate with AwsLambdaInvocation via `traceId`:
```sql
FROM Span
JOIN AwsLambdaInvocation ON Span.traceId = AwsLambdaInvocation.traceId
WHERE AwsLambdaInvocation.environment = 'dev'
```

### Dashboard Variable Setup

**Single Variable Approach:**
- Name: `{{environment}}`
- Type: String
- Values: `dev`, `production`

This works uniformly across Log and AwsLambdaInvocation events. For Span queries, use the JOIN pattern above.

## Dashboard Queries

### 1. Request Rate
```sql
SELECT count(*)
FROM AwsLambdaInvocation
WHERE environment = '{{environment}}'
FACET request.uri
TIMESERIES AUTO
```

### 2. Response Time
```sql
SELECT
  average(duration * 1000) as 'Avg Response Time (ms)',
  max(duration * 1000) as 'Max Response Time (ms)',
  percentile(duration * 1000, 95) as 'P95 Response Time (ms)'
FROM AwsLambdaInvocation
WHERE environment = '{{environment}}'
TIMESERIES AUTO
```

### 3. Error Rate
```sql
SELECT percentage(count(*), WHERE error IS true) as 'Error Rate %'
FROM AwsLambdaInvocation
WHERE environment = '{{environment}}'
TIMESERIES AUTO
```

### 4. Recent Error Logs
```sql
SELECT timestamp, message
FROM Log
WHERE environment = '{{environment}}'
AND (message LIKE '%error%' OR message LIKE '%Error%')
SINCE 1 day ago
LIMIT 50
```

### 5. Memory Usage
```sql
SELECT
  average(provider.maxMemoryUsed.Average / provider.memorySize.Average * 100) as 'Avg Memory %',
  max(provider.maxMemoryUsed.Average / provider.memorySize.Average * 100) as 'Peak Memory %'
FROM AwsLambdaInvocation
WHERE environment = '{{environment}}'
TIMESERIES AUTO
```

### 6. Request Volume by Endpoint
```sql
SELECT count(*)
FROM AwsLambdaInvocation
WHERE environment = '{{environment}}'
FACET endpoint
SINCE 1 day ago
```

### 7. Distributed Tracing (Spans with Environment)
```sql
SELECT
  Span.name,
  Span.duration,
  AwsLambdaInvocation.environment,
  AwsLambdaInvocation.endpoint
FROM Span
JOIN AwsLambdaInvocation ON Span.traceId = AwsLambdaInvocation.traceId
WHERE AwsLambdaInvocation.environment = '{{environment}}'
SINCE 1 hour ago
```

## Available Attributes

### AwsLambdaInvocation Events

**Custom attributes (via instrumentLambda):**
- `environment` - Environment name (e.g., `dev`, `production`)
- `endpoint` - API endpoint path (e.g., `/v1/contact`)

**Useful for filtering:**
- `request.uri` - Full API endpoint path
- `request.headers.host` - API hostname (e.g., `dev-api.idevelop.tech`)
- `request.method` - HTTP method
- `http.statusCode` - Response status code
- `duration` - Execution time in seconds
- `error` - Boolean indicating error state
- `traceId` - Distributed trace identifier

**Performance metrics:**
- `memory.heap.used.total` - Heap memory usage
- `cpu.user.time.total` - CPU time
- `externalDuration` - External call duration
- `aws.lambda.coldStart` - Boolean for cold starts

### Log Events

**Custom attributes (via NR_TAGS):**
- `environment` - Environment name (e.g., `dev`, `production`)

**Useful for filtering:**
- `faas.name` - Lambda function name (includes environment, e.g., `idevelop-tech-dev-ContactHandlerFunction-rovmkhzc`)
- `faas.arn` - Lambda ARN
- `message` - Log message text
- `aws.lambda_request_id` - Request ID

### Span Events

**Distributed tracing:**
- `name` - Span name
- `duration.ms` - Span duration
- `entity.name` - Service name
- `traceId` - Trace identifier (use to JOIN with AwsLambdaInvocation)

**Note:** Span events don't have `environment` attribute directly. Use JOIN with AwsLambdaInvocation to filter by environment.

## Adding New Lambda Functions

To add New Relic monitoring to a new Lambda function:

```typescript
// 1. Import instrumentLambda utility
import { instrumentLambda } from "./utils/instrument-lambda";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";

// 2. Define handler
const myHandler: APIGatewayProxyHandlerV2 = async (event) => {
  // Handler logic
};

// 3. Export wrapped handler
export const handler = instrumentLambda(myHandler);
```

**That's it!** The utility automatically:
- Adds `environment` custom attribute
- Adds `endpoint` custom attribute
- Wraps with New Relic APM instrumentation
- Lambda layer and environment variables are configured at infrastructure level

## Troubleshooting

### Extension Timeout Errors

**Symptom:**
```
[NR_EXT INFO] Telemetry client error: failed to send data within user defined timeout period: 10s
```

**Solution:**
Increase `NEW_RELIC_DATA_COLLECTION_TIMEOUT` from `10s` to `20s` or higher.

**Why it happens:**
Network latency to New Relic's API can exceed the timeout period. The extension runs asynchronously after Lambda response, so increasing timeout doesn't impact function execution time.

### Missing Traces

**Check:**
1. Verify `newrelic` is marked as external in esbuild config
2. Confirm handler is wrapped with `instrumentLambda()`
3. Check CloudWatch logs for New Relic initialization messages
4. Verify `NEW_RELIC_LICENSE_KEY` is set correctly

**View traces:**
In New Relic, navigate to: **APM & Services** → **Distributed Tracing** → Select "Root entry span" or "Root entity" (not "Trace groups")

### Environment Attribute Not Showing

**For AwsLambdaInvocation events:**
- Verify handler uses `instrumentLambda()` wrapper
- Check that `STAGE` environment variable is set
- Query: `SELECT environment FROM AwsLambdaInvocation SINCE 10 minutes ago`

**For Log events:**
- Verify `NR_TAGS` environment variable is set with format `environment:dev`
- Query: `SELECT environment FROM Log SINCE 10 minutes ago`

**For Span events:**
- Spans don't have `environment` directly
- Use JOIN pattern: `FROM Span JOIN AwsLambdaInvocation ON Span.traceId = AwsLambdaInvocation.traceId`

## Best Practices

1. **Use instrumentLambda()**: Always use the utility wrapper for consistent telemetry tagging
2. **Log meaningfully**: Structure log messages for easy filtering
3. **Monitor cold starts**: Track `aws.lambda.coldStart` attribute
4. **Set appropriate timeouts**: Extension timeout should accommodate network latency
5. **Dashboard organization**: Use `{{environment}}` variable for filtering across queries
6. **Distributed tracing**: Use JOIN pattern for Span queries that need environment filtering

## References

- **New Relic Lambda Layers**: https://layers.newrelic-external.com/
- **SST GitHub Issues**:
  - #5027 (New Relic handler wrapper issue)
  - #5524 (Datadog pattern - applicable to New Relic)
- **Node.js Agent Docs**: https://docs.newrelic.com/docs/apm/agents/nodejs-agent/
- **Lambda Extension Docs**: https://docs.newrelic.com/docs/serverless-function-monitoring/aws-lambda-monitoring/
