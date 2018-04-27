const qs = require('querystring');

module.exports = {
  //jsonp
  jsonpf:function(req, res) {
    var params = req.query;
    var fn = req.query.callback;

    res.writeHead(200, {'Content-Type': 'text/javascript'});
    res.write(fn + '(' + JSON.stringify(params) + ')');
    res.end();
  },
  cors: function(req ,res) {
    var postData = '';

    req.on('data',function(chunk){
      postData += chunk;
    })

    req.on('end', function(){
      postData = qs.parse(postData);

      //跨域后台设置
      res.writeHead(200, {
        'Access-Control-Allow-Credentials': 'true', //后端允许发送 cookie
        'Access-Control-Allow-Origin': 'http://localhost:3002'
        // 'Set-Cookie': 'l=a123456;Path=/;Domain=www.domain2.com;HttpOnly'  // HttpOnly的作用是让js无法读取cookie
      });

      res.write(JSON.stringify(postData));
      res.end();
    })
  }
}