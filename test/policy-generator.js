'use strict';

const expect = require('chai').expect;

const policyGenerator = require('../src/policy-generator');

describe('#utils()', () => {

  describe('#generatePolicy()', () => {
    it('should generate policy', () => {
      const userId = 'foo-user';
      const authInfo = {
        accountId: '123456789012',
        region: 'ap-southeast-2',
        stage: 'dev',
        restApiId: '4uv6m4qe3g',
        method: 'POST'
      };

      const policy = policyGenerator.generatePolicy(userId, authInfo, [{
        allow: true,
        methods: [{
          verb: '*',
          resource: '*'
        }]
      }]);

      expect(policy).to.deep.equal({
        principalId: userId,
        policyDocument: {
          Version: '2012-10-17',
          Statement: [{
            Effect: 'Allow',
            Action: 'execute-api:Invoke',
            "Resource": [
              `arn:aws:execute-api:${authInfo.region}:${authInfo.accountId}:${authInfo.restApiId}/${authInfo.stage}/*/*`
            ]
          }]
        }
      });
    });
  });
});
