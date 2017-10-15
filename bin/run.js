//'use strict';

const config = require('../config');
const log = config.log();

const SlackClient = require('../server/slackClient');
const service = require('../server/service')(config);
const http = require('http');
const server = http.createServer(service);

const witToken = config.wit_token;
const WitClient = require ('../server/witClient');
const witClient = new WitClient(witToken);

const serviceRegistry = service.get('serviceRegistry');
const slackClient = new SlackClient(config.slack_token, config.slackLogLevel, witClient, serviceRegistry, log);

slackClient.start(() => {
  server.listen(3000);
});

server.on('listening', function () {
  log.info(`Slack Bot is listening on ${server.address().port} in ${service.get('env')} mode.`);
});
