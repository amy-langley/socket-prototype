var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var heartbeats = require('heartbeats');

import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from './webpack.config.js'

const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
})

app.use(middleware)
app.use(webpackHotMiddleware(compiler))
app.get('/home', function response(req, res) {
var p = path.join(__dirname, '..', '..', 'dist', 'index.html')

res.write(middleware.fileSystem.readFileSync(p))
res.send()
})

var tick = function(socket){
  socket.emit('s', {data: 'tick'})
}

io.on('connection', function(socket){
  var heart = heartbeats.createHeart(1000);
  heart.createEvent(1, function(){ tick(socket) })
  socket.on('disconnect', function(){
    heart.kill();
  });
  tick(socket)
});

var port = 3001;
server.listen(port, 'localhost', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
})
