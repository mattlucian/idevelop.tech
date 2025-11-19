# Observability

Lambda monitoring and alerting for idevelop.tech API.

**Platform**: New Relic (100 GB/month free tier)
**Account**: 7377610
**Dashboard**: https://one.newrelic.com

---

## What's Monitored

**Lambda Metrics**:
- Invocation count, duration, memory usage
- Error rate and error details
- Cold start frequency
- HTTP status codes and response times

**Distributed Tracing**:
- Full request flow: API Gateway → Lambda → AWS Services
- Individual spans for each operation
- Error stack traces with context

**Logs**:
- Lambda function logs
- Correlated with traces via trace IDs
- Searchable and filterable

---

## Setup

### Lambda Layer

**ARN**: `arn:aws:lambda:us-east-1:451483290750:layer:NewRelicNodeJS20XARM64:95`

Includes:
- New Relic APM Agent (code-level tracing)
- New Relic Lambda Extension (telemetry collection)

Find latest versions: https://layers.newrelic-external.com/

### Environment Variables

```typescript
// sst.config.ts - Lambda environment
NEW_RELIC_LICENSE_KEY: newRelicLicenseKey.value  // SST secret
NEW_RELIC_ACCOUNT_ID: "7377610"
NEW_RELIC_APP_NAME: isProduction ? "api-idevelop-tech" : "dev-api-idevelop-tech"
NEW_RELIC_EXTENSION_SEND_FUNCTION_LOGS: "true"
NEW_RELIC_LAMBDA_EXTENSION_ENABLED: "true"
NEW_RELIC_DATA_COLLECTION_TIMEOUT: "20s"
NR_TAGS: isProduction ? "environment:production" : "environment:dev"
```

**SST Secret** (one-time setup):
```bash
npx sst secret set NewRelicLicenseKey YOUR_LICENSE_KEY --stage production
npx sst secret set NewRelicLicenseKey YOUR_LICENSE_KEY --stage dev
```

### Handler Instrumentation

Use `instrumentLambda()` wrapper to automatically add custom attributes:

```typescript
// packages/functions/src/contact.ts
import { instrumentLambda } from "./utils/instrument-lambda";

const contactHandler: APIGatewayProxyHandlerV2 = async (event) => {
  // Handler logic
};

export const handler = instrumentLambda(contactHandler);
```

**Custom attributes added**:
- `environment` - Stage name (dev, production)
- `endpoint` - API endpoint path (e.g., `/v1/contact`)

### Build Configuration

```typescript
// sst.config.ts
nodejs: {
  esbuild: {
    external: ["newrelic"],  // Provided by Lambda layer
  },
}
```

---

## Dashboard Queries

### Request Rate
```sql
SELECT count(*) FROM AwsLambdaInvocation
WHERE environment = 'production'
FACET endpoint TIMESERIES
```

### Error Rate
```sql
SELECT percentage(count(*), WHERE error IS true)
FROM AwsLambdaInvocation
WHERE environment = 'production'
TIMESERIES
```

### Response Time (P95)
```sql
SELECT percentile(duration * 1000, 95) as 'P95 (ms)'
FROM AwsLambdaInvocation
WHERE environment = 'production'
FACET endpoint TIMESERIES
```

### Memory Usage
```sql
SELECT average(provider.maxMemoryUsed.Average / provider.memorySize.Average * 100) as 'Memory %'
FROM AwsLambdaInvocation
WHERE environment = 'production'
TIMESERIES
```

### Recent Errors
```sql
SELECT timestamp, message FROM Log
WHERE environment = 'production'
AND (message LIKE '%error%' OR message LIKE '%Error%')
SINCE 1 day ago LIMIT 50
```

### Cold Starts
```sql
SELECT percentage(count(*), WHERE aws.lambda.coldStart IS true)
FROM AwsLambdaInvocation
WHERE environment = 'production'
TIMESERIES
```

---

## Alerts

### Configured Alerts (Production)

**1. Lambda Errors**
- **Trigger**: Any Lambda invocation error
- **Query**:
  ```sql
  SELECT count(*) FROM AwsLambdaInvocation
  WHERE environment = 'production' AND error IS true
  ```
- **Threshold**: Critical when > 0 for 1 minute
- **Why**: Any error needs immediate investigation

**2. High Error Rate**
- **Trigger**: Sustained high error rate
- **Query**:
  ```sql
  SELECT filter(count(*), WHERE error IS true) / filter(count(*), WHERE error IS NOT NULL) * 100 as 'Error Rate'
  FROM AwsLambdaInvocation
  WHERE environment = 'production'
  ```
- **Threshold**: Critical when > 10% for 5 minutes
- **Why**: Indicates systemic issue (bad deployment, external service down)

### Notifications

- **Email**: matt@idevelop.tech
- **Workflow**: New Relic alert workflow configured

### Alert Response

**Lambda Errors**:
1. Check incident details in New Relic for error message and stack trace
2. Common causes: Invalid input, external service failure, code bug
3. If isolated: Monitor for pattern
4. If repeated: Check recent deployments, review code changes

**High Error Rate**:
1. Check if related to recent deployment → Revert if needed
2. Check external dependencies (AWS SES, reCAPTCHA)
3. Review DynamoDB for throttling
4. If error rate stays high >15 min: Revert recent changes

---

## Environment Filtering

**Dashboard variable**: `{{environment}}`
**Values**: `dev`, `production`

**Event-specific filtering**:

**Log events**: Direct filtering
```sql
WHERE environment = 'production'
```

**AwsLambdaInvocation events**: Direct filtering
```sql
WHERE environment = 'production'
```

**Span events**: Join with AwsLambdaInvocation
```sql
FROM Span
JOIN AwsLambdaInvocation ON Span.traceId = AwsLambdaInvocation.traceId
WHERE AwsLambdaInvocation.environment = 'production'
```

---

## Troubleshooting

### Extension Timeout Errors

**Symptom**:
```
[NR_EXT INFO] Telemetry client error: failed to send data within timeout: 10s
```

**Fix**: Increase timeout in `sst.config.ts`:
```typescript
NEW_RELIC_DATA_COLLECTION_TIMEOUT: "20s"
```

Extension runs asynchronously after Lambda response, so timeout doesn't impact function execution time.

### Missing Traces

**Check**:
1. Verify `newrelic` marked as external in esbuild config
2. Confirm handler wrapped with `instrumentLambda()`
3. Check CloudWatch logs for New Relic initialization
4. Verify `NEW_RELIC_LICENSE_KEY` secret is set

**View traces**: APM & Services → Distributed Tracing → Select "Root entry span"

### Environment Attribute Missing

**AwsLambdaInvocation**: Verify handler uses `instrumentLambda()` wrapper
**Log events**: Verify `NR_TAGS` environment variable is set
**Span events**: Use JOIN pattern with AwsLambdaInvocation

---

## Adding New Lambda Functions

```typescript
// 1. Import utility
import { instrumentLambda } from "./utils/instrument-lambda";
import type { APIGatewayProxyHandlerV2 } from "aws-lambda";

// 2. Define handler
const myHandler: APIGatewayProxyHandlerV2 = async (event) => {
  // Handler logic
};

// 3. Export wrapped handler
export const handler = instrumentLambda(myHandler);
```

Lambda layer and environment variables configured at infrastructure level (`sst.config.ts`).

---

## References

- **New Relic Dashboard**: https://one.newrelic.com (Account: 7377610)
- **Lambda Layers**: https://layers.newrelic-external.com/
- **Configuration**: `sst.config.ts` (lines 24-126)
- **Instrumentation Utility**: `packages/functions/src/utils/instrument-lambda.ts`
