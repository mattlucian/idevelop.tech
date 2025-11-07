import type { APIGatewayProxyHandlerV2 } from 'aws-lambda';
import type { ContactFormRequest, ContactFormResponse } from '@idevelop-tech/core';

// Placeholder Lambda function for contact form
// Will be implemented in Phase 3

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  console.log('Contact form submission received:', event);

  // Placeholder response
  const response: ContactFormResponse = {
    success: true,
    message: 'Contact form handler - to be implemented in Phase 3',
    requestId: crypto.randomUUID(),
  };

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(response),
  };
};
