/*var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World");
  response.end();
}).listen(1234);*/

var express = require('./node_modules/express');
var app = express();

app.get('/', function(req, res){
    res.send('serever started');
});

app.get('/user/:id', function(req, res){
    res.send('user ' + req.params.id);
});

app.listen(1234);