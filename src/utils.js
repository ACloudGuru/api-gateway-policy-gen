
module.exports.b64utob64 = function (a) {
  return a.length % 4 == 2 ? a += "==" : a.length % 4 == 3 && (a += "="), a = a.replace(/-/g, "+"), a = a.replace(/_/g, "/");
};

module.exports.base64decode = function (b64) {
  // eslint-disable-next-line node/no-deprecated-api
  return new Buffer(b64, 'base64').toString('ascii');
};

module.exports.atob = function (str) {
  // eslint-disable-next-line node/no-deprecated-api
  return new Buffer(str, 'base64').toString('binary');
};

module.exports.getAuthInfo = (methodArn) => {
  if (!methodArn) {
    throw new Error('methodArn argument is null');
  }

  const tmp = methodArn.split(':');
  const apiGatewayArnTmp = tmp[5].split('/');

  return {
    accountId: tmp[4],
    region: tmp[3],
    restApiId: apiGatewayArnTmp[0],
    stage: apiGatewayArnTmp[1],
    method: apiGatewayArnTmp[2],
  };
};


module.exports.getBearerToken = (authorizationToken) => {
  if (!authorizationToken) return null;

  const tokenParts = authorizationToken.split(' ');
  return tokenParts[1];
};
