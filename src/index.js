const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const chalk = require('chalk')


const app = express()
const server = http.createServer(app)
const io = socketio(server)


const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))


// runs with every new connection
io.on('connection', (socket) => {
  console.log('new WebSocket connection')

  // create a count
  let count = 0

  // send count to client
  socket.emit('countUpdated', count)

  //listening to event
  socket.on('increment', () => {
    count++
    socket.emit('countUpdated', count)
  })
})

server.listen(port, () => {
  console.log(chalk.bgMagenta(`Server is up on port ${port}!`))
})