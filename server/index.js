var express = require('express');
var app = express();
var ws = null

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/ping', function (req, res) {
  res.json({message: 'pong'})
});

app.post('/start', function(req, res){
  res.json({message: 'ok'})
  startTimer()
})

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

function startTimer(){
  var count = 0
  var count2 = 100000
  console.log('start timer')
  setInterval(function(){
    ws.emit('tick', {timer: count})
    console.log('tick', count)
    count++
  }, 3000)

  setInterval(function(){
    ws.emit('tack', {timer: count2})
    console.log('tack', count2)
    count2--
  }, 5000)
}

var io = require('socket.io')(server);

io.on('connection', function (socket) {
  ws = socket
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});