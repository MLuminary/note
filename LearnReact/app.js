const express = require('express');
const http = require('http');

var app = express();

http.createServer(app).listen(8080);

app.use(express.static('./React'));