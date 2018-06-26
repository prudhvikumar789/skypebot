var restify = require('restify');
var builder = require('botbuilder');

// Setup Restify Server
var server = restify.createServer();
// ?server.listen(80,'https://bots.dialogflow.com/skype/bb7ede6b-ee13-4cf6-9e35-877fb0527b9f/webhook');
server.listen(process.env.port || process.env.PORT || 8070, function () {
  console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
    //session.send("Requester: %s /n/nCommand %S", session.message.user.name, session.message.text);
    //session.send("Requester: %s", session.message.text);
    session.send("Requester: %s, \n\nCommand %s", session.message.user.name, session.message.text);
    console.log(session.message)
});
