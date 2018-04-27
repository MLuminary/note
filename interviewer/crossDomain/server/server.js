const http = require('http');
const express = require('express');
const api  = require('./api')

var app = express();

http.createServer(app).listen(3001);

app.get('/api/jsonp', api.jsonpf);

app.post('/api/cors', api.cors);