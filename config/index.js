require('dotenv').config();
const bunyan = require('bunyan');

const log = {
  development: () => {
    return bunyan.createLogger({name: 'tamerbot-development', level: 'debug'});
  },
  production: () => {
    return bunyan.createLogger({name: 'tamerbot-production', level: 'info'});
  },
  test: () => {
    return bunyan.createLogger({name: 'tamerbot-test', level: 'fatal'});
  }
};

module.exports = {
  wit_token: process.env.WIT_TOKEN,
  slack_token: process.env.SLACK_TOKEN,
  slackLogLevel: 'verbose',
  serviceTimout: 30,
  tamerbotApiToken: process.env.TAMERBOT_API_TOKEN,
  log: (env) => {
    if (env) return log[env]();
    return log[process.env.NODE_ENV || 'development']();
  }
};
