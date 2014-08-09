var http = require('http');
var url = 'http://www3006uf.sakura.ne.jp/test.php';
http.get(url, function(res){
    var body = '';
    res.setEncoding('utf8');
 
    res.on('data', function(chunk){
      body += chunk;
    });
 
    res.on('end', function(res){
      ret = JSON.stringify(body);
      console.log(ret);
    });

});

//http.on('error', function(e){
//    console.log(e.message); //エラー時
//});
