const http = require('http');
const express = require('express');

var app = express();

http.createServer(app).listen(3001);

app.get('api/msg', function(req, res){
  console.log(req.query)
})
