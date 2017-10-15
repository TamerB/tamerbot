require('dotenv').config();

module.exports = {
  wit_token: process.env.WIT_TOKEN,
  slack_token: process.env.SLACK_TOKEN,
  slackLogLevel: 'verbose',
  serviceTimout: 30
}
