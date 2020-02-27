const Models = require('../models/');
const md5 = require('md5');

/*
 * Get access token.
 */

module.exports.getAccessToken = (bearerToken) => {
  return Models.oauth_token
  .findOne({
    where:{
      access_token: bearerToken
    }
  })
  .then(token => {
    return {
      accessToken: token.access_token,
      client: {id: token.oauthClientId},
      expires: token.access_token_expires_on,
      user: {id: token.UserId}, // could be any object
    };
  });
};

/**
 * Get client.
 */

module.exports.getClient = (clientId, clientSecret) => {
  return Models.oauth_client
  .findOne({
    where: {
      id: clientId,
      client_secret: clientSecret
    }
  })
  .then(oAuthClient => {
    if (!oAuthClient) {
      return;
    }

    return {
      clientId: oAuthClient.id,
      clientSecret: oAuthClient.client_secret,
      grants: ['password'], // the list of OAuth2 grant types that should be allowed
    };
  });
};

/**
 * Get refresh token.
 */

module.exports.getRefreshToken = (bearerToken) => {
  return Models.oauth_token
  .findOne({
    where:{
      access_token: bearerToken
    }
  })
  .then(token => {
    return token ? token : false;
  });
};

/*
 * Get user.
 */

module.exports.getUser = (username, password) => {
  const hash_password = md5(password);
  Models.User
  .findOne({
    where: {
      username: username,
      password: hash_password
    }
  })
  .then(user => {
    return user ? user : false;
  });
};

/**
 * Save token.
 */

module.exports.saveAccessToken = (token, client, user) => {
  Models.oauth_token
  .create({
    access_token: token.access_token,
    access_token_expires_on: token.access_token_expires_on,
    ClientId: client.id,
    refresh_token: token.refresh_token,
    refresh_token_expires_on: token.refresh_token_expires_on,
    UserId: user.id
  })
  .then(user => {
    return user ? user : false; // TODO return object with client: {id: clientId} and user: {id: userId} defined
  });
};