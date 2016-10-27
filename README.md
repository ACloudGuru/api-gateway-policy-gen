# API Gateway Custom Authorizer Policy Generator [![Build Status](https://travis-ci.org/ACloudGuru/api-gateway-policy-gen.svg?branch=master)](https://travis-ci.org/ACloudGuru/api-gateway-policy-gen)
A Policy Generator for API Gateway Custom Authorizers

# Installation

`npm i api-gateway-policy-gen`

# Usage

```
const utils = require('api-gateway-policy-gen').utils;
const policyGenerator = require('api-gateway-policy-gen').policyGenerator;

module.exports.handler = function(event, context, cb) {
  // Get's the token from the header in the format 'Bearer xxjklsadf'
  const idToken = utils.getBearerToken(event.authorizationToken);

  if (!idToken) {
    return cb('No auth token supplied');
  }

  // Do something to ensure the user is authorized
  //  i.e. decode JWT
  const user = authorizeUser(idToken);
  const principalId = user.id;

  const authInfo = utils.getAuthInfo(event.methodArn);

  // allow access to all methods
  const result = policyGenerator.generatePolicy(principalId, authInfo, [{
    allow: true,
    methods: [{
      verb: '*',
      resource: '*'
    }]
  }]);

  cb(null, result);
)
```

# Contributions
Welcome. Please submit an issue before sending a PR.

# License
MIT
