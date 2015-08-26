var messages_files = 'messages.json';
var web_port = process.env.PORT || 3000;
var endOfLine = require('os').EOL;

var fs = require('fs');
var express = require('express');
var app = express();

app.get('/twilio-handler', function (req, res) {
  console.log(req);
  
  res.send('<Response><Sms>Hello from Express.</Sms></Response>');
});

app.get('/messages', function (req, res) {
  res.download(messages_files);
});

var server = app.listen(web_port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
