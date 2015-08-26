var messages_files = 'messages.json';
var web_port = process.env.PORT || 3000;
var endOfLine = require('os').EOL;

var fs = require('fs');
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/twilio-handler', function (req, res) {
  console.log(req);
  
  var message = {
    'datetime': new Date(),
    'from': req.body.From || 'from_not_sent',
    'to': req.body.To || 'to_not_present',
    'body': req.body.Body || 'body_not_present'
  };
  
  fs.appendFile(
    messages_files, 
    JSON.stringify(message, null, 2) + endOfLine, 
    function (err) {
      res.send('<Response><Sms>Hello from Express.</Sms></Response>');  
  });
  
});

app.get('/messages', function (req, res) {
  res.setHeader('Content-Type', 'text/plain');
  
  res.type('text/plain');
  res.sendFile(__dirname + '/' + messages_files);
});

var server = app.listen(web_port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
