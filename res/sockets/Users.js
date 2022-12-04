const { socketLog } = require("../commons")
const { EmitBoardLayout } = require('./Chessboard')

let connectedUsers = []
let usersCount


// On: CONNECTION
const UserConnected = (socket, io) => {
    socket.on('introduction', (clientName) => {
        EmitConnectedUsers(io, true, clientName)
        EmitBoardLayout(io)
    })
    socket.on('disconnect', () => {
        EmitConnectedUsers(io, false, "disconnected")
    })

}

// Emit: CONNECTED USERS

const EmitConnectedUsers = (io, connect, lastConnected) => {
    usersCount = io.engine.clientsCount
    io.sockets.emit('connected-users', {users: usersCount, name: connect ? lastConnected : '0'})
    socketLog("Connected Users: ", usersCount, `(${connect ? "+" : ""}"${lastConnected}")`[connect ? "green" : "red"].bold)
}

module.exports = {
    UserConnected,
    EmitConnectedUsers
}