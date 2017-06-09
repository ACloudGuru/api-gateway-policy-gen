'use strict';

const expect = require('chai').expect;

const utils = require('../src/utils');

describe('#utils()', () => {
  describe('#b64utob64', function() {

  });

  describe('#atob', function() {
    it('should atob', function() {
      const encoded = 'SGVsbG8gV29ybGQ=';
      const unencoded = 'Hello World';
      const actual = utils.atob(encoded);

      expect(actual).to.equal(unencoded);
    });
  });

  describe('#b64toBuffer', function () {
    const base64String = 'SGVsbG8gV29ybGQ=';
    const actual = utils.b64toBuffer(base64String);

    expect(actual instanceof Buffer).to.equal(true);
    expect(actual.toString('hex')).to.equal('48656c6c6f20576f726c64');
    expect(actual.toString('ascii')).to.equal('Hello World');
  });

  describe('#base64decode', function() {
    it('should base64decode', function() {
      const encoded = 'SGVsbG8gV29ybGQ=';
      const unencoded = 'Hello World';
      const actual = utils.base64decode(encoded);

      expect(actual).to.equal(unencoded);
    });
  });

  describe('#getBearerToken()', () => {
    it('should return null for empty methodArn', () => {
      const token = utils.getBearerToken('');
      expect(token).to.equal(null);
    });

    it('returns the token', () => {
      const token = 'token';
      expect(utils.getBearerToken(`Bearer ${token}`)).to.equal(token);
    });
  });

  describe('#getAuthInfo()', () => {
    it('should throw for empty methodArn', () => {
      expect(() => utils.getAuthInfo('')).to.throw(Error);
    });

    it('should return the auth info', () => {
      const accountId = '123456789012';
      const region = 'ap-southeast-2';
      const stage = 'dev';
      const restApiId = '4uv6m4qe3g';
      const method = 'POST';

      // eslint-disable-next-line max-len
      const methodArn = `arn:aws:execute-api:${region}:${accountId}:${restApiId}/${stage}/${method}/graphql`;
      const authInfo = utils.getAuthInfo(methodArn);

      expect(authInfo.accountId).to.equal(accountId);
      expect(authInfo.region).to.equal(region);
      expect(authInfo.stage).to.equal(stage);
      expect(authInfo.restApiId).to.equal(restApiId);
      expect(authInfo.method).to.equal(method);
    });
  });
});
