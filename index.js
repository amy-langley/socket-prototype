import Client from 'socket.io-client'

var socket = Client()

socket.on('s', function(evt){
  var p = document.createElement('p');
  p.innerText=evt.data
  document.querySelectorAll('body')[0].appendChild(p)
})
