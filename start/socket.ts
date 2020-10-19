import Ws from 'App/Services/Ws'

Ws.start((socket) => {
  // socket.emit('news', { hello: 'world' })
  // console.log(socket.id)

  socket.emit('connectUsers', {
    users: [socket.id]
  })
  socket.on('disconnect', () => {
    // console.log(socket.id)
    socket.emit('disconnectUsers', {
      users: [socket.id]
    })
  })

  // socket.on('my other event', (data) => {
  //   console.log(data)
  // })
})

