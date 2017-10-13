'use strict';

const config = require('../config');

const slackClient = require('../server/slackClient');
const service = require('../server/service')(config);
const http = require('http');
const server = http.createServer(service);

const witToken = config.wit_token;
const witClient = require ('../server/witClient')(witToken);

const slackToken = config.slack_token;
const slackLogLevel = 'verbose';

const serviceRegistry = service.get('serviceRegistry');

const rtm = slackClient.init(slackToken, slackLogLevel, witClient, serviceRegistry);

rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function () {
	console.log(`Slack Bot is listening on ${server.address().port} in ${service.get('env')} mode.`);
});
