'use strict';

const config = require('../config');

const SlackClient = require('../server/slackClient');
const service = require('../server/service')(config);
const http = require('http');
const server = http.createServer(service);

const witToken = config.wit_token;
const WitClient = require ('../server/witClient');
const witClient = new WitClient(witToken);

const slackToken = config.slack_token;

const serviceRegistry = service.get('serviceRegistry');
const slackClient = new SlackClient(config.slack_token, config.slackLogLevel, witClient, serviceRegistry);

slackClient.start(() => {
	server.listen(3000);
});

server.on('listening', function () {
	console.log(`Slack Bot is listening on ${server.address().port} in ${service.get('env')} mode.`);
});
