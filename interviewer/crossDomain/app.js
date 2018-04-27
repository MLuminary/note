const http = require('http');
const express = require('express');

var app = express();

http.createServer(app).listen(3002);

app.use(express.static('public'));