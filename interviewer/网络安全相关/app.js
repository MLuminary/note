var express = require('express');
var http = require('http');
var xss = require('xss')

var app = express();

http.createServer(app).listen(3003);

app.use(express.static('demo'));

app.get('/api/xss',function(req, res){
  res.setHeader('X-XSS-Protection',0);//关闭浏览器 XSS
  
  // xssFilter('<img src="ww" onerror="alert(1)">')
  console.log(xss('<img src="ww" onerror="alert(1)">',{
    
  }));
  res.json('hutchins <script>console.log(1)</script>'); //模拟XSS攻击，后台返回了带脚本的字符串
})

var xssFilter = function(html){
  
  if(!html) return '';
  var cheerio = require('cheerio');
  var $ = cheerio.load(html);
  // 定义白名单
  var whiteList = {
    'img': ['src'],
    'html': '1',
    'head': '1',
    'body': '1'
  }
  $('img').each(function(index, elem){

    if(!whiteList[elem.name]){
      $(elem).remove();
      return;
    }
    
    for(var attr in elem.attribs){
      if(whiteList[elem.name].indexOf(attr) === -1){
        $(elem).attr(attr, null);
      }
    }
  });

  console.log(html, $.html()) //会带着 html、head、body
  return $.html();
}