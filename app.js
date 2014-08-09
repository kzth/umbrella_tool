var express = require('express')
  , routes = require('routes')
  , path = require('path')
  , serialport = require('serialport')
  , http = require('http');

// アクセス先
var host = 'http://www3006uf.sakura.ne.jp/';
var path = '';
var file = 'test.php';
var url = host + path + file;
console.log(url);

// event flag
var event_flag = 0;

// Serial Port
var portName = '/dev/ttyACM0'; // Mac環境
var sp = new serialport.SerialPort(portName, {
  baudRate: 115200,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false,
  parser: serialport.parsers.readline("\n")   // ※修正：パースの単位を改行で行う
});

//data from Serial port
sp.on('data', function(input) {

  var buffer = new Buffer(input, 'utf8');
  var jsonData;
  console.log(buffer.toString());

  if(buffer.toString().match(/^1/)) {
    console.log('start request');
    http.get(url, function(res){
        console.log('get request');
        var body = '';
        res.setEncoding('utf8');

        res.on('data', function(chunk){
          body += chunk;
        });

        res.on('end', function(res){
          if(event_flag != 1) {
            ret = JSON.stringify(body);
            console.log(ret);
          }
          event_flag = 1;
        });
    });
    //http.on('error', function(e){
    //    console.log(e.message); //エラー時
    //});
  }
  /*
  try {
    jsonData = JSON.parse(buffer);
    console.log('temp: ' + jsonData.temp);
    console.log('led: ' + jsonData.led);
  } catch(e) {
    // データ受信がおかしい場合無視する
    console.log("error");
    return;
  }
  */
  // つながっているクライアント全員に送信
//  io.sockets.json.emit('message', { value: jsonData });
});
