const OAuth2Server = require('express-oauth-server');

const oauth = new OAuth2Server({
  model: require('./model')
});

module.exports=oauth;