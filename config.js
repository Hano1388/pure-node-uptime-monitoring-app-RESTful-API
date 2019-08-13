/*
*
* Create and export environment variables
*
*/

// Environemnts container
const environments = {};

// environment stages (default) - development
environments.development = {
  httpPort: 3000,
  httpsPort: 3001,
  stage: 'development'
};

// environment stages (production)
environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  stage: 'production'
};

// Determine which environment was passed as command-line argument
const passedStage = process.env.NODE_ENV ? process.env.NODE_ENV : '';
// check if the passed environment exist, otherwise default it to development
const exportEnv = environments.hasOwnProperty(passedStage) ? environments[passedStage] : environments.development;
// finally export it
module.exports = exportEnv;
