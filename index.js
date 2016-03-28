import Client from 'socket.io-client'

var socket = Client()

socket.on('s', function(evt){
  console.log(evt)
})
