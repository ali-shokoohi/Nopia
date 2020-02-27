// This will load our .env file and add the values to process.env,
// IMPORTANT: Omit this line if you don't want to use this functionality
require('dotenv').config({silent: true});

module.exports = {
  port: process.env.PORT || 8000,
  //env: process.env.ENV || 'development',
  env: 'development',

  // Environment-dependent settings
  development: {
    db: {
      dialect: 'sqlite',
      storage: __dirname+'/db/data.db'
    }
  },
  production: {
    db: {
      dialect: process.env.DB_DIALECT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    }
  }
};
