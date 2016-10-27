'use strict';

// API Gateway ARN: 'arn:aws:execute-api:us-east-1:<Account id>:<API id>/<stage>/<verb>/<resource >'

const createResourceArn = function(apiInfo, httpVerb, resource) {

  let cleanedResource = resource;
  if (resource.substring(0, 1) === '/') {
      cleanedResource = resource.substring(1, resource.length);
  }

  return 'arn:aws:execute-api:' +
    apiInfo.region + ':' +
    apiInfo.accountId + ':' +
    apiInfo.restApiId + '/' +
    apiInfo.stage + '/' +
    httpVerb + '/' +
    cleanedResource;
}

const createApiGatewayStatement = function(apiInfo, allow, methods) {
  const effect = allow ? 'Allow' : 'Deny';

  const resources = methods.map((method) => createResourceArn(apiInfo, method.verb, method.resource));

  return {
    Action: 'execute-api:Invoke',
    Effect: effect,
    Resource: resources
  };
}

const generatePolicy = function(principalId, apiInfo, endpoints) {
  const policy = {
    principalId: principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: []
    }
  };

  policy.policyDocument.Statement = endpoints.map((endpoint) =>
    createApiGatewayStatement(apiInfo, endpoint.allow, endpoint.methods)
  );

  return policy;
};

module.exports = {
  generatePolicy: generatePolicy
};
