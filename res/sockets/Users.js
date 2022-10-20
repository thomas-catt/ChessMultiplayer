const { socketLog } = require("../commons")

let connectedUsers = []
let usersCount

setTimeout(() => {
    
}, 1000);

// On: CONNECTION
const UserConnected = (socket, io) => {
    socket.on('introduction', (clientName) => {
        socketLog(`"${clientName}"`.green.bold, " connected".green)
        EmitConnectedUsers(io)
    })
    socket.on('disconnect', () => {
        socketLog("a user disconnected.".yellow)
        EmitConnectedUsers(io)
    })

}

// Emit: CONNECTED USERS

const EmitConnectedUsers = (io) => {
    usersCount = io.engine.clientsCount
    io.sockets.emit('connected-users', usersCount)
    socketLog("Connected Users: ", usersCount)
}

module.exports = {
    UserConnected,
    EmitConnectedUsers
}