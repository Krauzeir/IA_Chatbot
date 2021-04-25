var app = require('express')();
var http = require('http');
var server = http.Server(app)
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
const botURL = "http://127.0.0.1:5000/resposta/";

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

getRespostaDoBot = (msg) => {
  
  http.get(botURL + msg, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      io.emit('chat message', data)
      console;log("mensagem digitada pelo usuario: " + msg)
    });

  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
}

io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
    getRespostaDoBot(msg)
  });
});

server.listen(port, function () {
  console.log('listening on *:' + port);
});
