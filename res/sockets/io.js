require('dotenv').config()
const ioPort = process.env.WS_PORT || 80
const { socketLog } = require('../commons')
const { UserConnected } = require('./Users')
const { MessageReceived } = require('./Messaging')
const { PieceDragReceived, EmitBoardLayout } = require('./Chessboard')

init = (server) => {
    const { Server } = require("socket.io")
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    io.on('connection', (socket) => {
        UserConnected(socket, io)
        MessageReceived(socket, io)
        PieceDragReceived(socket, io)
    })

    io.listen(ioPort)
    socketLog(`Listening on: ${ioPort}`.green)
}

module.exports = init