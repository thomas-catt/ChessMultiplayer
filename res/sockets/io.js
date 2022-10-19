require('dotenv').config()
const ioPort = process.env.WS_PORT || 80
const { socketLog } = require('../commons')

init = (server) => {
    const { Server } = require("socket.io")
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    })

    io.on('connection', (socket) => {
        socketLog(`"${socket.handshake.headers['user-agent']}"`.green.bold, " connected".green)
        socket.on('disconnect', (socket) => socketLog("a user disconnected.".yellow))
    })

    io.listen(ioPort)
    socketLog(`Listening on: ${ioPort}`.green)
}

module.exports = init