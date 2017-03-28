# API Gateway Custom Authorizer Policy Generator 
  [![NPM version][npm-image]][npm-url]
  [![Build Status][travis-image]][travis-url]
  [![Dependency Status][daviddm-image]][daviddm-url]
  [![Coverage percentage][coveralls-image]][coveralls-url]

A Policy Generator for API Gateway Custom Authorizers

# Installation

`npm i api-gateway-policy-gen`

# Usage

```js
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

  // optional context
  const context = {
    role: 'admin'
  };
  // allow access to all methods
  const result = policyGenerator.generatePolicy(principalId, authInfo, [{
    allow: true,
    methods: [{
      verb: '*',
      resource: '*'
    }]
  }], context);

  cb(null, result);
)
```

# Contributions
Welcome. Please submit an issue before sending a PR.

# License
MIT

[npm-image]: https://badge.fury.io/js/api-gateway-policy-gen.svg
[npm-url]: https://npmjs.org/package/api-gateway-policy-gen
[travis-image]: https://travis-ci.org/ACloudGuru/api-gateway-policy-gen.svg?branch=master
[travis-url]: https://travis-ci.org/ACloudGuru/api-gateway-policy-gen
[daviddm-image]: https://david-dm.org/ACloudGuru/api-gateway-policy-gen.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ACloudGuru/api-gateway-policy-gen
[coveralls-image]: https://coveralls.io/repos/ACloudGuru/api-gateway-policy-gen/badge.svg
[coveralls-url]: https://coveralls.io/r/ACloudGuru/api-gateway-policy-gen