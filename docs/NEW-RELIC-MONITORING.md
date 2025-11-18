# New Relic Monitoring for Lambda Functions

Complete guide for New Relic APM and observability integration with AWS Lambda functions.

## Overview

This project uses **New Relic Lambda Extension + APM Agent** for comprehensive monitoring of Lambda functions:

- **APM Agent**: Code-level instrumentation and distributed tracing
- **Lambda Extension**: Telemetry collection and transmission
- **Event Types**: AwsLambdaInvocation, Span, and Log events

## Architecture

### Components

**Lambda Layer**: `arn:aws:lambda:us-east-1:451483290750:layer:NewRelicNodeJS20XARM64:95`
- New Relic APM Agent for Node.js 20 (ARM64)
- New Relic Lambda Extension v2.3.24
- Provides `newrelic` package at runtime

**Handler Wrapper**: `newrelic.setLambdaHandler()`
- Wraps Lambda handlers with APM instrumentation
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
  NEW_RELIC_LABELS: isProduction
    ? "environment:production"
    : "environment:dev",  // Tags all telemetry (queryable as tags.environment)

  // New Relic Lambda Extension
  NEW_RELIC_EXTENSION_SEND_FUNCTION_LOGS: "true",
  NEW_RELIC_LAMBDA_EXTENSION_ENABLED: "true",
  NEW_RELIC_DATA_COLLECTION_TIMEOUT: "20s",  // Increased for network latency
  NEW_RELIC_EXTENSION_LOG_LEVEL: "INFO",
}
```

### Handler Implementation

```typescript
// packages/functions/src/contact.ts
import newrelic from "newrelic";

const contactHandler: APIGatewayProxyHandlerV2 = async (event) => {
  // Handler logic
};

// Export wrapped handler
export const handler = newrelic.setLambdaHandler(contactHandler);
```

### Build Configuration

```typescript
// sst.config.ts
nodejs: {
  esbuild: {
    external: ["newrelic"],  // Provided by Lambda layer
  },
}
```

## Dashboard Queries

### Environment Filtering Strategy

All telemetry is automatically tagged with environment using `NEW_RELIC_LABELS`:

**Dashboard Variable:**
- Name: `{{environment}}`
- Type: String
- Values: `dev`, `production`

**Universal filtering (works for all event types):**
```sql
WHERE tags.environment = '{{environment}}'
```

This approach uses New Relic's built-in labels feature, similar to Datadog's `DD_ENV`. The `NEW_RELIC_LABELS` environment variable automatically tags all AwsLambdaInvocation, Span, and Log events with no code changes required.

### Key Metrics

**1. Request Rate**
```sql
SELECT count(*)
FROM AwsLambdaInvocation
WHERE tags.environment = '{{environment}}'
FACET request.uri
TIMESERIES AUTO
```

**2. Response Time**
```sql
SELECT
  average(duration * 1000) as 'Avg Response Time (ms)',
  max(duration * 1000) as 'Max Response Time (ms)',
  percentile(duration * 1000, 95) as 'P95 Response Time (ms)'
FROM AwsLambdaInvocation
WHERE tags.environment = '{{environment}}'
TIMESERIES AUTO
```

**3. Error Rate**
```sql
SELECT percentage(count(*), WHERE error IS true) as 'Error Rate %'
FROM AwsLambdaInvocation
WHERE tags.environment = '{{environment}}'
TIMESERIES AUTO
```

**4. Recent Logs**
```sql
SELECT timestamp, message
FROM Log
WHERE tags.environment = '{{environment}}'
AND (message LIKE '%error%' OR message LIKE '%Error%')
SINCE 1 day ago
LIMIT 50
```

**5. Memory Usage**
```sql
SELECT
  average(provider.maxMemoryUsed.Average / provider.memorySize.Average * 100) as 'Avg Memory %',
  max(provider.maxMemoryUsed.Average / provider.memorySize.Average * 100) as 'Peak Memory %'
FROM AwsLambdaInvocation
WHERE tags.environment = '{{environment}}'
TIMESERIES AUTO
```

**6. Request Volume by Endpoint**
```sql
SELECT count(*)
FROM AwsLambdaInvocation
WHERE tags.environment = '{{environment}}'
FACET request.uri
SINCE 1 day ago
```

## Available Attributes

### AwsLambdaInvocation Events

**Useful for filtering:**
- `request.uri` - API endpoint (e.g., `/v1/contact`)
- `request.headers.host` - API hostname (e.g., `dev-api.idevelop.tech`)
- `request.method` - HTTP method
- `http.statusCode` - Response status code
- `duration` - Execution time in seconds
- `error` - Boolean indicating error state

**Performance metrics:**
- `memory.heap.used.total` - Heap memory usage
- `cpu.user.time.total` - CPU time
- `externalDuration` - External call duration
- `aws.lambda.coldStart` - Boolean for cold starts

### Log Events

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
- `traceId` - Trace identifier

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
2. Confirm handler is wrapped with `newrelic.setLambdaHandler()`
3. Check CloudWatch logs for New Relic initialization messages
4. Verify `NEW_RELIC_LICENSE_KEY` is set correctly

**View traces:**
In New Relic, navigate to: **APM & Services** → **Distributed Tracing** → Select "Root entry span" or "Root entity" (not "Trace groups")

### Custom Attributes Not Showing

**Note:** We use **built-in properties** instead of custom attributes for filtering:
- `request.uri` and `request.headers.host` for AwsLambdaInvocation/Span
- `faas.name` for Log events

Custom attributes via `newrelic.addCustomAttribute()` don't work when called at module initialization. They would need to be added per-request inside the handler.

## Adding New Lambda Functions

To add New Relic monitoring to a new Lambda function:

```typescript
// 1. Import newrelic
import newrelic from "newrelic";

// 2. Define handler
const myHandler: APIGatewayProxyHandlerV2 = async (event) => {
  // Handler logic
};

// 3. Export wrapped handler
export const handler = newrelic.setLambdaHandler(myHandler);
```

**That's it!** The Lambda layer and environment variables are configured at the infrastructure level.

## Best Practices

1. **Use consistent naming**: Include environment in function names (e.g., `idevelop-tech-dev-*`)
2. **Log meaningfully**: Structure log messages for easy filtering
3. **Monitor cold starts**: Track `aws.lambda.coldStart` attribute
4. **Set appropriate timeouts**: Extension timeout should accommodate network latency
5. **Dashboard organization**: Use variables for environment filtering across all queries

## References

- **New Relic Lambda Layers**: https://layers.newrelic-external.com/
- **SST GitHub Issues**:
  - #5027 (New Relic handler wrapper issue)
  - #5524 (Datadog pattern - applicable to New Relic)
- **Node.js Agent Docs**: https://docs.newrelic.com/docs/apm/agents/nodejs-agent/
- **Lambda Extension Docs**: https://docs.newrelic.com/docs/serverless-function-monitoring/aws-lambda-monitoring/
