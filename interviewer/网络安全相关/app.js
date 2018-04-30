var express = require('express');
var http = require('http');

var app = express();

http.createServer(app).listen(3003);

app.use(express.static('demo'));

app.get('/api/xss',function(req, res){
  res.setHeader('X-XSS-Protection',0);//关闭浏览器 XSS
  res.json('hutchins <script>console.log(1)</script>'); //模拟XSS攻击，后台返回了带脚本的字符串
})