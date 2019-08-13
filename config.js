/*
*
* Create and export environment variables
*
*/

// Environemnts container
const environments = {};

// environment stages (default) - development
environments.development = {
  port: 3000,
  stage: 'development'
};

// environment stages (production)
environments.production = {
  port: 5252,
  stage: 'production'
};

// Determine which environment was passed as command-line argument
const passedStage = process.env.NODE_ENV ? process.env.NODE_ENV : '';
// check if the passed environment exist, otherwise default it to development
const exportEnv = environments.hasOwnProperty(passedStage) ? environments[passedStage] : environments.development;
// finally export it
module.exports = exportEnv;
